"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { locale, toggleLocale, t } = useLanguage();
  const pathname = usePathname();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/services?q=${encodeURIComponent(searchQuery)}`;
  };

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

  // Close drawer when pathname changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDrawerOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const mainLinks = [
    { href: "/", labelKey: "nav_home" },
    { href: "/about", labelKey: "nav_about" },
    { href: "/colleges", labelKey: "nav_colleges" },
    { href: "/services", labelKey: "nav_services" },
  ];

  const secondaryLinks = [
    { href: "/admissions", labelKey: "nav_admissions" },
    { href: "/news", labelKey: "nav_news" },
    { href: "/research", labelKey: "nav_research" },
    { href: "/gallery", labelKey: "nav_gallery" },
    { href: "/contact", labelKey: "nav_contact" },
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
            <img
              src="https://kassalauni.edu.sd/nw/wp-content/uploads/2022/10/cropped-Kassalauni_logo-removebg-preview.png"
              alt="Kassala University Logo"
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
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Action Area (Lang Button + Sidebar Toggle) */}
          <div className={styles.actionArea}>
            
            {/* Animated Search Box */}
            <form onSubmit={handleSearchSubmit} className={`${styles.searchContainer} ${isSearchOpen ? styles.searchActive : ""}`}>
              <input
                type="text"
                placeholder={locale === "ar" ? "ابحث عن كلية، تخصص، أو خدمة..." : "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.navbarSearchInput}
              />
              <button
                type="button"
                className={styles.searchIconBtn}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle Search"
              >
                🔍
              </button>
            </form>

            <button onClick={toggleLocale} className={styles.langBtn} aria-label="Toggle Language">
              🌐 {locale === "ar" ? "English" : "العربية"}
            </button>

            {/* Sidebar toggle button (Visible on all sizes to open drawer with remaining links) */}
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

      {/* ---------------------------------------------------- */}
      {/* Sidebar Drawer Layout Component                     */}
      {/* ---------------------------------------------------- */}
      
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
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </div>

          {/* Secondary Links (Visible on all sizes inside the drawer) */}
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
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
