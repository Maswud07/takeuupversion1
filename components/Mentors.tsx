import React, { useState } from 'react';
import { Star, ChevronDown, Search, Check, Filter, X } from 'lucide-react';
import { Mentor } from '../types';

// Extended interface to support filtering demo
interface ExtendedMentor extends Mentor {
    level: string;
    availability: string;
}

const MOCK_MENTORS: ExtendedMentor[] = [
    { id: '1', name: 'Anika Tabassum', role: 'HSC Physics Expert', rating: 4.9, image: 'https://picsum.photos/id/64/200', subjects: ['Physics'], level: 'HSC', availability: 'Weekends' },
    { id: '2', name: 'Rahim Ahmed', role: 'University Admission Coach', rating: 4.8, image: 'https://picsum.photos/id/91/200', subjects: ['Math'], level: 'Admission', availability: 'Weekdays' },
    { id: '3', name: 'Fatima Chowdhury', role: 'Medical Prep Mentor', rating: 5.0, image: 'https://picsum.photos/id/65/200', subjects: ['Biology'], level: 'Admission', availability: 'Both' },
    { id: '4', name: 'Karim Sheikh', role: "Job Seeker's Guide", rating: 4.7, image: 'https://picsum.photos/id/103/200', subjects: ['General Knowledge'], level: 'Job', availability: 'Weekends' },
    { id: '5', name: 'Nadia Islam', role: 'SSC Chemistry Tutor', rating: 4.9, image: 'https://picsum.photos/id/338/200', subjects: ['Chemistry'], level: 'SSC', availability: 'Weekdays' },
    { id: '6', name: 'Jamal Khan', role: 'IELTS Specialist', rating: 4.8, image: 'https://picsum.photos/id/177/200', subjects: ['English'], level: 'Admission', availability: 'Both' },
    { id: '7', name: 'Saima Begum', role: 'HSC Math', rating: 5.0, image: 'https://picsum.photos/id/21/200', subjects: ['Math'], level: 'HSC', availability: 'Weekdays' },
    { id: '8', name: 'Farhan Hasan', role: 'Engineering Admission', rating: 4.6, image: 'https://picsum.photos/id/12/200', subjects: ['Physics', 'Math'], level: 'Admission', availability: 'Weekends' },
];

export const Mentors = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        subject: 'All',
        availability: 'All',
        rating: 'All',
        level: 'All'
    });

    const filterOptions: Record<string, string[]> = {
        'Subject': ['All', 'Physics', 'Math', 'Chemistry', 'Biology', 'English', 'General Knowledge'],
        'Availability': ['All', 'Weekdays', 'Weekends', 'Both'],
        'Rating': ['All', '4.5+', '4.8+', '5.0'],
        'Level (SSC/HSC)': ['All', 'SSC', 'HSC', 'Admission', 'Job']
    };

    const handleFilterSelect = (categoryLabel: string, value: string) => {
        // Map UI labels to state keys
        let key = '';
        if (categoryLabel === 'Subject') key = 'subject';
        else if (categoryLabel === 'Availability') key = 'availability';
        else if (categoryLabel === 'Rating') key = 'rating';
        else key = 'level';
        
        setFilters(prev => ({ ...prev, [key]: value }));
        setActiveDropdown(null);
    };

    const getActiveValue = (categoryLabel: string) => {
        if (categoryLabel === 'Subject') return filters.subject;
        if (categoryLabel === 'Availability') return filters.availability;
        if (categoryLabel === 'Rating') return filters.rating;
        return filters.level;
    };

    const filteredMentors = MOCK_MENTORS.filter(mentor => {
        // Text Search
        const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              mentor.subjects.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()));

        // Dropdown Filters
        const matchesSubject = filters.subject === 'All' || mentor.subjects.includes(filters.subject);
        
        const matchesAvailability = filters.availability === 'All' || 
                                    mentor.availability === filters.availability || 
                                    mentor.availability === 'Both';
        
        let matchesRating = true;
        if (filters.rating === '4.5+') matchesRating = mentor.rating >= 4.5;
        if (filters.rating === '4.8+') matchesRating = mentor.rating >= 4.8;
        if (filters.rating === '5.0') matchesRating = mentor.rating === 5.0;

        const matchesLevel = filters.level === 'All' || mentor.level === filters.level;

        return matchesSearch && matchesSubject && matchesAvailability && matchesRating && matchesLevel;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen" onClick={() => setActiveDropdown(null)}>
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Mentor</h1>
                <p className="text-slate-400">Browse and connect with top mentors to guide you on your learning journey.</p>
            </div>

            {/* Filters - Added relative z-30 to stack above grid */}
            <div className="flex flex-col lg:flex-row gap-4 mb-12 relative z-30" onClick={(e) => e.stopPropagation()}>
                {/* Search Bar */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, subject, or institution..." 
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                </div>
                
                {/* Dropdown Buttons - Changed overflow-x-auto to flex-wrap to prevent clipping */}
                <div className="flex flex-wrap gap-2">
                    {Object.keys(filterOptions).map(label => {
                        const isActive = activeDropdown === label;
                        const currentValue = getActiveValue(label);
                        const isFiltered = currentValue !== 'All';

                        return (
                            <div key={label} className="relative">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdown(isActive ? null : label);
                                    }}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl border whitespace-nowrap transition-colors ${
                                        isActive || isFiltered
                                        ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600'
                                    }`}
                                >
                                    <span className="font-medium">{label}{isFiltered && `: ${currentValue}`}</span>
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isActive && (
                                    <div 
                                        className="absolute top-full mt-2 left-0 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                                            {filterOptions[label].map(option => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleFilterSelect(label, option)}
                                                    className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between rounded-lg transition-colors ${
                                                        currentValue === option 
                                                        ? 'text-cyan-400 bg-cyan-950/50 font-bold' 
                                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                                    }`}
                                                >
                                                    {option}
                                                    {currentValue === option && <Check size={16} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    
                    {/* Clear Filters Button */}
                    {(filters.subject !== 'All' || filters.availability !== 'All' || filters.rating !== 'All' || filters.level !== 'All') && (
                        <button 
                            onClick={() => setFilters({ subject: 'All', availability: 'All', rating: 'All', level: 'All' })}
                            className="flex items-center justify-center px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors whitespace-nowrap"
                        >
                            <X size={16} className="mr-2" /> Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Grid - z-0 to stay below filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-0">
                {filteredMentors.length > 0 ? filteredMentors.map(mentor => (
                    <div key={mentor.id} className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all group flex flex-col items-center text-center hover:-translate-y-1 shadow-lg hover:shadow-cyan-900/10">
                        <div className="relative mb-4">
                            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-pink-400 group-hover:scale-105 transition-transform duration-300">
                                <img src={mentor.image} alt={mentor.name} className="w-full h-full rounded-full object-cover border-4 border-slate-900" />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-slate-900 rounded-full px-2 py-0.5 border border-slate-700 text-[10px] font-bold text-slate-300">
                                {mentor.level}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{mentor.name}</h3>
                        <p className="text-slate-400 text-sm mb-3 h-10 flex items-center justify-center">{mentor.role}</p>
                        
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                             <span className="px-2 py-1 bg-slate-900 rounded-md text-xs text-slate-400 border border-slate-700">{mentor.subjects[0]}</span>
                             <span className="px-2 py-1 bg-slate-900 rounded-md text-xs text-slate-400 border border-slate-700">{mentor.availability}</span>
                        </div>

                        <div className="flex items-center space-x-1 text-yellow-400 mb-6 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                            <Star size={14} fill="currentColor" />
                            <span className="font-bold text-sm">{mentor.rating}</span>
                        </div>
                        <button onClick={() => alert(`Opening profile for ${mentor.name}`)} className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-colors shadow-lg shadow-cyan-900/20">
                            View Profile
                        </button>
                    </div>
                )) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
                        <Search size={48} className="mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-slate-400 mb-2">No Mentors Found</h3>
                        <p>Try adjusting your filters or search query.</p>
                        <button 
                            onClick={() => {
                                setFilters({ subject: 'All', availability: 'All', rating: 'All', level: 'All' });
                                setSearchQuery('');
                            }}
                            className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};