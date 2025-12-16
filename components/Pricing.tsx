import React, { useState, useEffect } from 'react';
import { Check, X, Tag, CreditCard, User, Mail, Lock, ArrowRight, ChevronDown, Sparkles, Star, Zap, Shield, BookOpen } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

interface PricingProps {
    onLogin?: () => void;
    isAuthenticated?: boolean;
}

const EXAM_GOALS = [
    { id: 'HSC', label: 'HSC Academic' },
    { id: 'Admission', label: 'University Admission' },
    { id: 'Job', label: 'Job Preparation' },
    { id: 'BCS', label: 'BCS Preliminary' },
    { id: 'IELTS', label: 'IELTS' },
    { id: 'TOEFL', label: 'TOEFL' },
    { id: 'PTE', label: 'PTE Academic' },
    { id: 'ISSB', label: 'ISSB Defense' },
    { id: 'JobPostAccess', label: 'Job Post Full Access (Employers)' },
];

const SUBJECTS_BY_CLASS: Record<string, string[]> = {
    HSC: ['Physics', 'Chemistry', 'Math', 'Biology', 'ICT', 'English', 'Bangla'],
    Admission: ['Physics', 'Chemistry', 'Math', 'Biology', 'General Knowledge', 'English', 'Bangla'],
    Job: ['Bangla Language', 'English Literature', 'General Knowledge', 'Math', 'Mental Ability', 'International Affairs', 'Bangladesh Affairs'],
    BCS: ['Bangladesh Affairs', 'International Affairs', 'English Language', 'Bangla Literature', 'Mathematical Reasoning', 'Mental Ability', 'General Science', 'ICT'],
    IELTS: ['Reading', 'Writing', 'Listening', 'Speaking', 'Vocabulary', 'Grammar'],
    TOEFL: ['Reading', 'Listening', 'Speaking', 'Writing'],
    PTE: ['Speaking & Writing', 'Reading', 'Listening'],
    ISSB: ['IQ Test', 'PPDT', 'Psychology', 'GTO Tasks', 'Interview Prep', 'General Knowledge'],
    JobPostAccess: ['Screening Tests', 'Unlimited Job Posts', 'Advanced Analytics', 'Candidate Filtering', 'Priority Support'],
};

export const Pricing: React.FC<PricingProps> = ({ onLogin, isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { t } = useLanguage();
  
  // Modal States
  const [showModal, setShowModal] = useState(false); // Payment Modal
  const [showSignUp, setShowSignUp] = useState(false); // Sign Up Modal
  
  // Payment States
  const [couponCode, setCouponCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('HSC'); // Default goal

  // Sign Up Form State
  const [signUpForm, setSignUpForm] = useState({ name: '', email: '', password: '' });

  const PLANS: Record<string, number> = {
      'Monthly': 199,
      'Yearly': 999
  };

  useEffect(() => {
      if (location.state?.selectedGoalId) {
          setSelectedGoal(location.state.selectedGoalId);
      }
      
      if (location.state?.returnTo === '/jobs/create') {
          setSelectedGoal('JobPostAccess');
      }
  }, [location.state]);

  const openPaymentModal = (plan: string) => {
      setSelectedPlan(plan);
      setCouponCode('');
      setIsDiscountApplied(false);
      
      if (isAuthenticated) {
          setShowModal(true);
      } else {
          setShowSignUp(true);
      }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newUser = {
          name: signUpForm.name || 'New Student',
          email: signUpForm.email,
          role: selectedGoal === 'JobPostAccess' ? 'employer' : 'student',
          plan: 'free',
          streak: 0,
          points: 0,
          studentClass: selectedGoal, 
          selectedSubjects: SUBJECTS_BY_CLASS[selectedGoal]
      };
      
      localStorage.setItem('takeuup_user', JSON.stringify(newUser));
      
      if (onLogin) onLogin();
      
      setShowSignUp(false);
      setShowModal(true);
  };

  const handleApplyCoupon = () => {
      if (couponCode.toLowerCase().trim() === 'free') {
          setIsDiscountApplied(true);
      } else {
          alert("Invalid coupon code. Try 'free'.");
          setCouponCode('');
          setIsDiscountApplied(false);
      }
  };

  const handleConfirmPayment = () => {
      const userStr = localStorage.getItem('takeuup_user');
      if (userStr) {
          const user = JSON.parse(userStr);
          
          let planId = 'free';
          if (selectedPlan === 'Monthly') planId = 'monthly';
          if (selectedPlan === 'Yearly') planId = 'yearly';

          user.plan = planId;
          user.studentClass = selectedGoal;
          user.selectedSubjects = SUBJECTS_BY_CLASS[selectedGoal];
          
          if (selectedGoal === 'JobPostAccess') {
              user.role = 'employer';
          }

          localStorage.setItem('takeuup_user', JSON.stringify(user));
      }

      const state = location.state as { returnTo?: string } | null;
      const returnPath = state?.returnTo || (selectedGoal === 'JobPostAccess' ? '/jobs/create' : '/dashboard');
      
      navigate(returnPath);
      setShowModal(false);
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500/30 overflow-hidden pt-20">
        
        {/* Background Glows */}
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 py-16">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-sm font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 shadow-lg shadow-cyan-900/20">
                    <Sparkles size={14} /> Investing in your future
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                    Simple Pricing, <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Unlimited Potential.</span>
                </h1>
                <p className="text-slate-400 text-xl font-light leading-relaxed">
                    {t('pricing_subtitle')}
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto mb-32">
                
                {/* 1. Free Starter */}
                <div className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-slate-600 transition-all duration-300 group">
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Shield className="text-slate-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                        <p className="text-slate-400 text-sm h-10">Essential tools to get you started.</p>
                    </div>
                    
                    <div className="mb-8">
                        <span className="text-4xl font-black text-white">৳0</span>
                        <span className="text-slate-500 font-medium">/forever</span>
                    </div>

                    <button 
                        onClick={() => openPaymentModal('Free')}
                        className="w-full py-4 rounded-xl border border-slate-700 bg-transparent hover:bg-slate-800 text-white font-bold transition-all mb-8"
                    >
                        {t('pricing_free_btn')}
                    </button>

                    <ul className="space-y-4">
                        {['Daily Quizzes (Limited)', 'Basic Analytics', 'Community Access', 'Ad-Supported'].map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                                <Check size={16} className="text-slate-500 shrink-0 mt-0.5" />
                                {feat}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2. Yearly (Featured) */}
                <div className="relative bg-[#0F172A] border-2 border-cyan-500/50 rounded-[2.5rem] p-10 transform scale-105 shadow-2xl shadow-cyan-900/20 z-10 overflow-hidden group">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-bl-2xl text-xs font-bold text-white shadow-lg">
                        BEST VALUE
                    </div>

                    <div className="mb-8">
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                            <Sparkles className="text-white" size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Yearly Pro</h3>
                        <p className="text-cyan-100/70 text-sm h-10">Maximum savings for serious learners.</p>
                    </div>
                    
                    <div className="mb-8 flex items-baseline gap-2">
                        <span className="text-6xl font-black text-white">৳999</span>
                        <div className="flex flex-col text-left">
                            <span className="text-slate-400 text-sm line-through">৳2400</span>
                            <span className="text-cyan-400 font-bold text-xs">/year</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => openPaymentModal('Yearly')}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-1 active:scale-95 mb-8"
                    >
                        Get Yearly Access
                    </button>

                    <ul className="space-y-4">
                        {['Everything in Monthly', 'Exclusive Live Classes', 'Mentor 1-on-1 Access', 'Offline Download', 'Priority Support'].map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-white font-medium text-sm">
                                <div className="p-0.5 bg-cyan-500 rounded-full shrink-0 mt-0.5">
                                    <Check size={12} className="text-white" strokeWidth={3} />
                                </div>
                                {feat}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Monthly */}
                <div className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-slate-600 transition-all duration-300 group">
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Zap className="text-purple-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Monthly</h3>
                        <p className="text-slate-400 text-sm h-10">Flexible plan, cancel anytime.</p>
                    </div>
                    
                    <div className="mb-8">
                        <span className="text-4xl font-black text-white">৳199</span>
                        <span className="text-slate-500 font-medium">/month</span>
                    </div>

                    <button 
                        onClick={() => openPaymentModal('Monthly')}
                        className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 transition-all mb-8"
                    >
                        Choose Monthly
                    </button>

                    <ul className="space-y-4">
                        {['Unlimited Quizzes', 'Full Analytics Report', 'Job & Admission Prep', 'Ad-Free Experience'].map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                <Check size={16} className="text-purple-400 shrink-0 mt-0.5" />
                                {feat}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* Feature Comparison */}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Detailed Comparison</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
                </div>
                
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                    {/* Header Row */}
                    <div className="grid grid-cols-3 p-6 border-b border-slate-800 bg-slate-900/80">
                        <div className="col-span-1 text-sm font-bold text-slate-400 uppercase tracking-wider">Feature</div>
                        <div className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider">Free</div>
                        <div className="text-center text-sm font-bold text-cyan-400 uppercase tracking-wider">Pro</div>
                    </div>

                    {/* Rows */}
                    {[
                        { name: 'Subject-wise Quizzes', free: true, pro: true },
                        { name: 'Detailed Explanations', free: true, pro: true },
                        { name: 'Performance Analytics', free: 'Basic', pro: 'Advanced AI' },
                        { name: 'Job & Admission Modules', free: false, pro: true },
                        { name: 'Employer Tools (Screening)', free: false, pro: true },
                        { name: 'Mentor Chat Access', free: false, pro: true },
                        { name: 'Ad-Free Experience', free: false, pro: true },
                        { name: 'Offline Downloads', free: false, pro: true },
                    ].map((row, idx) => (
                        <div key={idx} className={`grid grid-cols-3 p-5 text-sm items-center transition-colors ${idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'} hover:bg-white/[0.05]`}>
                            <div className="col-span-1 text-slate-300 font-medium flex items-center gap-2">
                                {row.name}
                                {!row.free && <Lock size={12} className="text-slate-600" />}
                            </div>
                            <div className="text-center flex justify-center">
                                {row.free === true 
                                    ? <Check size={18} className="text-slate-400" /> 
                                    : row.free === false 
                                    ? <X size={18} className="text-slate-700" /> 
                                    : <span className="text-slate-400 text-xs font-bold">{row.free}</span>
                                }
                            </div>
                            <div className="text-center flex justify-center">
                                {row.pro === true 
                                    ? <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20"><Check size={14} className="text-white" strokeWidth={3} /></div> 
                                    : <span className="text-cyan-400 font-bold">{row.pro}</span>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* --- MODALS --- */}

        {/* Sign Up Modal */}
        {showSignUp && selectedPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                <div className="bg-[#0F172A] border border-slate-700 rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
                    <button onClick={() => setShowSignUp(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                        <X size={20} />
                    </button>
                    
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-cyan-900/30 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                            <User size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-slate-400 text-sm">Sign up to unlock your {selectedPlan} subscription.</p>
                    </div>

                    <form onSubmit={handleSignUpSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                            <input 
                                type="text"
                                name="name"
                                required
                                value={signUpForm.name}
                                onChange={handleSignUpChange}
                                placeholder="John Doe" 
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-cyan-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
                            <input 
                                type="email"
                                name="email"
                                required
                                value={signUpForm.email}
                                onChange={handleSignUpChange}
                                placeholder="you@example.com" 
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-cyan-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
                            <input 
                                type="password"
                                name="password"
                                required
                                value={signUpForm.password}
                                onChange={handleSignUpChange}
                                placeholder="••••••••" 
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-cyan-500 outline-none transition-all"
                            />
                        </div>

                        {/* Goal Selection in Signup */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Select Goal / Class</label>
                            <div className="relative">
                                <select
                                    value={selectedGoal}
                                    onChange={(e) => setSelectedGoal(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pr-10 text-white focus:border-cyan-500 outline-none appearance-none cursor-pointer font-medium transition-all hover:border-slate-600"
                                >
                                    {EXAM_GOALS.map(goal => (
                                        <option key={goal.id} value={goal.id}>{goal.label}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-3.5 mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1"
                        >
                            Create Account & Continue <ArrowRight size={18} />
                        </button>
                    </form>
                    
                    <p className="text-center text-xs text-slate-500 mt-6">
                        Already have an account? <Link to="/login" className="text-cyan-400 hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        )}

        {/* Payment / Goal Selection Modal */}
        {showModal && selectedPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                <div className="bg-[#0F172A] border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                    <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
                        <X size={20} />
                    </button>
                    
                    <h2 className="text-2xl font-bold text-white mb-1">
                        {selectedPlan === 'Free' ? 'Activate Free Plan' : `Subscribe to ${selectedPlan}`}
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                        {selectedPlan === 'Free' ? 'Get started with essential features.' : 'Unlock unlimited access today.'}
                    </p>

                    {selectedPlan !== 'Free' && (
                        <div className="bg-slate-900 p-4 rounded-xl mb-6 border border-slate-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-400 text-sm">Subtotal</span>
                                <span className="text-white font-mono">৳{PLANS[selectedPlan]}</span>
                            </div>
                            {isDiscountApplied && (
                                <div className="flex justify-between items-center mb-2 text-green-400 text-sm animate-in slide-in-from-left-2">
                                    <span className="flex items-center gap-1"><Tag size={12} /> Coupon (FREE)</span>
                                    <span className="font-mono">-৳{PLANS[selectedPlan]}</span>
                                </div>
                            )}
                            <div className="border-t border-slate-800 my-2 pt-2 flex justify-between items-center font-bold text-lg">
                                <span className="text-white">Total</span>
                                <span className={isDiscountApplied ? "text-green-400" : "text-cyan-400"}>
                                    ৳{isDiscountApplied ? 0 : PLANS[selectedPlan]}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="mb-6 space-y-5">
                        {/* Exam Goal Selection */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Select Your Goal / Exam</label>
                            <div className="relative">
                                <select
                                    value={selectedGoal}
                                    onChange={(e) => setSelectedGoal(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pr-10 text-white focus:border-cyan-500 outline-none appearance-none cursor-pointer font-medium transition-all hover:border-slate-600"
                                >
                                    {EXAM_GOALS.map(goal => (
                                        <option key={goal.id} value={goal.id}>{goal.label}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                            </div>
                            
                            {/* Visual Feedback for Subjects */}
                            <div className="mt-4 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                                <span className="text-xs font-bold text-slate-500 uppercase block mb-2 flex items-center gap-1">
                                    <BookOpen size={12} /> Subjects Included:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {SUBJECTS_BY_CLASS[selectedGoal]?.map(sub => (
                                        <span key={sub} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 font-medium">
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Coupon Section (Only for Paid Plans) */}
                        {selectedPlan !== 'Free' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Have a coupon?</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter code" 
                                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-cyan-500 outline-none uppercase placeholder-slate-600 transition-all"
                                    />
                                    <button 
                                        onClick={handleApplyCoupon}
                                        disabled={isDiscountApplied}
                                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {isDiscountApplied && <p className="text-green-400 text-xs mt-2 flex items-center gap-1 font-bold ml-1 animate-in fade-in"><Check size={12} /> Coupon applied successfully!</p>}
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={handleConfirmPayment}
                        className={`w-full py-3.5 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-[0.98] ${
                            selectedPlan === 'Free' || isDiscountApplied
                            ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20'
                            : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/20'
                        }`}
                    >
                        {selectedPlan === 'Free' ? (
                            <>Activate Free Plan <ArrowRight size={18} /></>
                        ) : (
                            <><CreditCard size={18} /> {isDiscountApplied ? 'Activate Now' : 'Pay & Subscribe'}</>
                        )}
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};