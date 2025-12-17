import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, CheckCircle2, XCircle, AlertCircle, RefreshCcw, LayoutDashboard, Trophy, Target, Zap, Share2, BarChart2, BrainCircuit, BookOpen, Briefcase, GraduationCap, Globe, ChevronLeft, Lock, Crown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Question } from '../types';
import { useLanguage } from '../LanguageContext';

// Define Categories
const QUIZ_CATEGORIES = [
    { id: 'HSC', label: 'HSC Academic', icon: <BookOpen size={32} />, color: 'from-purple-500 to-indigo-600', desc: 'Physics, Chemistry, Math, Biology' },
    { id: 'Admission', label: 'University Admission', icon: <GraduationCap size={32} />, color: 'from-blue-500 to-cyan-500', desc: 'DU, JU, RU, CU Preparation' },
    { id: 'Job', label: 'Job Preparation', icon: <Briefcase size={32} />, color: 'from-emerald-500 to-green-600', desc: 'Bank, NTRCA, Primary Govt. Jobs' },
    { id: 'BCS', label: 'BCS Preliminary', icon: <Globe size={32} />, color: 'from-orange-500 to-red-600', desc: 'General Knowledge, Bangla, Affairs' },
    { id: 'Medical', label: 'Medical Admission', icon: <Target size={32} />, color: 'from-pink-500 to-rose-600', desc: 'Biology & Chemistry Focus' },
    { id: 'Engineering', label: 'Engineering', icon: <Zap size={32} />, color: 'from-slate-700 to-slate-900', desc: 'Advanced Math & Physics' },
];

// Enhanced Mock Data to support 30 questions
const BASE_QUESTIONS: Question[] = [
  {
    id: '1',
    text: "Physics: Which law of thermodynamics states that 'Entropy of an isolated system always increases'?",
    options: [{ id: 'A', text: 'Zeroth Law' }, { id: 'B', text: 'First Law' }, { id: 'C', text: 'Second Law' }, { id: 'D', text: 'Third Law' }],
    correctOptionId: 'C',
    explanation: "The Second Law of Thermodynamics introduces the concept of entropy.",
    category: "HSC",
    difficulty: "medium"
  },
  {
    id: '2',
    text: "Chemistry: What is the hybridization of the carbon atom in a Methane (CH4) molecule?",
    options: [{ id: 'A', text: 'sp' }, { id: 'B', text: 'sp2' }, { id: 'C', text: 'sp3' }, { id: 'D', text: 'dsp2' }],
    correctOptionId: 'C',
    explanation: "Carbon in methane forms 4 sigma bonds, resulting in sp3 hybridization.",
    category: "HSC",
    difficulty: "medium"
  },
  {
    id: '3',
    text: "Biology: Which hormone is primarily responsible for lowering blood glucose levels?",
    options: [{ id: 'A', text: 'Glucagon' }, { id: 'B', text: 'Insulin' }, { id: 'C', text: 'Adrenaline' }, { id: 'D', text: 'Thyroxin' }],
    correctOptionId: 'B',
    explanation: "Insulin allows cells to take in glucose, lowering blood sugar.",
    category: "Medical",
    difficulty: "easy"
  },
  {
    id: '4',
    text: "Math: What is the derivative of sin(x) with respect to x?",
    options: [{ id: 'A', text: 'cos(x)' }, { id: 'B', text: '-cos(x)' }, { id: 'C', text: 'tan(x)' }, { id: 'D', text: '-sin(x)' }],
    correctOptionId: 'A',
    explanation: "The derivative of sin(x) is cos(x).",
    category: "HSC",
    difficulty: "easy"
  },
  {
    id: '5',
    text: "ICT: Which protocol is standard for sending emails across the Internet?",
    options: [{ id: 'A', text: 'HTTP' }, { id: 'B', text: 'FTP' }, { id: 'C', text: 'SMTP' }, { id: 'D', text: 'POP3' }],
    correctOptionId: 'C',
    explanation: "SMTP is used for sending emails.",
    category: "Job",
    difficulty: "medium"
  },
  {
    id: '6',
    text: "English: Choose the correct synonym for 'Ephemeral'.",
    options: [{ id: 'A', text: 'Lasting' }, { id: 'B', text: 'Short-lived' }, { id: 'C', text: 'Eternal' }, { id: 'D', text: 'Concrete' }],
    correctOptionId: 'B',
    explanation: "Ephemeral means lasting for a very short time.",
    category: "Admission",
    difficulty: "hard"
  },
  {
    id: '7',
    text: "GK: Who was the architect of the National Parliament House of Bangladesh?",
    options: [{ id: 'A', text: 'F.R. Khan' }, { id: 'B', text: 'Mazharul Islam' }, { id: 'C', text: 'Louis I. Kahn' }, { id: 'D', text: 'Hamidur Rahman' }],
    correctOptionId: 'C',
    explanation: "Louis Isadore Kahn designed the Jatiya Sangsad Bhaban.",
    category: "BCS",
    difficulty: "medium"
  },
  {
    id: '8',
    text: "Physics: What is the escape velocity required to leave Earth's gravitational field?",
    options: [{ id: 'A', text: '9.8 km/s' }, { id: 'B', text: '11.2 km/s' }, { id: 'C', text: '29.8 km/s' }, { id: 'D', text: '42.1 km/s' }],
    correctOptionId: 'B',
    explanation: "Escape velocity for Earth is approx 11.2 km/s.",
    category: "Engineering",
    difficulty: "hard"
  },
  {
    id: '9',
    text: "Chemistry: Which gas is naturally produced by ripening fruits?",
    options: [{ id: 'A', text: 'Oxygen' }, { id: 'B', text: 'Methane' }, { id: 'C', text: 'Ethylene' }, { id: 'D', text: 'Nitrogen' }],
    correctOptionId: 'C',
    explanation: "Ethylene is the plant hormone for ripening.",
    category: "HSC",
    difficulty: "medium"
  },
  {
    id: '10',
    text: "ICT: In binary arithmetic, what is 10 + 10?",
    options: [{ id: 'A', text: '20' }, { id: 'B', text: '100' }, { id: 'C', text: '110' }, { id: 'D', text: '11' }],
    correctOptionId: 'B',
    explanation: "10 (binary) is 2. 2+2=4. 4 is 100 in binary.",
    category: "Job",
    difficulty: "hard"
  }
];

// Generate Filler Questions to reach 400+ for Premium demo to ensure dense coverage
const ALL_MOCK_QUESTIONS: Question[] = [...BASE_QUESTIONS];
const TOPICS = ['Physics', 'Math', 'Chemistry', 'Biology', 'GK', 'English', 'ICT', 'Bangla'];
const CAT_POOL = ['HSC', 'Admission', 'Job', 'BCS', 'Engineering', 'Medical'];

for (let i = 11; i <= 400; i++) {
    const subject = TOPICS[i % TOPICS.length];
    // Rotate categories to ensure equal distribution
    const category = CAT_POOL[i % CAT_POOL.length];
    
    ALL_MOCK_QUESTIONS.push({
        id: i.toString(),
        text: `${subject} Mock Question #${i}: This is a sample premium question to demonstrate the 30-question limit capability for ${category} students.`,
        options: [{ id: 'A', text: 'Option A' }, { id: 'B', text: 'Option B (Correct)' }, { id: 'C', text: 'Option C' }, { id: 'D', text: 'Option D' }],
        correctOptionId: 'B',
        explanation: "This is a detailed explanation available for this premium question generated for the demo.",
        category: category,
        difficulty: i % 3 === 0 ? "hard" : "medium"
    });
}

export const QuizInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const TOTAL_TIME = 600; // 10 minutes
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(TOTAL_TIME); 
  
  // Track all user answers: map question ID to selected Option ID
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  const { t } = useLanguage();

  // User State & Limits
  const [userPlan, setUserPlan] = useState<'free' | 'premium' | 'yearly'>('free');
  const [dailyAttempts, setDailyAttempts] = useState(0);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
      // Check User Plan
      const userStr = localStorage.getItem('takeuup_user');
      if (userStr) {
          const u = JSON.parse(userStr);
          if (['monthly', 'yearly', 'premium', 'all-in-one'].includes(u.plan)) {
              setUserPlan('premium');
          } else {
              setUserPlan('free');
          }
      }

      // Check Daily Attempts
      const today = new Date().toDateString();
      const attemptsStr = localStorage.getItem('quiz_attempts');
      if (attemptsStr) {
          const data = JSON.parse(attemptsStr);
          if (data.date === today) {
              setDailyAttempts(data.count);
          } else {
              // Reset if new day
              localStorage.setItem('quiz_attempts', JSON.stringify({ date: today, count: 0 }));
              setDailyAttempts(0);
          }
      } else {
          localStorage.setItem('quiz_attempts', JSON.stringify({ date: today, count: 0 }));
      }

      // Check for navigation state (Instant Start)
      if (location.state?.category) {
          setSelectedCategory(location.state.category);
          if (location.state.subject) {
              setSelectedSubject(location.state.subject);
          }
      }
  }, [location.state]);

  // Load questions based on category & plan
  // Added userPlan to dependency array to ensure re-calculation if plan loads late
  useEffect(() => {
      if (selectedCategory) {
          // Check Limits for Free User (Using the current values at time of category selection)
          if (userPlan === 'free' && dailyAttempts >= 3) {
              setLimitReached(true);
              return;
          }

          let filtered = [];
          
          // Primary Filter: Category
          if (selectedCategory === 'HSC') {
              filtered = ALL_MOCK_QUESTIONS.filter(q => q.category === 'HSC' || q.category === 'Engineering' || q.category === 'Medical');
          } else if (selectedCategory === 'Admission') {
              filtered = ALL_MOCK_QUESTIONS.filter(q => q.category === 'Admission' || q.category === 'HSC' || q.category === 'Engineering');
          } else if (selectedCategory === 'Job' || selectedCategory === 'BCS') {
              filtered = ALL_MOCK_QUESTIONS.filter(q => q.category === 'Job' || q.category === 'BCS' || q.category === 'Admission');
          } else if (selectedCategory === 'Engineering') {
              filtered = ALL_MOCK_QUESTIONS.filter(q => q.category === 'Engineering' || q.category === 'HSC');
          } else if (selectedCategory === 'Medical') {
              filtered = ALL_MOCK_QUESTIONS.filter(q => q.category === 'Medical' || q.category === 'HSC');
          } else {
              // Generic fallback or specific custom categories passed from dashboard
              filtered = ALL_MOCK_QUESTIONS; 
          }

          // Question Count Logic
          const questionLimit = userPlan === 'free' ? 10 : 30;

          // Secondary Filter: Specific Subject (if passed from Dashboard)
          if (selectedSubject) {
              // Simple text matching for mock data since we don't have a structured subject field in mock data yet
              // Mapping "General Knowledge" to "GK"
              const subjectSearch = selectedSubject === "General Knowledge" ? "GK" : selectedSubject;
              const subjectFiltered = filtered.filter(q => q.text.startsWith(subjectSearch) || q.text.startsWith(selectedSubject));
              
              if (subjectFiltered.length >= questionLimit) {
                  filtered = subjectFiltered;
              } else {
                  // Fallback: If not enough questions found for specific subject in mock data, 
                  // fill the remaining slots with generated dummies to ensure Premium users get full experience
                  const needed = questionLimit - subjectFiltered.length;
                  const dummyQuestions = Array(needed).fill(null).map((_, i) => ({
                      id: `dummy-${i}-${Date.now()}`,
                      text: `${selectedSubject} Premium Practice Question ${i + 1}: This question is dynamically generated to ensure you have a complete set of ${questionLimit} questions for your premium plan.`,
                      options: [{ id: 'A', text: 'Option A' }, { id: 'B', text: 'Option B (Correct)' }, { id: 'C', text: 'Option C' }, { id: 'D', text: 'Option D' }],
                      correctOptionId: 'B',
                      explanation: `Detailed explanation for ${selectedSubject} concept.`,
                      category: selectedCategory,
                      difficulty: "medium"
                  }));
                  filtered = [...subjectFiltered, ...dummyQuestions];
              }
          }
          
          // Shuffle and Slice
          const shuffled = filtered.sort(() => 0.5 - Math.random());
          setQuestions(shuffled.slice(0, questionLimit));
          
          setCurrentQIndex(0);
          setScore(0);
          setIsFinished(false);
          setTimer(TOTAL_TIME);
          setUserAnswers({});
      }
      // IMPORTANT: Dependency array restricted to selectedCategory/Subject/userPlan to prevent auto-restart when dailyAttempts updates at end of quiz
  }, [selectedCategory, selectedSubject, userPlan]); 

  useEffect(() => {
    if (selectedCategory && timer > 0 && !isSubmitted && !isFinished && !limitReached) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (selectedCategory && timer === 0 && !isFinished && !limitReached) {
        finishQuiz();
    }
  }, [timer, isSubmitted, isFinished, selectedCategory, limitReached]);

  const handleOptionSelect = (id: string) => {
    if (isSubmitted || isFinished) return;
    setSelectedOption(id);
    setIsSubmitted(true);
    
    // Save User Answer
    const currentQ = questions[currentQIndex];
    if (currentQ) {
        setUserAnswers(prev => ({ ...prev, [currentQ.id]: id }));
        if (id === currentQ.correctOptionId) {
            setScore(s => s + 1);
        }
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
      setIsFinished(true);
      
      // Increment Attempt Counter if Free User
      if (userPlan === 'free') {
          const today = new Date().toDateString();
          // We need to use functional update or read latest state carefully, but since we are inside component, standard state + localStorage logic works
          const newCount = dailyAttempts + 1;
          setDailyAttempts(newCount);
          localStorage.setItem('quiz_attempts', JSON.stringify({ date: today, count: newCount }));
      }
  };

  const handleRetry = () => {
      // Re-check limits with latest state
      if (userPlan === 'free' && dailyAttempts >= 3) {
          setLimitReached(true);
          // Don't reset state fully, let UI handle it
      } else {
          setCurrentQIndex(0);
          setSelectedOption(null);
          setIsSubmitted(false);
          setScore(0);
          setTimer(TOTAL_TIME);
          setIsFinished(false);
          setUserAnswers({});
          
          // Reshuffle for new attempt
          const shuffled = [...questions].sort(() => 0.5 - Math.random());
          setQuestions(shuffled);
      }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- LIMIT REACHED SCREEN ---
  if (limitReached && selectedCategory) {
      return (
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden shadow-2xl animate-in zoom-in-95">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                  
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                      <Lock size={40} className="text-red-500 dark:text-red-400" />
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">3/3</div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Daily Limit Reached</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-8">
                      You've completed your <span className="text-slate-900 dark:text-white font-bold">3 free quizzes</span> for today. Upgrade to Premium for unlimited practice and 30 questions per quiz.
                  </p>

                  <Link to="/pricing" className="block w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all transform hover:-translate-y-1 mb-4 flex items-center justify-center gap-2">
                      <Crown size={20} /> Upgrade to Premium
                  </Link>
                  
                  <button onClick={() => { setSelectedCategory(null); setLimitReached(false); }} className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium text-sm">
                      Back to Dashboard
                  </button>
              </div>
          </div>
      );
  }

  // --- CATEGORY SELECTION SCREEN ---
  if (!selectedCategory) {
      return (
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 flex flex-col items-center transition-colors">
              <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                      Select Quiz Category
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">Choose your preparation path to start the challenge.</p>
                  
                  {userPlan === 'free' && (
                      <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                          <span>Daily Attempts:</span>
                          <div className="flex gap-1">
                              {[1, 2, 3].map(i => (
                                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= dailyAttempts ? 'bg-red-500' : 'bg-green-500'}`} />
                              ))}
                          </div>
                          <span className={dailyAttempts >= 3 ? "text-red-500 dark:text-red-400" : "text-green-600 dark:text-green-400"}>
                              {3 - dailyAttempts} left
                          </span>
                      </div>
                  )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                  {QUIZ_CATEGORIES.map((cat, idx) => (
                      <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 text-left overflow-hidden shadow-lg dark:shadow-xl"
                          style={{ animationDelay: `${idx * 100}ms` }}
                      >
                          <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              {cat.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{cat.label}</h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">{cat.desc}</p>
                          <div className="mt-6 flex items-center justify-between">
                              <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors flex items-center gap-2">
                                  Start Quiz <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </span>
                              {userPlan === 'free' && (
                                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">10 Qs</span>
                              )}
                          </div>
                      </button>
                  ))}
              </div>
          </div>
      );
  }

  // --- RESULT SCREEN ---
  if (isFinished) {
      const accuracy = Math.round((score / questions.length) * 100);
      const timeTakenSec = TOTAL_TIME - timer;
      const timeTakenFmt = formatTime(timeTakenSec);
      const pointsEarned = score * 50; 
      
      const rank = score === questions.length ? 1 : score >= questions.length * 0.8 ? Math.floor(Math.random() * 50) + 2 : Math.floor(Math.random() * 500) + 100;
      
      const getFeedback = () => {
          if (score === questions.length) return "Perfection! You're absolutely ready for the exam.";
          if (score >= questions.length * 0.8) return "Excellent work! Just a few minor tweaks needed.";
          if (score >= questions.length * 0.5) return "Good effort. Review the explanations for the ones you missed.";
          return "Keep practicing. Focus on understanding the core concepts.";
      };

      return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 animate-in zoom-in-95 duration-500 pb-16 bg-slate-50 dark:bg-slate-950 transition-colors">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 max-w-3xl w-full text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                
                <div className="relative mb-8 mt-4">
                    <div className="w-40 h-40 mx-auto rounded-full border-8 border-slate-100 dark:border-slate-800 flex items-center justify-center relative bg-white dark:bg-slate-900 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-lg">
                            <circle cx="50%" cy="50%" r="70" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-800" />
                            <circle cx="50%" cy="50%" r="70" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={440} strokeDashoffset={440 - (440 * accuracy) / 100} className={`${score >= questions.length * 0.8 ? 'text-green-500' : score >= questions.length * 0.5 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} strokeLinecap="round" />
                        </svg>
                        <div className="flex flex-col items-center z-10">
                            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{score}<span className="text-xl text-slate-400 dark:text-slate-500">/{questions.length}</span></span>
                            <span className={`text-sm font-bold uppercase tracking-wider ${score >= questions.length * 0.8 ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                {score >= questions.length * 0.8 ? t('quiz_excellent') : t('quiz_completed')}
                            </span>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedCategory} Results</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 max-w-md mx-auto">{getFeedback()}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                        <Trophy size={20} className="text-yellow-500 dark:text-yellow-400 mb-2" />
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">#{rank}</span>
                        <span className="text-xs text-slate-500 uppercase">Est. Rank</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                        <Target size={20} className="text-cyan-500 dark:text-cyan-400 mb-2" />
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{accuracy}%</span>
                        <span className="text-xs text-slate-500 uppercase">Accuracy</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                        <Clock size={20} className="text-purple-500 dark:text-purple-400 mb-2" />
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{timeTakenFmt}</span>
                        <span className="text-xs text-slate-500 uppercase">Time</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                        <Zap size={20} className="text-orange-500 dark:text-orange-400 mb-2" />
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">+{pointsEarned}</span>
                        <span className="text-xs text-slate-500 uppercase">Points</span>
                    </div>
                </div>

                {/* --- DETAILED REVIEW SECTION --- */}
                <div className="mt-8 mb-8 text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <BookOpen size={20} className="text-cyan-600 dark:text-cyan-400" /> Detailed Review
                    </h3>
                    <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                        {questions.map((q, index) => {
                            const userAnswer = userAnswers[q.id];
                            const isCorrect = userAnswer === q.correctOptionId;
                            
                            return (
                                <div key={q.id} className={`p-6 rounded-2xl border relative overflow-hidden ${isCorrect ? 'bg-white dark:bg-slate-900 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.05)]' : 'bg-white dark:bg-slate-900 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.05)]'}`}>
                                    <div className="flex gap-4">
                                        <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isCorrect ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                                            {index + 1}
                                        </span>
                                        <div className="flex-1">
                                            <p className="text-slate-900 dark:text-white font-medium mb-4 leading-relaxed">{q.text}</p>
                                            <div className="space-y-2.5">
                                                {q.options.map(opt => {
                                                    const isSelected = userAnswer === opt.id;
                                                    const isOpCorrect = q.correctOptionId === opt.id;
                                                    let style = "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400";
                                                    
                                                    if (isOpCorrect) style = "bg-green-50 dark:bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400 font-bold shadow-sm";
                                                    else if (isSelected && !isOpCorrect) style = "bg-red-50 dark:bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-400 line-through opacity-80";
                                                    
                                                    return (
                                                        <div key={opt.id} className={`p-3 rounded-xl border text-sm flex items-center justify-between transition-colors ${style}`}>
                                                            <span>{opt.text}</span>
                                                            {isOpCorrect && <CheckCircle2 size={18} />}
                                                            {isSelected && !isOpCorrect && <XCircle size={18} />}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="mt-4 p-4 bg-slate-50 dark:bg-[#0B0F19] rounded-xl text-sm border border-slate-200 dark:border-slate-800">
                                                <span className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-2 mb-1"><AlertCircle size={14} /> Explanation:</span> 
                                                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{q.explanation}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {userPlan === 'free' && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 rounded-xl flex items-center justify-between text-left">
                        <div>
                            <h4 className="text-blue-900 dark:text-white font-bold text-sm mb-1">Want more practice?</h4>
                            <p className="text-blue-600 dark:text-blue-200 text-xs">Premium users get 30 questions per quiz.</p>
                        </div>
                        <Link to="/pricing" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors">
                            Upgrade
                        </Link>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-white dark:bg-slate-900 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button onClick={handleRetry} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700">
                        <RefreshCcw size={18} /> Retry Quiz
                    </button>
                    <button onClick={() => setSelectedCategory(null)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700">
                        Change Category
                    </button>
                    <Link to="/dashboard" className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                </div>
            </div>
        </div>
      );
  }

  // --- QUESTION INTERFACE ---
  const currentQ = questions[currentQIndex];
  const progress = ((currentQIndex + 1) / questions.length) * 100;

  if (!currentQ) return <div className="text-slate-900 dark:text-white text-center mt-20">Loading Questions...</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors">
      
      {/* Header Section */}
      <div className="w-full max-w-4xl mb-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
                <button onClick={() => setSelectedCategory(null)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <span className="font-black text-white text-lg">T</span>
                </div>
                <div>
                    <h1 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight flex items-center gap-2">
                        {selectedCategory} Quiz <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400 font-normal border border-slate-200 dark:border-slate-700">{selectedSubject || currentQ.category}</span>
                    </h1>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
                <Clock size={18} className="text-cyan-600 dark:text-cyan-400" />
                <span className="font-mono font-bold text-lg">{formatTime(timer)}</span>
            </div>
        </div>

        <div className="mt-6 px-1">
            <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                <span>Question {currentQIndex + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300 dark:border-slate-800/50">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-500 ease-out rounded-full relative" style={{ width: `${progress}%` }}>
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
            </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative transition-colors">
         <div className="p-8 md:p-12 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 leading-snug text-slate-900 dark:text-white">
                {currentQ.text}
            </h2>
            <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-10 font-medium">
                Select the correct option. Difficulty: <span className={`capitalize ${currentQ.difficulty === 'hard' ? 'text-red-500 dark:text-red-400' : currentQ.difficulty === 'medium' ? 'text-yellow-500 dark:text-yellow-400' : 'text-green-500 dark:text-green-400'}`}>{currentQ.difficulty}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((opt, index) => {
                    const isSelected = selectedOption === opt.id;
                    const isCorrect = opt.id === currentQ.correctOptionId;
                    const showResult = isSubmitted;

                    let cardClass = "bg-white dark:bg-[#161e2e] border-slate-200 dark:border-[#1e293b] hover:bg-slate-50 dark:hover:bg-[#1e293b] hover:border-slate-300 dark:hover:border-slate-600";
                    let textClass = "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white";
                    let letterBoxClass = "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-transparent group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-900 dark:group-hover:text-white";

                    if (showResult) {
                        if (isCorrect) {
                            cardClass = "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-500/50";
                            textClass = "text-emerald-700 dark:text-emerald-400 font-bold";
                            letterBoxClass = "bg-emerald-500 text-white dark:text-emerald-950";
                        } else if (isSelected && !isCorrect) {
                            cardClass = "bg-red-50 dark:bg-red-950/30 border-red-500 dark:border-red-500/50";
                            textClass = "text-red-700 dark:text-red-400 font-bold";
                            letterBoxClass = "bg-red-500 text-white";
                        } else {
                            cardClass = "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-40";
                        }
                    } else if (isSelected) {
                        cardClass = "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]";
                        textClass = "text-cyan-700 dark:text-cyan-400 font-bold";
                        letterBoxClass = "bg-cyan-500 text-white dark:text-cyan-950";
                    }

                    return (
                        <button
                            key={opt.id}
                            disabled={isSubmitted}
                            onClick={() => handleOptionSelect(opt.id)}
                            className={`group relative p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${cardClass} active:scale-[0.98]`}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-colors shrink-0 ${letterBoxClass}`}>
                                {String.fromCharCode(65 + index)}
                            </div>
                            <span className={`text-lg transition-colors ${textClass}`}>{opt.text}</span>
                        </button>
                    );
                })}
            </div>
         </div>
      </div>

      {isSubmitted && (
          <div className="w-full max-w-4xl mt-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
              <div className={`rounded-[2rem] p-6 md:px-8 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border backdrop-blur-xl relative overflow-hidden ${selectedOption === currentQ.correctOptionId ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]' : 'bg-red-50 dark:bg-red-950/40 border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.15)]'}`}>
                  <div className={`absolute top-0 left-0 w-1 h-full ${selectedOption === currentQ.correctOptionId ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedOption === currentQ.correctOptionId ? 'bg-emerald-500 text-white dark:text-emerald-950' : 'bg-red-500 text-white'}`}>
                              {selectedOption === currentQ.correctOptionId ? <CheckCircle2 size={18} strokeWidth={3} /> : <XCircle size={18} strokeWidth={3} />}
                          </div>
                          <h3 className={`text-xl font-black tracking-tight ${selectedOption === currentQ.correctOptionId ? 'text-emerald-800 dark:text-white' : 'text-red-800 dark:text-white'}`}>
                              {selectedOption === currentQ.correctOptionId ? 'Correct!' : 'Incorrect!'}
                          </h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base font-medium">{currentQ.explanation}</p>
                  </div>
                  <button onClick={handleNext} className="whitespace-nowrap px-8 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-[#1e293b] dark:hover:bg-[#334155] text-white font-bold rounded-xl border border-slate-600 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 group relative z-10">
                      {currentQIndex === questions.length - 1 ? 'See Results' : 'Next Question'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};