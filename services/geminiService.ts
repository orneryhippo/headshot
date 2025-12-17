import { GoogleGenAI } from "@google/genai";
import { stripBase64Prefix, getMimeTypeFromBase64 } from "./utils";

const API_KEY = process.env.API_KEY || '';

// Use gemini-2.5-flash-image (Nano Banana) for image tasks as requested
const MODEL_NAME = 'gemini-2.5-flash-image';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateProfessionalHeadshot = async (
  base64Image: string,
  stylePrompt: string
): Promise<string> => {
  try {
    const imageData = stripBase64Prefix(base64Image);
    const mimeType = getMimeTypeFromBase64(base64Image);

    // We send the original selfie and ask it to transform it based on the style
    const prompt = `Transform this casual selfie into a high-quality professional headshot. 
    Maintain the facial features and identity of the person exactly, but change the clothing, lighting, and background to match this style: ${stylePrompt}. 
    Ensure the output is photorealistic, high resolution, and suitable for a LinkedIn profile.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // No responseMimeType for this model as per guidelines
    });

    return extractImageFromResponse(response);
  } catch (error) {
    console.error("Error generating headshot:", error);
    throw error;
  }
};

export const editHeadshot = async (
  base64Image: string,
  editInstruction: string
): Promise<string> => {
  try {
    const imageData = stripBase64Prefix(base64Image);
    const mimeType = getMimeTypeFromBase64(base64Image);

    const prompt = `Edit this image. Instruction: ${editInstruction}. Maintain high quality and photorealism.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    return extractImageFromResponse(response);
  } catch (error) {
    console.error("Error editing headshot:", error);
    throw error;
  }
};

// Helper to find the image part in the response
const extractImageFromResponse = (response: any): string => {
  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error("No candidates returned from Gemini.");
  }

  const parts = candidates[0].content.parts;
  for (const part of parts) {
    if (part.inlineData && part.inlineData.data) {
      return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
    }
  }

  // If we only got text back (e.g., refusal or error description)
  const textPart = parts.find((p: any) => p.text);
  if (textPart) {
    throw new Error(`Gemini returned text instead of an image: ${textPart.text}`);
  }

  throw new Error("No valid image data found in response.");
};
