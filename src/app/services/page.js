"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { contentService } from "../../services/contentService";
import { cleanSearchQuery } from "../../utils/security";
import styles from "./services.module.css";
import TechIcon from "../../components/TechIcon";

function ServicesContent() {
  const { locale, t } = useLanguage();
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

  const [activeTab, setActiveTab] = useState(getInitialTab());

  // Listen for search parameters changes to keep tab state synchronized
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const validTabs = ["students", "faculty", "staff", "visitors"];
    if (tabParam && validTabs.includes(tabParam)) {
      setActiveTab(tabParam);
    } else if (tabParam === "employees") {
      setActiveTab("staff");
    } else if (!tabParam) {
      setActiveTab("students");
    }
  }, [searchParams]);

  // Update tab state and URL query parameter
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tabId);
    router.push(`/services?${params.toString()}`);
  };

  const tabs = [
    { id: "students", labelKey: "tab_students" },
    { id: "faculty", labelKey: "tab_faculty" },
    { id: "staff", labelKey: "tab_staff" },
    { id: "visitors", labelKey: "tab_visitors" },
  ];

  let activeServices = contentService.getServices(activeTab);
  
  // Apply search filter if query is present
  if (query) {
    const allServices = [
      ...contentService.getServices("students"),
      ...contentService.getServices("faculty"),
      ...contentService.getServices("staff"),
      ...contentService.getServices("visitors")
    ];
    
    // De-duplicate by ID
    const uniqueServices = Array.from(new Map(allServices.map(s => [s.id, s])).values());
    
    activeServices = uniqueServices.filter(service => {
      const title = service.titleKey ? t(service.titleKey) : (locale === "ar" ? service.arTitle : service.enTitle);
      const desc = service.descKey ? t(service.descKey) : (locale === "ar" ? service.arDesc : service.enDesc);
      return title.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
    });
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
              {locale === "ar" ? "بوابة الخدمات الإلكترونية" : "Electronic Services Portal"}
            </h1>
            <p className={styles.pageDesc}>
              {locale === "ar" 
                ? "منصة رقمية متكاملة لخدمة منسوبي جامعة كسلا، تتيح وصولاً سريعاً وآمناً لكافة الخدمات الأكاديمية والإدارية."
                : "A unified digital platform for Kassala University affiliates, offering secure, quick access to academic and administrative systems."}
            </p>
          </header>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearchSubmit} className={styles.searchBox}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>
                search
              </span>
              <input
                type="text"
                placeholder={locale === "ar" ? "ابحث عن خدمة (مثال: تسجيل المقررات، استخراج شهادة...)" : "Search for a service (e.g. course registration, certificate...)"}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn}>
                {locale === "ar" ? "بحث" : "Search"}
              </button>
            </form>
          </div>

          {/* Tabs Navigation */}
          {!query && (
            <div className={styles.tabContainer}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTabBtn : ""}`}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>
          )}

          {/* Bento Grid Services */}
          <div className={styles.servicesGrid}>
            {activeServices.length > 0 ? (
              activeServices.map((service, index) => {
                const title = service.titleKey ? t(service.titleKey) : (locale === "ar" ? service.arTitle : service.enTitle);
                const desc = service.descKey ? t(service.descKey) : (locale === "ar" ? service.arDesc : service.enDesc);

                // Highlight second card (index === 1) as the Stitch most requested card
                const isHighlighted = index === 1;
                // Make 4th card (index === 3) span 2 columns and display horizontally as in Stitch bento grid
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
                      // Bento Span 2-Column Horizontal View
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
                          <span className={`material-symbols-outlined ${styles.arrowIcon}`}>
                            {locale === "ar" ? "arrow_back" : "arrow_forward"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      // Normal Column View
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
                          <span className={`material-symbols-outlined ${styles.arrowIcon}`}>
                            {locale === "ar" ? "arrow_back" : "arrow_forward"}
                          </span>
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
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--text-muted)", fontWeight: "600" }}>
                {locale === "ar" ? "لا توجد خدمات مطابقة لبحثك حالياً." : "No matching services found."}
              </div>
            )}
          </div>

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
