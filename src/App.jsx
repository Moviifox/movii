import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';


// ==========================================
// ⚙️ ตั้งค่า SUPABASE & DATA
// ==========================================
const SUPABASE_URL = 'https://dzuckyiplwnlnbeggdxb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uqhhhD0Oj4TegojFRkHTSQ_Ecxtf4J_'; 
const CSV_DATA_URL = "https://moviifox.free.nf/movies_data.csv";


// ==========================================
// 🖼️ ICONS (Inline SVG replacements)
// ==========================================
const Play = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>;
const Plus = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const X = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const Search = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const User = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const ChevronRight = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const ChevronLeft = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ArrowRight = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const Info = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const Home = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const Layers = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const Sparkles = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>;
const Ghost = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>;
const Tv = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>;
const Film = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>;
const Filter = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const Heart = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z"/></svg>;

// ==========================================
// 🛠️ FUNCTIONS
// ==========================================

const THAI_MONTH_MAP = {
  'มกราคม': 1,
  'ม.ค.': 1,
  'ม.ค': 1,
  'กุมภาพันธ์': 2,
  'ก.พ.': 2,
  'ก.พ': 2,
  'มีนาคม': 3,
  'มี.ค.': 3,
  'มี.ค': 3,
  'เมษายน': 4,
  'เม.ย.': 4,
  'เม.ย': 4,
  'พฤษภาคม': 5,
  'พ.ค.': 5,
  'พ.ค': 5,
  'มิถุนายน': 6,
  'มิ.ย.': 6,
  'มิ.ย': 6,
  'กรกฎาคม': 7,
  'ก.ค.': 7,
  'ก.ค': 7,
  'สิงหาคม': 8,
  'ส.ค.': 8,
  'ส.ค': 8,
  'กันยายน': 9,
  'ก.ย.': 9,
  'ก.ย': 9,
  'ตุลาคม': 10,
  'ต.ค.': 10,
  'ต.ค': 10,
  'พฤศจิกายน': 11,
  'พ.ย.': 11,
  'พ.ย': 11,
  'ธันวาคม': 12,
  'ธ.ค.': 12,
  'ธ.ค': 12
};

const EN_MONTH_MAP = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
};

const THAI_DIGIT_MAP = {
  '๐': '0',
  '๑': '1',
  '๒': '2',
  '๓': '3',
  '๔': '4',
  '๕': '5',
  '๖': '6',
  '๗': '7',
  '๘': '8',
  '๙': '9'
};

const normalizeDigits = (value) => String(value).replace(/[๐-๙]/g, (digit) => THAI_DIGIT_MAP[digit] || digit);

const parseThaiDate = (input) => {
  if (!input) return null;
  const normalizedInput = normalizeDigits(String(input).trim());
  if (!normalizedInput) return null;

  const sanitized = normalizedInput
    .replace(/[,|]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\//g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const parts = sanitized.split(' ').filter(Boolean);
  if (parts.length === 0) return null;

  let day = null;
  let month = null;
  let year = null;

  parts.forEach((token) => {
    if (!token) return;
    const cleanedToken = token.replace(/\./g, '').toLowerCase();

    if (month == null) {
      if (THAI_MONTH_MAP[token] != null) {
        month = THAI_MONTH_MAP[token];
        return;
      }
      if (THAI_MONTH_MAP[cleanedToken] != null) {
        month = THAI_MONTH_MAP[cleanedToken];
        return;
      }
      if (EN_MONTH_MAP[cleanedToken] != null) {
        month = EN_MONTH_MAP[cleanedToken];
        return;
      }
    }

    if (/^\d+$/.test(cleanedToken)) {
      const numeric = parseInt(cleanedToken, 10);
      if (numeric > 1900) {
        year = numeric;
      } else if (numeric > 31 && year == null) {
        year = numeric;
      } else if (day == null) {
        day = numeric;
      }
      return;
    }

    const fourDigit = cleanedToken.match(/\d{4}/);
    if (fourDigit && year == null) {
      year = parseInt(fourDigit[0], 10);
    }
  });

  if (year == null) {
    const fallbackYear = sanitized.match(/\d{4}/);
    if (fallbackYear) {
      year = parseInt(fallbackYear[0], 10);
    }
  }

  if (!year) return null;
  if (!month) month = 1;
  if (!day) day = 1;

  const dateValue = Date.UTC(year, month - 1, day);
  return Number.isNaN(dateValue) ? null : dateValue;
};


// ฟังก์ชันแปลงข้อมูลจาก Supabase ให้เป็นรูปแบบที่ App ใช้
const transformSupabaseData = (data) => {
  if (!Array.isArray(data)) return []; 

  // Filter out items where publish is 'd' (case insensitive)
  return data
    .filter(item => !item.publish || item.publish.toLowerCase() !== 'd')
    .map(item => {
    let episodes = [];
    
    // 1. ถ้ามีคอลัมน์ episodes และเป็น JSON Array ให้ใช้เลย
    if (item.episodes && Array.isArray(item.episodes) && item.episodes.length > 0) {
        episodes = item.episodes;
    } else {
        // 2. ถ้าไม่มี ให้ลองวนลูปหาจากคอลัมน์ ep01...ep100 (Legacy Support for columns)
        for (let i = 1; i <= 100; i++) {
            const epNum = i < 10 ? `0${i}` : `${i}`;
            const linkKey = `ep${epNum}`;
            const nameKey = `nameep${i}`;
            const imgKey = `img${epNum}`;


            if (item[linkKey] && item[linkKey].trim() !== '') {
                episodes.push({
                    name: item[nameKey] || `ตอนที่ ${i}`,
                    link: item[linkKey],
                    image: item[imgKey] || item.image
                });
            }
        }
    }
    
    // 3. ถ้ายังไม่มีตอน แต่มี movielink (หนังเดี่ยว)
    if (episodes.length === 0 && item.movielink) {
        episodes.push({ name: 'Full Movie', link: item.movielink, image: item.image });
    }


    const releaseDateValue = parseThaiDate(item.release_date || item.year);

    return {
      ...item,
      id: item.id || item.ID, 
      title: item.title || item.title1 || '',
      title_alt: item.title_alt || item.title2 || '', 
      // ใช้สำหรับฟิลเตอร์และ logic เดิม
      category: item.tags || item.categories || item.category || '', 
      // ใช้แสดงแคปซูลใน Modal: อิงจากคอลัมน์ category ของ Supabase เท่านั้น
      category_capsules: item.category || '',
      image: item.image || item['image Featured'],
      // Map featured video from possible column names (Case insensitive check)
      featured_video: item.featured_video || item.Featuredvideo || item.featuredVideo || '', 
      description: item.description || '',
      genre: item.genre || item.tags || item.type || '',
      year: item.year || item.release_date || '', 
      rating: item.rating || item.status || '',
      type: item.type || (item.category && item.category.includes('series') ? 'Series' : 'Movie'),
      episodes: episodes,
      releaseDateValue,
      release_date: item.release_date || ''
    };
  })
    .sort((a, b) => {
      const aValue = typeof a.releaseDateValue === 'number' ? a.releaseDateValue : -Infinity;
      const bValue = typeof b.releaseDateValue === 'number' ? b.releaseDateValue : -Infinity;

      if (aValue === bValue) {
        const aYear = parseInt(normalizeDigits(String(a.year || '')), 10) || -Infinity;
        const bYear = parseInt(normalizeDigits(String(b.year || '')), 10) || -Infinity;
        if (aYear === bYear) return String(b.title || '').localeCompare(String(a.title || ''));
        return bYear - aYear;
      }

      return bValue - aValue;
    });
};


const getCategoriesForTab = (movies, activeTab) => {
  let filteredMovies = movies;


  if (activeTab === 'festival') { 
    return movies.filter(m => m.category && m.category.includes('เทศกาล'));
  } else if (activeTab === 'movies') {
    return filteredMovies;
  } else if (activeTab === 'y_content') {
    return movies.filter(m => m.category && m.category.includes('bl')).slice(0, 38);
  } else if (activeTab === 'k_content') {
    return movies.filter(m => m.category && m.category.includes('korea'));
  } else {
    // === HOME PAGE LOGIC ===
    const categoriesMap = {};
    const priorityCategories = [
        { key: 'movie', title: 'ภาพยนตร์ล่าสุด' },
        { key: 'series', title: 'ซีรีส์ล่าสุด' },
        { key: 'bl', title: 'สายวายต้องฟิน' },
        { key: 'korea', title: 'เอาใจสายเกา' }
    ];
    
    priorityCategories.forEach(cat => categoriesMap[cat.title] = []);


    movies.forEach(movie => {
      if (movie.category) {
        const tags = movie.category.toLowerCase();
        
        if (tags.includes('movie')) categoriesMap['ภาพยนตร์ล่าสุด'].push(movie);
        if (tags.includes('series')) categoriesMap['ซีรีส์ล่าสุด'].push(movie);
        if (tags.includes('bl')) categoriesMap['สายวายต้องฟิน'].push(movie);
        if (tags.includes('korea')) categoriesMap['เอาใจสายเกา'].push(movie);
      }
    });


    return priorityCategories.map(cat => ({
        id: `cat-${cat.key}`,
        title: cat.title,
        items: (categoriesMap[cat.title] || []).slice(0, 3)
    })).filter(cat => cat.items.length > 0);
  }
};


// ค่าเริ่มต้นสำหรับสถานะ loading
const FEATURED_MOVIE = {
  id: 'loading',
  title: 'กำลังโหลด...',
  titleImage: 'กำลังโหลด...',
  description: 'กำลังโหลด...',
  genre: '',
  duration: '',
  year: '',
  rating: '',
  image: '',
};


const NAV_ITEMS = [
  { id: 'home', icon: Home, label: 'หน้าแรก' },
  { id: 'festival', icon: Ghost, label: 'ฮาโลวีน' }, //แก้ Navbar หน้า festival ตรงนี้
  { id: 'movies', icon: Film, label: 'ภาพยนตร์/ซีรีส์' },
  { id: 'search', icon: Search, label: 'ค้นหา' },
  //{ id: 'account', icon: User, label: 'บัญชี' }
];


// --- Components ---


const Navbar = ({ isFocused, activeNavIndex, activeTab, onSelect }) => (
  <nav className={`fixed top-[3vw] left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out`}>
    <div className={`
      flex items-center gap-[0.8vw] p-[0.8vw] rounded-full border border-white/10
      backdrop-blur-2xl bg-black/40 shadow-[0_0.5vw_2vw_rgba(0,0,0,0.5)]
      transition-all duration-500
      ${isFocused ? 'scale-110 shadow-[0_0_3vw_rgba(255,255,255,0.15)] ring-1 ring-white/20' : 'scale-100'}
    `}>
      {NAV_ITEMS.map((item, index) => {
        const Icon = item.icon;
        const isFocusedItem = isFocused && activeNavIndex === index;
        const isActiveTab = activeTab === item.id;
        
        return (
          <div 
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`
              relative flex items-center justify-center w-[4.5vw] h-[4.5vw] rounded-full transition-all duration-300 cursor-pointer
              ${isFocusedItem 
                ? 'bg-white text-black shadow-[0_0_1.5vw_rgba(255,255,255,0.5)] scale-110 z-10' 
                : isActiveTab 
                  ? 'text-white bg-white/20' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'}
            `}
          >
            <Icon className="w-[1.8vw] h-[1.8vw]" strokeWidth={2.5} />
            {isFocusedItem && (
              <span className="absolute -bottom-[2.5vw] bg-zinc-800/90 text-white text-[0.9vw] px-[0.8vw] py-[0.2vw] rounded-md backdrop-blur-md opacity-0 animate-fade-in-up font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
            {isActiveTab && !isFocusedItem && (
               <span className="absolute -bottom-[0.5vw] w-[0.3vw] h-[0.3vw] bg-white rounded-full"></span>
            )}
          </div>
        );
      })}
    </div>
  </nav>
);


const BrandRow = ({ activeRow, activeCol, rowIndex, rowRefMap }) => {
  const brands = [
    { id: 1, image: 'http://moviifox.x10.mx/aset/netflix.webp' },
    { id: 2, image: 'http://moviifox.x10.mx/aset/disney.webp' },
    { id: 3, image: 'http://moviifox.x10.mx/aset/hbo.webp' },
    { id: 4, image: 'http://moviifox.x10.mx/aset/marvel.webp' }
  ];
  
  const isActive = activeRow === rowIndex;
  const containerRef = useRef(null);


  return (
    <div className={`py-[3.5vw] transition-all duration-700 ease-out relative ${isActive ? 'opacity-100 scale-100 blur-none z-50' : 'opacity-30 scale-95 blur-[0.1vw] z-0'}`}>
      <div 
        ref={containerRef}
        className="flex gap-[2vw] overflow-visible px-[4.2vw] w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {brands.map((brand, index) => (
          <div 
             key={index}
             ref={el => {
                if(!rowRefMap.current[rowIndex]) rowRefMap.current[rowIndex] = [];
                rowRefMap.current[rowIndex][index] = el;
             }}
             className={`
               relative flex-1 aspect-[16/9] rounded-[1.5vw] cursor-pointer transition-all duration-300 overflow-hidden
               ${isActive && activeCol === index 
                 ? 'scale-110 z-20 ring-[0.3vw] ring-white/80 shadow-[0_0_2vw_rgba(255,255,255,0.3)] opacity-100' 
                 : 'scale-100 opacity-50'}
             `}
          >
             <img 
               src={brand.image} 
               alt={`Brand ${index + 1}`}
               className="w-full h-full object-cover object-center"
               onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800&auto=format&fit=crop"; }} // Brand Fallback
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};


// Standard Card for Rows
const MovieCard = ({ movie, isFocused, onClick, innerRef }) => {
  // Logic สำหรับเช็คว่าชื่อยาวเกินหรือไม่
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [shouldScrollTitle, setShouldScrollTitle] = useState(false);
  const [shouldScrollSubtitle, setShouldScrollSubtitle] = useState(false);


  useEffect(() => {
    if (titleRef.current) {
        setShouldScrollTitle(titleRef.current.scrollWidth > titleRef.current.clientWidth);
    }
    if (subtitleRef.current) {
        setShouldScrollSubtitle(subtitleRef.current.scrollWidth > subtitleRef.current.clientWidth);
    }
  }, [movie.title, movie.title_alt]);


  return (
    <div 
        ref={innerRef}
        onClick={() => onClick(movie)}
        className={`
        relative flex-none w-[24vw] aspect-[16/9] rounded-[2vw] cursor-pointer transition-all duration-300 ease-out
        group
        ${isFocused 
            ? 'scale-110 z-20 shadow-[0_0_2vw_rgba(255,255,255,0.3)] ring-[0.3vw] ring-white/80 translate-y-[-0.8vw]' 
            : 'hover:scale-105 z-0 opacity-60 hover:opacity-100 hover:brightness-110'}
        `}
    >
        <div className="absolute inset-0 rounded-[2vw] overflow-hidden bg-zinc-800">
        <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-700"
            loading="lazy"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"; }} // Card Fallback
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Type Badge (Top Right) aligned with GridMovieCard */}
        {movie.type && (
            <div className="absolute top-[0.8vw] right-[0.8vw] flex gap-[0.3vw] z-10">
                <span className="bg-black/40 backdrop-blur-md text-white/90 text-[0.7vw] px-[0.5vw] py-[0.15vw] rounded-md border border-white/10 flex items-center gap-1 font-light uppercase tracking-wider">
                {movie.type}
                </span>
            </div>
        )}
        </div>


        {/* Floating Title */}
        <div className={`
        absolute -bottom-[5vw] left-[0.8vw] right-[0.8vw] text-center transition-all duration-300
        ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[1.5vw]'}
        `}>
        {/* Container สำหรับชื่อหลัก */}
        <div className="w-full overflow-hidden whitespace-nowrap px-[0.5vw]">
            <h3 
                ref={titleRef}
                className={`text-white font-semibold text-[1.5vw] drop-shadow-lg tracking-wide
                    ${isFocused && shouldScrollTitle ? 'animate-marquee inline-block' : 'truncate block'}
                `}
            >
                {movie.title}
                {isFocused && shouldScrollTitle && <span className="inline-block w-[2vw]"></span>}
                {isFocused && shouldScrollTitle && movie.title}
            </h3>
        </div>
        
        {/* Container สำหรับชื่อรอง (บรรทัดล่าง) */}
        <div className="w-full overflow-hidden whitespace-nowrap px-[0.5vw]">
             <p 
                ref={subtitleRef}
                className={`text-zinc-400 font-normal tracking-wider uppercase
                    text-[1.2vw] /* Increased size */
                    ${isFocused && shouldScrollSubtitle ? 'animate-marquee inline-block' : 'truncate block'}
                `}
            >
                {movie.title_alt}
                {isFocused && shouldScrollSubtitle && <span className="inline-block w-[2vw]"></span>}
                {isFocused && shouldScrollSubtitle && movie.title_alt}
            </p>
        </div>
        </div>
    </div>
  );
};


// Special "View More" Card
const ViewMoreCard = ({ isFocused, onClick, innerRef }) => (
  <div 
    ref={innerRef}
    onClick={onClick}
    className={`
      relative flex-none w-[14vw] aspect-[16/9] rounded-[2vw] cursor-pointer transition-all duration-300 ease-out
      group flex items-center justify-center bg-zinc-900 border border-white/10
      ${isFocused 
        ? 'scale-110 z-20 shadow-[0_0_2vw_rgba(255,255,255,0.3)] ring-[0.3vw] ring-white/80' 
        : 'hover:scale-105 opacity-70'}
    `}
  >
     <div className="flex flex-col items-center gap-[0.5vw]">
        <div className={`p-[1vw] rounded-full transition-colors ${isFocused ? 'bg-white text-black' : 'bg-zinc-800 text-white'}`}><ArrowRight size="2vw" /></div>
        <span className={`text-[1vw] font-medium ${isFocused ? 'text-white' : 'text-zinc-400'}`}>ดูทั้งหมด</span>
     </div>
  </div>
);


const GridMovieCard = ({ movie, isFocused, onClick, innerRef }) => {
  const getYear = (dateString) => {
      if (!dateString) return '';
      if (/^\d{4}$/.test(dateString)) return dateString;
      const match = String(dateString).match(/\d{4}/);
      return match ? match[0] : dateString;
  };
  
  const displayYear = getYear(movie.year);


  return (
    <div 
      ref={innerRef}
      onClick={() => onClick(movie)}
      className={`
        relative w-full aspect-[16/9] rounded-[1.5vw] cursor-pointer transition-all duration-300
        group overflow-hidden
        ${isFocused 
          ? 'scale-105 z-20 ring-[0.3vw] ring-white/80 shadow-[0_0_2vw_rgba(255,255,255,0.3)]' 
          : 'hover:scale-105 opacity-60 hover:opacity-100'}
      `}
    >
      {/* Image Container */}
      <div className="absolute inset-0 bg-zinc-800">
         <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-500" 
            loading="lazy" 
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"; }}
         />
         
         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
         
         {/* Badge on Image */}
         <div className="absolute top-[0.8vw] right-[0.8vw] flex gap-[0.3vw]">
            {movie.type && (
               <span className="bg-black/40 backdrop-blur-md text-white/90 text-[0.7vw] px-[0.5vw] py-[0.15vw] rounded-md border border-white/10 flex items-center gap-1 font-light uppercase tracking-wider">
               {movie.type}
               </span>
            )}
         </div>
      </div>


      {/* Content Overlay (Bottom) */}
      <div className={`
        absolute bottom-0 left-0 w-full p-[1.5vw] flex flex-col justify-end 
        transition-all duration-300
        ${isFocused ? 'translate-y-0' : 'translate-y-[0.5vw]'}
      `}>
         <h3 className={`text-white font-semibold text-[1.4vw] truncate drop-shadow-lg leading-tight ${isFocused ? 'text-white' : 'text-zinc-200'}`}>{movie.title}</h3>
         
         <div className="flex items-center gap-[0.6vw] mt-[0.4vw]">
           <span className="text-zinc-300 text-[0.9vw] font-light truncate flex-1">{movie.title_alt}</span>
           {movie.title_alt && displayYear && <span className="w-[0.25vw] h-[0.25vw] bg-zinc-500 rounded-full flex-shrink-0"></span>}
           <span className="text-zinc-300 text-[0.9vw] font-light flex-shrink-0">{displayYear}</span>
         </div>
      </div>
    </div>
  );
};


const Hero = ({ movie, isFocused, activeBtnIndex, onPlay }) => {
  // Hooks MUST be at the top level
  const [videoReady, setVideoReady] = useState(false);
  const [canShowVideo, setCanShowVideo] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const videoRef = useRef(null);


  useEffect(() => {
    // Reset states when movie changes
    setVideoReady(false);
    setCanShowVideo(false);
    setRetryKey(0);


    if (movie.id === 'loading') return;


    // Timer: Wait 7 seconds before allowed to show video
    const timer = setTimeout(() => {
      setCanShowVideo(true);
      if (videoRef.current) {
         videoRef.current.load();
      }
    }, 7000);


    return () => clearTimeout(timer);
  }, [movie.id]);


  useEffect(() => {
      // Force play when conditions met
      if (canShowVideo && videoRef.current) {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
              playPromise.then(_ => {
                  // Playback started
              })
              .catch(error => {
                  console.warn("Auto-play was prevented", error);
                  // Retry might be needed here or handled by onError
              });
          }
      }
  }, [canShowVideo, retryKey]);


  const handleVideoError = () => {
      console.warn("Video failed to load/play, retrying...", movie.featured_video);
      setVideoReady(false);
      setTimeout(() => {
          setRetryKey(prev => prev + 1);
      }, 3000);
  };


  const handleVideoLoaded = () => {
      setVideoReady(true);
  };


  if (movie.id === 'loading') {
    return (
      <div className={`relative w-full h-[95vh] rounded-b-[4vw] overflow-hidden bg-black flex items-center justify-center transition-all duration-1000 ease-out ${isFocused ? 'scale-100' : 'scale-[0.98] opacity-60'}`}>
         <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-[4vw] h-[4vw] border-[0.4vw] border-zinc-800 border-t-white rounded-full animate-spin"></div>
            <span className="text-white/50 text-[1.2vw] font-light tracking-widest">กำลังโหลด...</span>
         </div>
      </div>
    );
  }


  return (
    <div className={`relative w-full h-[95vh] rounded-b-[4vw] overflow-hidden transition-all duration-1000 ease-out ${isFocused ? 'scale-100 brightness-100 blur-none' : 'scale-[0.98] brightness-50 opacity-60 blur-[0.2vw]'}`}>
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 right-0 w-[42vw] h-[42vw] bg-purple-600/20 rounded-full blur-[6vw] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[31vw] h-[31vw] bg-blue-600/20 rounded-full blur-[5vw] mix-blend-screen animate-pulse-slow delay-1000" />
      </div>
      
      {/* Background Image (Always present as base) */}
      <img 
        src={movie.image} 
        alt={movie.title} 
        className="absolute inset-0 w-full h-full object-cover animate-pan-zoom opacity-80" 
        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop"; }} // Hero Fallback
      />


      {/* Background Video */}
      {movie.featured_video && (
         <video
            key={`${movie.id}-${retryKey}`}
            ref={videoRef}
            src={movie.featured_video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out scale-[1.3] ${canShowVideo && videoReady ? 'opacity-100' : 'opacity-0'}`}
            onCanPlay={handleVideoLoaded}
            onError={handleVideoError}
         />
      )}


      <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-[#000]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#000]/80 via-transparent to-transparent" />
      
      <div className={`absolute bottom-0 left-0 w-full px-[4.2vw] pb-[6.25vw] flex flex-col items-start gap-[1.5vw] transition-all duration-700 ${isFocused ? 'translate-y-0 opacity-100' : 'translate-y-[2.5vw] opacity-80'}`}>
        <h1 className="text-[5.6vw] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl leading-[0.9] tracking-normal">{movie.title}</h1>
        <p className="text-zinc-300 text-[1.5vw] max-w-[55vw] line-clamp-2 leading-relaxed font-light mix-blend-plus-lighter">{movie.description}</p>
        <div className="flex items-center gap-[1.8vw] mt-[1.8vw]">
          <button className={`relative overflow-hidden group flex items-center gap-[1.2vw] px-[3.5vw] py-[1.6vw] rounded-[2.5rem] font-semibold transition-all duration-300 ease-out ${isFocused && activeBtnIndex === 0 ? 'bg-white text-black scale-110 shadow-[0_0_3vw_rgba(255,255,255,0.4)] ring-[0.25vw] ring-white/50' : 'bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 ring-[0.15vw] ring-white/10'}`} onClick={onPlay}>
            <span className="text-[1.4vw]">ดูรายละเอียด</span>
          </button>
        </div>
      </div>
    </div>
  );
};


const Row = ({ title, items, rowIndex, activeRow, activeCol, onMovieClick, onViewMore, rowRefMap }) => {
  const containerRef = useRef(null);
  const limitedItems = items.slice(0, 5); // ลดจำนวนการ์ดจาก 12 เรื่องเหลือ 5 เรื่อง
  useEffect(() => {
    if (activeRow === rowIndex && containerRef.current) {
      const container = containerRef.current;
      const el = rowRefMap.current?.[rowIndex]?.[activeCol] || container.children[activeCol];
      if (el) {
        try {
          el.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
        } catch {
          try {
            const rect = el.getBoundingClientRect();
            const cRect = container.getBoundingClientRect();
            if (rect.left < cRect.left) {
              container.scrollTo({ left: container.scrollLeft - (cRect.left - rect.left), behavior: 'smooth' });
            } else if (rect.right > cRect.right) {
              container.scrollTo({ left: container.scrollLeft + (rect.right - cRect.right), behavior: 'smooth' });
            }
          } catch {}
        }
      }
    }
  }, [activeRow, activeCol, rowIndex]);
  const isActive = activeRow === rowIndex;
  return (
    <div className={`py-[0.8vw] transition-all duration-700 ease-out relative ${isActive ? 'opacity-100 scale-100 blur-none z-50' : 'opacity-30 scale-95 blur-[0.1vw] z-0'}`}>
      <h2 className={`text-[2.5vw] font-bold text-white -mb-[1vw] z-10 relative flex items-center gap-[1vw] tracking-tight transition-all duration-500 origin-left pl-[4.2vw] ${isActive ? 'translate-x-0 text-white' : '-translate-x-[1.5vw] text-zinc-500'}`}>{title} <ChevronRight className="w-[2vw] h-[2vw] text-white/50 animate-pulse" /></h2>
      <div ref={containerRef} className="flex gap-[2vw] overflow-x-auto overflow-y-hidden pb-[8vw] pt-[5vw] px-[4.2vw] w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}>
        {limitedItems.map((item, colIndex) => (
          <MovieCard key={`${item.id}-${rowIndex}`} movie={item} isFocused={isActive && activeCol === colIndex} onClick={onMovieClick} innerRef={el => { if(!rowRefMap.current[rowIndex]) rowRefMap.current[rowIndex] = []; rowRefMap.current[rowIndex][colIndex] = el; }} />
        ))}
        <ViewMoreCard isFocused={isActive && activeCol === limitedItems.length} onClick={() => onViewMore(title)} innerRef={el => { if(!rowRefMap.current[rowIndex]) rowRefMap.current[rowIndex] = []; rowRefMap.current[rowIndex][limitedItems.length] = el; }} />
      </div>
    </div>
  );
};


const Modal = ({ movie, onClose }) => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [fullscreenSrc, setFullscreenSrc] = useState(null); // external content shown inside fullscreen overlay
  const [showDescPopup, setShowDescPopup] = useState(false);
  const descRef = useRef(null);
  const [hasMoreDesc, setHasMoreDesc] = useState(false);
  const [focusMore, setFocusMore] = useState(false);
  const [epFocus, setEpFocus] = useState(-1); // -1 means not focusing episodes grid
  const rightPanelRef = useRef(null);
  const epRefs = useRef([]);
  const [focusClose, setFocusClose] = useState(false);
  const titleRef = useRef(null);
  const epNavThrottleRef = useRef(0);
  const iframeRef = useRef(null);
  const awaitingFullscreenPop = useRef(false);
  const fullscreenPopFallbackTimer = useRef(null);

  const clearFullscreenFallback = useCallback(() => {
    if (fullscreenPopFallbackTimer.current) {
      clearTimeout(fullscreenPopFallbackTimer.current);
      fullscreenPopFallbackTimer.current = null;
    }
  }, []);

  const closeFullscreen = useCallback((preferHistory = false) => {
    if (!fullscreenSrc) return;

    const overlayStateIsFullscreen = (() => {
      try {
        return window.history?.state?.overlay === 'fullscreen';
      } catch {
        return false;
      }
    })();

    if (preferHistory && overlayStateIsFullscreen) {
      awaitingFullscreenPop.current = true;
      try { window.__moviifoxSuppressModalPop = true; } catch {}
      try {
        window.history.back();
      } catch {
        awaitingFullscreenPop.current = false;
        clearFullscreenFallback();
        setFullscreenSrc(null);
        return;
      }
      clearFullscreenFallback();
      fullscreenPopFallbackTimer.current = setTimeout(() => {
        if (awaitingFullscreenPop.current) {
          awaitingFullscreenPop.current = false;
          setFullscreenSrc(null);
        }
      }, 300);
    } else {
      awaitingFullscreenPop.current = false;
      clearFullscreenFallback();
      setFullscreenSrc(null);
    }
  }, [fullscreenSrc, clearFullscreenFallback]);

  const openFullscreen = (url) => {
    if (!url) return;
    try {
      const target = url.startsWith('//') ? `https:${url}` : url;
      setFullscreenSrc(target);
    } catch {}
  };

  const isSeries = ((movie?.category || movie?.type || '')).toLowerCase().includes('series');

  // When opening a series, highlight Trailer by default and reset focus states
  useEffect(() => {
    if (isSeries) {
      setActiveBtn(1);
      setFocusMore(false);
      setEpFocus(-1);
    }
  }, [isSeries, movie?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTvBackKey = (e.key === 'Back' || e.key === 'GoBack' || e.key === 'BrowserBack');
      const isTvBackCode = (e.keyCode === 10009 || e.keyCode === 461);

      if (fullscreenSrc) {
        if (isTvBackKey || isTvBackCode || e.key === 'Escape' || e.key === 'Backspace') {
          try { e.preventDefault(); } catch {}
          closeFullscreen(true);
        }
        return;
      }

      // Normal modal key handling (no iframe mode)
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      // TV remote Back normalization inside modal
      if (isTvBackKey || isTvBackCode) {
        try { e.preventDefault(); } catch {}
        if (showDescPopup) {
          if (window.history.length > 0) {
            try { window.history.back(); } catch { setShowDescPopup(false); }
          } else {
            setShowDescPopup(false);
          }
        } else {
          onClose();
        }
        return;
      }
      if (e.key === 'Escape' || e.key === 'Backspace') {
        if (showDescPopup) {
          if (window.history.length > 0) {
            window.history.back();
          } else {
            setShowDescPopup(false);
          }
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        if (isSeries) {
          const now = Date.now();
          if (now - epNavThrottleRef.current < 150) return;
          epNavThrottleRef.current = now;
        }
        // When focusing X, keep focus there on horizontal
        if (focusClose) return;
        // Navigate inside episodes grid when focused
        if (isSeries && epFocus >= 0 && Array.isArray(movie?.episodes)) {
          const cols = 3;
          const max = movie.episodes.length - 1;
          const col = epFocus % cols;
          if (col < cols - 1 && epFocus + 1 <= max) setEpFocus(epFocus + 1);
          return;
        }
        if (focusMore) {
          // From 'เพิ่มเติม' move right to 'เล่นเลย'
          setFocusMore(false);
          setActiveBtn(isSeries ? 1 : 0);
        } else {
          // Move to next primary button
          setActiveBtn(1);
        }
      }
      else if (e.key === 'ArrowLeft') {
        if (isSeries) {
          const now = Date.now();
          if (now - epNavThrottleRef.current < 150) return;
          epNavThrottleRef.current = now;
        }
        if (focusClose) return; // keep focus on X for left
        // Navigate inside episodes grid when focused
        if (isSeries && epFocus >= 0 && Array.isArray(movie?.episodes)) {
          const cols = 3;
          const col = epFocus % cols;
          if (col > 0) setEpFocus(epFocus - 1);
          return;
        }
        if (focusMore) {
          // Stay on 'เพิ่มเติม' when moving left
        } else {
          // From 'เล่นเลย' move left to 'เพิ่มเติม' (movie mode)
          if (!isSeries && activeBtn === 0 && hasMoreDesc) setFocusMore(true);
          else setActiveBtn(0);
        }
      }
      else if (e.key === 'ArrowDown') {
        if (isSeries) {
          const now = Date.now();
          if (now - epNavThrottleRef.current < 150) return;
          epNavThrottleRef.current = now;
        }
        if (focusClose) {
          // Leave X to main button area
          setFocusClose(false);
          if (isSeries) setActiveBtn(1); else setActiveBtn(0);
          return;
        }
        // From 'เพิ่มเติม' go back to 'เล่นเลย'
        if (focusMore) {
          setFocusMore(false);
          setActiveBtn(isSeries ? 1 : 0);
          return;
        }
        // Navigate down inside episodes grid (3 columns)
        if (isSeries && epFocus >= 0 && Array.isArray(movie?.episodes)) {
          const cols = 3;
          const max = movie.episodes.length - 1;
          const next = epFocus + cols;
          if (next <= max) setEpFocus(next);
          return;
        }
        // Enter episodes grid in series from trailer button
        if (isSeries && Array.isArray(movie?.episodes) && movie.episodes.length > 0) {
          setEpFocus(0);
        }
      }
      else if (e.key === 'ArrowUp') {
        if (isSeries) {
          const now = Date.now();
          if (now - epNavThrottleRef.current < 150) return;
          epNavThrottleRef.current = now;
        }
        // If already at More, go to X; if on buttons and no More, go to X directly
        if (focusMore || (!hasMoreDesc && !focusClose && epFocus === -1)) {
          setFocusMore(false);
          setFocusClose(true);
          // scroll to top so X and top content are visible
          try { rightPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
          try { titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch {}
          return;
        }
        if (!focusClose && !focusMore && epFocus === -1) {
          if (hasMoreDesc) { setFocusMore(true); return; }
          setFocusClose(true);
          try { rightPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
          try { titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch {}
          return;
        }
        // Navigate up inside episodes grid (3 columns)
        if (isSeries && epFocus >= 0 && Array.isArray(movie?.episodes)) {
          const cols = 3;
          const prev = epFocus - cols;
          if (prev >= 0) {
            setEpFocus(prev);
            // Scroll to top when moving from row 2+ to row 1
            const isMovingToFirstRow = epFocus >= cols && prev < cols;
            if (isMovingToFirstRow) {
              try { rightPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
            }
          } else {
            // Leave episodes grid upwards back to trailer button
            setEpFocus(-1);
            // then move to More or X depending on availability on next Up
            // Avoid immediate scroll here to prevent jitter; top scroll will occur when focusing More/X
          }
          return;
        }
        // Jump to 'เพิ่มเติม' on ArrowUp
        if (hasMoreDesc) setFocusMore(true);
      }
      // TV Info key or keyboard 'i' to open full description
      else if (!showDescPopup && hasMoreDesc && (e.key === 'Info' || e.code === 'Info' || e.key === 'i' || e.key === 'I' || e.code === 'KeyI' || e.keyCode === 457)) {
        setShowDescPopup(true);
      }
      else if (e.key === 'Enter') {
        if (focusClose) { onClose(); return; }
        if (isSeries && epFocus >= 0 && Array.isArray(movie?.episodes)) {
          const ep = movie.episodes[epFocus];
          if (ep?.link) { openFullscreen(ep.link); }
        } else if (focusMore) {
          if (hasMoreDesc) setShowDescPopup(true);
        } else if (!isSeries && activeBtn === 0 && movie?.movielink) {
          openFullscreen(movie.movielink);
        } else if (activeBtn === 1 && movie?.trailer) {
          openFullscreen(movie.trailer);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, activeBtn, showDescPopup, movie, isSeries, hasMoreDesc, focusMore, epFocus, focusClose, fullscreenSrc]);

  // When focusing the X button, ensure the top content is visible
  useEffect(() => {
    if (focusClose) {
      try { rightPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
    }
  }, [focusClose]);

  // When focusing the 'เพิ่มเติม' link, bring the description area into view
  useEffect(() => {
    if (focusMore && descRef.current) {
      try {
        const panel = rightPanelRef.current;
        const el = descRef.current;
        if (panel && el) {
          const pRect = panel.getBoundingClientRect();
          const eRect = el.getBoundingClientRect();
          // Margins to avoid micro scrolls
          const topMargin = 16; // px
          const bottomMargin = 24; // px
          const isAbove = eRect.top < pRect.top + topMargin;
          const isBelow = eRect.bottom > pRect.bottom - bottomMargin;
          if (isAbove || isBelow) {
            const deltaTop = eRect.top - pRect.top - topMargin;
            panel.scrollTo({ top: panel.scrollTop + deltaTop, behavior: 'smooth' });
          }
        }
      } catch {}
    }
  }, [focusMore]);

  // Snap episodes row: align focused row to the same vertical position as row 1 (skip first row to avoid jitter)
  useEffect(() => {
    if (epFocus >= 0 && rightPanelRef.current) {
      const target = epRefs.current[epFocus];
      const first = epRefs.current[0];
      if (target && first) {
        try {
          const cols = 3;
          const row = Math.floor(epFocus / cols);
          if (row > 0) {
            const desiredTop = Math.max(0, target.offsetTop - first.offsetTop);
            rightPanelRef.current.scrollTo({ top: desiredTop, behavior: 'smooth' });
          }
        } catch {
          // ignore
        }
      }
    }
  }, [epFocus]);

  useEffect(() => {
    if (!fullscreenSrc) return;
    let attempts = 0;
    const maxAttempts = 10;

    const tryFocus = () => {
      const iframeEl = iframeRef.current;
      if (!iframeEl) return;
      try {
        iframeEl.focus({ preventScroll: true });
      } catch {}
      try {
        iframeEl.contentWindow?.focus();
      } catch {}
      attempts += 1;
      if (attempts < maxAttempts && fullscreenSrc) {
        setTimeout(tryFocus, 120);
      }
    };

    const initialTimer = setTimeout(tryFocus, 50);
    const sustainTimer = setInterval(() => {
      if (fullscreenSrc) {
        tryFocus();
      }
    }, 1500);

    const handleFocusRestore = () => {
      if (fullscreenSrc) {
        tryFocus();
      }
    };

    window.addEventListener('keydown', handleFocusRestore, true);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(sustainTimer);
      window.removeEventListener('keydown', handleFocusRestore, true);
    };
  }, [fullscreenSrc]);

  useEffect(() => {
    if (!fullscreenSrc) {
      awaitingFullscreenPop.current = false;
      clearFullscreenFallback();
    }
  }, [fullscreenSrc, clearFullscreenFallback]);

  // Push a history state when opening overlays so hardware back triggers popstate
  useEffect(() => {
    if (fullscreenSrc) {
      try { window.history.pushState({ overlay: 'fullscreen' }, ''); } catch {}
    } else if (showDescPopup) {
      try { window.history.pushState({ overlay: 'desc' }, ''); } catch {}
    }
  }, [showDescPopup, fullscreenSrc]);

  // Handle popstate (browser/remote back)
  useEffect(() => {
    const onPop = () => {
      if (fullscreenSrc) {
        awaitingFullscreenPop.current = false;
        clearFullscreenFallback();
        setFullscreenSrc(null);
        try { window.__moviifoxSuppressModalPop = false; } catch {}
        return;
      }
      if (showDescPopup) {
        setShowDescPopup(false);
        return;
      }
      onClose();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [fullscreenSrc, showDescPopup, onClose]);

  // Measure description lines to decide showing 'เพิ่มเติม'
  useEffect(() => {
    const el = descRef.current;
    if (!el) { setHasMoreDesc(false); return; }
    try {
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight || '0');
      if (lineHeight > 0) {
        const lines = Math.round(el.scrollHeight / lineHeight);
        setHasMoreDesc(lines > 6);
      } else {
        setHasMoreDesc(false);
      }
    } catch {
      setHasMoreDesc(false);
    }
  }, [movie?.description]);

  if (!movie) return null;

  const categoriesCapsules = (movie.category_capsules || movie.category || '')
    .split(/[,|]/)
    .map(s => s.trim())
    .filter(Boolean);

  const infoPieces = [];
  if (movie.release_date) infoPieces.push(String(movie.release_date));
  if (movie.duration) infoPieces.push(String(movie.duration));
  if (isSeries && movie.ep_status) infoPieces.push(String(movie.ep_status));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-[3vw]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[50px] transition-all duration-500" onClick={() => (fullscreenSrc || showDescPopup) ? null : onClose()} />

      {/* Fullscreen player overlay */}
      {fullscreenSrc && (
        <div className="fixed inset-0 z-[140] bg-black">
          <iframe
            src={fullscreenSrc}
            title="Video player"
            className="w-full h-full"
            ref={iframeRef}
            tabIndex={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; keyboard-map"
            allowFullScreen
          />
        </div>
      )}

      {/* Fullscreen description popup */}
      {showDescPopup && (
        <div className="fixed inset-0 z-[150] bg-black/95 text-white overflow-y-auto">
          <div className="max-w-[60vw] mx-auto py-[5vw] px-[2vw]">
            <h3 className="text-[2.6vw] font-semibold mb-[1vw] leading-tight">{movie.title}</h3>
            {movie.title_alt && <div className="text-[1.4vw] text-zinc-400 mb-[2vw] leading-snug">{movie.title_alt}</div>}
            <div className="text-[1.3vw] leading-relaxed whitespace-pre-wrap">{movie.description}</div>
          </div>
        </div>
      )}

      {/* Main modal layout */}
      <div className="relative w-full h-full bg-zinc-900/60 rounded-[3vw] overflow-hidden shadow-[0_0_5vw_rgba(0,0,0,0.5)] border border-white/10 animate-modal-pop backdrop-blur-3xl flex">
        {/* Close button pinned to modal container (does not scroll with right panel) */}
        <button onClick={onClose} className={`absolute top-[3vw] right-[3vw] z-999 w-[4vw] h-[4vw] rounded-full flex items-center justify-center border transition-all ${focusClose ? 'bg-white text-black ring-2 ring-white/50 scale-110 border-white' : 'bg-[#181616ff] backdrop-blur-2xl duration-500 hover:bg-white/20 border-white/10'}`}>
          <X className={`w-[1.8vw] h-[1.8vw] ${focusClose ? 'text-black' : 'text-white'}`} />
        </button>
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-blue-500/20 rounded-full blur-[10vw] mix-blend-screen pointer-events-none" />
        <div className="relative w-[55%] h-full">
          <img src={movie.image} alt={movie.title} className="w-full h-full object-cover mask-image-gradient" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900/20 to-zinc-900/90" />
          {movie.type && (
            <span className="absolute top-[1vw] left-[1vw] bg-black/60 backdrop-blur-md text-white/90 text-[0.9vw] px-[0.7vw] py-[0.2vw] rounded-md border border-white/10 uppercase tracking-wider transform origin-top-left scale-[1.5]">
              {movie.type}
            </span>
          )}
        </div>

        <div ref={rightPanelRef} className="relative w-[45%] px-[4vw] pb-[4vw] pt-[8vw] flex flex-col justify-start z-10 overflow-y-auto">

          {/* Title and sub-lines */}
          <h2 ref={titleRef} className="text-[3.2vw] font-semibold text-white mb-[0.6vw] leading-[1.05] tracking-tight">{movie.title}</h2>
          {movie.title_alt && (
            <div className="text-[1.4vw] text-zinc-400 mb-[0.6vw] leading-snug">{movie.title_alt}</div>
          )}
          {infoPieces.length > 0 && (
            <div className="flex items-center flex-wrap gap-x-[0.8vw] text-[1.2vw] text-zinc-300 mb-[1vw] leading-none">
              {infoPieces.map((p, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="w-[0.35vw] h-[0.35vw] rounded-full bg-zinc-500 self-center" />}
                  <span className="whitespace-nowrap">{p}</span>
                </React.Fragment>
              ))}
            </div>
          )}
          {categoriesCapsules.length > 0 && (
            <div className="flex flex-wrap gap-[0.6vw] mb-[1.2vw]">
              {categoriesCapsules.map((c, idx) => (
                <span key={idx} className="text-[1vw] px-[0.9vw] py-[0.35vw] rounded-full bg-white/10 border border-white/10 text-white/90">{c}</span>
              ))}
            </div>
          )}

          {/* Description truncated + more button */}
          <div className="text-zinc-300 text-[1.3vw] leading-snug mb-[2vw] font-light mix-blend-plus-lighter">
            <div ref={descRef} className="line-clamp-6">{movie.description || FEATURED_MOVIE.description}</div>
            {movie.description && hasMoreDesc && (
              <button
                type="button"
                tabIndex={0}
                className={`mt-[0.6vw] underline underline-offset-4 text-[1.1vw] transition-all ${focusMore ? 'text-white scale-105 ring-2 ring-white/40 rounded-md px-[0.4vw]' : 'text-white/90 hover:text-white'}`}
                onClick={() => setShowDescPopup(true)}
              >
                เพิ่มเติม
              </button>
            )}
          </div>

          {/* Buttons / Episodes */}
          {!isSeries ? (
            <div className="flex gap-[1.5vw] mt-auto">
              <button
                className={`flex-1 py-[1.3vw] rounded-[2vw] font-semibold text-[1.4vw] transition-all duration-300 flex items-center justify-center gap-[1vw] ${(activeBtn === 0 && epFocus === -1 && !focusMore && !focusClose) ? 'bg-white text-black scale-105 shadow-[0_0_2vw_rgba(255,255,255,0.3)]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                onClick={() => movie?.movielink && openFullscreen(movie.movielink)}
              >
                <Play className="w-[1.6vw] h-[1.6vw] fill-current" /> เล่นเลย
              </button>
              <button
                className={`flex-1 py-[1.3vw] rounded-[2vw] font-semibold text-[1.4vw] transition-all duration-0 ${(activeBtn === 1 && epFocus === -1 && !focusMore && !focusClose) ? 'bg-white/10 text-white border-2 border-white/70 scale-105 shadow-[0_0_2vw_rgba(255,255,255,0.12)]' : 'bg-white/5 text-white hover:bg-white/10'}`}
                onClick={() => movie?.trailer && openFullscreen(movie.trailer)}
              >
                ดูตัวอย่าง
              </button>
            </div>
          ) : (
            <div className="mt-auto">
              {movie?.trailer && (
                <div className="mb-[1vw]">
                  <button
                    className={`w-full py-[1.1vw] rounded-[2vw] font-semibold text-[1.3vw] transition-all duration-0 ${(activeBtn === 1 && epFocus === -1 && !focusMore && !focusClose) ? 'bg-white/10 text-white border-2 border-white/70 shadow-[0_0_2vw_rgba(255,255,255,0.12)]' : 'bg-white/5 text-white hover:bg-white/10'}`}
                    onClick={() => openFullscreen(movie.trailer)}
                  >
                    ดูตัวอย่าง
                  </button>
                </div>
              )}
              {Array.isArray(movie.episodes) && movie.episodes.length > 0 && (
                <div className="grid grid-cols-3 gap-[0.8vw]">
                  {movie.episodes.map((ep, i) => (
                    <button
                      key={i}
                      ref={el => epRefs.current[i] = el}
                      className={`w-full py-[0.9vw] rounded-[1.2vw] border text-white text-[1.1vw] truncate transition-all ${epFocus === i ? 'bg-white/20 border-white/60 ring-2 ring-white/50 scale-[1.03]' : 'bg-white/5 hover:bg-white/10 border-white/10'}`}
                      onClick={() => { if (ep?.link) { openFullscreen(ep.link); } }}
                      title={ep?.name || `ตอนที่ ${i + 1}`}
                    >
                      {ep?.name || `ตอนที่ ${i + 1}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const GridFilter = ({ activeIndex, isFocused, onSelect, currentFilter }) => {
  const filters = ['ทั้งหมด', 'ภาพยนตร์', 'ซีรีส์'];
  const getButtonStyle = (isItemFocused, isActive) => `px-[2.5vw] py-[0.8vw] rounded-full text-[1.3vw] font-medium transition-all duration-300 ${isItemFocused ? 'bg-white text-black shadow-[0_0_1.5vw_rgba(255,255,255,0.5)] scale-115 z-10 font-bold' : isActive ? 'bg-white/20 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`;
  return (
    <div className="flex gap-[1vw] items-center">
      {filters.map((f, i) => (
        <button key={i} className={getButtonStyle(isFocused && activeIndex === i, currentFilter === f)} onClick={() => onSelect && onSelect(f)}>{f}</button>
      ))}
    </div>
  );
};


// Function to generate dynamic pagination items
const generatePaginationItems = (currentPage, totalPages) => {
  const items = [];
  if (currentPage > 1) items.push({ type: 'prev', label: 'ก่อนหน้า', page: currentPage - 1 });
  let start = Math.max(1, currentPage - 2);
  if (start + 4 > totalPages) start = Math.max(1, totalPages - 4);
  if (start < 1) start = 1;
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) {
    items.push({ type: 'page', label: i, page: i, active: i === currentPage });
  }
  if (currentPage < totalPages) items.push({ type: 'next', label: 'ถัดไป', page: currentPage + 1 });
  return items;
};


const Pagination = ({ totalItems, itemsPerPage, currentPage, activeIndex, isFocused, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const items = generatePaginationItems(currentPage, totalPages);
  const getButtonStyle = (isItemFocused, isActive, isCircle = false) => `relative flex items-center justify-center transition-all duration-300 font-medium ${isCircle ? 'w-[3.5vw] h-[3.5vw] rounded-full' : 'h-[3.5vw] px-[1.2vw] rounded-full'} ${isItemFocused ? 'bg-white text-black shadow-[0_0_1.2vw_rgba(255,255,255,0.5)] scale-110 z-10 font-bold' : isActive ? 'bg-white/20 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`;


  return (
    <div className="flex justify-center mt-[4vw] pb-[6vw]">
      <div className={`flex items-center gap-[0.6vw] p-[0.6vw] rounded-full border border-white/10 backdrop-blur-2xl bg-black/40 shadow-[0_0.5vw_2vw_rgba(0,0,0,0.5)] transition-all duration-500 ${isFocused ? 'scale-105 ring-1 ring-white/20 shadow-[0_0_3vw_rgba(255,255,255,0.15)]' : 'scale-100'}`}>
        {items.map((item, index) => (
           <button key={index} className={`${getButtonStyle(isFocused && activeIndex === index, item.active, item.type === 'page')} ${item.type === 'page' ? 'text-[1.8vw]' : 'text-[1.3vw]'}`} onClick={() => { if (item.type === 'page') onPageChange(item.page); else if (item.type === 'prev') onPageChange(item.page); else if (item.type === 'next') onPageChange(item.page); }}>{item.label}</button>
        ))}
      </div>
    </div>
  );
};


const GridPage = ({ movies, activeRow, activeCol, onMovieClick, rowRefMap, currentFilter, currentPage, onPageChange, gridColumns, paginationItems, pageTitle, showFilters, titleStyle, pageSubtitle, onFilterChange, coverImage }) => {
  const ITEMS_PER_PAGE = 40;
  const currentMovies = movies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const isPageActive = activeRow !== -2;


  return (
    <div className="w-full min-h-screen bg-black">
      <div className={`transition-all duration-700 ease-out ${isPageActive ? 'opacity-100 scale-100 brightness-100' : 'opacity-40 scale-[0.98] brightness-50 blur-[2px]'}`}>
        <div className={`relative w-full h-[40vw] overflow-hidden`}>
           <div className="absolute inset-0">
              <img src={coverImage || "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop"} alt="Cover" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
           </div>
           <div className="absolute bottom-0 left-0 w-full px-[4vw] pb-[2vw] flex items-end justify-between">
              <div>
                <h1 className="font-bold leading-none drop-shadow-xl" 
                    style={{
                         fontSize: titleStyle?.fontSize || '3.5vw',
                         color: titleStyle?.color || 'white',
                         fontFamily: titleStyle?.fontFamily || 'Foxgraphie, sans-serif'
                    }}>
                    {pageTitle || 'ภาพยนตร์/ซีรีส์'}
                </h1>
                <span className="text-[1.5vw] text-zinc-300 font-light tracking-widest drop-shadow-md">{pageSubtitle || 'Movies/Series'}</span>
              </div>
              {showFilters && <div className="mb-[0.5vw]"><GridFilter activeIndex={activeCol} isFocused={activeRow === -1} currentFilter={currentFilter} onSelect={onFilterChange} /></div>}
           </div>
        </div>
        <div className="px-[4vw] pt-[2.5vw]">
          <div className="grid grid-cols-4 gap-[2vw]">
            {currentMovies.map((movie, index) => {
               const rowIndex = Math.floor(index / gridColumns);
               const colIndex = index % gridColumns;
               const isFocused = activeRow === rowIndex && activeCol === colIndex;
               return (
                 <GridMovieCard key={movie.id} movie={movie} isFocused={isFocused} onClick={onMovieClick} innerRef={el => { if(!rowRefMap.current[rowIndex]) rowRefMap.current[rowIndex] = []; rowRefMap.current[rowIndex][colIndex] = el; }} />
               );
            })}
          </div>
          {paginationItems.length > 0 ? (
            <Pagination totalItems={movies.length} itemsPerPage={ITEMS_PER_PAGE} currentPage={currentPage} activeIndex={activeCol} isFocused={activeRow >= Math.ceil(currentMovies.length/gridColumns)} onPageChange={onPageChange} />
          ) : (
             <div className="mt-[4vw] pb-[6vw] h-[4.7vw]" />
          )}
        </div>
      </div>
    </div>
  );
};


const SearchScreen = ({ searchQuery, setSearchQuery, searchResults, activeRow, activeCol, onMovieClick, rowRefMap }) => {
  const isPageActive = activeRow !== -2;
  const gridColumns = 4;
  const inputRef = useRef(null);

  useEffect(() => {
    if (activeRow === -1 && inputRef.current) {
      inputRef.current.focus();
    } else if (activeRow !== -1 && document.activeElement === inputRef.current) {
      inputRef.current.blur();
    }
  }, [activeRow]);


  return (
    <div className={`w-full min-h-screen flex flex-col items-center pt-[14vw] text-white transition-all duration-500 ${isPageActive ? 'opacity-100 blur-0' : 'opacity-40 blur-[2px]'}`}>
      <h2 className="text-[3vw] font-semibold mb-[2vw] flex items-center gap-4">
         <Search className="w-[3vw] h-[3vw] text-white" /> ค้นหาภาพยนตร์/ซีรีส์
      </h2>
      <div className={`w-[50vw] h-[5vw] bg-zinc-900 rounded-full flex items-center px-[2vw] border transition-all duration-300 mb-[4vw] ${activeRow === -1 ? 'border-white scale-110 shadow-[0_0_2vw_rgba(255,255,255,0.2)] bg-zinc-800' : 'border-white/10 opacity-70'}`}>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="พิมพ์ชื่อเรื่อง..."
          className="w-full h-full bg-transparent text-[1.8vw] text-white outline-none placeholder-zinc-500"
        />
      </div>
      <div className="w-full px-[4vw] flex-1 overflow-y-auto pb-[4vw] pt-[2.5vw]"> 
         {searchResults.length > 0 ? (
            <div className="grid grid-cols-4 gap-[2vw]">
               {searchResults.map((movie, index) => {
                   const rowIndex = Math.floor(index / gridColumns);
                   const colIndex = index % gridColumns;
                   const isFocused = activeRow === rowIndex && activeCol === colIndex;
                   return (
                     <GridMovieCard key={movie.id} movie={movie} isFocused={isFocused} onClick={onMovieClick} innerRef={el => { if(!rowRefMap.current[rowIndex]) rowRefMap.current[rowIndex] = []; rowRefMap.current[rowIndex][colIndex] = el; }} />
                   );
               })}
            </div>
         ) : (
            <div className="text-center text-zinc-500 text-[1.5vw] mt-[5vw]">
               {searchQuery ? 'ไม่พบผลลัพธ์' : 'เริ่มพิมพ์เพื่อค้นหา ภาพยนตร์/ซีรีส์ ที่คุณต้องการ'}
            </div>
         )}
      </div>
    </div>
  );
};


const AccountScreen = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center text-white">
    <div className="w-[10vw] h-[10vw] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-[2vw] flex items-center justify-center text-[4vw] font-bold">U</div>
    <h2 className="text-[3vw] font-semibold mb-[1vw]">บัญชีผู้ใช้</h2>
    <p className="text-[1.5vw] text-zinc-400">จัดการข้อมูลสมาชิกและการตั้งค่า</p>
  </div>
);


export default function App() {
  const [activeRow, setActiveRow] = useState(-1);
  const [activeCol, setActiveCol] = useState(0);
  const [lastActiveRow, setLastActiveRow] = useState(-1); 
  const [lastActiveCol, setLastActiveCol] = useState(0); 
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('home'); 
  const [currentFilter, setCurrentFilter] = useState('ทั้งหมด');
  const [gridPage, setGridPage] = useState(1); 
  const [searchQuery, setSearchQuery] = useState('');
  const [allMovies, setAllMovies] = useState([]); // Empty init
  const [heroMovie, setHeroMovie] = useState(FEATURED_MOVIE);
  
  const rowRefMap = useRef({});
  const lastInputTime = useRef(0);
  const APP_STATE_KEY = 'moviifox_app_state_v1';
  const pendingRestore = useRef(null);
  const actionSuppressUntil = useRef(0);
  const previousActiveTab = useRef(activeTab);


  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/movies?select=*`, {
       headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}` 
       }
    })
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
         const movies = transformSupabaseData(data);
         if(movies.length > 0) {
            setAllMovies(movies);
            
            // Random Hero Logic
            const heroCandidates = movies.filter(m => m.category && m.category.toLowerCase().includes('hero'));
            if (heroCandidates.length > 0) {
                const randomHero = heroCandidates[Math.floor(Math.random() * heroCandidates.length)];
                setHeroMovie(randomHero);
            } else if (movies.length > 0) {
                setHeroMovie(movies[0]);
            }
         }
      })
      .catch(err => {
         console.warn("Supabase load failed.", err);
      });
  }, []);


  // Push a history state when opening modal or leaving navbar so hardware back can work on TV webapps
  useEffect(() => {
    try {
      if (selectedMovie) {
        window.history.pushState({ modal: true }, '');
      } else if (activeRow !== -2) {
        window.history.pushState({ focus: true }, '');
      }
    } catch {}
  }, [selectedMovie, activeRow]);

  // Global popstate handler: close modal if open, else move focus back to navbar
  useEffect(() => {
    const onPop = () => {
      if (typeof window !== 'undefined' && window.__moviifoxSuppressModalPop) {
        window.__moviifoxSuppressModalPop = false;
        return;
      }

      if (selectedMovie) {
        setSelectedMovie(null);
        return;
      }
      if (activeRow !== -2) {
        const activeIdx = NAV_ITEMS.findIndex(item => item.id === activeTab);
        let target = 0;
        if (target === activeIdx) target = 1;
        setLastActiveRow(activeRow);
        setLastActiveCol(activeCol);
        setActiveRow(-2);
        setActiveCol(target);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [selectedMovie, activeRow, activeTab, activeCol]);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem(APP_STATE_KEY);
      if (s) pendingRestore.current = JSON.parse(s);
    } catch {}
  }, []);

  useEffect(() => {
    if (!allMovies || allMovies.length === 0) return;
    const s = pendingRestore.current;
    if (s) {
      try {
        setActiveTab(s.activeTab ?? 'home');
        setCurrentFilter(s.currentFilter ?? 'ทั้งหมด');
        setGridPage(s.gridPage ?? 1);
        setActiveRow(s.activeRow ?? -1);
        setActiveCol(s.activeCol ?? 0);
        setLastActiveRow(s.lastActiveRow ?? -1);
        setLastActiveCol(s.lastActiveCol ?? 0);
        setSearchQuery(s.searchQuery ?? '');
        if (s.selectedMovieId) {
          const found = allMovies.find(m => String(m.id) === String(s.selectedMovieId));
          if (found) setSelectedMovie(found);
        }
      } catch {}
      pendingRestore.current = null;
    }
  }, [allMovies]);

  useEffect(() => {
    const snapshot = {
      activeTab,
      currentFilter,
      gridPage,
      activeRow,
      activeCol,
      lastActiveRow,
      lastActiveCol,
      searchQuery,
      selectedMovieId: selectedMovie?.id || null,
    };
    try { sessionStorage.setItem(APP_STATE_KEY, JSON.stringify(snapshot)); } catch {}
  }, [activeTab, currentFilter, gridPage, activeRow, activeCol, lastActiveRow, lastActiveCol, searchQuery, selectedMovie]);


  useEffect(() => {
    const previousTab = previousActiveTab.current;

    if (['y_content', 'k_content', 'festival'].includes(activeTab)) {
        setActiveRow(-1);
        window.scrollTo(0, 0);
        setTimeout(() => window.scrollTo(0, 0), 50);
    }

    rowRefMap.current = {};

    if (activeTab === 'search' && previousTab !== 'search') {
        setActiveRow(-1);
    }

    previousActiveTab.current = activeTab;
  }, [activeTab]);


  const categories = useMemo(() => {
    return getCategoriesForTab(allMovies, activeTab);
  }, [activeTab, allMovies]);


  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return allMovies.filter(m => 
      (m.title && m.title.toLowerCase().includes(query)) || 
      (m.title_alt && m.title_alt.toLowerCase().includes(query))
    );
  }, [searchQuery, allMovies]);


  const isGridMode = ['movies', 'y_content', 'k_content', 'festival', 'brand_netflix', 'brand_disney', 'brand_hbo', 'brand_marvel'].includes(activeTab);
  const isSearchMode = activeTab === 'search';
  
  const gridMovies = useMemo(() => {
      if (isSearchMode) return searchResults;
      if(!isGridMode) return [];
      if (activeTab === 'movies') {
          if (currentFilter === 'ภาพยนตร์') return categories.filter(m => m.category && m.category.includes('movie'));
          if (currentFilter === 'ซีรีส์') return categories.filter(m => m.category && m.category.includes('series'));
      }
      if (activeTab === 'festival') {
        return allMovies.filter(m => String(m.tags || m.tag || '').toLowerCase().includes('halloween'));//แก้ตัวกรองหน้า festival ตรงนี้
      }
      // Brand pages filter by tags on allMovies
      const tagMap = {
        brand_netflix: 'netflix',
        brand_disney: 'disney',
        brand_hbo: 'hbo',
        brand_marvel: 'marvel'
      };
      if (activeTab in tagMap) {
        const tag = tagMap[activeTab];
        return allMovies.filter(m => String(m.tags || m.tag || '').toLowerCase().includes(tag));
      }
      return categories;
  }, [isGridMode, isSearchMode, categories, currentFilter, activeTab, searchResults, allMovies]);


  const gridColumns = 4;
  const ITEMS_PER_PAGE = 40;
  const totalPages = isSearchMode ? 1 : Math.ceil(gridMovies.length / ITEMS_PER_PAGE);
  const paginationItems = useMemo(() => {
    if (!isGridMode || totalPages <= 1) return [];
    return generatePaginationItems(gridPage, totalPages);
  }, [isGridMode, gridPage, totalPages]);

  // Clamp current page if totalPages decreases (avoid blank page)
  useEffect(() => {
    if (!isGridMode) return;
    if (totalPages < 1) {
      if (gridPage !== 1) setGridPage(1);
      return;
    }
    if (gridPage > totalPages) setGridPage(totalPages);
  }, [isGridMode, totalPages]);


  const currentMoviesOnPage = isSearchMode ? gridMovies : gridMovies.slice((gridPage - 1) * ITEMS_PER_PAGE, gridPage * ITEMS_PER_PAGE);
  const currentGridRows = Math.ceil(currentMoviesOnPage.length / gridColumns);


  const stateRef = useRef({
    activeRow, activeCol, lastActiveRow, lastActiveCol, selectedMovie, activeTab,
    categories, isGridMode, isSearchMode, gridMovies, gridColumns, currentGridRows,
    NAV_ITEMS, currentFilter, gridPage, paginationItems, searchQuery, currentMoviesOnPage,
    totalPages,
    heroMovie
  });

  stateRef.current = {
    activeRow, activeCol, lastActiveRow, lastActiveCol, selectedMovie, activeTab,
    categories, isGridMode, isSearchMode, gridMovies, gridColumns, currentGridRows,
    NAV_ITEMS, currentFilter, gridPage, paginationItems, searchQuery, currentMoviesOnPage,
    totalPages,
    heroMovie
  };


  const handleViewMore = (categoryTitle) => {
      rowRefMap.current = {};
      let targetTab = 'movies';
      let targetFilter = 'ทั้งหมด';
      let startRow = 0; 


      if (categoryTitle === 'ภาพยนตร์ล่าสุด') {
          targetTab = 'movies';
          targetFilter = 'ภาพยนตร์';
          startRow = 0; 
      } else if (categoryTitle === 'ซีรีส์ล่าสุด') {
          targetTab = 'movies';
          targetFilter = 'ซีรีส์';
          startRow = 0;
      } else if (categoryTitle === 'สายวายต้องฟิน') {
          targetTab = 'y_content';
          startRow = -1; 
      } else if (categoryTitle === 'เอาใจสายเกา') {
          targetTab = 'k_content';
          startRow = -1; 
      }


      setActiveTab(targetTab);
      setCurrentFilter(targetFilter);
      setLastActiveRow(-1);
      setGridPage(1);
      // Stabilize layout before focusing grid
      try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch {}

      setTimeout(() => {
         setActiveRow(startRow); 
         setActiveCol(0);
         if (startRow === -1) {
            window.scrollTo(0, 0);
         }
         // Extra: explicitly center the first card after focus is set
         let tries = 0;
         const max = 30;
         const center = () => {
           const el = rowRefMap.current[startRow]?.[0];
           if (el) {
             try { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
             catch {
               try {
                 const rect = el.getBoundingClientRect();
                 const top = rect.top + window.scrollY;
                 const off = window.innerHeight / 2 - (rect.height / 2);
                 window.scrollTo({ top: top - off, behavior: 'smooth' });
               } catch {}
             }
           } else if (tries < max) {
             tries += 1;
             setTimeout(center, 50);
           }
         };
         setTimeout(center, 120);
      }, 160); 
  };


  const handleFilterSelect = (filterName) => {
      rowRefMap.current = {};
      setCurrentFilter(filterName);
      setGridPage(1);
      setActiveRow(0);
      setActiveCol(0);
      setLastActiveRow(-1);
  };


  const handleNavbarSelect = (tabId) => {
      rowRefMap.current = {};
      setActiveTab(tabId);
      // suppress accidental follow-up actions briefly after tab switch
      actionSuppressUntil.current = Date.now() + 350;
      let startRow = -1;
      
      if (tabId === 'movies') {
        setCurrentFilter('ทั้งหมด');
        setGridPage(1);
      }
      
      setActiveRow(startRow);
      setLastActiveRow(-1);
      setActiveCol(0);
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      const { selectedMovie } = stateRef.current;
      if (selectedMovie) {
        return;
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); }
      // TV remote Back normalization (Tizen/WebOS/Android TV)
      const isTvBackKey = (e.key === 'Back' || e.key === 'GoBack' || e.key === 'BrowserBack' || e.key === 'XF86Back' || e.key === 'HistoryBack');
      const isTvBackCode = (e.keyCode === 10009 || e.keyCode === 461);
      if (isTvBackKey || isTvBackCode) {
        e.preventDefault();
        const {
          activeRow: currentActiveRow, activeCol: currentActiveCol, activeTab,
          lastActiveRow, lastActiveCol, NAV_ITEMS
        } = stateRef.current;
        if (currentActiveRow !== -2) {
          const activeIdx = NAV_ITEMS.findIndex(item => item.id === activeTab);
          let target = 0; if (target === activeIdx) target = 1;
          setLastActiveRow(currentActiveRow);
          setLastActiveCol(currentActiveCol);
          setActiveRow(-2);
          setActiveCol(target);
        }
        return;
      }

      const now = Date.now();
      if (now - lastInputTime.current < 150) return;
      lastInputTime.current = now;


      const {
        activeRow: currentActiveRow, activeCol: currentActiveCol, lastActiveRow, lastActiveCol, selectedMovie: currentSelectedMovie, activeTab, 
        categories, isGridMode: currentIsGridMode, isSearchMode, gridMovies, gridColumns, currentGridRows, 
        NAV_ITEMS, currentFilter, gridPage, paginationItems, currentMoviesOnPage
      } = stateRef.current;


      if (currentSelectedMovie) return;


      switch (e.key) {
        case 'ArrowUp':
          if (currentActiveRow === -1) { 
            setActiveRow(-2); 
            const activeIdx = NAV_ITEMS.findIndex(item => item.id === activeTab);
            let newCol = 0;
            if (newCol === activeIdx) newCol = 1;
            setActiveCol(newCol); setLastActiveRow(-1); 
          } else if (currentActiveRow === -2) {
          } else {
            setActiveRow(prev => prev - 1); 
            if(!currentIsGridMode && !isSearchMode) setActiveCol(0);
          }
          break;
        case 'ArrowDown':
          if (currentActiveRow === -2) { // From Navbar
            if (activeTab === 'account') return;
            if (isSearchMode) {
              setActiveRow(-3); // Go to unfocused search state
            } else if (lastActiveRow !== null && lastActiveRow !== -1) {
              setActiveRow(lastActiveRow);
              setActiveCol(lastActiveCol || 0);
            } else {
              setActiveRow(-1);
              setActiveCol(0);
            }
          } else if (isSearchMode) {
            if (currentActiveRow === -3) { // From unfocused search to search input
              setActiveRow(-1);
            } else if (currentActiveRow === -1) { // From search input to grid
              if (currentMoviesOnPage.length > 0) {
                setActiveRow(0);
                setActiveCol(0);
              }
            } else if (currentActiveRow < currentGridRows - 1) { // In grid
              setActiveRow(prev => prev + 1);
            }
          } else if (currentIsGridMode) {
            if (currentActiveRow === -1) {
              if (currentGridRows > 0) {
                setActiveRow(0);
                setActiveCol(0);
              }
            } else if (currentActiveRow < currentGridRows - 1) {
              setActiveRow(prev => prev + 1);
            } else if (currentActiveRow === currentGridRows - 1 && paginationItems.length > 0) {
              let target = 0;
              if (paginationItems[target].active) target++;
              if (target < paginationItems.length) { setActiveRow(currentGridRows); setActiveCol(target); }
            }
          } else { // Home screen rows
            if (currentActiveRow < categories.length) { setActiveRow(prev => prev + 1); setActiveCol(0); }
          }
          break;
        case 'ArrowLeft':
          if (currentActiveRow === -2) {
               const activeIdx = NAV_ITEMS.findIndex(item => item.id === activeTab);
               let target = currentActiveCol - 1;
               if (target === activeIdx) target--; 
               if (target >= 0) setActiveCol(target);
          } else if (currentIsGridMode && currentActiveRow === currentGridRows) {
               let target = currentActiveCol - 1;
               if (target >= 0 && paginationItems[target].active) target--;
               if (target >= 0) setActiveCol(target);
          } else {
               setActiveCol(prev => Math.max(0, prev - 1));
          }
          break;
        case 'ArrowRight':
           if (currentActiveRow === -2) {
             const activeIdx = NAV_ITEMS.findIndex(item => item.id === activeTab);
             let target = currentActiveCol + 1;
             if (target === activeIdx) target++;
             if (target < NAV_ITEMS.length) setActiveCol(target);
           } else if (currentIsGridMode || isSearchMode) {
             if (currentActiveRow === -1) { 
                if (currentIsGridMode) setActiveCol(prev => Math.min(2, prev + 1));
             } else if (currentActiveRow === 0 && !currentIsGridMode && !isSearchMode) { 
                setActiveCol(prev => Math.min(3, prev + 1)); 
             } else if (currentIsGridMode && currentActiveRow === currentGridRows) { 
                let target = currentActiveCol + 1;
                if (target < paginationItems.length && paginationItems[target].active) target++;
                if (target < paginationItems.length) setActiveCol(target);
             } else { 
                const isLastRow = currentActiveRow === currentGridRows - 1;
                const itemsInLastRow = currentMoviesOnPage.length % gridColumns || gridColumns;
                const maxCol = isLastRow ? itemsInLastRow - 1 : gridColumns - 1;
                setActiveCol(prev => Math.min(maxCol, prev + 1));
             }
           } else {
             if (currentActiveRow === -1) setActiveCol(prev => Math.min(1, prev + 1));
             else if (currentActiveRow === 0) setActiveCol(prev => Math.min(3, prev + 1));
             else {
                 const catIdx = currentActiveRow - 1;
                 const maxCol = Math.min(categories[catIdx].items.length, 5); 
                 setActiveCol(prev => Math.min(maxCol, prev + 1));
             }
           }
           break;
        case 'Enter':
          if (currentActiveRow === -2) {
             const selectedTab = NAV_ITEMS[currentActiveCol].id;
             if (activeTab !== selectedTab) { 
               handleNavbarSelect(selectedTab);
             }
          } else if (currentIsGridMode && currentActiveRow === -1) {
             const filters = ['ทั้งหมด', 'ภาพยนตร์', 'ซีรีส์'];
             if (filters[currentActiveCol]) { 
                 handleFilterSelect(filters[currentActiveCol]);
             }
          } else if (currentIsGridMode && currentActiveRow === currentGridRows) {
             const item = paginationItems[currentActiveCol];
             if (item) {
                 let newPage = gridPage;
                 if (item.type === 'page') newPage = item.page;
                 else if (item.type === 'prev') newPage = Math.max(1, gridPage - 1);
                 else if (item.type === 'next') newPage = Math.min(stateRef.current.totalPages || totalPages, gridPage + 1);
                 if (newPage !== gridPage) { setGridPage(newPage); setActiveRow(0); setActiveCol(0); rowRefMap.current = {}; }
             }
          } else {
             if (currentIsGridMode || isSearchMode) {
               if (currentActiveRow >= 0 && currentActiveRow < currentGridRows) {
                 const movieIndex = currentActiveRow * gridColumns + currentActiveCol;
                 if (currentMoviesOnPage[movieIndex]) setSelectedMovie(currentMoviesOnPage[movieIndex]);
               }
             } else {
               if (currentActiveRow === -1) { 
                 if (currentActiveCol === 0) {
                   if (Date.now() < actionSuppressUntil.current) break;
                   const hm = stateRef.current.heroMovie;
                   if (hm && hm.id && hm.id !== 'loading') setSelectedMovie(hm);
                 }
               } 
               else if (currentActiveRow === 0) {
                 // BrandRow selection
                 const col = currentActiveCol;
                 const map = {
                   0: 'brand_netflix',
                   1: 'brand_disney',
                   2: 'brand_hbo',
                   3: 'brand_marvel'
                 };
                 if (col in map) {
                   rowRefMap.current = {};
                   setActiveTab(map[col]);
                   setGridPage(1);
                   setActiveRow(-1);
                   setActiveCol(0);
                   try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch {}
                 }
               }
               else {
                   const catIdx = currentActiveRow - 1;
                   const limited = categories[catIdx].items.slice(0, 5);
                   if (currentActiveCol < limited.length) setSelectedMovie(limited[currentActiveCol]);
                   else if (currentActiveCol === limited.length) handleViewMore(categories[catIdx].title);
               }
             }
          }
          break;
        case 'Backspace':
        case 'Escape':
           if (currentActiveRow !== -2) {
             const activeIdx = NAV_ITEMS.findIndex(item => item.id === activeTab);
             let target = 0;
             if (target === activeIdx) target = 1;
             setLastActiveRow(currentActiveRow);
             setLastActiveCol(currentActiveCol); // Save col
             setActiveRow(-2);
             setActiveCol(target);
           }
           break;
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    // Tizen hardware back event
    const handleTizenHwKey = (ev) => {
      if (ev && ev.keyName === 'back') {
        try { ev.preventDefault?.(); } catch {}
        const {
          activeRow: currentActiveRow, activeCol: currentActiveCol, activeTab,
          lastActiveRow, lastActiveCol, NAV_ITEMS
        } = stateRef.current;
        if (currentActiveRow !== -2) {
          const activeIdx = NAV_ITEMS.findIndex(item => item.id === activeTab);
          let target = 0; if (target === activeIdx) target = 1;
          setLastActiveRow(currentActiveRow);
          setLastActiveCol(currentActiveCol);
          setActiveRow(-2);
          setActiveCol(target);
        }
      }
    };
    window.addEventListener('tizenhwkey', handleTizenHwKey, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('tizenhwkey', handleTizenHwKey);
    };
  }, []);

  // Disable mouse/touch interactions globally (remote-only)
  useEffect(() => {
    if (activeRow === -1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeRow >= 0) { 
      // Grid focus scrolling logic
      let attempts = 0;
      const maxAttempts = 30;
      const tryScroll = () => {
        const targetEl = rowRefMap.current[activeRow]?.[activeCol] || rowRefMap.current[activeRow]?.[0];
        if (targetEl) {
          try {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } catch {
            const elementRect = targetEl.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.scrollY;
            const offset = window.innerHeight / 2 - (elementRect.height / 2);
            window.scrollTo({ top: absoluteElementTop - offset, behavior: 'smooth' });
          }
        } else if (attempts < maxAttempts) {
          attempts += 1;
          setTimeout(tryScroll, 50);
        }
      };
      setTimeout(tryScroll, 100);
    }
  }, [activeRow, activeCol, isGridMode, currentMoviesOnPage, gridPage]);


  const renderContent = () => {
    if (activeTab === 'search') {
       return (
         <SearchScreen 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            activeRow={activeRow}
            activeCol={activeCol}
            onMovieClick={setSelectedMovie}
            rowRefMap={rowRefMap}
         />
       );
    }
    if (activeTab === 'account') return <AccountScreen />;
    if (isGridMode) {
      let pageTitle = 'ภาพยนตร์/ซีรีส์';
      let pageSubtitle = 'Movies/Series';
      let showFilters = true;
      let titleStyle = { fontSize: '3.5vw', color: 'white', fontFamily: 'Foxgraphie, sans-serif' }; 
      let coverImage = 'http://moviifox.x10.mx/aset/netflixpage.webp';


      if (activeTab === 'y_content') { 
        pageTitle = 'สายวายต้องฟิน'; 
        pageSubtitle = 'Boy love/Yaoi';
        showFilters = false; 
        coverImage = 'http://moviifox.x10.mx/aset/ypage.webp';
      } 
      else if (activeTab === 'k_content') { 
        pageTitle = 'เอาใจสายเกา'; 
        pageSubtitle = 'Korean movies/series';
        showFilters = false; 
        coverImage = 'http://moviifox.x10.mx/aset/koreapage.webp';
      }
      else if (activeTab === 'festival') { 
        pageTitle = 'ฮาโลวีน'; //แก้ชื่อหน้า festival ตรงนี้
        pageSubtitle = 'Halloween';
        showFilters = false; 
        titleStyle = {
            fontSize: '3.5vw', 
            color: 'white', 
            fontFamily: 'Foxgraphie, sans-serif'
        };
        coverImage = 'http://moviifox.x10.mx/aset/festivalpage.webp';//แก้รูปปกหน้า festival ตรงนี้
      }
      else if (activeTab === 'brand_netflix') {
        pageTitle = 'เน็ตฟลิก';
        pageSubtitle = 'Netflix';
        showFilters = false;
        coverImage = 'http://moviifox.x10.mx/aset/netflixpage.webp';
      }
      else if (activeTab === 'brand_disney') {
        pageTitle = 'ดิสนีย์พลัส';
        pageSubtitle = 'Disney+';
        showFilters = false;
        coverImage = 'http://moviifox.x10.mx/aset/disneypage.webp';
      }
      else if (activeTab === 'brand_hbo') {
        pageTitle = 'เอชบีโอ ออริจินัล';
        pageSubtitle = 'HBO Original';
        showFilters = false;
        coverImage = 'http://moviifox.x10.mx/aset/hbopage.webp';
      }
      else if (activeTab === 'brand_marvel') {
        pageTitle = 'มาร์เวล';
        pageSubtitle = 'Marvel';
        showFilters = false;
        coverImage = 'http://moviifox.x10.mx/aset/marvelpage.webp';
      }


      return <GridPage 
            movies={gridMovies} 
            activeRow={activeRow} 
            activeCol={activeCol} 
            onMovieClick={setSelectedMovie} 
            rowRefMap={rowRefMap} 
            currentFilter={currentFilter} 
            currentPage={gridPage} 
            onPageChange={(p) => { setGridPage(p); setActiveRow(0); setActiveCol(0); rowRefMap.current = {}; }} 
            gridColumns={gridColumns} 
            paginationItems={paginationItems} 
            pageTitle={pageTitle} 
            pageSubtitle={pageSubtitle} 
            showFilters={showFilters} 
            titleStyle={titleStyle} 
            onFilterChange={handleFilterSelect} 
            coverImage={coverImage}
      />;
    }


    return (
      <main className="relative z-10">
        <Hero 
          movie={heroMovie} 
          isFocused={activeRow === -1} 
          activeBtnIndex={activeCol} 
          onPlay={() => { if (Date.now() < actionSuppressUntil.current) return; setSelectedMovie(heroMovie); }} 
        />
        <div className="relative mt-[-2vw]">
          <BrandRow activeRow={activeRow} activeCol={activeCol} rowIndex={0} rowRefMap={rowRefMap} />
        </div>
        <div className="relative pb-[10vw] mt-[2vw]">
          {categories.length > 0 ? categories.map((category, idx) => (
            <Row key={category.id} rowIndex={idx + 1} title={category.title} items={category.items} activeRow={activeRow} activeCol={activeCol} onMovieClick={setSelectedMovie} onViewMore={handleViewMore} rowRefMap={rowRefMap} />
          )) : <div className="text-white text-center py-[10vw] text-[2vw] opacity-50">กำลังโหลด...</div>}
        </div>
      </main>
    );
  };


  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-white selection:text-black pointer-events-none">
      <Navbar isFocused={activeRow === -2} activeNavIndex={activeCol} activeTab={activeTab} onSelect={handleNavbarSelect} />
      {renderContent()}
      {selectedMovie && <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      <style>{`
        @font-face { font-family: 'Foxgraphie'; src: url('https://raw.githubusercontent.com/Moviifox/trailer/refs/heads/main/foxgraphie_light.otf'); font-weight: 300; }
        @font-face { font-family: 'Foxgraphie'; src: url('https://raw.githubusercontent.com/Moviifox/trailer/refs/heads/main/foxgraphie_regular.otf'); font-weight: 400; }
        @font-face { font-family: 'Foxgraphie'; src: url('https://raw.githubusercontent.com/Moviifox/trailer/refs/heads/main/foxgraphie_semibold.otf'); font-weight: 600; }
        :root { --font-primary: 'Foxgraphie', sans-serif; }
        body { font-family: 'Foxgraphie', sans-serif !important; letter-spacing: 0.025em; cursor: none !important; }
        .font-sans { font-family: 'Foxgraphie', sans-serif !important; }
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-pulse-slow { animation: pulse-slow 8s infinite cubic-bezier(0.4, 0, 0.6, 1); }
        .animate-pan-zoom { animation: pan-zoom 60s infinite alternate linear; }
        .animate-modal-pop { animation: modal-pop 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.1); } }
        @keyframes pan-zoom { 0% { transform: scale(1.1); } 100% { transform: scale(1.2) translate(-20px, -10px); } }
        @keyframes modal-pop { 0% { opacity: 0; transform: scale(0.9) translateY(40px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        /* Add marquee keyframes */
        @keyframes marquee {
          0% { transform: translateX(0); }
          20% { transform: translateX(0); }
          80% { transform: translateX(-50%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
        /* Multi-line clamp without Tailwind plugin */
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-6 { display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}
