import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, ChevronDown, ChevronLeft, Filter, Eye, EyeOff, FlaskConical, Atom, Calculator, Dna, Globe, Briefcase, GraduationCap, Building2, Stethoscope, Menu, X, FileText, Download, Play, Clock, CheckCircle2, RefreshCcw, AlertCircle, Check, XCircle } from 'lucide-react';

// --- DATA STRUCTURES ---

const EXAM_HIERARCHY = [
  {
    id: 'university',
    label: 'University Admission',
    icon: <GraduationCap size={18} />,
    institutions: [
      {
        id: 'du',
        label: 'Dhaka University',
        exams: ['A Unit 2023', 'A Unit 2022', 'A Unit 2021', 'B Unit 2023', 'B Unit 2022', 'C Unit 2023']
      },
      {
        id: 'ju',
        label: 'Jahangirnagar University',
        exams: ['A Unit 2023', 'D Unit 2023', 'C Unit 2022']
      },
      {
        id: 'ru',
        label: 'Rajshahi University',
        exams: ['A Unit 2022', 'B Unit 2022']
      },
      {
        id: 'cu',
        label: 'Chittagong University',
        exams: ['A Unit 2022', 'B Unit 2021']
      }
    ]
  },
  {
    id: 'engineering',
    label: 'Engineering',
    icon: <Atom size={18} />,
    institutions: [
      {
        id: 'buet',
        label: 'BUET',
        exams: ['Admission 2022', 'Admission 2021', 'Admission 2020', 'Admission 2019']
      },
      {
        id: 'ckruet',
        label: 'CKRUET (Combined)',
        exams: ['Admission 2022', 'Admission 2021']
      },
      {
        id: 'butex',
        label: 'BUTEX',
        exams: ['Admission 2022']
      }
    ]
  },
  {
    id: 'medical',
    label: 'Medical',
    icon: <Stethoscope size={18} />,
    institutions: [
      {
        id: 'mbbs',
        label: 'Medical (MBBS)',
        exams: ['Admission Test 2023', 'Admission Test 2022', 'Admission Test 2021', 'Admission Test 2020']
      },
      {
        id: 'dental',
        label: 'Dental (BDS)',
        exams: ['Admission Test 2022', 'Admission Test 2021']
      }
    ]
  },
  {
    id: 'job',
    label: 'Job Recruitment',
    icon: <Briefcase size={18} />,
    institutions: [
      {
        id: 'bcs',
        label: 'BCS Preliminary',
        exams: ['45th BCS', '44th BCS', '43rd BCS', '41st BCS', '40th BCS']
      },
      {
        id: 'bank',
        label: 'Bank Jobs',
        exams: ['Bangladesh Bank AD 2023', 'Sonali Bank Officer 2022', 'Combined SO 2021']
      },
      {
        id: 'ntrca',
        label: 'NTRCA',
        exams: ['17th NTRCA', '16th NTRCA']
      }
    ]
  }
];

// Expanded Mock Data
const QUESTIONS = [
  // Dhaka University Mock Data
  {
    id: 101,
    subject: "Physics",
    topic: "Thermodynamics",
    question: "Which law of thermodynamics implies that no heat engine can have 100% efficiency?",
    options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
    answer: "Second Law",
    explanation: "The Second Law states that entropy always increases in an isolated system, and heat cannot spontaneously flow from a colder to a hotter body.",
    exam: "A Unit 2023",
    institutionId: "du",
    difficulty: "Medium"
  },
  {
    id: 102,
    subject: "Physics",
    topic: "Vector",
    question: "If A = 2i + 3j and B = -i + 2j, what is the dot product A·B?",
    options: ["4", "8", "-4", "0"],
    answer: "4",
    explanation: "Dot product = (2*-1) + (3*2) = -2 + 6 = 4.",
    exam: "A Unit 2023",
    institutionId: "du",
    difficulty: "Easy"
  },
  {
    id: 103,
    subject: "Chemistry",
    topic: "Organic Chemistry",
    question: "Which reagent is used to distinguish between Aldehyde and Ketone?",
    options: ["Lucas Reagent", "Tollens' Reagent", "Baeyer's Reagent", "Grignard Reagent"],
    answer: "Tollens' Reagent",
    explanation: "Aldehydes reduce Tollens' reagent to metallic silver (silver mirror test), but ketones do not.",
    exam: "A Unit 2022",
    institutionId: "du",
    difficulty: "Medium"
  },
  
  // BUET Mock Data
  {
    id: 201,
    subject: "Math",
    topic: "Calculus",
    question: "Find the limit: lim(x->0) (sin x)/x",
    options: ["0", "1", "Infinity", "Undefined"],
    answer: "1",
    explanation: "This is a standard limit theorem result. It can also be proven using L'Hôpital's rule.",
    exam: "Admission 2022",
    institutionId: "buet",
    difficulty: "Medium"
  },
  {
    id: 202,
    subject: "Physics",
    topic: "Mechanics",
    question: "A projectile is fired at 45 degrees. If initial velocity is u, what is the range?",
    options: ["u²/g", "u²/2g", "2u²/g", "u/g"],
    answer: "u²/g",
    explanation: "Range R = (u² sin 2θ) / g. For θ=45°, sin(90°) = 1, so R = u²/g.",
    exam: "Admission 2021",
    institutionId: "buet",
    difficulty: "Hard"
  },

  // Medical Mock Data
  {
    id: 301,
    subject: "Biology",
    topic: "Human Body",
    question: "Which blood group is known as the universal donor?",
    options: ["A Positive", "B Negative", "O Negative", "AB Positive"],
    answer: "O Negative",
    explanation: "O Negative blood has no antigens on the red blood cells, minimizing immune reaction risks.",
    exam: "Admission Test 2023",
    institutionId: "mbbs",
    difficulty: "Easy"
  },
  {
    id: 302,
    subject: "Chemistry",
    topic: "Acids and Bases",
    question: "What is the pH of human blood?",
    options: ["6.5 - 6.8", "7.0", "7.35 - 7.45", "8.1 - 8.3"],
    answer: "7.35 - 7.45",
    explanation: "Human blood is slightly alkaline, strictly maintained between 7.35 and 7.45.",
    exam: "Admission Test 2022",
    institutionId: "mbbs",
    difficulty: "Easy"
  },

  // BCS Mock Data (Expanded for Demo)
  {
    id: 401,
    subject: "General Knowledge",
    topic: "Bangladesh Affairs",
    question: "Who was the architect of the National Monument (Jatiyo Smriti Soudho)?",
    options: ["Hamidur Rahman", "Syed Mainul Hossain", "F.R. Khan", "Novera Ahmed"],
    answer: "Syed Mainul Hossain",
    explanation: "Syed Mainul Hossain designed the National Monument in Savar.",
    exam: "45th BCS",
    institutionId: "bcs",
    difficulty: "Medium"
  },
  {
    id: 402,
    subject: "English",
    topic: "Literature",
    question: "Who wrote the play 'Hamlet'?",
    options: ["Christopher Marlowe", "William Shakespeare", "John Milton", "Ben Jonson"],
    answer: "William Shakespeare",
    explanation: "Hamlet is one of Shakespeare's most famous tragedies.",
    exam: "45th BCS",
    institutionId: "bcs",
    difficulty: "Easy"
  },
  {
    id: 403,
    subject: "General Knowledge",
    topic: "International Affairs",
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "South Korea", "Thailand"],
    answer: "Japan",
    explanation: "Japan is called the Land of the Rising Sun because it is one of the easternmost countries.",
    exam: "45th BCS",
    institutionId: "bcs",
    difficulty: "Easy"
  },
  {
    id: 404,
    subject: "Math",
    topic: "Arithmetic",
    question: "If the price of a product is increased by 20% and then decreased by 20%, what is the net change?",
    options: ["No change", "4% increase", "4% decrease", "10% decrease"],
    answer: "4% decrease",
    explanation: "Let price be 100. Increase 20% -> 120. Decrease 20% of 120 (24) -> 96. Net change is 100 - 96 = 4% decrease.",
    exam: "45th BCS",
    institutionId: "bcs",
    difficulty: "Hard"
  },
  {
    id: 405,
    subject: "General Science",
    topic: "Physics",
    question: "What is the unit of power?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    answer: "Watt",
    explanation: "Power is the rate of doing work. Its unit is the Watt (W).",
    exam: "45th BCS",
    institutionId: "bcs",
    difficulty: "Easy"
  }
];

const ICONS: Record<string, React.ReactNode> = {
    'Physics': <Atom size={16} className="text-blue-400" />,
    'Chemistry': <FlaskConical size={16} className="text-green-400" />,
    'Math': <Calculator size={16} className="text-red-400" />,
    'Biology': <Dna size={16} className="text-purple-400" />,
    'ICT': <Globe size={16} className="text-cyan-400" />,
    'English': <BookOpen size={16} className="text-orange-400" />,
    'General Knowledge': <Globe size={16} className="text-teal-400" />,
    'General Science': <Atom size={16} className="text-blue-400" />,
};

export const QuestionBank = () => {
    // Navigation State
    const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);
    const [selectedExam, setSelectedExam] = useState<string | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<string | null>('university');
    
    // View Mode: 'browse' (default list), 'study' (exam specific), 'test' (taking quiz)
    const [viewMode, setViewMode] = useState<'browse' | 'study' | 'test'>('browse');

    // UI State
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedAnswerId, setExpandedAnswerId] = useState<number | null>(null);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    // Test Mode State
    const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
    const [testSubmitted, setTestSubmitted] = useState(false);
    const [testTime, setTestTime] = useState(0);

    // Filtering Logic
    const filteredQuestions = useMemo(() => {
        return QUESTIONS.filter(q => {
            // Level 1: Filter by Institution (if selected)
            if (selectedInstitution && q.institutionId !== selectedInstitution) return false;
            
            // Level 2: Filter by specific Exam (if selected)
            if (selectedExam && q.exam !== selectedExam) return false;

            // Level 3: Search text match
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                return q.question.toLowerCase().includes(term) || 
                       q.topic.toLowerCase().includes(term) ||
                       q.subject.toLowerCase().includes(term);
            }

            return true;
        });
    }, [selectedInstitution, selectedExam, searchTerm]);

    // Timer for Test Mode
    useEffect(() => {
        let interval: any;
        if (viewMode === 'test' && !testSubmitted) {
            interval = setInterval(() => setTestTime(prev => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [viewMode, testSubmitted]);

    const toggleAnswer = (id: number) => {
        if (viewMode === 'test') return; // Disable answer toggling in test mode
        setExpandedAnswerId(expandedAnswerId === id ? null : id);
    };

    const handleSelectExam = (instId: string, examName: string) => {
        setSelectedInstitution(instId);
        setSelectedExam(examName);
        setShowMobileSidebar(false);
        setViewMode('study'); // Default to study mode when exam is selected
        setSearchTerm(''); // Clear search when switching context
    };

    const handleResetFilters = () => {
        setSelectedInstitution(null);
        setSelectedExam(null);
        setSearchTerm('');
        setViewMode('browse');
    };

    const handleStartTest = () => {
        setTestAnswers({});
        setTestSubmitted(false);
        setTestTime(0);
        setViewMode('test');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmitTest = () => {
        // Smart Submit: Only confirm if incomplete
        const answeredCount = Object.keys(testAnswers).length;
        if (answeredCount < filteredQuestions.length) {
            if (!window.confirm(`You answered ${answeredCount} of ${filteredQuestions.length} questions. Submit anyway?`)) {
                return;
            }
        }
        
        setTestSubmitted(true);
        // Scroll to top for score, but we also show a summary at bottom now
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDownloadPDF = () => {
        alert("Downloading PDF... (Mock functionality)");
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Calculate Test Score
    const testScore = useMemo(() => {
        if (!testSubmitted) return 0;
        return filteredQuestions.reduce((score, q) => {
            if (testAnswers[q.id] === q.answer) return score + 1;
            return score;
        }, 0);
    }, [testSubmitted, testAnswers, filteredQuestions]);

    // Helper to get display title
    const getPageTitle = () => {
        if (selectedExam) return selectedExam;
        if (selectedInstitution) {
            const inst = EXAM_HIERARCHY.flatMap(c => c.institutions).find(i => i.id === selectedInstitution);
            return inst ? `${inst.label} Archive` : 'Institution Archive';
        }
        return 'Question Bank Archive';
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 min-h-screen">
            
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-6 flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                <span className="font-bold text-white truncate pr-2">{getPageTitle()}</span>
                <button 
                    onClick={() => setShowMobileSidebar(true)}
                    className="flex items-center gap-2 text-cyan-400 font-medium text-sm"
                >
                    <Filter size={16} /> Browse
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                
                {/* --- LEFT SIDEBAR (Navigation) --- */}
                <aside className={`
                    fixed md:static inset-0 z-50 bg-slate-900 md:bg-transparent md:w-80 md:block flex-shrink-0
                    ${showMobileSidebar ? 'block' : 'hidden'}
                `}>
                    <div className="h-full flex flex-col p-6 md:p-0">
                        <div className="md:hidden flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Browse Archive</h2>
                            <button onClick={() => setShowMobileSidebar(false)} className="text-slate-400"><X /></button>
                        </div>

                        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden h-fit md:sticky md:top-24">
                            <div className="p-4 bg-slate-900 border-b border-slate-700 flex justify-between items-center">
                                <h3 className="font-bold text-slate-300 uppercase tracking-wider text-xs flex items-center gap-2">
                                    <BookOpen size={14} /> Categories
                                </h3>
                                {selectedExam && (
                                    <button onClick={handleResetFilters} className="text-xs text-cyan-400 hover:text-white">
                                        Reset
                                    </button>
                                )}
                            </div>
                            
                            <div className="max-h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar">
                                {EXAM_HIERARCHY.map((cat) => (
                                    <div key={cat.id} className="border-b border-slate-800 last:border-0">
                                        <button 
                                            onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                            className={`w-full flex items-center justify-between p-4 hover:bg-slate-800 transition-colors ${expandedCategory === cat.id ? 'bg-slate-800' : ''}`}
                                        >
                                            <div className="flex items-center gap-3 text-white font-medium">
                                                <span className={`${expandedCategory === cat.id ? 'text-cyan-400' : 'text-slate-500'}`}>{cat.icon}</span>
                                                {cat.label}
                                            </div>
                                            <ChevronDown size={16} className={`text-slate-500 transition-transform ${expandedCategory === cat.id ? 'rotate-180' : ''}`} />
                                        </button>

                                        {expandedCategory === cat.id && (
                                            <div className="bg-slate-900/50 pb-2">
                                                {cat.institutions.map(inst => (
                                                    <div key={inst.id} className="mb-1">
                                                        <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase mt-2 pl-12">
                                                            {inst.label}
                                                        </div>
                                                        <div className="pl-4 border-l border-slate-800 ml-8 space-y-1">
                                                            {inst.exams.map(exam => (
                                                                <button
                                                                    key={exam}
                                                                    onClick={() => handleSelectExam(inst.id, exam)}
                                                                    className={`w-full text-left px-4 py-2 text-sm rounded-r-lg border-l-2 transition-all ${
                                                                        selectedExam === exam && selectedInstitution === inst.id
                                                                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-semibold'
                                                                        : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800'
                                                                    }`}
                                                                >
                                                                    {exam}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- RIGHT CONTENT --- */}
                <main className="flex-1 min-w-0">
                    
                    {/* Header Section */}
                    <div className="mb-8">
                        {selectedExam ? (
                             // EXAM SPECIFIC HEADER
                            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                                
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2 py-0.5 rounded border border-cyan-500/30">
                                                {selectedInstitution?.toUpperCase()}
                                            </span>
                                            {viewMode === 'test' && !testSubmitted && (
                                                <span className="bg-red-500/20 text-red-300 text-xs font-bold px-2 py-0.5 rounded border border-red-500/30 animate-pulse flex items-center gap-1">
                                                    <Clock size={12} /> Live Test
                                                </span>
                                            )}
                                        </div>
                                        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                                            {selectedExam} Question Set
                                        </h1>
                                        <p className="text-slate-400 text-sm flex items-center gap-4">
                                            <span>{filteredQuestions.length} Questions</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                                            <span>Full Marks: {filteredQuestions.length}</span>
                                            {viewMode === 'test' && (
                                                <>
                                                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                                                    <span className="font-mono text-cyan-400 font-bold">{formatTime(testTime)}</span>
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                                        {viewMode === 'test' ? (
                                            !testSubmitted && (
                                                <button 
                                                    onClick={() => setViewMode('study')}
                                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg text-sm transition-colors"
                                                >
                                                    Cancel Test
                                                </button>
                                            )
                                        ) : (
                                            <>
                                                <button 
                                                    onClick={handleDownloadPDF}
                                                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg text-sm transition-colors"
                                                >
                                                    <Download size={16} /> PDF
                                                </button>
                                                <button 
                                                    onClick={handleStartTest}
                                                    className="flex items-center gap-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg text-sm transition-colors shadow-lg shadow-cyan-500/20"
                                                >
                                                    <Play size={16} fill="currentColor" /> Start Test
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {testSubmitted && (
                                    <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700 flex items-center justify-between animate-in slide-in-from-top-2">
                                        <div>
                                            <span className="text-slate-400 text-sm block">Your Score</span>
                                            <span className="text-3xl font-bold text-white flex items-end gap-2">
                                                {testScore} 
                                                <span className="text-slate-500 text-lg font-medium mb-1">/ {filteredQuestions.length}</span>
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={handleStartTest} className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg text-sm font-bold hover:bg-slate-600 transition-colors">
                                                <RefreshCcw size={14} /> Retake
                                            </button>
                                            <button onClick={() => setViewMode('study')} className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm font-bold hover:bg-cyan-500/20 transition-colors border border-cyan-500/30">
                                                <FileText size={14} /> Study Answers
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // DEFAULT BROWSE HEADER
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                                        Question Bank Archive
                                    </h1>
                                    <p className="text-slate-400 text-sm">Select an exam category to start practicing.</p>
                                </div>
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="Search questions..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="space-y-4">
                        {filteredQuestions.length > 0 ? (
                            filteredQuestions.map((q, index) => (
                                <div 
                                    key={q.id} 
                                    className={`bg-slate-800 rounded-2xl border transition-all duration-300 overflow-hidden ${
                                        (expandedAnswerId === q.id && viewMode !== 'test')
                                        ? 'border-cyan-500/50 shadow-neon-sm' 
                                        : 'border-slate-700 hover:border-slate-600'
                                    }`}
                                >
                                    <div 
                                        onClick={() => toggleAnswer(q.id)}
                                        className={`p-5 md:p-6 flex gap-4 ${viewMode === 'test' ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        {/* Question Index for Test Mode */}
                                        <div className="flex-shrink-0 pt-0.5">
                                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                                                viewMode === 'test' && testAnswers[q.id]
                                                ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20' 
                                                : 'bg-slate-900 border border-slate-700 text-slate-400'
                                            }`}>
                                                {index + 1}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            {/* Tags */}
                                            {viewMode !== 'test' && (
                                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300">
                                                        {ICONS[q.subject] || <BookOpen size={14} />}
                                                        {q.subject}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded-md border text-xs font-bold ${
                                                        q.difficulty === 'Easy' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                                        q.difficulty === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/10 border-red-500/20 text-red-400'
                                                    }`}>
                                                        {q.difficulty}
                                                    </span>
                                                </div>
                                            )}

                                            <h3 className="text-lg font-medium text-white leading-relaxed mb-4">
                                                {q.question}
                                            </h3>

                                            {/* Options for Test Mode */}
                                            {viewMode === 'test' && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                                    {q.options?.map((opt, i) => {
                                                        const isSelected = testAnswers[q.id] === opt;
                                                        const isCorrect = opt === q.answer;
                                                        
                                                        let btnClass = "bg-slate-900 border-slate-700 hover:bg-slate-700 text-slate-300";
                                                        
                                                        if (testSubmitted) {
                                                            if (isCorrect) btnClass = "bg-green-500/20 border-green-500 text-green-400";
                                                            else if (isSelected && !isCorrect) btnClass = "bg-red-500/20 border-red-500 text-red-400 opacity-60";
                                                            else btnClass = "bg-slate-900 border-slate-700 opacity-30";
                                                        } else if (isSelected) {
                                                            btnClass = "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50";
                                                        }

                                                        return (
                                                            <button
                                                                key={i}
                                                                disabled={testSubmitted}
                                                                onClick={(e) => { e.stopPropagation(); setTestAnswers({...testAnswers, [q.id]: opt}); }}
                                                                className={`p-3 rounded-xl border text-left text-sm font-medium transition-all duration-200 flex items-center justify-between ${btnClass}`}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                                                        isSelected 
                                                                        ? (testSubmitted ? (isCorrect ? 'bg-green-500 text-slate-900' : 'bg-red-500 text-white') : 'bg-cyan-500 text-slate-900') 
                                                                        : 'bg-slate-800 text-slate-500'
                                                                    }`}>
                                                                        {String.fromCharCode(65 + i)}
                                                                    </span>
                                                                    {opt}
                                                                </div>
                                                                
                                                                {testSubmitted && isCorrect && <Check size={18} className="text-green-400" />}
                                                                {testSubmitted && isSelected && !isCorrect && <XCircle size={18} className="text-red-400" />}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            )}

                                            {/* Explanation for Test Mode (After Submit) */}
                                            {viewMode === 'test' && testSubmitted && (
                                                <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 text-sm animate-in slide-in-from-top-2">
                                                    <div className="flex gap-2 text-slate-300">
                                                        <AlertCircle size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                                                        <div>
                                                            <span className="font-bold text-cyan-400 block mb-1">Explanation</span>
                                                            <p className="leading-relaxed">{q.explanation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Toggle Icon for Study Mode */}
                                        {viewMode !== 'test' && (
                                            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                                expandedAnswerId === q.id 
                                                ? 'bg-cyan-500 text-slate-900' 
                                                : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                                            }`}>
                                                {expandedAnswerId === q.id ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </div>
                                        )}
                                    </div>

                                    {/* Expanded Answer Section (Study Mode Only) */}
                                    {expandedAnswerId === q.id && viewMode !== 'test' && (
                                        <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-200">
                                            <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-700/50 relative overflow-hidden">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-cyan-500" />
                                                
                                                <div className="mb-4">
                                                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Correct Answer</span>
                                                    <span className="text-lg font-bold text-white text-glow">{q.answer}</span>
                                                </div>
                                                
                                                <div>
                                                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Explanation</span>
                                                    <p className="text-slate-300 leading-relaxed text-sm">
                                                        {q.explanation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-slate-800 border-dashed">
                                <Filter size={48} className="mx-auto text-slate-600 mb-4" />
                                <h3 className="text-xl font-bold text-slate-400 mb-2">No Questions Found</h3>
                                <p className="text-slate-500 max-w-md mx-auto">
                                    We couldn't find any questions matching your filters. Try selecting a different exam year or institution.
                                </p>
                                <button 
                                    onClick={handleResetFilters}
                                    className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                                >
                                    View All Questions
                                </button>
                            </div>
                        )}
                        
                        {/* Pagination or End of List & Submit Button */}
                        {filteredQuestions.length > 0 && (
                             <div className="mt-8 text-center pt-8 border-t border-slate-800/50 pb-12">
                                {viewMode === 'test' && !testSubmitted ? (
                                    <button 
                                        onClick={handleSubmitTest}
                                        className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                                    >
                                        <CheckCircle2 size={20} /> Submit Test
                                    </button>
                                ) : viewMode === 'test' && testSubmitted ? (
                                     <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 inline-block shadow-2xl animate-in zoom-in-95">
                                        <h3 className="text-xl font-bold text-white mb-2">Test Submitted!</h3>
                                        <p className="text-slate-400 mb-4">You scored <span className="text-cyan-400 font-bold text-xl">{testScore} / {filteredQuestions.length}</span></p>
                                        <div className="flex gap-4 justify-center">
                                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 font-medium transition-colors">View Details</button>
                                            <button onClick={handleStartTest} className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/20">Retake Test</button>
                                        </div>
                                     </div>
                                ) : (
                                    <p className="text-slate-500 text-sm mb-4">
                                        End of list.
                                    </p>
                                )}
                             </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};