
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeRequestPriority = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following humanitarian request and determine its priority level (High, Medium, Low) and provide a one-sentence summary of why. Return in JSON format. Description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            priority: { type: Type.STRING, description: 'Priority level (High, Medium, or Low)' },
            reason: { type: Type.STRING, description: 'Brief reasoning for the priority' },
            tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Relevant keywords' }
          },
          required: ['priority', 'reason', 'tags']
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Priority Analysis Error:", error);
    return { priority: "Medium", reason: "Standard processing", tags: ["General"] };
  }
};

export const generateThankYouMessage = async (donorName: string, impact: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a warm, compassionate, and short 2-sentence thank you message to a donor named ${donorName} who just donated ${impact}.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    return `Thank you, ${donorName}, for your incredible contribution of ${impact}! You are making a real difference.`;
  }
};
