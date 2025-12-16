import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingBag, Star, Plus, Minus, Trash2, X, Filter, BookOpen, PenTool, Calculator, GraduationCap, ArrowRight, Globe, MessageSquare, Monitor, Shield, Sparkles, Zap, CheckCircle2, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

// Enhanced Mock Product Data
const PRODUCTS = [
  {
    id: 1,
    title: "HSC Physics 1st Paper",
    author: "Dr. Shahjahan Tapan",
    price: 350,
    rating: 4.8,
    category: "Academic",
    image: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?auto=format&fit=crop&q=80&w=400&h=500",
    tag: "Best Seller",
    tagColor: "bg-orange-500"
  },
  {
    id: 2,
    title: "Cambridge IELTS 18 Academic",
    author: "Cambridge University Press",
    price: 250,
    rating: 4.9,
    category: "IELTS",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=500",
    tag: "New Arrival",
    tagColor: "bg-green-500"
  },
  {
    id: 3,
    title: "Official TOEFL iBT Tests",
    author: "ETS",
    price: 450,
    rating: 4.7,
    category: "TOEFL",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 4,
    title: "Scientific Calculator fx-991EX",
    author: "Casio Original",
    price: 2800,
    rating: 5.0,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee1f620?auto=format&fit=crop&q=80&w=400&h=500",
    tag: "Essential",
    tagColor: "bg-blue-500"
  },
  {
    id: 5,
    title: "Chemistry Plus - Admission",
    author: "Joykoly Series",
    price: 420,
    rating: 4.8,
    category: "Admission",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 6,
    title: "The Official Guide to PTE",
    author: "Pearson",
    price: 550,
    rating: 4.6,
    category: "PTE",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 7,
    title: "ISSB V2 Guide",
    author: "Professor's",
    price: 380,
    rating: 4.8,
    category: "ISSB",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=500",
    tag: "Recommended",
    tagColor: "bg-purple-500"
  },
  {
    id: 8,
    title: "Udvash Engineering Q-Bank",
    author: "Udvash Network",
    price: 600,
    rating: 4.9,
    category: "Admission",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 9,
    title: "Bank Job Solutions 2024",
    author: "Professor's",
    price: 550,
    rating: 4.7,
    category: "Job Prep",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 10,
    title: "Premium Spiral Notebook",
    author: "Paperfly",
    price: 150,
    rating: 4.5,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 11,
    title: "Engineering Physics",
    author: "Dr. Gias Uddin",
    price: 320,
    rating: 4.6,
    category: "Academic",
    image: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 12,
    title: "Advanced Organic Chemistry",
    author: "Bahl & Bahl",
    price: 750,
    rating: 4.9,
    category: "Academic",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 13,
    title: "HSC Biology 2nd Paper",
    author: "Gazi Ajmal",
    price: 360,
    rating: 4.7,
    category: "Academic",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 14,
    title: "Math Question Bank",
    author: "Udvash",
    price: 500,
    rating: 4.8,
    category: "Admission",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 15,
    title: "IELTS Reading Practice",
    author: "Makkar IELTS",
    price: 200,
    rating: 4.5,
    category: "IELTS",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 16,
    title: "TOEFL Listening Guide",
    author: "Barron's",
    price: 400,
    rating: 4.6,
    category: "TOEFL",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 17,
    title: "PTE Practice Tests Plus",
    author: "Pearson",
    price: 600,
    rating: 4.7,
    category: "PTE",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 18,
    title: "ISSB Psychology Guide",
    author: "Bangladesh Navy",
    price: 350,
    rating: 4.8,
    category: "ISSB",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 19,
    title: "Gel Pen Set (12 Pcs)",
    author: "Matador",
    price: 120,
    rating: 4.9,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee1f620?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 20,
    title: "Geometry Box Premium",
    author: "Faber-Castell",
    price: 450,
    rating: 4.8,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1595123550441-d377e017de6a?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 21,
    title: "BCS Digest",
    author: "Assurance",
    price: 650,
    rating: 4.7,
    category: "Job Prep",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 22,
    title: "Vocabulary for IELTS",
    author: "Pauline Cullen",
    price: 280,
    rating: 4.9,
    category: "IELTS",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 23,
    title: "Mental Ability for BCS",
    author: "Oracle",
    price: 300,
    rating: 4.6,
    category: "Job Prep",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 24,
    title: "Primary Teacher Exam Guide",
    author: "Professor's",
    price: 400,
    rating: 4.5,
    category: "Job Prep",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 25,
    title: "Graph Paper Bundle",
    author: "Bashundhara",
    price: 80,
    rating: 4.4,
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400&h=500",
  }
];

const CATEGORIES = [
    { id: 'All', icon: <ShoppingBag size={16} /> },
    { id: 'Academic', icon: <BookOpen size={16} /> },
    { id: 'Admission', icon: <GraduationCap size={16} /> },
    { id: 'Job Prep', icon: <Briefcase size={16} /> }, 
    { id: 'IELTS', icon: <Globe size={16} /> },
    { id: 'TOEFL', icon: <MessageSquare size={16} /> },
    { id: 'PTE', icon: <Monitor size={16} /> },
    { id: 'ISSB', icon: <Shield size={16} /> },
    { id: 'Stationery', icon: <PenTool size={16} /> },
];

export const BookStore = () => {
  const ITEMS_PER_PAGE = 12;
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{id: number, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredProducts = useMemo(() => {
      return PRODUCTS.filter(product => {
          const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
          const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                product.author.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
      });
  }, [activeCategory, searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart Logic
  const addToCart = (id: number) => {
      setCart(prev => {
          const existing = prev.find(item => item.id === id);
          if (existing) {
              return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
          }
          return [...prev, { id, qty: 1 }];
      });
      setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
      setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
      setCart(prev => prev.map(item => {
          if (item.id === id) {
              const newQty = Math.max(1, item.qty + delta);
              return { ...item, qty: newQty };
          }
          return item;
      }));
  };

  const cartTotal = useMemo(() => {
      return cart.reduce((total, item) => {
          const product = PRODUCTS.find(p => p.id === item.id);
          return total + (product ? product.price * item.qty : 0);
      }, 0);
  }, [cart]);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // Custom Briefcase icon for local use since Lucide export might clash
  const BriefcaseIcon = ({size, className}: {size?: number, className?: string}) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white font-sans pb-20 relative transition-colors duration-500">
        
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] dark:opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Section */}
        <div className="relative pt-10 pb-16 px-4">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles size={12} /> Official Student Store
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                    Equip Your Mind for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600">Academic Excellence</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-10 text-lg font-light">
                    The one-stop shop for textbooks, international exam guides (IELTS, TOEFL, PTE), stationery, and more.
                </p>

                {/* Modern Search Bar */}
                <div className="max-w-2xl mx-auto relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative flex items-center bg-white/80 dark:bg-[#151921]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full px-6 py-4 shadow-2xl transition-all group-hover:border-slate-300 dark:group-hover:border-white/20">
                        <Search className="text-slate-500 dark:text-slate-400 mr-4" size={22} />
                        <input 
                            type="text" 
                            placeholder="Search for books, guides, calculators..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none text-slate-900 dark:text-white w-full focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 text-lg"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-30 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-y border-slate-200 dark:border-white/5 py-4 mb-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                                activeCategory === cat.id 
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg scale-105' 
                                : 'bg-slate-100 dark:bg-[#151921] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        >
                            {/* Render custom Briefcase icon if id is Job Prep, else standard */}
                            {cat.id === 'Job Prep' ? <BriefcaseIcon size={16} /> : cat.icon} 
                            {cat.id}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <div key={product.id} className="group bg-white dark:bg-[#151921] border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] flex flex-col relative animate-in fade-in zoom-in-95 duration-300">
                            
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-[#1E2330] p-6 flex items-center justify-center">
                                {/* Soft glow behind image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#151921] via-transparent to-transparent opacity-50 z-10" />
                                <div className="absolute w-40 h-40 bg-slate-200 dark:bg-white/5 rounded-full blur-3xl z-0" />
                                
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className="w-full h-full object-contain transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 relative z-10 drop-shadow-2xl"
                                />
                                
                                {/* Tags */}
                                {product.tag && (
                                    <div className={`absolute top-4 left-4 ${product.tagColor || 'bg-cyan-500'} text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-20`}>
                                        {product.tag}
                                    </div>
                                )}

                                {/* Hover Action */}
                                <div className="absolute bottom-4 right-4 z-20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                                    <button 
                                        onClick={() => addToCart(product.id)}
                                        className="w-12 h-12 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                                    >
                                        <Plus size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider">{product.category}</span>
                                    <div className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400 text-xs font-bold">
                                        <Star size={12} fill="currentColor" /> {product.rating}
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">{product.title}</h3>
                                <p className="text-sm text-slate-500 mb-4 line-clamp-1">{product.author}</p>
                                
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">৳{product.price}</span>
                                    <button 
                                        onClick={() => addToCart(product.id)}
                                        className="text-xs font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-white uppercase tracking-wider transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-24 text-center">
                        <div className="w-24 h-24 bg-slate-100 dark:bg-[#1E2330] rounded-full flex items-center justify-center mx-auto mb-6">
                            <Filter size={40} className="text-slate-400 dark:text-slate-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
                        <p className="text-slate-500 dark:text-slate-400">Try selecting a different category or adjust your search.</p>
                        <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="mt-6 text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-16 gap-3">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#1E2330] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                                    currentPage === page 
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 scale-110' 
                                    : 'bg-slate-100 dark:bg-[#1E2330] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                {page}
                            </button>
                        )
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

        {/* Floating Cart Button */}
        <button 
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-110 transition-transform active:scale-95 group border border-white/10"
        >
            <ShoppingBag size={24} fill="currentColor" className="group-hover:animate-bounce" />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-50 dark:border-[#0B0F19]">
                    {cartCount}
                </span>
            )}
        </button>

        {/* Modern Cart Drawer */}
        {isCartOpen && (
            <>
                <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300" onClick={() => setIsCartOpen(false)} />
                <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#151921] border-l border-slate-200 dark:border-white/10 z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-[#151921]">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            <ShoppingBag className="text-cyan-500 dark:text-cyan-400" /> Your Cart <span className="text-slate-500 text-sm font-medium">({cartCount} items)</span>
                        </h2>
                        <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-[#151921]">
                        {cart.length > 0 ? (
                            cart.map(item => {
                                const product = PRODUCTS.find(p => p.id === item.id);
                                if (!product) return null;
                                return (
                                    <div key={item.id} className="flex gap-4 bg-white dark:bg-[#1E2330] p-3 rounded-2xl border border-slate-200 dark:border-white/5 group shadow-sm">
                                        <div className="w-20 h-24 bg-slate-100 dark:bg-white/5 rounded-xl overflow-hidden flex-shrink-0 p-2 flex items-center justify-center">
                                            <img src={product.image} className="w-full h-full object-contain drop-shadow-md" alt="" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{product.title}</h4>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{product.author}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="font-bold text-cyan-600 dark:text-cyan-400 text-lg">৳{product.price * item.qty}</span>
                                                <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#0B0F19] rounded-lg px-2 py-1 border border-slate-200 dark:border-white/10">
                                                    <button onClick={() => updateQty(item.id, -1)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"><Minus size={14} /></button>
                                                    <span className="text-sm font-bold w-4 text-center text-slate-900 dark:text-white">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.id, 1)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"><Plus size={14} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 self-start p-1 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-[#1E2330] rounded-full flex items-center justify-center">
                                    <ShoppingBag size={32} className="opacity-50 text-slate-400 dark:text-slate-500" />
                                </div>
                                <p className="text-lg font-medium">Your cart is empty</p>
                                <button onClick={() => setIsCartOpen(false)} className="px-6 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-full font-bold transition-colors">
                                    Browse Products
                                </button>
                            </div>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#1E2330]">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-slate-600 dark:text-slate-400">Total Amount</span>
                                <span className="font-black text-2xl text-slate-900 dark:text-white">৳{cartTotal}</span>
                            </div>
                            <button onClick={() => alert('Proceeding to Checkout...')} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1">
                                Checkout Securely <ArrowRight size={20} />
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                                <CheckCircle2 size={12} className="text-green-500" /> Secure SSL Payment
                            </p>
                        </div>
                    )}
                </div>
            </>
        )}
    </div>
  );
};