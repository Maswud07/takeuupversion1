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
            { title: "Bank Job Math", desc: "25 Quizzes", icon: Calculator, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
            { title: "General Knowledge", desc: "40 Quizzes", icon: Globe, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
            { title: "Analytic Ability", desc: "15 Quizzes", icon: BrainCircuit, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
            { title: "English Lit", desc: "20 Quizzes", icon: BookOpen, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
            { title: "Bangla Grammar", desc: "18 Quizzes", icon: PenTool, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
            { title: "IT & Computer", desc: "12 Quizzes", icon: Monitor, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10" },
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
            { title: "Bangladesh Affairs", desc: "30 Quizzes", icon: Globe, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10" },
            { title: "Intl. Affairs", desc: "25 Quizzes", icon: Globe, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
            { title: "English Language", desc: "35 Quizzes", icon: BookOpen, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10" },
            { title: "Math Reasoning", desc: "20 Quizzes", icon: Calculator, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-500/10" },
            { title: "General Science", desc: "22 Quizzes", icon: Atom, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
            { title: "Mental Ability", desc: "18 Quizzes", icon: BrainCircuit, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10" },
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
            { title: "IQ Test", desc: "19 Quizzes", icon: BrainCircuit, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
            { title: "PPDT", desc: "13 Quizzes", icon: Briefcase, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
            { title: "Psychology", desc: "5 Quizzes", icon: BrainCircuit, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
            { title: "GTO Tasks", desc: "23 Quizzes", icon: Shield, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
            { title: "Interview Prep", desc: "13 Quizzes", icon: Briefcase, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
            { title: "General Knowledge", desc: "19 Quizzes", icon: Globe, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-500/10" },
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

// --- SUB-COMPONENT: MODULE DASHBOARD ---
const ModuleDashboard = ({ module, onBack, onEnroll }: { module: any, onBack: () => void, onEnroll: () => void }) => {
    return (
        <div className="animate-in fade-in slide-in-from-right duration-500 max-w-5xl mx-auto px-4 pt-8 text-slate-900 dark:text-white">
            {/* Nav Header */}
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={onBack}
                    className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg ${module.bg} ${module.color}`}>
                            <module.icon size={18} />
                        </span>
                        <h2 className="text-2xl font-bold">{module.title}</h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Module Dashboard</p>
                </div>
            </div>

            {/* Content Stack */}
            <div className="space-y-12">
                
                {/* 1. Study Materials */}
                <section>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BookOpen className="text-cyan-500" size={20} /> Study Materials
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: "Core Concepts PDF", type: "PDF", size: "2.4 MB", icon: FileText },
                            { title: "Video Lecture: Part 1", type: "Video", size: "15 mins", icon: Video },
                            { title: "Quick Cheat Sheet", type: "PDF", size: "1.1 MB", icon: FileText },
                            { title: "Expert Tips Video", type: "Video", size: "10 mins", icon: PlayCircle },
                        ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex items-center justify-between group hover:border-cyan-500/30 transition-colors shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">{item.title}</div>
                                        <div className="text-slate-500 text-xs">{item.type} • {item.size}</div>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-cyan-500 transition-colors">
                                    <Download size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Mock Test */}
                <section>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-yellow-500" size={20} /> Mock Test
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center border border-yellow-200 dark:border-yellow-500/30 shadow-sm">
                                <Shield size={32} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Assessment: {module.title}</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">20 Questions • 15 Minutes • Negative Marking</p>
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
        navigate('/pricing', { state: { selectedGoalId: targetGoal } });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 font-sans pt-20 pb-12 overflow-x-hidden">
            
            {selectedModule ? (
                <ModuleDashboard 
                    module={selectedModule} 
                    onBack={() => setSelectedModule(null)} 
                    onEnroll={handleEnroll}
                />
            ) : (
                <>
                    {/* PREMIUM HERO SECTION (Adaptive: Light/Dark) */}
                    <div className="relative bg-white dark:bg-[#0B1120] overflow-hidden -mt-20 pt-32 pb-24 lg:pb-32 rounded-b-[3rem] mb-16 shadow-2xl transition-colors duration-500">
                        
                        {/* Background Patterns from Screenshot */}
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-20 pointer-events-none transition-opacity duration-500">
                            <div className="absolute inset-0 bg-[linear-gradient(30deg,#1e293b_12%,transparent_12.5%,transparent_87%,#1e293b_87.5%,#1e293b),linear-gradient(150deg,#1e293b_12%,transparent_12.5%,transparent_87%,#1e293b_87.5%,#1e293b),linear-gradient(30deg,#1e293b_12%,transparent_12.5%,transparent_87%,#1e293b_87.5%,#1e293b),linear-gradient(150deg,#1e293b_12%,transparent_12.5%,transparent_87%,#1e293b_87.5%,#1e293b),linear-gradient(60deg,#1e293b77_25%,transparent_25.5%,transparent_75%,#1e293b77_75%,#1e293b77),linear-gradient(60deg,#1e293b77_25%,transparent_25.5%,transparent_75%,#1e293b77_75%,#1e293b77)] bg-[length:80px_140px]" />
                        </div>
                        
                        {/* Gradient Glow */}
                        <div className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br ${data.gradient} opacity-10 dark:opacity-20 blur-[120px] rounded-full pointer-events-none`} />

                        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            
                            {/* Left Content */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 backdrop-blur-md mb-6 animate-in slide-in-from-left-4 fade-in duration-700 shadow-sm dark:shadow-lg">
                                    <Trophy size={16} className="text-yellow-500 dark:text-yellow-400" />
                                    <span className="text-slate-600 dark:text-slate-200 text-xs font-bold uppercase tracking-wider">Premium Course</span>
                                </div>
                                
                                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight drop-shadow-sm dark:drop-shadow-xl transition-colors">
                                    {data.title}
                                </h1>
                                
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium opacity-90 transition-colors">
                                    {data.description}
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <button 
                                        id="enroll-btn"
                                        onClick={handleEnroll}
                                        className="px-8 py-4 rounded-2xl font-bold text-lg text-white shadow-[0_10px_40px_-10px_rgba(79,70,229,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
                                    >
                                        Enroll Now <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Right Visual - Big Card from Screenshot */}
                            <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center lg:justify-end perspective-1000 animate-in zoom-in duration-700 delay-100">
                                <div className={`relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-[3rem] bg-gradient-to-br ${data.gradient} shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500 group`}>
                                    <div className="absolute inset-0 bg-white/10 rounded-[3rem] opacity-50 backdrop-blur-sm border border-white/20" />
                                    {/* Icon */}
                                    <div className="relative z-10 p-8 bg-white/20 rounded-[2rem] backdrop-blur-md shadow-inner border border-white/30 group-hover:scale-110 transition-transform duration-500">
                                        {React.cloneElement(data.icon as React.ReactElement, { size: 80, className: "text-white drop-shadow-lg" })}
                                    </div>
                                    
                                    {/* Decor Elements */}
                                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-400 rounded-full blur-xl opacity-60 animate-pulse" />
                                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-60" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20 mb-20">
                        {/* Stats Grid - Floating overlap */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.stats.map((stat: any, i: number) => (
                                <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl dark:shadow-2xl text-center transform transition-transform hover:-translate-y-2">
                                    <div className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</div>
                                    <div className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-xs lg:text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Modules Grid */}
                    <div className="max-w-7xl mx-auto px-4 relative mb-20">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Detailed Curriculum</h2>
                                <p className="text-slate-600 dark:text-slate-400">Select a module to explore contents and start learning.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.modules.map((mod: any, i: number) => (
                                <div 
                                    key={i} 
                                    onClick={() => setSelectedModule(mod)}
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-blue-500/30 hover:shadow-lg dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all group relative overflow-hidden"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${mod.bg} ${mod.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                        <mod.icon size={28} />
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{mod.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{mod.desc}</p>
                                    
                                    <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors gap-2 mt-auto">
                                        View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="max-w-7xl mx-auto px-4 mb-20">
                        <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-12 text-center border border-slate-200 dark:border-slate-700 relative overflow-hidden shadow-2xl transition-colors duration-500">
                            <div className={`absolute inset-0 bg-gradient-to-r ${data.gradient} opacity-[0.05] dark:opacity-10 pointer-events-none`} />
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
                            
                            <h2 className="text-3xl lg:text-4xl font-black mb-6 relative z-10 text-slate-900 dark:text-white tracking-tight">Ready to start your journey?</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-10 relative z-10 text-lg font-medium">
                                Join thousands of students who have achieved their goals with TakeUUp.
                            </p>
                            <button 
                                onClick={handleEnroll}
                                className={`inline-flex px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 relative z-30`}
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