// src/api/gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// Create Gemini client using your VITE env key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Function to diagnose symptoms using Gemini AI
export async function analyzeSymptoms(symptoms) {
  const model = genAI.getGenerativeModel({ model: "text-bison-001" });

  const prompt = `
  You are a medical doctor. Diagnose the following symptoms and provide possible causes and advice:
  "${symptoms}"

  Rules:
  - Give clear explanations in 2–3 paragraphs.
  - Provide practical guidance or next steps.
  - Use friendly, professional tone.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
