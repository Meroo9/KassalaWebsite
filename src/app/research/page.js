"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { contentService } from "../../services/contentService";
import styles from "./research.module.css";

export default function Research() {
  const { locale, t } = useLanguage();
  const [theme, setTheme] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setTheme(contentService.getThemeSettings());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Al-Qalzam Issues list with specific PDF downloads from Kassala University site
  const qalzamIssues = [
    { num: 1, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 1", enSub: "Issue 1", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
    { num: 2, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 2", enSub: "Issue 2", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
    { num: 3, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 3", enSub: "Issue 3", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
    { num: 4, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 4", enSub: "Issue 4", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
    { num: 5, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 5", enSub: "Issue 5", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
    { num: 6, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 6", enSub: "Issue 6", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
    { num: 7, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 7", enSub: "Issue 7", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
    { num: 8, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 8", enSub: "Issue 8", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
    { num: 9, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 9", enSub: "Issue 9", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Islamia.pdf" },
    { num: 10, arName: "مجلة القلزم", enName: "Al-Qalzam Journal", arSub: "العدد 10", enSub: "Issue 10", link: "https://kassalauni.edu.sd/nw/wp-content/uploads/2021/06/Tarbia.pdf" },
  ];

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
                  {locale === "ar" ? "بوابة الابتكار" : "Innovation Portal"}
                </span>
                <h1 className={styles.heroTitle}>
                  {locale === "ar" ? "مستودع البحث العلمي والابتكار" : "Scientific Research & Innovation Repository"}
                </h1>
                <p className={styles.heroDesc}>
                  {locale === "ar" 
                    ? "نلتزم في جامعة كسلا بتعزيز بيئة بحثية متقدمة تسهم في حل القضايا المجتمعية ودفع عجلة التنمية. استكشف إنتاجنا الفكري والأكاديمي عبر منصاتنا الرقمية الحديثة."
                    : "At Kassala University, we are committed to fostering an advanced research environment that contributes to solving societal issues and accelerating development. Explore our intellectual and academic output through our modern digital platforms."
                  }
                </p>
              </div>
              <div className={styles.heroRight}>
                <span className={`material-symbols-outlined ${styles.biotechIcon}`}>
                  biotech
                </span>
              </div>
            </div>
          </section>

          {/* Journals Bento Grid Section */}
          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={`material-symbols-outlined ${styles.sectionTitleIcon}`}>
                  menu_book
                </span>
                {locale === "ar" ? "إصدارات مجلة القلزم" : "Al-Qalzam Journal Issues"}
              </h2>
              <span className={styles.headerBadge}>
                {locale === "ar" ? "الأعداد من 1 إلى 10" : "Issues 1 to 10"}
              </span>
            </div>

            <div className={styles.journalGrid}>
              {qalzamIssues.map((issue) => (
                <div key={issue.num} className={styles.issueCard}>
                  <div className={styles.issueNumBox}>
                    <span className={styles.issueNum}>{issue.num}</span>
                  </div>
                  <div className={styles.issueInfo}>
                    <h3 className={styles.issueTitle}>
                      {locale === "ar" ? issue.arName : issue.enName}
                    </h3>
                    <p className={styles.issueSub}>
                      {locale === "ar" ? issue.arSub : issue.enSub}
                    </p>
                  </div>
                  <a 
                    href={issue.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadBtn}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>
                      download
                    </span>
                    {locale === "ar" ? "تحميل" : "Download"}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Mini Research Repository (Categories) */}
          <section className={styles.sectionBlock} style={{ marginBottom: "0px" }}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: "40px" }}>
              <span className={`material-symbols-outlined ${styles.sectionTitleIcon}`} style={{ color: "var(--accent)" }}>
                category
              </span>
              {locale === "ar" ? "تصنيفات المستودع الرقمي" : "Digital Repository Categories"}
            </h2>

            <div className={styles.categoryGrid}>
              {categories.map((cat) => (
                <a key={cat.id} className={styles.categoryLink} href="#">
                  <div className={styles.categoryCard}>
                    <div className={styles.iconWrapper}>
                      <span className={`material-symbols-outlined ${styles.categoryIcon}`}>
                        {cat.icon}
                      </span>
                    </div>
                    <h3 className={styles.categoryCardH3}>
                      {locale === "ar" ? cat.arTitle : cat.enTitle}
                    </h3>
                    <p className={styles.categoryDesc}>
                      {locale === "ar" ? cat.arDesc : cat.enDesc}
                    </p>
                    <div className={styles.browseLink}>
                      {locale === "ar" ? "تصفح الأبحاث" : "Browse Research"}
                      <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>
                        {locale === "ar" ? "arrow_back" : "arrow_forward"}
                      </span>
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
