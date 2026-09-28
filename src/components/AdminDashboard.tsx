import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { User, ActivityLog, QuizAttempt } from '../types';
import { 
  ShieldCheck, 
  Users, 
  Trophy, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Building2, 
  TrendingUp, 
  Plus, 
  Send, 
  UserCheck, 
  Calendar,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Eye,
  LogOut
} from 'lucide-react';

interface AdminDashboardProps {
  openAuthModal: (role?: 'student' | 'admin', mode?: 'login' | 'register') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ openAuthModal }) => {
  const { 
    currentUser, 
    allUsers, 
    activityLogs, 
    quizAttempts, 
    announcements, 
    addAnnouncement 
  } = usePortal();

  const [activeAdminTab, setActiveAdminTab] = useState<'logs' | 'students' | 'analytics' | 'announcements'>('logs');
  
  // Activity Log filters
  const [logFilterAction, setLogFilterAction] = useState<string>('ALL');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  // Student directory filters
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<User | null>(null);

  // New announcement form state
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState<'Placement Drive' | 'Assessment Alert' | 'Interview Schedule' | 'Preparation Tip'>('Placement Drive');
  const [annContent, setAnnContent] = useState('');
  const [annSuccessToast, setAnnSuccessToast] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  // Metrics
  const studentsList = allUsers.filter(u => u.role === 'student');
  const totalStudents = studentsList.length;
  const totalAttempts = quizAttempts.length;
  const totalPassed = quizAttempts.filter(a => a.passed).length;
  const overallPassRate = totalAttempts > 0 ? Math.round((totalPassed / totalAttempts) * 100) : 0;
  const averageQuizScore = totalAttempts > 0
    ? Math.round(quizAttempts.reduce((acc, curr) => acc + curr.percentage, 0) / totalAttempts)
    : 0;

  // Filtered Activity Logs
  const filteredLogs = activityLogs.filter(log => {
    const matchesAction = logFilterAction === 'ALL' || log.actionType === logFilterAction;
    const matchesSearch = !logSearchQuery.trim() || 
      log.userName.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(logSearchQuery.toLowerCase());
    return matchesAction && matchesSearch;
  });

  // Filtered Students
  const filteredStudents = studentsList.filter(s => 
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
    (s.branch && s.branch.toLowerCase().includes(studentSearch.toLowerCase())) ||
    (s.rollNumber && s.rollNumber.toLowerCase().includes(studentSearch.toLowerCase()))
  );

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    addAnnouncement({
      title: annTitle,
      author: currentUser?.name || 'Head of Placement Cell',
      category: annCategory,
      content: annContent,
      actionLink: '#company-prep'
    });

    setAnnTitle('');
    setAnnContent('');
    setAnnSuccessToast(true);
    setTimeout(() => setAnnSuccessToast(false), 2500);
  };

  // Get attempts for a specific student drilldown
  const getAttemptsForStudent = (studentId: string): QuizAttempt[] => {
    return quizAttempts.filter(a => a.userId === studentId);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Admin Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Training & Placement (T&P) Officer Console</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Placement Cell Administration & Student Monitoring
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time audit monitoring of student logins, quiz attempts, scores, and module preparations across all B.Tech branches. Post placement drives and inspect individual student progress.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="bg-white/10 px-3 py-1 rounded-xl text-indigo-300 font-semibold">
                Officer: {currentUser?.role === 'admin' ? currentUser.name : 'Viewing in Preview Mode'}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-xl text-slate-300">
                Department: Training & Placement Cell
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
            {!isAdmin ? (
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center space-y-2">
                <span className="text-xs font-bold text-amber-300 block">Logged in as Student</span>
                <button
                  onClick={() => openAuthModal('admin', 'login')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Log In as Placement Admin
                </button>
              </div>
            ) : (
              <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl text-xs font-bold text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Admin Privileges Active</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Executive Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Students</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalStudents}</div>
          <span className="text-xs font-semibold text-blue-600 mt-1 block">Active across batches</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Quiz Attempts</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalAttempts}</div>
          <span className="text-xs font-semibold text-emerald-600 mt-1 block">{totalPassed} cleared benchmark</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Campus Average Score</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{averageQuizScore}%</div>
          <span className="text-xs font-semibold text-emerald-600 mt-1 block">Pass Rate: {overallPassRate}%</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Audit Actions Logged</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{activityLogs.length}</div>
          <span className="text-xs font-semibold text-amber-600 mt-1 block">Live real-time feed</span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 text-xs font-bold overflow-x-auto no-scrollbar">
        {[
          { id: 'logs', label: 'Live Student Activity & Audit Logs', icon: Clock },
          { id: 'students', label: 'Student Directory & Progress Drilldown', icon: Users },
          { id: 'analytics', label: 'Subject Performance Analytics', icon: TrendingUp },
          { id: 'announcements', label: 'Post Placement Drives & Alerts', icon: Send }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeAdminTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveAdminTab(t.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Live Student Activity Logs */}
      {activeAdminTab === 'logs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Real-Time Student Activity Stream
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every login, quiz attempt, topic reviewed, and company explored by students is captured in this log.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter student or detail..."
                  value={logSearchQuery}
                  onChange={e => setLogSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <select
                value={logFilterAction}
                onChange={e => setLogFilterAction(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="ALL">All Actions</option>
                <option value="LOGIN">Logins Only</option>
                <option value="QUIZ_ATTEMPT">Quiz Attempts</option>
                <option value="TOPIC_STUDIED">Topics Studied</option>
                <option value="COMPANY_EXPLORED">Companies Explored</option>
                <option value="RESUME_UPDATED">Resume Updates</option>
              </select>
            </div>
          </div>

          {/* Activity Logs Table */}
          <div className="space-y-3">
            {filteredLogs.length > 0 ? (
              filteredLogs.map(log => {
                let badgeClass = 'bg-slate-100 text-slate-700';
                if (log.actionType === 'LOGIN') badgeClass = 'bg-blue-100 text-blue-800';
                else if (log.actionType === 'QUIZ_ATTEMPT') badgeClass = 'bg-emerald-100 text-emerald-800';
                else if (log.actionType === 'TOPIC_STUDIED') badgeClass = 'bg-indigo-100 text-indigo-800';
                else if (log.actionType === 'COMPANY_EXPLORED') badgeClass = 'bg-amber-100 text-amber-800';
                else if (log.actionType === 'RESUME_UPDATED') badgeClass = 'bg-violet-100 text-violet-800';

                return (
                  <div
                    key={log.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 shrink-0">
                        {log.userName.substring(0, 1)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900">{log.userName}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${badgeClass}`}>
                            {log.actionType.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium leading-relaxed">
                          {log.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono shrink-0 self-end sm:self-center">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs border border-dashed rounded-2xl">
                No activity records found matching criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Student Directory & Individual Progress Drilldown */}
      {activeAdminTab === 'students' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Registered Student Directory & Performance Records
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click on any student to view their complete quiz history, individual answers, and module completion.
              </p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search name, roll no, branch..."
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map(student => {
              const studentQuizzes = getAttemptsForStudent(student.id);
              const avgScore = studentQuizzes.length > 0 
                ? Math.round(studentQuizzes.reduce((acc, curr) => acc + curr.percentage, 0) / studentQuizzes.length)
                : 0;

              return (
                <div 
                  key={student.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={student.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(student.name)}`}
                          alt={student.name}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm leading-snug">{student.name}</h4>
                          <span className="text-[11px] text-slate-500 block">{student.email}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                        {student.graduationYear || '2025'} Batch
                      </span>
                    </div>

                    <div className="text-xs space-y-1 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div><span className="font-semibold text-slate-700">College:</span> {student.college}</div>
                      <div><span className="font-semibold text-slate-700">Branch:</span> {student.branch}</div>
                      {student.rollNumber && <div><span className="font-semibold text-slate-700">Roll No:</span> {student.rollNumber}</div>}
                    </div>

                    {/* Stats pill */}
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2 bg-blue-50/80 rounded-xl text-blue-950">
                        <span className="text-[10px] uppercase font-bold block text-blue-600">Quizzes</span>
                        <span className="text-base font-black">{studentQuizzes.length}</span>
                      </div>
                      <div className="p-2 bg-emerald-50/80 rounded-xl text-emerald-950">
                        <span className="text-[10px] uppercase font-bold block text-emerald-600">Avg Score</span>
                        <span className="text-base font-black">{avgScore}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedStudentForModal(student)}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Student Progress</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Subject Performance Analytics */}
      {activeAdminTab === 'analytics' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Subject & Placement Domain Analytics
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of student quiz performance by B.Tech subjects to help faculty organize targeted remedial workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { subject: 'Data Structures & Algorithms', attempts: 18, avgScore: 84, status: 'Strong Mastery' },
              { subject: 'Operating Systems (Deadlocks & Memory)', attempts: 14, avgScore: 72, status: 'Moderate' },
              { subject: 'Database Management Systems (SQL & 3NF)', attempts: 12, avgScore: 78, status: 'Good' },
              { subject: 'Computer Networks (TCP/IP & OSI)', attempts: 9, avgScore: 68, status: 'Needs Workshop' },
              { subject: 'Quantitative Aptitude & Speed Math', attempts: 22, avgScore: 81, status: 'Strong Mastery' },
              { subject: 'System Design & Low Level Architecture', attempts: 7, avgScore: 65, status: 'Focus Area' }
            ].map((sub, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{sub.subject}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    sub.avgScore >= 80 ? 'bg-emerald-100 text-emerald-800' : sub.avgScore >= 70 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600 font-semibold">
                    <span>Average Accuracy: {sub.avgScore}%</span>
                    <span>{sub.attempts} Total Attempts</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        sub.avgScore >= 80 ? 'bg-emerald-500' : sub.avgScore >= 70 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${sub.avgScore}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Post Placement Drives & Alerts */}
      {activeAdminTab === 'announcements' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Publish Campus Placement Drive / Assessment Alert
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Notices published here appear immediately in real-time on all registered student dashboards.
            </p>
          </div>

          {annSuccessToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Announcement published successfully! Students can now see it on their dashboards.</span>
            </div>
          )}

          <form onSubmit={handlePostAnnouncement} className="space-y-4 max-w-xl text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                Announcement Title
              </label>
              <input
                type="text"
                required
                value={annTitle}
                onChange={e => setAnnTitle(e.target.value)}
                placeholder="e.g. Adobe On-Campus Drive Registration Open (2025/2026 Batch)"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                Notice Category
              </label>
              <select
                value={annCategory}
                onChange={e => setAnnCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 text-xs font-semibold"
              >
                <option value="Placement Drive">Placement Drive Notification</option>
                <option value="Assessment Alert">Online Assessment (OA) Alert</option>
                <option value="Interview Schedule">Interview Schedule Release</option>
                <option value="Preparation Tip">Preparation & Resume Tip</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                Content & Eligibility Details
              </label>
              <textarea
                rows={4}
                required
                value={annContent}
                onChange={e => setAnnContent(e.target.value)}
                placeholder="Mention package, eligibility criteria, test dates, and recommended syllabus..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Publish to All Students</span>
            </button>
          </form>
        </div>
      )}

      {/* Student Progress Drilldown Modal */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <img 
                  src={selectedStudentForModal.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedStudentForModal.name)}`}
                  alt={selectedStudentForModal.name}
                  className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedStudentForModal.name}</h3>
                  <span className="text-xs text-slate-500">{selectedStudentForModal.email} • {selectedStudentForModal.branch}</span>
                  <div className="text-[11px] font-mono text-indigo-600 font-bold mt-0.5">
                    {selectedStudentForModal.college} • Roll: {selectedStudentForModal.rollNumber || 'N/A'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xs p-1"
              >
                ✕
              </button>
            </div>

            {/* Quiz Attempts Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quiz Attempts History ({getAttemptsForStudent(selectedStudentForModal.id).length} attempts logged)
              </h4>

              {getAttemptsForStudent(selectedStudentForModal.id).length > 0 ? (
                getAttemptsForStudent(selectedStudentForModal.id).map(attempt => (
                  <div key={attempt.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{attempt.quizTitle}</span>
                      <span className="text-[11px] text-slate-500">{attempt.relatedSubjectOrCompany} • {new Date(attempt.attemptedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-slate-900 text-sm block">
                        {attempt.score}/{attempt.totalQuestions} ({attempt.percentage}%)
                      </span>
                      <span className={`text-[10px] font-bold uppercase ${attempt.passed ? 'text-emerald-700' : 'text-red-700'}`}>
                        {attempt.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-500 text-xs border border-dashed rounded-xl">
                  This student has not attempted any quizzes yet.
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedStudentForModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
