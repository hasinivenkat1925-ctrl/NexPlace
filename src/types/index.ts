export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  college?: string;
  branch?: string;
  graduationYear?: number;
  rollNumber?: string;
  phone?: string;
  createdAt: string;
  lastLoginAt: string;
  avatar?: string;
  department?: string; // For Admin e.g. "Head of T&P Cell"
}

export type QuizCategory = 'topic' | 'company' | 'interview';

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  topicTag?: string;
}

export interface QuizDefinition {
  id: string;
  title: string;
  category: QuizCategory;
  relatedSubjectOrCompany: string;
  targetRole?: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  quizId: string;
  quizTitle: string;
  category: QuizCategory;
  relatedSubjectOrCompany: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  attemptedAt: string;
  timeSpentSeconds: number;
  userAnswers: Record<number, number>; // questionId -> optionIndex
}

export type ActionType = 
  | 'LOGIN'
  | 'REGISTER'
  | 'QUIZ_ATTEMPT'
  | 'TOPIC_STUDIED'
  | 'COMPANY_EXPLORED'
  | 'RESUME_UPDATED'
  | 'INTERVIEW_PRACTICE'
  | 'ANNOUNCEMENT_POSTED';

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  actionType: ActionType;
  details: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface YouTubeVideo {
  title: string;
  channel: string;
  views: string;
  duration: string;
  youtubeId: string;
  url: string;
  topicHighlight: string;
}

export interface SubjectTopic {
  id: string;
  subjectId: string;
  title: string;
  summary: string;
  importance: 'Very High' | 'High' | 'Medium';
  frequencyInInterviews: string;
  readTimeMinutes: number;
  keyConcepts: string[];
  notesMarkdown: string;
  cheatSheetPoints: string[];
  youtubeVideos: YouTubeVideo[];
  quiz: QuizDefinition;
}

export interface BTechSubject {
  id: string;
  name: string;
  code: string;
  icon: string;
  description: string;
  semesterHint: string;
  recommendedDuration: string;
  topics: SubjectTopic[];
}

export interface CompanyPYQ {
  id: string;
  role: string;
  year: string;
  round: 'Online Assessment (OA)' | 'Technical Round 1' | 'Technical Round 2' | 'System Design' | 'HR / Managerial';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  frequency: string; // e.g. "Asked 12+ times (2024-2025)"
  question: string;
  sampleInputOutput?: string;
  approach: string;
  codeSolution?: string;
  language?: string;
  tags: string[];
}

export interface HiringRound {
  roundNumber: number;
  title: string;
  duration: string;
  description: string;
  focusAreas: string[];
}

export interface CompanyProfile {
  id: string;
  name: string;
  tier: 'Product / Tier-1' | 'Mass / IT Services' | 'FinTech / Investment' | 'Core Engineering' | 'High-Growth Tech';
  logoText: string;
  badgeColor: string;
  avgPackage: string; // e.g. "₹18 - ₹45 LPA"
  highestPackage?: string;
  description: string;
  eligibility: {
    minCGPA: number;
    allowedBranches: string[];
    backlogsAllowed: number;
  };
  hiringProcess: HiringRound[];
  roles: string[];
  pyqs: CompanyPYQ[];
  mockQuiz: QuizDefinition;
  tipsFromSeniors: string[];
}

export interface InterviewRoleGuidance {
  role: string;
  icon: string;
  description: string;
  coreSkills: string[];
  typicalRounds: string[];
  frequentQuestions: {
    question: string;
    expectedDepth: string;
    modelAnswerKeypoints: string[];
  }[];
}

export interface HRQuestionGuide {
  id: string;
  question: string;
  category: 'Behavioral' | 'Icebreaker' | 'Situational' | 'Culture Fit';
  interviewerIntent: string;
  starMethodApproach: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  sampleAnswer: string;
  redFlagsToAvoid: string[];
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary: string;
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    cgpa: string;
  }[];
  experience: {
    id: string;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
  }[];
  projects: {
    id: string;
    title: string;
    technologies: string;
    githubUrl?: string;
    liveUrl?: string;
    bullets: string[];
  }[];
  skills: {
    category: string;
    items: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    year: string;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  author: string;
  date: string;
  category: 'Placement Drive' | 'Assessment Alert' | 'Interview Schedule' | 'Preparation Tip';
  content: string;
  actionLink?: string;
}
