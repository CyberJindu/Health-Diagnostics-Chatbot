import { TextGenerationClient } from "@google/generative-ai";

const client = new TextGenerationClient({
  apiKey: process.env.REACT_APP_GEMINI_API_KEY
});

export async function analyzeSymptoms(symptoms) {
  const prompt = `You are a medical doctor. Diagnose the following symptoms and provide possible causes and advice: "${symptoms}"`;

  const response = await client.generateText({
    model: "text-bison-001",
    prompt,
    temperature: 0.5,
    maxOutputTokens: 500
  });

  return response.candidates[0].output;
}
