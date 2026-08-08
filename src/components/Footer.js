"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import styles from "./Footer.module.css";

export default function Footer() {
  const { locale, t } = useLanguage();
  const pathname = usePathname();

  const currentYear = new Date().getFullYear();

  if (pathname && (pathname.startsWith("/portal") || pathname.startsWith("/admin"))) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerGrid} container`}>
        <div className={styles.footerCol}>
          <h3>{locale === "ar" ? "جامعة كسلا" : "University of Kassala"}</h3>
          <p className={styles.desc}>
            {locale === "ar"
              ? "منارة تعليمية رائدة في شرق السودان تأسست لتقديم برامج أكاديمية متميزة تسهم في بناء مجتمع المعرفة والتنمية المستدامة والبحث العلمي الفاعل."
              : "A leading educational institution in Eastern Sudan, established to offer outstanding academic programs contributing to the knowledge society, sustainable development, and research."}
          </p>
          <div className={styles.socialRow}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3>{locale === "ar" ? "روابط سريعة" : "Quick Links"}</h3>
          <ul className={styles.linksList}>
            <li>
              <Link href="/">{t("nav_home")}</Link>
            </li>
            <li>
              <Link href="/about">{t("nav_about")}</Link>
            </li>
            <li>
              <Link href="/colleges">{t("nav_colleges")}</Link>
            </li>
            <li>
              <Link href="/admissions">{t("nav_admissions")}</Link>
            </li>
            <li>
              <Link href="/news">{t("nav_news")}</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h3>{locale === "ar" ? "الأنظمة الإلكترونية" : "E-Portals"}</h3>
          <ul className={styles.linksList}>
            <li>
              <Link href="/services">{t("service_moodle")}</Link>
            </li>
            <li>
              <Link href="/services">{t("service_portal")}</Link>
            </li>
            <li>
              <Link href="/services">{t("service_library")}</Link>
            </li>
            <li>
              <Link href="/research">{t("qulzum_title")}</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h3>{locale === "ar" ? "اتصل بنا" : "Contact Info"}</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{t("contact_address")}</span>
            </div>
            <div className={styles.contactItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{t("contact_phone")}</span>
            </div>
            <div className={styles.contactItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>{t("contact_email")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.bottomBar} container`}>
        <p>
          &copy; {currentYear} {locale === "ar" ? "جامعة كسلا. جميع الحقوق محفوظة." : "University of Kassala. All Rights Reserved."}
        </p>
      </div>
    </footer>
  );
}
