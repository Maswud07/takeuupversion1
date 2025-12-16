import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Upload, 
  Settings, 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Image as ImageIcon, 
  File, 
  Video, 
  BarChart3, 
  DollarSign, 
  Bell, 
  LogOut, 
  Mail, 
  Send, 
  Save, 
  HelpCircle, 
  PenTool, 
  ChevronDown, 
  X,
  Lock,
  Unlock,
  Briefcase,
  MapPin,
  Star,
  UserCheck,
  Phone,
  Link as LinkIcon,
  Download,
  Globe,
  Rocket,
  ClipboardList,
  Check,
  AlertTriangle,
  Calendar,
  Clock,
  ExternalLink,
  Map,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminPanelProps {
    onLogout?: () => void;
}

// Mock Data
const MOCK_USERS = [
  { id: 1, name: 'Rahim Uddin', email: 'rahim@example.com', role: 'Student', plan: 'Free', status: 'Active' },
  { id: 2, name: 'Sarah Khan', email: 'sarah@example.com', role: 'Student', plan: 'Premium', status: 'Active' },
  { id: 3, name: 'Admin User', email: 'admin@takeuup.com', role: 'Admin', plan: 'All-In-One', status: 'Active' },
  { id: 4, name: 'Karim Hasan', email: 'karim@example.com', role: 'Student', plan: 'Free', status: 'Inactive' },
];

const BLOG_CATEGORIES = [
    'General', 
    'SSC Chemistry', 
    'HSC Math', 
    'HSC Physics', 
    'University Admission', 
    'BCS Guide', 
    'Study Hacks', 
    'Career Advice', 
    'IELTS', 
    'Job Prep'
];

const SUBJECTS_BY_CATEGORY: Record<string, string[]> = {
    'HSC': ['Physics', 'Chemistry', 'Math', 'Biology', 'ICT', 'English', 'Bangla'],
    'Admission': ['Physics', 'Chemistry', 'Math', 'Biology', 'GK', 'English'],
    'Job Prep': ['Math', 'English', 'General Knowledge', 'Mental Ability', 'Bangla'],
    'BCS': ['Bangladesh Affairs', 'International Affairs', 'English Lit', 'Bangla Lit', 'Math', 'Science'],
    'IELTS': ['Reading', 'Writing', 'Listening', 'Speaking'],
    'ISSB': ['IQ', 'PPDT', 'Psychology']
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const navigate = useNavigate();
  
  // State for Settings (Logo)
  const [siteLogo, setSiteLogo] = useState<string | null>(null);
  
  // State for Question Upload
  const [quizAccess, setQuizAccess] = useState('Free');
  const [quizClass, setQuizClass] = useState('HSC');
  const [quizSubject, setQuizSubject] = useState(SUBJECTS_BY_CATEGORY['HSC'][0]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('0');
  const [explanation, setExplanation] = useState('');
  
  // State for Blog Manager
  const [blogs, setBlogs] = useState<any[]>([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState(BLOG_CATEGORIES[0]);
  const [blogContent, setBlogContent] = useState('');
  const [blogImage, setBlogImage] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // State for Newsletter
  const [newsSubject, setNewsSubject] = useState('');
  const [newsBody, setNewsBody] = useState('');

  // State for Job Manager
  const [jobs, setJobs] = useState<any[]>([
      { id: 1, title: 'Junior Frontend Dev', company: 'TechBD', location: 'Dhaka', salary: '20k', type: 'Full-time', applicants: 12, destination: 'Portal' },
      { id: 2, title: 'Content Writer', company: 'EduHive', location: 'Remote', salary: '10k', type: 'Internship', applicants: 45, destination: 'Career' },
  ]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [jobDestination, setJobDestination] = useState('Portal');
  const [isFeaturedJob, setIsFeaturedJob] = useState(false);

  // State for Applications
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  
  // Review & Schedule State
  const [reviewTestApp, setReviewTestApp] = useState<any>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  
  // New Schedule Data Structure
  const [scheduleData, setScheduleData] = useState({
      type: 'online', // 'online' | 'onsite'
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      link: 'https://meet.google.com/wdk-sfd-xky',
      location: 'Level 4, TakeUUp HQ, Banani, Dhaka',
      message: 'We were impressed by your profile and test results.'
  });

  useEffect(() => {
      const storedLogo = localStorage.getItem('takeuup_logo');
      if (storedLogo) setSiteLogo(storedLogo);

      // Load existing blogs for management
      const storedBlogs = localStorage.getItem('takeuup_blogs');
      if (storedBlogs) {
          try {
              setBlogs(JSON.parse(storedBlogs));
          } catch(e) { console.error(e); }
      }

      // Load Job Applications
      const storedApps = localStorage.getItem('takeuup_applications');
      if (storedApps) {
          try {
              setApplications(JSON.parse(storedApps));
          } catch (e) { console.error(e); }
      }

      // Load Posted Jobs
      const storedJobs = localStorage.getItem('takeuup_jobs');
      if (storedJobs) {
          try {
              // Merge with default mock data if needed, or just use stored
              const parsedJobs = JSON.parse(storedJobs);
              if (parsedJobs.length > 0) {
                  setJobs(parsedJobs);
              }
          } catch (e) { console.error(e); }
      }
  }, [activeView]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (ev) => {
              if (ev.target?.result) {
                  const result = ev.target.result as string;
                  setSiteLogo(result);
                  localStorage.setItem('takeuup_logo', result);
                  // Dispatch event for instant update in Navbar
                  window.dispatchEvent(new Event('logoUpdated'));
                  alert("Logo updated successfully! Check the main navigation.");
              }
          };
          reader.readAsDataURL(e.target.files[0]);
      }
  };

  const handleBlogImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          if (file.size > 1048576) {
              alert("Image is too large. Please upload an image smaller than 1MB.");
              return;
          }
          const reader = new FileReader();
          reader.onload = (ev) => {
              if (ev.target?.result) {
                  setBlogImage(ev.target.result as string);
              }
          };
          reader.readAsDataURL(file);
      }
  };

  const handleClassChange = (newClass: string) => {
      setQuizClass(newClass);
      setQuizSubject(SUBJECTS_BY_CATEGORY[newClass]?.[0] || '');
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
      e.preventDefault();
      const newQuestion = {
          accessLevel: quizAccess,
          category: quizClass,
          subject: quizSubject,
          text: questionText,
          options,
          correctAnswer,
          explanation
      };
      
      console.log("Saving Question:", newQuestion);
      alert(`Question Added to Database!\nCategory: ${quizClass}\nSubject: ${quizSubject}\nAccess: ${quizAccess}`);
      
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('0');
      setExplanation('');
  };

  const handleOptionChange = (index: number, value: string) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
  };

  const handlePublishBlog = (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const newBlog = {
              id: editingPostId || Date.now().toString(),
              title: blogTitle,
              author: 'Admin User',
              readTime: `${Math.ceil(blogContent.split(' ').length / 200)} min`,
              category: blogCategory,
              imageUrl: blogImage || `https://picsum.photos/seed/${Date.now()}/400/250`,
              content: blogContent,
              date: new Date().toLocaleDateString()
          };

          let updatedBlogs = [...blogs];
          if (editingPostId) {
              updatedBlogs = updatedBlogs.map(b => b.id === editingPostId ? newBlog : b);
          } else {
              updatedBlogs = [newBlog, ...updatedBlogs];
          }
          
          localStorage.setItem('takeuup_blogs', JSON.stringify(updatedBlogs));
          setBlogs(updatedBlogs);
          setShowSuccessModal(true);
          resetBlogForm();

      } catch (error: any) {
          console.error("Failed to save blog:", error);
          alert("An error occurred while publishing the blog.");
      }
  };

  const resetBlogForm = () => {
      setBlogTitle('');
      setBlogCategory(BLOG_CATEGORIES[0]);
      setBlogContent('');
      setBlogImage(null);
      setEditingPostId(null);
  };

  const handleEditPost = (post: any) => {
      setBlogTitle(post.title);
      setBlogCategory(post.category);
      setBlogContent(post.content || ''); 
      setBlogImage(post.imageUrl);
      setEditingPostId(post.id);
      
      const formElement = document.getElementById('blog-form');
      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeletePost = (id: string) => {
      if (window.confirm('Are you sure you want to delete this post?')) {
          const updated = blogs.filter(b => b.id !== id);
          setBlogs(updated);
          localStorage.setItem('takeuup_blogs', JSON.stringify(updated));
          if (editingPostId === id) resetBlogForm();
      }
  };

  const handleSendNewsletter = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Newsletter "${newsSubject}" sent to 12,450 subscribers.`);
      setNewsSubject('');
      setNewsBody('');
  };

  const handlePostJob = (e: React.FormEvent) => {
      e.preventDefault();
      const newJob = {
          id: Date.now(),
          title: jobTitle,
          company: jobCompany,
          location: jobLocation,
          salary: jobSalary,
          type: jobType,
          applicants: 0,
          isFeatured: isFeaturedJob,
          destination: jobDestination
      };
      
      const updatedJobs = [newJob, ...jobs];
      setJobs(updatedJobs);
      localStorage.setItem('takeuup_jobs', JSON.stringify(updatedJobs));
      
      alert(`Job "${jobTitle}" posted successfully to ${jobDestination === 'Career' ? 'TakeUUp Careers' : 'Main Job Portal'}!`);
      
      setJobTitle('');
      setJobCompany('');
      setJobLocation('');
      setJobSalary('');
      setJobType('Full-time');
      setIsFeaturedJob(false);
      setJobDestination('Portal');
  };

  const deleteJob = (id: number) => {
      if(window.confirm("Delete this job posting?")) {
          const updatedJobs = jobs.filter(j => j.id !== id);
          setJobs(updatedJobs);
          localStorage.setItem('takeuup_jobs', JSON.stringify(updatedJobs));
      }
  };

  const updateApplicationStatus = (appId: number, status: string, interviewDetails?: any) => {
      const updatedApps = applications.map(app => 
          app.id === appId ? { ...app, status, interview: interviewDetails } : app
      );
      setApplications(updatedApps);
      localStorage.setItem('takeuup_applications', JSON.stringify(updatedApps));
      
      if (selectedApplication && selectedApplication.id === appId) {
          setSelectedApplication(prev => ({ ...prev, status }));
      }
      if (reviewTestApp && reviewTestApp.id === appId) {
          setReviewTestApp(prev => ({ ...prev, status }));
      }
  };

  const handleSendInvite = (e: React.FormEvent) => {
      e.preventDefault();
      if (reviewTestApp) {
          updateApplicationStatus(reviewTestApp.id, 'Email Sent', scheduleData);
          
          let locationMsg = "";
          if (scheduleData.type === 'online') {
              locationMsg = `Link: ${scheduleData.link}`;
          } else {
              locationMsg = `Location: ${scheduleData.location}`;
          }

          alert(`📧 Email Sent Successfully to ${reviewTestApp.email}!\n\nSubject: Interview Invitation for ${reviewTestApp.jobTitle}\n\n"Hi ${reviewTestApp.name},\nWe are pleased to invite you for an ${scheduleData.type} interview.\nDate: ${scheduleData.date}\nTime: ${scheduleData.time}\n${locationMsg}\n\n${scheduleData.message}"`);
          
          setReviewTestApp(null);
          setShowScheduleModal(false);
      }
  };

  const downloadCV = (fileName: string) => {
      alert(`Downloading CV: ${fileName}\n\n(This is a mock download in the demo environment)`);
  };

  const handleLogoutClick = () => {
      if (onLogout) onLogout();
      navigate('/');
  };

  // --- Render Sections ---

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex gap-4">
          <button 
              onClick={() => setActiveView('jobs')} 
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 p-6 rounded-2xl flex items-center justify-between group shadow-lg hover:shadow-violet-500/20 transition-all"
          >
              <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Post a New Job</h3>
                  <p className="text-violet-200 text-sm">Create a listing for your company</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <Plus size={24} className="text-white" />
              </div>
          </button>
          <button 
              onClick={() => setActiveView('applications')} 
              className="flex-1 bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center justify-between group hover:border-cyan-500/50 transition-all"
          >
              <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Review Applications</h3>
                  <p className="text-slate-400 text-sm">{applications.length} candidates waiting</p>
              </div>
              <div className="bg-slate-700 p-3 rounded-xl group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                  <UserCheck size={24} />
              </div>
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Revenue', value: '$4,200', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Questions', value: '5,300+', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Storage', value: '45%', icon: BarChart3, color: 'text-orange-400', bg: 'bg-orange-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6 animate-in fade-in">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">User Management</h2>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus size={18} /> Add User
            </button>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-700 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input type="text" placeholder="Search users..." className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:border-cyan-500 outline-none" />
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-900 text-slate-200 uppercase font-bold">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {MOCK_USERS.map(user => (
                            <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{user.name}</div>
                                        <div className="text-xs">{user.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.plan === 'Premium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-slate-700 text-slate-300'}`}>
                                        {user.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center gap-1 ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                                        {user.status === 'Active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-white p-2"><MoreVertical size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );

  const renderJobManager = () => (
      <div className="space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Job Board Manager</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-800 p-8 rounded-2xl border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Briefcase size={20} className="text-violet-400" /> Post New Job
                  </h3>
                  <form onSubmit={handlePostJob} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-slate-400 mb-1">Job Title</label>
                              <input required type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none" placeholder="e.g. Junior Developer" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-400 mb-1">Company</label>
                              <input required type="text" value={jobCompany} onChange={e => setJobCompany(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none" placeholder="e.g. Tech Solutions" />
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-slate-400 mb-1">Location</label>
                              <input required type="text" value={jobLocation} onChange={e => setJobLocation(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none" placeholder="e.g. Dhaka, Remote" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-400 mb-1">Salary Range</label>
                              <input type="text" value={jobSalary} onChange={e => setJobSalary(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none" placeholder="e.g. 20k - 30k" />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-slate-400 mb-1">Job Type</label>
                              <select value={jobType} onChange={e => setJobType(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none">
                                  <option>Full-time</option>
                                  <option>Part-time</option>
                                  <option>Internship</option>
                                  <option>Contract</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-400 mb-1">Post Destination</label>
                              <select value={jobDestination} onChange={e => setJobDestination(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-violet-500 outline-none">
                                  <option value="Portal">Main Job Portal</option>
                                  <option value="Career">TakeUUp Careers</option>
                              </select>
                          </div>
                      </div>

                      <div className="flex justify-end pt-2">
                          <button type="submit" className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-violet-900/20">
                              <Briefcase size={18} /> Post Job
                          </button>
                      </div>
                  </form>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4">Active Listings</h3>
                  <div className="space-y-3">
                      {jobs.map(job => (
                          <div key={job.id} className="p-4 bg-slate-900 rounded-xl border border-slate-700 flex flex-col gap-2 relative group">
                              <div className="flex justify-between items-start">
                                  <div>
                                      <h4 className="font-bold text-white text-sm">{job.title}</h4>
                                      <p className="text-xs text-slate-400">{job.company} • {job.type}</p>
                                      <span className={`text-[10px] px-1.5 py-0.5 rounded border mt-1.5 inline-flex items-center gap-1 font-bold ${job.destination === 'Career' ? 'border-pink-500/50 text-pink-400 bg-pink-500/10' : 'border-blue-500/50 text-blue-400 bg-blue-500/10'}`}>
                                          {job.destination === 'Career' ? <Rocket size={10} /> : <Globe size={10} />}
                                          {job.destination === 'Career' ? 'Internal Career' : 'Job Portal'}
                                      </span>
                                  </div>
                                  <button onClick={() => deleteJob(job.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                                      <Trash2 size={14} />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  );

  const renderApplications = () => (
      <div className="space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Application Review</h2>
          </div>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
              <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-slate-900 text-slate-300 uppercase font-bold text-xs">
                      <tr>
                          <th className="px-6 py-4">Applicant</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Test Score</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                      {applications.map(app => (
                          <tr key={app.id} className="hover:bg-slate-700/30">
                              <td className="px-6 py-4">
                                  <div className="font-bold text-white">{app.name}</div>
                                  <div className="text-xs">{app.email}</div>
                              </td>
                              <td className="px-6 py-4">{app.jobTitle}</td>
                              <td className="px-6 py-4">
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                                      app.status === 'Qualified' ? 'bg-green-500/10 text-green-400' : 
                                      app.status === 'Disqualified' ? 'bg-red-500/10 text-red-400' : 
                                      'bg-yellow-500/10 text-yellow-400'
                                  }`}>
                                      {app.status}
                                  </span>
                              </td>
                              <td className="px-6 py-4 font-mono">{app.testScore ? `${app.testScore.toFixed(1)}%` : 'N/A'}</td>
                              <td className="px-6 py-4 text-right flex justify-end gap-2">
                                  <button onClick={() => downloadCV(app.cvFileName)} className="p-2 hover:bg-slate-600 rounded text-blue-400" title="Download CV"><Download size={16} /></button>
                                  <button onClick={() => { setReviewTestApp(app); setShowScheduleModal(true); }} className="p-2 hover:bg-slate-600 rounded text-green-400" title="Schedule Interview"><Calendar size={16} /></button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );

  const renderBlogManager = () => (
      <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-bold text-white">Blog Manager</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <h3 className="font-bold text-white mb-4">{editingPostId ? 'Edit Post' : 'Create New Post'}</h3>
                  <form id="blog-form" onSubmit={handlePublishBlog} className="space-y-4">
                      <input type="text" placeholder="Title" value={blogTitle} onChange={e => setBlogTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
                      <select value={blogCategory} onChange={e => setBlogCategory(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white">
                          {BLOG_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <textarea placeholder="Content..." rows={6} value={blogContent} onChange={e => setBlogContent(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
                      <div className="flex gap-2">
                          <button type="submit" className="bg-cyan-600 text-white px-6 py-2 rounded-xl font-bold">Publish</button>
                          {editingPostId && <button type="button" onClick={resetBlogForm} className="bg-slate-700 text-white px-4 py-2 rounded-xl">Cancel</button>}
                      </div>
                  </form>
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 overflow-y-auto max-h-[600px]">
                  <h3 className="font-bold text-white mb-4">Published Posts</h3>
                  <div className="space-y-3">
                      {blogs.map(blog => (
                          <div key={blog.id} className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex justify-between items-center">
                              <span className="text-sm text-slate-300 truncate w-32">{blog.title}</span>
                              <div className="flex gap-2">
                                  <button onClick={() => handleEditPost(blog)} className="text-blue-400"><Edit size={14} /></button>
                                  <button onClick={() => handleDeletePost(blog.id)} className="text-red-400"><Trash2 size={14} /></button>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  );

  const renderNewsletter = () => (
      <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-bold text-white">Newsletter</h2>
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-2xl">
              <form onSubmit={handleSendNewsletter} className="space-y-4">
                  <input type="text" placeholder="Subject" value={newsSubject} onChange={e => setNewsSubject(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
                  <textarea placeholder="Message Body..." rows={6} value={newsBody} onChange={e => setNewsBody(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
                  <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                      <Send size={18} /> Send Broadcast
                  </button>
              </form>
          </div>
      </div>
  );

  const renderQuestionUpload = () => (
      <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-bold text-white">Question Bank Upload</h2>
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-2xl">
              <form onSubmit={handleSaveQuestion} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                      <select value={quizClass} onChange={e => handleClassChange(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white">
                          {Object.keys(SUBJECTS_BY_CATEGORY).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select value={quizSubject} onChange={e => setQuizSubject(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white">
                          {SUBJECTS_BY_CATEGORY[quizClass]?.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                  </div>
                  <input type="text" placeholder="Question Text" value={questionText} onChange={e => setQuestionText(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
                  <div className="space-y-2">
                      {options.map((opt, i) => (
                          <input key={i} type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={e => handleOptionChange(i, e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white" />
                      ))}
                  </div>
                  <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold">Save Question</button>
              </form>
          </div>
      </div>
  );

  const renderSettings = () => (
      <div className="space-y-6 animate-in fade-in">
          <h2 className="text-2xl font-bold text-white">Platform Settings</h2>
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-xl">
              <div className="mb-6">
                  <h3 className="font-bold text-white mb-2">Site Logo</h3>
                  <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden">
                          {siteLogo ? <img src={siteLogo} alt="Logo" className="w-full h-full object-contain" /> : <ImageIcon className="text-slate-500" />}
                      </div>
                      <label className="bg-cyan-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-cyan-500">
                          Upload New
                          <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0">
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center font-bold">A</div>
                    <span className="font-bold text-xl">Admin Panel</span>
                </div>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {[
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { id: 'users', label: 'Users', icon: Users },
                    { id: 'jobs', label: 'Job Board', icon: Briefcase },
                    { id: 'applications', label: 'Applications', icon: UserCheck },
                    { id: 'blog', label: 'Blog', icon: FileText },
                    { id: 'newsletter', label: 'Newsletter', icon: Mail },
                    { id: 'upload', label: 'Question Bank', icon: Upload },
                    { id: 'settings', label: 'Settings', icon: Settings },
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                            activeView === item.id 
                            ? 'bg-cyan-600/10 text-cyan-400 border border-cyan-600/20' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <button onClick={handleLogoutClick} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto h-screen bg-slate-950">
            {activeView === 'dashboard' && (
                <div className="space-y-6 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                        { label: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                        { label: 'Revenue', value: '$4,200', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
                        { label: 'Questions', value: '5,300+', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                        { label: 'Storage', value: '45%', icon: BarChart3, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                        ].map((stat, i) => (
                        <div key={i} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                            <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    {/* Action Cards */}
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setActiveView('jobs')} 
                            className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 p-6 rounded-2xl flex items-center justify-between group shadow-lg hover:shadow-violet-500/20 transition-all"
                        >
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-white mb-1">Post a New Job</h3>
                                <p className="text-violet-200 text-sm">Create a listing for your company</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                                <Plus size={24} className="text-white" />
                            </div>
                        </button>
                        <button 
                            onClick={() => setActiveView('applications')} 
                            className="flex-1 bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center justify-between group hover:border-cyan-500/50 transition-all"
                        >
                            <div className="text-left">
                                <h3 className="text-xl font-bold text-white mb-1">Review Applications</h3>
                                <p className="text-slate-400 text-sm">{applications.length} candidates waiting</p>
                            </div>
                            <div className="bg-slate-700 p-3 rounded-xl group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                                <UserCheck size={24} />
                            </div>
                        </button>
                    </div>
                </div>
            )}
            {activeView === 'users' && renderUsers()}
            {activeView === 'jobs' && renderJobManager()}
            {activeView === 'applications' && renderApplications()}
            {activeView === 'blog' && renderBlogManager()}
            {activeView === 'newsletter' && renderNewsletter()}
            {activeView === 'upload' && renderQuestionUpload()}
            {activeView === 'settings' && renderSettings()}
        </main>
        
        {/* Schedule Modal */}
        {showScheduleModal && reviewTestApp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 relative">
                    <button onClick={() => setShowScheduleModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20}/></button>
                    <h3 className="text-xl font-bold text-white mb-4">Schedule Interview</h3>
                    <p className="text-slate-400 text-sm mb-4">Invite <strong>{reviewTestApp.name}</strong> for {reviewTestApp.jobTitle}</p>
                    
                    <form onSubmit={handleSendInvite} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                                <input type="date" value={scheduleData.date} onChange={e => setScheduleData({...scheduleData, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time</label>
                                <input type="time" value={scheduleData.time} onChange={e => setScheduleData({...scheduleData, time: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                            <select value={scheduleData.type} onChange={e => setScheduleData({...scheduleData, type: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white">
                                <option value="online">Online (Google Meet)</option>
                                <option value="onsite">On-site (Office)</option>
                            </select>
                        </div>
                        {scheduleData.type === 'online' ? (
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Link</label>
                                <input type="text" value={scheduleData.link} onChange={e => setScheduleData({...scheduleData, link: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                                <input type="text" value={scheduleData.location} onChange={e => setScheduleData({...scheduleData, location: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                            </div>
                        )}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message</label>
                            <textarea rows={3} value={scheduleData.message} onChange={e => setScheduleData({...scheduleData, message: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white" />
                        </div>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl">Send Invitation</button>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};