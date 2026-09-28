import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  QuizAttempt, 
  ActivityLog, 
  Announcement, 
  ResumeData, 
  CompanyProfile,
  BTechSubject,
  QuizCategory
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_QUIZ_ATTEMPTS, 
  INITIAL_ACTIVITY_LOGS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_RESUME_DATA,
  COMPANY_PROFILES,
  BTECH_SUBJECTS
} from '../data/mockData';

interface PortalContextType {
  currentUser: User | null;
  allUsers: User[];
  quizAttempts: QuizAttempt[];
  activityLogs: ActivityLog[];
  announcements: Announcement[];
  resumeData: ResumeData;
  completedTopics: string[]; // topicId list
  preparedCompanies: string[]; // companyId list
  login: (email: string, role?: 'student' | 'admin') => { success: boolean; message: string };
  register: (userData: Partial<User> & { password?: string }) => { success: boolean; message: string };
  logout: () => void;
  switchUser: (userId: string) => void;
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'attemptedAt' | 'userName' | 'userEmail'>) => QuizAttempt;
  markTopicCompleted: (topicId: string, topicTitle: string) => void;
  markCompanyExplored: (companyName: string, roleName: string) => void;
  updateResumeData: (data: ResumeData) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  logAction: (actionType: ActivityLog['actionType'], details: string, metadata?: Record<string, any>) => void;
  getCompanyByNameOrId: (query: string) => CompanyProfile | null;
  allCompanies: CompanyProfile[];
  allSubjects: BTechSubject[];
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'nexplace_current_user',
  USERS: 'nexplace_all_users',
  ATTEMPTS: 'nexplace_quiz_attempts',
  LOGS: 'nexplace_activity_logs',
  ANNOUNCEMENTS: 'nexplace_announcements',
  RESUME: 'nexplace_resume_data',
  COMPLETED_TOPICS: 'nexplace_completed_topics',
  PREPARED_COMPANIES: 'nexplace_prepared_companies'
};

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from LocalStorage or seed data
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      return stored ? JSON.parse(stored) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) return JSON.parse(stored);
      // Default to first student so user can immediately view portal
      return INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return stored ? JSON.parse(stored) : INITIAL_QUIZ_ATTEMPTS;
    } catch {
      return INITIAL_QUIZ_ATTEMPTS;
    }
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
      return stored ? JSON.parse(stored) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return stored ? JSON.parse(stored) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESUME);
      return stored ? JSON.parse(stored) : INITIAL_RESUME_DATA;
    } catch {
      return INITIAL_RESUME_DATA;
    }
  });

  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS);
      return stored ? JSON.parse(stored) : ['dsa-trees-bst', 'os-deadlocks-sync'];
    } catch {
      return ['dsa-trees-bst', 'os-deadlocks-sync'];
    }
  });

  const [preparedCompanies, setPreparedCompanies] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREPARED_COMPANIES);
      return stored ? JSON.parse(stored) : ['amazon', 'google'];
    } catch {
      return ['amazon', 'google'];
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PREPARED_COMPANIES, JSON.stringify(preparedCompanies));
  }, [preparedCompanies]);

  const logAction = (actionType: ActivityLog['actionType'], details: string, metadata?: Record<string, any>) => {
    const newLog: ActivityLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Guest User',
      userRole: currentUser?.role || 'student',
      actionType,
      details,
      metadata,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const login = (email: string, targetRole?: 'student' | 'admin'): { success: boolean; message: string } => {
    const trimmed = email.trim().toLowerCase();
    const user = allUsers.find(u => u.email.toLowerCase() === trimmed);

    if (!user) {
      return { success: false, message: 'Account not found. Please register to create an account.' };
    }

    if (targetRole && user.role !== targetRole) {
      return { 
        success: false, 
        message: `This account is registered as a ${user.role}. Please log in via the ${user.role} portal tab.` 
      };
    }

    const updatedUser = {
      ...user,
      lastLoginAt: new Date().toISOString()
    };

    setCurrentUser(updatedUser);
    setAllUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));

    // Log the action
    const newLog: ActivityLog = {
      id: 'log-' + Date.now(),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      actionType: 'LOGIN',
      details: `${user.name} (${user.role === 'admin' ? 'Placement Admin' : user.branch || 'Student'}) logged in successfully.`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);

    return { success: true, message: `Welcome back, ${user.name}!` };
  };

  const register = (userData: Partial<User> & { password?: string }): { success: boolean; message: string } => {
    const trimmedEmail = (userData.email || '').trim().toLowerCase();
    
    if (!trimmedEmail || !userData.name) {
      return { success: false, message: 'Name and email are required.' };
    }

    const existing = allUsers.find(u => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please login.' };
    }

    const newUser: User = {
      id: `${userData.role || 'student'}-${Date.now()}`,
      name: userData.name,
      email: trimmedEmail,
      role: userData.role || 'student',
      college: userData.college || 'Engineering College',
      branch: userData.branch || 'Computer Science & Engineering',
      graduationYear: userData.graduationYear || 2025,
      rollNumber: userData.rollNumber || 'REG-' + Math.floor(1000 + Math.random() * 9000),
      phone: userData.phone || '',
      department: userData.role === 'admin' ? (userData.department || 'Training & Placement Office') : undefined,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}`
    };

    setAllUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);

    // If new student, also prefill their resume fullName and email
    if (newUser.role === 'student') {
      setResumeData(prev => ({
        ...prev,
        fullName: newUser.name,
        email: newUser.email
      }));
    }

    // Log register
    const newLog: ActivityLog = {
      id: 'log-' + Date.now(),
      userId: newUser.id,
      userName: newUser.name,
      userRole: newUser.role,
      actionType: 'REGISTER',
      details: `New ${newUser.role} account created for ${newUser.name} (${newUser.email}).`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);

    return { success: true, message: `Account created successfully! Welcome to NexPlace, ${newUser.name}.` };
  };

  const logout = () => {
    if (currentUser) {
      logAction('LOGIN', `${currentUser.name} signed out.`);
    }
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    const target = allUsers.find(u => u.id === userId);
    if (target) {
      const updated = { ...target, lastLoginAt: new Date().toISOString() };
      setCurrentUser(updated);
      setAllUsers(prev => prev.map(u => u.id === userId ? updated : u));
      logAction('LOGIN', `Switched active session to ${target.name} (${target.role}).`);
    }
  };

  const recordQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'attemptedAt' | 'userName' | 'userEmail'>): QuizAttempt => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: 'attempt-' + Date.now(),
      userName: currentUser?.name || 'Student',
      userEmail: currentUser?.email || 'student@example.com',
      attemptedAt: new Date().toISOString()
    };

    setQuizAttempts(prev => [newAttempt, ...prev]);

    // Log quiz submission
    logAction(
      'QUIZ_ATTEMPT',
      `Completed quiz "${newAttempt.quizTitle}" (${newAttempt.relatedSubjectOrCompany}) with score ${newAttempt.percentage}% (${newAttempt.score}/${newAttempt.totalQuestions}).`,
      { quizId: newAttempt.quizId, score: newAttempt.score, percentage: newAttempt.percentage }
    );

    return newAttempt;
  };

  const markTopicCompleted = (topicId: string, topicTitle: string) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics(prev => [...prev, topicId]);
      logAction('TOPIC_STUDIED', `Mastered B.Tech topic: "${topicTitle}".`);
    }
  };

  const markCompanyExplored = (companyName: string, roleName: string) => {
    const normalizedKey = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!preparedCompanies.includes(normalizedKey)) {
      setPreparedCompanies(prev => [...prev, normalizedKey]);
    }
    logAction('COMPANY_EXPLORED', `Prepared company recruitment modules for ${companyName} (${roleName}).`);
  };

  const updateResumeData = (newData: ResumeData) => {
    setResumeData(newData);
    logAction('RESUME_UPDATED', `Updated placement ATS resume data with current projects and skills.`);
  };

  const addAnnouncement = (item: Omit<Announcement, 'id' | 'date'>) => {
    const newAnn: Announcement = {
      ...item,
      id: 'ann-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    logAction('ANNOUNCEMENT_POSTED', `Admin published new announcement: "${newAnn.title}".`);
  };

  // Dynamically resolve or generate profile for ANY company queried
  const getCompanyByNameOrId = (query: string): CompanyProfile | null => {
    if (!query) return COMPANY_PROFILES[0];
    const q = query.trim().toLowerCase();
    
    // Check known profiles first
    const found = COMPANY_PROFILES.find(c => 
      c.id.toLowerCase() === q || 
      c.name.toLowerCase() === q ||
      c.name.toLowerCase().includes(q)
    );
    if (found) return found;

    // Otherwise, generate a comprehensive tailored profile for ANY user-typed company!
    const formattedName = query.charAt(0).toUpperCase() + query.slice(1);
    const dynamicProfile: CompanyProfile = {
      id: q.replace(/\s+/g, '-'),
      name: formattedName,
      tier: 'Product / Tier-1',
      logoText: formattedName.substring(0, 3).toUpperCase(),
      badgeColor: 'bg-emerald-600 text-white',
      avgPackage: '₹14 - ₹32 LPA',
      highestPackage: '₹40 LPA',
      description: `${formattedName} recruiting pipeline for B.Tech engineers. Focuses on data structures, algorithmic problem solving, domain proficiency, and system reliability.`,
      eligibility: {
        minCGPA: 7.0,
        allowedBranches: ['CSE', 'IT', 'ECE', 'All eligible engineering branches'],
        backlogsAllowed: 0
      },
      roles: [
        'Software Development Engineer (SDE)',
        'Full Stack Developer',
        'Data Analyst / Business Intelligence',
        'Cloud & DevOps Engineer',
        'Quality Assurance & Automation Engineer'
      ],
      hiringProcess: [
        {
          roundNumber: 1,
          title: 'Online Aptitude & Coding Assessment (OA)',
          duration: '90 Minutes',
          description: 'Aptitude, quantitative problem solving, CS fundamentals MCQs, and 2 algorithmic coding problems.',
          focusAreas: ['Arrays & HashMaps', 'Aptitude', 'Core CS Fundamentals']
        },
        {
          roundNumber: 2,
          title: 'Technical Interview Round 1 (Problem Solving)',
          duration: '60 Minutes',
          description: 'Live coding on Data Structures & Algorithms, time and space complexity optimizations.',
          focusAreas: ['Linked Lists', 'Trees', 'Recursion & Edge Cases']
        },
        {
          roundNumber: 3,
          title: 'Technical Round 2 (Projects & System Fundamentals)',
          duration: '45 - 60 Minutes',
          description: 'Detailed walkthrough of resume projects, database schemas, API architecture, and OS/Networks concepts.',
          focusAreas: ['Project Architecture', 'SQL Queries', 'OOPs Design']
        },
        {
          roundNumber: 4,
          title: 'HR & Cultural Alignment',
          duration: '30 Minutes',
          description: 'Behavioral assessment, teamwork, conflict management, and motivation to join.',
          focusAreas: ['STAR Method', 'Career Goals', 'Company Values']
        }
      ],
      pyqs: [
        {
          id: `pyq-${q}-1`,
          role: 'Software Development Engineer (SDE)',
          year: '2024 - 2025',
          round: 'Technical Round 1',
          title: `Two Sum & Subarray Sum Equals K (Frequently Asked at ${formattedName})`,
          difficulty: 'Medium',
          frequency: 'Asked frequently in technical screens',
          question: `Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.`,
          sampleInputOutput: 'Input: nums = [1,1,1], k = 2 -> Output: 2',
          approach: 'Use a Hash Map to store cumulative prefix sum frequencies. For every index, check if (currentSum - k) exists in the map.',
          codeSolution: `int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> prefixCounts;
    prefixCounts[0] = 1;
    int currSum = 0, total = 0;
    for (int num : nums) {
        currSum += num;
        if (prefixCounts.find(currSum - k) != prefixCounts.end()) {
            total += prefixCounts[currSum - k];
        }
        prefixCounts[currSum]++;
    }
    return total;
}`,
          language: 'C++',
          tags: ['HashMap', 'Prefix Sum', 'Array']
        },
        {
          id: `pyq-${q}-2`,
          role: 'Full Stack Developer',
          year: '2024',
          round: 'Technical Round 2',
          title: `Design RESTful API with Authentication & Rate Limiting`,
          difficulty: 'Medium',
          frequency: 'High frequency in system rounds',
          question: `Design an authenticated endpoint that enforces a rate limit of 60 requests per minute per IP address.`,
          approach: 'Use Redis Token Bucket or Sliding Window log algorithm to track timestamp counts per client IP identifier.',
          tags: ['System Design', 'Redis', 'Rate Limiting']
        }
      ],
      mockQuiz: {
        id: `quiz-${q}-assessment`,
        title: `${formattedName} Technical & Aptitude Mock Assessment`,
        category: 'company',
        relatedSubjectOrCompany: formattedName,
        durationMinutes: 15,
        difficulty: 'Intermediate',
        questions: [
          {
            id: 1,
            question: `Which data structure provides O(1) average lookup and insertion time for fast key-value lookups in ${formattedName}'s backend services?`,
            options: ['Array', 'Hash Table / Hash Map', 'Binary Search Tree', 'Linked List'],
            correctAnswer: 1,
            explanation: 'Hash Tables provide O(1) average time complexity for insertion and retrieval by computing hash indexes.'
          },
          {
            id: 2,
            question: 'What is the primary benefit of index creation on database columns in high-traffic applications?',
            options: ['Reduces disk space', 'Accelerates SELECT query lookups from O(N) to O(log N) using B+ Trees', 'Guarantees 100% security', 'Deletes duplicate rows automatically'],
            correctAnswer: 1,
            explanation: 'B+ Tree indexes enable logarithmic search times instead of full table scans.'
          }
        ]
      },
      tipsFromSeniors: [
        `Review previous projects listed on your resume thoroughly before your interview with ${formattedName}.`,
        'Focus on writing bug-free code with proper naming conventions and modular functions.',
        'Clarify assumptions and ask thoughtful questions about the problem before coding.'
      ]
    };

    return dynamicProfile;
  };

  return (
    <PortalContext.Provider value={{
      currentUser,
      allUsers,
      quizAttempts,
      activityLogs,
      announcements,
      resumeData,
      completedTopics,
      preparedCompanies,
      login,
      register,
      logout,
      switchUser,
      recordQuizAttempt,
      markTopicCompleted,
      markCompanyExplored,
      updateResumeData,
      addAnnouncement,
      logAction,
      getCompanyByNameOrId,
      allCompanies: COMPANY_PROFILES,
      allSubjects: BTECH_SUBJECTS
    }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
