import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, FileType, Table, Image, Layers, ArrowLeft, Upload, CheckCircle2, Download, X, Loader2, File, AlertCircle, Sparkles, RefreshCcw } from 'lucide-react';

// Tool Configuration
const TOOLS_CONFIG: Record<string, any> = {
    'pdf-to-word': {
        title: 'PDF to Word Converter',
        desc: 'Convert your PDF documents to editable Word files instantly.',
        accept: '.pdf',
        icon: FileText,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        resultExt: '.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    },
    'word-to-pdf': {
        title: 'Word to PDF Converter',
        desc: 'Transform your DOCX files into professional, read-only PDFs.',
        accept: '.doc,.docx',
        icon: FileType,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        resultExt: '.pdf',
        mimeType: 'application/pdf'
    },
    'pdf-to-excel': {
        title: 'PDF to Excel Converter',
        desc: 'Extract tables from PDFs into editable Excel spreadsheets.',
        accept: '.pdf',
        icon: Table,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        resultExt: '.xlsx',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    'img-to-pdf': {
        title: 'Image to PDF',
        desc: 'Convert JPG, PNG images into a single PDF document.',
        accept: 'image/*',
        icon: Image,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        resultExt: '.pdf',
        mimeType: 'application/pdf'
    },
    'merge-pdf': {
        title: 'Merge PDF',
        desc: 'Combine multiple PDF files into one organized document.',
        accept: '.pdf',
        icon: Layers,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        resultExt: '.pdf',
        multiple: true,
        mimeType: 'application/pdf'
    }
};

export const ToolsInterface = () => {
    const { toolId } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const config = toolId ? TOOLS_CONFIG[toolId] : null;

    useEffect(() => {
        if (!config) {
            navigate('/');
        }
    }, [config, navigate]);

    if (!config) return null;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const startConversion = () => {
        setIsConverting(true);
        setProgress(0);

        // Simulate conversion progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsConverting(false);
                    setIsDone(true);
                    return 100;
                }
                // Random increment to look natural
                return prev + Math.random() * 15;
            });
        }, 300);
    };

    const handleDownload = () => {
        if (file) {
            const fileName = file.name.split('.')[0] + config.resultExt;
            const blob = new Blob(['Mock converted content'], { type: config.mimeType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    };

    const resetTool = () => {
        setFile(null);
        setIsConverting(false);
        setProgress(0);
        setIsDone(false);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

            <button 
                onClick={() => navigate('/')} 
                className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/5 backdrop-blur-md"
            >
                <ArrowLeft size={18} /> <span className="text-sm font-medium">Back</span>
            </button>

            <div className="w-full max-w-xl relative z-10">
                {/* Header */}
                <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className={`inline-flex p-4 rounded-3xl ${config.bg} ${config.color} mb-6 shadow-[0_0_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10`}>
                        <config.icon size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        {config.title}
                    </h1>
                    <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                        {config.desc}
                    </p>
                </div>

                {/* Main Interaction Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] p-2 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[2.5rem]" />
                    
                    <div className="bg-slate-950/50 rounded-[2rem] p-8 md:p-12 relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center border border-slate-800/50">
                        
                        {/* STATE: IDLE / DRAGGING */}
                        {!file && (
                            <div 
                                className={`w-full h-full flex flex-col items-center justify-center transition-all duration-300 ${isDragging ? 'scale-105' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className={`w-full h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-300 group-hover:border-slate-600 ${
                                    isDragging 
                                    ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
                                    : 'border-slate-700 bg-slate-900/50'
                                }`}>
                                    <div className={`p-5 rounded-full mb-6 transition-all duration-500 ${isDragging ? 'bg-cyan-500 text-white scale-110' : 'bg-slate-800 text-slate-400 group-hover:scale-110 group-hover:text-white'}`}>
                                        <Upload size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Drag & Drop file here</h3>
                                    <p className="text-slate-500 text-sm mb-6">or click to browse</p>
                                    
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        className="hidden" 
                                        accept={config.accept}
                                        multiple={config.multiple}
                                        onChange={handleFileSelect}
                                    />
                                    
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-8 py-3 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-all transform hover:-translate-y-1 shadow-lg"
                                    >
                                        Browse Files
                                    </button>
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-widest">
                                    <AlertCircle size={14} /> Supports: {config.accept.replace(/\./g, '').toUpperCase()}
                                </div>
                            </div>
                        )}

                        {/* STATE: FILE SELECTED / CONVERTING */}
                        {file && !isDone && (
                            <div className="w-full animate-in fade-in zoom-in duration-300">
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-8 relative group/file">
                                    <button 
                                        onClick={() => !isConverting && setFile(null)}
                                        className={`absolute top-4 right-4 p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors ${isConverting ? 'hidden' : ''}`}
                                    >
                                        <X size={18} />
                                    </button>
                                    
                                    <div className="flex items-center gap-5">
                                        <div className={`w-16 h-16 rounded-2xl ${config.bg} ${config.color} flex items-center justify-center shadow-lg`}>
                                            <FileText size={32} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-lg font-bold text-white truncate">{file.name}</h4>
                                            <p className="text-slate-400 text-sm font-mono mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                </div>

                                {isConverting ? (
                                    <div className="space-y-6">
                                        <div className="flex justify-between text-sm font-bold text-slate-300">
                                            <span>Converting...</span>
                                            <span>{Math.round(progress)}%</span>
                                        </div>
                                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-1 border border-slate-700">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-300 relative overflow-hidden ${config.bg.replace('/10', '')}`}
                                                style={{ width: `${progress}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]" />
                                            </div>
                                        </div>
                                        <div className="text-center text-slate-500 text-xs animate-pulse">
                                            Please wait while we process your document
                                        </div>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={startConversion}
                                        className={`w-full py-5 rounded-2xl font-bold text-white text-lg shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] ${config.bg.replace('/10', '')} flex items-center justify-center gap-3`}
                                    >
                                        <Sparkles size={20} className="animate-pulse" />
                                        Convert to {config.resultExt.replace('.', '').toUpperCase()}
                                    </button>
                                )}
                            </div>
                        )}

                        {/* STATE: DONE */}
                        {isDone && (
                            <div className="text-center w-full animate-in slide-in-from-bottom-8 duration-500">
                                <div className="w-28 h-28 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)] relative">
                                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20" />
                                    <CheckCircle2 size={56} className="text-white drop-shadow-md" />
                                </div>
                                <h2 className="text-3xl font-black text-white mb-2">Ready to Download!</h2>
                                <p className="text-slate-400 mb-10">Your file has been converted successfully.</p>
                                
                                <div className="space-y-4">
                                    <button 
                                        onClick={handleDownload}
                                        className="w-full py-4 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1"
                                    >
                                        <Download size={22} /> Download {config.resultExt.toUpperCase()}
                                    </button>
                                    
                                    <button 
                                        onClick={resetTool}
                                        className="text-slate-500 hover:text-white text-sm font-bold flex items-center justify-center gap-2 py-2 transition-colors"
                                    >
                                        <RefreshCcw size={14} /> Convert Another File
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};