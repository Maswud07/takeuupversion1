import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Trophy, Target, Zap, BookOpen, Clock, ChevronRight, BrainCircuit, Crown, BarChart2, Activity, MessageSquare, Star, TrendingUp, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const PremiumDemo = () => {
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setAnimateChart(true), 100);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 transition-colors duration-500 font-sans">
      {/* Demo Overlay Banner */}
      <div className="sticky top-20 z-40 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-slate-900 py-3 px-4 text-center font-bold shadow-lg flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 animate-in slide-in-from-top-10 duration-500">
        <span className="flex items-center gap-2 text-sm md:text-base">
            <Crown size={20} className="animate-pulse" /> 
            <span>You are viewing a <strong>Premium Preview</strong></span>
        </span>
        <Link to="/pricing" className="bg-slate-900 text-yellow-400 px-5 py-1.5 rounded-full text-xs md:text-sm font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-xl transform hover:scale-105 border border-yellow-500/50">
          Unlock Full Access
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 mt-4 animate-in fade-in duration-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400">Future Topper</span>!
                </h1>
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/50 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Crown size={12} fill="currentColor" /> Premium
                </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Here is what your growth could look like with TakeUUp Premium.</p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center gap-2 border border-slate-100 dark:border-slate-800">
                  <Flame className="text-orange-500" fill="currentColor" size={20} />
                  <span className="font-bold text-slate-900 dark:text-white">45 Day Streak</span>
              </div>
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center gap-2 border border-slate-100 dark:border-slate-800">
                  <Trophy className="text-yellow-500 dark:text-yellow-400" fill="currentColor" size={20} />
                  <span className="font-bold text-slate-900 dark:text-white">Rank #12</span>
              </div>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Advanced Analytics Card (Premium Only) */}
            <div className="md:col-span-2 bg-white dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 relative overflow-hidden shadow-xl dark:shadow-none hover:border-cyan-500/30 transition-colors">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Activity className="text-cyan-600 dark:text-cyan-400" /> Performance Analytics
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Consistent improvement over 7 days</p>
                    </div>
                    <select className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                        <option>Physics 1st Paper</option>
                        <option>Chemistry</option>
                        <option>Higher Math</option>
                    </select>
                </div>
                {/* Animated Chart */}
                <div className="flex items-end justify-between h-40 gap-3 pb-2 px-2">
                    {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                        <div key={i} className="w-full flex flex-col items-center gap-2 group relative">
                            <div className="relative w-full bg-slate-100 dark:bg-slate-900/50 rounded-t-xl h-full flex items-end overflow-hidden">
                                <div 
                                    style={{ height: animateChart ? `${h}%` : '5%' }} 
                                    className={`w-full ${i === 6 ? 'bg-gradient-to-t from-cyan-600 to-cyan-400' : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400 dark:group-hover:bg-slate-600'} rounded-t-xl transition-all duration-1000 ease-out`} 
                                />
                                {i === 6 && animateChart && (
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-bounce">
                                        +12%
                                    </div>
                                )}
                            </div>
                            <span className="text-xs font-bold text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                            
                            {/* Hover Tooltip */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                Score: {h}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Suggestion (Premium) */}
            <div className="md:col-span-2 bg-gradient-to-br from-purple-100 via-white to-purple-50 dark:from-purple-900/40 dark:via-slate-900 dark:to-slate-900 p-1 rounded-3xl border border-purple-200 dark:border-purple-500/30 relative shadow-xl dark:shadow-none hover:shadow-purple-500/10 transition-all">
                <div className="h-full bg-white/60 dark:bg-slate-900/80 backdrop-blur-xl rounded-[20px] p-6 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 pointer-events-none">
                        <BrainCircuit size={140} className="text-purple-600 dark:text-white" />
                    </div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
                            <BrainCircuit size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Mentor Insight</h3>
                            <span className="text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                <Sparkles size={10} /> Powered by Gemini
                            </span>
                        </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-grow leading-relaxed relative z-10">
                        "I've analyzed your last 3 physics quizzes. You are consistently missing questions on <span className="text-slate-900 dark:text-white font-bold bg-purple-100 dark:bg-purple-500/20 px-1 rounded">Thermodynamics</span>. I've prepared a 10-minute rapid fire revision specifically for this topic."
                    </p>
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 dark:shadow-purple-900/20 group relative z-10">
                        Start Personalized Revision <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>

        {/* Content Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Study Plan */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Target className="text-cyan-600 dark:text-cyan-500" /> Personalized Study Plan
                    </h2>
                    <button className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-bold bg-cyan-50 dark:bg-cyan-900/20 px-3 py-1 rounded-lg transition-colors">Edit Plan</button>
                </div>

                <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-lg dark:shadow-none">
                    <div className="space-y-4">
                        {[
                            { time: 'Today', task: 'Organic Chemistry: Alkanes', status: 'completed', dur: '45m' },
                            { time: 'Today', task: 'Physics: Newton\'s Laws Mock Test', status: 'pending', dur: '60m' },
                            { time: 'Tomorrow', task: 'Biology: Cell Division', status: 'locked', dur: '30m' },
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center p-4 rounded-2xl border transition-all ${
                                item.status === 'completed' 
                                ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-700/50 opacity-60' 
                                : item.status === 'pending' 
                                ? 'bg-white dark:bg-slate-800 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.05)] scale-[1.01]' 
                                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 border-dashed'
                            }`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 ${
                                    item.status === 'completed' 
                                    ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500' 
                                    : item.status === 'pending' 
                                    ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' 
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                                }`}>
                                    {item.status === 'completed' ? <CheckCircle2 size={20} /> : item.status === 'pending' ? <Clock size={20} /> : <Lock size={20} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold text-sm md:text-base ${item.status === 'locked' ? 'text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>{item.task}</h4>
                                    <span className="text-xs font-medium text-slate-500">{item.time} • {item.dur}</span>
                                </div>
                                {item.status === 'pending' && (
                                    <button className="px-5 py-2 bg-cyan-500 text-white dark:text-slate-900 text-sm font-bold rounded-xl hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                                        Start
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-8">
                    <BookOpen className="text-pink-500" /> Premium Materials
                </h2>
                <div className="grid grid-cols-2 gap-4">
                     {['Lecture Notes PDF', 'Model Test Papers', 'Previous Year Q&A', 'Video Explanations'].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-pink-500/50 transition-all cursor-pointer group shadow-sm dark:shadow-none hover:-translate-y-1">
                             <div className="flex items-start justify-between mb-3">
                                 <div className="p-2.5 bg-pink-50 dark:bg-slate-900 rounded-xl text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                     <Lock size={20} />
                                 </div>
                                 <span className="text-[10px] bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 px-2 py-0.5 rounded border border-pink-200 dark:border-pink-500/20 font-bold">PRO</span>
                             </div>
                             <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{item}</h3>
                             <p className="text-xs text-slate-500 mt-1 group-hover:text-pink-500 transition-colors">Unlock to access</p>
                        </div>
                     ))}
                </div>
            </div>

            {/* Right: Mentor & Leaderboard */}
            <div className="space-y-6">
                 {/* Mentor Chat Widget (Premium) */}
                 <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 relative shadow-xl dark:shadow-none overflow-hidden">
                     <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-4 relative z-10">
                         <div className="flex items-center gap-3">
                             <div className="relative">
                                 <img src="https://picsum.photos/id/64/100" className="w-12 h-12 rounded-full border-2 border-green-500" alt="Dr. Ayesha" />
                                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                             </div>
                             <div>
                                 <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dr. Ayesha</h4>
                                 <p className="text-green-500 dark:text-green-400 text-xs font-bold">Online • Expert</p>
                             </div>
                         </div>
                         <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400"><MessageSquare size={20} /></button>
                     </div>
                     <div className="space-y-3 text-sm mb-20 relative z-10">
                         <div className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-sm">
                             Hello! I noticed you struggled with the Calculus problem set.
                         </div>
                         <div className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-900 dark:text-cyan-100 p-3 rounded-2xl rounded-tr-none max-w-[90%] ml-auto shadow-sm">
                             Yes, the integration parts were tricky.
                         </div>
                         <div className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-sm w-16">
                             <div className="flex gap-1.5 justify-center">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                             </div>
                         </div>
                     </div>
                     
                     {/* Blur Overlay */}
                     <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent flex items-end justify-center pb-6 rounded-b-3xl z-20">
                         <Link to="/pricing" className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-900/20 text-sm flex items-center gap-2 transform hover:-translate-y-1 transition-all">
                             <Lock size={16} /> Unlock Chat
                         </Link>
                     </div>
                 </div>

                 {/* Premium Leaderboard */}
                 <div className="bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-900/10 dark:to-slate-900 rounded-3xl border border-yellow-200 dark:border-yellow-500/20 p-6 shadow-xl dark:shadow-none">
                     <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                         <Trophy className="text-yellow-500" /> National Rank
                     </h3>
                     <div className="space-y-4">
                         {[
                             { name: 'Rafiqul I.', score: 15400, rank: 1, avatar: 'https://picsum.photos/id/100/50' },
                             { name: 'Sarah K.', score: 15200, rank: 2, avatar: 'https://picsum.photos/id/101/50' },
                             { name: 'You (Potential)', score: 14800, rank: 3, avatar: 'https://picsum.photos/id/102/50', highlight: true },
                         ].map((u, i) => (
                             <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-transform hover:scale-[1.02] ${u.highlight ? 'bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-300 dark:border-yellow-500/50 shadow-sm' : 'bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-transparent'}`}>
                                 <span className={`font-black w-6 text-center text-lg ${u.rank === 1 ? 'text-yellow-500 dark:text-yellow-400' : u.rank === 2 ? 'text-slate-400 dark:text-slate-300' : 'text-orange-500 dark:text-orange-400'}`}>{u.rank}</span>
                                 <img src={u.avatar} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" alt={u.name} />
                                 <div className="flex-1">
                                     <h4 className={`text-sm font-bold ${u.highlight ? 'text-yellow-900 dark:text-yellow-200' : 'text-slate-800 dark:text-slate-200'}`}>{u.name}</h4>
                                     {u.highlight && <span className="text-[10px] text-yellow-700 dark:text-yellow-400 uppercase font-bold tracking-wide">Projected</span>}
                                 </div>
                                 <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{u.score}</span>
                             </div>
                         ))}
                     </div>
                     <p className="text-center text-xs text-slate-500 mt-4 font-medium">Top students get scholarships.</p>
                 </div>
            </div>
        </div>

        {/* CTA Footer */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl mt-8 group">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            
            {/* Animated Glow */}
            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] group-hover:animate-pulse" />

            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">Ready to perform like a Pro?</h2>
                <p className="text-blue-100 mb-8 text-lg font-medium">
                    Join 50,000+ students who improved their grades with TakeUUp Premium. Get unlimited access today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/register" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all transform hover:-translate-y-1 shadow-lg shadow-black/20">
                        Get Started for Free
                    </Link>
                    <Link to="/pricing" className="px-8 py-4 bg-blue-800/50 backdrop-blur-sm text-white font-bold rounded-2xl hover:bg-blue-800 transition-all border border-blue-400 hover:border-blue-300">
                        View Plans
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};