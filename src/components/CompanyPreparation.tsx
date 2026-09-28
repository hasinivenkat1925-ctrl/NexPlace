import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { CompanyProfile, CompanyPYQ } from '../types';
import { QuizModal } from './QuizModal';
import { 
  Building2, 
  Search, 
  Briefcase, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Code2, 
  Flame, 
  Sparkles, 
  Check, 
  Layers, 
  HelpCircle,
  Clock,
  GraduationCap,
  IndianRupee,
  FileCheck
} from 'lucide-react';

export const CompanyPreparation: React.FC = () => {
  const { allCompanies, getCompanyByNameOrId, markCompanyExplored, preparedCompanies, quizAttempts } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('google');
  
  // Resolve current company
  const activeCompany: CompanyProfile = getCompanyByNameOrId(selectedCompanyId) || allCompanies[0];

  // Role selector
  const availableRoles = activeCompany.roles;
  const [selectedRole, setSelectedRole] = useState<string>(availableRoles[0] || 'Software Development Engineer (SDE)');
  const [customRoleInput, setCustomRoleInput] = useState('');

  // Active PYQ filter
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedPYQId, setExpandedPYQId] = useState<string | null>(null);
  const [practicedPYQs, setPracticedPYQs] = useState<string[]>(['amz-pyq-1', 'goog-pyq-1']);

  // Mock Quiz state
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Filter PYQs for selected company and role
  const effectiveRole = customRoleInput.trim() || selectedRole;

  // Filter company PYQs matching role or fallback to general company PYQs
  const filteredPYQs = activeCompany.pyqs.filter(pyq => {
    const matchesRole = !effectiveRole || pyq.role.toLowerCase().includes(effectiveRole.toLowerCase()) || effectiveRole.toLowerCase().includes(pyq.role.toLowerCase()) || activeCompany.pyqs.length <= 2;
    const matchesDiff = selectedDifficulty === 'All' || pyq.difficulty === selectedDifficulty;
    return matchesRole && matchesDiff;
  });

  const isCompanyPrepared = preparedCompanies.includes(activeCompany.id.toLowerCase());

  const handleCompanySelect = (comp: CompanyProfile) => {
    setSelectedCompanyId(comp.id);
    setSelectedRole(comp.roles[0] || 'Software Development Engineer (SDE)');
    setCustomRoleInput('');
    setExpandedPYQId(null);
    markCompanyExplored(comp.name, comp.roles[0] || 'SDE');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const resolved = getCompanyByNameOrId(searchQuery);
    if (resolved) {
      setSelectedCompanyId(resolved.id);
      setSelectedRole(resolved.roles[0] || 'Software Development Engineer (SDE)');
      setCustomRoleInput('');
      markCompanyExplored(resolved.name, resolved.roles[0] || 'SDE');
    }
  };

  const togglePracticed = (pyqId: string) => {
    setPracticedPYQs(prev => 
      prev.includes(pyqId) ? prev.filter(id => id !== pyqId) : [...prev, pyqId]
    );
  };

  // Mock quiz attempt
  const mockQuizAttempt = quizAttempts.find(a => a.quizId === activeCompany.mockQuiz.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Target Any Company & Any Role</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Company-Wise Placement Preparation
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Select any tech enterprise, mass recruiter, or startup alongside your targeted job role. Access real previous year questions (PYQs), hiring round formats, eligibility criteria, and simulated assessments.
            </p>
          </div>

          {/* Quick Search Bar for ANY Company */}
          <form onSubmit={handleSearchSubmit} className="w-full md:w-80 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search or type ANY company..."
                className="w-full pl-10 pr-20 py-2.5 text-xs border border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-slate-50"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Go
              </button>
            </div>
          </form>
        </div>

        {/* Featured Top Company Chips */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Top Recruiters:
          </span>
          {allCompanies.map(c => {
            const isSelected = c.id === activeCompany.id;
            return (
              <button
                key={c.id}
                onClick={() => handleCompanySelect(c)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm ring-2 ring-amber-500/50'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${
                  isSelected ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {c.logoText.substring(0, 2)}
                </span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Company & Role Control Banner */}
      <div className="bg-linear-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl font-black text-amber-400 shadow-inner shrink-0">
              {activeCompany.logoText}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {activeCompany.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  {activeCompany.tier}
                </span>
                {isCompanyPrepared && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center">
                    <Check className="w-3 h-3 mr-1" /> Added to Prep List
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {activeCompany.description}
              </p>

              {/* Package & Eligibility Pills */}
              <div className="flex flex-wrap gap-3 pt-2 text-xs">
                <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-xl text-amber-300 font-bold">
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>Avg Package: {activeCompany.avgPackage}</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-xl text-slate-200">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Min CGPA: {activeCompany.eligibility.minCGPA}</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1 rounded-xl text-slate-200">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Backlogs: {activeCompany.eligibility.backlogsAllowed === 0 ? 'None' : activeCompany.eligibility.backlogsAllowed}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Mock Assessment CTA Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex flex-col justify-between shrink-0 space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                Company Mock Test
              </span>
              <div className="text-sm font-bold text-white mt-0.5">
                {activeCompany.mockQuiz.title}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                {activeCompany.mockQuiz.questions.length} Questions • {activeCompany.mockQuiz.durationMinutes} Mins
              </div>
            </div>

            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="w-full py-2 px-4 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm flex items-center justify-center space-x-1.5"
            >
              <Award className="w-4 h-4" />
              <span>{mockQuizAttempt ? `Retake Mock (${mockQuizAttempt.percentage}%)` : 'Start Company Mock'}</span>
            </button>
          </div>
        </div>

        {/* ROLE SELECTION BAR (Select Any Role for this Company) */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center">
              <Briefcase className="w-4 h-4 mr-1.5 text-amber-400" />
              Select Job Position / Role:
            </span>
            <span className="text-[11px] text-slate-400">
              PYQs & rounds update dynamically
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {availableRoles.map(role => {
              const isRoleActive = effectiveRole === role;
              return (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedRole(role);
                    setCustomRoleInput('');
                    markCompanyExplored(activeCompany.name, role);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isRoleActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200'
                  }`}
                >
                  {role}
                </button>
              );
            })}

            {/* Custom Role Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Or type custom role..."
                value={customRoleInput}
                onChange={e => setCustomRoleInput(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Process Rounds Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900">
              {activeCompany.name} Recruitment Process & Exam Pattern
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {activeCompany.hiringProcess.length} Rounds Total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeCompany.hiringProcess.map(round => (
            <div 
              key={round.roundNumber}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded font-black text-[10px] uppercase bg-amber-100 text-amber-800">
                  Round {round.roundNumber}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">{round.duration}</span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm leading-snug">
                {round.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {round.description}
              </p>

              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Focus Areas:
                </span>
                <div className="flex flex-wrap gap-1">
                  {round.focusAreas.map((fa, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-slate-200 text-slate-700">
                      {fa}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Previous Year Questions (PYQs) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-amber-600" />
              <h3 className="text-xl font-bold text-slate-900">
                Frequently Asked PYQs: {activeCompany.name} ({effectiveRole})
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Real interview problems compiled from past campus placements with code implementations and step-by-step logic.
            </p>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {['All', 'Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedDifficulty === d ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* PYQ List */}
        <div className="space-y-4">
          {filteredPYQs.length > 0 ? (
            filteredPYQs.map(pyq => {
              const isExpanded = expandedPYQId === pyq.id;
              const isDone = practicedPYQs.includes(pyq.id);

              return (
                <div 
                  key={pyq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded 
                      ? 'border-amber-400 bg-white ring-2 ring-amber-500/10 shadow-md' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* PYQ Header Row */}
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          pyq.difficulty === 'Hard' ? 'bg-red-100 text-red-800' : pyq.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {pyq.difficulty}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                          {pyq.round}
                        </span>
                        <span className="text-xs font-extrabold text-amber-700 flex items-center">
                          <Flame className="w-3.5 h-3.5 mr-1 text-amber-500" />
                          {pyq.frequency}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-base leading-snug">
                        {pyq.title}
                      </h4>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pyq.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => togglePracticed(pyq.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                          isDone 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isDone ? 'Practiced' : 'Mark Practiced'}</span>
                      </button>

                      <button
                        onClick={() => setExpandedPYQId(isExpanded ? null : pyq.id)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                      >
                        {isExpanded ? 'Hide Solution' : 'View Solution'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail Panel with Logic & Code */}
                  {isExpanded && (
                    <div className="p-6 bg-slate-50/70 border-t border-slate-100 space-y-4 text-xs animate-in fade-in duration-150">
                      <div>
                        <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Problem Statement:
                        </span>
                        <p className="text-sm font-medium text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                          {pyq.question}
                        </p>
                      </div>

                      {pyq.sampleInputOutput && (
                        <div>
                          <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            Example Test Case:
                          </span>
                          <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono rounded-xl">
                            {pyq.sampleInputOutput}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
                          Optimal Algorithmic Approach:
                        </span>
                        <p className="text-slate-700 leading-relaxed p-3 bg-amber-50/60 rounded-xl border border-amber-200/60">
                          {pyq.approach}
                        </p>
                      </div>

                      {pyq.codeSolution && (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold uppercase tracking-wider text-slate-500">
                              Production Code ({pyq.language || 'C++'}):
                            </span>
                          </div>
                          <pre className="p-4 bg-slate-950 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                            {pyq.codeSolution}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs">
              No questions found for the selected filter. Try switching difficulty or role!
            </div>
          )}
        </div>
      </div>

      {/* Insider Tips from Placed Alumni */}
      <div className="p-6 rounded-3xl bg-amber-50/60 border border-amber-200 space-y-3">
        <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span>Insider Placement Advice for {activeCompany.name} ({effectiveRole})</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {activeCompany.tipsFromSeniors.map((tip, idx) => (
            <div key={idx} className="p-3 bg-white/90 rounded-2xl border border-amber-200 text-xs text-amber-950 font-medium flex items-start space-x-2">
              <span className="text-amber-600 font-bold">✓</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Company Mock Quiz Modal */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        quiz={activeCompany.mockQuiz}
        onCompleted={(score, total, percentage) => {
          markCompanyExplored(activeCompany.name, effectiveRole);
        }}
      />
    </div>
  );
};
