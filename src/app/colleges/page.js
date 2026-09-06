"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { contentService } from "../../services/contentService";
import { matchesSearch } from "../../utils/security";
import styles from "./colleges.module.css";

export default function Colleges() {
  const { locale, t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [colleges, setColleges] = useState([]);
  const [collegeSearchQuery, setCollegeSearchQuery] = useState("");

  useEffect(() => {
    const updateColleges = () => setColleges(contentService.getColleges());
    updateColleges();
    window.addEventListener("storage", updateColleges);
    return () => window.removeEventListener("storage", updateColleges);
  }, []);

  const categories = [
    { id: "all", labelKey: "colleges_filter_all" },
    { id: "medical", labelKey: "colleges_filter_medical" },
    { id: "engineering", labelKey: "colleges_filter_engineering" },
    { id: "humanities", labelKey: "colleges_filter_humanities" },
  ];

  const filteredColleges = colleges.filter((c) => {
    const matchesCategory = filter === "all" || c.category === filter;
    const matchesQuery = !collegeSearchQuery.trim() || matchesSearch(`${c.arName} ${c.enName} ${c.arDesc} ${c.enDesc}`, collegeSearchQuery);
    return matchesCategory && matchesQuery;
  });

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

          {/* Live Search Bar for Colleges */}
          <div style={{ maxWidth: "550px", margin: "0 auto 25px", position: "relative" }}>
            <input
              type="text"
              placeholder={locale === "ar" ? "ابحث عن كلية أو تخصص (حاسوب، طب، هندسة، تربية...)" : "Search college or major (Computer, Medicine, Engineering...)"}
              value={collegeSearchQuery}
              onChange={(e) => setCollegeSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 20px",
                borderRadius: "25px",
                border: "2px solid rgba(13, 92, 52, 0.2)",
                fontSize: "0.95rem",
                outline: "none",
                background: "var(--platinum, #f8fbf9)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
              }}
            />
            {collegeSearchQuery && (
              <button
                onClick={() => setCollegeSearchQuery("")}
                style={{
                  position: "absolute",
                  left: locale === "ar" ? "15px" : "auto",
                  right: locale === "ar" ? "auto" : "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  color: "#999"
                }}
              >
                ✕
              </button>
            )}
          </div>

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
                  <div className={styles.iconWrapper}>
                    <Image
                      src={college.image}
                      alt={locale === "ar" ? college.arName : college.enName}
                      width={96}
                      height={96}
                      unoptimized
                      loading="lazy"
                      className={styles.collegeImg}
                    />
                  </div>
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
