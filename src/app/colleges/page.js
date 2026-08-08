"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { contentService } from "../../services/contentService";
import styles from "./colleges.module.css";

export default function Colleges() {
  const { locale, t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setColleges(contentService.getColleges());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: "all", labelKey: "colleges_filter_all" },
    { id: "medical", labelKey: "colleges_filter_medical" },
    { id: "engineering", labelKey: "colleges_filter_engineering" },
    { id: "humanities", labelKey: "colleges_filter_humanities" },
  ];

  const filteredColleges =
    filter === "all"
      ? colleges
      : colleges.filter((c) => c.category === filter);

  return (
    <div style={{ flex: 1 }}>
      {/* Page Banner */}
      <section className="page-banner emerald-gold-gradient">
        <div className="container animate-fade-in">
          <h1>{t("nav_colleges")}</h1>
          <p>{t("colleges_subtitle")}</p>
        </div>
      </section>

      {/* Filterable Colleges Grid */}
      <section className="section-padding" style={{ background: "transparent" }}>
        <div className="container">
          {/* Category Filter Buttons */}
          <div className={styles.filterContainer}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`${styles.filterBtn} ${
                  filter === cat.id ? styles.activeFilterBtn : ""
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Colleges Cards Grid */}
          <div className={styles.collegesGrid}>
            {filteredColleges.map((college) => (
              <div key={college.id} className={styles.collegeCard} id={college.id}>
                <div className={styles.cardHeader}>
                  <Image
                    src={college.image}
                    alt={locale === "ar" ? college.arName : college.enName}
                    width={1200}
                    height={800}
                    unoptimized
                    loading="lazy"
                    className={styles.collegeImg}
                  />
                  <span className={styles.categoryTag}>
                    {college.category === "medical"
                      ? t("colleges_filter_medical")
                      : college.category === "engineering"
                      ? t("colleges_filter_engineering")
                      : t("colleges_filter_humanities")}
                  </span>
                </div>
                
                <div className={styles.cardBody}>
                  <h3>{locale === "ar" ? college.arName : college.enName}</h3>
                  <p>{locale === "ar" ? college.arDesc : college.enDesc}</p>
                  
                  <div className={styles.cardFooter}>
                    <a
                      href={college.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.portalLink}
                    >
                      {locale === "ar" ? "الموقع الرسمي" : "Official Website"} {locale === "ar" ? "←" : "→"}
                    </a>
                    <span className={styles.deptCount}>
                      {locale === "ar" ? "برامج معتمدة" : "Accredited"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
