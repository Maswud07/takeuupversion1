import React, { useState, useEffect } from 'react';
import { Trophy, Star, Crown, TrendingUp, TrendingDown, Minus, Medal, Shield, Lock } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { Link } from 'react-router-dom';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { id: '1', rank: 1, name: 'Anika Tasnim', points: 12500, avatar: 'https://picsum.photos/id/64/200', trend: 'up' },
    { id: '2', rank: 2, name: 'Rohan Ahmed', points: 11800, avatar: 'https://picsum.photos/id/91/200', trend: 'same' },
    { id: '3', rank: 3, name: 'Fatima Chowdhury', points: 11250, avatar: 'https://picsum.photos/id/65/200', trend: 'down' },
    { id: '4', rank: 4, name: 'You', points: 10980, avatar: 'https://picsum.photos/id/22/200', trend: 'up' },
    { id: '5', rank: 5, name: 'Sameer Khan', points: 10500, avatar: 'https://picsum.photos/id/55/200', trend: 'up' },
    { id: '6', rank: 6, name: 'Aisha Begum', points: 10230, avatar: 'https://picsum.photos/id/111/200', trend: 'same' },
    { id: '7', rank: 7, name: 'Imran Hossain', points: 9990, avatar: 'https://picsum.photos/id/33/200', trend: 'down' },
    { id: '8', rank: 8, name: 'Nadia Islam', points: 9800, avatar: 'https://picsum.photos/id/45/200', trend: 'up' },
    { id: '9', rank: 9, name: 'Karim Uddin', points: 9500, avatar: 'https://picsum.photos/id/78/200', trend: 'same' },
    { id: '10', rank: 10, name: 'Jamal Hossain', points: 9200, avatar: 'https://picsum.photos/id/99/200', trend: 'down' },
];

export const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('Daily');
  const [userPlan, setUserPlan] = useState('free');
  
  useEffect(() => {
      const userStr = localStorage.getItem('takeuup_user');
      if (userStr) {
          const u = JSON.parse(userStr);
          if (['monthly', 'yearly', 'premium', 'all-in-one'].includes(u.plan)) {
              setUserPlan('premium');
          } else {
              setUserPlan('free');
          }
      }
  }, []);

  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  
  // Free users only see up to rank 5 in the list
  const listData = userPlan === 'free' ? MOCK_LEADERBOARD.slice(3, 5) : MOCK_LEADERBOARD.slice(3);

  // Visual order for podium: 2nd, 1st, 3rd
  const visualTopThree = [topThree[1], topThree[0], topThree[2]];

  return (
    <div className="relative min-h-screen bg-slate-900 pb-20 overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
            
            {/* Header */}
            <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                    Leaderboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Legends</span>
                </h1>
                <p className="text-slate-400 text-lg">See who's leading the race to academic excellence.</p>
            </div>

            {/* Futuristic Tabs */}
            <div className="flex justify-center mb-16 animate-in fade-in zoom-in duration-500 delay-100">
                <div className="bg-slate-800/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/50 flex shadow-xl">
                    {['Daily', 'Weekly', 'National'].map((tab) => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden ${
                                activeTab === tab 
                                ? 'text-slate-900 shadow-lg scale-105' 
                                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                            {activeTab === tab && (
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500" />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 3D Podium Section */}
            <div className="flex items-end justify-center gap-4 md:gap-8 mb-16 relative perspective-1000 h-[320px]">
                {visualTopThree.map((user, index) => {
                    const isFirst = user.rank === 1;
                    const isSecond = user.rank === 2;
                    const isThird = user.rank === 3;
                    
                    return (
                        <div 
                            key={user.id} 
                            className={`flex flex-col items-center relative transition-transform duration-500 hover:scale-105 cursor-pointer group ${
                                isFirst ? 'z-20 -mb-4' : 'z-10'
                            }`}
                        >
                            {/* Avatar Container */}
                            <div className={`relative mb-4 ${isFirst ? 'animate-bounce-slow' : ''}`}>
                                {isFirst && (
                                    <Crown 
                                        size={40} 
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse" 
                                        fill="currentColor" 
                                    />
                                )}
                                <div className={`p-1 rounded-full ${
                                    isFirst ? 'bg-gradient-to-b from-yellow-300 to-yellow-600 shadow-[0_0_30px_rgba(234,179,8,0.4)]' : 
                                    isSecond ? 'bg-gradient-to-b from-slate-300 to-slate-500' : 
                                    'bg-gradient-to-b from-orange-400 to-orange-700'
                                }`}>
                                    <img 
                                        src={user.avatar} 
                                        alt={user.name} 
                                        className={`rounded-full object-cover border-4 border-slate-900 ${
                                            isFirst ? 'w-24 h-24 md:w-32 md:h-32' : 'w-20 h-20 md:w-24 md:h-24'
                                        }`} 
                                    />
                                </div>
                                <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm border-2 border-slate-900 shadow-lg text-white ${
                                     isFirst ? 'bg-yellow-500' : isSecond ? 'bg-slate-500' : 'bg-orange-600'
                                }`}>
                                    {user.rank}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center mb-2">
                                <h3 className={`font-bold truncate max-w-[120px] ${isFirst ? 'text-white text-lg' : 'text-slate-300 text-sm'}`}>{user.name}</h3>
                                <div className="flex items-center justify-center gap-1 text-xs font-mono text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded-full border border-cyan-500/20 mt-1">
                                    <Trophy size={10} /> {user.points.toLocaleString()}
                                </div>
                            </div>

                            {/* 3D Pillar */}
                            <div className={`w-24 md:w-32 lg:w-40 rounded-t-2xl relative overflow-hidden backdrop-blur-sm border-t border-white/20 shadow-2xl ${
                                isFirst 
                                ? 'h-48 bg-gradient-to-b from-yellow-900/40 to-slate-900' 
                                : isSecond 
                                ? 'h-36 bg-gradient-to-b from-slate-800/60 to-slate-900' 
                                : 'h-28 bg-gradient-to-b from-orange-900/40 to-slate-900'
                            }`}>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* List Section */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-2 md:p-6 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-8 duration-700 delay-200">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-4 p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700/50 mb-2">
                    <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                    <div className="col-span-6 md:col-span-7">Student</div>
                    <div className="col-span-4 md:col-span-4 text-right pr-4">Points</div>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-2 relative">
                    {listData.map((user) => (
                        <div 
                            key={user.id} 
                            className={`grid grid-cols-12 gap-4 items-center p-3 rounded-2xl transition-all duration-300 group hover:scale-[1.01] ${
                                user.name === 'You' 
                                ? 'bg-cyan-500/10 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                                : 'bg-slate-800/40 border border-transparent hover:bg-slate-700/50 hover:border-slate-600'
                            }`}
                        >
                            {/* Rank */}
                            <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
                                <span className={`font-bold text-lg ${user.name === 'You' ? 'text-cyan-400' : 'text-slate-400'}`}>#{user.rank}</span>
                                <div className="flex items-center justify-center mt-1">
                                    {user.trend === 'up' && <TrendingUp size={12} className="text-green-400" />}
                                    {user.trend === 'down' && <TrendingDown size={12} className="text-red-400" />}
                                    {user.trend === 'same' && <Minus size={12} className="text-slate-500" />}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="col-span-6 md:col-span-7 flex items-center gap-4">
                                <div className="relative">
                                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-slate-600 group-hover:border-slate-400 transition-colors" />
                                    {user.name === 'You' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-slate-900" />}
                                </div>
                                <div>
                                    <h4 className={`font-bold text-sm md:text-base ${user.name === 'You' ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'}`}>
                                        {user.name} {user.name === 'You' && '(You)'}
                                    </h4>
                                    <p className="text-xs text-slate-500">Dhaka College</p>
                                </div>
                            </div>

                            {/* Points */}
                            <div className="col-span-4 md:col-span-4 text-right pr-4">
                                <div className="inline-flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-700 group-hover:border-slate-500 transition-colors">
                                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                    <span className="font-mono font-bold text-white text-sm">{user.points.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Free User Blur Overlay */}
                    {userPlan === 'free' && (
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900 to-transparent flex items-end justify-center pb-8 z-10">
                            <Link to="/pricing" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:bg-slate-200 transition-colors flex items-center gap-2">
                                <Lock size={16} /> Unlock Full Leaderboard
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
        <style>{`
            @keyframes bounce-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .animate-bounce-slow {
                animation: bounce-slow 3s infinite ease-in-out;
            }
        `}</style>
    </div>
  );
};