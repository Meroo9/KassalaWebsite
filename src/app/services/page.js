"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { useUserRole, ROLES } from "../../context/UserRoleContext";
import { contentService } from "../../services/contentService";
import { cleanSearchQuery } from "../../utils/security";
import styles from "./services.module.css";
import TechIcon from "../../components/TechIcon";

function ServicesContent() {
  const { locale, t } = useLanguage();
  const { role, changeRole } = useUserRole();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const rawQuery = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(rawQuery);
  const query = cleanSearchQuery(rawQuery);

  // Sync search input if query param changes in URL
  useEffect(() => {
    setSearchInput(rawQuery);
  }, [rawQuery]);

  // Tab state for non-search mode
  const getInitialTab = () => {
    const tabParam = searchParams.get("tab");
    const validTabs = ["students", "faculty", "staff", "visitors"];
    if (tabParam && validTabs.includes(tabParam)) return tabParam;
    if (tabParam === "employees") return "staff";
    return "students";
  };

  const activeTab = getInitialTab();

  const handleTabChange = (tabId) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tabId);
    params.delete("q");
    router.push(`/services?${params.toString()}`);
  };

  const tabs = [
    { id: "students", labelKey: "tab_students", icon: "🎓" },
    { id: "faculty", labelKey: "tab_faculty", icon: "👨‍🏫" },
    { id: "staff", labelKey: "tab_staff", icon: "🏛️" },
    { id: "visitors", labelKey: "tab_visitors", icon: "🌐" },
  ];

  let activeServices = contentService.getServices(activeTab);
  let globalSearchResults = null;
  let totalMatches = 0;
  
  if (query) {
    globalSearchResults = contentService.searchSite(query);
    activeServices = globalSearchResults.services;
    totalMatches = globalSearchResults.totalMatches;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/services?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push("/services");
    }
  };

  const handleQuickSearch = (keyword) => {
    setSearchInput(keyword);
    router.push(`/services?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className={styles.servicesPage}>
      {/* Background Glow Elements */}
      <div className={`${styles.glowSphere} ${styles.glowSphere1}`}></div>
      <div className={`${styles.glowSphere} ${styles.glowSphere2}`}></div>

      <main className={styles.mainContent}>
        <div className="container">
          
          {/* Header Section */}
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>
              {query 
                ? (locale === "ar" ? `نتائج البحث عن: "${query}"` : `Search Results for: "${query}"`)
                : (locale === "ar" ? "بوابة الخدمات الإلكترونية والبحث الموحد" : "Electronic Services & Universal Search Portal")}
            </h1>
            <p className={styles.pageDesc}>
              {locale === "ar" 
                ? "منصة رقمية متكاملة تتيح الوصول السريع لكافة الخدمات، الكليات، الأخبار، والمجلات العلمية بجامعة كسلا."
                : "A unified digital portal for fast access to services, colleges, news, and academic journals across University of Kassala."}
            </p>
          </header>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearchSubmit} className={styles.searchBox}>
              <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder={locale === "ar" ? "ابحث عن كلية، تخصص، خدمة، خبر، أو مجلة..." : "Search for a college, major, service, news, or paper..."}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn}>
                {locale === "ar" ? "بحث" : "Search"}
              </button>
            </form>

            {/* Quick Search Keywords */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginTop: "12px", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                {locale === "ar" ? "كلمات شائعة:" : "Suggestions:"}
              </span>
              {["كلية الحاسوب", "كلية الطب", "كلية الهندسة", "بوابة الطالب", "مجلة القلزم", "القبول والتسجيل"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickSearch(tag)}
                  style={{
                    background: "rgba(13, 92, 52, 0.08)",
                    border: "1px solid rgba(13, 92, 52, 0.2)",
                    borderRadius: "16px",
                    padding: "4px 12px",
                    fontSize: "0.8rem",
                    color: "var(--primary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Summary Banner */}
          {query && (
            <div style={{
              background: "rgba(13, 92, 52, 0.06)",
              border: "1px solid rgba(13, 92, 52, 0.15)",
              borderRadius: "12px",
              padding: "16px 24px",
              margin: "30px 0 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px"
            }}>
              <span style={{ fontWeight: "600", color: "var(--primary)" }}>
                {locale === "ar"
                  ? `تم العثور على (${totalMatches}) نتيجة مطابقة لبحثك`
                  : `Found (${totalMatches}) matching results for your query`}
              </span>
              <button
                onClick={() => { setSearchInput(""); router.push("/services"); }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--accent, #d4af37)",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "0.9rem"
                }}
              >
                {locale === "ar" ? "إلغاء البحث والرجوع للخدمات ✕" : "Clear Search ✕"}
              </button>
            </div>
          )}

          {/* If Search Yielded 0 Matches */}
          {query && totalMatches === 0 && (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "var(--glass-bg)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              margin: "20px 0"
            }}>
              <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}>🔍</span>
              <h3 style={{ color: "var(--primary)", marginBottom: "8px" }}>
                {locale === "ar" ? `لم يتم العثور على نتائج مطابقة لـ "${query}"` : `No results found for "${query}"`}
              </h3>
              <p style={{ color: "var(--text-muted)", maxWidth: "550px", margin: "0 auto 24px" }}>
                {locale === "ar" 
                  ? "تأكد من صحة الكلمات أو جرب كلمات مفتاحية أخرى كاسم الكلية، التخصص، أو الخدمة المطلوبة."
                  : "Please check your spelling or try broader keywords like college name, major, or service."}
              </p>
            </div>
          )}

          {/* NORMAL SERVICES VIEW (When no search query is active) */}
          {!query && (
            <>
              {/* Category Selector Tabs */}
              <div className={styles.tabContainer} suppressHydrationWarning>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    suppressHydrationWarning
                    onClick={() => handleTabChange(tab.id)}
                    className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTabBtn : ""}`}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{tab.icon}</span>
                    <span>{t(tab.labelKey)}</span>
                  </button>
                ))}
              </div>

              {/* Bento Grid Services */}
              <div className={styles.servicesGrid}>
                {activeServices.map((service, index) => {
                  const title = service.titleKey ? t(service.titleKey) : (locale === "ar" ? service.arTitle : service.enTitle);
                  const desc = service.descKey ? t(service.descKey) : (locale === "ar" ? service.arDesc : service.enDesc);
                  const isHighlighted = index === 1;
                  const isBentoSpan = index === 3;

                  return (
                    <a
                      key={service.id}
                      href={service.link}
                      target={service.link.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className={`${styles.serviceCard} ${isHighlighted ? styles.highlighted : ""} ${isBentoSpan ? styles.colSpan2 + " " + styles.horizontalCard : ""}`}
                    >
                      {isHighlighted && <div className={styles.highlightedBar}></div>}
                      
                      {isBentoSpan ? (
                        <div className={styles.horizontalLeft}>
                          <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}>
                              <TechIcon type={service.icon || "payments"} size={32} />
                            </div>
                          </div>
                          <h3>{title}</h3>
                          <p>{desc}</p>
                          <div className={styles.cardFooter}>
                            <span>{locale === "ar" ? "دخول النظام" : "Access System"}</span>
                            <svg className={styles.arrowIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              {locale === "ar" ? <path d="M19 12H5M12 19l-7-7 7-7"/> : <path d="M5 12h14M12 5l7 7-7 7"/>}
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className={styles.cardHeader}>
                            <div className={`${styles.iconWrapper} ${isHighlighted ? styles.iconWrapperHighlighted : ""}`}>
                              <TechIcon type={service.icon || "desktop_windows"} size={32} />
                            </div>
                            {isHighlighted ? (
                              <span className={`${styles.badge} ${styles.badgeHighlighted}`}>
                                {locale === "ar" ? "الأكثر طلباً" : "Most Requested"}
                              </span>
                            ) : (
                              index === 0 && (
                                <span className={styles.badge}>
                                  {locale === "ar" ? "متاح الآن" : "Available"}
                                </span>
                              )
                            )}
                          </div>
                          <h3>{title}</h3>
                          <p>{desc}</p>
                          <div className={`${styles.cardFooter} ${isHighlighted ? styles.footerHighlighted : ""}`}>
                            <span>{locale === "ar" ? "دخول النظام" : "Access System"}</span>
                            <svg className={styles.arrowIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              {locale === "ar" ? <path d="M19 12H5M12 19l-7-7 7-7"/> : <path d="M5 12h14M12 5l7 7-7 7"/>}
                            </svg>
                          </div>
                        </>
                      )}

                      {isBentoSpan && (
                        <div className={styles.horizontalRight}>
                          <div className={styles.horizontalRightBg}></div>
                          <div className={styles.horizontalRightIcon}>
                            <TechIcon type="visitors" size={40} />
                          </div>
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            </>
          )}

          {/* SEARCH RESULTS SECTIONS (Only display sections that have matches) */}
          {query && totalMatches > 0 && (
            <>
              {/* 1. Colleges Matches */}
              {globalSearchResults.colleges.length > 0 && (
                <div style={{ marginTop: "30px" }}>
                  <h2 style={{ fontSize: "1.3rem", color: "var(--primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    🏛️ {locale === "ar" ? "الكليات والمراكز الأكاديمية" : "Colleges & Centers"} ({globalSearchResults.colleges.length})
                  </h2>
                  <div className={styles.servicesGrid}>
                    {globalSearchResults.colleges.map((col) => (
                      <Link key={col.id} href="/colleges" className={styles.serviceCard}>
                        <div className={styles.cardHeader}>
                          <div className={styles.iconWrapper}>
                            <TechIcon type="academic" size={32} />
                          </div>
                          <span className={styles.badge}>{col.category}</span>
                        </div>
                        <h3>{locale === "ar" ? col.arName : col.enName}</h3>
                        <p>{locale === "ar" ? col.arDesc : col.enDesc}</p>
                        <div className={styles.cardFooter}>
                          <span>{locale === "ar" ? "استعراض الكلية والتخصصات" : "View College & Majors"}</span>
                          <svg className={styles.arrowIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {locale === "ar" ? <path d="M19 12H5M12 19l-7-7 7-7"/> : <path d="M5 12h14M12 5l7 7-7 7"/>}
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Services Matches */}
              {globalSearchResults.services.length > 0 && (
                <div style={{ marginTop: "40px" }}>
                  <h2 style={{ fontSize: "1.3rem", color: "var(--primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    🛠️ {locale === "ar" ? "الخدمات الإلكترونية والمنصات" : "E-Services & Platforms"} ({globalSearchResults.services.length})
                  </h2>
                  <div className={styles.servicesGrid}>
                    {globalSearchResults.services.map((service) => (
                      <a
                        key={service.id}
                        href={service.link}
                        target={service.link.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={styles.serviceCard}
                      >
                        <div className={styles.cardHeader}>
                          <div className={styles.iconWrapper}>
                            <TechIcon type={service.icon || "portal"} size={32} />
                          </div>
                        </div>
                        <h3>{locale === "ar" ? service.arTitle : service.enTitle}</h3>
                        <p>{locale === "ar" ? service.arDesc : service.enDesc}</p>
                        <div className={styles.cardFooter}>
                          <span>{locale === "ar" ? "دخول النظام" : "Access System"}</span>
                          <svg className={styles.arrowIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {locale === "ar" ? <path d="M19 12H5M12 19l-7-7 7-7"/> : <path d="M5 12h14M12 5l7 7-7 7"/>}
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. News Matches */}
              {globalSearchResults.news.length > 0 && (
                <div style={{ marginTop: "40px" }}>
                  <h2 style={{ fontSize: "1.3rem", color: "var(--primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    📰 {locale === "ar" ? "الأخبار والإعلانات" : "News & Announcements"} ({globalSearchResults.news.length})
                  </h2>
                  <div className={styles.servicesGrid}>
                    {globalSearchResults.news.map((item) => (
                      <Link key={item.id} href="/news" className={styles.serviceCard}>
                        <div className={styles.cardHeader}>
                          <div className={styles.iconWrapper}>
                            <TechIcon type="moodle" size={32} />
                          </div>
                          <span className={styles.badge}>{item.date}</span>
                        </div>
                        <h3>{locale === "ar" ? item.arTitle : item.enTitle}</h3>
                        <p>{locale === "ar" ? item.arExcerpt : item.enExcerpt}</p>
                        <div className={styles.cardFooter}>
                          <span>{locale === "ar" ? "قراءة التغطية" : "Read Article"}</span>
                          <svg className={styles.arrowIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {locale === "ar" ? <path d="M19 12H5M12 19l-7-7 7-7"/> : <path d="M5 12h14M12 5l7 7-7 7"/>}
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Research & Journals Matches */}
              {globalSearchResults.research.length > 0 && (
                <div style={{ marginTop: "40px" }}>
                  <h2 style={{ fontSize: "1.3rem", color: "var(--primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    📚 {locale === "ar" ? "أعداد مجلة القلزم والبحوث العلمية" : "Journal Issues & Research Papers"} ({globalSearchResults.research.length})
                  </h2>
                  <div className={styles.servicesGrid}>
                    {globalSearchResults.research.map((paper, idx) => (
                      <a key={idx} href={paper.link} target="_blank" rel="noopener noreferrer" className={styles.serviceCard}>
                        <div className={styles.cardHeader}>
                          <div className={styles.iconWrapper}>
                            <TechIcon type="library" size={32} />
                          </div>
                          <span className={styles.badge}>{paper.num ? (locale === "ar" ? `العدد ${paper.num}` : `Issue ${paper.num}`) : "بحث"}</span>
                        </div>
                        <h3>{locale === "ar" ? paper.arSub : paper.enSub}</h3>
                        <p>{locale === "ar" ? paper.arName : paper.enName}</p>
                        <div className={styles.cardFooter}>
                          <span>{locale === "ar" ? "تحميل البحث PDF" : "Download PDF"}</span>
                          <svg className={styles.arrowIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {locale === "ar" ? <path d="M19 12H5M12 19l-7-7 7-7"/> : <path d="M5 12h14M12 5l7 7-7 7"/>}
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Custom Dynamic Pages & Events Matches */}
              {globalSearchResults.customPages && globalSearchResults.customPages.length > 0 && (
                <div style={{ marginTop: "40px" }}>
                  <h2 style={{ fontSize: "1.3rem", color: "var(--primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    📄 {locale === "ar" ? "المؤتمرات والصفحات الخاصة" : "Conferences & Special Events"} ({globalSearchResults.customPages.length})
                  </h2>
                  <div className={styles.servicesGrid}>
                    {globalSearchResults.customPages.map((p) => (
                      <Link key={p.id} href={`/pages/${p.slug}`} className={styles.serviceCard}>
                        <div className={styles.cardHeader}>
                          <div className={styles.iconWrapper}>
                            <TechIcon type="visitors" size={32} />
                          </div>
                          <span className={styles.badge}>{locale === "ar" ? "مؤتمر خاص" : "Special Event"}</span>
                        </div>
                        <h3>{locale === "ar" ? p.arTitle : p.enTitle}</h3>
                        <p>{locale === "ar" ? p.arSubtitle : p.enSubtitle}</p>
                        <div className={styles.cardFooter}>
                          <span>{locale === "ar" ? "تفاصيل المؤتمر والبرنامج" : "View Conference Details"}</span>
                          <svg className={styles.arrowIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {locale === "ar" ? <path d="M19 12H5M12 19l-7-7 7-7"/> : <path d="M5 12h14M12 5l7 7-7 7"/>}
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default function Services() {
  return (
    <div style={{ flex: 1 }}>
      <Suspense fallback={
        <div style={{ textAlign: "center", padding: "100px 0" }}>
          <p style={{ color: "var(--primary)", fontWeight: "600" }}>Loading services...</p>
        </div>
      }>
        <ServicesContent />
      </Suspense>
    </div>
  );
}
