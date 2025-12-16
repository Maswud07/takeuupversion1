import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Mic, Volume2 } from 'lucide-react';

const TESTS = [1, 2, 3, 4];
const SECTIONS = [
  { name: 'Listening', icon: <Volume2 size={18} />, path: 'listening' },
  { name: 'Reading', icon: <BookOpen size={18} />, path: 'reading' },
  { name: 'Writing', icon: <PenTool size={18} />, path: 'writing' },
  { name: 'Speaking', icon: <Mic size={18} />, path: 'speaking' }
];

export const IELTSDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-3">
          IELTS 20 Academic 2025 <span className="text-yellow-400 text-2xl">✨</span>
        </h1>
        <p className="text-slate-400 mt-2">Practice with the latest Cambridge-style tests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTS.map((testNum) => (
          <div key={testNum} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-cyan-500/50 transition-all shadow-lg hover:-translate-y-1">
            <div className="p-6 border-b border-slate-700 bg-slate-850">
              <h3 className="text-xl font-bold text-white">Test {testNum}</h3>
            </div>
            <div className="p-4 space-y-2">
              {SECTIONS.map((section) => (
                <Link 
                  to={`/ielts/test/${testNum}/${section.path}`} 
                  key={section.name}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-700/50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 text-slate-300 group-hover:text-cyan-400 transition-colors">
                    {section.icon}
                    <span className="font-medium">{section.name}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-cyan-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};