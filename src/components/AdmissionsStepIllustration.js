"use client";

import React from "react";

function StepSvgIcon({ name, size = 20, color = "#f3cb65" }) {
  switch (name) {
    case "verified":
    case "verified_user":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      );
    case "check_circle":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      );
    case "near_me":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
      );
    case "account_balance_wallet":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7h-7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
          <path d="M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          <path d="M4 4h14v3H4a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z"/>
        </svg>
      );
    case "payments":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      );
    case "credit_card":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
          <line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      );
    case "school":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <polyline points="12 8 12 12 14 14"/>
        </svg>
      );
  }
}

export default function AdmissionsStepIllustration({ stepIndex, locale }) {
  const isAr = locale === "ar";

  return (
    <div
      style={{
        width: "100%",
        height: "260px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #053B1E 0%, #0D5C34 60%, #167a47 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 25px rgba(5, 59, 30, 0.25)",
        border: "1px solid rgba(212, 160, 23, 0.35)",
        margin: "15px 0"
      }}
    >
      {/* Background Decorative Mesh Orbs */}
      <div
        style={{
          position: "absolute",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212, 160, 23, 0.25) 0%, rgba(0,0,0,0) 70%)",
          top: "-50px",
          right: "-50px",
          animation: "pulseGlow 4s infinite alternate ease-in-out"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(0,0,0,0) 70%)",
          bottom: "-40px",
          left: "-40px",
          animation: "pulseGlow 5s infinite alternate ease-in-out 1s"
        }}
      />

      <style jsx global>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes floatSlow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes scanBeam {
          0% { top: 15%; opacity: 0.8; }
          50% { top: 80%; opacity: 1; }
          100% { top: 15%; opacity: 0.8; }
        }
        @keyframes coinBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.1); }
        }
        @keyframes gaugeFill {
          0% { stroke-dashoffset: 280; }
          100% { stroke-dashoffset: 45; }
        }
        @keyframes cursorClick {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, 20px) scale(0.9); }
        }
        @keyframes confettiFloat {
          0% { transform: translateY(20px) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-40px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* STEP 0: Selection of Major & Requirements Review */}
      {stepIndex === 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "30px", zIndex: 2, padding: "0 20px", flexWrap: "wrap", justifyContent: "center" }}>
          {/* Animated Gauge */}
          <div style={{ position: "relative", width: "130px", height: "130px", animation: "floatSlow 4s ease-in-out infinite" }}>
            <svg width="130" height="130" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset="45"
                strokeLinecap="round"
                style={{ animation: "gaugeFill 1.8s ease-out forwards" }}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f3cb65" />
                  <stop offset="100%" stopColor="#d4a017" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#f3cb65", display: "block", lineHeight: "1" }}>88%</span>
              <span style={{ fontSize: "11px", color: "#fff", opacity: 0.9 }}>{isAr ? "النسبة المطلوبة" : "Required Score"}</span>
            </div>
          </div>

          {/* Specialization Floating Badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { title: isAr ? "كلية الطب والعلوم الصحية" : "Medicine & Health", icon: "clinical_notes", min: "88%" },
              { title: isAr ? "كلية الهندسة والعلوم" : "Engineering & Tech", icon: "engineering", min: "80%" },
              { title: isAr ? "علوم الحاسوب وتكنولوجيا المعلومات" : "Computer Science & IT", icon: "computer", min: "75%" }
            ].map((col, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(8px)",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "1px solid rgba(243, 203, 101, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "600",
                  transform: `translateX(${i * 6}px)`,
                  animation: `floatSlow 3s ease-in-out infinite ${i * 0.4}s`
                }}
              >
                <StepSvgIcon name={col.icon} size={18} color="#f3cb65" />
                <span>{col.title}</span>
                <span style={{ background: "#d4a017", color: "#053B1E", padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "800", marginLeft: "auto" }}>
                  {col.min}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: Document & Certificate Preparation */}
      {stepIndex === 1 && (
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "25px" }}>
          {/* Certificate Container with Laser Scanner Line */}
          <div
            style={{
              width: "180px",
              height: "130px",
              background: "#fff",
              borderRadius: "14px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              position: "relative",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              overflow: "hidden",
              animation: "floatSlow 4s ease-in-out infinite"
            }}
          >
            {/* Laser Scanner Line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "3px",
                background: "linear-gradient(90deg, transparent 0%, #d4a017 50%, transparent 100%)",
                boxShadow: "0 0 10px #f3cb65, 0 0 5px #f3cb65",
                animation: "scanBeam 2.5s infinite linear"
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#0D5C34", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <StepSvgIcon name="verified" size={18} color="#f3cb65" />
              </div>
              <div>
                <div style={{ height: "6px", width: "70px", background: "#053B1E", borderRadius: "4px" }} />
                <div style={{ height: "4px", width: "40px", background: "#aaa", borderRadius: "3px", marginTop: "4px" }} />
              </div>
            </div>

            <div style={{ height: "4px", width: "100%", background: "#e0e0e0", borderRadius: "2px", marginTop: "6px" }} />
            <div style={{ height: "4px", width: "80%", background: "#e0e0e0", borderRadius: "2px" }} />
            <div style={{ height: "4px", width: "90%", background: "#e0e0e0", borderRadius: "2px" }} />

            <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "10px", fontWeight: "800", color: "#0D5C34" }}>مكتملة وموثقة ✓</span>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #d4a017" }} />
            </div>
          </div>

          {/* Verified Document Checklist Badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: isAr ? "الشهادة الثانوية السودانية الموثقة" : "Verified Sudanese Certificate", ok: true },
              { label: isAr ? "صورة الرقم الوطني / الجواز" : "National ID / Passport Copy", ok: true },
              { label: isAr ? "إيصال التقديم المبدئي" : "Application Receipt", ok: true }
            ].map((doc, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(6px)",
                  padding: "8px 14px",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}
              >
                <StepSvgIcon name="check_circle" size={20} color="#f3cb65" />
                <span>{doc.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Online Application Form Filling */}
      {stepIndex === 2 && (
        <div style={{ zIndex: 2, display: "flex", alignItems: "center", gap: "25px" }}>
          {/* Laptop Container */}
          <div
            style={{
              width: "220px",
              background: "#081b11",
              borderRadius: "12px",
              border: "2px solid rgba(243, 203, 101, 0.5)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
              padding: "12px",
              position: "relative",
              animation: "floatSlow 4s ease-in-out infinite"
            }}
          >
            {/* Screen Top Bar */}
            <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f" }} />
            </div>

            {/* Form Fields Simulation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ background: "rgba(255,255,255,0.1)", height: "20px", borderRadius: "4px", padding: "0 8px", display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "#f3cb65" }}>اسم الطالب: محمد أحمد علي</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.1)", height: "20px", borderRadius: "4px", padding: "0 8px", display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "#fff" }}>الرغبة الأولى: كلية الطب</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.1)", height: "20px", borderRadius: "4px", padding: "0 8px", display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "#fff" }}>الرغبة الثانية: علوم الحاسوب</span>
              </div>
              <div style={{ background: "#d4a017", height: "24px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4px" }}>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#053B1E" }}>إرسال الطلب الآن 🚀</span>
              </div>
            </div>

            {/* Moving Mouse Cursor */}
            <div style={{ position: "absolute", bottom: "18px", right: "20px", animation: "cursorClick 2s infinite ease-in-out" }}>
              <StepSvgIcon name="near_me" size={22} color="#fff" />
            </div>
          </div>

          <div style={{ color: "#fff", maxWidth: "200px" }}>
            <h4 style={{ color: "#f3cb65", margin: "0 0 6px 0", fontSize: "16px" }}>{isAr ? "التعبئة الذكية السريعة" : "Smart Online Portal"}</h4>
            <p style={{ fontSize: "13px", opacity: 0.9, margin: 0, lineHeight: "1.5" }}>
              {isAr ? "إدخال البيانات الأكاديمية وترتيب الرغبات بكل سهولة وأمان" : "Easily input your academic data and major preferences"}
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: Application Fee Payment */}
      {stepIndex === 3 && (
        <div style={{ zIndex: 2, display: "flex", alignItems: "center", gap: "30px" }}>
          {/* Smartphone Payment Interface */}
          <div
            style={{
              width: "140px",
              height: "190px",
              background: "linear-gradient(180deg, #092817 0%, #053B1E 100%)",
              borderRadius: "20px",
              border: "3px solid #d4a017",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              animation: "floatSlow 4s ease-in-out infinite"
            }}
          >
            <div style={{ width: "30px", height: "4px", background: "#d4a017", borderRadius: "2px" }} />
            
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: "rgba(243, 203, 101, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px auto" }}>
                <StepSvgIcon name="account_balance_wallet" size={28} color="#f3cb65" />
              </div>
              <span style={{ fontSize: "11px", color: "#fff", display: "block", fontWeight: "700" }}>{isAr ? "سداد الرسوم المصرفية" : "Bank Payment"}</span>
              <span style={{ fontSize: "13px", color: "#f3cb65", fontWeight: "900" }}>إيصال إلكتروني ✓</span>
            </div>

            <div style={{ width: "100%", background: "#0D5C34", padding: "6px 0", borderRadius: "8px", textAlign: "center", fontSize: "10px", color: "#fff", fontWeight: "700" }}>
              {isAr ? "تم الدفع بنجاح" : "Paid Successfully"}
            </div>
          </div>

          {/* Floating Gold Coin Badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { name: isAr ? "بنك الخرطوم (بنكك)" : "Bankak App", icon: "payments" },
              { name: isAr ? "تطبيق فوري / أوكاش" : "Fawry / OCash", icon: "credit_card" },
              { name: isAr ? "إشعار سداد فوري موثق" : "Instant Receipt Verification", icon: "verified_user" }
            ].map((app, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(6px)",
                  padding: "10px 16px",
                  borderRadius: "14px",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid rgba(243, 203, 101, 0.35)",
                  animation: `floatSlow 3s ease-in-out infinite ${idx * 0.5}s`
                }}
              >
                <StepSvgIcon name={app.icon} size={22} color="#f3cb65" />
                <span>{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: Track Application & Acceptance */}
      {stepIndex === 4 && (
        <div style={{ zIndex: 2, textAlign: "center", position: "relative" }}>
          {/* Celebratory Floating Confetti */}
          <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, pointerEvents: "none" }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "8px",
                  height: "8px",
                  borderRadius: i % 2 === 0 ? "50%" : "2px",
                  background: i % 3 === 0 ? "#f3cb65" : i % 3 === 1 ? "#0D5C34" : "#ffffff",
                  left: `${20 + i * 14}%`,
                  bottom: "10px",
                  animation: `confettiFloat 2.5s infinite ease-out ${i * 0.3}s`
                }}
              />
            ))}
          </div>

          {/* Graduation Cap & Certificate */}
          <div style={{ animation: "floatSlow 4s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "linear-gradient(135deg, #f3cb65 0%, #d4a017 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(212, 160, 23, 0.4)", marginBottom: "12px" }}>
              <StepSvgIcon name="school" size={40} color="#053B1E" />
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(10px)", padding: "14px 28px", borderRadius: "20px", border: "1px solid rgba(243, 203, 101, 0.5)" }}>
              <h4 style={{ color: "#f3cb65", margin: "0 0 4px 0", fontSize: "18px" }}>
                {isAr ? "🎉 مبروك! تم قبولك بجامعة كسلا" : "🎉 Congratulations! You are Admitted"}
              </h4>
              <p style={{ color: "#fff", margin: 0, fontSize: "13px", opacity: 0.95 }}>
                {isAr ? "جاهز لاستلام بطاقتك الجامعية وبدء مشوارك الأكاديمي" : "Ready to receive your university ID & start your academic journey"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
