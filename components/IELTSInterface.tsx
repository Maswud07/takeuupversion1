import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, ChevronRight, ChevronLeft, Eye, Clock, User, Menu, Settings } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export const IELTSInterface = () => {
    const { testId, section } = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [showScript, setShowScript] = useState(false);
    
    // Mock Duration 7:15
    const duration = 435; 

    const formatTime = (time: number) => {
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans absolute inset-0 z-[100] overflow-hidden flex flex-col">
             {/* Header */}
             <div className="h-16 border-b flex items-center justify-between px-6 bg-white sticky top-0 z-50 shrink-0">
                <div className="flex items-center gap-2">
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-slate-900">T</div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">TakeUUp</span>
                    </Link>
                </div>
                <div className="flex items-center gap-6 text-slate-600">
                    <div className="flex items-center gap-2">
                        <Clock size={20} />
                        <span className="font-mono font-medium">28:45</span>
                    </div>
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
                </div>
             </div>

             <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                 {/* Left Panel: Audio & Context */}
                 <div className="lg:w-1/2 p-4 lg:p-8 border-r overflow-y-auto bg-slate-50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-slate-900 uppercase">PART 1</h2>
                        <div className="text-slate-500 cursor-pointer hover:text-slate-800">
                            <Settings size={20} />
                        </div>
                    </div>

                    {/* Audio Player */}
                    <div className="bg-slate-200 rounded-full p-2 flex items-center gap-2 md:gap-4 mb-8 shadow-inner">
                        <button onClick={togglePlay} className="w-10 h-10 shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-1" />}
                        </button>
                        <span className="font-mono text-xs md:text-sm font-medium w-12 text-center">{formatTime(currentTime)}</span>
                        <div className="flex-1 h-1.5 bg-slate-300 rounded-full relative cursor-pointer group">
                            <div className="absolute top-0 left-0 h-full w-1/3 bg-slate-600 rounded-full" />
                            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-slate-600 rounded-full -translate-y-1/2 -translate-x-1/2 shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                         <span className="font-mono text-xs md:text-sm font-medium w-12 text-slate-500 text-center">{formatTime(duration)}</span>
                        <div className="flex items-center gap-2 px-3 border-l border-slate-300">
                             <Volume2 size={18} className="text-slate-600" />
                        </div>
                    </div>

                    {/* Audioscript Accordion */}
                    <div className="border rounded-lg bg-white overflow-hidden mb-6 shadow-sm">
                        <button 
                            onClick={() => setShowScript(!showScript)}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 font-medium transition-colors"
                        >
                            <span>Audioscript</span>
                            <ChevronRight size={18} className={`transition-transform duration-200 ${showScript ? 'rotate-90' : ''}`} />
                        </button>
                        {showScript && (
                            <div className="p-4 border-t text-sm text-slate-600 leading-relaxed bg-slate-50/50 animate-in slide-in-from-top-2">
                                <p className="mb-2"><strong>Man:</strong> Good morning, Kenton Festival box office. How can I help you?</p>
                                <p className="mb-2"><strong>Woman:</strong> Oh, good morning. I'm coming to Kenton for a few days holiday next month, and a friend told me there is a festival. She gave me this number to find out about it.</p>
                                <p className="mb-2"><strong>Man:</strong> That's right, the festival begins on the 16th of May and goes on till the 19th.</p>
                                <p><strong>Woman:</strong> Oh, that's great. I'll be there from the 15th till the 19th...</p>
                            </div>
                        )}
                    </div>
                 </div>

                 {/* Right Panel: Questions */}
                 <div className="lg:w-1/2 p-4 lg:p-8 overflow-y-auto bg-white scroll-smooth">
                    <h3 className="text-xl font-bold mb-4">Questions 1-10</h3>
                    <p className="mb-6 text-slate-700">Complete the table below.</p>
                    <p className="mb-8 font-medium text-slate-900">Write <span className="font-bold">ONE WORD AND/OR A NUMBER</span> for each answer.</p>

                    <div className="border border-slate-900 overflow-hidden min-w-[600px]">
                        {/* Header */}
                        <div className="grid grid-cols-4 bg-white text-sm font-bold border-b border-slate-900 text-center">
                            <div className="p-3 border-r border-slate-900 bg-slate-50">Name of restaurant</div>
                            <div className="p-3 border-r border-slate-900 bg-slate-50">Location</div>
                            <div className="p-3 border-r border-slate-900 bg-slate-50">Reason for recommendation</div>
                            <div className="p-3 bg-slate-50">Other comments</div>
                        </div>

                        {/* Row 1 */}
                        <div className="grid grid-cols-4 text-sm border-b border-slate-900">
                            <div className="p-3 border-r border-slate-900 font-medium">The Junction</div>
                            <div className="p-3 border-r border-slate-900">Greyson Street, near the station</div>
                            <div className="p-3 border-r border-slate-900">
                                Good for people who are especially keen on
                                <div className="mt-2 relative">
                                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full w-5 h-5 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">1</span>
                                    <input type="text" className="w-full border border-slate-300 rounded p-1.5 focus:border-blue-500 outline-none bg-slate-50/50" />
                                </div>
                            </div>
                            <div className="p-3">
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Quite expensive</li>
                                    <li>
                                        The 
                                        <span className="inline-block relative mx-1 w-24">
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">2</span>
                                            <input type="text" className="w-full border border-slate-300 rounded p-1 focus:border-blue-500 outline-none h-7 bg-slate-50/50" />
                                        </span>
                                        is a good place for a drink
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-4 text-sm border-b border-slate-900">
                            <div className="p-3 border-r border-slate-900 font-medium">Paloma</div>
                            <div className="p-3 border-r border-slate-900">
                                In Bow Street next to the cinema
                            </div>
                            <div className="p-3 border-r border-slate-900">
                                <div className="relative mb-1">
                                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full w-5 h-5 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">3</span>
                                    <input type="text" className="w-full border border-slate-300 rounded p-1.5 focus:border-blue-500 outline-none bg-slate-50/50" />
                                </div>
                                food, good for sharing
                            </div>
                            <div className="p-3">
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Staff are very friendly</li>
                                    <li>Need to pay £50 deposit</li>
                                    <li>
                                        A limited selection of
                                        <div className="mt-2 relative">
                                            <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full w-5 h-5 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">4</span>
                                            <input type="text" className="w-full border border-slate-300 rounded p-1.5 focus:border-blue-500 outline-none bg-slate-50/50" />
                                        </div>
                                        food on the menu
                                    </li>
                                </ul>
                            </div>
                        </div>

                         {/* Row 3 */}
                         <div className="grid grid-cols-4 text-sm">
                            <div className="p-3 border-r border-slate-900 font-medium">
                                The
                                <span className="inline-block relative ml-2 w-full mt-1">
                                    <span className="absolute -top-3 right-0 w-4 h-4 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">5</span>
                                    <input type="text" className="w-full border border-slate-300 rounded p-1 focus:border-blue-500 outline-none h-7 bg-slate-50/50" />
                                </span>
                            </div>
                            <div className="p-3 border-r border-slate-900">
                                At the top of a
                                <div className="mt-2 relative">
                                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full w-5 h-5 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">6</span>
                                    <input type="text" className="w-full border border-slate-300 rounded p-1.5 focus:border-blue-500 outline-none bg-slate-50/50" />
                                </div>
                            </div>
                            <div className="p-3 border-r border-slate-900">
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>A famous chef</li>
                                    <li>
                                        All the
                                        <span className="inline-block relative mx-1 w-20">
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">7</span>
                                            <input type="text" className="w-full border border-slate-300 rounded p-1 focus:border-blue-500 outline-none h-7 bg-slate-50/50" />
                                        </span>
                                        are very good
                                    </li>
                                    <li>
                                        Only uses
                                        <span className="inline-block relative mx-1 w-8">
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">8</span>
                                        </span>
                                        <input type="text" className="w-full border border-slate-300 rounded p-1 focus:border-blue-500 outline-none h-7 mt-1 bg-slate-50/50" />
                                    </li>
                                </ul>
                            </div>
                            <div className="p-3">
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>
                                        Set lunch costs £
                                        <span className="inline-block relative mx-1 w-12">
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">9</span>
                                            <input type="text" className="w-full border border-slate-300 rounded p-1 focus:border-blue-500 outline-none h-7 bg-slate-50/50" />
                                        </span>
                                        per person
                                    </li>
                                    <li>
                                        Portions probably of
                                        <div className="mt-2 relative">
                                            <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full w-5 h-5 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center bg-white shadow-sm">10</span>
                                            <input type="text" className="w-full border border-slate-300 rounded p-1.5 focus:border-blue-500 outline-none bg-slate-50/50" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                 </div>
             </div>

             {/* Footer Navigation */}
             <div className="h-16 border-t bg-white flex items-center justify-between px-6 sticky bottom-0 z-50 shrink-0 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <button className="flex items-center text-slate-600 font-medium hover:text-slate-900 transition-colors">
                    <ChevronLeft size={20} /> Scores
                </button>
                
                <div className="flex items-center gap-2">
                    <button className="w-10 h-10 bg-blue-500 text-white rounded flex items-center justify-center font-bold hover:bg-blue-600 transition-colors shadow-md">
                        <Eye size={18} />
                    </button>
                    <div className="flex border rounded overflow-hidden">
                        <button className="px-4 py-2 hover:bg-slate-100 border-r text-slate-600 font-medium">1</button>
                        <button className="px-4 py-2 bg-slate-900 text-white border-r font-medium">2</button>
                        <button className="px-4 py-2 hover:bg-slate-100 border-r text-slate-600 font-medium">3</button>
                        <button className="px-4 py-2 hover:bg-slate-100 text-slate-600 font-medium">4</button>
                    </div>
                </div>

                <Link to="/dashboard" className="flex items-center text-slate-600 font-medium hover:text-slate-900 transition-colors">
                    Reading <ChevronRight size={20} />
                </Link>
             </div>
        </div>
    );
};