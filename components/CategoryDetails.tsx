import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, BookOpen, Trophy, ArrowRight, Shield, Globe, Monitor, GraduationCap, Briefcase, ScrollText, MessageSquare, Atom, Dna, Calculator, FlaskConical, PenTool, BrainCircuit, UserCheck, FileText, Video, PlayCircle, BarChart3, TrendingUp, ChevronLeft, Download, Star, Lock } from 'lucide-react';

// Maps the URL param ID to the System Goal Name used in Dashboard
const GOAL_MAPPING: Record<string, string> = {
    'job-prep': 'Job',
    'bcs': 'BCS',
    'hsc': 'HSC',
    'admission': 'Admission',
    'ielts': 'IELTS',
    'toefl': 'TOEFL',
    'pte': 'PTE',
    'issb': 'ISSB'
};

// Default Subjects for each goal
const SUBJECTS_BY_GOAL: Record<string, string[]> = {
  HSC: ['Physics', 'Chemistry', 'Math', 'Biology', 'ICT', 'English', 'Bangla'],
  Admission: ['Physics', 'Chemistry', 'Math', 'Biology', 'General Knowledge', 'English', 'Bangla'],
  Job: ['Bangla Language', 'English Literature', 'General Knowledge', 'Math', 'Mental Ability', 'International Affairs'],
  BCS: ['Bangladesh Affairs', 'International Affairs', 'English Language', 'Bangla Literature', 'Math', 'Mental Ability', 'General Science', 'ICT'],
  IELTS: ['Reading', 'Writing', 'Listening', 'Speaking', 'Vocabulary', 'Grammar'],
  TOEFL: ['Reading', 'Listening', 'Speaking', 'Writing'],
  PTE: ['Speaking & Writing', 'Reading', 'Listening'],
  ISSB: ['IQ Test', 'PPDT', 'Psychology', 'GTO Tasks', 'Interview Prep', 'General Knowledge'],
};

// Data Dictionary with Rich Content
const DETAILS_DATA: Record<string, any> = {
    'job-prep': {
        title: "Job Preparation",
        tagline: "Your Gateway to Government & Private Sector Careers",
        description: "Comprehensive preparation for Bank Jobs, NTRCA, and Primary Assistant Teacher exams. Master Math, English, and General Knowledge with our expert-led modules.",
        stats: [
            { label: "Question Bank", value: "10,000+" },
            { label: "Model Tests", value: "50+" },
            { label: "Video Classes", value: "120 Hours" }
        ],
        features: [
            "Previous 10 Years Question Solution",
            "Shortcut Math Techniques",
            "Vocabulary & Grammar Hacks",
            "Live Model Tests with Ranking"
        ],
        modules: [
            { title: "Bank Job Math", desc: "25 Quizzes", icon: Calculator, color: "text-blue-400", bg: "bg-blue-500/10" },
            { title: "General Knowledge", desc: "40 Quizzes", icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { title: "Analytic Ability", desc: "15 Quizzes", icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-500/10" },
            { title: "English Lit", desc: "20 Quizzes", icon: BookOpen, color: "text-rose-400", bg: "bg-rose-500/10" },
            { title: "Bangla Grammar", desc: "18 Quizzes", icon: PenTool, color: "text-amber-400", bg: "bg-amber-500/10" },
            { title: "IT & Computer", desc: "12 Quizzes", icon: Monitor, color: "text-cyan-400", bg: "bg-cyan-500/10" },
        ],
        icon: <Briefcase size={64} className="text-white" />,
        gradient: "from-blue-600 to-indigo-700",
        themeIcons: [Briefcase, Calculator, Globe]
    },
    'bcs': {
        title: "BCS Preliminary",
        tagline: "The Ultimate Guide to Being a Cadre",
        description: "A complete roadmap for the BCS Preliminary exam. Cover all 10 subjects with in-depth notes, quizzes, and routine-based study plans designed by Cadres.",
        stats: [
            { label: "Topic Quizzes", value: "200+" },
            { label: "Lecture Notes", value: "300+" },
            { label: "Success Rate", value: "85%" }
        ],
        features: [
            "Subject-wise Diagnostic Tests",
            "Daily Routine Builder",
            "Performance Analysis Dashboard",
            "Recent Affairs Digest (Monthly)"
        ],
        modules: [
            { title: "Bangladesh Affairs", desc: "30 Quizzes", icon: Globe, color: "text-green-400", bg: "bg-green-500/10" },
            { title: "Intl. Affairs", desc: "25 Quizzes", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/10" },
            { title: "English Language", desc: "35 Quizzes", icon: BookOpen, color: "text-rose-400", bg: "bg-rose-500/10" },
            { title: "Math Reasoning", desc: "20 Quizzes", icon: Calculator, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            { title: "General Science", desc: "22 Quizzes", icon: Atom, color: "text-purple-400", bg: "bg-purple-500/10" },
            { title: "Mental Ability", desc: "18 Quizzes", icon: BrainCircuit, color: "text-cyan-400", bg: "bg-cyan-500/10" },
        ],
        icon: <ScrollText size={64} className="text-white" />,
        gradient: "from-green-600 to-emerald-700",
        themeIcons: [ScrollText, Globe, BookOpen]
    },
    'issb': {
        title: "ISSB Defense",
        tagline: "Serve the Nation with Pride",
        description: "Complete preparation for Army, Navy, and Air Force officer recruitment. IQ tests, Psychology, and Interview tips from ex-military officers.",
        stats: [
            { label: "IQ Sets", value: "50+" },
            { label: "PPDT Images", value: "100+" },
            { label: "Selection", value: "High" }
        ],
        features: [
            "Verbal & Non-Verbal IQ Tests",
            "PPDT Story Writing Practice",
            "Psychological Test Battery",
            "Deputy President Interview Tips"
        ],
        modules: [
            { title: "IQ Test", desc: "19 Quizzes", icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-500/10" },
            { title: "PPDT", desc: "13 Quizzes", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-500/10" },
            { title: "Psychology", desc: "5 Quizzes", icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-500/10" },
            { title: "GTO Tasks", desc: "23 Quizzes", icon: Shield, color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { title: "Interview Prep", desc: "13 Quizzes", icon: Briefcase, color: "text-purple-400", bg: "bg-purple-500/10" },
            { title: "General Knowledge", desc: "19 Quizzes", icon: Globe, color: "text-teal-400", bg: "bg-teal-500/10" },
        ],
        icon: <Shield size={64} className="text-white" />,
        gradient: "from-emerald-600 to-green-700",
        themeIcons: [Shield, BrainCircuit, Trophy]
    }
};

// Fallback for categories not fully detailed above, prevents crashes
const DEFAULT_DATA = {
    title: "Course Details",
    tagline: "Start your journey",
    description: "Detailed preparation materials.",
    stats: [],
    features: [],
    modules: [],
    icon: <BookOpen size={64} className="text-white" />,
    gradient: "from-slate-600 to-slate-800",
    themeIcons: []
};

const BackgroundIcons = ({ icons }: { icons: any[] }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {icons.map((Icon, i) => (
                <Icon 
                    key={i} 
                    size={200 + i * 50} 
                    className={`absolute text-white opacity-5 
                        ${i === 0 ? '-top-10 -right-10 rotate-12' : 
                          i === 1 ? 'top-1/2 -left-20 -rotate-12' : 
                          '-bottom-20 right-20 rotate-45'}`} 
                />
            ))}
        </div>
    );
};

// --- SUB-COMPONENT: MODULE DASHBOARD ---
const ModuleDashboard = ({ module, onBack, onEnroll }: { module: any, onBack: () => void, onEnroll: () => void }) => {
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
                        <span className={`p-1.5 rounded-lg ${module.bg} ${module.color}`}>
                            <module.icon size={18} />
                        </span>
                        <h2 className="text-2xl font-bold text-white">{module.title}</h2>
                    </div>
                    <p className="text-slate-400 text-sm">Module Dashboard</p>
                </div>
            </div>

            {/* Content Stack */}
            <div className="space-y-12">
                
                {/* 1. Study Materials */}
                <section>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="text-cyan-400" size={20} /> Study Materials
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: "Core Concepts PDF", type: "PDF", size: "2.4 MB", icon: FileText },
                            { title: "Video Lecture: Part 1", type: "Video", size: "15 mins", icon: Video },
                            { title: "Quick Cheat Sheet", type: "PDF", size: "1.1 MB", icon: FileText },
                            { title: "Expert Tips Video", type: "Video", size: "10 mins", icon: PlayCircle },
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-800 border border-slate-700 p-4 rounded-xl flex items-center justify-between group hover:border-cyan-500/30 transition-colors">
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

                {/* 2. Mock Test */}
                <section>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-yellow-400" size={20} /> Mock Test
                    </h3>
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                                <Shield size={32} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Assessment: {module.title}</h4>
                                <p className="text-slate-400 text-sm">20 Questions • 15 Minutes • Negative Marking</p>
                            </div>
                        </div>
                        <button 
                            onClick={onEnroll} 
                            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-transform hover:scale-105 shadow-lg shadow-yellow-900/20"
                        >
                            Start Test
                        </button>
                    </div>
                </section>

                {/* 3. Analytics & 4. AI Feedback */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Analytics */}
                    <section className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <BarChart3 className="text-blue-400" size={20} /> Performance Analytics
                        </h3>
                        <div className="flex items-end justify-between h-32 gap-3 mb-2">
                            {[30, 45, 60, 50, 75, 65, 80].map((h, i) => (
                                <div key={i} className="w-full flex flex-col items-center gap-2 group">
                                    <div className="relative w-full bg-slate-900 rounded-t-md h-full flex items-end overflow-hidden">
                                        <div 
                                            style={{ height: `${h}%` }} 
                                            className={`w-full ${i === 6 ? 'bg-blue-500' : 'bg-slate-700 group-hover:bg-slate-600'} rounded-t-md transition-all duration-500`} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 font-mono">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                        <p className="text-center text-sm text-slate-400 mt-4">
                            Your accuracy is <span className="text-green-400 font-bold">top 15%</span> compared to peers.
                        </p>
                    </section>

                    {/* AI Feedback */}
                    <section className="bg-gradient-to-br from-purple-900/20 to-slate-800 rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                            <BrainCircuit className="text-purple-400" size={20} /> AI Feedback
                        </h3>
                        <div className="relative z-10">
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                "Based on your recent attempts in <strong>{module.title}</strong>, you show strong pattern recognition. However, you tend to rush through 'Scenario Based' questions."
                            </p>
                            <div className="bg-slate-900/50 rounded-xl p-3 border border-purple-500/20">
                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1 block">Recommendation</span>
                                <p className="text-slate-400 text-sm">Review Chapter 4: Critical Reasoning techniques before your next mock.</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 5. Mentors */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <UserCheck className="text-pink-400" size={20} /> Relevant Mentors
                        </h3>
                        <Link to="/mentors" className="text-xs text-cyan-400 hover:text-white">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700">
                                <img src={`https://picsum.photos/id/${100+i}/100`} alt="Mentor" className="w-12 h-12 rounded-full border-2 border-slate-600" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">{i === 1 ? "Lt. Col. Rahim (Retd)" : "Dr. Sarah Khan"}</h4>
                                    <div className="flex items-center text-yellow-400 text-xs gap-1">
                                        <Star size={10} fill="currentColor" /> 4.9 • {module.title} Expert
                                    </div>
                                </div>
                                <button className="ml-auto px-3 py-1.5 bg-slate-700 hover:bg-cyan-600 text-white text-xs font-bold rounded-lg transition-colors">
                                    Connect
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. Jobs */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Briefcase className="text-orange-400" size={20} /> Related Opportunities
                        </h3>
                        <Link to="/jobs" className="text-xs text-cyan-400 hover:text-white">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-orange-500/30 transition-colors">
                            <div>
                                <h4 className="font-bold text-white text-sm">Junior Officer (General)</h4>
                                <p className="text-slate-500 text-xs">Sonali Bank Limited • Dhaka</p>
                            </div>
                            <span className="text-orange-400 text-xs font-bold px-2 py-1 bg-orange-500/10 rounded">Apply Now</span>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export const CategoryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const data = DETAILS_DATA[id || 'job-prep'] || DEFAULT_DATA;

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedModule(null); // Reset module view when category changes
    }, [id]);

    if (!data.modules) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

    const handleEnroll = () => {
        const safeId = id || 'hsc';
        const targetGoal = GOAL_MAPPING[safeId] || 'HSC';
        
        // Redirect to Pricing page with the selected Goal ID so user MUST choose a package
        navigate('/pricing', { state: { selectedGoalId: targetGoal } });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans pt-20 pb-12 overflow-x-hidden">
            
            {/* If a module is selected, show the detailed Module Dashboard instead of the main page */}
            {selectedModule ? (
                <div className="max-w-5xl mx-auto px-4">
                    <ModuleDashboard 
                        module={selectedModule} 
                        onBack={() => setSelectedModule(null)} 
                        onEnroll={handleEnroll}
                    />
                </div>
            ) : (
                <>
                    {/* Header Hero */}
                    <div className="relative overflow-hidden mb-16 rounded-b-[3rem] shadow-2xl">
                        <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-20 blur-3xl pointer-events-none`} />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                        
                        <div className="max-w-7xl mx-auto px-4 relative z-10 py-20 flex flex-col md:flex-row items-center gap-12">
                            {/* Content */}
                            <div className="flex-1 text-center md:text-left animate-in slide-in-from-left-10 duration-700">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-bold mb-6 backdrop-blur-md">
                                    <Trophy size={14} className="text-yellow-400" />
                                    Premium Course
                                </div>
                                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg">
                                    {data.title}
                                </h1>
                                <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl font-light">
                                    {data.tagline}. {data.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                    <button 
                                        id="enroll-btn"
                                        onClick={handleEnroll}
                                        className={`px-8 py-4 rounded-xl font-bold text-lg shadow-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 bg-gradient-to-r ${data.gradient} relative z-30 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer`}
                                    >
                                        Enroll Now <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Visual Icon */}
                            <div className="flex-1 flex justify-center animate-in zoom-in duration-700 delay-200">
                                <div className={`w-64 h-64 md:w-80 md:h-80 rounded-[3rem] bg-gradient-to-br ${data.gradient} flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.5)] relative animate-float group`}>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 rounded-[3rem]" />
                                    <div className="relative z-10 transform scale-150 group-hover:scale-[1.6] transition-transform duration-500 drop-shadow-2xl">
                                        {data.icon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 relative">
                        {/* Background Decor */}
                        <BackgroundIcons icons={data.themeIcons || []} />

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 relative z-10">
                            {data.stats.map((stat: any, i: number) => (
                                <div key={i} className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl text-center hover:border-slate-700 transition-all hover:-translate-y-1 shadow-lg">
                                    <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                                    <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Modules Grid - Replaces old list */}
                        <div className="mb-20 relative z-10">
                            <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Select a Module to Start</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.modules.map((mod: any, i: number) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setSelectedModule(mod)}
                                        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-slate-600 hover:-translate-y-1 transition-all group relative overflow-hidden"
                                    >
                                        <div className={`absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity`}>
                                            <mod.icon size={80} className={mod.color} />
                                        </div>
                                        
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${mod.bg} ${mod.color} group-hover:scale-110 transition-transform`}>
                                            <mod.icon size={28} />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-white mb-1">{mod.title}</h3>
                                        <p className="text-slate-400 text-sm mb-4">{mod.desc}</p>
                                        
                                        <div className="flex items-center text-sm font-bold text-slate-500 group-hover:text-white transition-colors gap-2 mt-auto">
                                            View Details <ArrowRight size={16} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="bg-slate-900 rounded-[3rem] p-12 text-center border border-slate-800 relative overflow-hidden shadow-2xl mb-12">
                            <div className={`absolute inset-0 bg-gradient-to-r ${data.gradient} opacity-10 pointer-events-none`} />
                            <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Ready to start your journey?</h2>
                            <p className="text-slate-400 max-w-xl mx-auto mb-8 relative z-10 text-lg">
                                Join thousands of students who have achieved their goals with TakeUUp.
                            </p>
                            <button 
                                onClick={handleEnroll}
                                className={`inline-flex px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 bg-white text-slate-900 relative z-30 cursor-pointer`}
                            >
                                Get Full Access
                            </button>
                        </div>
                    </div>
                </>
            )}
            
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};