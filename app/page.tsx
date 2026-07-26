"use client";
import { useEffect, useState } from "react";
import { CHARACTERS } from "@/lib/characters";

const SLIDES = [
  "/bg-hero.png",
  "/bg-2.png",
  "/bg-3.png",
  "/bg-4.png",
  "/bg-5.png",
  "/bg-6.png",
];

const LANGS = ["KZ", "RU", "EN", "CN"] as const;
type Lang = (typeof LANGS)[number];

const ACCENT = "#76e000"; // референстегі лайм-жасыл

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [lang, setLang] = useState<Lang>("KZ");
  const [hovered, setHovered] = useState<Lang | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  const ch = CHARACTERS[0];

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1-қабат: бұлыңғыр фон слайд-шоуы */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: "-30px",
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(4px)",
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
            zIndex: 0,
          }}
        />
      ))}

      {/* 2-қабат: қараңғы қақпақ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.8)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* 3-қабат: хедер — логотиптер + тіл селекторы */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: "10px",
          padding: "24px 40px",
          zIndex: 3,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src="/logo/BezdGam.png"
            alt="Bezdary Games"
            style={{ height: "100px", width: "auto", display: "block" }}
          />
          <span style={{ color: "#ffffff", fontSize: "22px", lineHeight: 1, opacity: 0.7 }}>
            ×
          </span>
          <img
            src="/logo/OtherWays-logo.png"
            alt="Other Ways"
            style={{ height: "50px", width: "auto", display: "block" }}
          />
        </div>

        {/* тіл селекторы — оң жақта */}
        <nav
          aria-label="language"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px, 0.9vw, 12px)",
          }}
        >
          {LANGS.map((l) => {
            const isActive = l === lang;
            const isHover = l === hovered;
            return (
              <button
                key={l}
                type="button"
                aria-pressed={isActive}
                onClick={() => setLang(l)}
                onMouseEnter={() => setHovered(l)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(l)}
                onBlur={() => setHovered(null)}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  border: `1.5px solid ${
                    isActive ? ACCENT : isHover ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)"
                  }`,
                  borderRadius: "clamp(8px, 1vw, 12px)",
                  background:
                    isHover && !isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  color: isActive ? ACCENT : "rgba(255,255,255,0.92)",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "clamp(11px, 1.1vw, 15px)",
                  letterSpacing: "0.06em",
                  padding: "clamp(6px, 0.8vw, 9px) clamp(11px, 1.3vw, 17px)",
                  lineHeight: 1,
                  cursor: "pointer",
                  transform: isHover ? "translateY(-2px)" : "translateY(0)",
                  boxShadow: isActive
                    ? `0 0 12px ${ACCENT}55, inset 0 0 8px ${ACCENT}22`
                    : isHover
                    ? "0 4px 14px rgba(0,0,0,0.45)"
                    : "none",
                  transition: "all 0.22s ease",
                }}
              >
                {l}
              </button>
            );
          })}
        </nav>
      </header>

      {/* 4-қабат: персонаж */}
      <section
        aria-label="character"
        style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
      >
        <div
          className="hero-text"
          style={{
            position: "absolute",
            left: "clamp(20px, 8vw, 140px)",
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: "clamp(260px, 42vw, 560px)",
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "#ffffff",
              fontSize: "clamp(48px, 9vw, 120px)",
              letterSpacing: "0.08em",
              lineHeight: 1,
              fontWeight: 700,
              margin: 0,
            }}
          >
            {ch.name}
          </h1>
          <p
            style={{
              fontFamily: "'Courier New', ui-monospace, monospace",
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(12px, 1.1vw, 16px)",
              lineHeight: 1.9,
              letterSpacing: "0.02em",
              marginTop: "clamp(16px, 2vw, 28px)",
            }}
          >
            {ch.description}
          </p>
        </div>

        <img
          className="hero-char"
          src={ch.image}
          alt={ch.name}
          style={{
            position: "absolute",
            right: "clamp(0px, 4vw, 90px)",
            bottom: 0,
            height: "clamp(320px, 88vh, 920px)",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom right",
          }}
        />
      </section>
    </main>
  );
}