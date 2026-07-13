"use client";

import React from "react";
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
              <img
                src="/images/about-uni.png"
                alt="University Building"
                className={styles.aboutImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="section-padding" style={{ background: "var(--platinum)" }}>
        <div className="container">
          <div className={styles.visionMissionGrid}>
            <div className={styles.visionCard}>
              <div className={styles.cardIcon}>👁️‍🗨️</div>
              <h3>{t("about_vision_title")}</h3>
              <p>{t("about_vision_text")}</p>
            </div>
            
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>🎯</div>
              <h3>{t("about_mission_title")}</h3>
              <p>{t("about_mission_text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className={styles.objectivesBox}>
            <h3>{t("about_objectives_title")}</h3>
            <div className={styles.objectivesList}>
              {objectives.map((obj, index) => (
                <div key={index} className={styles.objectiveItem}>
                  <div className={styles.objNumber}>{index + 1}</div>
                  <div className={styles.objText}>{obj}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
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

          <div className={styles.timelineSection}>
            <div className={styles.timeline}>
              {timelineEvents.map((event, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineYear}>{event.year}</div>
                  <div className={styles.timelineTitle}>
                    {locale === "ar" ? event.arTitle : event.enTitle}
                  </div>
                  <div className={styles.timelineDesc}>
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
