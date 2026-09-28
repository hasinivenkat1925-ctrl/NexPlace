import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Trophy, 
  BookOpen, 
  Building2, 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  AlertCircle, 
  TrendingUp, 
  Calendar, 
  GraduationCap,
  Award,
  ChevronRight,
  ExternalLink,
  Target
} from 'lucide-react';
import { QuizAttempt } from '../types';

interface StudentDashboardProps {
  setActiveTab: (tab: string) => void;
  openAuthModal: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ setActiveTab, openAuthModal }) => {
  const { 
    currentUser, 
    quizAttempts, 
    completedTopics, 
    preparedCompanies, 
    announcements, 
    resumeData,
    allSubjects,
    allCompanies
  } = usePortal();

  const [selectedAttemptForModal, setSelectedAttemptForModal] = useState<QuizAttempt | null>(null);

  // Filter attempts for this student
  const studentAttempts = currentUser 
    ? quizAttempts.filter(a => a.userId === currentUser.id)
    : [];

  const totalQuizzesAttempted = studentAttempts.length;
  const passedQuizzes = studentAttempts.filter(a => a.passed).length;
  const averageScore = totalQuizzesAttempted > 0
    ? Math.round(studentAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalQuizzesAttempted)
    : 0;

  // Total topics across all subjects
  const totalBTechTopics = allSubjects.reduce((acc, sub) => acc + sub.topics.length, 0);
  const completedTopicsCount = completedTopics.length;
  const topicProgressPercent = Math.min(100, Math.round((completedTopicsCount / Math.max(1, totalBTechTopics)) * 100));

  // Resume ATS completeness estimate
  const hasExp = resumeData.experience.length > 0;
  const hasProjects = resumeData.projects.length >= 2;
  const hasSkills = resumeData.skills.length >= 3;
  const hasSummary = resumeData.summary.length > 50;
  const resumeScore = 40 + (hasExp ? 20 : 0) + (hasProjects ? 20 : 0) + (hasSkills ? 10 : 0) + (hasSummary ? 10 : 0);

  // Overall Placement Readiness Score (0 - 100)
  const readinessScore = Math.round(
    (averageScore * 0.35) + 
    (topicProgressPercent * 0.30) + 
    (Math.min(100, preparedCompanies.length * 25) * 0.20) + 
    (resumeScore * 0.15)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-blue-950 to-indigo-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/20 to-transparent pointer-events-none hidden md:block" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Placement Preparation Dashboard</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Welcome back, {currentUser?.name || 'Aspirant'}! 🚀
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Track your campus recruitment progress across B.Tech engineering subjects, company-specific previous year questions, mock interview assessments, and ATS resume readiness.
            </p>

            {currentUser && (
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300 font-medium">
                <span className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>{currentUser.college || 'Engineering Institute'}</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{currentUser.branch || 'B.Tech CSE'}</span>
                </span>
                {currentUser.rollNumber && (
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg font-mono">
                    Roll: {currentUser.rollNumber}
                  </span>
                )}
                {currentUser.graduationYear && (
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg">
                    Batch: {currentUser.graduationYear}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Readiness Gauge Hero Card */}
          <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl flex items-center space-x-5 shadow-lg">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/20 fill-transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={213}
                  strokeDashoffset={213 - (213 * readinessScore) / 100}
                  strokeLinecap="round"
                  className="text-emerald-400 fill-transparent transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black">{readinessScore}%</span>
                <span className="text-[9px] uppercase font-bold text-slate-300">Ready</span>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase font-bold text-blue-300 tracking-wider">
                Placement Index
              </div>
              <div className="text-base font-extrabold text-white mt-0.5">
                {readinessScore >= 80 ? 'Placement Ready' : readinessScore >= 50 ? 'Progressing Well' : 'Beginning Prep'}
              </div>
              <p className="text-[11px] text-slate-300 max-w-[140px] leading-snug mt-0.5">
                Based on quizzes, topics, companies & ATS score.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Quizzes Attempted */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quizzes Attempted</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalQuizzesAttempted}</div>
          <div className="flex items-center space-x-1.5 mt-2 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{passedQuizzes} Passed • Avg {averageScore}%</span>
          </div>
        </div>

        {/* KPI 2: Topics Mastered */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Topics Mastered</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{completedTopicsCount}</div>
          <div className="flex items-center space-x-1.5 mt-2 text-xs font-semibold text-indigo-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{topicProgressPercent}% of B.Tech Syllabus</span>
          </div>
        </div>

        {/* KPI 3: Companies Prepared */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Companies Prepared</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{preparedCompanies.length}</div>
          <div className="flex items-center space-x-1.5 mt-2 text-xs font-semibold text-amber-700">
            <Target className="w-3.5 h-3.5" />
            <span>PYQs & Hiring Rounds</span>
          </div>
        </div>

        {/* KPI 4: ATS Resume Score */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Resume ATS Score</span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{resumeScore} / 100</div>
          <div className="flex items-center space-x-1.5 mt-2 text-xs font-semibold text-violet-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{resumeScore >= 80 ? 'ATS Optimized' : 'Add More Projects'}</span>
          </div>
        </div>
      </div>

      {/* 3 Preparation Pillars Progress Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pillar 1: Topic Preparation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-blue-300 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Topic Preparation</h3>
                  <p className="text-xs text-slate-500">B.Tech Engineering Subjects</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {completedTopicsCount} Topics
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Curated notes, key interview formulas, top searched YouTube videos, and interactive timed quizzes for DSA, OS, DBMS, Networks, and OOPs.
            </p>

            {/* Subject micro-progress */}
            <div className="space-y-2 pt-2">
              {allSubjects.slice(0, 3).map(sub => {
                const subCompleted = sub.topics.filter(t => completedTopics.includes(t.id)).length;
                const subTotal = sub.topics.length;
                const pct = Math.round((subCompleted / subTotal) * 100);
                return (
                  <div key={sub.id} className="text-xs">
                    <div className="flex justify-between font-medium text-slate-700 mb-1">
                      <span>{sub.name}</span>
                      <span className="font-semibold text-slate-500">{subCompleted}/{subTotal}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('topics')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>Continue Topic Preparation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pillar 2: Company Preparation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-amber-300 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Company Preparation</h3>
                  <p className="text-xs text-slate-500">Any Role & Any Company</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                {preparedCompanies.length} Prepared
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Target any company (Google, Amazon, TCS, Microsoft, Infosys, etc.) and role to get hiring rounds, previous year questions (PYQs), and mock tests.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Popular Target Recruiters:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {allCompanies.slice(0, 5).map(c => (
                  <span 
                    key={c.id} 
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('companies')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>Explore Company PYQs & Mocks</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pillar 3: Interview Preparation & Resume */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-violet-300 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Interview & Resume</h3>
                  <p className="text-xs text-slate-500">STAR Method & Mock Simulator</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
                ATS {resumeScore}%
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Master high-impact HR behavioral questions using the STAR framework, practice on the Interactive Mock Interview Simulator, and build an ATS resume.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-700 font-medium">HR STAR Method Guide</span>
                <span className="font-bold text-emerald-600">Available</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-700 font-medium">Mock Interview Simulator</span>
                <span className="font-bold text-violet-600">Active</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab('interviews')}
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 transition-colors text-center"
            >
              Interview Prep
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center"
            >
              Resume Builder
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Section: Quiz Attempt History & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Quiz Attempts Table / Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">My Quiz Attempts & Scorecards</h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {studentAttempts.length} Total Attempts
            </span>
          </div>

          {studentAttempts.length > 0 ? (
            <div className="space-y-3">
              {studentAttempts.map(attempt => (
                <div 
                  key={attempt.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        attempt.category === 'topic' 
                          ? 'bg-blue-100 text-blue-800' 
                          : attempt.category === 'company' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-violet-100 text-violet-800'
                      }`}>
                        {attempt.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {attempt.relatedSubjectOrCompany}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {attempt.quizTitle}
                    </h4>

                    <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s
                      </span>
                      <span>•</span>
                      <span>{new Date(attempt.attemptedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900">
                        {attempt.score}/{attempt.totalQuestions}
                      </div>
                      <span className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
                        attempt.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {attempt.percentage}% • {attempt.passed ? 'Passed' : 'Needs Practice'}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedAttemptForModal(attempt)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-300 text-center space-y-3">
              <Award className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800">No Quizzes Attempted Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Test your knowledge by taking a topic quiz or company mock assessment. Your scores will automatically record here.
              </p>
              <button
                onClick={() => setActiveTab('topics')}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
              >
                <span>Take First Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Latest Placement Announcements & Drive Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">Campus Placement Alerts</h2>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div 
                key={ann.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded font-extrabold text-[10px] uppercase bg-indigo-50 text-indigo-700">
                    {ann.category}
                  </span>
                  <span className="text-slate-400 font-medium">{ann.date}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                  {ann.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {ann.content}
                </p>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Posted by {ann.author}</span>
                  {ann.actionLink && (
                    <button
                      onClick={() => {
                        if (ann.actionLink?.includes('company')) setActiveTab('companies');
                        else if (ann.actionLink?.includes('resume')) setActiveTab('resume');
                        else setActiveTab('topics');
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center text-xs"
                    >
                      View Details <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attempt Review Modal */}
      {selectedAttemptForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase text-blue-600">{selectedAttemptForModal.relatedSubjectOrCompany}</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedAttemptForModal.quizTitle}</h3>
              </div>
              <button
                onClick={() => setSelectedAttemptForModal(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Score</span>
                <span className="text-base font-bold text-slate-900">{selectedAttemptForModal.score}/{selectedAttemptForModal.totalQuestions}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Percentage</span>
                <span className="text-base font-bold text-blue-600">{selectedAttemptForModal.percentage}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Status</span>
                <span className={`text-base font-bold ${selectedAttemptForModal.passed ? 'text-emerald-600' : 'text-red-600'}`}>
                  {selectedAttemptForModal.passed ? 'PASSED' : 'RETRY'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Attempt completed on {new Date(selectedAttemptForModal.attemptedAt).toLocaleString()} with duration of {selectedAttemptForModal.timeSpentSeconds} seconds.
            </p>

            <button
              onClick={() => setSelectedAttemptForModal(null)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
