import React, { useState } from 'react';
import { PortalProvider, usePortal } from './context/PortalContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { StudentDashboard } from './components/StudentDashboard';
import { TopicPreparation } from './components/TopicPreparation';
import { CompanyPreparation } from './components/CompanyPreparation';
import { InterviewPreparation } from './components/InterviewPreparation';
import { ResumeBuilder } from './components/ResumeBuilder';
import { AdminDashboard } from './components/AdminDashboard';
import { N8nChatbot } from './components/N8nChatbot';
import { GraduationCap, Sparkles, ShieldCheck, Heart } from 'lucide-react';

const MainPortalContent: React.FC = () => {
  const { currentUser } = usePortal();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    role: 'student' | 'admin';
    mode: 'login' | 'register';
  }>({
    isOpen: false,
    role: 'student',
    mode: 'login'
  });

  const handleOpenAuth = (role: 'student' | 'admin' = 'student', mode: 'login' | 'register' = 'login') => {
    setAuthModalState({
      isOpen: true,
      role,
      mode
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={handleOpenAuth}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <StudentDashboard
            setActiveTab={setActiveTab}
            openAuthModal={() => handleOpenAuth('student', 'login')}
          />
        )}

        {activeTab === 'topics' && (
          <TopicPreparation />
        )}

        {activeTab === 'companies' && (
          <CompanyPreparation />
        )}

        {activeTab === 'interviews' && (
          <InterviewPreparation />
        )}

        {activeTab === 'resume' && (
          <ResumeBuilder />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            openAuthModal={handleOpenAuth}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-black text-white text-sm">NexPlace</span>
            <span>— Campus to Career Tech Placement Portal</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <button onClick={() => setActiveTab('topics')} className="hover:text-white transition-colors">
              B.Tech Subjects
            </button>
            <button onClick={() => setActiveTab('companies')} className="hover:text-white transition-colors">
              Company PYQs
            </button>
            <button onClick={() => setActiveTab('interviews')} className="hover:text-white transition-colors">
              STAR Interviews
            </button>
            <button onClick={() => setActiveTab('resume')} className="hover:text-white transition-colors">
              ATS Resume
            </button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-white transition-colors flex items-center space-x-1 text-indigo-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Logins</span>
            </button>
          </div>

          <div className="text-slate-500">
            Engineered for Higher Education & Tech Recruitment
          </div>
        </div>
      </footer>

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        onClose={() => setAuthModalState({ ...authModalState, isOpen: false })}
        defaultRole={authModalState.role}
        defaultMode={authModalState.mode}
      />

      {/* Floating n8n AI Chatbot */}
      <N8nChatbot />
    </div>
  );
};

export default function App() {
  return (
    <PortalProvider>
      <MainPortalContent />
    </PortalProvider>
  );
}
