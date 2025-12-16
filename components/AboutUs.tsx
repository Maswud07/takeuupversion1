import React from 'react';
import { Target, Heart, Zap, Globe, Users, Award, Rocket, BookOpen, Quote, Linkedin, Twitter, Mail } from 'lucide-react';

const TEAM_VALUES = [
    { icon: <Target />, title: "Mission Driven", desc: "We are obsessed with helping students achieve their academic dreams." },
    { icon: <Heart />, title: "Student First", desc: "Every feature we build starts with the question: 'Does this help the student?'" },
    { icon: <Zap />, title: "Fast & Reliable", desc: "We believe technology should speed up learning, not slow it down." },
    { icon: <Globe />, title: "Accessible", desc: "Quality education should be available to everyone, everywhere." },
];

const STATS = [
    { label: "Active Students", value: "50,000+" },
    { label: "Quizzes Taken", value: "1.2M+" },
    { label: "Questions Solved", value: "5M+" },
    { label: "Success Stories", value: "1000+" },
];

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white font-sans transition-colors duration-500 overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 text-center">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in zoom-in duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider mb-6">
                    <Rocket size={12} className="text-cyan-500" /> Our Story
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-slate-900 dark:text-white">
                    Democratizing Education <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Across Bangladesh</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    TakeUUp is more than just an ed-tech platform. It's a movement to bridge the gap between dreamers and achievers through technology, data, and mentorship.
                </p>
            </div>
        </section>

        {/* Stats Strip */}
        <div className="border-y border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map((stat, i) => (
                        <div key={i} className="space-y-1">
                            <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Founder Section */}
        <section className="py-24 px-4 bg-white dark:bg-[#0B0F19]">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-[2.5rem] rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] -rotate-3 border border-white/10" />
                        <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-slate-200 dark:border-white/10 shadow-2xl">
                            {/* Founder Image Placeholder - Updated to a professional portrait style match */}
                            <img 
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" 
                                alt="Tahmid Rayat" 
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="text-4xl font-bold mb-1">Tahmid Rayat</h3>
                                <p className="text-cyan-400 font-medium text-lg">Founder & CEO</p>
                            </div>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="space-y-8">
                        <div className="inline-flex p-3 bg-cyan-500/10 rounded-2xl text-cyan-600 dark:text-cyan-400 mb-2">
                            <Quote size={32} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                            "Education shouldn't be a privilege. It should be a right accessible to every pocket."
                        </h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            <p>
                                I started TakeUUp with a simple laptop and a massive vision: to fix the fragmentation in Bangladesh's competitive exam preparation system.
                            </p>
                            <p>
                                Growing up, I saw brilliant students failing not because they lacked talent, but because they lacked resources and guidance. Expensive coaching centers in Dhaka were the only option, leaving rural students behind.
                            </p>
                            <p>
                                Today, TakeUUp levels the playing field. We use AI to personalize learning, making premium education affordable and accessible to a student in a remote village just as it is to one in the capital.
                            </p>
                        </div>
                        
                        <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                            <a href="#" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:bg-cyan-500 hover:text-white transition-all"><Linkedin size={20} /></a>
                            <a href="#" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:bg-cyan-500 hover:text-white transition-all"><Twitter size={20} /></a>
                            <a href="#" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:bg-cyan-500 hover:text-white transition-all"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Mission & Values */}
        <section className="py-24 px-4 bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">What Drives Us</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Our core values shape every quiz we create, every line of code we write, and every student we mentor.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TEAM_VALUES.map((item, i) => (
                        <div key={i} className="bg-white dark:bg-[#0F172A] p-8 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:-translate-y-2 transition-all duration-300 group shadow-sm">
                            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors shadow-lg">
                                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Join CTA */}
        <section className="py-24 px-4">
            <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-white rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-500 opacity-20 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white dark:text-slate-900 mb-6">
                        Ready to Transform Your Future?
                    </h2>
                    <p className="text-lg text-slate-300 dark:text-slate-600 max-w-2xl mx-auto mb-10">
                        Join the fastest growing student community in Bangladesh. Whether you are preparing for HSC, Admission, or Jobs - we have got you covered.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#/register" className="px-10 py-4 bg-cyan-500 text-slate-900 dark:bg-slate-900 dark:text-white font-bold rounded-2xl hover:bg-cyan-400 dark:hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg">
                            Get Started Free
                        </a>
                        <a href="#/pricing" className="px-10 py-4 bg-transparent border-2 border-white/20 dark:border-slate-900/20 text-white dark:text-slate-900 font-bold rounded-2xl hover:bg-white/10 dark:hover:bg-slate-900/5 transition-all">
                            View Plans
                        </a>
                    </div>
                </div>
            </div>
        </section>

    </div>
  );
};