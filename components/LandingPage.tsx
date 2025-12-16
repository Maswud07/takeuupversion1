import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck, BarChart3, Sparkles, ListChecks, Mail, Gift, Users, FileText, PieChart, X, ArrowRight, CheckCircle2, Plus, Minus, HelpCircle, Star, Flame, Trophy, Target, Backpack, ScrollText, BookOpen, Briefcase, GraduationCap, Globe, Monitor, Shield, MessageSquare, Zap, Library, Radio, Video, Book, PlayCircle, HelpCircle as QuestionMark, BrainCircuit, Quote, Settings, Image, Table, Layers, File, FileType } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Feature {
    id: string;
    icon: React.ReactNode;
    title: string;
    shortDesc: string;
    fullDesc: string;
    benefits: string[];
    colorClass: string;
}

const FREE_RESOURCES = [
    {
        id: 'quiz',
        title: 'Free Quiz',
        desc: 'Test your skills daily',
        icon: <Zap />,
        link: '/quiz',
        bg: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    {
        id: 'jobs',
        title: 'Job Portal',
        desc: 'Find your dream career',
        icon: <Briefcase />,
        link: '/jobs',
        bg: 'bg-gradient-to-br from-violet-400 to-purple-600'
    },
    {
        id: 'blog',
        title: 'Blog',
        desc: 'Tips, tricks & news',
        icon: <FileText />,
        link: '/blog',
        bg: 'bg-gradient-to-br from-pink-400 to-rose-600'
    }
];

const FEATURES: Feature[] = [
    {
        id: 'daily-quiz',
        icon: <CalendarCheck className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />,
        title: "Daily Quiz",
        shortDesc: "Challenge yourself with new quizzes every day to stay sharp and consistent.",
        fullDesc: "Consistency is the secret to academic success. Our Daily Quiz module delivers fresh, curriculum-aligned questions every morning tailored to your grade level. Build a learning streak, earn daily rewards, and turn study time into a fun daily habit.",
        benefits: ["New questions every 24 hours", "Streak tracking & rewards", "Topic rotation for full coverage"],
        colorClass: "text-cyan-500 dark:text-cyan-400"
    },
    {
        id: 'leaderboard',
        icon: <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-500" />,
        title: "Leaderboard Rank",
        shortDesc: "Compete with peers and see where you stand on the national leaderboard.",
        fullDesc: "Gauge your performance against students across Bangladesh. Our dynamic leaderboards track daily, weekly, and all-time rankings. See exactly where you stand among thousands of peers and get the motivation you need to push for the top spot.",
        benefits: ["National & District rankings", "Real-time rank updates", "Badges for top performers"],
        colorClass: "text-blue-600 dark:text-blue-500"
    },
    {
        id: 'ai-mentor',
        icon: <Sparkles className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
        title: "AI Mentor",
        shortDesc: "Get personalized guidance and insights from our intelligent AI tutor.",
        fullDesc: "Stuck on a tough Physics problem or confusing Grammar rule? Our Gemini-powered AI Mentor is available 24/7. It provides instant, step-by-step explanations, identifies your weak areas, and suggests specific topics you need to review.",
        benefits: ["24/7 Instant doubt solving", "Personalized topic recommendations", "Weakness detection logic"],
        colorClass: "text-purple-500 dark:text-purple-400"
    },
    {
        id: 'study-plan',
        icon: <ListChecks className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />,
        title: "Study Plan",
        shortDesc: "Create and follow a customized study schedule to cover all your subjects.",
        fullDesc: "Stop worrying about what to study next. Our smart planner generates a custom schedule based on your exam date and current progress. It balances your workload, ensuring you cover every chapter without burning out before the big day.",
        benefits: ["Adaptive scheduling", "Exam countdown integration", "Daily task checklists"],
        colorClass: "text-emerald-500 dark:text-emerald-400"
    },
    {
        id: 'analytics',
        icon: <PieChart className="w-8 h-8 text-orange-500 dark:text-orange-400" />,
        title: "Detailed Analytics",
        shortDesc: "Track your strengths and weaknesses with subject-wise performance breakdowns.",
        fullDesc: "Data-driven learning is faster learning. Visualize your progress with intuitive charts. We break down your performance by subject, chapter, and even question type, helping you pinpoint exactly where you need to focus your efforts.",
        benefits: ["Subject-wise strength graphs", "Time management analysis", "Accuracy trends over time"],
        colorClass: "text-orange-500 dark:text-orange-400"
    },
    {
        id: 'mega-quiz',
        icon: <Gift className="w-8 h-8 text-pink-500 dark:text-pink-400" />,
        title: "Mega Quiz & Prizes",
        shortDesc: "Participate in weekly mega quizzes to win scholarships and exciting rewards.",
        fullDesc: "Put your skills to the ultimate test in our Weekly Mega Quizzes. Compete in real-time with thousands of students for a chance to win scholarships, gadgets, and premium subscriptions. It's high stakes, high reward learning.",
        benefits: ["Real-time live competition", "Scholarship opportunities", "Exclusive winner badges"],
        colorClass: "text-pink-500 dark:text-pink-400"
    },
    {
        id: 'mentors',
        icon: <Users className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />,
        title: "Expert Mentors",
        shortDesc: "Connect with top tutors from BUET, DMC, and DU for one-on-one guidance.",
        fullDesc: "Sometimes you need a human touch. Connect directly with top achievers from BUET, Medical Colleges, and Dhaka University. Book one-on-one sessions for career counseling, specific subject tutoring, or exam strategy discussions.",
        benefits: ["Verified top-tier tutors", "1-on-1 video sessions", "Career & admission guidance"],
        colorClass: "text-indigo-500 dark:text-indigo-400"
    },
    {
        id: 'blog',
        icon: <FileText className="w-8 h-8 text-teal-500 dark:text-teal-400" />,
        title: "Knowledge Blog",
        shortDesc: "Read articles, exam tips, and career advice from industry experts.",
        fullDesc: "Stay ahead of the curve with our curated blog. Read in-depth articles on exam strategies, complex topic simplifications, and success stories from past toppers. It's your go-to resource for motivation and information.",
        benefits: ["Exam strategy guides", "Topper success stories", "Complex topics simplified"],
        colorClass: "text-teal-500 dark:text-teal-400"
    },
    {
        id: 'newsletter',
        icon: <Mail className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />,
        title: "Smart Newsletter",
        shortDesc: "Get customized updates on exams, job circulars, and study tips in your inbox.",
        fullDesc: "Never miss an important date again. Our smart newsletter delivers exam schedules, admission circulars, and job postings directly to your inbox, filtered by your interests. Plus, get a weekly summary of your learning progress.",
        benefits: ["Exam date alerts", "Job circular notifications", "Weekly progress summary"],
        colorClass: "text-yellow-500 dark:text-yellow-400"
    }
];

const FAQS = [
    {
        question: "What is the AI Scheduling Assistant?",
        answer: "Our AI Scheduling Assistant (Study Planner) intelligently analyzes your syllabus, exam dates, and free time to create a personalized day-by-day learning roadmap, ensuring you cover all topics without burnout."
    },
    {
        question: "Is the AI Scheduling Assistant compatible with my calendar?",
        answer: "Yes, our AI Scheduling Assistant seamlessly integrates with popular calendar applications like Google Calendar, Outlook, and Apple Calendar, ensuring your schedules are always in sync."
    },
    {
        question: "How does the AI Scheduling Assistant work?",
        answer: "It uses advanced algorithms to prioritize weak topics based on your quiz performance. It automatically adjusts your schedule if you miss a day, recalculating the optimal path to exam success."
    },
    {
        question: "Can I customize the scheduling preferences?",
        answer: "Absolutely. You can set your daily study hours, preferred subjects for specific days, and block out time for breaks or other activities. The AI builds the plan around your life, not the other way around."
    }
];

const TESTIMONIALS = [
    {
        id: 1,
        text: (
            <>
                আমার মেয়ে <span className="text-rose-600 dark:text-rose-500 font-bold">সায়েন্সের সাবজেক্টগুলো</span> নিয়ে অনেক স্ট্রাগল করতো। পড়তে চাইতো না। <span className="text-emerald-600 dark:text-emerald-500 font-bold">TakeUUp-এ ভর্তি করানোর পর</span> থেকে ওর এই ভয়টা দেখলাম অনেক কমে গেছে। আলহামদুলিল্লাহ। ধন্যবাদ TakeUUp-এর টিচারদের।
            </>
        ),
        name: "মোহাম্মদ রাজিবুল হাসান",
        role: "বাবা",
        studentInfo: "শিক্ষার্থী: সৈয়দা মেহরিন ইসলাম",
        image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        text: (
            <>
                I was struggling with <span className="text-rose-600 dark:text-rose-500 font-bold">University Admission</span> prep. The daily quizzes were overwhelming until I joined <span className="text-emerald-600 dark:text-emerald-500 font-bold">TakeUUp Premium</span>. Now I feel confident and ready to ace my exams!
            </>
        ),
        name: "Rahim Uddin",
        role: "Guardian",
        studentInfo: "Student: Samiul Islam",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

const LandingHeroBackground = () => {
    // Academic Growth Palette: Cyan, Indigo, Fuchsia, Teal
    const colors = ['#22d3ee', '#818cf8', '#e879f9', '#2dd4bf'];

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            {/* Modern Linear Grid */}
            <div 
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    color: 'inherit'
                }}
            />
            
            {/* Dynamic Floating Particles */}
            {/* Generates rising particles to symbolize growth/learning */}
            {[...Array(40)].map((_, i) => {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 3 + 2; // 2px to 5px
                return (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            top: `${Math.random() * 120}%`, // Allow starting below fold
                            left: `${Math.random() * 100}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: color,
                            boxShadow: `0 0 ${size * 4}px ${color}`,
                            opacity: Math.random() * 0.5 + 0.3,
                            // floatUp animation for "rising" effect
                            animation: `floatUp ${Math.random() * 15 + 15}s infinite linear, pulseGlow ${Math.random() * 4 + 2}s infinite ease-in-out`
                        }}
                    />
                );
            })}

            {/* Ambient Background Blobs */}
            <div className="absolute -top-[10%] -left-[10%] w-[700px] h-[700px] bg-cyan-300/20 dark:bg-cyan-500/10 rounded-full blur-[130px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-[130px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-fuchsia-300/20 dark:bg-fuchsia-500/10 rounded-full blur-[130px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen" />
        </div>
    );
};

const TestimonialSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const activeTestimonial = TESTIMONIALS[activeIndex];

    return (
        <section className="py-20 bg-white dark:bg-black border-t border-slate-200 dark:border-slate-900 relative overflow-hidden transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-slate-50 dark:bg-[#151921] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 relative shadow-2xl group transition-all hover:border-slate-300 dark:hover:border-white/10">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-rose-100/50 dark:from-rose-900/20 to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none text-slate-900 dark:text-white" />

                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-between relative z-10">
                            <div>
                                <Quote size={48} className="text-slate-400 dark:text-slate-600 mb-6 fill-current opacity-50" />
                                <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-white leading-relaxed mb-8">
                                    "{activeTestimonial.text}"
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{activeTestimonial.name}</h4>
                                <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">{activeTestimonial.role}</div>
                                <div className="text-slate-500 text-xs">{activeTestimonial.studentInfo}</div>
                            </div>
                        </div>

                        <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 dark:from-[#151921] via-transparent to-transparent z-10" />
                            <img 
                                src={activeTestimonial.image} 
                                alt={activeTestimonial.name} 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-white/50 dark:bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-6 bg-slate-900 dark:bg-white' : 'bg-slate-400 dark:bg-slate-600 hover:bg-slate-600 dark:hover:bg-slate-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const AllInOneSection = () => {
    const { t } = useLanguage();
    return (
        <section className="relative z-10 py-24 bg-white dark:bg-black border-t border-slate-200 dark:border-slate-900 transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
                        {t('sec_one_plan')}
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Item 1: Daily Quiz */}
                    <div className="bg-slate-50 dark:bg-[#151921] rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center hover:border-cyan-500/30 transition-all group shadow-sm dark:shadow-none">
                        <div className="mb-4 p-4 bg-cyan-100 dark:bg-cyan-900/20 rounded-full text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                            <CalendarCheck size={32} />
                        </div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            Daily Quiz
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                            New questions everyday
                        </div>
                    </div>

                    {/* Item 2: Rank & Leaderboard */}
                    <div className="bg-slate-50 dark:bg-[#151921] rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center hover:border-yellow-500/30 transition-all group shadow-sm dark:shadow-none">
                        <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
                            <Trophy size={32} />
                        </div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            Leaderboard
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                            Compete Nationally
                        </div>
                    </div>

                    {/* Item 3: Instant Feedback */}
                    <div className="bg-slate-50 dark:bg-[#151921] rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center hover:border-green-500/30 transition-all group shadow-sm dark:shadow-none">
                        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                            <Zap size={32} />
                        </div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            Instant Feedback
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                            Real-time explanations
                        </div>
                    </div>

                    {/* Item 4: AI Suggestion (Wide) */}
                    <div className="md:col-span-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-pink-900/40 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group border border-purple-200 dark:border-white/10 hover:border-purple-500/50 transition-all">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <Sparkles className="text-purple-600 dark:text-purple-400 animate-pulse" size={20} />
                                <span className="text-purple-700 dark:text-purple-300 font-bold tracking-wider text-xs uppercase">Powered by Gemini</span>
                            </div>
                            <div className="text-3xl font-black text-slate-900 dark:text-white italic mb-2">
                                AI Suggestion Box
                            </div>
                            <div className="text-slate-700 dark:text-slate-300 font-medium text-sm max-w-sm">
                                Analyzes your quiz performance to detect weak topics and suggest improvements.
                            </div>
                        </div>
                        <div className="relative z-10">
                             <div className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 dark:shadow-purple-900/50 group-hover:rotate-6 transition-transform">
                                <BrainCircuit size={40} className="text-white" />
                             </div>
                        </div>
                    </div>

                    {/* Item 5: Personalized Plan (Tall) */}
                    <div className="md:row-span-2 bg-slate-100 dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 relative group overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        
                        <div className="mb-6 relative z-10">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-2">Personalized<br/>Study Plan</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">Your custom 30-day roadmap.</p>
                        </div>

                        <div className="flex-1 flex flex-col gap-3 relative z-10">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                        {i}
                                    </div>
                                    <div className="h-2 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 w-2/3 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-auto pt-4 flex justify-center">
                                <div className="text-orange-500 dark:text-orange-400 font-bold text-sm flex items-center gap-2">
                                    View Full Plan <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Item 6: Analytics */}
                    <div className="bg-slate-50 dark:bg-[#151921] rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-all group shadow-sm dark:shadow-none">
                        <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <PieChart size={32} />
                        </div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            Analytics
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                            Track every step
                        </div>
                    </div>

                    {/* Item 7: Tutor Finder */}
                    <div className="bg-slate-50 dark:bg-[#151921] rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center hover:border-pink-500/30 transition-all group shadow-sm dark:shadow-none">
                        <div className="mb-4 p-4 bg-pink-100 dark:bg-pink-900/20 rounded-full text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                            <Users size={32} />
                        </div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                            Tutor Finder
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                            Get 1-on-1 help
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureCard: React.FC<{ feature: Feature; onClick: () => void }> = ({ feature, onClick }) => (
    <div 
        onClick={onClick}
        className="group relative p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.colorClass.replace('text-', 'from-').replace('500', '500/20')} to-transparent rounded-bl-[100px] -mr-8 -mt-8 transition-opacity opacity-20 group-hover:opacity-100 blur-xl`} />
        
        <div className={`w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 shadow-sm dark:shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {feature.icon}
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {feature.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">
            {feature.shortDesc}
        </p>
        
        <div className={`flex items-center text-sm font-bold ${feature.colorClass} opacity-70 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0`}>
            Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
    </div>
);

const CosmicBackground = ({ hasVideo = false }: { hasVideo?: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {!hasVideo && <div className="absolute inset-0 bg-slate-900" />}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] opacity-50" />
        {!hasVideo && <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-600/30 rounded-full blur-[120px] mix-blend-screen opacity-60 animate-pulse duration-[8s]" />}
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white rounded-full blur-xl animate-float-slow opacity-20" />
        <div className="absolute bottom-1/3 right-[10%] w-16 h-16 bg-white rounded-full blur-2xl animate-float opacity-10" style={{ animationDelay: '2s' }} />
        <style>{`
            @keyframes float-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
            .animate-float-slow {
                animation: float-slow 8s infinite ease-in-out;
            }
            .animate-float {
                animation: float-slow 6s infinite ease-in-out;
            }
        `}</style>
    </div>
  )
}

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(1);

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 relative z-10 border-t border-slate-200 dark:border-slate-900 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/50 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-200/50 dark:bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                        <HelpCircle size={14} className="mr-2 text-purple-500" /> FAQ
                    </div>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        Frequently Asked <br />
                        <span className="text-slate-900 dark:text-white">Question</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Find quick answers to common questions about our AI Scheduling <br/> Assistant.
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div 
                            key={index}
                            className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                                openIndex === index 
                                ? 'bg-white dark:bg-slate-900/50 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]' 
                                : 'bg-white/50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left group"
                            >
                                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-purple-600 dark:text-purple-400' : 'text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                                    {openIndex === index ? (
                                        <Minus size={20} className="text-purple-600 dark:text-purple-400" />
                                    ) : (
                                        <Plus size={20} className="text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white" />
                                    )}
                                </div>
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed text-base border-t border-slate-100 dark:border-slate-800/50 mt-0">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const LandingPage = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Redirect Employer/Admin away from Landing Page if authenticated
  useEffect(() => {
      const storedUser = localStorage.getItem('takeuup_user');
      if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.role === 'employer') {
              navigate('/employer-dashboard', { replace: true });
          } else if (user.role === 'admin') {
              navigate('/admin', { replace: true });
          }
      }
  }, [navigate]);

  const HERO_CATEGORIES = [
    {
        id: 'job-prep',
        title: t('cat_job_title'),
        batch: 'PREP',
        label: t('cat_job_label'),
        icon: <Briefcase />,
        color: 'from-blue-500 to-indigo-600',
        borderColor: 'border-blue-500',
        glow: 'shadow-blue-500/50',
        textColor: 'text-blue-600 dark:text-blue-400',
        link: '/details/job-prep'
    },
    {
        id: 'bcs',
        title: t('cat_bcs_title'),
        batch: 'EXAM',
        label: t('cat_bcs_label'),
        icon: <ScrollText />,
        color: 'from-green-500 to-emerald-600',
        borderColor: 'border-green-500',
        glow: 'shadow-green-500/50',
        textColor: 'text-green-600 dark:text-green-400',
        link: '/details/bcs',
        hasBadge: true
    },
    {
        id: 'hsc',
        title: t('cat_hsc_title'),
        batch: 'ACADEMIC',
        label: t('cat_hsc_label'),
        icon: <BookOpen />,
        color: 'from-purple-500 to-pink-600',
        borderColor: 'border-purple-500',
        glow: 'shadow-purple-500/50',
        textColor: 'text-purple-600 dark:text-purple-400',
        link: '/details/hsc'
    },
    {
        id: 'admission',
        title: t('cat_adm_title'),
        batch: 'TEST',
        label: t('cat_adm_label'),
        icon: <GraduationCap />,
        color: 'from-orange-500 to-red-600',
        borderColor: 'border-orange-500',
        glow: 'shadow-orange-500/50',
        textColor: 'text-orange-600 dark:text-orange-400',
        link: '/details/admission'
    },
    {
        id: 'ielts',
        title: 'IELTS',
        batch: 'GLOBAL',
        label: 'English Prep',
        icon: <Globe />,
        color: 'from-cyan-400 to-teal-500',
        borderColor: 'border-cyan-500',
        glow: 'shadow-cyan-500/50',
        textColor: 'text-cyan-600 dark:text-cyan-400',
        link: '/details/ielts'
    },
    {
        id: 'toefl',
        title: 'TOEFL',
        batch: 'ENGLISH',
        label: 'Language',
        icon: <MessageSquare />,
        color: 'from-violet-500 to-purple-500',
        borderColor: 'border-violet-500',
        glow: 'shadow-violet-500/50',
        textColor: 'text-violet-600 dark:text-violet-400',
        link: '/details/toefl'
    },
    {
        id: 'pte',
        title: 'PTE',
        batch: 'ONLINE',
        label: 'PTE Academic',
        icon: <Monitor />,
        color: 'from-yellow-400 to-amber-500',
        borderColor: 'border-yellow-500',
        glow: 'shadow-yellow-500/50',
        textColor: 'text-yellow-600 dark:text-yellow-400',
        link: '/details/pte'
    },
    {
        id: 'issb',
        title: 'ISSB',
        batch: 'DEFENSE',
        label: 'Defense',
        icon: <Shield />,
        color: 'from-emerald-600 to-green-700',
        borderColor: 'border-emerald-600',
        glow: 'shadow-emerald-600/50',
        textColor: 'text-emerald-600 dark:text-emerald-500',
        link: '/details/issb'
    }
  ];

  return (
    <div className="relative bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <section className="sticky top-[-55vh] min-h-screen flex flex-col justify-center items-center overflow-hidden z-0 perspective-1000 bg-slate-50 dark:bg-slate-900 pt-32 pb-20 transition-colors duration-500">
        {/* Replace Video with New Hero Background */}
        <LandingHeroBackground />
        
        {/* Animated Particles/Floaters can remain if desired, using CosmicBackground's floaters */}
        <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-1/4 left-[10%] w-12 h-12 bg-blue-500/10 dark:bg-white/10 rounded-full blur-xl animate-float-slow opacity-20" />
             <div className="absolute bottom-1/3 right-[10%] w-16 h-16 bg-purple-500/10 dark:bg-white/10 rounded-full blur-2xl animate-float opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center justify-center text-center">
            
            <div className="mb-16 animate-in zoom-in duration-1000">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight drop-shadow-2xl">
                    {t('hero_title_1')} <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-300 dark:via-white dark:to-purple-300 animate-gradient-x">{t('hero_title_2')}</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                    {t('hero_subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl mx-auto mb-16 px-4">
                {HERO_CATEGORIES.map((cat, index) => (
                    <Link 
                        to={cat.link}
                        key={cat.id}
                        className="group block relative"
                    >
                        <div className="relative w-full aspect-square bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-sm rounded-[2rem] p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 overflow-hidden shadow-lg dark:shadow-[0px_10px_20px_rgba(0,0,0,0.3),inset_0px_1px_1px_rgba(255,255,255,0.1)] group-hover:shadow-2xl dark:group-hover:shadow-[0px_20px_40px_rgba(0,0,0,0.4),inset_0px_1px_1px_rgba(255,255,255,0.1)] border border-slate-200 dark:border-slate-700/50">
                            
                            {/* Top Row: Icon and Menu Dots */}
                            <div className="flex justify-between items-start z-10">
                                <div className="text-slate-500 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                    {/* Render Icon with specific size */}
                                    {React.cloneElement(cat.icon as React.ReactElement<any>, { size: 28, className: "" })}
                                </div>
                                <div className="flex flex-col gap-[3px] py-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <div className="w-1 h-1 bg-slate-400 rounded-full" />
                                    <div className="w-1 h-1 bg-slate-400 rounded-full" />
                                    <div className="w-1 h-1 bg-slate-400 rounded-full" />
                                </div>
                            </div>

                            {/* Middle Row: Title and Indicator */}
                            <div className="flex gap-3 z-10 my-2">
                                {/* Vertical Line */}
                                <div className={`w-1 rounded-full bg-gradient-to-b ${cat.color} h-10`} />
                                
                                <div className="flex flex-col justify-center text-left">
                                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-wide leading-none mb-1">{cat.title}</h3>
                                    <p className="text--[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{cat.label}</p>
                                </div>
                            </div>

                            {/* Bottom Row: Button */}
                            <div className="z-10">
                                <div className={`w-full py-2.5 rounded-full bg-gradient-to-r ${cat.color} text-center font-bold text-white text-xs md:text-sm tracking-wide shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all`}>
                                    {t('cat_btn_details')}
                                </div>
                            </div>

                            {/* Optional Badge Indicator on Button or Corner */}
                            {cat.hasBadge && (
                                <div className="absolute top-6 right-8 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                            )}

                            {/* Background Hover Glow */}
                            <div className={`absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-br ${cat.color} blur-[80px] opacity-0 group-hover:opacity-1 dark:group-hover:opacity-20 transition-opacity duration-500 rounded-full pointer-events-none`} />
                        </div>
                    </Link>
                ))}
            </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-slate-500 opacity-50 hover:opacity-100 transition-opacity">
            <span className="text-[10px] uppercase tracking-[0.2em]">{t('hero_scroll')}</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
        </div>
      </section>

      <AllInOneSection />

      <section className="relative z-10 py-16 bg-white/90 dark:bg-slate-900/60 backdrop-blur-3xl border-t border-slate-200 dark:border-white/10 rounded-t-[3rem] shadow-[0_-25px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_-25px_50px_rgba(0,0,0,0.5)] -mt-12 overflow-hidden transition-colors duration-500">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-100/50 dark:from-white/5 to-transparent pointer-events-none" />
         <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                        {t('sec_free_title')}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl font-medium">
                        {t('sec_free_desc')}
                    </p>
                </div>
            </div>

            {/* Main Resources (Quiz, Jobs, Blog) - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {FREE_RESOURCES.map((resource) => (
                    <Link 
                        to={resource.link} 
                        key={resource.id}
                        className="group relative flex items-center p-4 bg-white dark:bg-[#151921] border border-slate-200 dark:border-white/10 rounded-2xl transition-all duration-300 hover:border-slate-300 dark:hover:border-white/30 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                    >
                        <div className={`w-16 h-16 rounded-xl ${resource.bg} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                            {React.cloneElement(resource.icon as React.ReactElement<any>, { size: 32 })}
                        </div>
                        <div className="ml-4 z-10">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                {t(`card_${resource.id}_title`)}
                            </h3>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                                {t(`card_${resource.id}_desc`)}
                            </p>
                        </div>
                        {/* Decor */}
                        <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-slate-100 dark:from-white/5 to-transparent rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
                    </Link>
                ))}
            </div>

            {/* Free Tools Grid - New */}
            <div className="bg-slate-50 dark:bg-[#0f1219] rounded-3xl p-6 border border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg">
                        <Settings size={18} className="text-slate-700 dark:text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Student Utility Tools</h3>
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20 font-bold">FREE</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {[
                        { name: 'PDF to Word', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10', link: '/tools/pdf-to-word' },
                        { name: 'Word to PDF', icon: FileType, color: 'text-indigo-500', bg: 'bg-indigo-500/10', link: '/tools/word-to-pdf' },
                        { name: 'PDF to Excel', icon: Table, color: 'text-green-500', bg: 'bg-green-500/10', link: '/tools/pdf-to-excel' },
                        { name: 'Img to PDF', icon: Image, color: 'text-purple-500', bg: 'bg-purple-500/10', link: '/tools/img-to-pdf' },
                        { name: 'Merge PDF', icon: Layers, color: 'text-red-500', bg: 'bg-red-500/10', link: '/tools/merge-pdf' },
                        { name: 'CV Builder', icon: File, color: 'text-cyan-500', bg: 'bg-cyan-500/10', link: '/jobs/create-cv' },
                    ].map((tool, i) => (
                        <Link 
                            to={tool.link}
                            key={i} 
                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-[#1A1E29] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md transition-all group"
                        >
                            <div className={`w-10 h-10 rounded-lg ${tool.bg} ${tool.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                                <tool.icon size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 text-center leading-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{tool.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
         </div>
      </section>

      <section className="relative z-10 py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything You Need to Succeed</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Click on any feature below to explore how we help you master your exams.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map((feature) => (
                    <FeatureCard 
                        key={feature.id}
                        feature={feature}
                        onClick={() => setSelectedFeature(feature)}
                    />
                ))}
            </div>
        </div>
      </section>

      <TestimonialSection />
      <FAQSection />

      {selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/50 dark:bg-slate-950/90 backdrop-blur-sm transition-opacity duration-300" onClick={() => setSelectedFeature(null)} />
              
              <div className="relative w-full max-w-2xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden group bg-white dark:bg-slate-900">
                  <div className="hidden dark:block">
                    <CosmicBackground />
                  </div>
                  <button 
                      onClick={() => setSelectedFeature(null)}
                      className="absolute top-4 right-4 z-20 p-2 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
                  >
                      <X size={24} />
                  </button>

                  <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl shadow-inner border border-slate-100 dark:border-white/10 backdrop-blur-md">
                              {selectedFeature.icon}
                          </div>
                          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-wide text-glow">{selectedFeature.title}</h2>
                      </div>

                      <div className="space-y-6">
                          <p className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed font-light">
                              {selectedFeature.fullDesc}
                          </p>

                          <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-6 border border-slate-200 dark:border-white/10 backdrop-blur-md">
                              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider mb-4">Key Benefits</h3>
                              <ul className="space-y-3">
                                  {selectedFeature.benefits.map((benefit, index) => (
                                      <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                          <CheckCircle2 className={`w-5 h-5 ${selectedFeature.colorClass} mt-0.5`} />
                                          <span>{benefit}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          
                          <button 
                             onClick={() => setSelectedFeature(null)}
                             className={`w-full py-4 rounded-xl font-bold text-white dark:text-slate-900 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-lg`}
                          >
                             Got it
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes pulseGlow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.5); }
        }
        @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};