import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { BTechSubject, SubjectTopic } from '../types';
import { QuizModal } from './QuizModal';
import { 
  BookOpen, 
  Youtube, 
  Award, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Play, 
  ExternalLink, 
  Check, 
  Sparkles,
  HelpCircle,
  Binary,
  Cpu,
  Database,
  Network,
  Boxes,
  Calculator,
  Flame,
  ArrowRight
} from 'lucide-react';

export const TopicPreparation: React.FC = () => {
  const { allSubjects, completedTopics, markTopicCompleted, quizAttempts } = usePortal();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(allSubjects[0]?.id || 'dsa');
  const activeSubject = allSubjects.find(s => s.id === selectedSubjectId) || allSubjects[0];

  const [selectedTopicId, setSelectedTopicId] = useState<string>(activeSubject?.topics[0]?.id || '');
  const activeTopic = activeSubject?.topics.find(t => t.id === selectedTopicId) || activeSubject?.topics[0];

  const [activeSubTab, setActiveSubTab] = useState<'notes' | 'videos' | 'quiz'>('notes');
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);

  // Helper icon mapper
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary': return <Binary className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Boxes': return <Boxes className="w-5 h-5" />;
      case 'Calculator': return <Calculator className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const isCurrentTopicCompleted = activeTopic ? completedTopics.includes(activeTopic.id) : false;

  // Check if active topic's quiz was attempted
  const topicAttempt = activeTopic 
    ? quizAttempts.find(a => a.quizId === activeTopic.quiz.id)
    : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>B.Tech Engineering Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Topic Preparation & Study Notes
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Master essential computer science & engineering subjects required for technical screening and campus placements with curated cheat sheets, top YouTube masterclasses, and interactive quizzes.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Mastery Progress</span>
              <span className="text-lg font-black text-slate-900">
                {completedTopics.length} Topics Completed
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Subject Tabs */}
        <div className="flex gap-2 overflow-x-auto pt-6 border-t border-slate-100 mt-6 no-scrollbar">
          {allSubjects.map(sub => {
            const isSelected = sub.id === selectedSubjectId;
            const completedCount = sub.topics.filter(t => completedTopics.includes(t.id)).length;

            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  if (sub.topics.length > 0) {
                    setSelectedTopicId(sub.topics[0].id);
                  }
                }}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-2xl font-bold text-xs shrink-0 transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <span>{getSubjectIcon(sub.icon)}</span>
                <span>{sub.name}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                }`}>
                  {completedCount}/{sub.topics.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topics Sidebar in selected subject */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {activeSubject.name} Topics
              </span>
              <span className="text-[11px] font-mono text-slate-500">{activeSubject.code}</span>
            </div>

            <div className="space-y-2">
              {activeSubject.topics.map(topic => {
                const isSelected = topic.id === (activeTopic?.id || selectedTopicId);
                const isDone = completedTopics.includes(topic.id);

                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full p-3.5 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className={`text-xs font-bold leading-snug ${
                        isSelected ? 'text-blue-950' : 'text-slate-800'
                      }`}>
                        {topic.title}
                      </span>
                      {isDone ? (
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-3" />
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 shrink-0">
                          {topic.importance}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {topic.readTimeMinutes} min read
                      </span>
                      <span>•</span>
                      <span>{topic.youtubeVideos.length} Videos</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subject Meta Details Box */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span className="font-medium text-slate-500">Target Semester:</span>
                <span className="font-bold text-slate-800">{activeSubject.semesterHint}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-500">Rec. Prep Time:</span>
                <span className="font-bold text-slate-800">{activeSubject.recommendedDuration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Topic Content, Notes, Videos & Quiz */}
        <div className="lg:col-span-8 space-y-4">
          {activeTopic ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Topic Hero Banner */}
              <div className="p-6 bg-linear-to-r from-slate-900 to-blue-950 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center space-x-1">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>{activeTopic.frequencyInInterviews}</span>
                  </span>

                  <button
                    onClick={() => markTopicCompleted(activeTopic.id, activeTopic.title)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isCurrentTopicCompleted
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCurrentTopicCompleted ? 'Mastered' : 'Mark as Mastered'}</span>
                  </button>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {activeTopic.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  {activeTopic.summary}
                </p>

                {/* Sub Navigation: Notes vs Videos vs Quiz */}
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 text-xs font-bold">
                  <button
                    onClick={() => setActiveSubTab('notes')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                      activeSubTab === 'notes'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Topic Notes & Cheat Sheet</span>
                  </button>

                  <button
                    onClick={() => setActiveSubTab('videos')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                      activeSubTab === 'videos'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>Top YouTube Tutorials ({activeTopic.youtubeVideos.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveSubTab('quiz')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                      activeSubTab === 'quiz'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Topic Quiz {topicAttempt ? `(${topicAttempt.percentage}%)` : ''}</span>
                  </button>
                </div>
              </div>

              {/* Sub-Tab 1: Notes & Cheat Sheet */}
              {activeSubTab === 'notes' && (
                <div className="p-6 space-y-6">
                  {/* Key Concepts Bullet Chips */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Core Concept Pillars
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeTopic.keyConcepts.map((kc, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-start space-x-2">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{kc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes Content */}
                  <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 border-t border-slate-100 pt-4">
                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-slate-800 space-y-2 whitespace-pre-line font-sans">
                      {activeTopic.notesMarkdown}
                    </div>
                  </div>

                  {/* Quick Revision Cheat Sheet Box */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Interview Cheat Sheet & Traps to Avoid</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-amber-950">
                      {activeTopic.cheatSheetPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next Step Callout */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => setActiveSubTab('videos')}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
                    >
                      <Youtube className="w-4 h-4 text-red-500 mr-1" />
                      <span>Watch Top YouTube Videos</span>
                    </button>

                    <button
                      onClick={() => setIsQuizModalOpen(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm flex items-center space-x-1.5"
                    >
                      <span>Take Practice Quiz</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Top Searched YouTube Videos */}
              {activeSubTab === 'videos' && (
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Top Ranked Curated YouTube Masterclasses
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Handpicked by senior engineers and campus toppers for concept clarity and interview proofs.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {activeTopic.youtubeVideos.map((video, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-red-300 transition-all bg-white shadow-xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="font-bold text-red-600 flex items-center">
                                <Youtube className="w-4 h-4 mr-1" /> {video.channel}
                              </span>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-500">{video.views}</span>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-500 font-mono">{video.duration}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                              {video.title}
                            </h4>
                            <p className="text-xs text-slate-600">
                              {video.topicHighlight}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={() => setActiveVideoModal(video.youtubeId)}
                              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-xs flex items-center space-x-1.5"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Play in Portal</span>
                            </button>
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                              title="Open in YouTube"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>

                        {/* Inline Player if chosen */}
                        {activeVideoModal === video.youtubeId && (
                          <div className="pt-3 border-t border-slate-100">
                            <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black shadow-inner">
                              <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Interactive Topic Quiz */}
              {activeSubTab === 'quiz' && (
                <div className="p-6 space-y-6">
                  <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700">
                        Assessment Details
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        {activeTopic.quiz.title}
                      </h3>
                      <p className="text-xs text-slate-600">
                        {activeTopic.quiz.questions.length} Questions • {activeTopic.quiz.durationMinutes} Minutes • Difficulty: {activeTopic.quiz.difficulty}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center space-x-3">
                      {topicAttempt && (
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Best Score</span>
                          <span className="text-base font-bold text-emerald-700">
                            {topicAttempt.score}/{topicAttempt.totalQuestions} ({topicAttempt.percentage}%)
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => setIsQuizModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/25 flex items-center space-x-1.5"
                      >
                        <Award className="w-4 h-4" />
                        <span>{topicAttempt ? 'Retake Quiz' : 'Start Timed Quiz'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Question preview list */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Sample Questions in this Assessment:
                    </h4>
                    {activeTopic.quiz.questions.slice(0, 3).map((q, idx) => (
                      <div key={q.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs">
                        <span className="font-bold text-blue-700 mr-2">Q{idx + 1}.</span>
                        <span className="text-slate-800 font-medium">{q.question}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              Select a topic from the sidebar to view preparation resources.
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {activeTopic && (
        <QuizModal
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          quiz={activeTopic.quiz}
          onCompleted={(score, total, percentage) => {
            if (percentage >= 60) {
              markTopicCompleted(activeTopic.id, activeTopic.title);
            }
          }}
        />
      )}
    </div>
  );
};
