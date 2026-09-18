import { AIService } from "../types";
import { MockAIService } from "./mock-ai.service";
import { GeminiAIService } from "./gemini.service";
import config from "../config";

export function getAIService(overrideApiKey?: string): AIService {
  const apiKey = overrideApiKey || config.geminiApiKey;
  if (apiKey && apiKey.trim() !== "") {
    return new GeminiAIService(apiKey.trim());
  }
  return new MockAIService();
}
