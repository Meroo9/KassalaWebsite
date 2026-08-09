"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { contentService } from "../../../services/contentService";
import styles from "./page.module.css";

export default function DynamicCustomPage() {
  const params = useParams();
  const slug = params?.slug;
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const timer = setTimeout(() => {
      const foundPage = contentService.getPageBySlug(slug);
      setPage(foundPage);
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.dynamicPage} style={{ textAlign: "center", padding: "120px 20px" }}>
        <p style={{ color: "#e9c349", fontSize: "1.2rem", fontWeight: "bold" }}>
          {isAr ? "جاري تحميل تفاصيل الصفحة..." : "Loading page details..."}
        </p>
      </div>
    );
  }

  if (!page || (!page.active && typeof window !== "undefined" && !window.location.search.includes("preview=true"))) {
    return (
      <div className={styles.dynamicPage} style={{ textAlign: "center", padding: "120px 20px" }}>
        <h1 style={{ fontSize: "2rem", color: "#e9c349", marginBottom: "16px" }}>
          {isAr ? "الصفحة غير متاحة حالياً" : "Page Not Found or Expired"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "24px" }}>
          {isAr
            ? "عفواً، هذه الصفحة المخصصة غير متوفرة أو انتهت فترة نشرها الإعلاني."
            : "Sorry, this custom page is unavailable or its publication period has ended."}
        </p>
        <Link href="/" className={styles.primaryBtn}>
          {isAr ? "العودة للرئيسية" : "Return to Homepage"}
        </Link>
      </div>
    );
  }

  const title = isAr ? page.arTitle : page.enTitle;
  const subtitle = isAr ? page.arSubtitle : page.enSubtitle;
  const content = isAr ? page.arContent : page.enContent;

  return (
    <div className={styles.dynamicPage}>
      {/* Hero Banner Section */}
      <section className={styles.heroSection}>
        {page.bannerImage && (
          <Image
            src={page.bannerImage}
            alt={title || "Page Banner"}
            fill
            unoptimized
            className={styles.heroBgImage}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>
            🏛️ {isAr ? "جامعة كسلا - صفحة مخصصة" : "University of Kassala - Official Event"}
          </span>
          <h1 className={styles.heroTitle}>{title}</h1>
          {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
        </div>
      </section>

      {/* Main Content Card */}
      <div className={styles.mainContainer}>
        <div className={styles.contentCard}>
          {/* Main Description */}
          {content && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>
                📌 {isAr ? "عن الفعالية / التفاصيل" : "About Event & Details"}
              </h2>
              <div className={styles.textContent}>{content}</div>
            </div>
          )}

          {/* Agenda / Program Schedule */}
          {page.agenda && page.agenda.length > 0 && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>
                📅 {isAr ? "جدول الفعاليات والمحاور" : "Program & Topics Agenda"}
              </h2>
              <div className={styles.agendaGrid}>
                {page.agenda.map((item, idx) => (
                  <div key={idx} className={styles.agendaItem}>
                    <span className={styles.timeBadge}>{item.time}</span>
                    <span className={styles.agendaTopic}>
                      {isAr ? item.arTopic : item.enTopic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons & Attachments */}
          <div className={styles.actionsGroup}>
            {page.registrationLink && (
              <a
                href={page.registrationLink}
                target={page.registrationLink.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                📝 {isAr ? "التسجيل / المشاركة الآن" : "Register / Participate Now"}
              </a>
            )}

            {page.pdfLink && (
              <a
                href={page.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
              >
                📄 {isAr ? "تحميل الدليل الرسمي (PDF)" : "Download Official Guide (PDF)"}
              </a>
            )}

            <Link href="/" className={styles.secondaryBtn} style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.2)" }}>
              🏠 {isAr ? "العودة للرئيسية" : "Back to Home"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
