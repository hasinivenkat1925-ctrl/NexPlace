import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { INTERVIEW_ROLES_GUIDE, HR_QUESTIONS_GUIDE } from '../data/mockData';
import { QuizModal } from './QuizModal';
import { QuizDefinition } from '../types';
import { 
  Users, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Clock, 
  Award, 
  ChevronRight, 
  Code2, 
  BarChart3, 
  Cloud,
  Mic,
  RotateCcw,
  Check,
  HelpCircle
} from 'lucide-react';

const INTERVIEW_READINESS_QUIZ: QuizDefinition = {
  id: 'quiz-interview-readiness',
  title: 'Technical & Behavioral Interview Readiness Assessment',
  category: 'interview',
  relatedSubjectOrCompany: 'Interview Mastery',
  durationMinutes: 12,
  difficulty: 'Intermediate',
  questions: [
    {
      id: 1,
      question: 'In the STAR interview methodology, what does the letter "A" stand for?',
      options: ['Ambition', 'Action (The specific steps you personally took)', 'Agreement', 'Assessment'],
      correctAnswer: 1,
      explanation: 'STAR stands for Situation, Task, Action, and Result. The Action component details what you personally did to resolve the challenge.'
    },
    {
      id: 2,
      question: 'When asked by an interviewer "Tell me about a time you had a conflict with a teammate", what is the primary quality being evaluated?',
      options: ['How aggressively you defend your code', 'Emotional maturity, active listening, and finding collaborative common ground without blaming', 'Whether you report them to HR immediately', 'Proving the teammate was wrong'],
      correctAnswer: 1,
      explanation: 'Interviewers look for high EQ, psychological safety, depersonalizing technical debates, and focusing on product/engineering outcomes.'
    },
    {
      id: 3,
      question: 'When asked "What is your biggest weakness?", which response is considered most authentic and positive?',
      options: [
        '"I am such a perfectionist and work too hard."',
        '"I have no weaknesses; I know everything about full stack."',
        'A genuine non-fatal area you previously struggled with, followed by the concrete proactive steps you have taken to improve it.',
        '"I am often late to morning standups."'
      ],
      correctAnswer: 2,
      explanation: 'Stating a genuine improvement area (e.g. public speaking or delegating early) combined with tangible evidence of recent progress demonstrates self-awareness and coachability.'
    },
    {
      id: 4,
      question: 'During a technical live coding interview, what should you do if you realize your initial approach has an edge case flaw halfway through?',
      options: [
        'Pretend you did not notice and continue hoping the interviewer misses it',
        'Immediately communicate the flaw clearly to the interviewer, explain why it fails, and discuss how to adjust the algorithm',
        'Close the browser tab',
        'Argue with the interviewer'
      ],
      correctAnswer: 1,
      explanation: 'Spotting and communicating your own bugs shows strong code review instincts, transparency, and maturity.'
    }
  ]
};

export const InterviewPreparation: React.FC = () => {
  const { logAction, quizAttempts } = usePortal();

  const [activeTab, setActiveTab] = useState<'roles' | 'hr-star' | 'simulator' | 'quiz'>('roles');
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [selectedHRQuestionId, setSelectedHRQuestionId] = useState<string>(HR_QUESTIONS_GUIDE[0].id);

  // Simulator state
  const [simQuestionIndex, setSimQuestionIndex] = useState(0);
  const [simUserAnswer, setSimUserAnswer] = useState('');
  const [isSimEvaluating, setIsSimEvaluating] = useState(false);
  const [simFeedbackGiven, setSimFeedbackGiven] = useState(false);
  const [simTimer, setSimTimer] = useState(120);

  // Quiz Modal state
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const activeRoleGuide = INTERVIEW_ROLES_GUIDE[selectedRoleIndex];
  const activeHRQuestion = HR_QUESTIONS_GUIDE.find(q => q.id === selectedHRQuestionId) || HR_QUESTIONS_GUIDE[0];

  const SIMULATOR_QUESTIONS = [
    {
      type: 'Technical Problem Solving',
      question: 'How would you scale a web application handling 10,000 requests/second with a database bottleneck?',
      criteria: ['Caching layer (Redis/Memcached)', 'Database Read Replicas', 'Connection Pooling', 'Sharding / Partitioning', 'Asynchronous Message Queues']
    },
    {
      type: 'Behavioral / Leadership',
      question: 'Tell me about a complex project you worked on where requirements changed midway. How did you adapt?',
      criteria: ['Clear problem context', 'Agile iteration', 'Communication with stakeholders', 'Pruning non-essential scope', 'Measured impact']
    },
    {
      type: 'Core CS / Systems',
      question: 'Can you explain the difference between Process and Thread, and when you would use multi-threading over multi-processing?',
      criteria: ['Shared memory vs separate address space', 'Context switching overhead', 'IPC mechanisms', 'Failure isolation']
    }
  ];

  const currentSimQ = SIMULATOR_QUESTIONS[simQuestionIndex];

  const handleSimSubmit = () => {
    setIsSimEvaluating(true);
    setTimeout(() => {
      setIsSimEvaluating(false);
      setSimFeedbackGiven(true);
      logAction('INTERVIEW_PRACTICE', `Practiced mock interview question: "${currentSimQ.question.substring(0, 45)}...".`);
    }, 800);
  };

  const handleSimNext = () => {
    setSimUserAnswer('');
    setSimFeedbackGiven(false);
    setSimQuestionIndex((prev) => (prev + 1) % SIMULATOR_QUESTIONS.length);
    setSimTimer(120);
  };

  const interviewQuizAttempt = quizAttempts.find(a => a.quizId === INTERVIEW_READINESS_QUIZ.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Campus Interview Readiness</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Technical & HR Interview Preparation
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Crack on-campus and off-campus interviews with role-specific technical guides, the STAR behavioral framework, interactive voice/text mock simulations, and interview scenario assessments.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-violet-50 border border-violet-200 px-4 py-3 rounded-2xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-violet-500 block">Assessment Score</span>
              <span className="text-lg font-black text-violet-950">
                {interviewQuizAttempt ? `${interviewQuizAttempt.percentage}% Passed` : 'Not Attempted'}
              </span>
            </div>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              Take Quiz
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex gap-2 overflow-x-auto pt-6 border-t border-slate-100 mt-6 no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'roles'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Interview Roles Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('hr-star')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'hr-star'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>HR STAR Method Masterclass</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'simulator'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Mic className="w-4 h-4 text-emerald-500" />
            <span>Mock Interview Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'quiz'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-4 h-4 text-blue-500" />
            <span>Interview Readiness Assessment</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Roles Guide */}
      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Roles Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 px-1">
              Select Placement Track:
            </div>
            {INTERVIEW_ROLES_GUIDE.map((rg, idx) => {
              const isSelected = selectedRoleIndex === idx;
              return (
                <button
                  key={rg.role}
                  onClick={() => setSelectedRoleIndex(idx)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-white border-violet-500 shadow-sm ring-2 ring-violet-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                      isSelected ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {idx === 0 ? <Code2 className="w-5 h-5" /> : idx === 1 ? <BarChart3 className="w-5 h-5" /> : <Cloud className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                        {rg.role}
                      </h4>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {rg.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Role Detail View */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="space-y-2 pb-4 border-b border-slate-100">
              <span className="text-[10px] uppercase font-bold text-violet-600 tracking-wider">
                Comprehensive Role Blueprint
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                {activeRoleGuide.role}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeRoleGuide.description}
              </p>
            </div>

            {/* Core Required Skills */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Core Skills Evaluated:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeRoleGuide.coreSkills.map((skill, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typical Rounds */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Typical Hiring Stages:
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeRoleGuide.typicalRounds.map((round, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-violet-50 border border-violet-200 text-violet-900 text-xs font-bold">
                    {round}
                  </span>
                ))}
              </div>
            </div>

            {/* Frequent Role Questions */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Frequent Technical Questions & Model Depth:
              </h3>
              {activeRoleGuide.frequentQuestions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-start space-x-2">
                    <span className="font-black text-violet-700 bg-violet-100 px-2 py-0.5 rounded text-[11px] shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{q.question}</h4>
                  </div>

                  <p className="text-slate-600 pl-8 leading-relaxed">
                    <span className="font-bold text-slate-800">Expected Depth:</span> {q.expectedDepth}
                  </p>

                  <div className="pl-8 pt-2">
                    <span className="font-bold text-slate-700 block mb-1 text-[11px]">Key Talking Points to Include:</span>
                    <ul className="space-y-1">
                      {q.modelAnswerKeypoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start space-x-1.5 text-slate-600 text-[11px]">
                          <span className="text-violet-600 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: HR STAR Method Masterclass */}
      {activeTab === 'hr-star' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block px-1">
              Top 4 High-Yield HR Questions:
            </span>
            {HR_QUESTIONS_GUIDE.map((hrQ) => {
              const isSelected = hrQ.id === selectedHRQuestionId;
              return (
                <button
                  key={hrQ.id}
                  onClick={() => setSelectedHRQuestionId(hrQ.id)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-sm ring-2 ring-amber-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 mb-1.5 inline-block">
                    {hrQ.category}
                  </span>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                    {hrQ.question}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Question Breakdown and STAR Formulation */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="space-y-2 pb-4 border-b border-slate-100">
              <span className="text-xs font-black uppercase text-amber-600">
                {activeHRQuestion.category} Analysis
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                “{activeHRQuestion.question}”
              </h2>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Interviewer's Hidden Intent: </span>
                  {activeHRQuestion.interviewerIntent}
                </div>
              </div>
            </div>

            {/* STAR Breakdown Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                STAR Framework Breakdown:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-blue-700 uppercase tracking-wider text-[11px] block">
                    [S] Situation:
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {activeHRQuestion.starMethodApproach.situation}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-indigo-700 uppercase tracking-wider text-[11px] block">
                    [T] Task:
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {activeHRQuestion.starMethodApproach.task}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-emerald-700 uppercase tracking-wider text-[11px] block">
                    [A] Action (Your Direct Effort):
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {activeHRQuestion.starMethodApproach.action}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-amber-700 uppercase tracking-wider text-[11px] block">
                    [R] Result & Measurable Impact:
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {activeHRQuestion.starMethodApproach.result}
                  </p>
                </div>
              </div>
            </div>

            {/* Sample High Scoring Model Answer */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <span className="text-xs font-black uppercase text-emerald-900 tracking-wider flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-emerald-600" />
                High-Impact Sample Answer (Script to Model):
              </span>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium italic leading-relaxed">
                {activeHRQuestion.sampleAnswer}
              </p>
            </div>

            {/* Red Flags to Avoid */}
            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-2">
              <span className="text-xs font-black uppercase text-red-900 tracking-wider flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1 text-red-600" />
                Deadly Red Flags to Avoid:
              </span>
              <ul className="space-y-1 text-xs text-red-950">
                {activeHRQuestion.redFlagsToAvoid.map((flag, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Mock Interview Simulator */}
      {activeTab === 'simulator' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase text-emerald-600">
                Live Simulation Lab
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Interactive Mock Interview Simulator
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice answering under real interview time constraints and evaluate against key grading criteria.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 font-mono text-xs font-bold text-slate-700">
                Scenario {simQuestionIndex + 1} of {SIMULATOR_QUESTIONS.length}
              </span>
              <button
                onClick={handleSimNext}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center space-x-1"
              >
                <span>Next Scenario</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Simulator Question Prompt Card */}
          <div className="p-6 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {currentSimQ.type}
              </span>
              <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Recommended: 2 mins</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug">
              “{currentSimQ.question}”
            </h3>
          </div>

          {/* Answer Input Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Your Formulated Answer / Speaking Points:</span>
              <span>{simUserAnswer.split(/\s+/).filter(Boolean).length} words</span>
            </div>

            <textarea
              rows={6}
              value={simUserAnswer}
              onChange={e => setSimUserAnswer(e.target.value)}
              placeholder="Structure your answer using the STAR format or architectural pillars: Explain context, actions taken, tech stack trade-offs, and measurable outcomes..."
              className="w-full p-4 text-xs sm:text-sm border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-slate-50/50"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setSimUserAnswer('In my previous experience, I solved this by decoupling the read-heavy queries using Redis as a distributed cache. For remaining database writes, we introduced write-ahead connection pooling and read replicas, which reduced load by 45%.')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Paste Sample Quick Answer
              </button>

              <button
                onClick={handleSimSubmit}
                disabled={isSimEvaluating || !simUserAnswer.trim()}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
              >
                {isSimEvaluating ? (
                  <span>Evaluating Rubric...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Evaluate My Answer</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Simulator Evaluation & Rubric Feedback */}
          {simFeedbackGiven && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Interviewer Rubric & Verification
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Answer Evaluated
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Key Concepts an Interviewer Expects in this Response:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentSimQ.criteria.map((c, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-800 font-medium flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 pt-1">
                Tip: Speak in concrete numbers whenever possible (e.g. "reduced latency by 30%", "handled 5k req/s") rather than general statements.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Interview Readiness Quiz Launcher */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="p-6 rounded-2xl bg-linear-to-r from-violet-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-300">
                Mastery Evaluation
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {INTERVIEW_READINESS_QUIZ.title}
              </h2>
              <p className="text-xs text-slate-300">
                {INTERVIEW_READINESS_QUIZ.questions.length} Scenario Questions • {INTERVIEW_READINESS_QUIZ.durationMinutes} Minutes • STAR Framework & Behavioral Mastery
              </p>
            </div>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-6 py-3 rounded-2xl bg-white text-violet-950 font-black text-xs hover:bg-slate-100 transition-all shadow-md shrink-0 flex items-center space-x-2"
            >
              <Award className="w-4 h-4 text-violet-600" />
              <span>{interviewQuizAttempt ? 'Retake Quiz' : 'Begin Assessment'}</span>
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sample Situations Evaluated:
            </h4>
            {INTERVIEW_READINESS_QUIZ.questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs">
                <span className="font-bold text-violet-700 mr-2">Q{idx + 1}.</span>
                <span className="text-slate-800 font-medium">{q.question}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        quiz={INTERVIEW_READINESS_QUIZ}
      />
    </div>
  );
};
