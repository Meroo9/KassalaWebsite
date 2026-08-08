"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./about.module.css";

export default function About() {
  const { locale, t } = useLanguage();

  const objectives = [
    t("about_objectives_list")[0] || "تطوير البرامج والمناهج الأكاديمية لمواكبة التطور المعرفي واحتياجات سوق العمل.",
    t("about_objectives_list")[1] || "تشجيع ودعم البحث العلمي والابتكار ونشر المجلات الأكاديمية المحكمة.",
    t("about_objectives_list")[2] || "تعزيز دور الجامعة في تنمية المجتمع وتقديم الحلول والاستشارات لولاية كسلا.",
    t("about_objectives_list")[3] || "توطين التعليم العالي وتهيئة البيئة الأكاديمية والتقنية الحديثة للطلاب والباحثين.",
  ];

  const timelineEvents = [
    {
      year: "1990",
      arTitle: "المرسوم الجمهوري بالتأسيس",
      enTitle: "Presidential Decree of Establishment",
      arDesc: "تأسست جامعة كسلا بموجب مرسوم جمهوري لتلبية احتياجات التعليم العالي في شرق السودان ببدء كليتي التربية والطب.",
      enDesc: "Established by presidential decree to meet higher education demands in Eastern Sudan, starting with Education and Medicine.",
    },
    {
      year: "1996 - 2005",
      arTitle: "مرحلة التوسع وتأسيس كليات جديدة",
      enTitle: "Expansion & Founding of New Colleges",
      arDesc: "تأسيس كليات الاقتصاد، الهندسة، علوم الحاسوب، الزراعة، الدراسات الإسلامية، والعلوم لتوسيع الخيارات الأكاديمية.",
      enDesc: "Founding of Economics, Engineering, CS & IT, Agriculture, Islamic Studies, and Science to expand academic options.",
    },
    {
      year: "2015",
      arTitle: "إطلاق عمادة البحث العلمي والدراسات العليا",
      enTitle: "Launching Deanship of Scientific Research & Graduate Studies",
      arDesc: "تأسيس كيان مستقل للبحث العلمي وإطلاق مجلات علمية محكمة لتشجيع النشر الأكاديمي والماجستير والدكتوراه.",
      enDesc: "Establishing a separate deanship for research and publishing peer-reviewed journals, launching MSc and PhD programs.",
    },
    {
      year: "2026",
      arTitle: "التحول الرقمي والهوية الجديدة للموقع",
      enTitle: "Digital Transformation & New Web Identity",
      arDesc: "إعادة تصميم هوية موقع الجامعة بالكامل ليصبح واجهة أكاديمية تفاعلية حديثة تواكب أفضل المعايير التقنية العالمية.",
      enDesc: "Complete redesign of the university portal into a modern interactive interface meeting top global web standards.",
    },
  ];

  return (
    <div style={{ flex: 1 }}>
      {/* Page Banner */}
      <section className="page-banner emerald-gold-gradient">
        <div className="container animate-fade-in">
          <h1>{t("about_title")}</h1>
          <p>{locale === "ar" ? "منارة العلم والمعرفة بشرق السودان" : "A Beacon of Knowledge in Eastern Sudan"}</p>
        </div>
      </section>

      {/* Main History & Content */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2>{t("about_history_title")}</h2>
              <p>{t("about_history_text")}</p>
              <p>
                {locale === "ar"
                  ? "تسعى جامعة كسلا اليوم، بإدارتها وكلياتها المتميزة، لتسخير كافة التقنيات لتطوير العملية التعليمية وتوفير تعليم متميز يرتكز على المعرفة والابتكار وبناء شراكات فاعلة وتنمية الطلاب معرفياً ومهارياً."
                  : "Today, University of Kassala seeks to harness all modern technologies to advance learning, offer distinguished education centered on knowledge and innovation, build strong partnerships, and develop students' cognitive skills."}
              </p>
            </div>
            <div className={styles.aboutImageWrapper}>
              <Image
                src="/images/about-uni.png"
                alt="University Building"
                width={1200}
                height={800}
                className={styles.aboutImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards (With Motion Graphics & Hover Glow) */}
      <section className="section-padding" style={{ background: "var(--platinum)" }}>
        <div className="container">
          <style jsx global>{`
            @keyframes pulseBadge {
              0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 160, 23, 0.4); }
              50% { transform: scale(1.08); box-shadow: 0 0 0 12px rgba(212, 160, 23, 0); }
            }
            @keyframes timelineNodeGlow {
              0%, 100% { transform: scale(1); box-shadow: 0 0 0 4px #0D5C34, 0 0 12px rgba(212, 160, 23, 0.6); }
              50% { transform: scale(1.25); box-shadow: 0 0 0 8px #053B1E, 0 0 20px rgba(243, 203, 101, 0.9); }
            }
          `}</style>

          <div className={styles.visionMissionGrid}>
            <div
              className={styles.visionCard}
              style={{
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = "#d4a017";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(13, 92, 52, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "var(--box-shadow)";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(13, 92, 52, 0.1) 0%, rgba(212, 160, 23, 0.2) 100%)",
                  border: "2px solid #d4a017",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  animation: "pulseBadge 3s infinite ease-in-out"
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D5C34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3>{t("about_vision_title")}</h3>
              <p>{t("about_vision_text")}</p>
            </div>
            
            <div
              className={styles.missionCard}
              style={{
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = "#d4a017";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(13, 92, 52, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "var(--box-shadow)";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(212, 160, 23, 0.2) 0%, rgba(13, 92, 52, 0.1) 100%)",
                  border: "2px solid #0D5C34",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  animation: "pulseBadge 3s infinite ease-in-out 1.5s"
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h3>{t("about_mission_title")}</h3>
              <p>{t("about_mission_text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section (Interactive Animated Grid) */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className={styles.objectivesBox} style={{ background: "linear-gradient(135deg, #053B1E 0%, #0D5C34 100%)", border: "1px solid rgba(212, 160, 23, 0.3)" }}>
            <h3>{t("about_objectives_title")}</h3>
            <div className={styles.objectivesList}>
              {objectives.map((obj, index) => (
                <div
                  key={index}
                  className={styles.objectiveItem}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                    e.currentTarget.style.borderColor = "#f3cb65";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                >
                  <div
                    className={styles.objNumber}
                    style={{
                      background: "linear-gradient(135deg, #f3cb65 0%, #d4a017 100%)",
                      color: "#053B1E",
                      fontWeight: "900",
                      fontSize: "15px",
                      boxShadow: "0 4px 12px rgba(243, 203, 101, 0.3)"
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className={styles.objText} style={{ color: "#fff", fontSize: "1.05rem" }}>{obj}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Historical Timeline (With Animated Pulsing Nodes & Year Badges) */}
      <section className="section-padding" style={{ background: "var(--platinum)" }}>
        <div className="container">
          <div className="section-header">
            <h2>
              {locale === "ar" ? "مسيرة الإنجاز والتميز" : "Milestones & History"}
            </h2>
            <p>
              {locale === "ar"
                ? "تاريخ حافل بالتطوير والتوسع منذ التأسيس وحتى اليوم"
                : "A rich history of academic growth and development from founding to present"}
            </p>
          </div>

          <div className={styles.timelineSection} style={{ border: "1px solid rgba(13, 92, 52, 0.15)", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            <div className={styles.timeline}>
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={styles.timelineItem}
                  style={{
                    padding: "20px 24px",
                    borderRadius: "16px",
                    background: "#FFFFFF",
                    border: "1px solid rgba(13, 92, 52, 0.15)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(-8px)";
                    e.currentTarget.style.borderColor = "#d4a017";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(13, 92, 52, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.borderColor = "rgba(13, 92, 52, 0.15)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.04)";
                  }}
                >
                  <div
                    className={styles.timelineYear}
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(135deg, #0D5C34 0%, #053B1E 100%)",
                      color: "#f3cb65",
                      padding: "4px 14px",
                      borderRadius: "20px",
                      fontSize: "1rem",
                      fontWeight: "800",
                      marginBottom: "10px",
                      border: "1px solid rgba(243, 203, 101, 0.4)"
                    }}
                  >
                    {event.year}
                  </div>
                  <div className={styles.timelineTitle} style={{ color: "#053B1E", fontSize: "1.2rem" }}>
                    {locale === "ar" ? event.arTitle : event.enTitle}
                  </div>
                  <div className={styles.timelineDesc} style={{ color: "#444", fontSize: "0.98rem", lineHeight: "1.7" }}>
                    {locale === "ar" ? event.arDesc : event.enDesc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
