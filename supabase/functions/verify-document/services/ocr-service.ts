
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
