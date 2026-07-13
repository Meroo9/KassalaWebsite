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
              📘
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
              🐦
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
              📺
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              💼
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
              <span className={styles.contactIcon}>📍</span>
              <span>{t("contact_address")}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <span>{t("contact_phone")}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
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
