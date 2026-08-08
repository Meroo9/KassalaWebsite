"use client";

import React, { useState, useEffect } from "react";

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const cleanNum = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(cleanNum)) {
      const timer = setTimeout(() => {
        setCount(value);
      }, 0);
      return () => clearTimeout(timer);
    }

    let start = 0;
    const duration = 2000;
    const steps = 40;
    const stepTime = duration / steps;
    const increment = cleanNum / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= cleanNum) {
        clearInterval(timer);
        setCount(cleanNum);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const formatted = typeof count === "number" ? count.toLocaleString() : count;
  const hasPlus = value.includes("+");
  return <span>{hasPlus ? "+" : ""}{formatted}</span>;
}

const STAT_ICONS = {
  students: { icon: "school", color: "#f3cb65", bgGradient: "linear-gradient(135deg, rgba(243, 203, 101, 0.25) 0%, rgba(212, 160, 23, 0.1) 100%)" },
  faculties: { icon: "account_balance", color: "#65f3a6", bgGradient: "linear-gradient(135deg, rgba(101, 243, 166, 0.25) 0%, rgba(13, 92, 52, 0.1) 100%)" },
  researchers: { icon: "badge", color: "#65d4f3", bgGradient: "linear-gradient(135deg, rgba(101, 212, 243, 0.25) 0%, rgba(5, 59, 30, 0.1) 100%)" },
  journals: { icon: "auto_stories", color: "#f39c65", bgGradient: "linear-gradient(135deg, rgba(243, 156, 101, 0.25) 0%, rgba(212, 160, 23, 0.1) 100%)" }
};

function StatSvgIcon({ iconId, color }) {
  switch (iconId) {
    case "students":
      return (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      );
    case "faculties":
      return (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z"/>
        </svg>
      );
    case "researchers":
      return (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      );
    case "journals":
      return (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          <path d="M8 7h8M8 11h6"/>
        </svg>
      );
    default:
      return (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      );
  }
}

export default function AnimatedStatsCard({ stat, labelText, index }) {
  const iconConfig = STAT_ICONS[stat.id] || { icon: "star", color: "#f3cb65", bgGradient: "rgba(255,255,255,0.15)" };

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        padding: "36px 24px 28px 24px",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(243, 203, 101, 0.25)",
        borderRadius: "24px",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 10px 30px rgba(5, 59, 30, 0.2)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: `statCardFloat 4s ease-in-out infinite ${index * 0.4}s`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-12px) scale(1.04)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.14)";
        e.currentTarget.style.borderColor = "#f3cb65";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(243, 203, 101, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
        e.currentTarget.style.borderColor = "rgba(243, 203, 101, 0.25)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(5, 59, 30, 0.2)";
      }}
    >
      <style jsx global>{`
        @keyframes statCardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes iconPulse {
          0% { transform: scale(0.95); opacity: 0.85; }
          50% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 10px rgba(243, 203, 101, 0.8)); }
          100% { transform: scale(0.95); opacity: 0.85; }
        }
        @keyframes ringSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Floating Animated Icon Circle */}
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: iconConfig.bgGradient,
          border: `2px solid ${iconConfig.color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          position: "relative",
          boxShadow: `0 6px 20px rgba(0, 0, 0, 0.25)`
        }}
      >
        {/* Animated Dashed Rotating Outer Ring */}
        <div
          style={{
            position: "absolute",
            top: "-6px",
            left: "-6px",
            right: "-6px",
            bottom: "-6px",
            borderRadius: "50%",
            border: `2px dashed ${iconConfig.color}`,
            opacity: 0.5,
            animation: "ringSpin 12s linear infinite"
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "iconPulse 3s ease-in-out infinite"
          }}
        >
          <StatSvgIcon iconId={stat.id} color={iconConfig.color} />
        </div>
      </div>

      {/* Animated Count-up Number */}
      <div
        style={{
          fontSize: "3rem",
          fontWeight: "900",
          color: "#f3cb65",
          lineHeight: "1.1",
          marginBottom: "10px",
          letterSpacing: "-0.5px",
          textShadow: "0 4px 15px rgba(243, 203, 101, 0.3)"
        }}
      >
        <AnimatedNumber value={stat.number} />
      </div>

      {/* Stat Label */}
      <div
        style={{
          fontSize: "1.1rem",
          fontWeight: "700",
          color: "#FFFFFF",
          letterSpacing: "0.2px",
          opacity: 0.95
        }}
      >
        {labelText}
      </div>
    </div>
  );
}
