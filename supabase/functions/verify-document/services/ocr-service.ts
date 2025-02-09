
import { normalizeString } from '../utils/string-utils.ts';
import { calculateStringSimilarity } from '../utils/string-utils.ts';
import type { ProfileData } from '../types.ts';

export async function performOCR(imageBase64: string) {
  try {
    const formData = new FormData();
    formData.append("file", `data:image/jpeg;base64,${imageBase64}`);
    formData.append("apikey", Deno.env.get('OCR_SPACE_API_KEY') ?? '');
    formData.append("language", "por");
    formData.append("detectOrientation", "true");
    formData.append("scale", "true");
    formData.append("OCREngine", "2");

    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`OCR request failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.ParsedResults || result.ParsedResults.length === 0) {
      throw new Error('No text was extracted from the image');
    }

    console.log("OCR Result:", result);
    return result.ParsedResults[0].ParsedText;
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error(`OCR processing failed: ${error.message}`);
  }
}

export function validateDocument(ocrText: string, profile: ProfileData) {
  const normalizedProfileName = normalizeString(profile.full_name);
  const normalizedProfileCPF = normalizeString(profile.cpf);

  // CPF validation
  const cpfPattern = /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/g;
  const extractedCPFs = ocrText.match(cpfPattern);

  if (!extractedCPFs || extractedCPFs.length === 0) {
    console.log('No CPF found in document');
    return { success: false, message: 'CPF não encontrado no documento' };
  }

  let cpfMatch = false;
  for (const cpf of extractedCPFs) {
    if (normalizeString(cpf) === normalizedProfileCPF) {
      cpfMatch = true;
      break;
    }
  }

  if (!cpfMatch) {
    console.log('CPF mismatch:', { extracted: extractedCPFs, profile: normalizedProfileCPF });
    return { success: false, message: 'CPF não corresponde' };
  }

  // Name validation
  const words = ocrText
    .split('\n')
    .join(' ')
    .split(' ')
    .filter(word => word.length > 1)
    .map(word => normalizeString(word));

  const profileNameWords = normalizedProfileName.split(' ');
  let matchedWords = 0;
  let foundNameParts: string[] = [];

  for (const nameWord of profileNameWords) {
    if (nameWord.length <= 2) continue;
    
    const found = words.some(word => {
      const similarity = calculateStringSimilarity(word, nameWord);
      return similarity >= 0.85;
    });
    
    if (found) {
      matchedWords++;
      foundNameParts.push(nameWord);
    }
  }

  const nameMatchScore = matchedWords / profileNameWords.filter(w => w.length > 2).length;
  const nameMatchThreshold = 0.85;

  console.log('Name match analysis:', {
    score: nameMatchScore,
    threshold: nameMatchThreshold,
    matchedWords,
    totalWords: profileNameWords.length,
    foundParts: foundNameParts
  });

  if (nameMatchScore < nameMatchThreshold) {
    return {
      success: false,
      message: 'Nome não corresponde',
      score: nameMatchScore
    };
  }

  return {
    success: true,
    nameMatchScore,
    cpfMatch: true,
    extractedCPF: extractedCPFs[0]
  };
}
