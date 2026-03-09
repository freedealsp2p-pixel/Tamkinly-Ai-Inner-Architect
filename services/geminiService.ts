import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { TAMKINLY_SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

const getAIClient = () => {
  // Check process.env first, then fall back to a global variable injected by WordPress
  const apiKey = process.env.API_KEY || (window as any).TAMKINLY_CONFIG?.apiKey;
  
  if (!apiKey) {
    console.error("Tamkinly Config Error: API Key missing.");
    // We don't throw immediately to allow UI to perhaps show a graceful error state if needed,
    // but the library requires it.
    throw new Error("API Key not found in environment variables or window.TAMKINLY_CONFIG");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async () => {
  try {
    const ai = getAIClient();
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: TAMKINLY_SYSTEM_INSTRUCTION,
        temperature: 0.5,
        maxOutputTokens: 1000,
        tools: [{ googleSearch: {} }],
      },
    });
  } catch (error) {
    console.error("Failed to initialize AI client:", error);
    throw error;
  }
};

export const sendMessageToTamkinly = async (message: string): Promise<string> => {
  if (!chatSession) {
    try {
      await initializeChat();
    } catch (e) {
      return "System Error: Unable to access configuration. Please check API Key settings.";
    }
  }

  if (!chatSession) {
    return "Connection to inner consciousness failed.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I apologize, I am unable to process that reflection at this moment. Let us pause and try again.";
  } catch (error) {
    console.error("Error communicating with Tamkinly Guide:", error);
    return "I am having trouble connecting to my deeper knowledge base. Please breathe, and try again in a moment.";
  }
};