import { api } from './api';

export async function suggestTaskContent(context: string) {
  try {
    return await api.suggestTaskContent(context);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      title: "AI Suggested Task",
      description: "Unable to generate description at this time.",
      priority: "medium",
    };
  }
}

export async function suggestTaskDescription(title: string, currentDescription: string) {
  try {
    return await api.suggestTaskDescription(title, currentDescription);
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentDescription;
  }
}
