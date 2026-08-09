"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import fallbackData from "../../data/fallbackData.json";
import styles from "./news.module.css";

export default function News() {
  const { locale, t } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activePost, setActivePost] = useState(null);

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
          const defaultImage = fallbackData.news[0].image;
          
          return {
            id: post.id,
            date: post.date.split("T")[0],
            arTitle: post.title.rendered.replace(/&nbsp;/g, " ").replace(/&#8230;/g, "...").replace(/&#8211;/g, "-"),
            enTitle: post.title.rendered.replace(/&nbsp;/g, " ").replace(/&#8230;/g, "...").replace(/&#8211;/g, "-"),
            arExcerpt: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
            enExcerpt: post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
            arContent: post.content.rendered,
            enContent: post.content.rendered,
            image: post.jetpack_featured_media_url ? `/api/proxy-image?url=${encodeURIComponent(post.jetpack_featured_media_url)}` : defaultImage,
          };
        });
        
        setNews(mappedNews);
        setError(false);
      } catch (err) {
        console.error("Failed fetching live news page from Kassala API:", err);
        // Map local fallback items to have content property
        const mappedFallback = fallbackData.news.map((item) => ({
          ...item,
          arContent: `<p>${item.arExcerpt}</p><p>${locale === "ar" ? "هذا النص هو محتوى تجريبي للأخبار المعروضة محلياً لجامعة كسلا للتوضيح والتجربة الفنية." : "This text serves as fallback content details for Kassala University local development preview purposes."}</p>`,
          enContent: `<p>${item.enExcerpt}</p><p>This text serves as fallback content details for Kassala University local development preview purposes.</p>`,
        }));
        setNews(mappedFallback);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [locale]);

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
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div className={styles.spinner}></div>
              <p style={{ color: "var(--primary)", fontWeight: "600" }}>{t("news_api_loading")}</p>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ background: "rgba(212, 175, 55, 0.15)", border: "1px solid var(--accent)", borderRadius: "8px", padding: "12px 20px", marginBottom: "40px", fontSize: "0.9rem", color: "var(--primary-dark)", textAlign: "center" }}>
                  ⚠️ {t("news_api_error")}
                </div>
              )}
              
              <div className={styles.newsGrid}>
                {news.map((item) => (
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
            </>
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
