import { 
  AIService, 
  SkillGapAnalysisResult, 
  ResumeAnalysisData, 
  InterviewFeedback, 
  ProjectRecommendation, 
  ChatMessage, 
  UserProfile 
} from "../types";
import { MockAIService } from "./mock-ai.service";

export class GeminiAIService implements AIService {
  private apiKey: string;
  private fallbackService: MockAIService;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.fallbackService = new MockAIService();
  }

  private cleanJson(raw: string): string {
    return raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
  }

  private async callGemini(prompt: string, jsonResponse = false): Promise<string> {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 2048,
              ...(jsonResponse ? { responseMimeType: "application/json" } : {})
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = (await response.json()) as any;
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return jsonResponse ? this.cleanJson(text) : text;
    } catch (error) {
      console.warn("Gemini API call failed, utilizing high-fidelity fallback service:", error);
      throw error;
    }
  }

  async analyzeResume(resumeText: string, targetRole: string): Promise<ResumeAnalysisData> {
    try {
      const prompt = `You are an elite Tech Career Advisor and ATS system. Analyze this candidate resume for a ${targetRole} role:
${resumeText}

Respond ONLY with valid JSON matching this schema:
{
  "atsScore": number (0-100),
  "skillsScore": number (0-100),
  "formattingScore": number (0-100),
  "experienceScore": number (0-100),
  "projectsScore": number (0-100),
  "keywordsScore": number (0-100),
  "strengths": string[],
  "improvements": string[],
  "bulletRewrites": [
    { "role": string, "before": string, "after": string, "impactReason": string }
  ]
}`;
      const res = await this.callGemini(prompt, true);
      return JSON.parse(res);
    } catch {
      return this.fallbackService.analyzeResume(resumeText, targetRole);
    }
  }

  async analyzeSkillGap(targetRole: string, currentSkills: string[]): Promise<SkillGapAnalysisResult> {
    try {
      const prompt = `Analyze the skill gaps for target role "${targetRole}" with current skills: ${currentSkills.join(", ")}.
Respond with JSON matching the SkillGapAnalysisResult schema.`;
      const res = await this.callGemini(prompt, true);
      return JSON.parse(res);
    } catch {
      return this.fallbackService.analyzeSkillGap(targetRole, currentSkills);
    }
  }

  async evaluateInterviewAnswer(
    question: string,
    answer: string,
    category: string,
    difficulty: string,
    role: string
  ): Promise<InterviewFeedback> {
    try {
      const prompt = `You are a Senior Engineering Interviewer evaluating a candidate for ${role}.
Category: ${category}, Difficulty: ${difficulty}.
Question: ${question}
Candidate Answer: ${answer}

Evaluate and return JSON with:
{
  "technicalAccuracy": number (0-100),
  "communication": number (0-100),
  "structure": number (0-100),
  "overall": number (0-100),
  "strengths": string[],
  "recommendations": string[],
  "modelAnswer": string
}`;
      const res = await this.callGemini(prompt, true);
      return JSON.parse(res);
    } catch {
      return this.fallbackService.evaluateInterviewAnswer(question, answer, category, difficulty, role);
    }
  }

  async generateProjectPlan(
    role: string,
    missingSkills: string[],
    userInterests?: string
  ): Promise<ProjectRecommendation> {
    try {
      const prompt = `Generate an engineering project recommendation for a candidate targeting "${role}" who needs to learn: ${missingSkills.join(", ")}.
Return structured JSON with roadmap phases.`;
      const res = await this.callGemini(prompt, true);
      return JSON.parse(res);
    } catch {
      return this.fallbackService.generateProjectPlan(role, missingSkills, userInterests);
    }
  }

  async chatCareerAssistant(
    messages: { role: string; content: string }[],
    userProfile: Partial<UserProfile>
  ): Promise<ChatMessage> {
    try {
      const conversation = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n");
      const prompt = `You are CareerPilot AI, an elite mentor helping college student ${userProfile.name || "Candidate"} targeting ${userProfile.targetRole || "Software Engineer"}.
Be concise, highly actionable, and structured with markdown headings and bullet points.

Conversation:
${conversation}

Provide your response.`;
      const text = await this.callGemini(prompt, false);
      return {
        id: "gemini-msg-" + Date.now(),
        role: "assistant",
        content: text,
        timestamp: "Just now",
        suggestedPrompts: [
          "Create a 30-Day Plan for this",
          "Analyze my resume",
          "What projects should I build next?",
          "Give me an interview question"
        ]
      };
    } catch {
      return this.fallbackService.chatCareerAssistant(messages, userProfile);
    }
  }
}
