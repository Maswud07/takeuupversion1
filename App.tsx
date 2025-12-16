import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { QuizInterface } from './components/QuizInterface';
import { Leaderboard } from './components/Leaderboard';
import { Blog } from './components/Blog';
import { Pricing } from './components/Pricing';
import { Mentors } from './components/Mentors';
import { Newsletter } from './components/Newsletter';
import { AdminPanel } from './components/AdminPanel';
import { EmployerDashboard } from './components/EmployerDashboard';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { PremiumDemo } from './components/PremiumDemo';
import { IELTSInterface } from './components/IELTSInterface';
import { JobPortalHome } from './components/JobPortalHome';
import { JobSearch } from './components/JobSearch';
import { JobPost } from './components/JobPost';
import { JobTestInterface } from './components/JobTestInterface';
import { CVBuilder } from './components/CVBuilder';
import { CategoryDetails } from './components/CategoryDetails';
import { BookStore } from './components/BookStore';
import { CareerPage } from './components/CareerPage';
import { QuestionBank } from './components/QuestionBank';
import { AboutUs } from './components/AboutUs';
import { ToolsInterface } from './components/ToolsInterface';

const App = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return !!localStorage.getItem('takeuup_user');
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('takeuup_user');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={
                  <>
                    <LandingPage />
                    <Newsletter />
                  </>
              } />
              
              <Route 
                path="/dashboard" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
              />
              
              <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} 
              />
              
              <Route 
                path="/register" 
                element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} 
              />
              
              {/* Public Routes */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/demo" element={<PremiumDemo />} />
              <Route path="/quiz" element={<QuizInterface />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/blog" element={<Blog />} />
              
              {/* Pass auth props to Pricing for inline signup flow */}
              <Route path="/pricing" element={<Pricing onLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
              
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/admin" element={<AdminPanel onLogout={handleLogout} />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard onLogout={handleLogout} />} />
              <Route path="/store" element={<BookStore />} />
              <Route path="/career" element={<CareerPage />} />
              <Route path="/details/:id" element={<CategoryDetails />} />
              <Route path="/question-bank" element={<QuestionBank />} />
              <Route path="/tools/:toolId" element={<ToolsInterface />} />
              
              {/* Job Portal Routes */}
              <Route path="/jobs" element={<JobPortalHome />} />
              <Route path="/jobs/search" element={<JobSearch />} />
              
              {/* Protected Route: Create Job */}
              <Route 
                path="/jobs/create" 
                element={isAuthenticated ? <JobPost /> : <Navigate to="/login" state={{ returnTo: '/jobs/create' }} replace />} 
              />
              
              <Route path="/jobs/create-cv" element={<CVBuilder />} />
              <Route path="/jobs/test/:jobId" element={<JobTestInterface />} />
              
              <Route path="/ielts" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
              <Route path="/ielts/test/:testId/:section" element={<IELTSInterface />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;