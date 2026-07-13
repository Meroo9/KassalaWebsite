"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./admissions.module.css";

export default function Admissions() {
  const { locale, t } = useLanguage();

  const steps = [
    t("admission_step1"),
    t("admission_step2"),
    t("admission_step3"),
    t("admission_step4"),
  ];

  const calendarEvents = [
    {
      eventKey: "semester_start",
      dateAr: "15 سبتمبر 2026",
      dateEn: "September 15, 2026",
    },
    {
      eventKey: "midterm_exams",
      dateAr: "10 - 20 نوفمبر 2026",
      dateEn: "November 10 - 20, 2026",
    },
    {
      eventKey: "final_exams",
      dateAr: "5 - 20 يناير 2027",
      dateEn: "January 5 - 20, 2027",
    },
    {
      eventKey: "semester_end",
      dateAr: "25 يناير 2027",
      dateEn: "January 25, 2027",
    },
  ];

  return (
    <div style={{ flex: 1 }}>
      {/* Page Banner */}
      <section className="page-banner emerald-gold-gradient">
        <div className="container animate-fade-in">
          <h1>{t("admission_title")}</h1>
          <p>{t("admission_subtitle")}</p>
        </div>
      </section>

      {/* Admissions Requirements and Steps */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className={styles.admissionsGrid}>
            
            {/* Left: Steps to Apply */}
            <div className={styles.stepsSection}>
              <h3>{t("admission_steps_title")}</h3>
              <div className={styles.stepList}>
                {steps.map((step, index) => (
                  <div key={index} className={styles.stepCard}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <div className={styles.stepText}>{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Requirements Card */}
            <div className={styles.reqCard}>
              <h3>📜 {t("admission_req_title")}</h3>
              <p>{t("admission_req_text")}</p>
              <div style={{ marginTop: "30px" }}>
                <a
                  href="http://212.0.156.123/students/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                  style={{ width: "100%" }}
                >
                  🌐 {locale === "ar" ? "بوابة التقديم الإلكتروني" : "Online Application Portal"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Calendar Section */}
      <section className="section-padding" style={{ background: "var(--platinum)" }}>
        <div className="container">
          <div className="section-header">
            <h2>{t("academic_calendar")}</h2>
            <p>
              {locale === "ar"
                ? "مواعيد الفصول الدراسية والامتحانات للعام الأكاديمي الحالي"
                : "Semester milestones and exam dates for the current academic year"}
            </p>
          </div>

          <div className={styles.calendarWrapper}>
            <table className={styles.calendarTable}>
              <thead>
                <tr>
                  <th>{locale === "ar" ? "الحدث الأكاديمي" : "Academic Event"}</th>
                  <th>{locale === "ar" ? "التاريخ المقرّر" : "Scheduled Date"}</th>
                </tr>
              </thead>
              <tbody>
                {calendarEvents.map((item, index) => (
                  <tr key={index}>
                    <td>{t(item.eventKey)}</td>
                    <td className={styles.eventDate}>
                      {locale === "ar" ? item.dateAr : item.dateEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
