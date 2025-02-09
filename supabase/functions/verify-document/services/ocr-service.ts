
import { createWorker } from 'https://esm.sh/tesseract.js@5.0.5';
import { normalizeString } from '../utils/string-utils.ts';
import { calculateStringSimilarity } from '../utils/string-utils.ts';
import type { ProfileData } from '../types.ts';

export async function performOCR(imageBase64: string) {
  const worker = await createWorker('por');
  
  try {
    const result = await worker.recognize(`data:image/jpeg;base64,${imageBase64}`, {
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,- ',
      tessjs_create_pdf: '1',
      tessjs_pdf_name: 'ocr_result',
      tessjs_create_hocr: '1',
      tessedit_pageseg_mode: '1',
      tessedit_ocr_engine_mode: '2',
    });

    return result.data.text;
  } finally {
    await worker.terminate();
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
