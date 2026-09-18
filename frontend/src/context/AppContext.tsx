"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  UserProfile, 
  JobApplication, 
  NotificationItem, 
  JobListing,
  RoadmapPhaseData,
  ProjectRecommendation,
  TargetRole
} from "@/lib/types";
import { 
  DEMO_USER, 
  DEMO_APPLICATIONS, 
  DEMO_NOTIFICATIONS, 
  DEMO_JOBS, 
  DEMO_ROADMAP, 
  DEMO_PROJECTS 
} from "@/lib/demo-data";

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginDemoUser: () => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, "id" | "appliedDate">) => void;
  updateApplicationStatus: (id: string, status: JobApplication["status"]) => void;
  deleteApplication: (id: string) => void;
  updateApplicationNotes: (id: string, notes: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  jobs: JobListing[];
  roadmap: RoadmapPhaseData[];
  updateSkillStatus: (skillId: string, status: "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED", level?: number) => void;
  projects: ProjectRecommendation[];
  toggleProjectTask: (projectId: string, phaseIndex: number) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [applications, setApplications] = useState<JobApplication[]>(DEMO_APPLICATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);
  const [jobs, setJobs] = useState<JobListing[]>(DEMO_JOBS);
  const [roadmap, setRoadmap] = useState<RoadmapPhaseData[]>(DEMO_ROADMAP);
  const [projects, setProjects] = useState<ProjectRecommendation[]>(DEMO_PROJECTS);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [apiKey, setApiKey] = useState<string>("");
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);

  // Initialize from localStorage if available
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("cp_auth");
      if (savedAuth === "false") {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
        setUser(DEMO_USER);
      }

      const savedTheme = localStorage.getItem("cp_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }

      const savedKey = localStorage.getItem("cp_api_key");
      if (savedKey) setApiKey(savedKey);
    } catch {
      // safe fallback
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("cp_theme", next);
      if (next === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } catch {}
  };

  const loginDemoUser = () => {
    setUser(DEMO_USER);
    setIsAuthenticated(true);
    try {
      localStorage.setItem("cp_auth", "true");
    } catch {}
  };

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      ...DEMO_USER,
      email,
      name: name || email.split("@")[0] || "Student",
    };
    setUser(newUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem("cp_auth", "true");
    } catch {}
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.setItem("cp_auth", "false");
    } catch {}
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  const addApplication = (app: Omit<JobApplication, "id" | "appliedDate">) => {
    const newApp: JobApplication = {
      ...app,
      id: "app-" + Date.now(),
      appliedDate: new Date().toISOString().split("T")[0],
    };
    setApplications((prev) => [newApp, ...prev]);
    // update user total applications counter
    if (user) {
      setUser({ ...user, totalApplications: user.totalApplications + 1 });
    }
    // Add notification
    const notif: NotificationItem = {
      id: "notif-" + Date.now(),
      title: "Application Tracked",
      message: `Added ${app.role} at ${app.company} to your ${app.status} stage.`,
      type: "JOB",
      read: false,
      timestamp: "Just now",
      actionUrl: "/applications"
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: JobApplication["status"]) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const updateApplicationNotes = (id: string, notes: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, notes } : a))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const updateSkillStatus = (
    skillId: string, 
    status: "COMPLETED" | "IN_PROGRESS" | "NOT_STARTED", 
    level?: number
  ) => {
    setRoadmap((prev) =>
      prev.map((phase) => ({
        ...phase,
        skills: phase.skills.map((skill) =>
          skill.id === skillId
            ? {
                ...skill,
                status,
                currentLevel: level !== undefined ? level : (status === "COMPLETED" ? 100 : skill.currentLevel)
              }
            : skill
        )
      }))
    );
  };

  const toggleProjectTask = (projectId: string, phaseIndex: number) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const newPhases = [...proj.roadmapPhases];
        if (newPhases[phaseIndex]) {
          newPhases[phaseIndex] = {
            ...newPhases[phaseIndex],
            completed: !newPhases[phaseIndex].completed
          };
        }
        return { ...proj, roadmapPhases: newPhases };
      })
    );
  };

  const handleSetApiKey = (key: string) => {
    setApiKey(key);
    try {
      localStorage.setItem("cp_api_key", key);
    } catch {}
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        loginDemoUser,
        login,
        logout,
        updateProfile,
        applications,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        updateApplicationNotes,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        jobs,
        roadmap,
        updateSkillStatus,
        projects,
        toggleProjectTask,
        theme,
        toggleTheme,
        apiKey,
        setApiKey: handleSetApiKey,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
