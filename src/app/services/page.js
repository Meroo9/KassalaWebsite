"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  
  // Local state for search input
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const query = cleanSearchQuery(searchParams.get("q") || "").toLowerCase();

  // Initialize activeTab state from the 'tab' search parameter (or "students" if empty/invalid)
  const getInitialTab = () => {
    const tabParam = searchParams.get("tab");
    const validTabs = ["students", "faculty", "staff", "visitors"];
    if (tabParam && validTabs.includes(tabParam)) {
      return tabParam;
    }
    if (tabParam === "employees") return "staff";
    return "students";
  };

  const activeTab = getInitialTab();

  // Update tab state and URL query parameter
  const handleTabChange = (tabId) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tabId);
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
  
  // Apply comprehensive site search filter if query is present
  if (query) {
    globalSearchResults = contentService.searchSite(query);
    activeServices = globalSearchResults.services;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/services?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push("/services");
    }
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
          </div>

          {/* Tabs Navigation (Interactive Animated Category Selector) */}
          {!query && (
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
          )}

          {/* 1. Bento Grid Services */}
          <h2 style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "16px", marginTop: query ? "20px" : "0" }}>
            🛠️ {locale === "ar" ? "الخدمات المنظومية" : "Systemic Services"} {query && `(${activeServices.length})`}
          </h2>

          <div className={styles.servicesGrid}>
            {activeServices.length > 0 ? (
              activeServices.map((service, index) => {
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
                            {locale === "ar" ? (
                              <path d="M19 12H5M12 19l-7-7 7-7"/>
                            ) : (
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            )}
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
                            {locale === "ar" ? (
                              <path d="M19 12H5M12 19l-7-7 7-7"/>
                            ) : (
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            )}
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
              })
            ) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>
                {locale === "ar" ? "لا توجد خدمات مطابقة لتعبيرات البحث." : "No matching services found."}
              </div>
            )}
          </div>

          {/* 2. Colleges Match Section */}
          {query && globalSearchResults && globalSearchResults.colleges.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h2 style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "16px" }}>
                🏛️ {locale === "ar" ? "الكليات والمعاهد المطابقة" : "Matching Colleges"} ({globalSearchResults.colleges.length})
              </h2>
              <div className={styles.servicesGrid}>
                {globalSearchResults.colleges.map((col) => (
                  <a key={col.id} href="/colleges" className={styles.serviceCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconWrapper}>
                        <TechIcon type="academic" size={32} />
                      </div>
                    </div>
                    <h3>{locale === "ar" ? col.arName : col.enName}</h3>
                    <p>{locale === "ar" ? col.arDesc : col.enDesc}</p>
                    <div className={styles.cardFooter}>
                      <span>{locale === "ar" ? "استكشف الكلية" : "Explore College"}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 3. Research & Al-Qalzam Issues Match Section */}
          {query && globalSearchResults && globalSearchResults.research.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h2 style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "16px" }}>
                📚 {locale === "ar" ? "أعداد مجلة القلزم والبحوث" : "Research & Journal Issues"} ({globalSearchResults.research.length})
              </h2>
              <div className={styles.servicesGrid}>
                {globalSearchResults.research.map((paper) => (
                  <a key={paper.num} href={paper.link} target="_blank" rel="noopener noreferrer" className={styles.serviceCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconWrapper}>
                        <TechIcon type="library" size={32} />
                      </div>
                      <span className={styles.badge}>{locale === "ar" ? `العدد ${paper.num}` : `Issue ${paper.num}`}</span>
                    </div>
                    <h3>{locale === "ar" ? paper.arSub : paper.enSub}</h3>
                    <p>{locale === "ar" ? paper.arName : paper.enName}</p>
                    <div className={styles.cardFooter}>
                      <span>{locale === "ar" ? "تحميل العدد PDF" : "Download Issue PDF"}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 4. News Match Section */}
          {query && globalSearchResults && globalSearchResults.news.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h2 style={{ fontSize: "1.3rem", color: "var(--accent)", marginBottom: "16px" }}>
                📰 {locale === "ar" ? "الأخبار والفعاليات" : "Matching News"} ({globalSearchResults.news.length})
              </h2>
              <div className={styles.servicesGrid}>
                {globalSearchResults.news.map((item) => (
                  <a key={item.id} href="/news" className={styles.serviceCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconWrapper}>
                        <TechIcon type="moodle" size={32} />
                      </div>
                      <span className={styles.badge}>{item.date}</span>
                    </div>
                    <h3>{locale === "ar" ? item.arTitle : item.enTitle}</h3>
                    <p>{locale === "ar" ? item.arExcerpt : item.enExcerpt}</p>
                    <div className={styles.cardFooter}>
                      <span>{locale === "ar" ? "قراءة الخبر" : "Read Article"}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
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
