import React, { useState, useEffect, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Flame, Trophy, Target, Zap, BookOpen, Clock, ChevronRight, ChevronLeft, BrainCircuit, Atom, Calculator, FlaskConical, Globe, Dna, CheckCircle, TrendingUp, Briefcase, GraduationCap, Shield, X, Loader2, Sparkles, Calendar, FileText, Search, UserCheck, LayoutGrid, Database, Users, Video, Download, ArrowRight, PlayCircle, BarChart3, Star, Crown, Lock } from 'lucide-react';
import { getAIStudyPlan } from '../geminiService';
import { IELTSDashboard } from './IELTSDashboard';
import { useLanguage } from '../LanguageContext';

const ICON_MAP: Record<string, React.ReactNode> = {
    'Physics': <Atom size={24} />,
    'Chemistry': <FlaskConical size={24} />,
    'Math': <Calculator size={24} />,
    'Biology': <Dna size={24} />,
    'English': <BookOpen size={24} />,
    'ICT': <Globe size={24} />,
    'General Knowledge': <Globe size={24} />,
    'Bangla': <BookOpen size={24} />,
    'Bangla Language': <BookOpen size={24} />,
    'English Literature': <BookOpen size={24} />,
    'Mental Ability': <BrainCircuit size={24} />,
    'International Affairs': <Globe size={24} />,
    'Bangladesh Affairs': <Briefcase size={24} />,
    'Reading': <BookOpen size={24} />,
    'Writing': <Briefcase size={24} />,
    'Listening': <Briefcase size={24} />,
    'Speaking': <Briefcase size={24} />,
    'Vocabulary': <BookOpen size={24} />,
    'Grammar': <BookOpen size={24} />,
    'IQ Test': <BrainCircuit size={24} />,
    'PPDT': <Briefcase size={24} />,
    'Psychology': <BrainCircuit size={24} />,
    'GTO Tasks': <Shield size={24} />,
    'Interview Prep': <Briefcase size={24} />,
};

const COLOR_MAP: Record<string, string> = {
    'Physics': 'from-blue-500 to-cyan-500',
    'Chemistry': 'from-emerald-500 to-green-500',
    'Math': 'from-red-500 to-pink-500',
    'Biology': 'from-purple-500 to-violet-500',
    'English': 'from-orange-500 to-amber-500',
    'ICT': 'from-cyan-600 to-blue-700',
    'General Knowledge': 'from-teal-500 to-emerald-500',
    'Bangla': 'from-rose-500 to-pink-600',
    'IQ Test': 'from-purple-500 to-indigo-500',
    'PPDT': 'from-blue-500 to-indigo-600',
    'Default': 'from-slate-500 to-slate-600'
};

const RECOMMENDED_JOBS = [
    { id: 101, title: "Junior Frontend Dev", company: "Pathao", location: "Gulshan", type: "Full-time" },
    { id: 102, title: "Product Designer", company: "bKash", location: "Remote", type: "Contract" },
    { id: 103, title: "Content Executive", company: "10 Minute School", location: "Banani", type: "Part-time" },
];

const SubjectDetailView = ({ subject, onBack, plan, category }: { subject: any, onBack: () => void, plan: string, category: string }) => {
    const navigate = useNavigate();
    const isFree = plan === 'free';
    
    // Mock Materials Data
    const materials = [
        { title: "Core Concepts PDF", type: "PDF", size: "2.4 MB", icon: FileText },
        { title: "Lecture: Key Strategies", type: "Video", size: "15 mins", icon: Video },
        { title: "Quick Cheat Sheet", type: "PDF", size: "1.1 MB", icon: FileText },
        { title: "Expert Tips & Tricks", type: "Video", size: "10 mins", icon: PlayCircle },
    ];

    const handleStartQuiz = () => {
        // Navigate with state to auto-start the quiz
        navigate('/quiz', { 
            state: { 
                category: category, 
                subject: subject.name,
                autoStart: true 
            } 
        });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right duration-500">
            {/* Nav Header */}
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={onBack}
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center text-white`}>
                            {subject.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{subject.name}</h2>
                    </div>
                    <p className="text-slate-400 text-sm">Subject Dashboard</p>
                </div>
            </div>

            <div className="space-y-8">
                
                {/* 1. Mock Test CTA (Visible to ALL) */}
                <section>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Zap className="text-yellow-400" size={20} /> Ready to Practice?
                    </h3>
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                                <Trophy size={32} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Take a Mock Test</h4>
                                <p className="text-slate-400 text-sm">Test your knowledge on {subject.name}. {isFree ? '10' : '30'} Questions.</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleStartQuiz} 
                            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-transform hover:scale-105 shadow-lg shadow-yellow-900/20 flex items-center gap-2"
                        >
                            Start Quiz <ArrowRight size={18} />
                        </button>
                    </div>
                </section>

                {/* 2. Analytics (Visible to ALL, AI hidden for Free) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <section className={`bg-slate-800 rounded-2xl p-6 border border-slate-700 ${isFree ? 'lg:col-span-2' : ''}`}>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <BarChart3 className="text-blue-400" size={20} /> Your Performance
                        </h3>
                        <div className="flex items-end justify-between h-32 gap-3 mb-2">
                            {[30, 45, 60, 50, 75, 65, 80].map((h, i) => (
                                <div key={i} className="w-full flex flex-col items-center gap-2">
                                    <div className="relative w-full bg-slate-900 rounded-t-md h-full flex items-end overflow-hidden">
                                        <div style={{ height: `${h}%` }} className={`w-full ${i === 6 ? 'bg-blue-500' : 'bg-slate-700'} rounded-t-md`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-sm text-slate-400 mt-4">
                            Recent Accuracy: <span className="text-green-400 font-bold">78%</span>
                        </p>
                    </section>

                    {!isFree && (
                        <section className="bg-gradient-to-br from-purple-900/20 to-slate-800 rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                                <BrainCircuit className="text-purple-400" size={20} /> AI Analysis
                            </h3>
                            <div className="relative z-10">
                                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                    "You are showing strong improvement in {subject.name}. Your response time is faster than average."
                                </p>
                                <div className="bg-slate-900/50 rounded-xl p-3 border border-purple-500/20">
                                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1 block">Focus Area</span>
                                    <p className="text-slate-400 text-sm">Review advanced concepts in Chapter 3.</p>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                {/* 3. Study Materials (Hidden for Free) */}
                {isFree ? (
                    <section className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-8 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-80" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                                <Lock size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Study Materials Locked</h3>
                            <p className="text-slate-400 mb-6 max-w-md mx-auto">
                                Upgrade to Premium to access lecture notes, video classes, expert mentor chat, and job opportunities.
                            </p>
                            <Link to="/pricing" className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center gap-2">
                                <Crown size={16} /> Unlock Everything
                            </Link>
                        </div>
                    </section>
                ) : (
                    <>
                        <section>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <BookOpen className="text-cyan-400" size={20} /> Study Materials
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {materials.map((item, i) => (
                                    <div key={i} className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between group hover:border-cyan-500/30 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <div className="text-slate-200 font-medium text-sm">{item.title}</div>
                                                <div className="text-slate-500 text-xs">{item.type} • {item.size}</div>
                                            </div>
                                        </div>
                                        <button className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-cyan-400 transition-colors">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Mentors & Jobs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <UserCheck className="text-pink-400" size={20} /> Mentors
                                    </h3>
                                    <Link to="/mentors" className="text-xs text-cyan-400">All</Link>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-4">
                                    <img src="https://picsum.photos/id/64/100" className="w-12 h-12 rounded-full border-2 border-slate-600" alt="Mentor" />
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Dr. Sarah Khan</h4>
                                        <div className="flex items-center text-yellow-400 text-xs gap-1">
                                            <Star size={10} fill="currentColor" /> 4.9 • {subject.name} Expert
                                        </div>
                                    </div>
                                    <button className="ml-auto px-3 py-1.5 bg-slate-700 text-white text-xs font-bold rounded-lg hover:bg-cyan-600 transition-colors">Connect</button>
                                </div>
                            </section>

                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Briefcase className="text-orange-400" size={20} /> Jobs
                                    </h3>
                                    <Link to="/jobs" className="text-xs text-cyan-400">All</Link>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-white text-sm">Junior Role</h4>
                                        <p className="text-slate-500 text-xs">Based on {subject.name}</p>
                                    </div>
                                    <span className="text-orange-400 text-xs font-bold px-2 py-1 bg-orange-500/10 rounded">Apply</span>
                                </div>
                            </section>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState("Based on your recent scores, you're excelling in Algebra but struggling with Organic Chemistry. Let's focus on Reaction Mechanisms today!");
  const [showGoalAnimation, setShowGoalAnimation] = useState(false);
  const [streakAnimate, setStreakAnimate] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(null); // Track selected subject for detailed view
  
  const { t } = useLanguage();

  // Study Plan Modal State
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  
  const isFirstRender = useRef(true);

  // User State - Lazy Initialization
  const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem('takeuup_user');
      if (storedUser) {
          const parsed = JSON.parse(storedUser);
          return {
              name: parsed.name || "Student",
              streak: 12,
              points: 12500,
              dailyGoalCurrent: 3,
              dailyGoalTotal: 5,
              rank: 124,
              studentClass: parsed.studentClass, // Might be null
              role: parsed.role || 'student',
              plan: parsed.plan || 'free',
              selectedSubjects: parsed.selectedSubjects || []
          };
      }
      return {
          name: "Student",
          streak: 0,
          points: 0,
          dailyGoalCurrent: 0,
          dailyGoalTotal: 5,
          rank: 0,
          studentClass: null,
          role: 'student',
          plan: 'free',
          selectedSubjects: []
      };
  });

  // Determine Dashboard Type based on Enrolled Class/Goal
  // If the goal is Job related, show the Job Seeker Dashboard view.
  const isJobDashboard = user.studentClass && ['Job', 'BCS', 'Bank', 'NTRCA', 'Career'].includes(user.studentClass);

  // Applications State (for Job/BCS Dashboard)
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
      // Refresh user data from localStorage
      const storedUser = localStorage.getItem('takeuup_user');
      if (storedUser) {
          const parsed = JSON.parse(storedUser);
          // Check for significant updates
          if (parsed.studentClass !== user.studentClass || parsed.role !== user.role || parsed.plan !== user.plan) {
              setUser(prev => ({ 
                  ...prev, 
                  studentClass: parsed.studentClass,
                  role: parsed.role,
                  plan: parsed.plan,
                  selectedSubjects: parsed.selectedSubjects || prev.selectedSubjects
              }));
          }
      }

      // Load Applications
      const storedApps = localStorage.getItem('takeuup_applications');
      if (storedApps) {
          try {
              setApplications(JSON.parse(storedApps));
          } catch(e) { console.error(e); }
      }
  }, []);

  // Trigger streak animation
  useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }
    setStreakAnimate(true);
    const timer = setTimeout(() => setStreakAnimate(false), 2000);
    return () => clearTimeout(timer);
  }, [user.streak]);

  // Reset selected subject when user changes
  useEffect(() => {
      setSelectedSubject(null);
  }, [user.studentClass]);

  // --- REDIRECTIONS ---
  if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
  }
  
  if (user.role === 'employer') {
      return <Navigate to="/employer-dashboard" replace />;
  }

  // --- EMPTY STATE (NO GOAL SELECTED) ---
  if (!user.studentClass) {
      return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-slate-800/50 p-12 rounded-[2.5rem] border border-slate-700/50 max-w-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
                  
                  <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-700">
                      <LayoutGrid size={40} className="text-cyan-400" />
                  </div>
                  
                  <h1 className="text-3xl font-bold text-white mb-4">Welcome!</h1>
                  <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                      You haven't selected a learning goal yet. Choose a category to customize your dashboard and start learning.
                  </p>
                  
                  <Link 
                      to="/"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
                  >
                      Continue Browsing <ChevronRight size={20} />
                  </Link>
              </div>
          </div>
      );
  }

  const simulateProgress = () => {
    if (user.dailyGoalCurrent < user.dailyGoalTotal) {
        setUser(prev => {
            const nextGoal = prev.dailyGoalCurrent + 1;
            const nextStreak = nextGoal === prev.dailyGoalTotal ? prev.streak + 1 : prev.streak;
            return { 
                ...prev, 
                dailyGoalCurrent: nextGoal,
                streak: nextStreak
            };
        });
        setShowGoalAnimation(true);
        setTimeout(() => setShowGoalAnimation(false), 2000);
    }
  };

  const handleViewPlan = async () => {
      setGeneratingPlan(true);
      setShowPlanModal(true);
      setStudyPlan(null);

      const weakTopics = ['Organic Chemistry (Reactions)', 'Calculus (Integration)', 'English Grammar (Modifiers)'];

      const plan = await getAIStudyPlan(weakTopics);
      
      if (!plan || plan.startsWith("API Key") || plan.startsWith("Could not") || plan.startsWith("AI service")) {
           await new Promise(resolve => setTimeout(resolve, 2000));
           setStudyPlan(`Here is a personalized 3-day recovery plan to boost your weak areas:

**Day 1: Organic Chemistry Deep Dive**
*   **Morning (30m):** Review IUPAC naming for Alcohols and Ketones.
*   **Evening (45m):** Practice SN1 vs SN2 Reaction Mechanisms. Draw 5 examples.
*   *Goal:* Solve 15 practice problems with >80% accuracy.

**Day 2: Mastering Calculus Integration**
*   **Morning (45m):** Focus on Integration by Parts (LIATE rule).
*   **Afternoon (20m):** Quick review of trigonometric identities used in calculus.
*   *Tip:* Write down formulas on flashcards and quiz yourself.

**Day 3: Grammar & Mock Test**
*   **Morning (30m):** Practice Dangling Modifiers and Subject-Verb Agreement.
*   **Evening (60m):** Take a mixed-subject mini mock test to track improvement.
`);
      } else {
          setStudyPlan(plan);
      }
      setGeneratingPlan(false);
  };

  const progressPercentage = Math.round((user.dailyGoalCurrent / user.dailyGoalTotal) * 100);

  const categories = user.selectedSubjects.map((subject: string, index: number) => {
      const quizCount = 5 + (subject.length % 10) * 2;
      return {
          id: `cat-${index}`,
          name: subject,
          icon: ICON_MAP[subject] || <BookOpen size={24} />,
          color: COLOR_MAP[subject] || COLOR_MAP[subject.split(' ')[0]] || 'from-indigo-500 to-purple-500',
          count: `${quizCount} Quizzes`
      };
  });

  const PlanBadge = () => {
      if (user.plan === 'free') {
          return null; // Don't show badge if free, we show banner instead
      }
      return (
          <span className={`text-xs px-2 py-1 rounded border font-bold flex items-center gap-1 ${
              user.plan === 'yearly' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-400' :
              'bg-blue-500/20 text-blue-300 border-blue-500/30'
          }`}>
              <Crown size={12} fill="currentColor" /> {user.plan === 'yearly' ? 'Yearly Pro' : 'Monthly Pro'}
          </span>
      );
  };

  // --- JOB / CAREER PREP DASHBOARD RENDERER ---
  if (isJobDashboard) {
      // If a subject is selected, show detail view
      if (selectedSubject) {
          return (
              <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in">
                  <SubjectDetailView subject={selectedSubject} onBack={() => setSelectedSubject(null)} plan={user.plan} category={user.studentClass} />
              </div>
          );
      }

      return (
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
              
              {user.plan === 'free' && (
                  <div className="bg-slate-800 border-b border-slate-700 p-3 rounded-xl text-center text-sm text-slate-400 mb-6">
                      You are on the <span className="font-bold text-white">Free Plan</span>. <Link to="/pricing" className="text-cyan-400 hover:underline font-bold">Upgrade to Pro</Link> to unlock advanced analytics and more model tests.
                  </div>
              )}

              {/* 1. Header with Stats & Rank */}
              <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold text-white mb-1">
                        Career Dashboard
                      </h1>
                      <div className="flex items-center gap-2">
                        <span className="bg-violet-500/20 text-violet-300 text-xs px-2 py-1 rounded border border-violet-500/30 font-mono">
                            {user.studentClass}
                        </span>
                        <PlanBadge />
                      </div>
                  </div>
                  <p className="text-slate-400">Track your preparation, applications, and find new opportunities.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700">
                     <div className="px-4 py-2 bg-slate-900 rounded-lg flex items-center gap-2">
                        <Trophy className="text-yellow-400" size={20} />
                        <span className="font-bold text-white">Rank #{user.rank}</span>
                     </div>
                     <div className="px-4 py-2 bg-slate-900 rounded-lg flex items-center gap-2">
                        <Flame className="text-orange-500" size={20} />
                        <span className="font-bold text-white">{user.streak} Days</span>
                     </div>
                </div>
              </div>

              {/* 2. Enhanced Job Readiness Card (Redesigned) */}
              {user.plan !== 'free' && (
                  <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-blue-500/30">
                      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" />
                      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                          
                          {/* Score Circle */}
                          <div className="relative flex-shrink-0">
                              <div className="w-32 h-32 rounded-full border-8 border-slate-800 bg-slate-900 flex items-center justify-center relative shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                                      <circle cx="64" cy="64" r="56" className="text-slate-800" strokeWidth="8" fill="none" stroke="currentColor" />
                                      <circle cx="64" cy="64" r="56" className="text-violet-500" strokeWidth="8" fill="none" stroke="currentColor" strokeDasharray="351" strokeDashoffset="105" strokeLinecap="round" />
                                  </svg>
                                  <div className="text-center">
                                      <span className="text-3xl font-black text-white block">70%</span>
                                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Ready</span>
                                  </div>
                              </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 text-center md:text-left">
                              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                  <div className="p-2 bg-violet-500/20 rounded-lg text-violet-400">
                                      <BrainCircuit size={20} />
                                  </div>
                                  <h3 className="text-xl font-bold text-white">AI Career Coach</h3>
                              </div>
                              
                              <div className="space-y-2 mb-4">
                                  <p className="text-slate-300 text-sm leading-relaxed">
                                      Your profile is looking good! Your <span className="text-green-400 font-bold">General Knowledge</span> is top-tier.
                                  </p>
                                  <p className="text-slate-400 text-sm">
                                      <span className="text-orange-400 font-bold">Focus Area:</span> Analytical Ability scores are slightly below average for Bank Exams.
                                  </p>
                              </div>

                              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400">CV Strength: Good</span>
                                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400">Mock Avg: 65%</span>
                              </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto min-w-[160px]">
                              <Link 
                                  to="/quiz" 
                                  state={{ category: user.studentClass }}
                                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10"
                              >
                                  <Zap size={18} className="text-yellow-600" /> Daily Quiz
                              </Link>
                              <Link to="/jobs/create-cv" className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors">
                                  <FileText size={18} className="text-blue-400" /> Improve CV
                              </Link>
                          </div>
                      </div>
                      
                      {/* Decorative Background Elements */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16" />
                  </div>
              )}

              {/* 3. Action Grid (Quiz, Question Bank, CV, Mentor, Analytics) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                      { label: 'Job Quiz', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10', link: '/quiz' },
                      { label: 'Question Bank', icon: Database, color: 'text-cyan-400', bg: 'bg-cyan-500/10', link: '/question-bank' },
                      { label: 'CV Builder', icon: FileText, color: 'text-pink-400', bg: 'bg-pink-500/10', link: '/jobs/create-cv' },
                      { label: 'Find Mentor', icon: Users, color: 'text-green-400', bg: 'bg-green-500/10', link: '/mentors', restricted: true },
                      { label: 'Analytics', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10', link: '/leaderboard' },
                      { label: 'Job Portal', icon: Search, color: 'text-violet-400', bg: 'bg-violet-500/10', link: '/jobs/search' },
                  ].map((item, i) => (
                      <Link 
                          to={user.plan === 'free' && item.restricted ? '/pricing' : item.link} 
                          state={item.label === 'Job Quiz' && user.studentClass ? { category: user.studentClass } : undefined}
                          key={i} 
                          className="bg-slate-800 border border-slate-700 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:bg-slate-750 hover:border-slate-600 transition-all group relative"
                      >
                          {user.plan === 'free' && item.restricted && <div className="absolute top-2 right-2"><Lock size={12} className="text-slate-500" /></div>}
                          <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                              <item.icon size={24} />
                          </div>
                          <span className="font-bold text-white text-sm">{item.label}</span>
                      </Link>
                  ))}
              </div>

              {/* 4. Your Subjects (Job Modules) */}
              <div className="mt-8">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <BookOpen className="text-cyan-500" size={24} /> {t('dash_your_subjects')} ({user.studentClass})
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {categories.length > 0 ? categories.map((cat: any) => (
                          <div 
                              onClick={() => setSelectedSubject(cat)}
                              key={cat.id} 
                              className="bg-slate-800 border border-slate-700 p-5 rounded-2xl hover:bg-slate-750 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                          >
                              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.color} opacity-10 blur-2xl rounded-full -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`} />
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                  {cat.icon}
                              </div>
                              <h3 className="font-bold text-white text-lg leading-tight mb-1">{cat.name}</h3>
                              <p className="text-slate-500 text-sm">{cat.count}</p>
                          </div>
                      )) : (
                          <div className="col-span-full p-8 text-center bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">
                              <p className="text-slate-400">No subjects selected.</p>
                              <Link to="/register" className="text-cyan-400 text-sm font-bold mt-2 inline-block">Edit Selection</Link>
                          </div>
                      )}
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* 5. Prep Materials */}
                  <div className="lg:col-span-1 space-y-4">
                      <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen className="text-cyan-400" /> Prep Materials</h2>
                          <button className="text-xs text-slate-400 hover:text-white">View All</button>
                      </div>
                      <div className="space-y-3">
                          {user.plan === 'free' ? (
                              <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 border-dashed text-center">
                                  <Lock size={24} className="mx-auto mb-2 text-slate-500" />
                                  <p className="text-sm text-slate-400 mb-2">Study materials are locked.</p>
                                  <Link to="/pricing" className="text-cyan-400 text-xs font-bold hover:underline">Upgrade to Unlock</Link>
                              </div>
                          ) : (
                              [
                                  { title: "Bank Job Math Shortcuts", type: "PDF", size: "2.4 MB" },
                                  { title: "Recent General Knowledge 2024", type: "Article", size: "5 min read" },
                                  { title: "BCS English Grammar Rules", type: "Video", size: "15 mins" },
                                  { title: "Analytical Puzzle Solvers", type: "PDF", size: "1.1 MB" },
                              ].map((mat, i) => (
                                  <div key={i} className="flex items-center justify-between p-3 bg-slate-800 rounded-xl border border-slate-700 hover:border-cyan-500/30 cursor-pointer transition-colors">
                                      <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400">
                                              {mat.type === 'PDF' ? <FileText size={16} /> : mat.type === 'Video' ? <Video size={16} /> : <BookOpen size={16} />}
                                          </div>
                                          <div>
                                              <div className="text-sm font-bold text-slate-200">{mat.title}</div>
                                              <div className="text-xs text-slate-500">{mat.type} • {mat.size}</div>
                                          </div>
                                      </div>
                                      <button className="text-slate-500 hover:text-cyan-400"><Download size={16} /></button>
                                  </div>
                              ))
                          )}
                      </div>
                  </div>

                  {/* 6. My Applications */}
                  <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold text-white flex items-center gap-2"><Briefcase className="text-violet-400" /> Active Applications</h2>
                      </div>
                      {applications.length > 0 ? (
                          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                              <table className="w-full text-left text-sm text-slate-400">
                                  <thead className="bg-slate-900 text-slate-300 uppercase font-bold text-xs">
                                      <tr>
                                          <th className="px-6 py-4">Role</th>
                                          <th className="px-6 py-4">Company</th>
                                          <th className="px-6 py-4">Status</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-700">
                                      {applications.map(app => (
                                          <tr key={app.id} className="hover:bg-slate-700/30">
                                              <td className="px-6 py-4 font-bold text-white">{app.jobTitle}</td>
                                              <td className="px-6 py-4">{app.dept}</td>
                                              <td className="px-6 py-4">
                                                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                      app.status === 'Interview Scheduled' || app.status === 'Email Sent' ? 'bg-green-500/10 text-green-400' :
                                                      app.status === 'Pending Test' ? 'bg-yellow-500/10 text-yellow-400' :
                                                      'bg-blue-500/10 text-blue-400'
                                                  }`}>
                                                      {app.status}
                                                  </span>
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      ) : (
                          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
                              <div className="flex flex-col items-center justify-center text-center mb-6">
                                  <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mb-3 text-slate-400">
                                      <Briefcase size={20} />
                                  </div>
                                  <h3 className="text-white font-bold text-lg">No active applications</h3>
                                  <p className="text-slate-400 text-sm">You haven't applied to any jobs yet.</p>
                              </div>

                              <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recommended Opportunities</h4>
                                  {RECOMMENDED_JOBS.map(job => (
                                      <div key={job.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-violet-500/30 transition-colors group">
                                          <div className="flex items-center gap-3">
                                              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-violet-400 font-bold text-xs border border-slate-700">
                                                  {job.company[0]}
                                              </div>
                                              <div>
                                                  <h5 className="font-bold text-white text-sm group-hover:text-violet-400 transition-colors">{job.title}</h5>
                                                  <p className="text-xs text-slate-500">{job.company} • {job.location} • {job.type}</p>
                                              </div>
                                          </div>
                                          <Link to="/jobs/search" className="text-xs font-bold bg-white text-slate-900 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors shadow-lg">
                                              Apply
                                          </Link>
                                      </div>
                                  ))}
                              </div>
                              
                              <Link to="/jobs/search" className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-violet-600/10 hover:bg-violet-600/20 text-violet-400 font-bold rounded-xl transition-colors border border-violet-600/20 text-sm">
                                  View All Jobs <ArrowRight size={14} />
                              </Link>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      );
  }

  // --- ACADEMIC / STUDENT DASHBOARD RENDERER (HSC, Admission, etc.) ---
  
  if (selectedSubject) {
      return (
          <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in">
              <SubjectDetailView subject={selectedSubject} onBack={() => setSelectedSubject(null)} plan={user.plan} category={user.studentClass} />
          </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      
      {user.plan === 'free' && (
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 p-4 rounded-xl text-center text-sm text-slate-300 flex flex-col sm:flex-row items-center justify-center gap-2">
              <span>You are currently on the <span className="font-bold text-white">Free Plan</span>.</span>
              <Link to="/pricing" className="inline-flex items-center gap-1 text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                  Upgrade to Pro <ArrowRight size={14} />
              </Link>
          </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white mb-1">
                {t('dash_welcome')}, <span className="text-cyan-400">{user.name}</span>! 👋
              </h1>
              <div className="flex items-center gap-2">
                <span className="bg-slate-800 text-xs px-2 py-1 rounded border border-slate-700 text-slate-300 font-mono">
                    {user.studentClass}
                </span>
                <PlanBadge />
              </div>
          </div>
          <p className="text-slate-400">Let's keep that learning streak alive.</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700">
             <div className={`px-4 py-2 bg-slate-900 rounded-lg flex items-center gap-2 transition-all duration-500 ${streakAnimate ? 'scale-110 bg-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.4)] ring-1 ring-orange-500' : ''}`}>
                <Flame className={`text-orange-500 ${streakAnimate ? 'animate-bounce' : 'animate-pulse'}`} fill="currentColor" size={20} />
                <span className={`font-bold transition-colors ${streakAnimate ? 'text-orange-200' : 'text-white'}`}>{user.streak} {t('dash_streak')}</span>
             </div>
             <div className="px-4 py-2 bg-slate-900 rounded-lg flex items-center gap-2">
                <Trophy className="text-yellow-400" size={20} />
                <span className="font-bold text-white">{user.points.toLocaleString()} {t('dash_points')}</span>
             </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Goal Card - Full Width if Free */}
        <div className={`bg-slate-800/60 p-6 rounded-3xl border border-slate-700 relative overflow-hidden group ${user.plan === 'free' ? 'md:col-span-3' : 'md:col-span-1'}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-cyan-500/20" />
            
            {/* Animation Overlay */}
            {showGoalAnimation && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-300 rounded-3xl">
                    <CheckCircle className="text-green-400 w-10 h-10 mb-2 animate-bounce" />
                    <span className="text-green-400 font-bold text-lg">Goal Progressed!</span>
                </div>
            )}

            <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className={`p-3 bg-slate-900 rounded-xl text-cyan-400 transition-transform duration-300 ${showGoalAnimation ? 'scale-110' : ''}`}>
                    <Target size={28} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{t('dash_daily_goal')}</h3>
                    <p className="text-slate-400 text-sm">{t('dash_quizzes_completed')}</p>
                </div>
                {/* Demo Trigger */}
                <button 
                    onClick={simulateProgress}
                    disabled={user.dailyGoalCurrent >= user.dailyGoalTotal}
                    className="ml-auto text-xs bg-slate-700/50 hover:bg-cyan-500 hover:text-slate-900 text-slate-400 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Simulate completing a quiz"
                >
                    +1 Demo
                </button>
            </div>
            <div className="relative pt-2">
                <div className="flex justify-between text-sm mb-1 font-medium">
                    <span className={`transition-colors duration-300 ${showGoalAnimation ? 'text-green-400 scale-110 origin-left' : 'text-cyan-400'}`}>
                        {user.dailyGoalCurrent}/{user.dailyGoalTotal}
                    </span>
                    <span className="text-slate-500">{progressPercentage}%</span>
                </div>
                <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-1000 ease-out" 
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </div>

        {/* AI Insight Card (Premium Only) */}
        {user.plan !== 'free' && (
            <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 p-1 rounded-3xl relative group">
                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                 <div className="h-full bg-slate-900/90 backdrop-blur-xl rounded-[22px] p-6 relative border border-slate-700/50 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <BrainCircuit className="text-white" size={32} />
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <h3 className="text-xl font-bold text-white">{t('dash_ai_mentor')}</h3>
                            <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-0.5 rounded border border-purple-500/30">Gemini 2.0</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            "{aiInsight}"
                        </p>
                        <button 
                            onClick={handleViewPlan}
                            className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center justify-center md:justify-start gap-1 transition-colors"
                        >
                            {t('dash_view_plan')} <ChevronRight size={16} />
                        </button>
                    </div>
                 </div>
            </div>
        )}
      </div>

      {/* Main Content Grid - Custom IELTS View or Standard Grid */}
      {user.studentClass === 'IELTS' ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <IELTSDashboard />
          </div>
      ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Categories */}
            <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="text-cyan-500" size={24} /> {t('dash_your_subjects')} ({user.studentClass})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {categories.length > 0 ? categories.map((cat: any) => (
                        <div 
                            key={cat.id} 
                            onClick={() => setSelectedSubject(cat)}
                            className="bg-slate-800 border border-slate-700 p-5 rounded-2xl hover:bg-slate-750 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.color} opacity-10 blur-2xl rounded-full -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`} />
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                                {cat.icon}
                            </div>
                            <h3 className="font-bold text-white text-lg leading-tight mb-1">{cat.name}</h3>
                            <p className="text-slate-500 text-sm">{cat.count}</p>
                        </div>
                    )) : (
                        <div className="col-span-full p-8 text-center bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">
                            <p className="text-slate-400">No subjects selected.</p>
                            <Link to="/register" className="text-cyan-400 text-sm font-bold mt-2 inline-block">Edit Selection</Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Daily Challenge & History */}
            <div className="space-y-6">
                {/* Daily Quiz Card */}
                <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-6 shadow-xl shadow-cyan-900/20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10">
                        <div className="w-14 h-14 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
                            <Zap className="text-white fill-white" size={28} />
                        </div>
                        <h3 className="text-2xl font-extrabold text-white mb-2">{t('dash_daily_challenge')}</h3>
                        <p className="text-blue-100 mb-6 text-sm">Compete with 50,000+ students today. Boost your rank!</p>
                        <Link 
                            to="/quiz" 
                            state={user.studentClass ? { category: user.studentClass, autoStart: true } : undefined}
                            className="block w-full py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                        >
                            {t('dash_start_now')}
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Clock className="text-slate-500" size={20} /> {t('dash_recent_activity')}
                    </h3>
                    <div className="space-y-4">
                        {[
                            { topic: `${user.selectedSubjects[0] || 'Physics'} Quiz`, score: '80%', date: '2h ago', color: 'text-green-400' },
                            { topic: `${user.selectedSubjects[2] || 'Math'} Mock`, score: '65%', date: 'Yesterday', color: 'text-yellow-400' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                <div>
                                    <h4 className="font-semibold text-slate-200 text-sm">{item.topic}</h4>
                                    <span className="text-xs text-slate-500">{item.date}</span>
                                </div>
                                <span className={`font-mono font-bold ${item.color}`}>{item.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
      )}

      {/* AI Study Plan Modal (Common for Students) */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={() => setShowPlanModal(false)} />
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <button 
                    onClick={() => setShowPlanModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-full p-1"
                >
                    <X size={20} />
                </button>
                
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="text-purple-400" fill="currentColor" size={24} /> 
                    Personalized Study Plan
                </h2>
                <p className="text-slate-400 text-sm mb-6">Generated by Gemini 2.0 based on your weak areas.</p>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {generatingPlan ? (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
                            <p className="animate-pulse">Analyzing your quiz performance...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                             {/* Weak Areas Tags */}
                             <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Identified Focus Areas</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Organic Chemistry', 'Calculus Integration', 'English Grammar'].map(t => (
                                        <span key={t} className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded-full border border-red-500/20 flex items-center gap-1">
                                            <Target size={12} /> {t}
                                        </span>
                                    ))}
                                </div>
                             </div>

                             {/* The Plan Content */}
                             <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-cyan-300">
                                 <div className="whitespace-pre-wrap leading-relaxed font-light text-sm md:text-base">
                                    {studyPlan}
                                 </div>
                             </div>
                        </div>
                    )}
                </div>
                
                {!generatingPlan && (
                    <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3 shrink-0">
                        <button onClick={() => setShowPlanModal(false)} className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium">Close</button>
                        <button onClick={() => alert("Added to your Google Calendar!")} className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-purple-900/20 flex items-center gap-2 transition-colors">
                            <Calendar size={16} /> Save to Calendar
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}

    </div>
  );
};