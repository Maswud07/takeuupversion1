import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome, User, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Success Message State
  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState('');
  
  // Registration State
  const location = useLocation();
  const [isRegistering, setIsRegistering] = useState(location.pathname === '/register');

  const navigate = useNavigate();

  useEffect(() => {
    setIsRegistering(location.pathname === '/register');
  }, [location.pathname]);

  const handleSimulatedAuth = (e?: React.FormEvent) => {
      e?.preventDefault();
      setIsLoading(true);
      
      // For Login, we try to fetch existing data, otherwise default to basic user
      let userData: any = {
          name: name || 'Student User',
          email: email || 'user@example.com',
          role: 'student',
          photoURL: `https://ui-avatars.com/api/?name=${name || 'User'}&background=random`,
          studentClass: null, // Goal is NOT set during signup anymore
          selectedSubjects: [],
          streak: 0,
          points: 0
      };

      if (!isRegistering) {
          const existing = localStorage.getItem('takeuup_user');
          if (existing) {
              userData = JSON.parse(existing);
          }
      }

      // Admin Override for demo purposes
      if (email === 'admin@takeuup.com') {
          userData.role = 'admin';
      } else if (email === 'employer@takeuup.com') {
          userData.role = 'employer';
      }

      localStorage.setItem('takeuup_user', JSON.stringify(userData));
      setSuccessName(userData.name);

      // Simulate Network Delay then Show Success Message
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);

        // Delay Redirect to let user read the message
        setTimeout(() => {
            onLogin();

            // Check for returnTo in location state
            const state = location.state as { returnTo?: string } | null;
            if (state?.returnTo) {
                navigate(state.returnTo, { replace: true });
                return;
            }

            // Admin redirect logic
            if (userData.role === 'admin') {
                navigate('/admin');
            } else if (userData.role === 'employer') {
                navigate('/employer-dashboard');
            } else {
                // Redirect to Home so they can choose a category/goal via "View Details"
                navigate('/'); 
            }
        }, 2000);
      }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl relative z-10 transition-all duration-500 min-h-[500px] flex flex-col justify-center">
        
        {/* Success Overlay */}
        {showSuccess ? (
            <div className="text-center animate-in fade-in zoom-in duration-500 py-10">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 size={48} className="text-green-500 animate-bounce" strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                    Welcome, {successName.split(' ')[0]}!
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                    {isRegistering ? 'Account created successfully.' : 'Login successful.'}
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                    Redirecting you...
                </div>
            </div>
        ) : (
            <>
                {/* Back Link */}
                <Link to="/" className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-8 mt-6">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                        {isRegistering ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        {isRegistering ? 'Join TakeUUp to start your learning journey.' : 'Enter your credentials to access your account.'}
                    </p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSimulatedAuth} className="space-y-5 animate-in fade-in duration-300">
                    {isRegistering && (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase text-xs">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase text-xs">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase text-xs">Password</label>
                            {!isRegistering && <a href="#" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline">Forgot?</a>}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/20 text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-all transform hover:scale-[1.02] disabled:opacity-70"
                    >
                        {isLoading ? (isRegistering ? 'Creating Account...' : 'Logging in...') : (isRegistering ? 'Sign Up' : 'Log In')}
                        {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </button>
                
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-50 dark:bg-slate-900 text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button type="button" onClick={() => handleSimulatedAuth()} className="flex items-center justify-center px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                                <Chrome className="h-5 w-5 mr-2" /> Google
                            </button>
                            <button type="button" onClick={() => handleSimulatedAuth()} className="flex items-center justify-center px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                                <Github className="h-5 w-5 mr-2" /> GitHub
                            </button>
                        </div>
                    </div>
                </form>

                {/* Toggle Login/Register */}
                <div className="text-center mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {isRegistering ? "Already have an account?" : "Don't have an account?"}{' '}
                        <button 
                            onClick={() => {
                                if (isRegistering) navigate('/login', { state: location.state });
                                else navigate('/register', { state: location.state });
                            }} 
                            className="text-cyan-600 dark:text-cyan-400 hover:underline font-bold"
                        >
                            {isRegistering ? "Log In" : "Sign Up"}
                        </button>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <Link to="/admin" className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Admin Access</Link>
                </div>
            </>
        )}

      </div>
    </div>
  );
};