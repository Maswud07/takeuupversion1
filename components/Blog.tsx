import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, Clock, Calendar, User, Tag, Share2, Bookmark } from 'lucide-react';
import { BlogPost } from '../types';

const INITIAL_BLOGS: BlogPost[] = [
    { 
        id: '1', 
        title: 'Mastering Organic Chemistry for HSC', 
        author: 'Amina Khan', 
        readTime: '5 min', 
        category: 'SSC Chemistry', 
        imageUrl: 'https://picsum.photos/id/106/800/400',
        date: 'Oct 15, 2023',
        content: `Organic chemistry is often considered one of the most challenging parts of the HSC Chemistry syllabus. However, with a strategic approach, it can become one of your strongest areas.

**1. Understand the Fundamentals**
Before diving into complex reactions, ensure you have a rock-solid understanding of the basics:
- **Hybridization:** Know your sp, sp2, and sp3 carbons inside out.
- **Nomenclature:** IUPAC naming is the language of organic chemistry.
- **Isomerism:** Practice structural and stereoisomerism daily.

**2. Focus on Mechanisms**
Don't just memorize reactions; understand the *mechanism*. Why does a nucleophile attack a specific carbon? Understanding electron movement (curly arrows) is key. Once you grasp the logic, you can predict the outcome of reactions you haven't even seen before.

**3. Create Reaction Maps**
Visual aids are incredibly powerful. Create large flowcharts or "Roadmaps" that connect functional groups. For example, map out how to convert an Alkane to an Alcohol, then to an Aldehyde, and finally to a Carboxylic Acid. This helps in "Conversion" type questions.

**4. Name Reactions are Critical**
Make a separate notebook for Name Reactions (e.g., Wurtz, Friedel-Crafts, Cannizzaro, Aldol Condensation). These are high-yield topics for both board exams and university admission tests.

**Conclusion**
Consistency is key. Practice 5 reactions daily, and soon the fear of Organic Chemistry will turn into fascination. Good luck!`
    },
    { 
        id: '2', 
        title: 'Top 5 University Admission Tips', 
        author: 'Rohan Ahmed', 
        readTime: '7 min', 
        category: 'University Admission', 
        imageUrl: 'https://picsum.photos/id/20/800/400',
        date: 'Nov 02, 2023',
        content: `The transition from HSC to University Admission preparation is intense. The competition is fierce, but the right strategy can set you apart. Here are the top 5 tips from past toppers.

**1. Know Your Syllabus & Question Pattern**
Different universities have different patterns.
- **DU (Dhaka University):** Focuses on textbook depth and written parts.
- **BUET:** Requires strong analytical and problem-solving skills in Math, Physics, and Chemistry.
- **Medical:** Pure memorization and clarity of Biology concepts are vital.

**2. Time Management is Everything**
In the exam hall, you aren't just fighting questions; you are fighting the clock. Practice solving questions under timed conditions. Learn to skip difficult questions and come back to them later.

**3. Stick to the Textbooks**
Guidebooks are for practice, but Textbooks are for concepts. For Biology and Chemistry, the board textbooks (like Gazi Ajmal or Hazari Nag) are your bible. Do not neglect them.

**4. Question Bank Solving**
Solve the last 10-15 years of question papers for your target university. Many concepts (and sometimes exact questions) get repeated or rephrased.

**5. Stay Healthy**
It sounds cliché, but burnout is real. Ensure you get 6-7 hours of sleep and eat healthy. A tired brain makes silly mistakes.`
    },
    { 
        id: '3', 
        title: 'A Guide to the BCS Preliminary Exam', 
        author: 'Farida Yasmin', 
        readTime: '10 min', 
        category: 'BCS Guide', 
        imageUrl: 'https://picsum.photos/id/175/800/400',
        date: 'Sep 20, 2023',
        content: `The Bangladesh Civil Service (BCS) exam is the most competitive exam in the country. The Preliminary stage is the first hurdle. Here is how to navigate it.

**Subject Distribution:**
- Bangla: 35
- English: 35
- Bangladesh Affairs: 30
- International Affairs: 20
- Geography: 10
- General Science: 15
- Computer & IT: 15
- Math & Mental Ability: 30
- Ethics & Good Governance: 10

**Strategy:**
1. **Strong Areas First:** Identify your strengths. If you are good at Math and English, you already have a huge advantage.
2. **Current Affairs:** Read a daily newspaper and monthly current affairs magazines. Focus on data, summits, and awards.
3. **Literature:** For Bangla and English literature, memorizing authors, quotes, and characters is essential. Use mnemonics to remember them.
4. **Negative Marking:** Be very careful. For every wrong answer, 0.5 marks are deducted. It is better to leave a question blank than to guess wildly.

**Final Advice:**
Start early. Even if you are in your 3rd or 4th year of university, start building your general knowledge base now.`
    },
    { 
        id: '4', 
        title: 'How to Build Effective Study Habits', 
        author: 'TakeUUp Team', 
        readTime: '6 min', 
        category: 'Study Hacks', 
        imageUrl: 'https://picsum.photos/id/366/800/400',
        date: 'Aug 10, 2023',
        content: `Motivation gets you started; habit keeps you going. Here is how to build a study routine that sticks.

**1. The Pomodoro Technique**
Study for 25 minutes, then take a 5-minute break. After four cycles, take a longer break. This prevents mental fatigue and keeps focus sharp.

**2. Active Recall**
Passive reading is the least effective way to learn. Instead, close the book and try to recall what you just read. Teach it to an imaginary classroom.

**3. Spaced Repetition**
Reviewing material at increasing intervals (1 day, 3 days, 1 week, 1 month) commits it to long-term memory. Use apps like Anki or flashcards for this.

**4. Environment Matters**
Designate a specific spot for studying. Keep it clutter-free and distraction-free (put that phone away!).

**5. Set Small, Achievable Goals**
Instead of "Study Physics", set a goal like "Complete Chapter 5 Exercise 1-10". Checking off small tasks gives a dopamine hit that keeps you motivated.`
    },
    { 
        id: '5', 
        title: 'The Ultimate HSC Physics Formula Sheet', 
        author: 'Iqbal Hasan', 
        readTime: '4 min', 
        category: 'HSC Math', 
        imageUrl: 'https://picsum.photos/id/450/800/400',
        date: 'Dec 05, 2023',
        content: `Physics is the language of the universe, and formulas are its alphabet. Here is a quick rundown of essential formulas for HSC Physics 1st Paper.

**Vector:**
- Resultant R = √(P² + Q² + 2PQcosα)
- Direction tanθ = (Qsinα) / (P + Qcosα)

**Dynamics:**
- v = u + at
- s = ut + ½at²
- v² = u² + 2as
- Projectile Range R = (u²sin2α)/g

**Work, Power, Energy:**
- Work W = Fs cosθ
- Kinetic Energy Ek = ½mv²
- Potential Energy Ep = mgh
- Power P = W/t = Fv

**Note:** This is just a glimpse. Make sure to maintain your own formula notebook where you write down every new formula you encounter during problem-solving.`
    },
    { 
        id: '6', 
        title: 'Choosing a Career Path After HSC', 
        author: 'Career Coach', 
        readTime: '8 min', 
        category: 'Career Advice', 
        imageUrl: 'https://picsum.photos/id/531/800/400',
        date: 'Jan 12, 2024',
        content: `The period after HSC is a crossroads. Engineering, Medical, University, or studying abroad? Here is how to decide.

**1. Passion vs. Scope**
Ideally, you want both. But if you have to choose, prioritize what you are good at. You can build a career in any field if you are in the top 1%.

**2. Engineering**
If you love solving problems, math, and understanding how things work, Engineering is for you. CSE, EEE, and Civil are evergreen fields.

**3. Medical**
Choose this only if you have a genuine desire to serve and the patience for a long study period (5 years MBBS + Internship). It is a noble but demanding profession.

**4. Pure Subjects**
Physics, Chemistry, Economics, English - these subjects open doors to academia, research, and civil services.

**5. Skill-Based Careers**
Don't ignore emerging fields like Data Science, Digital Marketing, or Graphic Design. Sometimes a traditional degree isn't the only path to success.`
    },
];

export const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
      // Load blogs from localStorage
      const storedBlogs = localStorage.getItem('takeuup_blogs');
      if (storedBlogs) {
          try {
              const parsed = JSON.parse(storedBlogs);
              // Merge with initial to ensure content is present if missing in storage
              const merged = parsed.map((p: BlogPost) => {
                  if (!p.content) {
                      const initial = INITIAL_BLOGS.find(i => i.id === p.id);
                      return { ...p, content: initial?.content || "Content coming soon..." };
                  }
                  return p;
              });
              setBlogs(merged);
          } catch (e) {
              console.error("Failed to parse blogs from storage", e);
              // Fallback to initial if storage is corrupt
              setBlogs(INITIAL_BLOGS);
          }
      } else {
          // If empty, initialize with default data
          localStorage.setItem('takeuup_blogs', JSON.stringify(INITIAL_BLOGS));
          setBlogs(INITIAL_BLOGS);
      }
  }, []);

  const handleBlogClick = (blog: BlogPost) => {
      setSelectedBlog(blog);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredBlogs = blogs.filter(blog => {
      const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  // DETAILED VIEW RENDERER
  if (selectedBlog) {
      return (
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
              <div className="max-w-4xl mx-auto px-4">
                  {/* Nav Bar */}
                  <button 
                      onClick={() => setSelectedBlog(null)} 
                      className="group flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
                  >
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mr-3 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-all shadow-sm">
                          <ArrowLeft size={20} />
                      </div>
                      <span className="font-bold">Back to Blog</span>
                  </button>

                  {/* Header Content */}
                  <div className="space-y-6 mb-10">
                      <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-bold border border-cyan-200 dark:border-cyan-500/20 uppercase tracking-wider">
                              {selectedBlog.category}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm font-medium">
                              <Clock size={14} /> {selectedBlog.readTime} read
                          </span>
                          {selectedBlog.date && (
                              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm font-medium">
                                  <Calendar size={14} /> {selectedBlog.date}
                              </span>
                          )}
                      </div>

                      <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                          {selectedBlog.title}
                      </h1>

                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-8">
                          <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700">
                                  <User size={24} className="text-slate-400" />
                              </div>
                              <div>
                                  <p className="text-slate-900 dark:text-white font-bold text-sm">{selectedBlog.author}</p>
                                  <p className="text-slate-500 text-xs">Author</p>
                              </div>
                          </div>
                          <div className="flex gap-2">
                              <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"><Bookmark size={20} /></button>
                              <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"><Share2 size={20} /></button>
                          </div>
                      </div>
                  </div>

                  {/* Featured Image */}
                  <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-slate-200 dark:border-slate-800 shadow-xl relative">
                      <img 
                          src={selectedBlog.imageUrl} 
                          alt={selectedBlog.title} 
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Article Content */}
                  <div className="prose lg:prose-xl dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white prose-strong:text-cyan-700 dark:prose-strong:text-cyan-200 prose-li:text-slate-600 dark:prose-li:text-slate-300">
                      {selectedBlog.content ? (
                          selectedBlog.content.split('\n').map((paragraph, idx) => (
                              <p key={idx} className="mb-4 leading-relaxed">
                                  {paragraph.trim().startsWith('**') ? (
                                      <strong className="text-xl block mt-8 mb-2 font-bold">{paragraph.replace(/\*\*/g, '')}</strong>
                                  ) : paragraph}
                              </p>
                          ))
                      ) : (
                          <p className="italic text-slate-500">No content available for this post.</p>
                      )}
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 flex justify-center">
                      <button className="px-8 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-full font-bold transition-colors shadow-lg">
                          Share this article
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  // DEFAULT LIST VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Explore Our Blog</h1>
                <p className="text-slate-600 dark:text-slate-400">Insights and tips to help you succeed in your studies.</p>
            </div>
            <div className="mt-4 md:mt-0 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                <input 
                    type="text" 
                    placeholder="Search blogs..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-2 pl-10 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-sm w-64 md:w-80 transition-all"
                />
            </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-2 no-scrollbar">
            {['All', 'SSC Chemistry', 'HSC Math', 'University Admission', 'BCS Guide', 'Study Hacks', 'Career Advice', 'General'].map((cat, i) => (
                <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat 
                        ? 'bg-cyan-600 text-white shadow-md' 
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                <div key={blog.id} onClick={() => handleBlogClick(blog)} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 hover:-translate-y-1">
                    <div className="relative overflow-hidden aspect-[4/3]">
                        <img 
                            src={blog.imageUrl} 
                            alt={blog.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                             <span className="px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-bold text-white border border-white/10 uppercase tracking-wide">
                                 {blog.category}
                             </span>
                        </div>
                    </div>
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                            {blog.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <span className="font-medium flex items-center gap-1"><User size={12}/> {blog.author}</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> {blog.readTime}</span>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="col-span-full text-center py-20 text-slate-500">
                    No blogs found matching your criteria.
                </div>
            )}
            
            {/* Ad Placeholder (only show if blogs exist to maintain grid) */}
            {filteredBlogs.length > 0 && (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="w-full h-full min-h-[150px] bg-slate-200 dark:bg-slate-900 rounded-lg flex items-center justify-center">
                        <span className="text-slate-500 dark:text-slate-600 font-bold">Advertisement</span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Sponsored Content</p>
                </div>
            )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2">
            <button className="w-10 h-10 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center shadow-lg shadow-cyan-500/20">1</button>
            <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center transition-colors">2</button>
            <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center transition-colors">3</button>
            <span className="w-10 h-10 flex items-center justify-center text-slate-400">...</span>
            <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center transition-colors">10</button>
        </div>
    </div>
  );
};