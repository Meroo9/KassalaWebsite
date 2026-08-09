import fallbackData from "../data/fallbackData.json";

// LocalStorage Keys
const KEYS = {
  SERVICES: "kassala_custom_services",
  COLLEGES: "kassala_custom_colleges",
  NEWS: "kassala_custom_news",
  GALLERY: "kassala_custom_gallery",
  HERO: "kassala_custom_hero",
  RECTOR: "kassala_custom_rector",
  CONTACT: "kassala_custom_contact",
  RESEARCH: "kassala_custom_research",
  THEME: "kassala_theme_config"
};

const isClient = typeof window !== "undefined";

/**
 * Load safe JSON data from localStorage on client, or return default
 */
function loadData(key, defaultValue) {
  if (!isClient) return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (e) {
    console.error(`Error loading key ${key}`, e);
    return defaultValue;
  }
}

/**
 * Save data to localStorage on client
 */
function saveData(key, value) {
  if (!isClient) return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`Error saving key ${key}`, e);
    return false;
  }
}

export const contentService = {
  // ----------------------------------------------------
  // 1. Theme and Appearance Settings
  // ----------------------------------------------------
  getThemeSettings() {
    const defaultTheme = {
      primaryColor: "#0d5c34", // Emerald Green
      primaryDark: "#053b1e", // Dark Void Green
      accentColor: "#e9c349", // Stitch Gold
      fontFamily: "Tajawal", // Stitch Headline Font
      glowOrbs: true,
      cardGlow: true
    };
    return loadData(KEYS.THEME, defaultTheme);
  },

  saveThemeSettings(settings) {
    const success = saveData(KEYS.THEME, settings);
    if (success && isClient) {
      // Dispatch storage event to notify other tabs/components
      window.dispatchEvent(new Event("storage"));
    }
    return success;
  },

  // ----------------------------------------------------
  // 2. Hero Slider Settings
  // ----------------------------------------------------
  getHeroSettings() {
    const defaultHero = {
      titleAr: "جامعة كسلا",
      titleEn: "University of Kassala",
      subtitleAr: "منارة المعرفة، البحث العلمي والتنمية المستدامة في شرق السودان",
      subtitleEn: "Beacon of Knowledge, Scientific Research and Sustainable Development in Eastern Sudan",
      ctaAr: "القبول والتسجيل",
      ctaEn: "Admissions",
      images: [
        "https://kassalauni.edu.sd/nw/wp-content/uploads/2019/10/DSC00314.jpg",
        "https://kassalauni.edu.sd/nw/wp-content/uploads/2026/07/731674235_2787464318293126_3654465864040771624_n-1024x768.jpg",
        "https://kassalauni.edu.sd/nw/wp-content/uploads/2026/07/733095703_2245592242882652_6549622429077855227_n-1024x768.jpg"
      ]
    };
    return loadData(KEYS.HERO, defaultHero);
  },

  saveHeroSettings(settings) {
    return saveData(KEYS.HERO, settings);
  },

  // ----------------------------------------------------
  // 3. Rector Speech Settings
  // ----------------------------------------------------
  getRectorSettings() {
    const defaultRector = {
      nameAr: "أ.د. أماني عبدالمعروف بشير",
      nameEn: "Prof. Amani Abdelmarouf Bashir",
      roleAr: "مديرة الجامعة",
      roleEn: "Rector of the University",
      speechAr: "مرحباً بكم في رحاب جامعة كسلا. نسعى جاهدين لتقديم بيئة تعليمية متميزة تواكب التحول الرقمي وتسهم في تمكين الطلاب والباحثين لتحقيق الريادة العلمية وخدمة التنمية المحلية والإقليمية.",
      speechEn: "Welcome to the University of Kassala. We strive to provide an outstanding educational environment that embraces digital transformation, enabling students and researchers to achieve leadership and support sustainable development.",
      image: "https://kassalauni.edu.sd/nw/wp-content/uploads/2026/07/730487604_1462071155961397_1557412588719809173_n-360x240.jpg"
    };
    return loadData(KEYS.RECTOR, defaultRector);
  },

  saveRectorSettings(settings) {
    return saveData(KEYS.RECTOR, settings);
  },

  // ----------------------------------------------------
  // 4. E-Services Registry (Full editing - defaults stored in storage)
  // ----------------------------------------------------
  getServices(tabId = "all") {
    const defaultServices = {
      students: [
        { id: "moodle", icon: "moodle", arTitle: "منصة التعليم الإلكتروني (Moodle)", enTitle: "E-Learning Platform (Moodle)", arDesc: "الوصول للمحاضرات الرقمية والاختبارات والمناهج التعليمية عبر الإنترنت.", enDesc: "Access digital lectures, online exams, and study materials.", link: "http://e-learn.kassalauni.edu.sd/" },
        { id: "portal", icon: "portal", arTitle: "بوابة الطالب الإلكترونية", enTitle: "Student Academic Portal", arDesc: "التسجيل الأكاديمي، استخراج النتائج، وتتبع السجل الدراسي للطلاب.", enDesc: "Academic registration, transcript extraction, and grade checking.", link: "http://212.0.156.123/students/" },
        { id: "library", icon: "library", arTitle: "مستودع المكتبات الرقمية", enTitle: "Digital Library Repository", arDesc: "تصفح الكتب والمراجع والرسائل العلمية المتاحة إلكترونياً بالجامعة.", enDesc: "Browse university digital books, references, and theses.", link: "https://kassalauni.edu.sd/nw/library" },
        { id: "support", icon: "support", arTitle: "مركز الدعم الفني للطلاب", enTitle: "Student Tech Support Center", arDesc: "الإبلاغ عن المشاكل التقنية وتفعيل البريد الجامعي والحسابات.", enDesc: "Report technical issues, activate university email and accounts.", link: "/contact" }
      ],
      faculty: [
        { id: "affairs", icon: "affairs", arTitle: "بوابة الشؤون العلمية", enTitle: "Scientific Affairs Portal", arDesc: "تقديم الترقيات الأكاديمية، إدارة شؤون التدريس، والتقاويم العلمية.", enDesc: "Submit academic promotions, manage teaching, and research.", link: "https://kassalauni.edu.sd/nw/acadaffairs" },
        { id: "email", icon: "email", arTitle: "البريد الإلكتروني لأعضاء التدريس", enTitle: "Faculty Webmail System", arDesc: "خدمة البريد الجامعي الرسمي الآمن للتواصل الأكاديمي والإداري.", enDesc: "Official secure webmail system for academic communication.", link: "http://kassalauni.edu.sd/webmail" },
        { id: "library-f", icon: "library", arTitle: "مستودع المكتبات الرقمية", enTitle: "Digital Library Repository", arDesc: "تصفح الكتب والمراجع والرسائل العلمية المتاحة إلكترونياً بالجامعة.", enDesc: "Browse university digital books, references, and theses.", link: "https://kassalauni.edu.sd/nw/library" },
        { id: "moodle-f", icon: "moodle", arTitle: "منصة التعليم الإلكتروني (Moodle)", enTitle: "E-Learning Platform (Moodle)", arDesc: "الوصول للمحاضرات الرقمية والاختبارات والمناهج التعليمية عبر الإنترنت.", enDesc: "Access digital lectures, online exams, and study materials.", link: "http://e-learn.kassalauni.edu.sd/" }
      ],
      staff: [
        { id: "email-s", icon: "email", arTitle: "البريد الإلكتروني للموظفين", enTitle: "Staff Webmail System", arDesc: "البريد الإلكتروني الرسمي للمراسلات الإدارية والمعاملات الداخلية.", enDesc: "Official webmail system for administrative communications.", link: "http://kassalauni.edu.sd/webmail" },
        { id: "support-s", icon: "support", arTitle: "نظام الدعم الفني الإداري", enTitle: "Administrative IT Support", arDesc: "التبليغ عن أعطال الأجهزة والشبكات والصيانة الداخلية بالجامعة.", enDesc: "Report hardware and network failures to university IT support.", link: "/contact" }
      ],
      visitors: [
        { id: "admission", icon: "visitors", arTitle: "بوابة التقديم الإلكتروني", enTitle: "Online Admissions Portal", arDesc: "شروط القبول وخطوات التقديم الإلكتروني للطلاب السودانيين والوافدين.", enDesc: "Admission guidelines and online application for local/international students.", link: "/admissions" },
        { id: "gallery", icon: "visitors", arTitle: "معرض الفعاليات الرقمي", enTitle: "Digital Campus Gallery", arDesc: "تصفح فعاليات ومؤتمرات وحفلات تخرج الجامعة بالصور والفيديو.", enDesc: "Browse university events, conferences, and graduations in media.", link: "/gallery" }
      ]
    };

    // Initialize with defaults on first check so default items are fully editable
    if (isClient && !localStorage.getItem(KEYS.SERVICES)) {
      saveData(KEYS.SERVICES, defaultServices);
    }

    const services = loadData(KEYS.SERVICES, defaultServices);
    if (tabId === "all") return services;
    return services[tabId] || [];
  },

  saveServices(services) {
    return saveData(KEYS.SERVICES, services);
  },

  addService(category, service) {
    const services = this.getServices("all");
    if (!services[category]) services[category] = [];
    services[category].push(service);
    return this.saveServices(services);
  },

  updateService(category, updatedService) {
    const services = this.getServices("all");
    if (services[category]) {
      services[category] = services[category].map(s => s.id === updatedService.id ? updatedService : s);
      return this.saveServices(services);
    }
    return false;
  },

  deleteService(category, id) {
    const services = this.getServices("all");
    if (services[category]) {
      services[category] = services[category].filter(s => s.id !== id);
      return this.saveServices(services);
    }
    return false;
  },

  // ----------------------------------------------------
  // 5. Colleges Registry
  // ----------------------------------------------------
  getColleges(filterId = "all") {
    const defaultColleges = fallbackData.colleges;
    if (isClient && !localStorage.getItem(KEYS.COLLEGES)) {
      saveData(KEYS.COLLEGES, defaultColleges);
    }

    const colleges = loadData(KEYS.COLLEGES, defaultColleges);
    // Sync images from defaultColleges to ensure updated local images display
    const syncedColleges = colleges.map(col => {
      const matched = defaultColleges.find(d => d.id === col.id);
      return matched ? { ...col, image: matched.image } : col;
    });

    if (filterId === "all") return syncedColleges;
    return syncedColleges.filter(c => c.category === filterId);
  },

  saveColleges(colleges) {
    return saveData(KEYS.COLLEGES, colleges);
  },

  addCollege(college) {
    const colleges = this.getColleges("all");
    colleges.push(college);
    return this.saveColleges(colleges);
  },

  updateCollege(updatedCollege) {
    const colleges = this.getColleges("all");
    const newColleges = colleges.map(c => c.id === updatedCollege.id ? updatedCollege : c);
    return this.saveColleges(newColleges);
  },

  deleteCollege(id) {
    const colleges = this.getColleges("all");
    const filtered = colleges.filter(c => c.id !== id);
    return this.saveColleges(filtered);
  },

  // ----------------------------------------------------
  // 6. Scientific Research & Publications
  // ----------------------------------------------------
  getResearchData() {
    const defaultResearch = {
      journals: [
        { id: "qalzam", arTitle: "مجلة القلزم للدراسات الإسلامية والتربوية", enTitle: "Al-Qalzam Journal for Islamic & Educational Studies", arDesc: "مجلة علمية محكمة رائدة تصدر عن مركز دراسات السلام والتنمية بالجامعة تعنى بنشر البحوث المبتكرة.", enDesc: "A leading peer-reviewed journal publishing innovative research in Islamic and educational fields.", link: "https://kassalauni.edu.sd/nw/%d9%85%d8%ac%d9%84%d8%a9-%d8%a7%d9%84%d9%8ق%d9%84%d8%b2%d9%85/" },
        { id: "scientific", arTitle: "المجلة العلمية لجامعة كسلا (OJS)", enTitle: "Kassala University Scientific Journal (OJS)", arDesc: "المستودع الرقمي ونظام إدارة المجلات العلمية المحكمة للعلوم الطبية والهندسة والزراعة.", enDesc: "Digital repository and management system for medicine, engineering, and agricultural journals.", link: "http://kassalauni.edu.sd/nw/kassalaojs" }
      ],
      papers: [
        { id: "p1", arTitle: "تطوير مستشعرات بيئية ذكية لمراقبة تلوث مياه نهر القاش باستخدام إنترنت الأشياء", enTitle: "Development of Smart Sensors to Monitor Al-Gash River Water Pollution Using IoT", authors: "د. أحمد طه، أ. محمد علي (كلية الهندسة - 2026م)", link: "#" },
        { id: "p2", arTitle: "دراسة وبائية حول انتشار الملاريا المقاومة للأدوية في شرق السودان والحلول الجينية المقترحة", enTitle: "Epidemiological Study on Drug-Resistant Malaria in Eastern Sudan", authors: "بروفيسور أماني عبدالمعروف (كلية الطب - 2025م)", link: "#" }
      ]
    };

    if (isClient && !localStorage.getItem(KEYS.RESEARCH)) {
      saveData(KEYS.RESEARCH, defaultResearch);
    }
    return loadData(KEYS.RESEARCH, defaultResearch);
  },

  saveResearchData(data) {
    return saveData(KEYS.RESEARCH, data);
  },

  updateResearchPaper(updatedPaper) {
    const data = this.getResearchData();
    data.papers = data.papers.map(p => p.id === updatedPaper.id ? updatedPaper : p);
    return this.saveResearchData(data);
  },

  // ----------------------------------------------------
  // 7. News & Announcements Custom Updates
  // ----------------------------------------------------
  getNews() {
    const defaultNews = fallbackData.news;
    if (isClient && !localStorage.getItem(KEYS.NEWS)) {
      saveData(KEYS.NEWS, defaultNews);
    }
    return loadData(KEYS.NEWS, defaultNews);
  },

  saveNews(news) {
    return saveData(KEYS.NEWS, news);
  },

  addNewsItem(item) {
    const news = this.getNews();
    news.unshift(item);
    return this.saveNews(news);
  },

  updateNewsItem(updatedNews) {
    const news = this.getNews();
    const newNews = news.map(n => n.id === updatedNews.id ? updatedNews : n);
    return this.saveNews(newNews);
  },

  deleteNewsItem(id) {
    const news = this.getNews();
    const filtered = news.filter(n => n.id !== id);
    return this.saveNews(filtered);
  },

  // ----------------------------------------------------
  // 8. Gallery Media Settings
  // ----------------------------------------------------
  getGallery() {
    const defaultGallery = fallbackData.gallery;
    if (isClient && !localStorage.getItem(KEYS.GALLERY)) {
      saveData(KEYS.GALLERY, defaultGallery);
    }
    return loadData(KEYS.GALLERY, defaultGallery);
  },

  saveGallery(gallery) {
    return saveData(KEYS.GALLERY, gallery);
  },

  addGalleryItem(item) {
    const gallery = this.getGallery();
    gallery.push(item);
    return this.saveGallery(gallery);
  },

  updateGalleryItem(updatedGallery) {
    const gallery = this.getGallery();
    const newGallery = gallery.map(g => g.id === updatedGallery.id ? updatedGallery : g);
    return this.saveGallery(newGallery);
  },

  deleteGalleryItem(id) {
    const gallery = this.getGallery();
    const filtered = gallery.filter(g => g.id !== id);
    return this.saveGallery(filtered);
  },

  // ----------------------------------------------------
  // 9. Contact Info Settings
  // ----------------------------------------------------
  getContactSettings() {
    const defaultContact = {
      addressAr: "رئاسة الجامعة، مدينة كسلا، ولاية كسلا، السودان",
      addressEn: "University Presidency, Kassala City, Kassala State, Sudan",
      phone: "+249822075",
      email: "info@kassalauni.edu.sd",
      mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.540139989069!2d36.39801861517726!3d15.457813989260177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x166ef58100000001%3A0xe103ee660f54070a!2sUniversity%20of%20Kassala!5e0!3m2!1sen!2ssd!4v1650000000000!5m2!1sen!2ssd"
    };
    return loadData(KEYS.CONTACT, defaultContact);
  },

  saveContactSettings(settings) {
    return saveData(KEYS.CONTACT, settings);
  },

  // ----------------------------------------------------
  // Global Site Search across Services, Colleges, News, and Research
  // ----------------------------------------------------
  searchSite(query) {
    if (!query || !query.trim()) return { services: [], colleges: [], news: [], research: [] };
    const q = query.trim().toLowerCase();

    // 1. Services
    const allServices = [
      ...this.getServices("students"),
      ...this.getServices("faculty"),
      ...this.getServices("staff"),
      ...this.getServices("visitors")
    ];
    const uniqueServices = Array.from(new Map(allServices.map(s => [s.id, s])).values());
    const matchedServices = uniqueServices.filter(s => {
      const title = (s.arTitle || "") + " " + (s.enTitle || "");
      const desc = (s.arDesc || "") + " " + (s.enDesc || "");
      return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
    });

    // 2. Colleges
    const colleges = this.getColleges("all");
    const matchedColleges = colleges.filter(c => {
      const name = (c.arName || "") + " " + (c.enName || "");
      const desc = (c.arDesc || "") + " " + (c.enDesc || "");
      return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
    });

    // 3. News
    const news = this.getNews();
    const matchedNews = news.filter(n => {
      const title = (n.arTitle || "") + " " + (n.enTitle || "");
      const excerpt = (n.arExcerpt || "") + " " + (n.enExcerpt || "");
      return title.toLowerCase().includes(q) || excerpt.toLowerCase().includes(q);
    });

    // 4. Research (Al-Qalzam Issues)
    const qalzamIssues = [
      { num: 1, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 1 - العلوم الإنسانية", enSub: "Issue 1 - Humanities", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
      { num: 2, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 2 - الدراسات التربوية", enSub: "Issue 2 - Educational Studies", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
      { num: 3, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 3 - العلوم الاقتصادية", enSub: "Issue 3 - Economics", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
      { num: 4, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 4 - العلوم التطبيقية والزراعية", enSub: "Issue 4 - Applied & Agricultural Sciences", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
      { num: 5, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 5 - الأبحاث الطبية والصحية", enSub: "Issue 5 - Medical & Health Research", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
      { num: 6, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 6 - الدراسات القانونية", enSub: "Issue 6 - Legal Studies", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
      { num: 7, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 7 - الهندسة والتقنية", enSub: "Issue 7 - Engineering & Tech", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
      { num: 8, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 8 - العلوم الأساسية", enSub: "Issue 8 - Basic Sciences", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
      { num: 9, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 9 - أبحاث التنمية المستدامة", enSub: "Issue 9 - Sustainable Dev", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
      { num: 10, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 10 - المجلد الخاص بالابتكار", enSub: "Issue 10 - Innovation Special", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" }
    ];
    const matchedResearch = qalzamIssues.filter(r => {
      const text = (r.arSub + " " + r.enSub + " " + r.arName).toLowerCase();
      return text.includes(q);
    });

    return {
      services: matchedServices,
      colleges: matchedColleges,
      news: matchedNews,
      research: matchedResearch
    };
  },

  // ----------------------------------------------------
  // Reset Configs
  // ----------------------------------------------------
  resetAll() {
    if (!isClient) return;
    Object.values(KEYS).forEach(k => {
      localStorage.removeItem(k);
    });
  }
};
