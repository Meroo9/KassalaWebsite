"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import fallbackData from "../../data/fallbackData.json";
import { matchesSearch } from "../../utils/security";
import styles from "./news.module.css";

export default function News() {
  const { locale, t } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [newsSearchQuery, setNewsSearchQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/news?per_page=12");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();

        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error("No live news returned, using local fallback");
        }
        
        const mappedNews = data.map((post) => {
          const defaultImage = "/images/about-uni.png";
          let imageUrl = defaultImage;
          if (post.jetpack_featured_media_url) {
            imageUrl = post.jetpack_featured_media_url.startsWith("http")
              ? `/api/proxy-image?url=${encodeURIComponent(post.jetpack_featured_media_url)}`
              : post.jetpack_featured_media_url;
          }
          
          return {
            id: post.id,
            date: post.date ? post.date.split("T")[0] : "2026-07-05",
            arTitle: (post.title?.rendered || "").replace(/&nbsp;/g, " ").replace(/&#8230;/g, "...").replace(/&#8211;/g, "-"),
            enTitle: (post.title?.rendered || "").replace(/&nbsp;/g, " ").replace(/&#8230;/g, "...").replace(/&#8211;/g, "-"),
            arExcerpt: (post.excerpt?.rendered || "").replace(/<[^>]*>/g, "").substring(0, 150) + "...",
            enExcerpt: (post.excerpt?.rendered || "").replace(/<[^>]*>/g, "").substring(0, 150) + "...",
            arContent: post.content?.rendered || post.excerpt?.rendered || "",
            enContent: post.content?.rendered || post.excerpt?.rendered || "",
            image: imageUrl,
          };
        });
        
        setNews(mappedNews);
        setError(false);
      } catch (err) {
        // Map local fallback items to have content property
        const mappedFallback = fallbackData.news.map((item) => ({
          ...item,
          image: item.image || "/images/about-uni.png",
          arContent: `<p>${item.arExcerpt}</p>`,
          enContent: `<p>${item.enExcerpt}</p>`,
        }));
        setNews(mappedFallback);
        setError(false);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [locale]);

  const displayNews = newsSearchQuery.trim()
    ? news.filter((n) => matchesSearch(`${n.arTitle} ${n.enTitle} ${n.arExcerpt} ${n.enExcerpt}`, newsSearchQuery))
    : news;

  return (
    <div style={{ flex: 1 }}>
      {/* Page Banner */}
      <section className="page-banner emerald-gold-gradient">
        <div className="container animate-fade-in">
          <h1>{t("news_title")}</h1>
          <p>{t("news_subtitle")}</p>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          
          {/* Live News Search Bar */}
          <div style={{ maxWidth: "600px", margin: "0 auto 35px", position: "relative" }}>
            <input
              type="text"
              placeholder={locale === "ar" ? "ابحث في الأخبار والفعاليات الجامعية..." : "Search university news and events..."}
              value={newsSearchQuery}
              onChange={(e) => setNewsSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: "30px",
                border: "2px solid rgba(13, 92, 52, 0.2)",
                fontSize: "0.95rem",
                outline: "none",
                background: "var(--platinum, #f8fbf9)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
              }}
            />
            {newsSearchQuery && (
              <button
                onClick={() => setNewsSearchQuery("")}
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

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div className={styles.spinner}></div>
              <p style={{ color: "var(--primary)", fontWeight: "600" }}>{t("news_api_loading")}</p>
            </div>
          ) : displayNews.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 20px", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.1rem" }}>
                {locale === "ar" ? `لم يتم العثور على أخبار مطابقة لـ "${newsSearchQuery}"` : `No news found matching "${newsSearchQuery}"`}
              </p>
            </div>
          ) : (
            <div className={styles.newsGrid}>
                {displayNews.map((item) => (
                  <article
                    key={item.id}
                    className={styles.newsCard}
                    onClick={() => setActivePost(item)}
                  >
                    <div className={styles.imgWrapper}>
                      <Image src={item.image} alt="News thumbnail" width={1200} height={800} unoptimized className={styles.newsImg} />
                    </div>
                    <div className={styles.cardBody}>
                      <span className={styles.date}>{t("news_published_at")}{item.date}</span>
                      <h3>{locale === "ar" ? item.arTitle : item.enTitle}</h3>
                      <p>{locale === "ar" ? item.arExcerpt : item.enExcerpt}</p>
                      <span className={styles.readMore}>
                        {t("news_read_more")} {locale === "ar" ? "←" : "→"}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
          )}
        </div>
      </section>

      {/* News Detail Modal Popup */}
      {activePost && (
        <div className={styles.modalOverlay} onClick={() => setActivePost(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing
          >
            <button
              className={styles.closeBtn}
              onClick={() => setActivePost(null)}
              aria-label="Close News Modal"
            >
              &times;
            </button>
            <Image src={activePost.image} alt="Full news image" width={1600} height={1000} unoptimized className={styles.modalImg} />
            <div className={styles.modalBody}>
              <span className={styles.modalDate}>
                {t("news_published_at")}{activePost.date}
              </span>
              <h2>
                {locale === "ar" ? activePost.arTitle : activePost.enTitle}
              </h2>
              <div
                className={styles.modalText}
                dangerouslySetInnerHTML={{
                  __html: locale === "ar" ? activePost.arContent : activePost.enContent,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
