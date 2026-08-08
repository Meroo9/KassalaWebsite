"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { contentService } from "../../services/contentService";
import styles from "./research.module.css";

export default function Research() {
  const { locale } = useLanguage();
  const [theme, setTheme] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const isAr = locale === "ar";

  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme(contentService.getThemeSettings());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Al-Qalzam Issues list with specific PDF downloads from Kassala University site
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
    { num: 10, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 10 - المجلد الخاص بالابتكار", enSub: "Issue 10 - Innovation Special", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
  ];

  const filteredIssues = qalzamIssues.filter(item => {
    const text = (item.arSub + " " + item.enSub + " " + item.arName).toLowerCase();
    return text.includes(searchQuery.toLowerCase());
  });

  // Digital Repository Categories
  const categories = [
    {
      id: "medical",
      icon: "local_hospital",
      arTitle: "العلوم الطبية والصحية",
      enTitle: "Medical & Health Sciences",
      arDesc: "أبحاث في الطب، الصيدلة، وعلوم التمريض مع التركيز على الأمراض المستوطنة.",
      enDesc: "Research in medicine, pharmacy, and nursing sciences with a focus on endemic diseases."
    },
    {
      id: "islamic",
      icon: "mosque",
      arTitle: "الدراسات الإسلامية والتربوية",
      enTitle: "Islamic & Educational Studies",
      arDesc: "دراسات متعمقة في الفقه، أصول الدين، والمناهج وطرق التدريس الحديثة.",
      enDesc: "In-depth studies in jurisprudence, fundamentals of religion, and modern teaching methodologies."
    },
    {
      id: "engineering",
      icon: "engineering",
      arTitle: "الهندسة والتقنية المتقدمة",
      enTitle: "Engineering & Advanced Technology",
      arDesc: "مشاريع هندسية، ابتكارات برمجية، وتطبيقات الذكاء الاصطناعي في خدمة المجتمع.",
      enDesc: "Engineering projects, software innovations, and artificial intelligence applications serving the community."
    }
  ];

  return (
    <div className={styles.researchPage}>
      {/* Background Glow Elements */}
      <div className={`${styles.glowSphere} ${styles.glowSphere1}`}></div>
      <div className={`${styles.glowSphere} ${styles.glowSphere2}`}></div>

      <main className={styles.mainContent}>
        <div className="container animate-fade-in">
          
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.heroBg}></div>
            <div className={styles.heroCard}>
              <div className={styles.heroLeft}>
                <span className={styles.heroBadge}>
                  {isAr ? "بوابة الابتكار الأكاديمي" : "Academic Innovation Portal"}
                </span>
                <h1 className={styles.heroTitle}>
                  {isAr ? "المستودع الرقمي للبحث العلمي والمجلات المحكمة" : "Scientific Research & Indexed Journals Repository"}
                </h1>
                <p className={styles.heroDesc}>
                  {isAr 
                    ? "نلتزم في جامعة كسلا بتعزيز بيئة بحثية متقدمة تسهم في نشر الأوراق العلمية بالمجلات المحكمة دولياً ودعم التنمية المستدامة."
                    : "At Kassala University, we foster an advanced research environment to publish indexed journals and accelerate regional development."
                  }
                </p>

                {/* Research Metrics Showcase */}
                <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "10px 18px", borderRadius: "10px", backdropFilter: "blur(5px)" }}>
                    <strong style={{ fontSize: "20px", display: "block", color: "#64b5f6" }}>+450</strong>
                    <span style={{ fontSize: "12px", opacity: 0.8 }}>{isAr ? "ورقة بحثية موثقة" : "Indexed Papers"}</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "10px 18px", borderRadius: "10px", backdropFilter: "blur(5px)" }}>
                    <strong style={{ fontSize: "20px", display: "block", color: "#d4a017" }}>10</strong>
                    <span style={{ fontSize: "12px", opacity: 0.8 }}>{isAr ? "أعداد مجلة القلزم" : "Al-Qalzam Issues"}</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.1)", padding: "10px 18px", borderRadius: "10px", backdropFilter: "blur(5px)" }}>
                    <strong style={{ fontSize: "20px", display: "block", color: "#81c784" }}>100%</strong>
                    <span style={{ fontSize: "12px", opacity: 0.8 }}>{isAr ? "تحميل مجاني مباشر PDF" : "Free Direct PDF"}</span>
                  </div>
                </div>
              </div>
              <div className={styles.heroRight}>
                <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "pulseIcon 3s ease-in-out infinite alternate" }}>
                  <path d="M6 18h12"/>
                  <path d="M3 21h18"/>
                  <path d="M12 3v11"/>
                  <path d="M9 14h6"/>
                  <circle cx="12" cy="18" r="1"/>
                  <path d="M12 7a4 4 0 0 1 4 4v1"/>
                  <path d="M12 7a4 4 0 0 0-4 4v1"/>
                </svg>
              </div>
            </div>
          </section>

          {/* Journals Bento Grid Section */}
          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader} style={{ flexWrap: "wrap", gap: "15px" }}>
              <h2 className={styles.sectionTitle}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  <path d="M8 7h8M8 11h6"/>
                </svg>
                {isAr ? "إصدارات مجلة القلزم المحكمة" : "Al-Qalzam Indexed Journal Issues"}
              </h2>

              {/* Research Live Search */}
              <input
                type="text"
                placeholder={isAr ? "🔍 ابحث في أعداد المجلة..." : "🔍 Search journal issues..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  outline: "none",
                  fontSize: "13px",
                  minWidth: "220px"
                }}
              />
            </div>

            <div className={styles.journalGrid}>
              {filteredIssues.map((issue) => (
                <div key={issue.num} className={styles.issueCard}>
                  {/* Book Icon + Issue Number Badge */}
                  <div className={styles.issueNumBox}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      <path d="M8 7h8M8 11h6"/>
                    </svg>
                    <span className={styles.issueNum}>العدد {issue.num}</span>
                  </div>
                  <div className={styles.issueInfo}>
                    <h3 className={styles.issueTitle}>
                      {isAr ? issue.arName : issue.enName}
                    </h3>
                    <p className={styles.issueSub}>
                      {isAr ? issue.arSub : issue.enSub}
                    </p>
                  </div>
                  <a 
                    href={issue.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadBtn}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    {isAr ? "تحميل PDF" : "Download PDF"}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Digital Repository Categories */}
          <section className={styles.sectionBlock} style={{ marginBottom: "0px" }}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: "40px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              {isAr ? "تصنيفات المستودع الرقمي للأبحاث" : "Digital Repository Categories"}
            </h2>

            <div className={styles.categoryGrid}>
              {categories.map((cat) => (
                <a key={cat.id} className={styles.categoryLink} href="#">
                  <div className={styles.categoryCard}>
                    <div className={styles.iconWrapper}>
                      {cat.id === "medical" && (
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 6v12M6 12h12"/>
                          <circle cx="12" cy="12" r="9"/>
                        </svg>
                      )}
                      {cat.id === "islamic" && (
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                      )}
                      {cat.id === "engineering" && (
                        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="4" width="16" height="16" rx="2"/>
                          <rect x="9" y="9" width="6" height="6"/>
                          <line x1="9" y1="1" x2="9" y2="4"/>
                          <line x1="15" y1="1" x2="15" y2="4"/>
                          <line x1="9" y1="20" x2="9" y2="23"/>
                          <line x1="15" y1="20" x2="15" y2="23"/>
                          <line x1="20" y1="9" x2="23" y2="9"/>
                          <line x1="20" y1="15" x2="23" y2="15"/>
                          <line x1="1" y1="9" x2="4" y2="9"/>
                          <line x1="1" y1="15" x2="4" y2="15"/>
                        </svg>
                      )}
                    </div>
                    <h3 className={styles.categoryCardH3}>
                      {isAr ? cat.arTitle : cat.enTitle}
                    </h3>
                    <p className={styles.categoryDesc}>
                      {isAr ? cat.arDesc : cat.enDesc}
                    </p>
                    <div className={styles.browseLink}>
                      {isAr ? "تصفح الأبحاث" : "Browse Research"}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isAr ? (
                          <line x1="19" y1="12" x2="5" y2="12" />
                        ) : (
                          <line x1="5" y1="12" x2="19" y2="12" />
                        )}
                        {isAr ? (
                          <polyline points="12 19 5 12 12 5" />
                        ) : (
                          <polyline points="12 5 19 12 12 19" />
                        )}
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
