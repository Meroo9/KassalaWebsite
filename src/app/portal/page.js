"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { contentService } from "../../services/contentService";
import { sanitizeInput, sanitizeImageUrl } from "../../utils/security";
import styles from "./admin.module.css";

export default function AdminDashboard() {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState("theme"); // theme | hero | rector | services | colleges | news | research | gallery | contact
  const [statusMessage, setStatusMessage] = useState("");

  // Editing Item Tracking
  const [editingId, setEditingId] = useState(null); // stores the ID of the item being edited

  // Config States
  const [themeForm, setThemeForm] = useState({ primaryColor: "#0d5c34", primaryDark: "#073a20", accentColor: "#d4af37", fontFamily: "Cairo", glowOrbs: true, cardGlow: true });
  const [heroForm, setHeroForm] = useState({ titleAr: "", titleEn: "", subtitleAr: "", subtitleEn: "", ctaAr: "", ctaEn: "", img1: "", img2: "", img3: "" });
  const [rectorForm, setRectorForm] = useState({ nameAr: "", nameEn: "", roleAr: "", roleEn: "", speechAr: "", speechEn: "", image: "" });
  const [contactForm, setContactForm] = useState({ addressAr: "", addressEn: "", phone: "", email: "", mapsUrl: "" });
  
  // Registries Lists
  const [servicesList, setServicesList] = useState({ students: [], faculty: [], staff: [], visitors: [] });
  const [collegesList, setCollegesList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [papersList, setPapersList] = useState([]);

  // Category Selection Lists
  const [collegeCategories, setCollegeCategories] = useState(["medical", "engineering", "humanities"]);
  const [galleryCategories, setGalleryCategories] = useState(["campus", "events", "graduations"]);

  // Custom Category Creation toggles
  const [showNewColCat, setShowNewColCat] = useState(false);
  const [newColCat, setNewColCat] = useState("");
  const [showNewGalCat, setShowNewGalCat] = useState(false);
  const [newGalCat, setNewGalCat] = useState("");

  // Form States - Create/Edit
  const [serviceForm, setServiceForm] = useState({ category: "students", icon: "moodle", arTitle: "", enTitle: "", arDesc: "", enDesc: "", link: "" });
  const [collegeForm, setCollegeForm] = useState({ category: "medical", arName: "", enName: "", arDesc: "", enDesc: "", image: "", link: "" });
  const [newsForm, setNewsForm] = useState({ arTitle: "", enTitle: "", arExcerpt: "", enExcerpt: "", image: "", date: "" });
  const [galleryForm, setGalleryForm] = useState({ category: "campus", image: "", arCaption: "", enCaption: "" });
  const [paperForm, setPaperForm] = useState({ arTitle: "", enTitle: "", authors: "", link: "" });

  const showStatus = (msg) => {
    setStatusMessage(msg);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setStatusMessage(""), 4000);
  };

  const handleFileUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(locale === "ar" ? "حجم الملف كبير جداً! الحد الأقصى 2 ميجابايت." : "File is too large! Maximum is 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadAllData = () => {
    // Theme
    setThemeForm(contentService.getThemeSettings());

    // Hero
    const hero = contentService.getHeroSettings();
    setHeroForm({
      titleAr: hero.titleAr,
      titleEn: hero.titleEn,
      subtitleAr: hero.subtitleAr,
      subtitleEn: hero.subtitleEn,
      ctaAr: hero.ctaAr || "",
      ctaEn: hero.ctaEn || "",
      img1: hero.images[0] || "",
      img2: hero.images[1] || "",
      img3: hero.images[2] || ""
    });

    // Rector
    setRectorForm(contentService.getRectorSettings());

    // Contact
    setContactForm(contentService.getContactSettings());

    // Services
    setServicesList(contentService.getServices("all"));

    // Colleges
    const colleges = contentService.getColleges("all");
    setCollegesList(colleges);
    const uniqueColCats = Array.from(new Set([...["medical", "engineering", "humanities"], ...colleges.map(c => c.category)]));
    setCollegeCategories(uniqueColCats);

    // News
    setNewsList(contentService.getNews());

    // Gallery
    const gallery = contentService.getGallery();
    setGalleryList(gallery);
    const uniqueGalCats = Array.from(new Set([...["campus", "events", "graduations"], ...gallery.map(g => g.category)]));
    setGalleryCategories(uniqueGalCats);

    // Research
    setPapersList(contentService.getResearchData().papers);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAllData();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save Settings Handlers
  const handleSaveTheme = (e) => {
    e.preventDefault();
    contentService.saveThemeSettings(themeForm);
    showStatus(locale === "ar" ? "✓ تم تطبيق وحفظ المظهر الجديد للموقع بالكامل." : "✓ Site theme settings updated successfully.");
  };

  const handleSaveHero = (e) => {
    e.preventDefault();
    const heroSettings = {
      titleAr: sanitizeInput(heroForm.titleAr),
      titleEn: sanitizeInput(heroForm.titleEn),
      subtitleAr: sanitizeInput(heroForm.subtitleAr),
      subtitleEn: sanitizeInput(heroForm.subtitleEn),
      ctaAr: sanitizeInput(heroForm.ctaAr),
      ctaEn: sanitizeInput(heroForm.ctaEn),
      images: [
        sanitizeImageUrl(heroForm.img1),
        sanitizeImageUrl(heroForm.img2),
        sanitizeImageUrl(heroForm.img3)
      ].filter(img => img.length > 0)
    };
    contentService.saveHeroSettings(heroSettings);
    showStatus(locale === "ar" ? "✓ تم حفظ إعدادات البانر الرئيسي بنجاح." : "✓ Hero settings saved.");
  };

  const handleSaveRector = (e) => {
    e.preventDefault();
    const rectorSettings = {
      nameAr: sanitizeInput(rectorForm.nameAr),
      nameEn: sanitizeInput(rectorForm.nameEn),
      roleAr: sanitizeInput(rectorForm.roleAr),
      roleEn: sanitizeInput(rectorForm.roleEn),
      speechAr: sanitizeInput(rectorForm.speechAr),
      speechEn: sanitizeInput(rectorForm.speechEn),
      image: sanitizeImageUrl(rectorForm.image)
    };
    contentService.saveRectorSettings(rectorSettings);
    showStatus(locale === "ar" ? "✓ تم حفظ كلمة مديرة الجامعة بنجاح." : "✓ Rector settings saved.");
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    const contactSettings = {
      addressAr: sanitizeInput(contactForm.addressAr),
      addressEn: sanitizeInput(contactForm.addressEn),
      phone: sanitizeInput(contactForm.phone),
      email: sanitizeInput(contactForm.email),
      mapsUrl: sanitizeInput(contactForm.mapsUrl)
    };
    contentService.saveContactSettings(contactSettings);
    showStatus(locale === "ar" ? "✓ تم حفظ بيانات الاتصال والخريطة بنجاح." : "✓ Contact settings saved.");
  };

  // Submit registries (Insert / Update)
  const handleSubmitService = (e) => {
    e.preventDefault();
    const item = {
      id: editingId || `custom_${Date.now()}`,
      icon: serviceForm.icon,
      arTitle: sanitizeInput(serviceForm.arTitle),
      enTitle: sanitizeInput(serviceForm.enTitle),
      arDesc: sanitizeInput(serviceForm.arDesc),
      enDesc: sanitizeInput(serviceForm.enDesc),
      link: sanitizeInput(serviceForm.link)
    };

    if (editingId) {
      contentService.updateService(serviceForm.category, item);
      showStatus(locale === "ar" ? "✓ تم تحديث الخدمة الرقمية بنجاح." : "✓ Digital service updated.");
      setEditingId(null);
    } else {
      contentService.addService(serviceForm.category, item);
      showStatus(locale === "ar" ? "✓ تم إضافة الخدمة الرقمية بنجاح." : "✓ Digital service added.");
    }
    setServiceForm({ category: "students", icon: "moodle", arTitle: "", enTitle: "", arDesc: "", enDesc: "", link: "" });
    loadAllData();
  };

  const handleSubmitCollege = (e) => {
    e.preventDefault();
    const categoryToUse = showNewColCat ? sanitizeInput(newColCat).trim() : collegeForm.category;

    if (!categoryToUse) {
      alert(locale === "ar" ? "الرجاء كتابة أو اختيار تصنيف الكلية." : "Please define a category.");
      return;
    }

    const item = {
      id: editingId || `custom_col_${Date.now()}`,
      category: categoryToUse,
      arName: sanitizeInput(collegeForm.arName),
      enName: sanitizeInput(collegeForm.enName),
      arDesc: sanitizeInput(collegeForm.arDesc),
      enDesc: sanitizeInput(collegeForm.enDesc),
      image: sanitizeImageUrl(collegeForm.image) || "https://kassalauni.edu.sd/nw/wp-content/uploads/2026/07/731674235_2787464318293126_3654465864040771624_n-1024x768.jpg",
      link: sanitizeInput(collegeForm.link)
    };

    if (editingId) {
      contentService.updateCollege(item);
      showStatus(locale === "ar" ? "✓ تم تحديث بيانات الكلية بنجاح." : "✓ College updated.");
      setEditingId(null);
    } else {
      contentService.addCollege(item);
      showStatus(locale === "ar" ? "✓ تم إضافة الكلية بنجاح." : "✓ College added.");
    }

    setCollegeForm({ category: "medical", arName: "", enName: "", arDesc: "", enDesc: "", image: "", link: "" });
    setNewColCat("");
    setShowNewColCat(false);
    loadAllData();
  };

  const handleSubmitNews = (e) => {
    e.preventDefault();
    const item = {
      id: editingId || `custom_news_${Date.now()}`,
      date: sanitizeInput(newsForm.date) || new Date().toISOString().split('T')[0],
      arTitle: sanitizeInput(newsForm.arTitle),
      enTitle: sanitizeInput(newsForm.enTitle),
      arExcerpt: sanitizeInput(newsForm.arExcerpt),
      enExcerpt: sanitizeInput(newsForm.enExcerpt),
      image: sanitizeImageUrl(newsForm.image) || "https://kassalauni.edu.sd/nw/wp-content/uploads/2026/07/731674235_2787464318293126_3654465864040771624_n-1024x768.jpg",
      link: "/news"
    };

    if (editingId) {
      contentService.updateNewsItem(item);
      showStatus(locale === "ar" ? "✓ تم تحديث الخبر بنجاح." : "✓ News item updated.");
      setEditingId(null);
    } else {
      contentService.addNewsItem(item);
      showStatus(locale === "ar" ? "✓ تم نشر الخبر بنجاح." : "✓ News item published.");
    }

    setNewsForm({ arTitle: "", enTitle: "", arExcerpt: "", enExcerpt: "", image: "", date: "" });
    loadAllData();
  };

  const handleSubmitGallery = (e) => {
    e.preventDefault();
    const categoryToUse = showNewGalCat ? sanitizeInput(newGalCat).trim() : galleryForm.category;

    if (!categoryToUse) {
      alert(locale === "ar" ? "الرجاء كتابة أو اختيار تصنيف المعرض." : "Please define a category.");
      return;
    }

    const item = {
      id: editingId || `custom_gal_${Date.now()}`,
      category: categoryToUse,
      image: sanitizeImageUrl(galleryForm.image) || "https://kassalauni.edu.sd/nw/wp-content/uploads/2026/07/731674235_2787464318293126_3654465864040771624_n-1024x768.jpg",
      arCaption: sanitizeInput(galleryForm.arCaption),
      enCaption: sanitizeInput(galleryForm.enCaption)
    };

    if (editingId) {
      contentService.updateGalleryItem(item);
      showStatus(locale === "ar" ? "✓ تم تحديث ميديا المعرض بنجاح." : "✓ Gallery item updated.");
      setEditingId(null);
    } else {
      contentService.addGalleryItem(item);
      showStatus(locale === "ar" ? "✓ تم إضافة ميديا المعرض بنجاح." : "✓ Gallery item added.");
    }

    setGalleryForm({ category: "campus", image: "", arCaption: "", enCaption: "" });
    setNewGalCat("");
    setShowNewGalCat(false);
    loadAllData();
  };

  const handleSubmitPaper = (e) => {
    e.preventDefault();
    const research = contentService.getResearchData();
    const item = {
      id: editingId || `custom_paper_${Date.now()}`,
      arTitle: sanitizeInput(paperForm.arTitle),
      enTitle: sanitizeInput(paperForm.enTitle),
      authors: sanitizeInput(paperForm.authors),
      link: sanitizeInput(paperForm.link) || "#"
    };

    if (editingId) {
      contentService.updateResearchPaper(item);
      showStatus(locale === "ar" ? "✓ تم تحديث ورقة البحث العلمي بنجاح." : "✓ Research paper updated.");
      setEditingId(null);
    } else {
      research.papers.unshift(item);
      contentService.saveResearchData(research);
      showStatus(locale === "ar" ? "✓ تم إضافة ورقة البحث العلمي بنجاح." : "✓ Research paper added.");
    }

    setPaperForm({ arTitle: "", enTitle: "", authors: "", link: "" });
    loadAllData();
  };

  // Edit Trigger Handlers
  const startEditService = (category, item) => {
    setEditingId(item.id);
    setServiceForm({
      category: category,
      icon: item.icon || "moodle",
      arTitle: item.arTitle || "",
      enTitle: item.enTitle || "",
      arDesc: item.arDesc || "",
      enDesc: item.enDesc || "",
      link: item.link || ""
    });
  };

  const startEditCollege = (item) => {
    setEditingId(item.id);
    setCollegeForm({
      category: item.category,
      arName: item.arName || "",
      enName: item.enName || "",
      arDesc: item.arDesc || "",
      enDesc: item.enDesc || "",
      image: item.image || "",
      link: item.link || ""
    });
    setShowNewColCat(false);
  };

  const startEditNews = (item) => {
    setEditingId(item.id);
    setNewsForm({
      arTitle: item.arTitle || "",
      enTitle: item.enTitle || "",
      arExcerpt: item.arExcerpt || "",
      enExcerpt: item.enExcerpt || "",
      image: item.image || "",
      date: item.date || ""
    });
  };

  const startEditGallery = (item) => {
    setEditingId(item.id);
    setGalleryForm({
      category: item.category,
      image: item.image || "",
      arCaption: item.arCaption || "",
      enCaption: item.enCaption || ""
    });
    setShowNewGalCat(false);
  };

  const startEditPaper = (item) => {
    setEditingId(item.id);
    setPaperForm({
      arTitle: item.arTitle || "",
      enTitle: item.enTitle || "",
      authors: item.authors || "",
      link: item.link || ""
    });
  };

  // Delete Action Handlers
  const handleDeleteService = (cat, id) => {
    if (confirm(locale === "ar" ? "هل تريد بالتأكيد حذف هذه الخدمة؟" : "Are you sure you want to delete this service?")) {
      contentService.deleteService(cat, id);
      loadAllData();
    }
  };

  const handleDeleteCollege = (id) => {
    if (confirm(locale === "ar" ? "هل تريد بالتأكيد حذف هذه الكلية؟" : "Are you sure you want to delete this college?")) {
      contentService.deleteCollege(id);
      loadAllData();
    }
  };

  const handleDeleteNews = (id) => {
    if (confirm(locale === "ar" ? "هل تريد بالتأكيد حذف هذا الخبر؟" : "Are you sure you want to delete this news post?")) {
      contentService.deleteNewsItem(id);
      loadAllData();
    }
  };

  const handleDeleteGallery = (id) => {
    if (confirm(locale === "ar" ? "هل تريد بالتأكيد حذف هذه الصورة من المعرض؟" : "Are you sure you want to delete this gallery item?")) {
      contentService.deleteGalleryItem(id);
      loadAllData();
    }
  };

  const handleDeletePaper = (id) => {
    if (confirm(locale === "ar" ? "هل تريد بالتأكيد حذف هذه الورقة البحثية؟" : "Are you sure you want to delete this research paper?")) {
      const research = contentService.getResearchData();
      research.papers = research.papers.filter(p => p.id !== id);
      contentService.saveResearchData(research);
      loadAllData();
    }
  };

  const handleResetAll = () => {
    if (confirm(locale === "ar" ? "هل تريد بالتأكيد إزالة كافة التعديلات واستعادة البيانات الافتراضية؟" : "Are you sure you want to revert all changes to default?")) {
      contentService.resetAll();
      showStatus(locale === "ar" ? "✓ تم استعادة إعدادات المصنع الافتراضية." : "✓ Defaults restored successfully.");
      loadAllData();
    }
  };

  const applyStitchTheme = () => {
    setThemeForm({
      primaryColor: "#0d5c34",
      primaryDark: "#053b1e",
      accentColor: "#d4af37",
      fontFamily: "Tajawal",
      glowOrbs: true,
      cardGlow: true
    });
    showStatus(locale === "ar" ? "✓ تم استيراد وتطبيق قيم ثيم Google Stitch الزمردي بنجاح." : "✓ Google Stitch Emerald Theme settings applied successfully.");
  };

  // Preset Colors for theme
  const primaryColorsPreset = [
    { name: locale === "ar" ? "أخضر كسلا الزمردي" : "Emerald Green", hex: "#0d5c34", dark: "#073a20" },
    { name: locale === "ar" ? "أزرق ياقوتي" : "Sapphire Blue", hex: "#1e3a8a", dark: "#172554" },
    { name: locale === "ar" ? "أحمر قرمزي دافئ" : "Crimson Red", hex: "#991b1b", dark: "#7f1d1d" },
    { name: locale === "ar" ? "بنفسجي ملكي" : "Royal Purple", hex: "#5b21b6", dark: "#4c1d95" },
    { name: locale === "ar" ? "فحمي كربوني" : "Carbon Gray", hex: "#1f2937", dark: "#111827" }
  ];

  const accentColorsPreset = [
    { name: locale === "ar" ? "ذهبي كلاسيكي" : "Classic Gold", hex: "#d4af37" },
    { name: locale === "ar" ? "سماوي مضيء" : "Cyber Cyan", hex: "#06b6d4" },
    { name: locale === "ar" ? "برتقالي متوهج" : "Vibrant Orange", hex: "#f97316" },
    { name: locale === "ar" ? "فضي ميتاليك" : "Metallic Silver", hex: "#9ca3af" }
  ];

  const availableIcons = [
    { id: "moodle", emoji: "🎓", label: locale === "ar" ? "منصة التعليم الإلكتروني" : "E-Learning Platform" },
    { id: "portal", emoji: "📋", label: locale === "ar" ? "بوابة الخدمات الإلكترونية" : "Student Portal" },
    { id: "library", emoji: "📚", label: locale === "ar" ? "المكتبة الرقمية" : "Digital Library" },
    { id: "support", emoji: "⚙️", label: locale === "ar" ? "الدعم الفني والتقني" : "Technical Support" },
    { id: "affairs", emoji: "📡", label: locale === "ar" ? "أمانة الشؤون العلمية" : "Scientific Affairs" },
    { id: "email", emoji: "✉️", label: locale === "ar" ? "البريد الإلكتروني الجامعي" : "University Email" },
    { id: "visitors", emoji: "🌐", label: locale === "ar" ? "خدمات الجمهور والزوار" : "Public Services" }
  ];

  const tabs = [
    { id: "theme", label: locale === "ar" ? "🎨 المظهر والنمط" : "Theme Style" },
    { id: "hero", label: locale === "ar" ? "🖼️ البانر الرئيسي" : "Hero Slider" },
    { id: "rector", label: locale === "ar" ? "✍️ كلمة المديرة" : "Rector Speech" },
    { id: "services", label: locale === "ar" ? "💻 الخدمات الرقمية" : "Services" },
    { id: "colleges", label: locale === "ar" ? "🏛️ الكليات والمراكز" : "Colleges" },
    { id: "news", label: locale === "ar" ? "📰 الأخبار والإعلانات" : "News" },
    { id: "research", label: locale === "ar" ? "🔬 البحوث والمنشورات" : "Research" },
    { id: "gallery", label: locale === "ar" ? "🖼️ المعرض الفني" : "Gallery" },
    { id: "contact", label: locale === "ar" ? "📞 بيانات الاتصال" : "Contact Settings" }
  ];

  return (
    <div style={{ flex: 1 }}>
      <section className="page-banner emerald-gold-gradient">
        <div className="container animate-fade-in">
          <h1>{locale === "ar" ? "لوحة الإدارة والتحكم الكاملة" : "Full CMS Admin Dashboard"}</h1>
          <p>{locale === "ar" ? "تعديل، حذف، إضافة وتخصيص المظهر وكافة تفاصيل محتوى الموقع بالكامل" : "Edit, delete, add and customize styling and content details of the entire website"}</p>
        </div>
      </section>

      <section className={styles.adminContainer}>
        <div className="container">
          <div className={styles.dashboardHeader}>
            <h2>{locale === "ar" ? "مركز التحكم بموقع جامعة كسلا" : "Kassala University CMS Portal"}</h2>
            <button onClick={handleResetAll} className={styles.resetBtn}>
              🔄 {locale === "ar" ? "إعادة ضبط المصنع" : "Reset All to Defaults"}
            </button>
          </div>

          {statusMessage && <div className={styles.statusMsg}>{statusMessage}</div>}

          {/* CMS Tabs Controls */}
          <div className={styles.tabControls} style={{ flexWrap: "wrap", gap: "6px", marginBottom: "30px" }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  setEditingId(null);
                  setShowNewColCat(false);
                  setShowNewGalCat(false);
                }}
                className={`${styles.tabBtn} ${activeTab === t.id ? styles.activeTabBtn : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className={styles.adminGrid}>

            {/* ---------------------------------------------------- */}
            {/* 1. THEME & APPEARANCE CUSTOMIZER                     */}
            {/* ---------------------------------------------------- */}
            {activeTab === "theme" && (
              <div className={styles.adminCard} style={{ gridColumn: "1 / -1" }}>
                <h3>🎨 {locale === "ar" ? "تخصيص المظهر والألوان ونمط الموقع" : "Customize Themes, Colors & Typography"}</h3>
                
                {/* Google Stitch Integration Button */}
                <div style={{ marginBottom: "25px", borderBottom: "1px solid var(--border-color)", paddingBottom: "20px" }}>
                  <button
                    type="button"
                    onClick={applyStitchTheme}
                    style={{
                      background: "linear-gradient(135deg, #0d5c34 0%, #111414 100%)",
                      color: "#e9c349",
                      border: "2px solid #e9c349",
                      padding: "12px 24px",
                      borderRadius: "30px",
                      cursor: "pointer",
                      fontWeight: "800",
                      fontSize: "0.95rem",
                      boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    🌟 {locale === "ar" ? "مزامنة واستيراد تصميم Google Stitch الزمردي" : "Sync & Import Google Stitch Emerald Design"}
                  </button>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "8px" }}>
                    {locale === "ar" 
                      ? "يقوم هذا الإجراء باستيراد وتطبيق نمط المظهر الزمردي المظلم المعتمد في مشروع Google Stitch (Kassala University Digital Rebrand)."
                      : "This imports and applies the dynamic dark emerald layout styles approved in the Google Stitch project."}
                  </p>
                </div>

                <form onSubmit={handleSaveTheme}>
                  
                  {/* Primary Color Customizer */}
                  <div style={{ marginBottom: "25px" }}>
                    <h4>🟢 {locale === "ar" ? "اللون الأساسي للموقع (Primary Theme Color)" : "Primary Theme Color"}</h4>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                      {primaryColorsPreset.map(col => (
                        <button
                          key={col.hex}
                          type="button"
                          onClick={() => setThemeForm({ ...themeForm, primaryColor: col.hex, primaryDark: col.dark })}
                          style={{
                            background: col.hex,
                            color: "#FFFFFF",
                            border: themeForm.primaryColor === col.hex ? "4px solid #D4AF37" : "1px solid #000000",
                            padding: "10px 16px",
                            borderRadius: "12px",
                            cursor: "pointer",
                            fontWeight: "700",
                            fontSize: "0.85rem"
                          }}
                        >
                          {col.name}
                        </button>
                      ))}
                    </div>
                    <div className={styles.formGroup} style={{ marginTop: "12px", width: "200px" }}>
                      <label>{locale === "ar" ? "اختيار لون مخصص:" : "Or Custom Hex Code:"}</label>
                      <input
                        type="color"
                        value={themeForm.primaryColor}
                        onChange={e => setThemeForm({ ...themeForm, primaryColor: e.target.value, primaryDark: e.target.value })}
                        style={{ height: "40px", width: "100%", cursor: "pointer" }}
                      />
                    </div>
                  </div>

                  {/* Accent Color Customizer */}
                  <div style={{ marginBottom: "25px" }}>
                    <h4>🟡 {locale === "ar" ? "اللون الثانوي المميز (Accent Color)" : "Accent Color"}</h4>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                      {accentColorsPreset.map(col => (
                        <button
                          key={col.hex}
                          type="button"
                          onClick={() => setThemeForm({ ...themeForm, accentColor: col.hex })}
                          style={{
                            background: col.hex,
                            color: "#000000",
                            border: themeForm.accentColor === col.hex ? "4px solid #0D5C34" : "1px solid #718096",
                            padding: "10px 16px",
                            borderRadius: "12px",
                            cursor: "pointer",
                            fontWeight: "700",
                            fontSize: "0.85rem"
                          }}
                        >
                          {col.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Typography Font Picker */}
                  <div className={styles.formGroup} style={{ marginBottom: "25px", width: "300px" }}>
                    <h4>✍️ {locale === "ar" ? "خط الكتابة العربي للموقع" : "Arabic Typography Font"}</h4>
                    <select
                      className={styles.selectField}
                      value={themeForm.fontFamily}
                      onChange={e => setThemeForm({ ...themeForm, fontFamily: e.target.value })}
                    >
                      <option value="Cairo">Cairo (خط هندسي حديث)</option>
                      <option value="Tajawal">Tajawal (خط مقروء وناعم)</option>
                      <option value="Almarai">Almarai (خط كتابي كلاسيكي)</option>
                    </select>
                  </div>

                  {/* Visual Style Toggles */}
                  <div style={{ marginBottom: "25px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className={styles.formGroup} style={{ flexDirection: "row", alignItems: "center", gap: "12px" }}>
                      <input
                        type="checkbox"
                        id="glowOrbs"
                        checked={themeForm.glowOrbs !== false}
                        onChange={e => setThemeForm({ ...themeForm, glowOrbs: e.target.checked })}
                        style={{ width: "22px", height: "22px", cursor: "pointer" }}
                      />
                      <label htmlFor="glowOrbs" style={{ cursor: "pointer" }}>
                        ✨ {locale === "ar" ? "تفعيل الكرات المضيئة الهلامية في الخلفية" : "Enable background glowing abstract orbs"}
                      </label>
                    </div>

                    <div className={styles.formGroup} style={{ flexDirection: "row", alignItems: "center", gap: "12px" }}>
                      <input
                        type="checkbox"
                        id="cardGlow"
                        checked={themeForm.cardGlow !== false}
                        onChange={e => setThemeForm({ ...themeForm, cardGlow: e.target.checked })}
                        style={{ width: "22px", height: "22px", cursor: "pointer" }}
                      />
                      <label htmlFor="cardGlow" style={{ cursor: "pointer" }}>
                        💡 {locale === "ar" ? "تفعيل توهج الحدود الذهبي التفاعلي للبطاقات عند التمرير" : "Enable golden glow outline hover on cards"}
                      </label>
                    </div>
                  </div>

                  <button type="submit" className={styles.submitBtn}>{locale === "ar" ? "حفظ المظهر وتثبيت التعديلات" : "Apply & Save Theme Styling"}</button>
                </form>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* HERO SLIDER EDITOR                                   */}
            {/* ---------------------------------------------------- */}
            {activeTab === "hero" && (
              <div className={styles.adminCard} style={{ gridColumn: "1 / -1" }}>
                <h3>🖼️ {locale === "ar" ? "إعدادات البانر الرئيسي والصور الدوارة" : "Hero Banner & Slider Config"}</h3>
                <form onSubmit={handleSaveHero}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "العنوان الرئيسي (العربية)" : "Title (AR)"}</label>
                      <input type="text" className={styles.inputField} value={heroForm.titleAr} onChange={e => setHeroForm({ ...heroForm, titleAr: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "العنوان الرئيسي (الإنجليزية)" : "Title (EN)"}</label>
                      <input type="text" className={styles.inputField} value={heroForm.titleEn} onChange={e => setHeroForm({ ...heroForm, titleEn: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "10px" }}>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "العنوان الفرعي (العربية)" : "Subtitle (AR)"}</label>
                      <textarea className={styles.textareaField} style={{ height: "80px" }} value={heroForm.subtitleAr} onChange={e => setHeroForm({ ...heroForm, subtitleAr: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "العنوان الفرعي (الإنجليزية)" : "Subtitle (EN)"}</label>
                      <textarea className={styles.textareaField} style={{ height: "80px" }} value={heroForm.subtitleEn} onChange={e => setHeroForm({ ...heroForm, subtitleEn: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "10px" }}>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "نص زر التوجيه (العربية)" : "CTA Button Text (AR)"}</label>
                      <input type="text" className={styles.inputField} value={heroForm.ctaAr} onChange={e => setHeroForm({ ...heroForm, ctaAr: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "نص زر التوجيه (الإنجليزية)" : "CTA Button Text (EN)"}</label>
                      <input type="text" className={styles.inputField} value={heroForm.ctaEn} onChange={e => setHeroForm({ ...heroForm, ctaEn: e.target.value })} />
                    </div>
                  </div>
                  
                  {/* Slider images with upload support */}
                  <div style={{ marginTop: "20px" }}>
                    <h4>🔗 {locale === "ar" ? "صور منزلق الخلفية (3 صور)" : "Slider Background Images (3 Links)"}</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginTop: "10px" }}>
                      <div className={styles.adminCard} style={{ background: "var(--platinum)" }}>
                        <div className={styles.formGroup}>
                          <label>{locale === "ar" ? "الصورة الأولى" : "Image 1"}</label>
                          <input type="text" className={styles.inputField} value={heroForm.img1} onChange={e => setHeroForm({ ...heroForm, img1: e.target.value })} placeholder="https://..." />
                          <label className={styles.fileUploadLabel}>
                            📁 {locale === "ar" ? "اختر صورة من جهازك" : "Upload Image"}
                            <input type="file" accept="image/*" onChange={e => handleFileUpload(e, base64 => setHeroForm({ ...heroForm, img1: base64 }))} />
                          </label>
                        </div>
                      </div>
                      <div className={styles.adminCard} style={{ background: "var(--platinum)" }}>
                        <div className={styles.formGroup}>
                          <label>{locale === "ar" ? "الصورة الثانية" : "Image 2"}</label>
                          <input type="text" className={styles.inputField} value={heroForm.img2} onChange={e => setHeroForm({ ...heroForm, img2: e.target.value })} placeholder="https://..." />
                          <label className={styles.fileUploadLabel}>
                            📁 {locale === "ar" ? "اختر صورة من جهازك" : "Upload Image"}
                            <input type="file" accept="image/*" onChange={e => handleFileUpload(e, base64 => setHeroForm({ ...heroForm, img2: base64 }))} />
                          </label>
                        </div>
                      </div>
                      <div className={styles.adminCard} style={{ background: "var(--platinum)" }}>
                        <div className={styles.formGroup}>
                          <label>{locale === "ar" ? "الصورة الثالثة" : "Image 3"}</label>
                          <input type="text" className={styles.inputField} value={heroForm.img3} onChange={e => setHeroForm({ ...heroForm, img3: e.target.value })} placeholder="https://..." />
                          <label className={styles.fileUploadLabel}>
                            📁 {locale === "ar" ? "اختر صورة من جهازك" : "Upload Image"}
                            <input type="file" accept="image/*" onChange={e => handleFileUpload(e, base64 => setHeroForm({ ...heroForm, img3: base64 }))} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button type="submit" className={styles.submitBtn}>{locale === "ar" ? "حفظ وتثبيت التعديلات" : "Save Changes"}</button>
                </form>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* RECTOR SPEECH EDITOR                                 */}
            {/* ---------------------------------------------------- */}
            {activeTab === "rector" && (
              <div className={styles.adminCard} style={{ gridColumn: "1 / -1" }}>
                <h3>✍️ {locale === "ar" ? "تعديل كلمة مديرة الجامعة" : "Edit Rector Speech & Info"}</h3>
                <form onSubmit={handleSaveRector}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "اسم المديرة (العربية)" : "Rector Name (AR)"}</label>
                      <input type="text" className={styles.inputField} value={rectorForm.nameAr} onChange={e => setRectorForm({ ...rectorForm, nameAr: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "اسم المديرة (الإنجليزية)" : "Rector Name (EN)"}</label>
                      <input type="text" className={styles.inputField} value={rectorForm.nameEn} onChange={e => setRectorForm({ ...rectorForm, nameEn: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "10px" }}>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "المسمى الوظيفي (العربية)" : "Role / Title (AR)"}</label>
                      <input type="text" className={styles.inputField} value={rectorForm.roleAr} onChange={e => setRectorForm({ ...rectorForm, roleAr: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "المسمى الوظيفي (الإنجليزية)" : "Role / Title (EN)"}</label>
                      <input type="text" className={styles.inputField} value={rectorForm.roleEn} onChange={e => setRectorForm({ ...rectorForm, roleEn: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "10px" }}>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "الكلمة الترحيبية (العربية)" : "Welcome Speech (AR)"}</label>
                      <textarea className={styles.textareaField} style={{ height: "120px" }} value={rectorForm.speechAr} onChange={e => setRectorForm({ ...rectorForm, speechAr: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "الكلمة الترحيبية (الإنجليزية)" : "Welcome Speech (EN)"}</label>
                      <textarea className={styles.textareaField} style={{ height: "120px" }} value={rectorForm.speechEn} onChange={e => setRectorForm({ ...rectorForm, speechEn: e.target.value })} />
                    </div>
                  </div>
                  <div className={styles.formGroup} style={{ marginTop: "15px", background: "var(--platinum)", padding: "15px", borderRadius: "12px" }}>
                    <label>{locale === "ar" ? "صورة مديرة الجامعة" : "Rector Photo (URL or File)"}</label>
                    <input type="text" autoComplete="off" className={styles.inputField} value={rectorForm.image} onChange={e => setRectorForm({ ...rectorForm, image: e.target.value })} placeholder="https://..." />
                    <label className={styles.fileUploadLabel} style={{ marginTop: "8px" }}>
                      📁 {locale === "ar" ? "اختر صورة من جهازك" : "Upload Image"}
                      <input type="file" accept="image/*" onChange={e => handleFileUpload(e, base64 => setRectorForm({ ...rectorForm, image: base64 }))} />
                    </label>
                  </div>
                  <button type="submit" className={styles.submitBtn}>{locale === "ar" ? "حفظ وتثبيت التعديلات" : "Save Changes"}</button>
                </form>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* SERVICES EDITOR                                      */}
            {/* ---------------------------------------------------- */}
            {activeTab === "services" && (
              <>
                <div className={styles.adminCard}>
                  <h3>{editingId ? `✏️ ${locale === "ar" ? "تعديل الخدمة الرقمية" : "Edit Service"}` : `➕ ${locale === "ar" ? "إضافة خدمة جديدة" : "Add Digital Service"}`}</h3>
                  <form onSubmit={handleSubmitService}>
                    <div className={styles.formGroup}>
                      <label>Category</label>
                      <select className={styles.selectField} value={serviceForm.category} onChange={e => setServiceForm({ ...serviceForm, category: e.target.value })} disabled={editingId !== null}>
                        <option value="students">Students / الطلاب</option>
                        <option value="faculty">Faculty / أعضاء التدريس</option>
                        <option value="staff">Staff / الموظفين</option>
                        <option value="visitors">Visitors / الجمهور والزوار</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "اختر أيقونة الخدمة المرئية" : "Select Visual Tech Icon"}</label>
                      <div className={styles.iconGrid}>
                        {availableIcons.map(icon => (
                          <div
                            key={icon.id}
                            onClick={() => setServiceForm({ ...serviceForm, icon: icon.id })}
                            className={`${styles.iconSelectCard} ${serviceForm.icon === icon.id ? styles.iconSelectCardActive : ""}`}
                          >
                            <span className={styles.iconVisual}>{icon.emoji}</span>
                            <span className={styles.iconLabel}>{icon.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Title (AR) *</label>
                      <input type="text" required className={styles.inputField} value={serviceForm.arTitle} onChange={e => setServiceForm({ ...serviceForm, arTitle: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Title (EN) *</label>
                      <input type="text" required className={styles.inputField} value={serviceForm.enTitle} onChange={e => setServiceForm({ ...serviceForm, enTitle: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Description (AR)</label>
                      <textarea className={styles.textareaField} style={{ height: "60px" }} value={serviceForm.arDesc} onChange={e => setServiceForm({ ...serviceForm, arDesc: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Description (EN)</label>
                      <textarea className={styles.textareaField} style={{ height: "60px" }} value={serviceForm.enDesc} onChange={e => setServiceForm({ ...serviceForm, enDesc: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Redirect Link *</label>
                      <input type="text" required className={styles.inputField} value={serviceForm.link} onChange={e => setServiceForm({ ...serviceForm, link: e.target.value })} />
                    </div>
                    
                    <button type="submit" className={styles.submitBtn}>
                      {editingId ? (locale === "ar" ? "تحديث وتثبيت الخدمة" : "Update Service") : (locale === "ar" ? "تسجيل الخدمة" : "Add Service")}
                    </button>
                    {editingId && (
                      <button type="button" className={styles.submitBtn} style={{ background: "#718096", marginTop: "5px" }} onClick={() => { setEditingId(null); setServiceForm({ category: "students", icon: "moodle", arTitle: "", enTitle: "", arDesc: "", enDesc: "", link: "" }); }}>
                        {locale === "ar" ? "إلغاء التعديل" : "Cancel Edit"}
                      </button>
                    )}
                  </form>
                </div>
                <div className={styles.adminCard}>
                  <h3>📋 {locale === "ar" ? "إدارة الخدمات المسجلة" : "Manage Registered Services"}</h3>
                  {["students", "faculty", "staff", "visitors"].map(cat => {
                    const list = servicesList[cat] || [];
                    if (list.length === 0) return null;
                    return (
                      <div key={cat} style={{ marginBottom: "20px" }}>
                        <h4 style={{ color: "var(--primary)", fontSize: "0.95rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "3px" }}>{cat.toUpperCase()}</h4>
                        <div className={styles.servicesList}>
                          {list.map(s => (
                            <div key={s.id} className={styles.serviceItem}>
                              <span>{locale === "ar" ? s.arTitle : s.enTitle}</span>
                              <div style={{ display: "flex", gap: "8px" }}>
                                <button onClick={() => startEditService(cat, s)} className={styles.deleteBtn} style={{ color: "var(--primary)" }}>✏️</button>
                                <button onClick={() => handleDeleteService(cat, s.id)} className={styles.deleteBtn}>❌</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ---------------------------------------------------- */}
            {/* COLLEGES EDITOR                                      */}
            {/* ---------------------------------------------------- */}
            {activeTab === "colleges" && (
              <>
                <div className={styles.adminCard}>
                  <h3>{editingId ? `✏️ ${locale === "ar" ? "تعديل الكلية" : "Edit Faculty"}` : `➕ ${locale === "ar" ? "إضافة كلية جديدة" : "Add College"}`}</h3>
                  <form onSubmit={handleSubmitCollege}>
                    
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "تصنيف الكلية" : "College Category"}</label>
                      <div className={styles.catInputRow}>
                        {!showNewColCat ? (
                          <>
                            <select className={styles.selectField} value={collegeForm.category} onChange={e => setCollegeForm({ ...collegeForm, category: e.target.value })}>
                              {collegeCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            <button type="button" className={styles.newCatBtn} onClick={() => setShowNewColCat(true)}>
                              ➕ {locale === "ar" ? "تصنيف جديد" : "New Category"}
                            </button>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              className={styles.inputField}
                              value={newColCat}
                              onChange={e => setNewColCat(e.target.value)}
                              placeholder={locale === "ar" ? "اسم التصنيف الجديد (مثال: technical)" : "New category (e.g. technical)"}
                              required
                            />
                            <button type="button" className={styles.newCatBtn} style={{ background: "#718096" }} onClick={() => setShowNewColCat(false)}>
                              {locale === "ar" ? "إلغاء" : "Cancel"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Name (AR) *</label>
                      <input type="text" required className={styles.inputField} value={collegeForm.arName} onChange={e => setCollegeForm({ ...collegeForm, arName: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Name (EN) *</label>
                      <input type="text" required className={styles.inputField} value={collegeForm.enName} onChange={e => setCollegeForm({ ...collegeForm, enName: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Desc (AR)</label>
                      <textarea className={styles.textareaField} value={collegeForm.arDesc} onChange={e => setCollegeForm({ ...collegeForm, arDesc: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Desc (EN)</label>
                      <textarea className={styles.textareaField} value={collegeForm.enDesc} onChange={e => setCollegeForm({ ...collegeForm, enDesc: e.target.value })} />
                    </div>
                    
                    <div className={styles.formGroup} style={{ background: "var(--platinum)", padding: "15px", borderRadius: "12px" }}>
                      <label>{locale === "ar" ? "صورة الكلية (رابط أو ملف)" : "College Image (URL or File)"}</label>
                      <input type="text" autoComplete="off" className={styles.inputField} value={collegeForm.image} onChange={e => setCollegeForm({ ...collegeForm, image: e.target.value })} placeholder="https://..." />
                      <label className={styles.fileUploadLabel} style={{ marginTop: "8px" }}>
                        📁 {locale === "ar" ? "اختر صورة من جهازك" : "Upload Image"}
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e, base64 => setCollegeForm({ ...collegeForm, image: base64 }))} />
                      </label>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Official Link *</label>
                      <input type="text" required className={styles.inputField} value={collegeForm.link} onChange={e => setCollegeForm({ ...collegeForm, link: e.target.value })} />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      {editingId ? (locale === "ar" ? "تحديث وتثبيت الكلية" : "Update College") : (locale === "ar" ? "إضافة الكلية" : "Add College")}
                    </button>
                    {editingId && (
                      <button type="button" className={styles.submitBtn} style={{ background: "#718096", marginTop: "5px" }} onClick={() => { setEditingId(null); setCollegeForm({ category: "medical", arName: "", enName: "", arDesc: "", enDesc: "", image: "", link: "" }); }}>
                        {locale === "ar" ? "إلغاء التعديل" : "Cancel Edit"}
                      </button>
                    )}
                  </form>
                </div>
                <div className={styles.adminCard}>
                  <h3>📋 {locale === "ar" ? "إدارة الكليات المسجلة" : "Manage Registered Colleges"}</h3>
                  <div className={styles.servicesList}>
                    {collegesList.map(c => (
                      <div key={c.id} className={styles.serviceItem}>
                        <div>
                          <span style={{ fontWeight: "700" }}>{locale === "ar" ? c.arName : c.enName}</span>
                          <span className={styles.serviceCategory} style={{ marginLeft: "8px" }}>{c.category}</span>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => startEditCollege(c)} className={styles.deleteBtn} style={{ color: "var(--primary)" }}>✏️</button>
                          <button onClick={() => handleDeleteCollege(c.id)} className={styles.deleteBtn}>❌</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ---------------------------------------------------- */}
            {/* NEWS EDITOR                                          */}
            {/* ---------------------------------------------------- */}
            {activeTab === "news" && (
              <>
                <div className={styles.adminCard}>
                  <h3>{editingId ? `✏️ ${locale === "ar" ? "تعديل الخبر" : "Edit News"}` : `📰 ${locale === "ar" ? "نشر خبر جديد" : "Publish News"}`}</h3>
                  <form onSubmit={handleSubmitNews}>
                    <div className={styles.formGroup}>
                      <label>Date (YYYY-MM-DD)</label>
                      <input type="text" className={styles.inputField} placeholder="2026-07-07" value={newsForm.date} onChange={e => setNewsForm({ ...newsForm, date: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Title (AR) *</label>
                      <input type="text" required className={styles.inputField} value={newsForm.arTitle} onChange={e => setNewsForm({ ...newsForm, arTitle: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Title (EN) *</label>
                      <input type="text" required className={styles.inputField} value={newsForm.enTitle} onChange={e => setNewsForm({ ...newsForm, enTitle: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Excerpt (AR)</label>
                      <textarea className={styles.textareaField} value={newsForm.arExcerpt} onChange={e => setNewsForm({ ...newsForm, arExcerpt: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Excerpt (EN)</label>
                      <textarea className={styles.textareaField} value={newsForm.enExcerpt} onChange={e => setNewsForm({ ...newsForm, enExcerpt: e.target.value })} />
                    </div>
                    <div className={styles.formGroup} style={{ background: "var(--platinum)", padding: "15px", borderRadius: "12px" }}>
                      <label>{locale === "ar" ? "صورة الخبر (رابط أو ملف)" : "News Image (URL or File)"}</label>
                      <input type="text" autoComplete="off" className={styles.inputField} value={newsForm.image} onChange={e => setNewsForm({ ...newsForm, image: e.target.value })} placeholder="https://..." />
                      <label className={styles.fileUploadLabel} style={{ marginTop: "8px" }}>
                        📁 {locale === "ar" ? "اختر صورة من جهازك" : "Upload Image"}
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e, base64 => setNewsForm({ ...newsForm, image: base64 }))} />
                      </label>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      {editingId ? (locale === "ar" ? "تحديث الخبر" : "Update News") : (locale === "ar" ? "نشر الخبر" : "Publish News")}
                    </button>
                    {editingId && (
                      <button type="button" className={styles.submitBtn} style={{ background: "#718096", marginTop: "5px" }} onClick={() => { setEditingId(null); setNewsForm({ arTitle: "", enTitle: "", arExcerpt: "", enExcerpt: "", image: "", date: "" }); }}>
                        {locale === "ar" ? "إلغاء التعديل" : "Cancel Edit"}
                      </button>
                    )}
                  </form>
                </div>
                <div className={styles.adminCard}>
                  <h3>📋 {locale === "ar" ? "إدارة الأخبار المنشورة" : "Manage News Posts"}</h3>
                  <div className={styles.servicesList}>
                    {newsList.map(n => (
                      <div key={n.id} className={styles.serviceItem}>
                        <span>{locale === "ar" ? n.arTitle : n.enTitle}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => startEditNews(n)} className={styles.deleteBtn} style={{ color: "var(--primary)" }}>✏️</button>
                          <button onClick={() => handleDeleteNews(n.id)} className={styles.deleteBtn}>❌</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ---------------------------------------------------- */}
            {/* RESEARCH EDITOR                                      */}
            {/* ---------------------------------------------------- */}
            {activeTab === "research" && (
              <>
                <div className={styles.adminCard}>
                  <h3>{editingId ? `✏️ ${locale === "ar" ? "تعديل الورقة البحثية" : "Edit Paper"}` : `🔬 ${locale === "ar" ? "إضافة ورقة بحثية جديدة" : "Add Research Paper"}`}</h3>
                  <form onSubmit={handleSubmitPaper}>
                    <div className={styles.formGroup}>
                      <label>Title (AR) *</label>
                      <input type="text" required className={styles.inputField} value={paperForm.arTitle} onChange={e => setPaperForm({ ...paperForm, arTitle: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Title (EN) *</label>
                      <input type="text" required className={styles.inputField} value={paperForm.enTitle} onChange={e => setPaperForm({ ...paperForm, enTitle: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "أسماء الباحثين والكليات *" : "Authors & College *"}</label>
                      <input type="text" required className={styles.inputField} placeholder="e.g. Dr. Ali (Medicine - 2026)" value={paperForm.authors} onChange={e => setPaperForm({ ...paperForm, authors: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Download Link / PDF URL</label>
                      <input type="text" className={styles.inputField} placeholder="https://..." value={paperForm.link} onChange={e => setPaperForm({ ...paperForm, link: e.target.value })} />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      {editingId ? (locale === "ar" ? "تحديث الورقة البحثية" : "Update Paper") : (locale === "ar" ? "إضافة ورقة بحثية" : "Add Paper")}
                    </button>
                    {editingId && (
                      <button type="button" className={styles.submitBtn} style={{ background: "#718096", marginTop: "5px" }} onClick={() => { setEditingId(null); setPaperForm({ arTitle: "", enTitle: "", authors: "", link: "" }); }}>
                        {locale === "ar" ? "إلغاء التعديل" : "Cancel Edit"}
                      </button>
                    )}
                  </form>
                </div>
                <div className={styles.adminCard}>
                  <h3>📋 {locale === "ar" ? "إدارة الأبحاث والأوراق" : "Manage Research Papers"}</h3>
                  <div className={styles.servicesList}>
                    {papersList.map(p => (
                      <div key={p.id} className={styles.serviceItem}>
                        <span>{locale === "ar" ? p.arTitle : p.enTitle}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => startEditPaper(p)} className={styles.deleteBtn} style={{ color: "var(--primary)" }}>✏️</button>
                          <button onClick={() => handleDeletePaper(p.id)} className={styles.deleteBtn}>❌</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ---------------------------------------------------- */}
            {/* GALLERY EDITOR                                       */}
            {/* ---------------------------------------------------- */}
            {activeTab === "gallery" && (
              <>
                <div className={styles.adminCard}>
                  <h3>{editingId ? `✏️ ${locale === "ar" ? "تعديل ميديا المعرض" : "Edit Media"}` : `🖼️ ${locale === "ar" ? "إضافة ميديا جديدة" : "Add Media"}`}</h3>
                  <form onSubmit={handleSubmitGallery}>
                    
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "تصنيف المعرض" : "Gallery Category"}</label>
                      <div className={styles.catInputRow}>
                        {!showNewGalCat ? (
                          <>
                            <select className={styles.selectField} value={galleryForm.category} onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}>
                              {galleryCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            <button type="button" className={styles.newCatBtn} onClick={() => setShowNewGalCat(true)}>
                              ➕ {locale === "ar" ? "تصنيف جديد" : "New Category"}
                            </button>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              className={styles.inputField}
                              value={newGalCat}
                              onChange={e => setNewGalCat(e.target.value)}
                              placeholder={locale === "ar" ? "اسم التصنيف الجديد (مثال: labs)" : "New category (e.g. labs)"}
                              required
                            />
                            <button type="button" className={styles.newCatBtn} style={{ background: "#718096" }} onClick={() => setShowNewGalCat(false)}>
                              {locale === "ar" ? "إلغاء" : "Cancel"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className={styles.formGroup} style={{ background: "var(--platinum)", padding: "15px", borderRadius: "12px" }}>
                      <label>{locale === "ar" ? "صورة المعرض (رابط أو ملف)" : "Gallery Image (URL or File)"}</label>
                      <input type="text" autoComplete="off" className={styles.inputField} value={galleryForm.image} onChange={e => setGalleryForm({ ...galleryForm, image: e.target.value })} placeholder="https://..." />
                      <label className={styles.fileUploadLabel} style={{ marginTop: "8px" }}>
                        📁 {locale === "ar" ? "اختر صورة من جهازك" : "Upload Image"}
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e, base64 => setGalleryForm({ ...galleryForm, image: base64 }))} />
                      </label>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Caption (AR)</label>
                      <input type="text" className={styles.inputField} value={galleryForm.arCaption} onChange={e => setGalleryForm({ ...galleryForm, arCaption: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Caption (EN)</label>
                      <input type="text" className={styles.inputField} value={galleryForm.enCaption} onChange={e => setGalleryForm({ ...galleryForm, enCaption: e.target.value })} />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      {editingId ? (locale === "ar" ? "تحديث ميديا المعرض" : "Update Media") : (locale === "ar" ? "إضافة ميديا المعرض" : "Add Media")}
                    </button>
                    {editingId && (
                      <button type="button" className={styles.submitBtn} style={{ background: "#718096", marginTop: "5px" }} onClick={() => { setEditingId(null); setGalleryForm({ category: "campus", image: "", arCaption: "", enCaption: "" }); }}>
                        {locale === "ar" ? "إلغاء التعديل" : "Cancel Edit"}
                      </button>
                    )}
                  </form>
                </div>
                <div className={styles.adminCard}>
                  <h3>📋 {locale === "ar" ? "إدارة معرض الميديا" : "Manage Gallery Media"}</h3>
                  <div className={styles.servicesList}>
                    {galleryList.map(g => (
                      <div key={g.id} className={styles.serviceItem}>
                        <span>{locale === "ar" ? g.arCaption : g.enCaption}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => startEditGallery(g)} className={styles.deleteBtn} style={{ color: "var(--primary)" }}>✏️</button>
                          <button onClick={() => handleDeleteGallery(g.id)} className={styles.deleteBtn}>❌</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ---------------------------------------------------- */}
            {/* CONTACT SETTINGS                                     */}
            {/* ---------------------------------------------------- */}
            {activeTab === "contact" && (
              <div className={styles.adminCard} style={{ gridColumn: "1 / -1" }}>
                <h3>📞 {locale === "ar" ? "تعديل معلومات وبيانات الاتصال" : "Edit Contact Information & Maps"}</h3>
                <form onSubmit={handleSaveContact}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "العنوان بالكامل (العربية)" : "Full Address (AR)"}</label>
                      <input type="text" className={styles.inputField} value={contactForm.addressAr} onChange={e => setContactForm({ ...contactForm, addressAr: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "العنوان بالكامل (الإنجليزية)" : "Full Address (EN)"}</label>
                      <input type="text" className={styles.inputField} value={contactForm.addressEn} onChange={e => setContactForm({ ...contactForm, addressEn: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "10px" }}>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "رقم الهاتف" : "Telephone / Phone"}</label>
                      <input type="text" className={styles.inputField} value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{locale === "ar" ? "البريد الإلكتروني للاتصال" : "Support Email"}</label>
                      <input type="email" className={styles.inputField} value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
                    </div>
                  </div>
                  <div className={styles.formGroup} style={{ marginTop: "10px" }}>
                    <label>{locale === "ar" ? "رابط تضمين خريطة جوجل (Maps iframe src)" : "Google Maps embed src Link"}</label>
                    <textarea className={styles.textareaField} style={{ height: "80px" }} value={contactForm.mapsUrl} onChange={e => setContactForm({ ...contactForm, mapsUrl: e.target.value })} />
                  </div>
                  <button type="submit" className={styles.submitBtn}>{locale === "ar" ? "حفظ وتثبيت التعديلات" : "Save Changes"}</button>
                </form>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
