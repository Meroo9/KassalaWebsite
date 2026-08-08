"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { locale, toggleLocale, t } = useLanguage();
  const pathname = usePathname();

  const isAr = locale === "ar";

  const notifications = [
    { id: 1, titleAr: "فتح باب التقديم الإلكتروني للطلاب المستجدين", titleEn: "Admissions Open for New Applicants", date: "2026-08-01", type: "urgent" },
    { id: 2, titleAr: "بداية التسجيل للفصل الدراسي الأول 2026/2027", titleEn: "Semester 1 Registration Starts", date: "2026-09-15", type: "info" },
    { id: 3, titleAr: "جدول امتحانات منتصف الفصل الدراسي", titleEn: "Midterm Exams Schedule Released", date: "2026-11-10", type: "info" }
  ];

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
      setIsNotifOpen(false);
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
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>

          {/* Action Area (Search + Notifs + Lang + Drawer Toggle) */}
          <div className={styles.actionArea} style={{ position: "relative" }}>
            
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

            {/* Notification Bell Center Icon */}
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "38px",
                height: "38px",
                color: "#fff",
                cursor: "pointer",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label="Notifications"
            >
              🔔
              <span style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                background: "#e53935",
                color: "#fff",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                fontSize: "10px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {notifications.length}
              </span>
            </button>

            {/* Notification Popover Box */}
            {isNotifOpen && (
              <div style={{
                position: "absolute",
                top: "50px",
                left: isAr ? "0" : "auto",
                right: isAr ? "auto" : "0",
                width: "300px",
                background: "#121b2d",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                padding: "16px",
                zIndex: 10000,
                color: "#fff"
              }}>
                <strong style={{ display: "block", fontSize: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "10px" }}>
                  📣 {isAr ? "التنبيهات والمواعيد الأكاديمية" : "Academic Notifications"}
                </strong>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {notifications.map((n) => (
                    <div key={n.id} style={{ background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "8px", borderRight: isAr ? "3px solid #64b5f6" : "none", borderLeft: !isAr ? "3px solid #64b5f6" : "none" }}>
                      <span style={{ fontSize: "12px", fontWeight: "bold", display: "block" }}>
                        {isAr ? n.titleAr : n.titleEn}
                      </span>
                      <small style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>📅 {n.date}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                  {t(link.labelKey)}
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
