import { Request, Response } from "express";
import { getAIService } from "../services/ai.service";

export async function chatHandler(req: Request, res: Response): Promise<void> {
  try {
    const { messages, userProfile, apiKey } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Messages array is required" });
      return;
    }

    const ai = getAIService(apiKey);
    const response = await ai.chatCareerAssistant(messages, userProfile || {});
    res.json(response);
  } catch (error) {
    console.error("AI Chat Controller Error:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
}

export async function interviewHandler(req: Request, res: Response): Promise<void> {
  try {
    const { question, answer, category, difficulty, role, apiKey } = req.body;

    if (!question || !answer) {
      res.status(400).json({ error: "Question and answer are required" });
      return;
    }

    const ai = getAIService(apiKey);
    const feedback = await ai.evaluateInterviewAnswer(
      question,
      answer,
      category || "Technical",
      difficulty || "Medium",
      role || "Software Engineer"
    );

    res.json(feedback);
  } catch (error) {
    console.error("AI Interview Controller Error:", error);
    res.status(500).json({ error: "Failed to evaluate interview answer" });
  }
}

export async function resumeHandler(req: Request, res: Response): Promise<void> {
  try {
    const { resumeText, targetRole, apiKey } = req.body;

    if (!resumeText) {
      res.status(400).json({ error: "Resume text is required" });
      return;
    }

    const ai = getAIService(apiKey);
    const analysis = await ai.analyzeResume(resumeText, targetRole || "Software Engineer");
    res.json(analysis);
  } catch (error) {
    console.error("AI Resume Controller Error:", error);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
}

export async function skillGapHandler(req: Request, res: Response): Promise<void> {
  try {
    const { targetRole, currentSkills, apiKey } = req.body;

    const ai = getAIService(apiKey);
    const result = await ai.analyzeSkillGap(
      targetRole || "Software Engineer",
      Array.isArray(currentSkills) ? currentSkills : []
    );

    res.json(result);
  } catch (error) {
    console.error("AI Skill Gap Controller Error:", error);
    res.status(500).json({ error: "Failed to analyze skill gap" });
  }
}

export async function projectHandler(req: Request, res: Response): Promise<void> {
  try {
    const { role, missingSkills, userInterests, apiKey } = req.body;

    const ai = getAIService(apiKey);
    const plan = await ai.generateProjectPlan(
      role || "Software Engineer",
      Array.isArray(missingSkills) ? missingSkills : [],
      userInterests
    );

    res.json(plan);
  } catch (error) {
    console.error("AI Project Controller Error:", error);
    res.status(500).json({ error: "Failed to generate project recommendation" });
  }
}
