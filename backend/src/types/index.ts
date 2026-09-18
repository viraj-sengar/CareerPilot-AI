export type TargetRole = 
  | "Software Engineer"
  | "Frontend Developer"
  | "Backend Developer"
  | "Full Stack Developer"
  | "Data Scientist"
  | "AI/ML Engineer"
  | "Product Manager"
  | "UI/UX Designer";

export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced";
export type CareerGoalType = "Internship" | "Full-time job" | "Skill improvement" | "Career transition";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  targetRole: TargetRole | string;
  experienceLevel: ExperienceLevel;
  careerGoal: CareerGoalType;
  preferredLocation: string;
  readinessScore: number;
  resumeScore: number;
  skillMatchScore: number;
  totalApplications: number;
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface ResumeAnalysisData {
  atsScore: number;
  skillsScore: number;
  formattingScore: number;
  experienceScore: number;
  projectsScore: number;
  keywordsScore: number;
  strengths: string[];
  improvements: string[];
  bulletRewrites: Array<{
    before: string;
    after: string;
    impactReason: string;
    role: string;
  }>;
}

export interface InterviewFeedback {
  technicalAccuracy: number;
  communication: number;
  structure: number;
  overall: number;
  strengths: string[];
  recommendations: string[];
  modelAnswer: string;
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  role: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  whyRecommended: string;
  techStack: string[];
  estimatedHours: number;
  roadmapPhases: Array<{
    phase: string;
    title: string;
    description: string;
    codeSnippet?: string;
    estimatedHours: number;
    completed: boolean;
  }>;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
}

export interface SkillGapAnalysisResult {
  targetRole: string;
  readinessPercentage: number;
  skills: Array<{
    skill: string;
    current: number;
    required: number;
    gap: number;
    status: string;
    category: string;
  }>;
  biggestGap: {
    skill: string;
    gapPercentage: number;
    aiRecommendation: string;
    suggestedProjectTitle: string;
  };
  learningTrajectoryDays: number;
}

export interface AIService {
  analyzeResume(resumeText: string, targetRole: string): Promise<ResumeAnalysisData>;
  analyzeSkillGap(targetRole: string, currentSkills: string[]): Promise<SkillGapAnalysisResult>;
  evaluateInterviewAnswer(
    question: string,
    answer: string,
    category: string,
    difficulty: string,
    role: string
  ): Promise<InterviewFeedback>;
  generateProjectPlan(
    role: string,
    missingSkills: string[],
    userInterests?: string
  ): Promise<ProjectRecommendation>;
  chatCareerAssistant(
    messages: { role: string; content: string }[],
    userProfile: Partial<UserProfile>
  ): Promise<ChatMessage>;
}
