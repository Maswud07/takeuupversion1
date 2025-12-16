import React, { useState, useEffect } from 'react';
import { HashRouter, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Trophy, User, MessageSquare, Shield, Menu, X, LayoutDashboard, LogOut, Sparkles, Settings, UserCircle, Briefcase, ChevronDown, FileText, Users, Database, Coins, GraduationCap, Facebook, Twitter, Instagram, Linkedin, Youtube, ShoppingBag, Zap, Crown, Rocket, Globe, Moon, Sun, Info } from 'lucide-react';
import { ProfileModal } from './ProfileModal';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

interface LayoutProps {
  children?: React.ReactNode;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar = ({ isAuthenticated, onLogout }: { isAuthenticated: boolean; onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  // User State
  const [userData, setUserData] = useState<any>(null);
  // Branding State
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      
      const savedLogo = localStorage.getItem('takeuup_logo');
      if (savedLogo) setCustomLogo(savedLogo);

      const handleStorageChange = () => {
          const updatedLogo = localStorage.getItem('takeuup_logo');
          setCustomLogo(updatedLogo);
      };
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('logoUpdated', handleStorageChange);

      return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('storage', handleStorageChange);
          window.removeEventListener('logoUpdated', handleStorageChange);
      };
  }, []);

  // Load user data whenever auth state changes
  useEffect(() => {
      if (isAuthenticated) {
          const stored = localStorage.getItem('takeuup_user');
          if (stored) {
              setUserData(JSON.parse(stored));
          } else {
              setUserData({ name: 'Student', photoURL: 'https://picsum.photos/id/64/200' });
          }
      }
  }, [isAuthenticated]);

  const handleUpdateUser = (updatedData: any) => {
      setUserData(updatedData);
  };

  const handleLogout = () => {
      onLogout();
      navigate('/');
  };

  const navLinkClass = (path: string) => `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
      location.pathname === path 
      ? 'bg-slate-900 text-white dark:bg-white/10 dark:text-white shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-slate-200 dark:border-white/5 backdrop-blur-sm' 
      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
  }`;

  // Determine Logo Link based on role
  const logoLink = isAuthenticated && userData?.role === 'employer' ? '/employer-dashboard' 
                 : isAuthenticated && userData?.role === 'admin' ? '/admin' 
                 : '/';

  const isJobActive = location.pathname.startsWith('/jobs') 
    ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.1)] border border-violet-500/20' 
    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5';

  const MEGA_MENU_ITEMS = [
    { 
        name: t('menu_about'),
        path: '/about',
        icon: <Info size={18} />,
        desc: t('menu_about_desc'),
        color: 'text-cyan-500 dark:text-cyan-400',
        bg: 'bg-cyan-100 dark:bg-cyan-400/10'
    },
    { 
        name: t('menu_leaderboard'), 
        path: '/leaderboard', 
        icon: <Trophy size={18} />, 
        desc: t('menu_leaderboard_desc'),
        color: 'text-yellow-500 dark:text-yellow-400',
        bg: 'bg-yellow-100 dark:bg-yellow-400/10'
    },
    { 
        name: t('menu_mentors'), 
        path: '/mentors', 
        icon: <Users size={18} />, 
        desc: t('menu_mentors_desc'),
        color: 'text-indigo-500 dark:text-indigo-400',
        bg: 'bg-indigo-100 dark:bg-indigo-400/10'
    },
    { 
        name: t('menu_blog'), 
        path: '/blog', 
        icon: <FileText size={18} />, 
        desc: t('menu_blog_desc'),
        color: 'text-teal-500 dark:text-teal-400',
        bg: 'bg-teal-100 dark:bg-teal-400/10'
    },
    { 
        name: t('menu_careers'), 
        path: '/career', 
        icon: <Rocket size={18} />, 
        desc: t('menu_careers_desc'),
        color: 'text-orange-500 dark:text-orange-400',
        bg: 'bg-orange-100 dark:bg-orange-400/10'
    },
    { 
        name: t('menu_demo'), 
        path: '/demo', 
        icon: <Sparkles size={18} />, 
        desc: t('menu_demo_desc'),
        color: 'text-pink-500 dark:text-pink-400',
        bg: 'bg-pink-100 dark:bg-pink-400/10'
    },
  ];

  return (
    <>
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled 
        ? 'bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-black/50' 
        : 'bg-white/60 dark:bg-[#030712]/60 backdrop-blur-md border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to={logoLink} className="flex items-center space-x-3 group">
              {customLogo ? (
                  <img src={customLogo} alt="Logo" className="h-10 w-10 object-contain rounded-xl" />
              ) : (
                  <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                      <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-inner border border-white/20">
                        <span className="text-white font-black text-xl">T</span>
                      </div>
                  </div>
              )}
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-600 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 group-hover:to-cyan-500 transition-all tracking-tight">
                TakeUUp
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1.5 rounded-full border border-slate-200 dark:border-white/5 backdrop-blur-sm">
              {/* Conditional Nav Items based on Role */}
              {isAuthenticated && userData?.role === 'employer' ? (
                  <>
                      <Link to="/employer-dashboard" className={navLinkClass('/employer-dashboard')}>Dashboard</Link>
                      <Link to="/jobs" className={navLinkClass('/jobs')}>Job Portal</Link>
                  </>
              ) : isAuthenticated && userData?.role === 'admin' ? (
                  <>
                      <Link to="/admin" className={navLinkClass('/admin')}>Admin Panel</Link>
                  </>
              ) : (
                  // Student / Unified View
                  <>
                      <Link to="/" className={navLinkClass('/')}>{t('nav_home')}</Link>
                      {isAuthenticated && (
                         <Link to="/dashboard" className={navLinkClass('/dashboard')}>{t('nav_dashboard')}</Link>
                      )}
                      
                      <Link to="/quiz" className={navLinkClass('/quiz')}>{t('nav_quizzes')}</Link>
                      
                      {/* Highlight Job Portal for Job Prep Students */}
                      <Link to="/jobs" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isJobActive}`}>{t('nav_jobs')}</Link>

                      <Link to="/store" className={navLinkClass('/store')}>
                          {t('nav_store')}
                      </Link>
                      
                      <Link to="/pricing" className={navLinkClass('/pricing')}>{t('nav_pricing')}</Link>

                      {/* Mega Menu Dropdown */}
                      <div className="relative group">
                          <button className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 transition-all flex items-center gap-1">
                              {t('nav_more')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                          </button>

                          {/* Dropdown Content */}
                          <div className="absolute top-full right-0 mt-4 w-72 bg-white dark:bg-[#0F131D]/95 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden z-50">
                              <div className="p-2 grid gap-1">
                                  {MEGA_MENU_ITEMS.map((item) => (
                                      <Link 
                                        key={item.name} 
                                        to={item.path} 
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group/item"
                                      >
                                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bg} ${item.color} group-hover/item:scale-110 transition-transform shadow-inner`}>
                                              {item.icon}
                                          </div>
                                          <div>
                                              <div className="text-slate-900 dark:text-white font-bold text-sm group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">{item.name}</div>
                                              <div className="text-slate-500 text-xs font-medium">{item.desc}</div>
                                          </div>
                                      </Link>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </>
              )}
          </div>

          {/* Right Side: Theme, Language & User */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:bg-cyan-50 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Switcher */}
            <button 
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-colors text-xs font-bold text-slate-600 dark:text-slate-300"
            >
                <span className={language === 'en' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}>EN</span>
                <div className="w-[1px] h-3 bg-slate-300 dark:bg-slate-600"></div>
                <span className={language === 'bn' ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}>BN</span>
            </button>

            <div className="flex items-center space-x-3 pl-2">
              {isAuthenticated && userData ? (
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setShowProfileModal(true)}
                        className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/30 hover:bg-white dark:hover:bg-white/10 transition-all group backdrop-blur-sm"
                    >
                        <div className="w-9 h-9 rounded-full border-2 border-cyan-500/50 overflow-hidden relative shadow-lg">
                             {userData.photoURL ? (
                                <img src={userData.photoURL} alt="User" className="w-full h-full object-cover" />
                             ) : (
                                <UserCircle className="w-full h-full text-slate-400" />
                             )}
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {userData.name}
                        </span>
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-200 dark:hover:border-red-500/20 transition-all"
                        title={t('nav_logout')}
                    >
                        <LogOut size={18} />
                    </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                    <Link to="/login" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">{t('nav_login')}</Link>
                    <Link to="/register" className="group relative px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 transition-all duration-300 group-hover:scale-110"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className="relative flex items-center gap-2">{t('nav_join')} <Sparkles size={14} /></span>
                    </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex lg:hidden items-center gap-3">
            {/* Mobile Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-md bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Language Switcher */}
            <button 
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300"
            >
                <span className={language === 'en' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 dark:text-slate-500'}>EN</span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className={language === 'bn' ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}>BN</span>
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#030712]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 animate-in slide-in-from-top-2 z-40 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="px-4 pt-6 pb-8 space-y-2">
            
            {isAuthenticated && userData?.role === 'employer' ? (
                <>
                    <Link to="/employer-dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 rounded-2xl border border-cyan-100 dark:border-cyan-500/20">Dashboard</Link>
                    <Link to="/jobs" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors">Job Portal</Link>
                </>
            ) : isAuthenticated && userData?.role === 'admin' ? (
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20">Admin Panel</Link>
            ) : (
                <>
                    <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors">{t('nav_home')}</Link>
                    {isAuthenticated && (
                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 rounded-2xl border border-cyan-100 dark:border-cyan-500/20">{t('nav_dashboard')}</Link>
                    )}
                    <Link to="/quiz" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors">{t('nav_quizzes')}</Link>
                    <Link to="/jobs" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 rounded-2xl transition-colors flex items-center gap-2"><Briefcase size={18} /> {t('nav_jobs')}</Link>
                    <Link to="/store" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors flex items-center gap-2"><ShoppingBag size={18} /> {t('nav_store')}</Link>
                    <Link to="/pricing" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors">{t('nav_pricing')}</Link>
                </>
            )}
            
            {/* Mobile "More" Section - Hide for Employers */}
            {userData?.role !== 'employer' && userData?.role !== 'admin' && (
                <div className="pt-2 border-t border-slate-200 dark:border-white/5 mt-2">
                    <button 
                        onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors"
                    >
                        <span>{t('nav_more')}</span>
                        <ChevronDown size={16} className={`transition-transform ${mobileMoreOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {mobileMoreOpen && (
                        <div className="space-y-1 pl-2 mt-1">
                            {MEGA_MENU_ITEMS.map((item) => (
                                <Link 
                                    key={item.name}
                                    to={item.path} 
                                    onClick={() => setIsOpen(false)} 
                                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-colors"
                                >
                                    <div className={`${item.color}`}>{item.icon}</div>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Mobile Auth */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/10 mt-4">
                {!isAuthenticated ? (
                    <div className="flex flex-col gap-4">
                         <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl border border-slate-200 dark:border-white/10 transition-colors">{t('nav_login')}</Link>
                         <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl shadow-lg shadow-cyan-900/20">{t('nav_join')}</Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <button onClick={() => { setShowProfileModal(true); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-base font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl flex items-center gap-3">
                            <User size={20} /> {t('nav_profile')}
                        </button>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-base font-bold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl flex items-center gap-3">
                            <LogOut size={20} /> {t('nav_logout')}
                        </button>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
    
    {/* Profile Modal */}
    <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        userData={userData}
        onUpdateUser={handleUpdateUser}
    />
    </>
  );
};

export const Layout = ({ children, isAuthenticated, onLogout }: LayoutProps) => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const location = useLocation();

    return (
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>
            <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <main className="pt-20 min-h-[calc(100vh-80px)]">
                <div key={location.pathname} className="page-animate">
                    {children}
                </div>
            </main>
            <footer className="bg-white dark:bg-black border-t border-slate-200 dark:border-white/10 py-12 transition-colors duration-500 mt-auto">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">TakeUUp</h3>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Empowering students across Bangladesh.</p>
                        <Link to="/about" className="text-cyan-500 dark:text-cyan-400 text-sm font-bold hover:underline mt-2 inline-block">
                            About Us
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors"><Youtube size={20} /></a>
                    </div>
                    <div className="text-slate-500 dark:text-slate-600 text-sm text-center md:text-right">
                        <div>© {new Date().getFullYear()} TakeUUp. {t('footer_rights')}</div>
                        <div className="text-xs mt-1">{t('footer_made')} <span className="text-red-500">♥</span> {t('footer_in')}</div>
                    </div>
                </div>
            </footer>
        </div>
    );
};