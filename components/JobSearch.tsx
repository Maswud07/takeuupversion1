import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Briefcase, ChevronDown, ChevronUp, Bookmark, Clock, DollarSign, Filter, Building, User, TrendingUp, X, FileCheck, Upload, FileText, Trash2, Send, CheckCircle2, PlayCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATIC_JOBS = [
  {
    id: 1,
    title: "Technical Support Specialist",
    type: "Part-Time",
    salary: "20k - 25k",
    company: "Google",
    location: "Gulshan, Dhaka",
    applicants: "91+",
    logo: "https://logo.clearbit.com/google.com",
    posted: "2d ago",
    hasTest: false
  },
  {
    id: 2,
    title: "Senior UI/UX Designer",
    type: "Full-Time",
    salary: "50k - 55k",
    company: "Apple",
    location: "Banani, Dhaka",
    applicants: "51+",
    logo: "https://logo.clearbit.com/apple.com",
    posted: "5h ago",
    hasTest: false
  },
  {
    id: 3,
    title: "Marketing Officer",
    type: "Full-Time",
    salary: "30k - 35k",
    company: "Intel",
    location: "Chattogram",
    applicants: "101+",
    logo: "https://logo.clearbit.com/intel.com",
    posted: "1d ago",
    hasTest: false
  },
  {
    id: 4,
    title: "Junior Frontend Developer",
    type: "Contract",
    salary: "15k - 25k",
    company: "Pathao",
    location: "Mohakhali, Dhaka",
    applicants: "200+",
    logo: "https://logo.clearbit.com/pathao.com",
    posted: "3d ago",
    hasTest: true
  },
  {
    id: 5,
    title: "Content Writer Intern",
    type: "Internship",
    salary: "5k - 8k",
    company: "10 Minute School",
    location: "Remote",
    applicants: "300+",
    logo: "https://logo.clearbit.com/10minuteschool.com",
    posted: "Just now",
    hasTest: false
  },
  {
    id: 6,
    title: "Senior Backend Engineer",
    type: "Full-Time",
    salary: "90k - 120k",
    company: "ShopUp",
    location: "Tejgaon, Dhaka",
    applicants: "45+",
    logo: "https://logo.clearbit.com/shopup.com.bd",
    posted: "1w ago",
    hasTest: true
  },
  {
    id: 7,
    title: "HR Executive",
    type: "Full-Time",
    salary: "25k - 35k",
    company: "Brac Bank",
    location: "Dhaka",
    applicants: "150+",
    logo: "https://logo.clearbit.com/bracbank.com",
    posted: "4d ago",
    hasTest: false
  },
  {
    id: 8,
    title: "Graphic Design Intern",
    type: "Internship",
    salary: "8k - 10k",
    company: "Creative IT",
    location: "Dhanmondi",
    applicants: "80+",
    logo: "https://ui-avatars.com/api/?name=Creative+IT&background=random",
    posted: "2d ago",
    hasTest: false
  }
];

export const JobSearch = () => {
  const navigate = useNavigate();
  const [dynamicJobs, setDynamicJobs] = useState<any[]>([]);
  
  // Pagination & Display State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  
  // Application Modal State
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTestIntro, setShowTestIntro] = useState(false); 
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      coverLetter: ''
  });

  useEffect(() => {
      // Load jobs from admin panel that are marked for 'Portal'
      const storedJobs = localStorage.getItem('takeuup_jobs');
      if (storedJobs) {
          try {
              const parsedJobs = JSON.parse(storedJobs);
              const portalJobs = parsedJobs.filter((job: any) => job.destination === 'Portal');
              setDynamicJobs(portalJobs);
          } catch (e) { console.error("Error loading portal jobs", e); }
      }
  }, []);

  // Combine and Enhance Jobs with inferred data for filtering
  const allJobs = useMemo(() => {
      const combined = [...dynamicJobs.map(job => ({
          id: job.id,
          title: job.title,
          type: job.type,
          salary: job.salary,
          company: job.company,
          location: job.location,
          applicants: 'New',
          logo: `https://ui-avatars.com/api/?name=${job.company}&background=random`,
          posted: 'Just now',
          hasTest: job.hasTest,
          testConfig: job.testConfig
      })), ...STATIC_JOBS];

      return combined.map(job => {
          // Infer experience level from title
          let experience = 'Mid Level';
          const lowerTitle = job.title.toLowerCase();
          if (lowerTitle.includes('senior') || lowerTitle.includes('lead') || lowerTitle.includes('manager')) experience = 'Senior Level';
          else if (lowerTitle.includes('junior') || lowerTitle.includes('intern') || lowerTitle.includes('trainee') || lowerTitle.includes('entry')) experience = 'Entry Level';
          
          return { ...job, experience };
      });
  }, [dynamicJobs]);

  // Filtering Logic
  const filteredJobs = useMemo(() => {
      return allJobs.filter(job => {
          // Search Query
          if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) && !job.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
          
          // Location Query
          if (locationQuery && !job.location.toLowerCase().includes(locationQuery.toLowerCase())) return false;

          // Job Type Filter
          if (selectedJobTypes.length > 0 && !selectedJobTypes.includes(job.type)) return false;

          // Experience Filter
          if (selectedExperience.length > 0 && !selectedExperience.includes(job.experience)) return false;

          // Remote Filter
          if (remoteOnly && !job.location.toLowerCase().includes('remote')) return false;

          return true;
      });
  }, [allJobs, searchQuery, locationQuery, selectedJobTypes, selectedExperience, remoteOnly]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
      setCurrentPage(1); // Reset to page 1 when filters change
  }, [filteredJobs.length]);

  const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  const toggleFilter = (state: string[], setState: (s: string[]) => void, value: string) => {
      if (state.includes(value)) {
          setState(state.filter(item => item !== value));
      } else {
          setState([...state, value]);
      }
  };

  const resetFilters = () => {
      setSearchQuery('');
      setLocationQuery('');
      setSelectedJobTypes([]);
      setSelectedExperience([]);
      setRemoteOnly(false);
      setCurrentPage(1);
  };

  const handleApplyClick = (job: any) => {
      const user = localStorage.getItem('takeuup_user');
      if (!user) {
          if(window.confirm("You need to sign in to apply. Go to login page?")) {
              navigate('/login', { state: { returnTo: '/jobs/search', role: 'job_seeker' } });
          }
          return;
      }

      setSelectedJob(job);
      const userData = JSON.parse(user);
      setFormData(prev => ({
          ...prev,
          name: userData.name || '',
          email: userData.email || ''
      }));
      setCvFile(null);
      setShowTestIntro(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setCvFile(e.target.files[0]);
      }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
      e.preventDefault();
      if (!cvFile) {
          alert("Please upload your CV/Resume.");
          return;
      }

      setIsSubmitting(true);

      setTimeout(() => {
          const newApplication = {
              id: Date.now(),
              jobId: selectedJob.id,
              jobTitle: selectedJob.title,
              dept: selectedJob.company,
              ...formData,
              date: new Date().toLocaleDateString(),
              status: selectedJob.hasTest ? 'Pending Test' : 'Pending',
              cvFileName: cvFile.name
          };

          const existingApps = JSON.parse(localStorage.getItem('takeuup_applications') || '[]');
          localStorage.setItem('takeuup_applications', JSON.stringify([newApplication, ...existingApps]));

          setIsSubmitting(false);
          
          if (selectedJob.hasTest) {
              setShowTestIntro(true);
          } else {
              setSelectedJob(null);
              setShowSuccess(true);
              setTimeout(() => setShowSuccess(false), 3000);
          }
      }, 1500);
  };

  const handleStartTest = () => {
      navigate(`/jobs/test/${selectedJob.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white font-sans pb-20 transition-colors duration-500">
      
      {/* Header & Search */}
      <div className="bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-white/5 pt-8 pb-12 px-4 sticky top-0 z-30 shadow-sm dark:shadow-2xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6">
              <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Find your next role</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Browse {allJobs.length}+ active job listings</p>
              </div>
          </div>
          
          <div className="bg-slate-100 dark:bg-[#1E293B] rounded-2xl p-2 flex flex-col md:flex-row gap-2 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-lg">
            <div className="flex-1 flex items-center bg-white dark:bg-[#020617] rounded-xl px-4 py-3 border border-slate-200 dark:border-white/5 focus-within:border-violet-500/50 transition-colors">
              <Search className="text-slate-400 dark:text-slate-500 mr-3" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title or keyword" 
                className="bg-transparent border-none text-slate-900 dark:text-white w-full focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium" 
              />
            </div>
            
            <div className="flex-1 flex items-center bg-white dark:bg-[#020617] rounded-xl px-4 py-3 border border-slate-200 dark:border-white/5 focus-within:border-violet-500/50 transition-colors">
              <MapPin className="text-slate-400 dark:text-slate-500 mr-3" size={20} />
              <input 
                type="text" 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Location" 
                className="bg-transparent border-none text-slate-900 dark:text-white w-full focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 text-sm font-medium" 
              />
            </div>

            <button onClick={() => setCurrentPage(1)} className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-violet-600/20">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-8 h-fit lg:sticky lg:top-48">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><Filter size={18} /> Filters</h3>
            <button onClick={resetFilters} className="text-slate-500 text-xs hover:text-slate-900 dark:hover:text-white transition-colors">Reset</button>
          </div>

          {/* Job Type */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-2">Job Type</h4>
            {['Full-Time', 'Part-Time', 'Internship', 'Contract'].map((type) => (
              <label key={type} className="flex items-center cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${selectedJobTypes.includes(type) ? 'bg-violet-600 border-violet-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent group-hover:border-violet-500'}`}>
                    {selectedJobTypes.includes(type) && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedJobTypes.includes(type)}
                    onChange={() => toggleFilter(selectedJobTypes, setSelectedJobTypes, type)}
                />
                <span className={`text-sm flex-1 transition-colors ${selectedJobTypes.includes(type) ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{type}</span>
              </label>
            ))}
          </div>

          {/* Expandable Extra Filters */}
          <div className={`space-y-6 overflow-hidden transition-all duration-300 ease-in-out ${showMoreFilters ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {/* Experience Level */}
              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-2">Experience Level</h4>
                {['Entry Level', 'Mid Level', 'Senior Level'].map((level) => (
                  <label key={level} className="flex items-center cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition-colors ${selectedExperience.includes(level) ? 'bg-cyan-600 border-cyan-600' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent group-hover:border-cyan-500'}`}>
                        {selectedExperience.includes(level) && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedExperience.includes(level)}
                        onChange={() => toggleFilter(selectedExperience, setSelectedExperience, level)}
                    />
                    <span className="text-slate-600 dark:text-slate-400 text-sm flex-1 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{level}</span>
                  </label>
                ))}
              </div>

              {/* Remote Toggle */}
              <label className="flex items-center justify-between cursor-pointer group p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Remote Only</span>
                  <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${remoteOnly ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${remoteOnly ? 'translate-x-4' : ''}`}></div>
                  </div>
                  <input type="checkbox" className="hidden" checked={remoteOnly} onChange={() => setRemoteOnly(!remoteOnly)} />
              </label>
          </div>

          <button 
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="w-full py-2.5 bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-[#253248] text-slate-600 dark:text-slate-300 text-sm font-medium rounded-xl transition-colors border border-slate-200 dark:border-white/5 flex items-center justify-center gap-2"
          >
              {showMoreFilters ? 'Less Filters' : 'More Filters'}
              {showMoreFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
           <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 dark:text-slate-400 text-sm">Showing {currentJobs.length} of {filteredJobs.length} jobs</span>
              <div className="flex items-center gap-2">
                 <span className="text-slate-500 text-xs">Sort by:</span>
                 <select className="bg-transparent text-sm text-slate-800 dark:text-white outline-none font-medium cursor-pointer">
                     <option>Newest</option>
                     <option>Relevant</option>
                 </select>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {currentJobs.map((job) => (
                <div key={job.id} className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-violet-500/30 hover:bg-slate-50 dark:hover:bg-[#131C31] transition-all group relative cursor-pointer shadow-sm dark:shadow-none">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                        {/* Logo */}
                        <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-white p-2 flex items-center justify-center shrink-0 overflow-hidden border border-slate-100 dark:border-none">
                            <img src={job.logo} alt={job.company} className="object-contain w-full h-full" />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{job.title}</h3>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                                        <span className="font-medium text-slate-700 dark:text-white">{job.company}</span>
                                        <span className="w-1 h-1 bg-slate-400 dark:bg-slate-600 rounded-full" />
                                        <span>{job.location}</span>
                                    </div>
                                </div>
                                <button className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    <Bookmark size={20} />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5">
                                    {job.type}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 flex items-center gap-1">
                                    <DollarSign size={12} /> {job.salary}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 flex items-center gap-1">
                                    <Clock size={12} /> {job.posted}
                                </span>
                                {job.hasTest && (
                                    <span className="px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-xs font-bold text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 flex items-center gap-1">
                                        <FileCheck size={12} /> Screening Test
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Action */}
                        <div className="md:border-l border-slate-200 dark:border-white/5 md:pl-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0">
                            <div className="text-xs text-slate-500 font-medium">
                                {job.applicants} Applicants
                            </div>
                            <button 
                                onClick={() => handleApplyClick(job)}
                                className="px-6 py-2 text-sm font-bold bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-colors shadow-lg shadow-violet-600/10 flex items-center gap-2"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
              ))}
              
              {currentJobs.length === 0 && (
                  <div className="text-center py-20 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                      <Search size={48} className="mx-auto text-slate-400 mb-4 opacity-50" />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No jobs found</h3>
                      <p className="text-slate-500 mb-6">Try adjusting your search or filters.</p>
                      <button onClick={resetFilters} className="px-6 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                          Clear Filters
                      </button>
                  </div>
              )}
           </div>
           
           {/* Pagination Controls */}
           {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-3">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1E2330] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        // Simple logic to show limited pages if many
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                            return (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                                        currentPage === page 
                                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20 scale-110' 
                                        : 'bg-slate-100 dark:bg-[#1E2330] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    {page}
                                </button>
                            )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="text-slate-400">...</span>
                        }
                        return null;
                    })}

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1E2330] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>

      </div>

      {/* Application / Test Modal */}
      {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/50 dark:bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedJob(null)} />
              
              <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col text-slate-900 dark:text-white">
                  {showTestIntro ? (
                      // Test Intro View
                      <div className="p-8 text-center">
                          <div className="w-20 h-20 bg-cyan-50 dark:bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                              <FileCheck size={40} className="text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Screening Test Required</h2>
                          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                              To complete your application for <span className="text-slate-900 dark:text-white font-semibold">{selectedJob.title}</span>, you must pass a short assessment.
                          </p>
                          
                          <div className="flex justify-center gap-6 mb-8">
                              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 w-32">
                                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedJob.testConfig?.questions?.length || 5}</div>
                                  <div className="text-xs text-slate-500 uppercase font-bold mt-1">Questions</div>
                              </div>
                              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 w-32">
                                  <div className="text-2xl font-bold text-slate-900 dark:text-white">10</div>
                                  <div className="text-xs text-slate-500 uppercase font-bold mt-1">Minutes</div>
                              </div>
                          </div>

                          <div className="flex flex-col gap-3">
                              <button 
                                  onClick={handleStartTest}
                                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                              >
                                  Start Test Now <PlayCircle size={20} />
                              </button>
                              <button 
                                  onClick={() => setSelectedJob(null)}
                                  className="text-slate-500 hover:text-slate-400 text-sm font-medium py-2"
                              >
                                  Take later (Application saved)
                              </button>
                          </div>
                      </div>
                  ) : (
                      // Application Form View
                      <>
                        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Apply for {selectedJob.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedJob.company} • {selectedJob.location}</p>
                            </div>
                            <button onClick={() => setSelectedJob(null)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white dark:bg-[#0F172A]">
                            <form id="applicationForm" onSubmit={handleSubmitApplication} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Full Name</label>
                                        <input 
                                            required type="text" name="name" value={formData.name} onChange={handleInputChange}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Email Address</label>
                                        <input 
                                            required type="email" name="email" value={formData.email} onChange={handleInputChange}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Phone Number</label>
                                        <input 
                                            required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                            placeholder="+880 17..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Portfolio / LinkedIn</label>
                                        <input 
                                            type="url" name="portfolio" value={formData.portfolio} onChange={handleInputChange}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 outline-none"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Upload CV / Resume</label>
                                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${cvFile ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group'}`}>
                                        {!cvFile ? (
                                            <>
                                                <input type="file" className="hidden" id="cv-upload" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                                <label htmlFor="cv-upload" className="cursor-pointer block w-full h-full">
                                                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                                        <Upload size={20} />
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-white">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-slate-500 mt-1">PDF, DOCX (Max 5MB)</p>
                                                </label>
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-lg flex items-center justify-center">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{cvFile.name}</p>
                                                        <p className="text-xs text-slate-500">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => setCvFile(null)} type="button" className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 dark:hover:bg-red-500/20 dark:text-slate-400 dark:hover:text-red-400 rounded-full transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Cover Letter</label>
                                    <textarea 
                                        rows={3} name="coverLetter" value={formData.coverLetter} onChange={handleInputChange}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500 outline-none resize-none custom-scrollbar"
                                        placeholder="Why are you a good fit?"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A] rounded-b-3xl flex justify-end gap-3">
                            <button onClick={() => setSelectedJob(null)} className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                Cancel
                            </button>
                            <button 
                                type="submit" form="applicationForm" disabled={isSubmitting}
                                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Application'} <Send size={18} />
                            </button>
                        </div>
                      </>
                  )}
              </div>
          </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
          <div className="fixed bottom-8 right-8 z-[60] bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={20} />
              </div>
              <div>
                  <h4 className="font-bold text-sm">Application Sent!</h4>
                  <p className="text-xs text-green-100">We will review your profile soon.</p>
              </div>
          </div>
      )}
    </div>
  );
};