import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

let ai = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} else {
  console.warn("API_KEY not found in environment variables. AI features will be disabled.");
}

export async function suggestTaskContent(context) {
  if (!ai) {
     return {
      title: "AI Disabled",
      description: "AI features are currently disabled.",
      priority: "medium",
    };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Suggest a new Kanban task for a project with the following context: ${context}. The suggestion should be professional and relevant.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            priority: { type: Type.STRING, description: "high, medium, or low" },
          },
          required: ["title", "description", "priority"],
        },
      },
    });
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      title: "AI Suggested Task",
      description: "Unable to generate description at this time.",
      priority: "medium",
    };
  }
}

export async function suggestTaskDescription(title, currentDescription) {
  if (!ai) return currentDescription;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Improve and expand this task description for a professional Kanban board.
      Task Title: ${title}
      Current Description: ${currentDescription || "None"}
      Requirements: Be concise but clear, use bullet points if helpful, keep it professional.`,
    });
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentDescription;
  }
}
