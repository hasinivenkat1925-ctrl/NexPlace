import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Building2, 
  Users, 
  FileText, 
  ShieldCheck, 
  LogOut, 
  UserCheck, 
  ChevronDown, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuthModal: (role?: 'student' | 'admin', mode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { currentUser, logout, allUsers, switchUser } = usePortal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'My Progress', icon: LayoutDashboard },
    { id: 'topics', label: 'Topic Preparation', icon: BookOpen },
    { id: 'companies', label: 'Company Preparation', icon: Building2 },
    { id: 'interviews', label: 'Interview Preparation', icon: Users },
    { id: 'resume', label: 'Resume Builder', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  NexPlace
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Placement Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Campus to Tech Career
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* Admin Portal Tab */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ml-1 ${
                activeTab === 'admin'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-indigo-300 hover:text-white hover:bg-indigo-950/60 border border-indigo-800/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Admin Portal</span>
            </button>
          </nav>

          {/* User Profile / Quick Switcher */}
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-all text-left"
                >
                  <img
                    src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-600"
                  />
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-slate-100 flex items-center space-x-1">
                      <span className="truncate max-w-[110px]">{currentUser.name}</span>
                      {currentUser.role === 'admin' ? (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-indigo-500 text-white">
                          Admin
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-blue-500/20 text-blue-400">
                          Student
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                      {currentUser.role === 'admin' ? currentUser.department : currentUser.branch}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div 
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="p-3 bg-slate-800/80 rounded-xl mb-2">
                      <div className="font-bold text-white text-sm">{currentUser.name}</div>
                      <div className="text-slate-400 text-[11px] truncate">{currentUser.email}</div>
                      <div className="mt-1 text-[10px] font-mono text-blue-400">
                        {currentUser.college || currentUser.department}
                      </div>
                    </div>

                    {/* Fast Switch User options */}
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Active Account
                    </div>
                    <div className="space-y-1 my-1">
                      {allUsers.map(u => (
                        <button
                          key={u.id}
                          onClick={() => {
                            switchUser(u.id);
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                            u.id === currentUser.id 
                              ? 'bg-blue-600/20 text-blue-300 font-bold border border-blue-500/30' 
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div className="truncate">
                            <div>{u.name}</div>
                            <div className="text-[10px] text-slate-500 truncate">{u.email}</div>
                          </div>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold shrink-0 ${
                            u.role === 'admin' ? 'bg-indigo-900 text-indigo-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {u.role}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-800 my-1 pt-1 space-y-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          openAuthModal('student', 'register');
                        }}
                        className="w-full flex items-center space-x-2 p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span>Register New Student</span>
                      </button>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          openAuthModal('admin', 'register');
                        }}
                        className="w-full flex items-center space-x-2 p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Register New Admin</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openAuthModal('student', 'login')}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('student', 'register')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => {
              setActiveTab('admin');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
              activeTab === 'admin' ? 'bg-indigo-600 text-white' : 'text-indigo-400 hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Portal</span>
          </button>
        </div>
      )}
    </header>
  );
};
