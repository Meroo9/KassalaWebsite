"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { contentService } from "../services/contentService";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [customPages, setCustomPages] = useState([]);
  const { locale, toggleLocale, t } = useLanguage();
  const pathname = usePathname();

  const isAr = locale === "ar";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load active custom pages from contentService
  useEffect(() => {
    const loadPages = () => {
      const activePages = contentService.getCustomPages(true);
      setCustomPages(activePages);
    };

    loadPages();
    window.addEventListener("storage", loadPages);
    return () => window.removeEventListener("storage", loadPages);
  }, []);

  // Close drawer when pathname changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDrawerOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const mainLinks = [
    { href: "/", label: t("nav_home") },
    { href: "/about", label: t("nav_about") },
    { href: "/colleges", label: t("nav_colleges") },
    { href: "/services", label: t("nav_services") },
    ...customPages
      .filter((p) => p.location === "main")
      .map((p) => ({
        href: `/pages/${p.slug}`,
        label: isAr ? p.arTitle : p.enTitle,
        isCustom: true,
      })),
  ];

  const secondaryLinks = [
    { href: "/admissions", label: t("nav_admissions") },
    { href: "/news", label: t("nav_news") },
    { href: "/research", label: t("nav_research") },
    { href: "/gallery", label: t("nav_gallery") },
    { href: "/contact", label: t("nav_contact") },
    ...customPages
      .filter((p) => p.location === "secondary")
      .map((p) => ({
        href: `/pages/${p.slug}`,
        label: isAr ? p.arTitle : p.enTitle,
        isCustom: true,
      })),
  ];

  if (pathname && (pathname.startsWith("/portal") || pathname.startsWith("/admin"))) {
    return null;
  }

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={`${styles.navContainer} container`}>
          
          {/* Logo Area */}
          <Link href="/" className={styles.logoArea}>
            <Image
              src="https://kassalauni.edu.sd/nw/wp-content/uploads/2022/10/cropped-Kassalauni_logo-removebg-preview.png"
              alt="Kassala University Logo"
              width={160}
              height={80}
              unoptimized
              className={styles.logoImage}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className={styles.logoText}>
              <span className={styles.title}>
                {locale === "ar" ? "جامعة كسلا" : "University of Kassala"}
              </span>
              <span className={styles.subtitle}>
                {locale === "ar" ? "تأسست 1990م" : "Established 1990"}
              </span>
            </div>
          </Link>

          {/* 4 Main Links displayed in header on desktop (>768px) */}
          <nav className={styles.navMenu}>
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Area (Lang + Drawer Toggle) */}
          <div className={styles.actionArea} style={{ position: "relative" }}>
            <button onClick={toggleLocale} className={styles.langBtn} aria-label="Toggle Language">
              🌐 {locale === "ar" ? "English" : "العربية"}
            </button>

            {/* Sidebar toggle button */}
            <div
              className={styles.drawerToggle}
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Sidebar Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`${styles.drawerOverlay} ${isDrawerOpen ? styles.drawerOverlayActive : ""}`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      {/* Side Drawer panel */}
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.drawerActive : ""}`}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>
            {locale === "ar" ? "قائمة التنقل" : "Navigation"}
          </span>
          <button
            className={styles.closeBtn}
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close Sidebar"
          >
            &times;
          </button>
        </div>

        <nav className={styles.drawerMenu}>
          {/* Main Links (Visible ONLY on mobile devices) */}
          <div className={styles.mobileOnlyLinks}>
            <div className={styles.drawerSectionTitle}>
              {locale === "ar" ? "الصفحات الرئيسية" : "Main Pages"}
            </div>
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.drawerLink} ${isActive ? styles.activeDrawerLink : ""}`}
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Secondary Links */}
          <div>
            <div className={styles.drawerSectionTitle} style={{ marginTop: "10px" }}>
              {locale === "ar" ? "أقسام إضافية" : "More Sections"}
            </div>
            {secondaryLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.drawerLink} ${isActive ? styles.activeDrawerLink : ""}`}
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
