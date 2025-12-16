import React, { useState, useEffect } from 'react';
import { ArrowRight, Code, Video, PenTool, Database, GraduationCap, MapPin, Clock, Briefcase, Heart, Globe, Zap, CheckCircle2, ChevronRight, Sparkles, X, Upload, Paperclip, Send, FileText, Trash2, FileCheck, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STATIC_OPENINGS = [
    {
        id: 1,
        role: 'Senior React Developer',
        dept: 'Engineering',
        type: 'Full-time',
        location: 'Remote / Dhaka',
        salary: '80k - 120k BDT',
        icon: <Code size={24} />,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30'
    },
    {
        id: 2,
        role: 'Instructor (Math & Physics)',
        dept: 'Content',
        type: 'Part-time',
        location: 'Studio (Dhaka)',
        salary: 'Negotiable',
        icon: <GraduationCap size={24} />,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30'
    },
    {
        id: 3,
        role: 'Video Editor & Animator',
        dept: 'Creative',
        type: 'Contract',
        location: 'Remote',
        salary: 'Project Based',
        icon: <Video size={24} />,
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
        border: 'border-pink-500/30'
    },
    {
        id: 4,
        role: 'Digital Marketer',
        dept: 'Marketing',
        type: 'Full-time',
        location: 'Dhaka',
        salary: '35k - 50k BDT',
        icon: <Zap size={24} />,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30'
    },
    {
        id: 5,
        role: 'Data Entry Operator',
        dept: 'Operations',
        type: 'Part-time',
        location: 'Remote',
        salary: '10k - 15k BDT',
        icon: <Database size={24} />,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30'
    }
];

export const CareerPage = () => {
    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showTestIntro, setShowTestIntro] = useState(false);
    const [dynamicJobs, setDynamicJobs] = useState<any[]>([]);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        coverLetter: ''
    });
    const [cvFile, setCvFile] = useState<File | null>(null);

    useEffect(() => {
        // Load jobs from admin panel that are marked for 'Career'
        const storedJobs = localStorage.getItem('takeuup_jobs');
        if (storedJobs) {
            try {
                const parsedJobs = JSON.parse(storedJobs);
                const careerJobs = parsedJobs.filter((job: any) => job.destination === 'Career');
                setDynamicJobs(careerJobs);
            } catch (e) { console.error("Error loading career jobs", e); }
        }
    }, []);

    const allOpenings = [...STATIC_OPENINGS, ...dynamicJobs.map((job) => ({
        id: job.id,
        role: job.title,
        dept: job.company || 'General',
        type: job.type,
        location: job.location || 'Remote',
        salary: job.salary || 'Competitive',
        icon: <Briefcase size={24} />, // Default icon for dynamic jobs
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        hasTest: job.hasTest,
        testConfig: job.testConfig
    }))];

    const handleApply = (job: any) => {
        setSelectedJob(job);
        // Reset form
        setFormData({ name: '', email: '', phone: '', portfolio: '', coverLetter: '' });
        setCvFile(null);
        setShowTestIntro(false);
    };

    const closeApplyModal = () => {
        setSelectedJob(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCvFile(e.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setCvFile(null);
    };

    const handleSubmitApplication = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!cvFile) {
            alert("Please upload your CV before submitting.");
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call and save to local storage for Admin Panel
        setTimeout(() => {
            const newApplication = {
                id: Date.now(),
                jobId: selectedJob.id,
                jobTitle: selectedJob.role,
                dept: selectedJob.dept,
                ...formData,
                date: new Date().toLocaleDateString(),
                status: selectedJob.hasTest ? 'Pending Test' : 'Pending',
                cvFileName: cvFile.name // Use real selected file name
            };

            const existingApps = JSON.parse(localStorage.getItem('takeuup_applications') || '[]');
            localStorage.setItem('takeuup_applications', JSON.stringify([newApplication, ...existingApps]));

            setIsSubmitting(false);
            
            // Check for test
            if (selectedJob.hasTest) {
                setShowTestIntro(true);
            } else {
                setSelectedJob(null);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden pb-20">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 text-center z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    We are hiring!
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                    Build the Future of <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Education</span>
                </h1>
                
                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Join TakeUUp and help millions of students across Bangladesh achieve their dreams. We're looking for passionate individuals to join our mission.
                </p>

                <div className="flex justify-center gap-8 text-slate-400 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <Globe size={18} className="text-cyan-500" /> Remote-First Culture
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart size={18} className="text-pink-500" /> Impact Driven
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="max-w-7xl mx-auto px-4 mb-24 relative z-10">
                <h2 className="text-2xl font-bold text-center mb-12">Why Join TakeUUp?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Competitive Salary", desc: "We pay top of the market rates to attract the best talent.", icon: <Briefcase size={24} /> },
                        { title: "Growth & Learning", desc: "Access to all our premium courses and paid upskilling.", icon: <GraduationCap size={24} /> },
                        { title: "Flexible Hours", desc: "Work when you're most productive. We care about output, not hours.", icon: <Clock size={24} /> }
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-800 transition-colors group">
                            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-900/10">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Positions */}
            <section className="max-w-5xl mx-auto px-4 relative z-10">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white mb-2">Open Positions</h2>
                        <p className="text-slate-400">Come do the best work of your life.</p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white">All</span>
                        <span className="px-3 py-1 bg-transparent border border-slate-700 rounded-full text-xs font-bold text-slate-400 hover:text-white cursor-pointer transition-colors">Engineering</span>
                        <span className="px-3 py-1 bg-transparent border border-slate-700 rounded-full text-xs font-bold text-slate-400 hover:text-white cursor-pointer transition-colors">Content</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {allOpenings.map((job) => (
                        <div 
                            key={job.id} 
                            onClick={() => handleApply(job)}
                            className={`group relative bg-[#0F172A] border ${job.border} p-6 md:p-8 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-${job.color.split('-')[1]}-500/10 overflow-hidden cursor-pointer`}
                        >
                            {/* Hover Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${job.bg.replace('bg-', 'from-')} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                            
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex items-start gap-5">
                                    <div className={`w-14 h-14 rounded-2xl ${job.bg} ${job.color} flex items-center justify-center shrink-0 shadow-inner`}>
                                        {job.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{job.role}</h3>
                                        <div className="flex flex-wrap gap-3 text-sm text-slate-400 mt-2">
                                            <span className="flex items-center gap-1"><Briefcase size={14} /> {job.dept}</span>
                                            <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                                    <span className="text-white font-bold bg-slate-800 px-3 py-1 rounded-lg text-sm border border-slate-700">
                                        {job.salary}
                                    </span>
                                    <button 
                                        className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-white transition-colors group/btn"
                                    >
                                        Apply Now <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></div>
                    <div className="relative z-10">
                        <Sparkles className="mx-auto text-yellow-400 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">Don't see your role?</h3>
                        <p className="text-slate-400 mb-6">
                            We are always looking for talented individuals. Send your CV to <span className="text-cyan-400 font-mono">careers@takeuup.com</span>
                        </p>
                        <button onClick={() => window.location.href = 'mailto:careers@takeuup.com'} className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2 mx-auto">
                            <Send size={18} /> Email Us
                        </button>
                    </div>
                </div>
            </section>

            {/* Application Modal */}
            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={closeApplyModal} />
                    
                    <div className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
                        
                        {showTestIntro ? (
                            // Test Intro View
                            <div className="p-8 text-center">
                                <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileCheck size={40} className="text-cyan-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2">Screening Test Required</h2>
                                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                    To complete your application for <span className="text-white font-semibold">{selectedJob.role}</span>, you must pass a short assessment.
                                </p>
                                
                                <div className="flex justify-center gap-6 mb-8">
                                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 w-32">
                                        <div className="text-2xl font-bold text-white">{selectedJob.testConfig?.questions?.length || 5}</div>
                                        <div className="text-xs text-slate-500 uppercase font-bold mt-1">Questions</div>
                                    </div>
                                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 w-32">
                                        <div className="text-2xl font-bold text-white">10</div>
                                        <div className="text-xs text-slate-500 uppercase font-bold mt-1">Minutes</div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button 
                                        onClick={() => navigate(`/jobs/test/${selectedJob.id}`)}
                                        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        Start Test Now <PlayCircle size={20} />
                                    </button>
                                    <button 
                                        onClick={closeApplyModal}
                                        className="text-slate-500 hover:text-slate-400 text-sm font-medium py-2"
                                    >
                                        Take later (Application saved)
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Application Form
                            <>
                                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Apply for {selectedJob.role}</h3>
                                        <p className="text-slate-400 text-sm">{selectedJob.dept} • {selectedJob.location}</p>
                                    </div>
                                    <button onClick={closeApplyModal} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                                    <form id="applicationForm" onSubmit={handleSubmitApplication} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-1.5">Full Name</label>
                                                <input 
                                                    required type="text" name="name" value={formData.name} onChange={handleInputChange}
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-1.5">Email Address</label>
                                                <input 
                                                    required type="email" name="email" value={formData.email} onChange={handleInputChange}
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-1.5">Phone Number</label>
                                                <input 
                                                    required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                                    placeholder="+880 17..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-1.5">Portfolio / LinkedIn</label>
                                                <input 
                                                    type="url" name="portfolio" value={formData.portfolio} onChange={handleInputChange}
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Upload CV / Resume</label>
                                            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${cvFile ? 'border-cyan-500 bg-cyan-900/20' : 'border-slate-700 hover:bg-slate-800/50 cursor-pointer group'}`}>
                                                {!cvFile ? (
                                                    <>
                                                        <input type="file" className="hidden" id="cv-upload" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                                        <label htmlFor="cv-upload" className="cursor-pointer block w-full h-full">
                                                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:text-cyan-400 transition-colors">
                                                                <Upload size={20} />
                                                            </div>
                                                            <p className="text-sm font-medium text-white">Click to upload or drag and drop</p>
                                                            <p className="text-xs text-slate-500 mt-1">PDF, DOCX (Max 5MB)</p>
                                                        </label>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center">
                                                                <FileText size={20} />
                                                            </div>
                                                            <div className="text-left">
                                                                <p className="text-sm font-bold text-white truncate max-w-[200px]">{cvFile.name}</p>
                                                                <p className="text-xs text-slate-400">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                            </div>
                                                        </div>
                                                        <button onClick={handleRemoveFile} type="button" className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-colors">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Why are you a good fit?</label>
                                            <textarea 
                                                rows={4}
                                                name="coverLetter"
                                                value={formData.coverLetter}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none resize-none custom-scrollbar"
                                                placeholder="Tell us about your experience and motivation..."
                                            />
                                        </div>
                                    </form>
                                </div>

                                <div className="p-6 border-t border-slate-800 bg-[#0F172A] rounded-b-3xl flex justify-end gap-3">
                                    <button 
                                        onClick={closeApplyModal}
                                        className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        form="applicationForm"
                                        disabled={isSubmitting}
                                        className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>Sending...</>
                                        ) : (
                                            <>Submit Application <Send size={18} /></>
                                        )}
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
                        <p className="text-xs text-green-100">We will get back to you soon.</p>
                    </div>
                </div>
            )}
        </div>
    );
};