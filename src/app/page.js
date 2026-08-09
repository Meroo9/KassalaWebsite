"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { useUserRole, ROLES } from "../context/UserRoleContext";
import { contentService } from "../services/contentService";
import fallbackData from "../data/fallbackData.json";
import styles from "./page.module.css";
import TechIcon from "../components/TechIcon";
import AnimatedStatsCard from "../components/AnimatedStatsCard";

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const cleanNum = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(cleanNum)) {
      const timer = setTimeout(() => {
        setCount(value);
      }, 0);
      return () => clearTimeout(timer);
    }

    let start = 0;
    const duration = 2000;
    const steps = 40;
    const stepTime = duration / steps;
    const increment = cleanNum / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= cleanNum) {
        clearInterval(timer);
        setCount(cleanNum);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const formatted = typeof count === "number" ? count.toLocaleString() : count;
  const hasPlus = value.includes("+");
  return <span>{formatted}{hasPlus ? "+" : ""}</span>;
}

export default function Home() {
  const { locale, t } = useLanguage();
  const { role, changeRole } = useUserRole();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHeroSearchOpen, setIsHeroSearchOpen] = useState(false);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (!heroSearchQuery.trim()) return;
    window.location.href = `/services?q=${encodeURIComponent(heroSearchQuery)}`;
  };

  // CMS dynamic configuration states
  const [hero, setHero] = useState(() => contentService.getHeroSettings());
  const [rector, setRector] = useState(() => contentService.getRectorSettings());
  const [featuredColleges, setFeaturedColleges] = useState(() => contentService.getColleges().slice(0, 3));
  const [services, setServices] = useState([]);

  // Load CMS settings dynamically on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHero(contentService.getHeroSettings());
      setRector(contentService.getRectorSettings());
      setFeaturedColleges(contentService.getColleges().slice(0, 3));
      setServices(contentService.getServices("students"));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const sliderData = [
    {
      image: hero.images[0] || "https://kassalauni.edu.sd/nw/wp-content/uploads/2019/10/DSC00314.jpg",
      title: locale === "ar" ? hero.titleAr : hero.titleEn,
      desc: locale === "ar" ? hero.subtitleAr : hero.subtitleEn,
    },
    {
      image: hero.images[1] || "https://kassalauni.edu.sd/nw/wp-content/uploads/2026/07/731674235_2787464318293126_3654465864040771624_n-1024x768.jpg",
      title: locale === "ar" ? hero.titleAr : hero.titleEn,
      desc: locale === "ar" ? hero.subtitleAr : hero.subtitleEn,
    },
    {
      image: hero.images[2] || "https://kassalauni.edu.sd/nw/wp-content/uploads/2026/07/733095703_2245592242882652_6549622429077855227_n-1024x768.jpg",
      title: locale === "ar" ? hero.titleAr : hero.titleEn,
      desc: locale === "ar" ? hero.subtitleAr : hero.subtitleEn,
    },
  ];

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [sliderData.length]);

  // Fetch dynamic news from Kassala WP REST API with local fallback
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            // Map WordPress posts to our standard news structure
            const mappedNews = data.map((post) => {
              const defaultImage = fallbackData.news[0].image;
              return {
                id: post.id,
                date: post.date.split("T")[0],
                arTitle: post.title.rendered.replace(/&#8230;/g, "...").replace(/&#8211;/g, "-"),
                enTitle: post.title.rendered.replace(/&#8230;/g, "...").replace(/&#8211;/g, "-"),
                arExcerpt: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
                enExcerpt: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
                image: post.jetpack_featured_media_url ? `/api/proxy-image?url=${encodeURIComponent(post.jetpack_featured_media_url)}` : defaultImage,
                link: "/news",
              };
            });
            
            // Prepend custom news items from CMS if available
            const localCustomNews = contentService.getNews().filter(n => typeof n.id === "string" && n.id.startsWith("custom_"));
            setNews([...localCustomNews, ...mappedNews]);
            setNewsError(false);
            setNewsLoading(false);
            return;
          }
        }
      } catch (err) {
        // Fail silently
      }
      
      // Fallback path
      setNews(contentService.getNews());
      setNewsError(true);
      setNewsLoading(false);
    };

    const timer = setTimeout(() => {
      fetchNews();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/services?q=${encodeURIComponent(searchQuery)}`;
  };

  const getRoleFilteredServices = () => {
    if (role === ROLES.NEW_STUDENT) {
      return [
        { id: "adm_1", arTitle: "التقديم والقبول الإلكتروني", enTitle: "Online Admissions", arDesc: "خطوات التقديم الإلكتروني للطلاب الجدد", enDesc: "Application steps for new applicants", icon: "portal", link: "/admissions" },
        { id: "adm_2", arTitle: "حاسبة نسبة الاستيفاء", enTitle: "Eligibility Cutoff Calculator", arDesc: "فحص استيفاء شروط القبول للكليات", enDesc: "Calculate eligible faculty cutoffs", icon: "support", link: "/admissions" },
        { id: "adm_3", arTitle: "دليل الكليات والتخصصات", enTitle: "Colleges Guide", arDesc: "استكشاف التخصصات والبرامج المتاحة", enDesc: "Explore academic majors & degrees", icon: "affairs", link: "/colleges" },
        { id: "adm_4", arTitle: "التقويم الأكاديمي والامتحانات", enTitle: "Academic Calendar", arDesc: "مواعيد التسجيل والبدء للعام الدراسي", enDesc: "Semester dates & registration", icon: "visitors", link: "/admissions" },
      ];
    }
    if (role === ROLES.CURRENT_STUDENT) {
      return [
        { id: "cur_1", arTitle: "منصة التعلم الإلكتروني Moodle", enTitle: "Moodle LMS Portal", arDesc: "تحميل المقررات والمحاضرات والواجبات", enDesc: "Access courses, lectures & assignments", icon: "moodle", link: "https://moodle.kassalauni.edu.sd" },
        { id: "cur_2", arTitle: "نتائج الامتحانات والشهادات", enTitle: "Exams & Results", arDesc: "استعلام نتائج الفصول والسجل الأكاديمي", enDesc: "Check semester grades & transcript", icon: "portal", link: "/services" },
        { id: "cur_3", arTitle: "شؤون الطلاب والبطاقة الجامعية", enTitle: "Student Affairs", arDesc: "خدمات الهوية الطلابية والأنشطة", enDesc: "Student ID cards & campus activities", icon: "affairs", link: "/services" },
        { id: "cur_4", arTitle: "المكتبة الرقمية والمراجع", enTitle: "Digital Library", arDesc: "استعارة وتصفح الدوريات الموثقة", enDesc: "Access digital books & research paper", icon: "library", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
      ];
    }
    if (role === ROLES.FACULTY) {
      return [
        { id: "fac_1", arTitle: "بوابة أعضاء هيئة التدريس", enTitle: "Faculty Staff Portal", arDesc: "رصد النتائج الجداول والأعمال الأكاديمية", enDesc: "Enter grades, view schedules & portal", icon: "portal", link: "/portal" },
        { id: "fac_2", arTitle: "البريد الجامعي الرسمي", enTitle: "University Webmail", arDesc: "الدخول لمنظومة المراسلات الأكاديمية", enDesc: "Access official university webmail", icon: "email", link: "https://webmail.kassalauni.edu.sd" },
        { id: "fac_3", arTitle: "أمانة البحث العلمي", enTitle: "Deanship of Scientific Research", arDesc: "تقديم المشاريع والتمويل البحثي", enDesc: "Submit research papers & grants", icon: "support", link: "/research" },
        { id: "fac_4", arTitle: "إصدارات مجلة القلزم المحكمة", enTitle: "Al-Qalzam Journal Issues", arDesc: "تحميل الأعداد والنشر بالمجلة الأكاديمية", enDesc: "Download indexed journal issues", icon: "library", link: "/research" },
      ];
    }
    // Default: ALL
    return services.length > 0 ? services.slice(0, 4) : [
      { id: "all_1", arTitle: "دليل الكليات ومعاهد الجامعة", enTitle: "Colleges Directory", arDesc: "استكشاف كليات جامعة كسلا المتخصصة", enDesc: "Explore all university faculties", icon: "affairs", link: "/colleges" },
      { id: "all_2", arTitle: "بوابة الخدمات الإلكترونية", enTitle: "University Services Portal", arDesc: "الخدمات الطلابية والأكاديمية المباشرة", enDesc: "Direct student & academic services", icon: "support", link: "/services" },
      { id: "all_3", arTitle: "البحث العلمي والمجلات", enTitle: "Scientific Research & Journals", arDesc: "المرجع والمستودع الرقمي الجامعي", enDesc: "Academic repository & journals", icon: "library", link: "/research" },
      { id: "all_4", arTitle: "أخبار وفعاليات الجامعة", enTitle: "News & Events", arDesc: "التغطية الإخبارية والأنشطة الرسمية", enDesc: "Latest university coverage", icon: "visitors", link: "/news" },
    ];
  };

  const activeServices = getRoleFilteredServices();

  return (
    <div style={{ flex: 1 }}>
      {/* 1. Hero Image Slider */}
      <section className={styles.heroSlider}>
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentSlide ? styles.activeSlide : ""
            }`}
          >
            <Image
              src={slide.image}
              alt="Slider Background"
              width={1920}
              height={1080}
              unoptimized
              className={styles.slideImage}
            />
            <div className="container">
              <div className={styles.heroTextContent}>
                <h1>{slide.title}</h1>
                <p>{slide.desc}</p>

                <div className={styles.ctaGroup}>
                  <Link href="/admissions" className="btn btn-accent">
                    {locale === "ar" ? (hero.ctaAr || t("hero_cta_apply")) : (hero.ctaEn || t("hero_cta_apply"))}
                  </Link>
                  <Link href="/services" className="btn btn-secondary" style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}>
                    {t("hero_cta_services")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Floating Search Icon on the Side */}
        <div className={`${styles.heroSearchFloating} ${isHeroSearchOpen ? styles.heroSearchActive : ""}`}>
          <form onSubmit={handleHeroSearchSubmit} className={styles.heroSearchForm}>
            <input
              type="text"
              placeholder={locale === "ar" ? "ابحث عن كلية، تخصص، أو خدمة..." : "Search..."}
              className={styles.heroSearchInput}
              value={heroSearchQuery}
              onChange={(e) => setHeroSearchQuery(e.target.value)}
            />
            <button
              type="button"
              className={styles.heroSearchBtn}
              onClick={() => setIsHeroSearchOpen(!isHeroSearchOpen)}
              aria-label="Toggle Search"
            >
              🔍
            </button>
          </form>
        </div>
        
        <div className={styles.sliderDots}>
          {sliderData.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === currentSlide ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Quick Portals Grid Section */}

      {/* Quick Portals Grid Section (Role-Filtered) */}
      <section className={styles.quickServicesSection}>
        <div className="container animate-fade-in">
          <div className={styles.quickServicesGrid}>
            {activeServices.map((service) => (
              <a
                key={service.id}
                href={service.link}
                target={service.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={styles.portalCard}
              >
                <div className={styles.portalIconWrapper}>
                  <TechIcon type={service.icon || "star"} size={48} />
                </div>
                <h3>{locale === "ar" ? service.arTitle : service.enTitle}</h3>
                <p>{locale === "ar" ? service.arDesc : service.enDesc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Welcome Section (Rector Word) */}
      <section className={`${styles.welcomeSection} section-padding`}>
        <div className={`${styles.welcomeGrid} container`}>
          <div className={styles.rectorCard}>
            <Image
              src={rector.image}
              width={800}
              height={1000}
              unoptimized
              alt={locale === "ar" ? "صورة مديرة الجامعة أ.د. أماني عبد المعروف بشير" : "Prof. Dr. Amany Abdelmarouf - Rector of Kassala University"}
              loading="lazy"
              className={styles.rectorImage}
            />
            <div className={styles.rectorFrame}></div>
          </div>
          
          <div className={styles.welcomeContent}>
            <h3>{locale === "ar" ? rector.roleAr : rector.roleEn}</h3>
            <h2>{locale === "ar" ? rector.nameAr : rector.nameEn}</h2>
            <p className={styles.speechText}>{locale === "ar" ? rector.speechAr : rector.speechEn}</p>
            <Link href="/about" className="btn btn-primary">
              {locale === "ar" ? "اقرأ المزيد عن الجامعة" : "Read More About Us"}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Stats Section (Emerald & Gold & Motion Graphics) */}
      <section className={`${styles.statsSection} emerald-gold-gradient`} suppressHydrationWarning>
        <div className="container">
          <div className={styles.statsGrid}>
            {fallbackData.stats.map((stat, idx) => (
              <AnimatedStatsCard
                key={stat.id}
                stat={stat}
                labelText={t(stat.labelKey)}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest News Section */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <h2>{t("news_title")}</h2>
            <p>{t("news_subtitle")}</p>
          </div>

          {newsLoading ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--primary)" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>{t("news_api_loading")}</span>
            </div>
          ) : (
            <>
              {newsError && (
                <div style={{ background: "rgba(212, 175, 55, 0.15)", border: "1px solid var(--accent)", borderRadius: "8px", padding: "12px 20px", marginBottom: "30px", fontSize: "0.9rem", color: "var(--primary-dark)", textAlign: "center" }}>
                  ⚠️ {t("news_api_error")}
                </div>
              )}
              <div className={styles.newsGrid}>
                {news.slice(0, 3).map((item) => (
                  <article key={item.id} className={`${styles.newsCard} card`}>
                    <div className={styles.newsImageWrapper}>
                      <Image src={item.image} alt={locale === "ar" ? item.arTitle : item.enTitle} width={1200} height={800} unoptimized loading="lazy" className={styles.newsImage} />
                    </div>
                    <span className={styles.newsDate}>{t("news_published_at")}{item.date}</span>
                    <h3>{locale === "ar" ? item.arTitle : item.enTitle}</h3>
                    <p>{locale === "ar" ? item.arExcerpt : item.enExcerpt}</p>
                    <Link href={item.link} className={styles.readMoreBtn}>
                      {t("news_read_more")} {locale === "ar" ? "←" : "→"}
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 5. Highlight Colleges Section */}
      <section className={`${styles.collegesSection} section-padding`}>
        <div className="container">
          <div className="section-header">
            <h2>{locale === "ar" ? "كليات متميزة" : "Featured Colleges"}</h2>
            <p>{t("colleges_subtitle")}</p>
          </div>
          
          <div className={styles.collegesGrid}>
            {featuredColleges.slice(0, 3).map((college) => (
              <div key={college.id} className={`${styles.collegeCard} card`}>
                <Image src={college.image} alt={locale === "ar" ? college.arName : college.enName} width={1200} height={800} unoptimized loading="lazy" className={styles.collegeImg} />
                <div className={styles.collegeBody}>
                  <h3>{locale === "ar" ? college.arName : college.enName}</h3>
                  <p>{locale === "ar" ? college.arDesc : college.enDesc}</p>
                  <a href={college.link} target="_blank" rel="noopener noreferrer" className={styles.collegeLink}>
                    {locale === "ar" ? "الموقع الرسمي" : "Official Website"} {locale === "ar" ? "←" : "→"}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/colleges" className="btn btn-secondary">
              {locale === "ar" ? "عرض جميع الكليات" : "View All Colleges"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
