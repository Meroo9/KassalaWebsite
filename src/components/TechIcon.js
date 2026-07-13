import React from "react";

export default function TechIcon({ type, size = 48 }) {
  const animations = (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes spinSlow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulseSlow {
        0%, 100% { opacity: 0.3; transform: scale(0.95); }
        50% { opacity: 1; transform: scale(1.05); }
      }
      @keyframes scanLine {
        0% { transform: translateY(0px); }
        100% { transform: translateY(32px); }
      }
      @keyframes dataFlow {
        0% { stroke-dashoffset: 24; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes signalWave {
        0% { opacity: 0.1; transform: scale(0.8); }
        50% { opacity: 0.7; }
        100% { opacity: 0; transform: scale(1.3); }
      }
      @keyframes blinkDot {
        0%, 100% { fill: var(--accent); opacity: 0.3; }
        50% { fill: #00FFB2; opacity: 1; }
      }
      @keyframes floatEffect {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `}} />
  );

  switch (type) {
    case "moodle":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ animation: "floatEffect 4s ease-in-out infinite" }}>
          {animations}
          {/* Hat Outline */}
          <path d="M32 8L8 20L32 32L56 20L32 8Z" stroke="var(--primary)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M18 25V38C18 42 24 46 32 46C40 46 46 42 46 38V25" stroke="var(--primary)" strokeWidth="3" strokeLinejoin="round" />
          {/* Tassel line */}
          <path d="M48 20V28" stroke="var(--accent)" strokeWidth="2.5" />
          {/* Pulsing Core */}
          <circle cx="32" cy="20" r="4" fill="var(--accent)" style={{ animation: "pulseSlow 2s infinite" }} />
          {/* Data signals */}
          <circle cx="18" cy="38" r="3" fill="var(--primary)" style={{ animation: "blinkDot 1.5s infinite" }} />
          <circle cx="32" cy="46" r="3" fill="var(--accent)" style={{ animation: "blinkDot 1.5s infinite 0.5s" }} />
          <circle cx="46" cy="38" r="3" fill="var(--primary)" style={{ animation: "blinkDot 1.5s infinite 1s" }} />
        </svg>
      );

    case "portal":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          {animations}
          {/* Clipboard Outline */}
          <rect x="14" y="10" width="36" height="44" rx="4" stroke="var(--primary)" strokeWidth="3" />
          <path d="M24 10H40V6C40 4.9 39.1 4 38 4H26C24.9 4 24 4.9 24 6V10Z" fill="var(--accent)" />
          {/* Document Content Lines */}
          <line x1="22" y1="22" x2="42" y2="22" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="32" x2="36" y2="32" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="42" x2="40" y2="42" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
          {/* Futuristic Scanning line */}
          <line x1="12" y1="18" x2="52" y2="18" stroke="#00FFB2" strokeWidth="2.5" style={{ animation: "scanLine 2.5s ease-in-out infinite alternate" }} />
        </svg>
      );

    case "library":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          {animations}
          {/* Server / Library bay stack */}
          <rect x="10" y="8" width="44" height="12" rx="3" stroke="var(--primary)" strokeWidth="3" />
          <rect x="10" y="26" width="44" height="12" rx="3" stroke="var(--primary)" strokeWidth="3" />
          <rect x="10" y="44" width="44" height="12" rx="3" stroke="var(--primary)" strokeWidth="3" />
          {/* Glowing bays processing dots */}
          <circle cx="18" cy="14" r="2.5" fill="var(--accent)" style={{ animation: "blinkDot 1s infinite" }} />
          <circle cx="18" cy="32" r="2.5" fill="#00FFB2" style={{ animation: "blinkDot 1s infinite 0.33s" }} />
          <circle cx="18" cy="50" r="2.5" fill="var(--accent)" style={{ animation: "blinkDot 1s infinite 0.66s" }} />
          {/* Data lanes */}
          <line x1="26" y1="14" x2="46" y2="14" stroke="rgba(13, 92, 52, 0.4)" strokeWidth="2" />
          <line x1="26" y1="32" x2="46" y2="32" stroke="rgba(13, 92, 52, 0.4)" strokeWidth="2" />
          <line x1="26" y1="50" x2="46" y2="50" stroke="rgba(13, 92, 52, 0.4)" strokeWidth="2" />
          {/* Glowing flow dashes */}
          <line x1="26" y1="14" x2="46" y2="14" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6,12" style={{ animation: "dataFlow 1.5s linear infinite" }} />
          <line x1="26" y1="50" x2="46" y2="50" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6,12" style={{ animation: "dataFlow 1.5s linear infinite reverse" }} />
        </svg>
      );

    case "support":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          {animations}
          {/* Smooth spinning gear wheels */}
          <g style={{ transformOrigin: "32px 32px", animation: "spinSlow 12s linear infinite" }}>
            <circle cx="32" cy="32" r="14" stroke="var(--primary)" strokeWidth="4.5" />
            <path d="M32 10V16M32 48V54M10 32H16M48 32H54" stroke="var(--primary)" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M16.5 16.5L21 21M43 43L47.5 47.5M16.5 47.5L21 43M43 21L47.5 16.5" stroke="var(--primary)" strokeWidth="4.5" strokeLinecap="round" />
          </g>
          {/* Pulsing golden core */}
          <circle cx="32" cy="32" r="4.5" fill="var(--accent)" style={{ animation: "pulseSlow 2.5s ease-in-out infinite" }} />
        </svg>
      );

    case "affairs":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          {animations}
          {/* Radar scope frame */}
          <circle cx="32" cy="32" r="24" stroke="var(--primary)" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="14" stroke="rgba(13, 92, 52, 0.3)" strokeWidth="1.5" />
          {/* Pulse crosshairs */}
          <line x1="32" y1="4" x2="32" y2="60" stroke="rgba(13, 92, 52, 0.2)" strokeWidth="1.5" />
          <line x1="4" y1="32" x2="60" y2="32" stroke="rgba(13, 92, 52, 0.2)" strokeWidth="1.5" />
          {/* Rotating radar sweep */}
          <g style={{ transformOrigin: "32px 32px", animation: "spinSlow 4s linear infinite" }}>
            <line x1="32" y1="32" x2="32" y2="8" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M32 8C45.2 8 56 18.8 56 32" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="4" />
          </g>
          {/* Pulse points */}
          <circle cx="42" cy="22" r="3" fill="#00FFB2" style={{ animation: "pulseSlow 1.5s infinite" }} />
        </svg>
      );

    case "email":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          {animations}
          {/* Mail Envelope with signal waves */}
          <rect x="10" y="16" width="44" height="32" rx="4" stroke="var(--primary)" strokeWidth="3" />
          <path d="M12 18L32 30L52 18" stroke="var(--primary)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {/* Emitter point */}
          <circle cx="32" cy="30" r="3.5" fill="var(--accent)" />
          {/* Wireless signal waves emitting */}
          <path d="M26 12C28.2 10.5 30.5 10 32 10C33.5 10 35.8 10.5 38 12" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" style={{ transformOrigin: "32px 30px", animation: "pulseSlow 2s infinite" }} />
          <path d="M20 7C24.4 4.5 28.5 4 32 4C35.5 4 39.6 4.5 44 7" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" style={{ transformOrigin: "32px 30px", animation: "pulseSlow 2s infinite 0.5s" }} />
        </svg>
      );

    case "visitors":
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ animation: "floatEffect 5s ease-in-out infinite" }}>
          {animations}
          {/* Connected Network Nodes */}
          <circle cx="32" cy="18" r="5" stroke="var(--primary)" strokeWidth="3" fill="#FFFFFF" />
          <circle cx="18" cy="44" r="5" stroke="var(--primary)" strokeWidth="3" fill="#FFFFFF" />
          <circle cx="46" cy="44" r="5" stroke="var(--primary)" strokeWidth="3" fill="#FFFFFF" />
          {/* Connections paths */}
          <line x1="32" y1="23" x2="18" y2="39" stroke="var(--primary)" strokeWidth="2.5" />
          <line x1="32" y1="23" x2="46" y2="39" stroke="var(--primary)" strokeWidth="2.5" />
          <line x1="23" y1="44" x2="41" y2="44" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4,4" />
          {/* Signal rings */}
          <circle cx="32" cy="18" r="9" stroke="var(--accent)" strokeWidth="1.5" style={{ transformOrigin: "32px 18px", animation: "signalWave 2s infinite" }} />
          <circle cx="18" cy="44" r="9" stroke="var(--accent)" strokeWidth="1.5" style={{ transformOrigin: "18px 44px", animation: "signalWave 2s infinite 0.66s" }} />
          <circle cx="46" cy="44" r="9" stroke="var(--accent)" strokeWidth="1.5" style={{ transformOrigin: "46px 44px", animation: "signalWave 2s infinite 1.33s" }} />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          {animations}
          <circle cx="32" cy="32" r="20" stroke="var(--primary)" strokeWidth="3" />
          <path d="M32 18V46M18 32H46" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
}
