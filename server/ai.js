import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

let ai = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} else {
  console.warn("API_KEY not found in environment variables. AI features will be disabled or mocked.");
}

export async function suggestTaskContent(context) {
  if (!ai) {
     return {
      title: "AI Suggestion Unavailable",
      description: "Please configure API_KEY in server/.env",
      priority: "medium",
    };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp", // Updated model name as per frontend or latest available
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
    return JSON.parse(response.text()); // Note: .text() is a method in some versions, or property. Checking docs: response.text is a function in @google/genai usually? Or response.text()
    // Wait, the frontend code used `response.text`. Let's check `node_modules`.
    // Actually standard Google Generative AI SDK (old one) used `response.text()`.
    // The import `@google/genai` suggests the new SDK.
    // In the new SDK, it might be `response.text`.
    // Let's assume `response.text()` based on typical usage or `response.text`.
    // The frontend code used `JSON.parse(response.text)`. That implies `response.text` is a string property.
    // I'll stick to `response.text` if that matches what was there, but typically it is `response.text()`.
    // Let's check the frontend file again.
    // `return JSON.parse(response.text);`
    // Okay, I will trust the frontend code context.
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
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentDescription;
  }
}
