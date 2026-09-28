import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  X, 
  UserCheck, 
  ShieldCheck, 
  GraduationCap, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Building2, 
  BookOpen, 
  Calendar,
  AlertCircle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'student' | 'admin';
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultRole = 'student', 
  defaultMode = 'login' 
}) => {
  const { login, register, allUsers, switchUser } = usePortal();

  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [role, setRole] = useState<'student' | 'admin'>(defaultRole);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('Delhi Technological University (DTU)');
  const [branch, setBranch] = useState('Computer Science and Engineering');
  const [graduationYear, setGraduationYear] = useState('2025');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('Training & Placement Cell');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'login') {
      if (!email.trim()) {
        setErrorMsg('Please enter your email address.');
        return;
      }
      const res = login(email, role);
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setErrorMsg(res.message);
      }
    } else {
      // Register
      if (!name.trim() || !email.trim()) {
        setErrorMsg('Please provide your name and email.');
        return;
      }

      const res = register({
        name,
        email,
        role,
        college: role === 'student' ? college : undefined,
        branch: role === 'student' ? branch : undefined,
        graduationYear: role === 'student' ? parseInt(graduationYear) : undefined,
        rollNumber: role === 'student' ? rollNumber : undefined,
        department: role === 'admin' ? department : undefined
      });

      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  const handleDemoLogin = (userId: string) => {
    switchUser(userId);
    setSuccessMsg('Logged in with demo credentials!');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-linear-to-r from-slate-900 via-blue-950 to-indigo-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>NexPlace Placement Portal</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {mode === 'login' ? 'Sign In to Your Account' : 'Register New Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Access topic preparation, company placement PYQs, mock interviews, and dashboard analytics.
          </p>

          {/* Role selector pill */}
          <div className="mt-4 grid grid-cols-2 p-1 bg-white/10 rounded-xl border border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setRole('student'); setErrorMsg(null); }}
              className={`flex items-center justify-center space-x-2 py-2 rounded-lg transition-all ${
                role === 'student' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Student / Aspirant</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole('admin'); setErrorMsg(null); }}
              className={`flex items-center justify-center space-x-2 py-2 rounded-lg transition-all ${
                role === 'admin' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin / T&P Officer</span>
            </button>
          </div>
        </div>

        {/* Body & Form */}
        <div className="p-6 space-y-5">
          {/* Mode Switch Tabs (Login / Register) */}
          <div className="flex border-b border-slate-100 text-sm font-semibold">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(null); }}
              className={`pb-2.5 px-4 border-b-2 transition-all ${
                mode === 'login' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(null); }}
              className={`pb-2.5 px-4 border-b-2 transition-all ${
                mode === 'register' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={role === 'student' ? 'e.g. Rahul Sharma' : 'e.g. Prof. Vivek Oberoi'}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={role === 'student' ? 'student@college.edu' : 'admin@placement.edu'}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Additional fields for Student Registration */}
            {mode === 'register' && role === 'student' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    College / Institute
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={college}
                      onChange={e => setCollege(e.target.value)}
                      placeholder="e.g. DTU, VIT, NIT"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Branch / Major
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={branch}
                      onChange={e => setBranch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                    >
                      <option value="Computer Science and Engineering">Computer Science & Engg (CSE)</option>
                      <option value="Information Technology">Information Technology (IT)</option>
                      <option value="Electronics & Communication">Electronics & Comm (ECE)</option>
                      <option value="Electrical & Electronics">Electrical Engg (EEE)</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Other B.Tech Branch">Other B.Tech / BE Branch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Passout Year
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={graduationYear}
                      onChange={e => setGraduationYear(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                    >
                      <option value="2025">2025 Batch</option>
                      <option value="2026">2026 Batch</option>
                      <option value="2027">2027 Batch</option>
                      <option value="2028">2028 Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Roll / Registration No.
                  </label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={e => setRollNumber(e.target.value)}
                    placeholder="e.g. 21/CSE/089"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* Additional fields for Admin Registration */}
            {mode === 'register' && role === 'admin' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Department / Designation
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  placeholder="e.g. Head, Training & Placement Cell"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2.5 px-4 rounded-xl text-white text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-md ${
                role === 'admin' 
                  ? 'bg-indigo-600 hover:bg-indigo-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <span>{mode === 'login' ? `Sign In as ${role === 'admin' ? 'Admin' : 'Student'}` : `Complete Registration`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins Section for Instant Testing */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 block mb-2 text-center uppercase tracking-wider">
              Or 1-Click Demo Login
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoLogin('student-1')}
                className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left transition-colors"
              >
                <div className="font-bold text-slate-800">Arjun Verma</div>
                <div className="text-[11px] text-slate-500">Student • B.Tech CSE (DTU)</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('student-2')}
                className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left transition-colors"
              >
                <div className="font-bold text-slate-800">Neha Patel</div>
                <div className="text-[11px] text-slate-500">Student • B.Tech IT (VIT)</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin-1')}
                className="col-span-1 sm:col-span-2 p-2 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-left transition-colors"
              >
                <div className="font-bold text-indigo-950 flex items-center justify-between">
                  <span>Dr. S. K. Raman</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-200 text-indigo-800 uppercase font-black">Admin</span>
                </div>
                <div className="text-[11px] text-indigo-700">Head of Training & Placement Cell</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
