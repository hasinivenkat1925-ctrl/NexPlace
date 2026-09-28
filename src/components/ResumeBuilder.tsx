import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { ResumeData } from '../types';
import { 
  FileText, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  RotateCcw, 
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award
} from 'lucide-react';
import { INITIAL_RESUME_DATA } from '../data/mockData';

export const ResumeBuilder: React.FC = () => {
  const { resumeData, updateResumeData } = usePortal();

  const [formData, setFormData] = useState<ResumeData>(resumeData);
  const [activeEditorTab, setActiveEditorTab] = useState<'basics' | 'education' | 'skills' | 'projects' | 'experience'>('basics');
  const [saveToast, setSaveToast] = useState(false);

  // ATS Optimization Score Calculation
  const calculateATS = () => {
    let score = 50; // base score
    const suggestions: string[] = [];

    // Check contact info
    if (formData.github && formData.linkedin) score += 10;
    else suggestions.push('Add both your GitHub and LinkedIn profiles for technical recruiters.');

    // Check skills
    if (formData.skills.length >= 3) score += 10;
    else suggestions.push('Categorize skills into Languages, Frameworks, and Core CS.');

    // Check projects count & metrics
    const totalBullets = [
      ...formData.projects.flatMap(p => p.bullets),
      ...formData.experience.flatMap(e => e.bullets)
    ];

    const hasNumbers = totalBullets.some(b => /\d+%|\d+ms|\d+\+|\d+ users/i.test(b));
    if (hasNumbers) score += 15;
    else suggestions.push('Include quantifiable metrics in bullets (e.g. "reduced latency by 30%", "500+ users").');

    // Check action verbs
    const actionVerbs = ['Architected', 'Engineered', 'Developed', 'Optimized', 'Deployed', 'Implemented', 'Designed'];
    const hasActionVerbs = totalBullets.some(b => actionVerbs.some(v => b.toLowerCase().includes(v.toLowerCase())));
    if (hasActionVerbs) score += 15;
    else suggestions.push('Start project and internship bullet points with strong action verbs (e.g., Architected, Optimized).');

    return {
      score: Math.min(100, score),
      suggestions
    };
  };

  const { score: atsScore, suggestions: atsSuggestions } = calculateATS();

  const handleSave = () => {
    updateResumeData(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleResetToSample = () => {
    setFormData(INITIAL_RESUME_DATA);
    updateResumeData(INITIAL_RESUME_DATA);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>ATS-Friendly Tech Resume</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Campus Placement Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Craft a single-page technical resume optimized for Applicant Tracking Systems (ATS) and tech recruiters. Live preview, instant score audit, and 1-click PDF print.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleResetToSample}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load Sample</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            {saveToast ? 'Saved!' : 'Save Resume'}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* ATS Score Card */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center font-black text-xl text-violet-400">
            <span>{atsScore}</span>
            <span className="text-[9px] uppercase font-bold text-slate-300">/ 100</span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-white">ATS Compliance Health</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                atsScore >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30' : 'bg-amber-500/20 text-amber-400 border border-amber-400/30'
              }`}>
                {atsScore >= 80 ? 'ATS Optimized' : 'Improvements Suggested'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
              Standard single-column format, zero non-standard glyphs, quantifiable action verbs, and highlighted core CS fundamentals.
            </p>
          </div>
        </div>

        {atsSuggestions.length > 0 && (
          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-xs space-y-1 max-w-sm">
            <span className="text-[10px] uppercase font-bold text-amber-400 block">Top Suggestion:</span>
            <p className="text-slate-200">{atsSuggestions[0]}</p>
          </div>
        )}
      </div>

      {/* Main Split Layout: Editor on Left, Live Sheet on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Editor (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            {/* Editor Sub Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-2 border-b border-slate-100 text-xs font-bold no-scrollbar">
              {[
                { id: 'basics', label: 'Contact' },
                { id: 'education', label: 'Education' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveEditorTab(t.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                    activeEditorTab === t.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab: Basics / Contact */}
            {activeEditorTab === 'basics' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-violet-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-violet-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={formData.github}
                      onChange={e => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">Professional Summary</label>
                  <textarea
                    rows={3}
                    value={formData.summary}
                    onChange={e => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-violet-500"
                  />
                </div>
              </div>
            )}

            {/* Tab: Education */}
            {activeEditorTab === 'education' && (
              <div className="space-y-4 text-xs">
                {formData.education.map((edu, idx) => (
                  <div key={edu.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Degree {idx + 1}</span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={e => {
                          const updated = [...formData.education];
                          updated[idx].institution = e.target.value;
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={e => {
                            const updated = [...formData.education];
                            updated[idx].degree = e.target.value;
                            setFormData({ ...formData, education: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">CGPA / %</label>
                        <input
                          type="text"
                          value={edu.cgpa}
                          onChange={e => {
                            const updated = [...formData.education];
                            updated[idx].cgpa = e.target.value;
                            setFormData({ ...formData, education: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Skills */}
            {activeEditorTab === 'skills' && (
              <div className="space-y-3 text-xs">
                {formData.skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-1">
                    <label className="block font-bold text-slate-700 text-[10px] uppercase">
                      {skillGroup.category}
                    </label>
                    <input
                      type="text"
                      value={skillGroup.items}
                      onChange={e => {
                        const updated = [...formData.skills];
                        updated[idx].items = e.target.value;
                        setFormData({ ...formData, skills: updated });
                      }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Projects */}
            {activeEditorTab === 'projects' && (
              <div className="space-y-4 text-xs">
                {formData.projects.map((proj, pIdx) => (
                  <div key={proj.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="font-bold text-slate-800">Project {pIdx + 1}: {proj.title}</div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={e => {
                          const updated = [...formData.projects];
                          updated[pIdx].title = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.technologies}
                        onChange={e => {
                          const updated = [...formData.projects];
                          updated[pIdx].technologies = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Key Impact Bullet Point</label>
                      <textarea
                        rows={2}
                        value={proj.bullets[0] || ''}
                        onChange={e => {
                          const updated = [...formData.projects];
                          updated[pIdx].bullets[0] = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Experience */}
            {activeEditorTab === 'experience' && (
              <div className="space-y-4 text-xs">
                {formData.experience.map((exp, eIdx) => (
                  <div key={exp.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="font-bold text-slate-800">{exp.role} @ {exp.company}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={e => {
                            const updated = [...formData.experience];
                            updated[eIdx].company = e.target.value;
                            setFormData({ ...formData, experience: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase">Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={e => {
                            const updated = [...formData.experience];
                            updated[eIdx].role = e.target.value;
                            setFormData({ ...formData, experience: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Impact Metric</label>
                      <textarea
                        rows={2}
                        value={exp.bullets[0] || ''}
                        onChange={e => {
                          const updated = [...formData.experience];
                          updated[eIdx].bullets[0] = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live ATS Sheet Preview (7 columns) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-300 p-8 sm:p-10 font-sans text-slate-900 text-xs leading-relaxed max-w-2xl mx-auto print:shadow-none print:border-none print:m-0 print:p-0">
            {/* Resume Header */}
            <div className="text-center border-b pb-3 mb-3 border-slate-300">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-slate-900 mb-1">
                {formData.fullName}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-700">
                {formData.email && <span className="flex items-center"><Mail className="w-3 h-3 mr-1" />{formData.email}</span>}
                {formData.phone && <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{formData.phone}</span>}
                {formData.location && <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{formData.location}</span>}
                {formData.linkedin && <span className="flex items-center"><Linkedin className="w-3 h-3 mr-1" />{formData.linkedin}</span>}
                {formData.github && <span className="flex items-center"><Github className="w-3 h-3 mr-1" />{formData.github}</span>}
              </div>
            </div>

            {/* Professional Summary */}
            {formData.summary && (
              <div className="mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1 text-slate-900">
                  Summary
                </h2>
                <p className="text-[11px] text-slate-800 leading-normal">
                  {formData.summary}
                </p>
              </div>
            )}

            {/* Education */}
            <div className="mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1 text-slate-900">
                Education
              </h2>
              {formData.education.map(edu => (
                <div key={edu.id} className="mb-1 text-[11px]">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{edu.institution}</span>
                    <span>{edu.startYear} - {edu.endYear}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 italic">
                    <span>{edu.degree} in {edu.field}</span>
                    <span className="font-semibold not-italic">CGPA / Score: {edu.cgpa}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div className="mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1 text-slate-900">
                Technical Skills
              </h2>
              <div className="space-y-0.5 text-[11px]">
                {formData.skills.map((s, idx) => (
                  <div key={idx}>
                    <span className="font-bold text-slate-900">{s.category}: </span>
                    <span className="text-slate-800">{s.items}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience / Internships */}
            {formData.experience.length > 0 && (
              <div className="mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1 text-slate-900">
                  Internships & Experience
                </h2>
                {formData.experience.map(exp => (
                  <div key={exp.id} className="mb-2 text-[11px]">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{exp.role} — <span className="font-semibold text-slate-800">{exp.company}</span></span>
                      <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-800 mt-0.5">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-snug">{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            <div className="mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1 text-slate-900">
                Technical Projects
              </h2>
              {formData.projects.map(proj => (
                <div key={proj.id} className="mb-2 text-[11px]">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.title}</span>
                    <span className="font-normal italic text-slate-600">[{proj.technologies}]</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-800 mt-0.5">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-snug">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Certifications */}
            {formData.certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1 text-slate-900">
                  Certifications
                </h2>
                <div className="space-y-0.5 text-[11px]">
                  {formData.certifications.map(c => (
                    <div key={c.id} className="flex justify-between">
                      <span className="font-semibold text-slate-900">{c.name} — <span className="font-normal text-slate-700">{c.issuer}</span></span>
                      <span className="text-slate-500">{c.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
