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

export interface SkillItem {
  id: string;
  name: string;
  category: "Foundation" | "Backend" | "Frontend" | "DevOps" | "Database" | "AI/ML" | "Architecture";
  currentLevel: number; // 0-100
  targetLevel: number;  // 0-100
  status: "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED";
  importance: "Core" | "High" | "Medium";
  estimatedHours: number;
  whyMatters: string;
  resources: Array<{ title: string; type: "Docs" | "Course" | "Video" | "Book"; url: string }>;
  recommendedProjects: string[];
}

export interface RoadmapPhaseData {
  phaseNumber: number;
  title: string;
  description: string;
  status: "COMPLETED" | "IN_PROGRESS" | "LOCKED";
  skills: SkillItem[];
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

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  jobType: "Internship" | "Full-time" | "Contract";
  workModel: "Remote" | "Hybrid" | "On-site";
  salaryRange: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  aiExplanation: string;
  featured?: boolean;
}

export type ApplicationStatus = "APPLIED" | "ASSESSMENT" | "INTERVIEW" | "OFFER" | "REJECTED";

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  salary?: string;
  appliedDate: string;
  deadlineDate?: string;
  nextInterviewDate?: string;
  notes?: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  matchedScore?: number;
}

export interface InterviewQuestion {
  id: string;
  category: "Technical" | "Behavioral" | "HR" | "System Design";
  difficulty: "Easy" | "Medium" | "Hard";
  role: string;
  question: string;
  context?: string;
  sampleAnswer?: string;
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

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "INTERVIEW" | "RESUME" | "JOB" | "SKILL" | "PROJECT" | "INFO";
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  recommendations?: Array<{
    title: string;
    description: string;
    badge: string;
    actionLabel?: string;
    actionType?: "navigate" | "roadmap" | "project";
    actionTarget?: string;
  }>;
  suggestedPrompts?: string[];
}
