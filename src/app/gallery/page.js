"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { contentService } from "../../services/contentService";
import styles from "./gallery.module.css";

export default function Gallery() {
  const { locale, t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGalleryItems(contentService.getGallery());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: "all", labelKey: "gallery_cat_all" },
    { id: "campus", labelKey: "gallery_cat_campus" },
    { id: "events", labelKey: "gallery_cat_events" },
    { id: "graduations", labelKey: "gallery_cat_graduations" },
  ];

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <div style={{ flex: 1 }}>
      {/* Page Banner */}
      <section className="page-banner emerald-gold-gradient">
        <div className="container animate-fade-in">
          <h1>{t("nav_gallery")}</h1>
          <p>{t("gallery_subtitle")}</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
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

          {/* Gallery Items Grid */}
          <div className={styles.galleryGrid}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={styles.galleryItem}
                onClick={() => setLightboxItem(item)}
              >
                <Image
                  src={item.image}
                  alt={locale === "ar" ? item.arCaption : item.enCaption}
                  width={1200}
                  height={800}
                  unoptimized
                  loading="lazy"
                  className={styles.galleryImg}
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayText}>
                    {locale === "ar" ? item.arCaption : item.enCaption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxItem && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setLightboxItem(null)}
              aria-label="Close Lightbox"
            >
              &times;
            </button>
            <Image
              src={lightboxItem.image}
              alt="Expanded view"
              width={1600}
              height={1000}
              unoptimized
              className={styles.lightboxImg}
            />
            <div className={styles.caption}>
              {locale === "ar" ? lightboxItem.arCaption : lightboxItem.enCaption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
