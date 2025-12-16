import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Trophy, Target, Zap, BookOpen, Clock, ChevronRight, BrainCircuit, Crown, BarChart2, Activity, MessageSquare, Star, TrendingUp, Lock } from 'lucide-react';

export const PremiumDemo = () => {
  return (
    <div className="relative min-h-screen bg-slate-900 pb-20">
      {/* Demo Overlay Banner */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900 py-2 px-4 text-center font-bold shadow-lg flex items-center justify-center gap-4">
        <span className="flex items-center gap-2"><Crown size={20} /> You are viewing a Preview of the Premium Experience</span>
        <Link to="/pricing" className="bg-slate-900 text-yellow-500 px-4 py-1 rounded-full text-sm hover:bg-slate-800 transition-colors">
          Unlock Real Account
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-white">
                Hello, <span className="text-yellow-400">Future Topper</span>!
                </h1>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <Crown size={12} fill="currentColor" /> Premium
                </span>
            </div>
            <p className="text-slate-400">Here is what your growth could look like with TakeUUp Premium.</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded-xl border border-slate-700">
              <div className="px-4 py-2 bg-slate-900 rounded-lg flex items-center gap-2">
                  <Flame className="text-orange-500" fill="currentColor" size={20} />
                  <span className="font-bold text-white">45 Day Streak</span>
              </div>
              <div className="px-4 py-2 bg-slate-900 rounded-lg flex items-center gap-2">
                  <Trophy className="text-yellow-400" size={20} />
                  <span className="font-bold text-white">Rank #12</span>
              </div>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Advanced Analytics Card (Premium Only) */}
            <div className="md:col-span-2 bg-slate-800/60 p-6 rounded-3xl border border-slate-700 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="text-cyan-400" /> Performance Analytics
                        </h3>
                        <p className="text-slate-400 text-sm">Last 7 Days Performance</p>
                    </div>
                    <select className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none">
                        <option>Physics</option>
                        <option>Chemistry</option>
                    </select>
                </div>
                {/* CSS Chart Mockup */}
                <div className="flex items-end justify-between h-32 gap-2">
                    {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                        <div key={i} className="w-full flex flex-col items-center gap-2 group">
                            <div className="relative w-full bg-slate-900/50 rounded-t-lg h-full flex items-end overflow-hidden">
                                <div 
                                    style={{ height: `${h}%` }} 
                                    className={`w-full ${i === 6 ? 'bg-gradient-to-t from-cyan-600 to-cyan-400' : 'bg-slate-700 group-hover:bg-slate-600'} rounded-t-lg transition-all duration-500`} 
                                />
                                {i === 6 && (
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-900 text-[10px] font-bold px-1.5 rounded">
                                        +12%
                                    </div>
                                )}
                            </div>
                            <span className="text-xs text-slate-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Suggestion (Premium) */}
            <div className="md:col-span-2 bg-gradient-to-br from-purple-900/40 to-slate-900 p-1 rounded-3xl border border-purple-500/30 relative">
                <div className="h-full bg-slate-900/80 backdrop-blur-md rounded-[20px] p-6 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BrainCircuit size={100} />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                            <BrainCircuit size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">AI Mentor Insight</h3>
                            <span className="text-purple-400 text-xs font-medium">Powered by Gemini</span>
                        </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-4 flex-grow">
                        "I've analyzed your last 3 physics quizzes. You are consistently missing questions on <span className="text-white font-semibold">Thermodynamics</span>. I've prepared a 10-minute rapid fire revision for you."
                    </p>
                    <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20">
                        Start Revision <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>

        {/* Content Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Study Plan */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Target className="text-cyan-500" /> Personalized Study Plan
                    </h2>
                    <button className="text-sm text-cyan-400 hover:text-cyan-300">Edit Plan</button>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6">
                    <div className="space-y-4">
                        {[
                            { time: 'Today', task: 'Organic Chemistry: Alkanes', status: 'completed', dur: '45m' },
                            { time: 'Today', task: 'Physics: Newton\'s Laws Mock Test', status: 'pending', dur: '60m' },
                            { time: 'Tomorrow', task: 'Biology: Cell Division', status: 'locked', dur: '30m' },
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center p-4 rounded-xl border ${item.status === 'completed' ? 'bg-slate-800/50 border-slate-700 opacity-60' : item.status === 'pending' ? 'bg-slate-800 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.05)]' : 'bg-slate-900/50 border-slate-800 border-dashed'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${item.status === 'completed' ? 'bg-green-500/20 text-green-500' : item.status === 'pending' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700 text-slate-500'}`}>
                                    {item.status === 'completed' ? '✓' : item.status === 'pending' ? <Clock size={16} /> : <Lock size={16} />}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-semibold ${item.status === 'locked' ? 'text-slate-500' : 'text-slate-200'}`}>{item.task}</h4>
                                    <span className="text-xs text-slate-500">{item.time} • {item.dur}</span>
                                </div>
                                {item.status === 'pending' && (
                                    <button className="px-4 py-1.5 bg-cyan-500 text-slate-900 text-sm font-bold rounded-lg hover:bg-cyan-400">
                                        Start
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-8">
                    <BookOpen className="text-pink-500" /> Premium Materials
                </h2>
                <div className="grid grid-cols-2 gap-4">
                     {['Lecture Notes PDF', 'Model Test Papers', 'Previous Year Q&A', 'Video Explanations'].map((item, i) => (
                        <div key={i} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 hover:border-pink-500/50 transition-colors cursor-pointer group">
                             <div className="flex items-start justify-between mb-2">
                                 <div className="p-2 bg-slate-900 rounded-lg text-pink-500 group-hover:scale-110 transition-transform">
                                     <Lock size={20} />
                                 </div>
                                 <span className="text-[10px] bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded border border-pink-500/20">PRO</span>
                             </div>
                             <h3 className="font-semibold text-slate-200">{item}</h3>
                             <p className="text-xs text-slate-500 mt-1">Unlock to access</p>
                        </div>
                     ))}
                </div>
            </div>

            {/* Right: Mentor & Leaderboard */}
            <div className="space-y-6">
                 {/* Mentor Chat Widget (Premium) */}
                 <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 relative">
                     <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                         <div className="flex items-center gap-3">
                             <div className="relative">
                                 <img src="https://picsum.photos/id/64/100" className="w-10 h-10 rounded-full border-2 border-green-500" />
                                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                             </div>
                             <div>
                                 <h4 className="font-bold text-white text-sm">Dr. Ayesha</h4>
                                 <p className="text-green-400 text-xs">Online</p>
                             </div>
                         </div>
                         <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400"><MessageSquare size={18} /></button>
                     </div>
                     <div className="space-y-3 text-sm mb-4">
                         <div className="bg-slate-800 text-slate-300 p-3 rounded-2xl rounded-tl-none max-w-[90%]">
                             Hello! I noticed you struggled with the Calculus problem set.
                         </div>
                         <div className="bg-cyan-900/30 text-cyan-100 p-3 rounded-2xl rounded-tr-none max-w-[90%] ml-auto">
                             Yes, the integration parts were tricky.
                         </div>
                         <div className="bg-slate-800 text-slate-300 p-3 rounded-2xl rounded-tl-none max-w-[90%]">
                             <div className="flex gap-2">
                                <span className="animate-bounce">●</span>
                                <span className="animate-bounce delay-75">●</span>
                                <span className="animate-bounce delay-150">●</span>
                             </div>
                         </div>
                     </div>
                     <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900 to-transparent flex items-end justify-center pb-6 rounded-b-3xl">
                         <Link to="/pricing" className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-green-900/20 text-sm">
                             Unlock Chat
                         </Link>
                     </div>
                 </div>

                 {/* Premium Leaderboard */}
                 <div className="bg-gradient-to-b from-yellow-900/20 to-slate-900 rounded-3xl border border-yellow-500/20 p-6">
                     <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                         <Trophy className="text-yellow-500" /> National Rank
                     </h3>
                     <div className="space-y-4">
                         {[
                             { name: 'Rafiqul I.', score: 15400, rank: 1, avatar: 'https://picsum.photos/id/100/50' },
                             { name: 'Sarah K.', score: 15200, rank: 2, avatar: 'https://picsum.photos/id/101/50' },
                             { name: 'You (Potential)', score: 14800, rank: 3, avatar: 'https://picsum.photos/id/102/50', highlight: true },
                         ].map((u, i) => (
                             <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${u.highlight ? 'bg-yellow-500/10 border border-yellow-500/50' : 'bg-slate-800/50'}`}>
                                 <span className={`font-bold w-6 text-center ${u.rank === 1 ? 'text-yellow-400' : u.rank === 2 ? 'text-slate-300' : 'text-orange-400'}`}>{u.rank}</span>
                                 <img src={u.avatar} className="w-8 h-8 rounded-full" />
                                 <div className="flex-1">
                                     <h4 className={`text-sm font-semibold ${u.highlight ? 'text-yellow-200' : 'text-slate-200'}`}>{u.name}</h4>
                                 </div>
                                 <span className="text-xs font-mono text-slate-400">{u.score}</span>
                             </div>
                         ))}
                     </div>
                     <p className="text-center text-xs text-slate-500 mt-4">Top students get scholarships.</p>
                 </div>
            </div>
        </div>

        {/* CTA Footer */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-extrabold text-white mb-4">Ready to perform like a Pro?</h2>
                <p className="text-blue-100 mb-8 text-lg">
                    Join 50,000+ students who improved their grades with TakeUUp Premium. Get unlimited access today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/register" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                        Get Started for Free
                    </Link>
                    <Link to="/pricing" className="px-8 py-4 bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors border border-blue-500">
                        View Plans
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};