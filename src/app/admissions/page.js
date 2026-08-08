"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import AdmissionsStepIllustration from "../../components/AdmissionsStepIllustration";
import styles from "./admissions.module.css";

const CUTOFFS = [
  { arName: "كلية الطب والعلوم الصحية", enName: "Faculty of Medicine & Health Sciences", minPercentage: 88, icon: "clinical_notes" },
  { arName: "كلية الهندسة", enName: "Faculty of Engineering", minPercentage: 80, icon: "engineering" },
  { arName: "كلية علوم الحاسوب وتكنولوجيا المعلومات", enName: "Faculty of Computer Science & IT", minPercentage: 75, icon: "computer" },
  { arName: "كلية الاقتصاد والعلوم الإدارية", enName: "Faculty of Economics & Administrative Sciences", minPercentage: 70, icon: "analytics" },
  { arName: "كلية التربية", enName: "Faculty of Education", minPercentage: 65, icon: "school" },
  { arName: "كلية العلوم الزراعية والبيئية", enName: "Faculty of Agricultural & Environmental Sciences", minPercentage: 60, icon: "eco" },
];

export default function Admissions() {
  const { locale, t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [studentScore, setStudentScore] = useState("");
  const [searchAppNo, setSearchAppNo] = useState("");
  const [appStatusResult, setAppStatusResult] = useState(null);

  const isAr = locale === "ar";

  const stepsDetail = [
    {
      titleAr: "1. اختيار التخصص ومراجعة الشروط",
      titleEn: "1. Select Major & Check Eligibility",
      descAr: "الاطلاع على نسب القبول للسنوات السابقة وشروط الكليات المتخصصة بجامعة كسلا.",
      descEn: "Check cutoff percentages and special college conditions at Kassala University."
    },
    {
      titleAr: "2. تجهيز الوثائق والمستندات",
      titleEn: "2. Prepare Required Documents",
      descAr: "تجهيز صورة الرقم الوطني، الشهادة الثانوية الموثقة، ورسومات التقديم الأولي.",
      descEn: "Prepare National ID copy, verified Secondary School Certificate, and application receipts."
    },
    {
      titleAr: "3. تعبئة طلب التقديم الإلكتروني",
      titleEn: "3. Fill Online Application Form",
      descAr: "الدخول لبوابة التقديم الإلكتروني وتعبئة الرغبات حسب الأولويات الأكاديمية.",
      descEn: "Access the online portal and enter your major choices according to preference."
    },
    {
      titleAr: "4. سداد رسوم الاستمارة",
      titleEn: "4. Application Fee Payment",
      descAr: "الدفع الآمن عبر تطبيقات الدفع الإلكتروني المصرفي المعتمدة للسودان.",
      descEn: "Secure online payment via accredited banking applications in Sudan."
    },
    {
      titleAr: "5. متابعة نتيجة القبول والاستلام",
      titleEn: "5. Track Application & Acceptance",
      descAr: "استلام الإشعار المباشر فور صدور قوائم الترشيح وإكمال المعاينة والبطاقة الجامعية.",
      descEn: "Receive notification upon list publication and complete physical verification & ID card."
    }
  ];

  const calendarEvents = [
    { eventKey: "semester_start", dateAr: "15 سبتمبر 2026", dateEn: "September 15, 2026" },
    { eventKey: "midterm_exams", dateAr: "10 - 20 نوفمبر 2026", dateEn: "November 10 - 20, 2026" },
    { eventKey: "final_exams", dateAr: "5 - 20 يناير 2027", dateEn: "January 5 - 20, 2027" },
    { eventKey: "semester_end", dateAr: "25 يناير 2027", dateEn: "January 25, 2027" },
  ];

  const handleStatusCheck = (e) => {
    e.preventDefault();
    if (!searchAppNo.trim()) return;
    setAppStatusResult({
      appNo: searchAppNo,
      statusAr: "تم قبول الطلب مبدئياً - في انتظار المعاينة النهائية كلية علوم الحاسوب",
      statusEn: "Provisionally Accepted - Awaiting final interview at Faculty of Computer Science",
      collegeAr: "كلية علوم الحاسوب وتكنولوجيا المعلومات",
      collegeEn: "Faculty of Computer Science & IT",
      date: "2026-08-01"
    });
  };

  const scoreNum = parseFloat(studentScore);

  return (
    <div style={{ flex: 1 }}>
      {/* Page Banner */}
      <section className="page-banner emerald-gold-gradient">
        <div className="container animate-fade-in">
          <h1>{t("admission_title")}</h1>
          <p>{t("admission_subtitle")}</p>
        </div>
      </section>

      {/* 1. Step-by-Step Interactive Progress Tracker (Emerald & Gold Theme) */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2>{isAr ? "📍 المسار البصري المباشر لخطوات التقديم" : "📍 Step-by-Step Interactive Admissions Flow"}</h2>
            <p>{isAr ? "تابع مرحلتك الحالية من البداية وحتى استلام البطاقة الجامعية" : "Track your exact phase from application to university ID issuance"}</p>
          </div>

          {/* Stepper Header */}
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "40px", flexWrap: "wrap", gap: "10px" }}>
            {stepsDetail.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                style={{
                  flex: 1,
                  minWidth: "120px",
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "12px",
                  borderRadius: "12px",
                  background: activeStep === idx ? "rgba(13, 92, 52, 0.1)" : "transparent",
                  borderBottom: activeStep === idx ? "3px solid #0D5C34" : "3px solid #e0e0e0",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                <div style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: activeStep >= idx ? "linear-gradient(135deg, #0D5C34 0%, #053B1E 100%)" : "#ccc",
                  border: activeStep === idx ? "2px solid #d4a017" : "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 8px auto",
                  fontWeight: "bold",
                  fontSize: "15px",
                  boxShadow: activeStep === idx ? "0 4px 12px rgba(13, 92, 52, 0.3)" : "none"
                }}>
                  {idx + 1}
                </div>
                <strong style={{ fontSize: "12px", display: "block", color: activeStep === idx ? "#0D5C34" : "#666", fontWeight: activeStep === idx ? "700" : "500" }}>
                  {isAr ? step.titleAr.split(".")[1] : step.titleEn.split(".")[1]}
                </strong>
              </div>
            ))}
          </div>

          {/* Stepper Active Detail Card */}
          <div style={{
            background: "linear-gradient(135deg, #f4fbf7 0%, #e6f4ed 100%)",
            border: "1px solid rgba(13, 92, 52, 0.25)",
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(13, 92, 52, 0.06)",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
          }}>
            <h3 style={{ color: "#053B1E", margin: 0, fontSize: "20px" }}>
              {isAr ? stepsDetail[activeStep].titleAr : stepsDetail[activeStep].titleEn}
            </h3>
            <p style={{ fontSize: "16px", color: "#2d4436", margin: 0 }}>
              {isAr ? stepsDetail[activeStep].descAr : stepsDetail[activeStep].descEn}
            </p>

            {/* Interactive Vector Animation Illustration for Active Step */}
            <AdmissionsStepIllustration stepIndex={activeStep} locale={locale} />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {activeStep > 0 && (
                <button onClick={() => setActiveStep(prev => prev - 1)} className="btn btn-secondary" style={{ padding: "8px 20px" }}>
                  {isAr ? "السابق" : "Previous"}
                </button>
              )}
              {activeStep < stepsDetail.length - 1 && (
                <button onClick={() => setActiveStep(prev => prev + 1)} className="btn btn-accent" style={{ padding: "8px 20px" }}>
                  {isAr ? "الخطوة التالية" : "Next Step"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Eligibility Score Calculator & Application Lookup */}
      <section className="section-padding" style={{ background: "#f5f7f6" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
          
          {/* Eligibility Calculator */}
          <div style={{ background: "#fff", padding: "28px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(13, 92, 52, 0.15)" }}>
            <h3 style={{ color: "#053B1E", display: "flex", alignItems: "center", gap: "8px", marginTop: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D5C34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2"/>
                <line x1="8" y1="6" x2="16" y2="6"/>
                <line x1="16" y1="14" x2="16" y2="18"/>
                <path d="M16 10h.01"/>
                <path d="M12 10h.01"/>
                <path d="M8 10h.01"/>
                <path d="M12 14h.01"/>
                <path d="M8 14h.01"/>
                <path d="M12 18h.01"/>
                <path d="M8 18h.01"/>
              </svg>
              {isAr ? "حاسبة النسبة والترشيح الأكاديمي" : "Eligibility Cutoff Calculator"}
            </h3>
            <p style={{ fontSize: "13px", color: "#5A6D63" }}>
              {isAr ? "أدخل نسبتك المئوية في الشهادة الثانوية لمعرفة الكليات المتاحة لك فوراً:" : "Enter your high school score percentage to check eligible colleges:"}
            </p>
            
            <input
              type="number"
              min="50"
              max="100"
              placeholder={isAr ? "أدخل النسبية المئوية (مثال: 85)" : "Enter Percentage (e.g. 85)"}
              value={studentScore}
              onChange={(e) => setStudentScore(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #c0d8cb",
                fontSize: "15px",
                marginBottom: "20px",
                outline: "none"
              }}
            />

            {studentScore !== "" && !isNaN(scoreNum) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "240px", overflowY: "auto" }}>
                {CUTOFFS.map((col, i) => {
                  const eligible = scoreNum >= col.minPercentage;
                  return (
                    <div
                      key={i}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "8px",
                        background: eligible ? "rgba(13, 92, 52, 0.08)" : "rgba(211, 47, 47, 0.05)",
                        borderLeft: eligible ? "4px solid #0D5C34" : "4px solid #d32f2f",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "13px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={eligible ? "#0D5C34" : "#d32f2f"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {eligible ? (
                            <>
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </>
                          ) : (
                            <>
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="15" y1="9" x2="9" y2="15"/>
                              <line x1="9" y1="9" x2="15" y2="15"/>
                            </>
                          )}
                        </svg>
                        <strong>{isAr ? col.arName : col.enName}</strong>
                      </div>
                      <span style={{ fontWeight: "bold", color: eligible ? "#0D5C34" : "#d32f2f" }}>
                        {eligible ? (isAr ? "مستوفٍ ✅" : "Eligible ✅") : (isAr ? `يحتاج ${col.minPercentage}%` : `Needs ${col.minPercentage}%`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Application Status Lookup Form */}
          <div style={{ background: "#fff", padding: "28px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(13, 92, 52, 0.15)" }}>
            <h3 style={{ color: "#053B1E", display: "flex", alignItems: "center", gap: "8px", marginTop: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D5C34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
              {isAr ? "استعلام حالة القبول برقم الاستمارة" : "Application Status Lookup"}
            </h3>
            <p style={{ fontSize: "13px", color: "#5A6D63" }}>
              {isAr ? "أدخل رقم استمارة التقديم لمتابعة سريعة لحالة الطلب والمرشحين:" : "Enter your application ID number to check live admission status:"}
            </p>

            <form onSubmit={handleStatusCheck} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder={isAr ? "رقم الاستمارة (مثال: KAS-2026-98)" : "App ID (e.g. KAS-2026-98)"}
                value={searchAppNo}
                onChange={(e) => setSearchAppNo(e.target.value)}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #c0d8cb",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
              <button type="submit" className="btn btn-accent" style={{ padding: "10px 20px" }}>
                {isAr ? "استعلام" : "Check"}
              </button>
            </form>

            {appStatusResult && (
              <div style={{ background: "#e6f4ed", border: "1px solid #167a47", borderRadius: "10px", padding: "16px" }}>
                <strong style={{ display: "block", color: "#053B1E", marginBottom: "6px" }}>
                  📋 {isAr ? "نتيجة الاستعلام برقم:" : "Result for ID:"} {appStatusResult.appNo}
                </strong>
                <p style={{ margin: 0, fontSize: "13px", color: "#0D5C34", fontWeight: "bold" }}>
                  {isAr ? appStatusResult.statusAr : appStatusResult.statusEn}
                </p>
                <small style={{ display: "block", marginTop: "8px", color: "#5A6D63" }}>
                  {isAr ? "تاريخ التحديث:" : "Updated Date:"} {appStatusResult.date}
                </small>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Academic Calendar Section */}
      <section className="section-padding" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <h2>{t("academic_calendar")}</h2>
            <p>
              {isAr
                ? "مواعيد الفصول الدراسية والامتحانات للعام الأكاديمي الحالي"
                : "Semester milestones and exam dates for the current academic year"}
            </p>
          </div>

          <div className={styles.calendarWrapper}>
            <table className={styles.calendarTable}>
              <thead>
                <tr>
                  <th>{isAr ? "الحدث الأكاديمي" : "Academic Event"}</th>
                  <th>{isAr ? "التاريخ المقرّر" : "Scheduled Date"}</th>
                </tr>
              </thead>
              <tbody>
                {calendarEvents.map((item, index) => (
                  <tr key={index}>
                    <td>{t(item.eventKey)}</td>
                    <td className={styles.eventDate}>
                      {isAr ? item.dateAr : item.dateEn}
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
