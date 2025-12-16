import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building, MapPin, DollarSign, Clock, CheckCircle2, Plus, Trash2, HelpCircle, AlignLeft, List, Lock, Crown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const JobPost = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState('student');
  const [userPlan, setUserPlan] = useState('free');
  
  // Job Details State
  const [jobData, setJobData] = useState({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      destination: 'Portal'
  });

  // Test Builder State
  const [includeTest, setIncludeTest] = useState(false);
  const [passingScore, setPassingScore] = useState(70);
  const [questions, setQuestions] = useState([
      { id: 1, type: 'mcq', text: '', options: ['', '', '', ''], correct: 0 }
  ]);

  // Load User Data & Draft
  useEffect(() => {
      const storedUser = localStorage.getItem('takeuup_user');
      if (storedUser) {
          try {
              const user = JSON.parse(storedUser);
              setUserRole(user.role || 'student');
              setUserPlan(user.plan || 'free');
          } catch(e) {}
      }

      // Load draft
      const savedDraft = sessionStorage.getItem('job_post_draft');
      if (savedDraft) {
          setJobData(JSON.parse(savedDraft));
      }
  }, []);

  // Save Draft on Change
  useEffect(() => {
      sessionStorage.setItem('job_post_draft', JSON.stringify(jobData));
  }, [jobData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (id: number, field: string, value: any, optionIdx?: number) => {
      setQuestions(prev => prev.map(q => {
          if (q.id !== id) return q;
          if (field === 'text') return { ...q, text: value };
          if (field === 'type') return { ...q, type: value };
          if (field === 'correct') return { ...q, correct: parseInt(value) };
          if (field === 'option' && typeof optionIdx === 'number') {
              const newOptions = [...q.options];
              newOptions[optionIdx] = value;
              return { ...q, options: newOptions };
          }
          return q;
      }));
  };

  const addQuestion = () => {
      setQuestions([...questions, { id: Date.now(), type: 'mcq', text: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const removeQuestion = (id: number) => {
      if (questions.length > 1) {
          setQuestions(questions.filter(q => q.id !== id));
      }
  };

  const validateStep1 = () => {
      if (!jobData.title || !jobData.company || !jobData.location || !jobData.salary || !jobData.description) {
          alert("Please fill in all required fields in Step 1.");
          return false;
      }
      return true;
  };

  const handleNext = () => {
      if (validateStep1()) {
          setStep(2);
      }
  };

  const handleToggleTest = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isPremium = ['monthly', 'yearly', 'premium', 'all-in-one'].includes(userPlan.toLowerCase());
      
      // If attempting to enable (e.target.checked is true) AND user is NOT premium
      if (e.target.checked && !isPremium) {
          // Redirect to pricing with return path
          navigate('/pricing', { state: { returnTo: '/jobs/create' } });
          return;
      }
      
      // Otherwise allow toggle
      setIncludeTest(e.target.checked);
  };

  const handlePost = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateStep1()) {
          setStep(1);
          return;
      }

      const newJob = {
          id: Date.now(),
          ...jobData,
          applicants: 0,
          isFeatured: false,
          hasTest: includeTest,
          testConfig: includeTest ? { passingScore, questions } : null
      };

      // Save to local storage (Mock DB)
      const existingJobs = JSON.parse(localStorage.getItem('takeuup_jobs') || '[]');
      localStorage.setItem('takeuup_jobs', JSON.stringify([newJob, ...existingJobs]));

      // Clear draft
      sessionStorage.removeItem('job_post_draft');

      alert(includeTest ? 'Job with Screening Test Posted Successfully!' : 'Job Posted Successfully!');
      
      // Redirect logic based on role
      if (userRole === 'employer') {
          navigate('/employer-dashboard');
      } else {
          navigate('/jobs/search');
      }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans py-12 px-4">
        <div className="max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)} className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={20} className="mr-2" /> Back
            </button>

            <div className="bg-[#151921] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#1E2330]">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
                </div>

                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Create a Job Post</h1>
                        <p className="text-slate-400">Reach thousands of students and fresh graduates.</p>
                    </div>
                    <div className="text-sm font-bold text-slate-500">Step {step} of 2</div>
                </div>

                <form onSubmit={handlePost} className="space-y-6">
                    
                    {/* STEP 1: JOB DETAILS */}
                    <div className={step === 1 ? 'block space-y-6 animate-in fade-in slide-in-from-right-8' : 'hidden'}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
                                <input name="title" value={jobData.title} onChange={handleInputChange} type="text" placeholder="e.g. Junior UI/UX Designer" className="w-full bg-[#1E2330] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                                <div className="relative">
                                    <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input name="company" value={jobData.company} onChange={handleInputChange} type="text" placeholder="Your Company" className="w-full bg-[#1E2330] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                                <div className="relative">
                                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input name="location" value={jobData.location} onChange={handleInputChange} type="text" placeholder="e.g. Dhaka, Remote" className="w-full bg-[#1E2330] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Job Type</label>
                                <select name="type" value={jobData.type} onChange={handleInputChange} className="w-full bg-[#1E2330] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none">
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Internship</option>
                                    <option>Contract</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Salary Range</label>
                                <div className="relative">
                                    <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input name="salary" value={jobData.salary} onChange={handleInputChange} type="text" placeholder="e.g. 20k - 30k BDT" className="w-full bg-[#1E2330] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Job Description</label>
                            <textarea name="description" value={jobData.description} onChange={handleInputChange} rows={6} placeholder="Describe the role, responsibilities, and requirements..." className="w-full bg-[#1E2330] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors custom-scrollbar" />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button type="button" onClick={handleNext} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-xl transition-all">
                                Next: Screening Test
                            </button>
                        </div>
                    </div>

                    {/* STEP 2: SCREENING TEST */}
                    <div className={step === 2 ? 'block space-y-6 animate-in fade-in slide-in-from-right-8' : 'hidden'}>
                        
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <HelpCircle className="text-cyan-400" /> Screening Test
                                        {!['monthly', 'yearly', 'premium', 'all-in-one'].includes(userPlan.toLowerCase()) && (
                                            <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/30 flex items-center gap-1">
                                                <Lock size={10} /> Premium
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-1">Candidates must pass this test to qualify for an interview.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer group">
                                    <input type="checkbox" checked={includeTest} onChange={handleToggleTest} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                                    <span className="ml-3 text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">{includeTest ? 'Enabled' : 'Disabled'}</span>
                                </label>
                            </div>

                            {includeTest && (
                                <div className="space-y-6 mt-6 pt-6 border-t border-slate-700 animate-in fade-in slide-in-from-top-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">Passing Score (%)</label>
                                        <input 
                                            type="number" 
                                            value={passingScore}
                                            onChange={(e) => setPassingScore(Number(e.target.value))}
                                            className="w-32 bg-[#1E2330] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500" 
                                            min="10" max="100"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        {questions.map((q, idx) => (
                                            <div key={q.id} className="bg-[#1E2330] p-4 rounded-xl border border-white/5 relative group">
                                                <button 
                                                    type="button"
                                                    onClick={() => removeQuestion(q.id)}
                                                    className="absolute top-2 right-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                                                    <div className="md:col-span-3">
                                                        <label className="text-xs font-bold text-slate-500 uppercase">Question {idx + 1}</label>
                                                        <input 
                                                            type="text" 
                                                            value={q.text}
                                                            onChange={(e) => handleQuestionChange(q.id, 'text', e.target.value)}
                                                            placeholder="Enter question text..."
                                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 mt-1 text-white text-sm focus:border-cyan-500 outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                                                        <div className="flex bg-slate-900 rounded-lg p-1 mt-1 border border-slate-700">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleQuestionChange(q.id, 'type', 'mcq')}
                                                                className={`flex-1 flex items-center justify-center p-1.5 rounded text-xs transition-colors ${q.type === 'mcq' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                                                                title="Multiple Choice"
                                                            >
                                                                <List size={14} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleQuestionChange(q.id, 'type', 'descriptive')}
                                                                className={`flex-1 flex items-center justify-center p-1.5 rounded text-xs transition-colors ${q.type === 'descriptive' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                                                                title="Descriptive"
                                                            >
                                                                <AlignLeft size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {q.type === 'mcq' ? (
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {q.options.map((opt, optIdx) => (
                                                            <div key={optIdx} className="flex items-center gap-2">
                                                                <input 
                                                                    type="radio" 
                                                                    name={`correct-${q.id}`} 
                                                                    checked={q.correct === optIdx}
                                                                    onChange={() => handleQuestionChange(q.id, 'correct', optIdx)}
                                                                    className="accent-cyan-500"
                                                                />
                                                                <input 
                                                                    type="text" 
                                                                    value={opt}
                                                                    onChange={(e) => handleQuestionChange(q.id, 'option', e.target.value, optIdx)}
                                                                    placeholder={`Option ${optIdx + 1}`}
                                                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:border-cyan-500 outline-none"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700 border-dashed text-center text-xs text-slate-500">
                                                        Candidate will see a text area to answer this question.
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <button 
                                        type="button" 
                                        onClick={addQuestion}
                                        className="w-full py-3 border border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-cyan-500 hover:text-cyan-400 hover:bg-slate-800/50 flex items-center justify-center gap-2 text-sm font-medium transition-all"
                                    >
                                        <Plus size={16} /> Add Another Question
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between pt-4">
                            <button type="button" onClick={() => setStep(1)} className="text-slate-400 hover:text-white px-6 py-3 font-medium">
                                Back
                            </button>
                            <button type="submit" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-cyan-900/20 transform hover:-translate-y-1 transition-all flex items-center gap-2">
                                <CheckCircle2 size={20} /> Publish Job
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};