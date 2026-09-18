import { 
  AIService, 
  SkillGapAnalysisResult, 
  ResumeAnalysisData, 
  InterviewFeedback, 
  ProjectRecommendation, 
  ChatMessage, 
  UserProfile 
} from "../types";

export const DEFAULT_SKILL_GAPS = [
  {
    skill: "Spring Boot",
    current: 40,
    required: 90,
    gap: 50,
    status: "CRITICAL_GAP",
    category: "Backend"
  },
  {
    skill: "REST APIs & Microservices",
    current: 55,
    required: 95,
    gap: 40,
    status: "HIGH_GAP",
    category: "Architecture"
  },
  {
    skill: "Docker & Containerization",
    current: 35,
    required: 80,
    gap: 45,
    status: "HIGH_GAP",
    category: "DevOps"
  },
  {
    skill: "Database Indexing & PostgreSQL",
    current: 65,
    required: 85,
    gap: 20,
    status: "MODERATE_GAP",
    category: "Database"
  },
  {
    skill: "CI/CD & GitHub Actions",
    current: 50,
    required: 75,
    gap: 25,
    status: "MODERATE_GAP",
    category: "DevOps"
  },
  {
    skill: "Java / OOP Concepts",
    current: 85,
    required: 90,
    gap: 5,
    status: "STRONG",
    category: "Foundation"
  }
];

export class MockAIService implements AIService {
  async analyzeResume(resumeText: string, targetRole: string): Promise<ResumeAnalysisData> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const textLower = resumeText.toLowerCase();
    let scoreMod = 0;
    if (textLower.includes("spring") || textLower.includes("rest api")) scoreMod += 4;
    if (textLower.includes("docker") || textLower.includes("aws")) scoreMod += 3;
    if (textLower.includes("optimized") || textLower.includes("reduced") || textLower.includes("%")) scoreMod += 3;

    return {
      atsScore: Math.min(94, 84 + scoreMod),
      skillsScore: 92,
      formattingScore: 89,
      experienceScore: 82,
      projectsScore: 86,
      keywordsScore: 90,
      strengths: [
        `Strong technical foundation matching ${targetRole || "Software Engineer"} requirements.`,
        "Clean single-column ATS-friendly structure without problematic tables or graphics.",
        "Demonstrated hands-on experience with core programming and database paradigms.",
        "Clear educational achievements and relevant technical coursework listed."
      ],
      improvements: [
        "Quantify project bullets with concrete outcomes (e.g., latency reduction, request concurrency).",
        "Add missing high-demand keywords: Spring Boot, REST APIs, Docker, and CI/CD pipelines.",
        "Highlight architectural decisions and trade-offs rather than basic feature descriptions.",
        "Include automated test framework experience (e.g., JUnit, Mockito, Cypress)."
      ],
      bulletRewrites: [
        {
          role: "Full Stack / Backend",
          before: "Built a web app with user authentication and database storage.",
          after: "Architected a scalable microservice application featuring JWT token authentication and PostgreSQL indexing, handling 450+ concurrent requests with sub-120ms latency.",
          impactReason: "Adds quantifiable performance metrics, specific security protocols, and engineering scale."
        },
        {
          role: "Database Engineering",
          before: "Improved database query performance for large datasets.",
          after: "Engineered database query optimization and composite indexing strategy across 6 core tables, slashing execution time by 64% on 250,000+ records.",
          impactReason: "Replaces vague claims with concrete dataset magnitude and measured performance gain."
        },
        {
          role: "Backend & Systems",
          before: "Connected third-party APIs and handled data fetching.",
          after: "Implemented resilient REST API integrations with circuit-breaker patterns, retry policies, and automated rate-limiting to maintain 99.9% service uptime.",
          impactReason: "Demonstrates enterprise reliability patterns, error resiliency, and architectural maturity."
        }
      ]
    };
  }

  async analyzeSkillGap(targetRole: string, _currentSkills: string[]): Promise<SkillGapAnalysisResult> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    let gapSkill = "Spring Boot";
    let gapAmount = 50;
    let recProject = "AI Job Recommendation Engine";

    if (targetRole.toLowerCase().includes("frontend")) {
      gapSkill = "Next.js & Performance Tuning";
      gapAmount = 45;
      recProject = "Realtime Collaborative Whiteboard";
    } else if (targetRole.toLowerCase().includes("ai") || targetRole.toLowerCase().includes("ml")) {
      gapSkill = "PyTorch & Vector Embeddings";
      gapAmount = 60;
      recProject = "Multimodal Semantic Search Engine";
    }

    return {
      targetRole: targetRole || "Software Engineer",
      readinessPercentage: 78,
      skills: DEFAULT_SKILL_GAPS,
      biggestGap: {
        skill: gapSkill,
        gapPercentage: gapAmount,
        aiRecommendation: `Build a production-grade REST API utilizing ${gapSkill} and PostgreSQL to demonstrate hands-on enterprise competency.`,
        suggestedProjectTitle: recProject
      },
      learningTrajectoryDays: 30
    };
  }

  async evaluateInterviewAnswer(
    question: string,
    answer: string,
    _category: string,
    _difficulty: string,
    _role: string
  ): Promise<InterviewFeedback> {
    await new Promise((resolve) => setTimeout(resolve, 900));

    const ansLower = answer.toLowerCase();
    const length = answer.trim().split(/\s+/).length;

    let accuracy = 75;
    let comm = 76;
    let structure = 78;

    if (length > 60) {
      accuracy += 8;
      structure += 6;
      comm += 5;
    }
    if (ansLower.includes("because") || ansLower.includes("result") || ansLower.includes("trade-off") || ansLower.includes("for example")) {
      structure += 7;
      comm += 6;
    }

    const overall = Math.round((accuracy + comm + structure) / 3);

    return {
      technicalAccuracy: Math.min(96, accuracy),
      communication: Math.min(94, comm),
      structure: Math.min(95, structure),
      overall: Math.min(95, overall),
      strengths: [
        "Clear conceptual grasp of the core mechanism requested in the prompt.",
        "Addressed the primary problem without straying off topic.",
        "Demonstrated logical train of thought suitable for technical interviewers."
      ],
      recommendations: [
        "Include specific edge cases or failure modes (e.g., hash collision under heavy load or memory constraints).",
        "Adopt the STAR method (Situation, Task, Action, Result) for behavioral scenarios.",
        "Explicitly mention Big-O time and space complexity trade-offs where applicable."
      ],
      modelAnswer: `In a standard technical interview, a top-tier answer addresses: 1) Core mechanism and definitions, 2) Step-by-step internal workflow, 3) Edge case handling (e.g., collisions, scaling limits), and 4) Concrete time & space complexity implications.`
    };
  }

  async generateProjectPlan(
    role: string,
    missingSkills: string[],
    _userInterests?: string
  ): Promise<ProjectRecommendation> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      id: "ai-gen-proj-" + Date.now(),
      title: "AI Job Recommendation Engine",
      role: role || "Software Engineer",
      difficulty: "Intermediate",
      summary: "A production-grade microservice that ingests job descriptions, vectorizes candidate resumes, and computes real-time cosine similarity matches with Spring Boot & PostgreSQL.",
      whyRecommended: `This project directly addresses your primary skill gaps: ${missingSkills.slice(0, 3).join(", ") || "Spring Boot & REST APIs"}. It gives hiring managers tangible proof of your backend depth.`,
      techStack: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Docker", "pgvector"],
      estimatedHours: 40,
      roadmapPhases: [
        {
          phase: "1. Setup",
          title: "Project Scaffolding & Architecture",
          description: "Initialize Spring Boot 3 with Maven, configure Spring Data JPA, Spring Web, and Lombok.",
          codeSnippet: `// Spring Boot 3 Maven dependencies\n<dependency>\n  <groupId>org.springframework.boot</groupId>\n  <artifactId>spring-boot-starter-web</artifactId>\n</dependency>`,
          estimatedHours: 4,
          completed: true
        },
        {
          phase: "2. Database",
          title: "Schema Design & Indexing",
          description: "Create relational tables with PostgreSQL vector extension and GIN indexes.",
          estimatedHours: 6,
          completed: true
        },
        {
          phase: "3. Backend API",
          title: "RESTful Endpoints & Controller Layer",
          description: "Expose clean REST endpoints with DTO validation and GlobalExceptionHandler.",
          estimatedHours: 8,
          completed: false
        },
        {
          phase: "4. AI Integration",
          title: "Embedding Generation & Semantic Scoring",
          description: "Integrate vector similarity scoring to compare resume bullet points against job requirement keywords.",
          estimatedHours: 6,
          completed: false
        },
        {
          phase: "5. Frontend UI",
          title: "Interactive Candidate Discovery UI",
          description: "Build a modern dashboard with match dials and skill tags.",
          estimatedHours: 8,
          completed: false
        },
        {
          phase: "6. Testing",
          title: "JUnit 5 & Integration Test Suite",
          description: "Achieve 85%+ test coverage across service layers and MockMvc controller tests.",
          estimatedHours: 4,
          completed: false
        },
        {
          phase: "7. Deployment",
          title: "Containerize with Docker & CI/CD",
          description: "Multi-stage Dockerfile and automated GitHub Actions testing pipeline.",
          estimatedHours: 4,
          completed: false
        }
      ]
    };
  }

  async chatCareerAssistant(
    messages: { role: string; content: string }[],
    userProfile: Partial<UserProfile>
  ): Promise<ChatMessage> {
    await new Promise((resolve) => setTimeout(resolve, 750));
    const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || "";

    if (lastUserMessage.includes("learn") || lastUserMessage.includes("skill")) {
      return {
        id: "msg-" + Date.now(),
        role: "assistant",
        content: `### 🎯 Targeted Skill Priorities for ${userProfile.targetRole || "Software Engineer"}\n\nBased on your current profile and target of **Software Engineer Intern**, here is your priority learning roadmap:\n\n1. **Spring Boot (Highest Gap — 50%)**\n   - Enterprise Java backend services rely on Spring Boot.\n   - Focus: Spring Data JPA, REST Controllers, Dependency Injection, Exception Handling.\n\n2. **REST APIs & Idempotency (40% Gap)**\n   - Master HTTP methods, status codes, pagination, and OpenAPI / Swagger documentation.\n\n3. **Docker & Containerization (55% Gap)**\n   - Learn multi-stage builds, \`docker-compose.yml\` for local Postgres + Spring Boot orchestration.\n\n4. **System Design Fundamentals**\n   - Focus on caching with Redis, horizontal scaling, and database indexing.`,
        timestamp: "Just now",
        suggestedPrompts: [
          "Create a 30-Day Plan for Spring Boot",
          "Analyze my resume for backend keywords",
          "What interview questions should I practice?",
          "Show my biggest skill gaps"
        ]
      };
    } else if (lastUserMessage.includes("resume")) {
      return {
        id: "msg-" + Date.now(),
        role: "assistant",
        content: `### 📄 Resume Analysis & Optimization Insights\n\nYour current resume ATS score is **87/100**. Here is what will get you to **95+**:\n\n* **Quantify Results**: Replace phrases like *"Worked on web app"* with specific metrics: *"Architected microservice handling 450+ concurrent requests, reducing latency by 24%"*.\n* **Backend Keyword Density**: Add explicit mentions of *Spring Boot*, *Docker*, *REST APIs*, and *JUnit*.\n* **Highlight Technical Trade-offs**: Recruiters want to know *why* you chose PostgreSQL over MongoDB or why you used Redis for caching.`,
        timestamp: "Just now",
        suggestedPrompts: [
          "Rewrite my e-commerce project bullets",
          "What keywords are missing from my resume?",
          "Am I ready for Stripe's SWE intern role?"
        ]
      };
    } else if (lastUserMessage.includes("interview") || lastUserMessage.includes("ready")) {
      return {
        id: "msg-" + Date.now(),
        role: "assistant",
        content: `### 🎙️ Technical Interview Readiness Check\n\nYou have **3 upcoming technical interviews** (Amazon, Bloomberg, Razorpay).\n\n* **Strengths**: Solid Java OOP fundamentals, binary trees, and relational SQL queries.\n* **Focus Area for Amazon**: Leadership Principles (Customer Obsession & Bias for Action) and DFS/BFS graph traversals.\n* **Focus Area for Bloomberg**: System architecture, memory layout, and concurrency basics.`,
        timestamp: "Just now",
        suggestedPrompts: [
          "Ask me a Medium Technical Question",
          "Test me on Amazon Leadership Principles",
          "Explain HashMap collision in Java 8"
        ]
      };
    } else {
      return {
        id: "msg-" + Date.now(),
        role: "assistant",
        content: `### 👋 Hi ${userProfile.name?.split(" ")[0] || "there"}! I'm your CareerPilot AI Advisor.\n\nI'm here to turn your career ambitions into an actionable plan. Here is what we can do together right now:\n\n* 📊 **Identify Skill Gaps**: Uncover exactly what skills separate you from top-tier roles.\n* 🚀 **Build Tailored Projects**: Generate step-by-step roadmaps for resume-defining projects.\n* 📄 **Score & Optimize Your Resume**: Get instant ATS feedback and quantified bullet rewrites.\n* 🎯 **Match Suitable Jobs**: Find verified openings matching your current technical profile.\n* 🎙️ **Practice Mock Interviews**: Get instant feedback on technical accuracy and communication.\n\nWhat would you like to focus on today?`,
        timestamp: "Just now",
        suggestedPrompts: [
          "What should I learn next for backend development?",
          "Analyze my resume and find weaknesses",
          "Am I ready for backend roles?",
          "What projects should I build next?",
          "Prepare me for an Amazon interview"
        ]
      };
    }
  }
}
