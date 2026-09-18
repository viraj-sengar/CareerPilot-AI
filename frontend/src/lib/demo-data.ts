import { 
  UserProfile, 
  RoadmapPhaseData, 
  ResumeAnalysisData, 
  JobListing, 
  JobApplication, 
  ProjectRecommendation,
  NotificationItem,
  InterviewQuestion 
} from "./types";

export const DEMO_USER: UserProfile = {
  id: "user-alex-sharma",
  name: "Alex Sharma",
  email: "alex.sharma@stanford.edu",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  targetRole: "Software Engineer",
  experienceLevel: "Intermediate",
  careerGoal: "Internship",
  preferredLocation: "Remote / India / US",
  readinessScore: 82,
  resumeScore: 87,
  skillMatchScore: 76,
  totalApplications: 18,
  bio: "Final year CS student passionate about distributed systems, resilient backend APIs, and modern web architectures. Actively preparing for Software Engineering internships.",
  githubUrl: "https://github.com/alexsharma-dev",
  linkedinUrl: "https://linkedin.com/in/alexsharma-swe",
  portfolioUrl: "https://alexsharma.dev"
};

export const DEMO_ROADMAP: RoadmapPhaseData[] = [
  {
    phaseNumber: 1,
    title: "Phase 1: Foundations & Core Logic",
    description: "Master foundational computer science, object-oriented concepts, and algorithmic problem solving.",
    status: "COMPLETED",
    skills: [
      {
        id: "java-core",
        name: "Java & OOP",
        category: "Foundation",
        currentLevel: 90,
        targetLevel: 80,
        status: "COMPLETED",
        importance: "Core",
        estimatedHours: 40,
        whyMatters: "Java provides the object-oriented backbone for enterprise-scale backend services and competitive coding.",
        resources: [
          { title: "Java Programming Masterclass", type: "Course", url: "https://udemy.com" },
          { title: "Effective Java by Joshua Bloch", type: "Book", url: "https://amazon.com" }
        ],
        recommendedProjects: ["CLI Bank Management System", "Multi-threaded Web Crawler"]
      },
      {
        id: "dsa-core",
        name: "Data Structures & Algorithms",
        category: "Foundation",
        currentLevel: 85,
        targetLevel: 85,
        status: "COMPLETED",
        importance: "Core",
        estimatedHours: 60,
        whyMatters: "Essential for clearing technical coding rounds at top tech companies like Google, Amazon, and Stripe.",
        resources: [
          { title: "NeetCode 150", type: "Video", url: "https://neetcode.io" },
          { title: "LeetCode Premium Study Guide", type: "Docs", url: "https://leetcode.com" }
        ],
        recommendedProjects: ["Custom HashMap & LRU Cache Implementation", "Pathfinding Visualizer"]
      },
      {
        id: "git-core",
        name: "Git & Version Control",
        category: "Foundation",
        currentLevel: 90,
        targetLevel: 80,
        status: "COMPLETED",
        importance: "Core",
        estimatedHours: 15,
        whyMatters: "Required for every team collaboration, pull request review, and CI/CD workflow in modern software teams.",
        resources: [
          { title: "Git Pro Documentation", type: "Docs", url: "https://git-scm.com/book" }
        ],
        recommendedProjects: ["Open Source Contribution to Popular Devtools"]
      }
    ]
  },
  {
    phaseNumber: 2,
    title: "Phase 2: Backend & API Engineering",
    description: "Build robust REST APIs, handle relational database transactions, and design microservice contracts.",
    status: "IN_PROGRESS",
    skills: [
      {
        id: "spring-boot",
        name: "Spring Boot",
        category: "Backend",
        currentLevel: 25,
        targetLevel: 75,
        status: "IN_PROGRESS",
        importance: "Core",
        estimatedHours: 45,
        whyMatters: "The most widely demanded enterprise Java framework for building scalable web microservices.",
        resources: [
          { title: "Spring Boot 3 Official Guides", type: "Docs", url: "https://spring.io/guides" },
          { title: "Building Microservices with Spring Boot", type: "Course", url: "https://coursera.org" }
        ],
        recommendedProjects: ["E-Commerce Order Processing Service", "JWT Role-Based Auth Service"]
      },
      {
        id: "rest-apis",
        name: "RESTful APIs & OpenAPI",
        category: "Backend",
        currentLevel: 40,
        targetLevel: 80,
        status: "IN_PROGRESS",
        importance: "High",
        estimatedHours: 25,
        whyMatters: "Critical for designing clean API contracts, idempotency, rate limiting, and HTTP status handling.",
        resources: [
          { title: "RESTful API Design Best Practices", type: "Docs", url: "https://restfulapi.net" }
        ],
        recommendedProjects: ["RESTful Task & Event Scheduling API with Swagger Docs"]
      },
      {
        id: "sql-postgres",
        name: "SQL & PostgreSQL",
        category: "Database",
        currentLevel: 85,
        targetLevel: 75,
        status: "COMPLETED",
        importance: "Core",
        estimatedHours: 35,
        whyMatters: "Mastering complex JOINs, query indexing, ACID transactions, and schema normalization is vital for any SWE.",
        resources: [
          { title: "Use The Index, Luke!", type: "Docs", url: "https://use-the-index-luke.com" },
          { title: "PostgreSQL Tutorial", type: "Docs", url: "https://postgresqltutorial.com" }
        ],
        recommendedProjects: ["High-Traffic Analytics Schema with Partitioning & Indexes"]
      }
    ]
  },
  {
    phaseNumber: 3,
    title: "Phase 3: Advanced Systems & Containers",
    description: "Deepen understanding of distributed architecture, caching, containers, and asynchronous queues.",
    status: "IN_PROGRESS",
    skills: [
      {
        id: "system-design",
        name: "System Design & Caching",
        category: "Architecture",
        currentLevel: 10,
        targetLevel: 65,
        status: "IN_PROGRESS",
        importance: "High",
        estimatedHours: 50,
        whyMatters: "Required to clear senior intern and L3/L4 interviews; covers Redis caching, load balancers, and sharding.",
        resources: [
          { title: "System Design Primer by Donne Martin", type: "Docs", url: "https://github.com/donnemartin/system-design-primer" },
          { title: "Designing Data-Intensive Applications", type: "Book", url: "https://dataintensive.net" }
        ],
        recommendedProjects: ["Distributed In-Memory Key-Value Store", "URL Shortener with Redis Cache"]
      },
      {
        id: "docker-containers",
        name: "Docker & Containerization",
        category: "DevOps",
        currentLevel: 15,
        targetLevel: 70,
        status: "NOT_STARTED",
        importance: "High",
        estimatedHours: 20,
        whyMatters: "Standard for packaging reproducible applications, managing multi-container dev environments, and deployment.",
        resources: [
          { title: "Docker for Developers", type: "Course", url: "https://docker.com" }
        ],
        recommendedProjects: ["Docker Compose Multi-tier App with Backend, Frontend, and Redis"]
      }
    ]
  },
  {
    phaseNumber: 4,
    title: "Phase 4: Cloud & Production Deployment",
    description: "Deploy production applications on AWS, configure CI/CD pipelines, and implement monitoring.",
    status: "LOCKED",
    skills: [
      {
        id: "aws-cloud",
        name: "AWS Cloud (EC2, S3, RDS)",
        category: "DevOps",
        currentLevel: 20,
        targetLevel: 60,
        status: "NOT_STARTED",
        importance: "Medium",
        estimatedHours: 35,
        whyMatters: "Understanding cloud deployment, serverless lambda functions, and cloud infrastructure.",
        resources: [
          { title: "AWS Certified Cloud Practitioner Essentials", type: "Course", url: "https://aws.amazon.com" }
        ],
        recommendedProjects: ["Automated Cloud File Ingestion Pipeline on AWS S3 & Lambda"]
      },
      {
        id: "cicd-devops",
        name: "CI/CD & GitHub Actions",
        category: "DevOps",
        currentLevel: 25,
        targetLevel: 65,
        status: "NOT_STARTED",
        importance: "Medium",
        estimatedHours: 15,
        whyMatters: "Automate test suites, linting, build pipelines, and production release branches.",
        resources: [
          { title: "GitHub Actions Documentation", type: "Docs", url: "https://docs.github.com/actions" }
        ],
        recommendedProjects: ["Automated Testing & Release Pipeline with Semantic Versioning"]
      }
    ]
  }
];

export const DEMO_SKILL_GAPS = [
  { skill: "Java", current: 90, required: 80, gap: 0, status: "Ready", category: "Backend" },
  { skill: "SQL & PostgreSQL", current: 85, required: 75, gap: 0, status: "Ready", category: "Database" },
  { skill: "Git & GitHub", current: 90, required: 80, gap: 0, status: "Ready", category: "DevOps" },
  { skill: "Data Structures", current: 85, required: 85, gap: 0, status: "Ready", category: "Foundation" },
  { skill: "React / Next.js", current: 65, required: 70, gap: 5, status: "Minor Gap", category: "Frontend" },
  { skill: "REST APIs", current: 40, required: 80, gap: 40, status: "Moderate Gap", category: "Backend" },
  { skill: "Spring Boot", current: 25, required: 75, gap: 50, status: "Biggest Gap", category: "Backend" },
  { skill: "Docker", current: 15, required: 70, gap: 55, status: "High Priority", category: "DevOps" },
  { skill: "AWS Cloud", current: 20, required: 60, gap: 40, status: "Moderate Gap", category: "DevOps" },
  { skill: "System Design", current: 10, required: 65, gap: 55, status: "High Priority", category: "Architecture" }
];

export const DEMO_RESUME_ANALYSIS: ResumeAnalysisData = {
  atsScore: 87,
  skillsScore: 92,
  formattingScore: 88,
  experienceScore: 80,
  projectsScore: 85,
  keywordsScore: 90,
  strengths: [
    "Strong technical foundation in Java, Python, SQL, and Object-Oriented design.",
    "Comprehensive coverage of relevant CS coursework (Algorithms, OS, DBMS).",
    "Clean single-column layout adhering to modern ATS parsing standards.",
    "Active GitHub and LinkedIn profile links included with clear contact info."
  ],
  improvements: [
    "Project bullet points lack quantified impact metrics (latency reduction, query throughput, users served).",
    "Targeted keywords for enterprise backend roles (Spring Boot, REST APIs, Docker, CI/CD) are underrepresented.",
    "Experience section could better emphasize engineering decisions over passive task execution.",
    "Missing clear mention of automated unit testing (JUnit, Mockito, Jest)."
  ],
  bulletRewrites: [
    {
      role: "E-Commerce Web Application",
      before: "Worked on an e-commerce website with product search and payment processing.",
      after: "Architected a full-stack e-commerce platform with fuzzy search indexing and Stripe payment integration, reducing checkout drop-off by 24% across 1,200+ simulated sessions.",
      impactReason: "Quantifies user impact, specifies architecture, and introduces performance metrics."
    },
    {
      role: "Database Optimization Project",
      before: "Made SQL queries faster and fixed slow queries in MySQL database.",
      after: "Analyzed database execution plans and optimized indexing strategy across 8 relational tables, slashing query latency by 68% and handling 450+ concurrent requests.",
      impactReason: "Replaces vague claim with technical rigor (execution plans, indexing strategy) and concrete speed improvements."
    },
    {
      role: "Student Portal Backend",
      before: "Created REST APIs for student registration and login.",
      after: "Engineered secure RESTful authentication endpoints utilizing Spring Security and JWT tokens, enforcing role-based access control for 2,500 active campus users.",
      impactReason: "Demonstrates enterprise security practices, framework familiarity, and scale."
    }
  ]
};

export const DEMO_JOBS: JobListing[] = [
  {
    id: "job-1",
    title: "Software Engineer Intern",
    company: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80",
    location: "San Francisco, CA / Remote",
    jobType: "Internship",
    workModel: "Remote",
    salaryRange: "$9,200 - $11,000 / mo",
    description: "Join Stripe's Core Infrastructure engineering team. You will build and scale reliable payment routing systems handling hundreds of millions in transactions daily.",
    responsibilities: [
      "Design and maintain scalable REST APIs for payment orchestration.",
      "Collaborate with senior engineers on database query optimization and distributed caching.",
      "Write comprehensive automated unit and integration tests.",
      "Participate in daily standups, code reviews, and architecture design reviews."
    ],
    requirements: [
      "Strong coding skills in Java, Python, or Go.",
      "Solid foundation in Data Structures, Algorithms, and Object-Oriented Design.",
      "Experience with relational databases (PostgreSQL or MySQL).",
      "Familiarity with version control (Git) and Unix/Linux environments."
    ],
    matchedSkills: ["Java", "SQL", "Data Structures", "Git", "OOP"],
    missingSkills: ["Spring Boot", "Docker"],
    matchPercentage: 92,
    aiExplanation: "You match 5 of 7 required skills. Your strong Java and SQL background makes you an exceptional candidate for Stripe's infrastructure track.",
    featured: true
  },
  {
    id: "job-2",
    title: "Backend Engineer - University Graduate",
    company: "Atlassian",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&auto=format&fit=crop&q=80",
    location: "Bengaluru, India / Hybrid",
    jobType: "Full-time",
    workModel: "Hybrid",
    salaryRange: "₹18 - ₹24 LPA",
    description: "Build the next generation of team collaboration platforms powering Jira and Confluence for millions of knowledge workers across the globe.",
    responsibilities: [
      "Develop high-throughput microservices using Java and Spring ecosystem.",
      "Implement resilient asynchronous event queues using Apache Kafka.",
      "Optimize data pipelines and cloud deployment scripts on AWS.",
      "Contribute to platform reliability and zero-downtime releases."
    ],
    requirements: [
      "B.Tech/B.E. in Computer Science or related engineering field (2025/2026 batch).",
      "Proficiency in Java and RESTful API development.",
      "Knowledge of Spring Boot, Docker, and AWS fundamentals is preferred.",
      "Strong analytical problem-solving and communication skills."
    ],
    matchedSkills: ["Java", "SQL", "Git", "REST APIs"],
    missingSkills: ["Spring Boot", "Docker", "AWS"],
    matchPercentage: 84,
    aiExplanation: "You match 4 of 6 key competencies. Completing the Spring Boot and Docker milestones on your roadmap will boost your profile into the top 5% of applicants.",
    featured: true
  },
  {
    id: "job-3",
    title: "Software Development Engineer Intern (Summer 2026)",
    company: "Amazon",
    companyLogo: "https://images.unsplash.com/photo-1523474255658-4af61825044d?w=80&auto=format&fit=crop&q=80",
    location: "Seattle, WA / Hyderabad, India",
    jobType: "Internship",
    workModel: "Hybrid",
    salaryRange: "$8,500 / mo + Relocation",
    description: "Work side-by-side with seasoned Amazon SDEs on customer-facing retail systems and AWS cloud tools that impact millions of users.",
    responsibilities: [
      "Write clean, maintainable, and well-tested Java/C++ production code.",
      "Build modular microservice features adhering to Amazon Leadership Principles.",
      "Debug distributed runtime bottlenecks and optimize database transactions."
    ],
    requirements: [
      "Enrolled in Bachelor's or Master's degree in Computer Science or equivalent.",
      "Strong command of Data Structures, Algorithms, and Object-Oriented Programming.",
      "Demonstrated ability to deliver functional software projects on GitHub."
    ],
    matchedSkills: ["Java", "Data Structures", "SQL", "Git", "OOP"],
    missingSkills: ["System Design"],
    matchPercentage: 90,
    aiExplanation: "Outstanding match! Amazon's SDE internship heavily evaluates core DSA, OOP, and behavioral excellence, where your profile is already very strong.",
    featured: false
  },
  {
    id: "job-4",
    title: "Full Stack Developer Intern",
    company: "Razorpay",
    companyLogo: "https://images.unsplash.com/photo-1556742049-0a67e5572293?w=80&auto=format&fit=crop&q=80",
    location: "Bengaluru, India / Remote",
    jobType: "Internship",
    workModel: "Remote",
    salaryRange: "₹45,000 - ₹65,000 / mo",
    description: "Help build the financial operating system for India's digital economy. Create high-conversion merchant dashboard experiences and robust payout APIs.",
    responsibilities: [
      "Build user-centric frontend interfaces using React, Next.js, and Tailwind CSS.",
      "Integrate backend REST endpoints with strict idempotency and webhook triggers.",
      "Improve web performance, Core Web Vitals, and responsive mobile rendering."
    ],
    requirements: [
      "Proficiency in JavaScript, TypeScript, React, and Node.js.",
      "Understanding of state management and asynchronous data fetching.",
      "Experience interacting with relational or NoSQL databases."
    ],
    matchedSkills: ["React", "JavaScript", "SQL", "Git"],
    missingSkills: ["TypeScript", "Node.js"],
    matchPercentage: 78,
    aiExplanation: "Good match for frontend/full-stack track. You have React and SQL basics; adding a dedicated TypeScript project will increase your interview readiness.",
    featured: false
  },
  {
    id: "job-5",
    title: "Junior Backend Developer",
    company: "Postman",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=80",
    location: "San Francisco, CA / Remote",
    jobType: "Full-time",
    workModel: "Remote",
    salaryRange: "$105,000 - $125,000 / yr",
    description: "Power the API platform used by over 30 million developers. Build developer-friendly tooling, schema registries, and automated test runners.",
    responsibilities: [
      "Design scalable RESTful and GraphQL APIs with comprehensive documentation.",
      "Maintain high-availability services backed by PostgreSQL and Redis.",
      "Implement rate-limiting and authorization policies for enterprise workspaces."
    ],
    requirements: [
      "1+ years experience or strong project portfolio in backend development.",
      "Deep understanding of HTTP protocols, REST conventions, and API security.",
      "Experience with Docker and automated testing frameworks."
    ],
    matchedSkills: ["SQL", "Git", "REST APIs"],
    missingSkills: ["Docker", "Redis", "Spring Boot"],
    matchPercentage: 72,
    aiExplanation: "Moderate match. Focus on completing the API Gateway and Redis Caching project in your Project Builder to bridge the missing criteria.",
    featured: false
  }
];

export const DEMO_APPLICATIONS: JobApplication[] = [
  // APPLIED (6)
  {
    id: "app-1",
    company: "Stripe",
    role: "Software Engineer Intern",
    location: "Remote",
    status: "APPLIED",
    salary: "$9,500/mo",
    appliedDate: "2026-03-08",
    priority: "HIGH",
    matchedScore: 92,
    notes: "Submitted tailored resume with quantified impact bullets. Mentioned open source interest."
  },
  {
    id: "app-2",
    company: "Snowflake",
    role: "Database Systems Intern",
    location: "San Mateo, CA",
    status: "APPLIED",
    salary: "$9,000/mo",
    appliedDate: "2026-03-05",
    priority: "HIGH",
    matchedScore: 86,
    notes: "Applied via university career portal with referral from alumnus."
  },
  {
    id: "app-3",
    company: "Datadog",
    role: "Software Engineer Intern - Distributed Systems",
    location: "New York, NY",
    status: "APPLIED",
    salary: "$8,800/mo",
    appliedDate: "2026-03-02",
    priority: "MEDIUM",
    matchedScore: 81,
    notes: "Highlighting Java threading and networking coursework."
  },
  {
    id: "app-4",
    company: "Swiggy",
    role: "Associate SDE",
    location: "Bengaluru, India",
    status: "APPLIED",
    salary: "₹16 LPA",
    appliedDate: "2026-02-28",
    priority: "MEDIUM",
    matchedScore: 78
  },
  {
    id: "app-5",
    company: "Linear",
    role: "Product Engineering Intern",
    location: "Remote",
    status: "APPLIED",
    salary: "$8,000/mo",
    appliedDate: "2026-02-25",
    priority: "HIGH",
    matchedScore: 80
  },
  {
    id: "app-6",
    company: "Vercel",
    role: "Solutions Engineering Intern",
    location: "Remote",
    status: "APPLIED",
    salary: "$7,500/mo",
    appliedDate: "2026-02-20",
    priority: "MEDIUM",
    matchedScore: 75
  },

  // ASSESSMENT (4)
  {
    id: "app-7",
    company: "Atlassian",
    role: "Graduate Software Engineer",
    location: "Bengaluru / Hybrid",
    status: "ASSESSMENT",
    salary: "₹22 LPA",
    appliedDate: "2026-02-15",
    deadlineDate: "2026-03-20",
    priority: "HIGH",
    matchedScore: 84,
    notes: "HackerRank OA link received. 3 coding questions (Graphs, DP, String parsing). Practice NeetCode 150."
  },
  {
    id: "app-8",
    company: "Uber",
    role: "Software Engineering Intern",
    location: "Hyderabad, India",
    status: "ASSESSMENT",
    salary: "₹1,20,000/mo",
    appliedDate: "2026-02-18",
    deadlineDate: "2026-03-18",
    priority: "HIGH",
    matchedScore: 88,
    notes: "Codesignal test pending. Score threshold required: 820+."
  },
  {
    id: "app-9",
    company: "Cisco",
    role: "Software Engineer Intern",
    location: "Bengaluru, India",
    status: "ASSESSMENT",
    salary: "₹80,000/mo",
    appliedDate: "2026-02-10",
    deadlineDate: "2026-03-22",
    priority: "MEDIUM",
    matchedScore: 82
  },
  {
    id: "app-10",
    company: "MongoDB",
    role: "Campus Intern - Core Engine",
    location: "Remote",
    status: "ASSESSMENT",
    salary: "$8,500/mo",
    appliedDate: "2026-02-12",
    deadlineDate: "2026-03-25",
    priority: "HIGH",
    matchedScore: 83
  },

  // INTERVIEW (4)
  {
    id: "app-11",
    company: "Amazon",
    role: "SDE Intern (Summer 2026)",
    location: "Seattle / Hybrid",
    status: "INTERVIEW",
    salary: "$8,500/mo",
    appliedDate: "2026-01-20",
    nextInterviewDate: "2026-03-17",
    priority: "HIGH",
    matchedScore: 90,
    notes: "Final round scheduled for tomorrow at 2:00 PM EST. 1 technical coding (Binary Trees/DFS) + 2 Amazon Leadership Principles (Customer Obsession, Ownership)."
  },
  {
    id: "app-12",
    company: "Razorpay",
    role: "Full Stack Developer Intern",
    location: "Bengaluru / Remote",
    status: "INTERVIEW",
    salary: "₹55,000/mo",
    appliedDate: "2026-02-01",
    nextInterviewDate: "2026-03-24",
    priority: "HIGH",
    matchedScore: 78,
    notes: "Passed screening. Technical interview scheduled with Engineering Manager."
  },
  {
    id: "app-13",
    company: "Bloomberg",
    role: "Software Engineer Intern",
    location: "New York, NY",
    status: "INTERVIEW",
    salary: "$9,200/mo",
    appliedDate: "2026-01-28",
    nextInterviewDate: "2026-03-28",
    priority: "HIGH",
    matchedScore: 87,
    notes: "Completed Round 1. Technical system discussion and algorithm deep-dive coming up."
  },
  {
    id: "app-14",
    company: "Postman",
    role: "API Platform Intern",
    location: "Bengaluru / Remote",
    status: "INTERVIEW",
    salary: "₹60,000/mo",
    appliedDate: "2026-02-05",
    nextInterviewDate: "2026-04-02",
    priority: "MEDIUM",
    matchedScore: 79
  },

  // OFFER (2)
  {
    id: "app-15",
    company: "Zomato",
    role: "Backend Engineer Intern",
    location: "Gurugram, India",
    status: "OFFER",
    salary: "₹75,000/mo",
    appliedDate: "2026-01-10",
    priority: "HIGH",
    matchedScore: 88,
    notes: "OFFER RECEIVED! Stipend ₹75k/month with PPO consideration. Decision deadline: April 10, 2026."
  },
  {
    id: "app-16",
    company: "Cloudflare",
    role: "Edge Infrastructure Intern",
    location: "Austin, TX / Remote",
    status: "OFFER",
    salary: "$8,000/mo",
    appliedDate: "2026-01-05",
    priority: "HIGH",
    matchedScore: 85,
    notes: "OFFER RECEIVED! Distributed systems team. Amazing mentor match."
  },

  // REJECTED (2)
  {
    id: "app-17",
    company: "Google",
    role: "STEP Intern",
    location: "Sunnyvale, CA",
    status: "REJECTED",
    appliedDate: "2025-12-15",
    priority: "HIGH",
    matchedScore: 89,
    notes: "Did well on Round 1, rejected in team matching phase due to head count limits."
  },
  {
    id: "app-18",
    company: "Meta",
    role: "Software Engineering Intern",
    location: "Menlo Park, CA",
    status: "REJECTED",
    appliedDate: "2025-12-20",
    priority: "HIGH",
    matchedScore: 84,
    notes: "Automated rejection on resume screening before OA."
  }
];

export const DEMO_PROJECTS: ProjectRecommendation[] = [
  {
    id: "proj-1",
    title: "AI Job Recommendation Engine",
    role: "Software Engineer",
    difficulty: "Intermediate",
    summary: "A production-grade microservice that ingests job descriptions, vectorizes candidate resumes, and computes real-time cosine similarity matches with Spring Boot & PostgreSQL.",
    whyRecommended: "This project directly tackles 3 critical gaps in your target role: Spring Boot REST APIs, PostgreSQL vector queries, and asynchronous background worker processing.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Docker", "pgvector"],
    estimatedHours: 40,
    roadmapPhases: [
      {
        phase: "1. Setup",
        title: "Project Scaffolding & Dependencies",
        description: "Initialize Spring Boot 3 with Maven/Gradle, configure Spring Data JPA, Spring Web, and Lombok.",
        codeSnippet: `// pom.xml sample dependency snippet
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>`,
        estimatedHours: 4,
        completed: true
      },
      {
        phase: "2. Database",
        title: "Relational Schema & Indexing",
        description: "Design relational tables for Candidates, Skills, and JobPostings. Configure Flyway migration scripts.",
        codeSnippet: `CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  required_skills TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_jobs_skills ON jobs USING GIN(required_skills);`,
        estimatedHours: 6,
        completed: true
      },
      {
        phase: "3. Backend API",
        title: "RESTful Endpoints & Controller Layer",
        description: "Expose clean REST endpoints (/api/v1/jobs, /api/v1/matches) with DTO validation and GlobalExceptionHandler.",
        codeSnippet: `@RestController
@RequestMapping("/api/v1/jobs")
public class JobController {
  @PostMapping("/match")
  public ResponseEntity<MatchResultDto> matchProfile(@Valid @RequestBody ProfileDto profile) {
    return ResponseEntity.ok(matchingService.calculateMatch(profile));
  }
}`,
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
        phase: "5. Frontend",
        title: "Interactive Candidate Discovery UI",
        description: "Build a responsive React/Next.js interface displaying real-time match breakdown dials and skill tags.",
        estimatedHours: 8,
        completed: false
      },
      {
        phase: "6. Testing",
        title: "JUnit 5 & Mockito Test Suite",
        description: "Achieve 85%+ test coverage across service layers, controller tests with MockMvc, and testcontainers integration.",
        estimatedHours: 4,
        completed: false
      },
      {
        phase: "7. Deployment",
        title: "Containerize with Docker & GitHub Actions",
        description: "Write multi-stage Dockerfile, compose file for Postgres + App, and automate CI testing on push.",
        codeSnippet: `FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
        estimatedHours: 4,
        completed: false
      }
    ]
  },
  {
    id: "proj-2",
    title: "High-Throughput Distributed Rate Limiter",
    role: "Backend Engineer",
    difficulty: "Advanced",
    summary: "An ultra-low latency API Gateway rate limiter implementing Sliding Window and Token Bucket algorithms with Redis.",
    whyRecommended: "Demonstrates advanced distributed systems, concurrency control, Redis atomicity (Lua scripts), and system design mastery.",
    techStack: ["Java", "Redis", "Docker", "REST APIs", "System Design"],
    estimatedHours: 35,
    roadmapPhases: [
      {
        phase: "1. Setup",
        title: "Architecture Design & Benchmark Harness",
        description: "Define SLA targets (<2ms latency overhead) and configure load testing with k6.",
        estimatedHours: 4,
        completed: false
      },
      {
        phase: "2. Algorithm Implementation",
        title: "Sliding Window Log & Token Bucket in Lua",
        description: "Write atomic Redis Lua scripts to prevent race conditions during distributed quota checks.",
        estimatedHours: 8,
        completed: false
      },
      {
        phase: "3. Gateway Filter",
        title: "Spring Cloud Gateway Filter Integration",
        description: "Inject rate limiter as pre-routing filter inspecting API keys and client IP addresses.",
        estimatedHours: 7,
        completed: false
      },
      {
        phase: "4. Stress Testing",
        title: "10,000 RPS Concurrency Benchmark",
        description: "Simulate DDoS bursts and verify zero false-positives under high concurrency.",
        estimatedHours: 6,
        completed: false
      }
    ]
  },
  {
    id: "proj-3",
    title: "Realtime Collaborative Workspace Canvas",
    role: "Full Stack Developer",
    difficulty: "Intermediate",
    summary: "A collaborative whiteboard canvas featuring conflict-free replicated data types (CRDTs), WebSockets, and presence avatars.",
    whyRecommended: "Bridges frontend interactivity with complex backend realtime synchronization and WebSocket state management.",
    techStack: ["React", "TypeScript", "Next.js", "WebSockets", "Node.js", "Tailwind CSS"],
    estimatedHours: 32,
    roadmapPhases: [
      {
        phase: "1. Setup",
        title: "Next.js & HTML5 Canvas Foundation",
        description: "Set up infinite pan/zoom canvas coordinate system with mouse pointer tracking.",
        estimatedHours: 5,
        completed: false
      },
      {
        phase: "2. WebSockets",
        title: "Bi-directional Realtime Sync",
        description: "Broadcast cursor coordinates and canvas object mutations to all connected room peers.",
        estimatedHours: 9,
        completed: false
      }
    ]
  }
];

export const DEMO_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "q-1",
    category: "Technical",
    difficulty: "Medium",
    role: "Software Engineer",
    question: "Explain how HashMap works internally in Java. What happens when a hash collision occurs, and how did Java 8 improve collision handling?",
    context: "Fundamental core Java and data structures question asked in nearly 90% of backend engineering interviews.",
    sampleAnswer: "Java's HashMap is backed by an array of Node buckets. When `put(key, value)` is invoked, it calculates `hash = key.hashCode() ^ (hash >>> 16)` to spread bits, then maps to an index via `index = (n - 1) & hash`. When a collision occurs, entries are stored as a linked list in that bucket. In Java 8, once a bucket exceeds `TREEIFY_THRESHOLD` (8 items) and the table capacity is at least 64, the linked list transforms into a Red-Black balanced tree (TreeNode), improving worst-case lookup from O(n) to O(log n)."
  },
  {
    id: "q-2",
    category: "System Design",
    difficulty: "Medium",
    role: "Software Engineer",
    question: "How would you design a URL shortening service like Bitly? Walk through API design, hashing approach, and database schema.",
    context: "Classic architectural interview evaluating capacity estimation, primary keys, base62 encoding, and cache layers.",
    sampleAnswer: "I would structure the service with 2 primary endpoints: `POST /api/v1/urls` and `GET /{shortCode}`. For short code generation, I'd use Base62 encoding (a-z, A-Z, 0-9) on an auto-incrementing 64-bit distributed ID generator (like Snowflake) to generate 7-character URLs, supporting 62^7 (~3.5 trillion) combinations. Database schema stores `(id, short_code, original_url, user_id, created_at, expire_at)`. For high read-to-write ratio (100:1), I'd place a Redis LRU cache cluster in front of PostgreSQL to serve 80% of redirects directly with sub-5ms latency."
  },
  {
    id: "q-3",
    category: "Behavioral",
    difficulty: "Easy",
    role: "Software Engineer",
    question: "Tell me about a time you faced a difficult technical bug or roadblock in a project. How did you diagnose it and what was the outcome?",
    context: "Evaluates problem-solving methodology, perseverance, and structured STAR framework communication.",
    sampleAnswer: "During my database optimization project, our team experienced sudden connection pool exhaustion during mock stress testing. Rather than guessing, I isolated the issue by turning on PostgreSQL query logging and thread dump analysis. I discovered an unclosed transaction inside a nested helper method causing connection starvation. I refactored the method to use `try-with-resources` and added automated connection leak detection with HikariCP. Query latency dropped 60% and connection pool utilization stabilized at 15%."
  },
  {
    id: "q-4",
    category: "HR",
    difficulty: "Easy",
    role: "Software Engineer",
    question: "Why do you want to join our company as an intern, and what do you hope to accomplish during your tenure?",
    context: "Assesses company research, personal ambition, cultural alignment, and intrinsic motivation."
  }
];

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Interview Tomorrow",
    message: "Amazon SDE Intern final round is scheduled for tomorrow at 2:00 PM EST. Review trees & STAR stories!",
    type: "INTERVIEW",
    read: false,
    timestamp: "10 mins ago",
    actionUrl: "/interview"
  },
  {
    id: "notif-2",
    title: "Resume Optimization Available",
    message: "AI found 3 high-impact bullet rewrite opportunities for your e-commerce project.",
    type: "RESUME",
    read: false,
    timestamp: "2 hours ago",
    actionUrl: "/resume"
  },
  {
    id: "notif-3",
    title: "New Job Match (92%)",
    message: "Stripe just posted 'Software Engineer Intern - Core Infra' matching 5 of your top skills.",
    type: "JOB",
    read: false,
    timestamp: "5 hours ago",
    actionUrl: "/jobs"
  },
  {
    id: "notif-4",
    title: "Skill Milestone Progress",
    message: "You are 50% closer to bridging your Spring Boot gap! Check out your recommended project roadmap.",
    type: "SKILL",
    read: true,
    timestamp: "1 day ago",
    actionUrl: "/projects"
  }
];
