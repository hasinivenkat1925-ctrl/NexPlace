import React, { useState, useEffect } from 'react';
import { QuizDefinition, QuizQuestion } from '../types';
import { usePortal } from '../context/PortalContext';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  quiz: QuizDefinition;
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: (score: number, total: number, percentage: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, isOpen, onClose, onCompleted }) => {
  const { currentUser, recordQuizAttempt } = usePortal();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60);
  const [startTime] = useState<number>(Date.now());
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Reset quiz state when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setTimeLeft(quiz.durationMinutes * 60);
    }
  }, [isOpen, quiz]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isSubmitted, selectedAnswers]);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    return { correctCount, percentage };
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    setTimeSpent(elapsedSeconds);

    const { correctCount, percentage } = calculateScore();
    const passed = percentage >= 60;

    // Trigger celebratory confetti if passed high
    if (percentage >= 80) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully
      }
    }

    // Save to global context
    if (currentUser) {
      recordQuizAttempt({
        userId: currentUser.id,
        quizId: quiz.id,
        quizTitle: quiz.title,
        category: quiz.category,
        relatedSubjectOrCompany: quiz.relatedSubjectOrCompany,
        score: correctCount,
        totalQuestions,
        percentage,
        passed,
        timeSpentSeconds: elapsedSeconds,
        userAnswers: selectedAnswers
      });
    }

    setIsSubmitted(true);
    if (onCompleted) {
      onCompleted(correctCount, totalQuestions, percentage);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const { correctCount, percentage } = calculateScore();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-400">
                {quiz.relatedSubjectOrCompany} • {quiz.difficulty}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 truncate max-w-md">
                {quiz.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!isSubmitted && (
              <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                timeLeft < 120 ? 'bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse' : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!isSubmitted ? (
            <>
              {/* Progress Bar & Question Counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                  <span>{answeredCount} of {totalQuestions} answered</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="space-y-4">
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  {currentQ.question}
                </h4>

                {currentQ.codeSnippet && (
                  <div className="p-3 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                    <pre>{currentQ.codeSnippet}</pre>
                  </div>
                )}

                {/* Options list */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[currentQ.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3 text-sm ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Jump Navigator */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-slate-400 mr-1">Jump to:</span>
                {quiz.questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = currentQuestionIndex === idx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        isCurrent 
                          ? 'ring-2 ring-blue-600 bg-blue-600 text-white' 
                          : isAnswered 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Results & Solutions View */
            <div className="space-y-6">
              {/* Scorecard Hero */}
              <div className={`p-6 rounded-2xl border text-center ${
                percentage >= 80 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : percentage >= 60
                    ? 'bg-blue-50 border-blue-200 text-blue-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-3">
                  {percentage >= 80 ? (
                    <Sparkles className="w-8 h-8 text-emerald-600" />
                  ) : percentage >= 60 ? (
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                  ) : (
                    <RotateCcw className="w-8 h-8 text-amber-600" />
                  )}
                </div>

                <h3 className="text-2xl font-black mb-1">
                  {percentage >= 80 ? 'Outstanding Performance!' : percentage >= 60 ? 'Well Done! Passed' : 'Keep Practicing!'}
                </h3>
                <p className="text-sm opacity-80 max-w-md mx-auto">
                  {percentage >= 80 
                    ? 'You have thoroughly demonstrated strong placement readiness in this subject.' 
                    : percentage >= 60 
                      ? 'Solid performance. Review the detailed explanations below to eliminate minor gaps.'
                      : 'Review the theoretical concepts and retry this quiz to boost your campus readiness index.'}
                </p>

                <div className="flex justify-center items-center gap-6 mt-5 text-sm font-semibold">
                  <div className="bg-white/80 backdrop-blur-xs px-4 py-2 rounded-xl shadow-xs border border-current/10">
                    <span className="text-xs uppercase block opacity-60">Score</span>
                    <span className="text-xl font-bold">{correctCount} / {totalQuestions}</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-xs px-4 py-2 rounded-xl shadow-xs border border-current/10">
                    <span className="text-xs uppercase block opacity-60">Accuracy</span>
                    <span className="text-xl font-bold">{percentage}%</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-xs px-4 py-2 rounded-xl shadow-xs border border-current/10">
                    <span className="text-xs uppercase block opacity-60">Time Taken</span>
                    <span className="text-xl font-bold">{formatTime(timeSpent)}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Detailed Solution & Answer Key
                </h4>

                {quiz.questions.map((q, idx) => {
                  const userChoice = selectedAnswers[q.id];
                  const isCorrect = userChoice === q.correctAnswer;

                  return (
                    <div 
                      key={q.id} 
                      className={`p-4 rounded-xl border ${
                        isCorrect ? 'bg-slate-50/70 border-slate-200' : 'bg-red-50/40 border-red-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-start space-x-2">
                          <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 mt-0.5">
                            Q{idx + 1}
                          </span>
                          <p className="text-sm font-semibold text-slate-800">{q.question}</p>
                        </div>
                        {isCorrect ? (
                          <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Correct (+1)
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full shrink-0">
                            <XCircle className="w-3.5 h-3.5 mr-1" /> Incorrect
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5 pl-7 text-xs">
                        {q.options.map((opt, optIdx) => {
                          const isRight = optIdx === q.correctAnswer;
                          const wasChosen = userChoice === optIdx;

                          let badgeClass = 'text-slate-600';
                          if (isRight) badgeClass = 'font-bold text-emerald-800 bg-emerald-100/80 px-2 py-1 rounded';
                          else if (wasChosen) badgeClass = 'line-through text-red-700 font-medium';

                          return (
                            <div key={optIdx} className={`py-0.5 ${badgeClass}`}>
                              {String.fromCharCode(65 + optIdx)}. {opt}
                              {isRight && ' ✓ (Correct Answer)'}
                              {wasChosen && !isRight && ' ✗ (Your Choice)'}
                            </div>
                          );
                        })}

                        <div className="mt-2.5 p-2.5 rounded-lg bg-blue-50/60 border border-blue-200/50 text-slate-700">
                          <span className="font-bold text-blue-900 block mb-0.5 flex items-center">
                            <HelpCircle className="w-3.5 h-3.5 mr-1 text-blue-600" /> Explanation:
                          </span>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </button>

              <div className="flex items-center space-x-2">
                {currentQuestionIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="inline-flex items-center px-5 py-2 text-xs font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm animate-pulse"
                  >
                    Submit Test <CheckCircle2 className="w-4 h-4 ml-1.5" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Results recorded automatically to your Student Dashboard & Admin Audit Log.
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
              >
                Close & Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
