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

const NAV = ["HOME", "CHARACTERS", "STORY", "WORLD", "GALLERY", "DOWNLOAD"];

const ACCENT = "#76e000";

const BASE_W = 1920;
const BASE_H = 1080;

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [lang, setLang] = useState<Lang>("KZ");
  const [hoveredLang, setHoveredLang] = useState<Lang | null>(null);

  const [activeNav, setActiveNav] = useState("HOME");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const ch = CHARACTERS[0];

  const LangButtons = () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {LANGS.map((l) => {
        const isActive = l === lang;
        const isHover = l === hoveredLang;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLang(l)}
            onMouseEnter={() => setHoveredLang(l)}
            onMouseLeave={() => setHoveredLang(null)}
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              border: `1.5px solid ${
                isActive ? ACCENT : isHover ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)"
              }`,
              borderRadius: "12px",
              background: isHover && !isActive ? "rgba(255,255,255,0.08)" : "transparent",
              color: isActive ? ACCENT : "rgba(255,255,255,0.92)",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "0.06em",
              padding: "9px 17px",
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
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: BASE_W,
          height: BASE_H,
          flexShrink: 0,
          overflow: "hidden",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
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

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <header
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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

          <nav
            aria-label="primary"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: "30px",
              whiteSpace: "nowrap",
            }}
          >
            {NAV.map((item) => {
              const isActive = item === activeNav;
              const isHover = item === hoveredNav;
              const lit = isActive || isHover;
              return (
                <button
                  key={item}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveNav(item)}
                  onMouseEnter={() => setHoveredNav(item)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    position: "relative",
                    appearance: "none",
                    WebkitAppearance: "none",
                    border: "none",
                    background: "transparent",
                    padding: "6px 2px",
                    cursor: "pointer",
                    color: isActive
                      ? "#ffffff"
                      : lit
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.62)",
                    fontFamily: "inherit",
                    fontWeight: isActive ? 700 : 600,
                    fontSize: "13.5px",
                    letterSpacing: "0.14em",
                    lineHeight: 1,
                    transform: isHover ? "translateY(-1px)" : "translateY(0)",
                    transition: "color 0.22s ease, transform 0.22s ease",
                  }}
                >
                  {item}
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: -2,
                      height: "2px",
                      background: ACCENT,
                      borderRadius: "2px",
                      transform: `scaleX(${lit ? 1 : 0})`,
                      transformOrigin: "left center",
                      transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </button>
              );
            })}
          </nav>

          <div style={{ marginLeft: "auto" }}>
            <LangButtons />
          </div>
        </header>

        <section
          aria-label="character"
          style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
        >
          <div
            style={{
              position: "absolute",
              left: "140px",
              top: "50%",
              transform: "translateY(-50%)",
              maxWidth: "560px",
            }}
          >
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "#ffffff",
                fontSize: "120px",
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
                fontSize: "16px",
                lineHeight: 1.9,
                letterSpacing: "0.02em",
                marginTop: "28px",
              }}
            >
              {ch.description}
            </p>
          </div>

          <img
            src={ch.image}
            alt={ch.name}
            style={{
              position: "absolute",
              right: "80px",
              bottom: 0,
              height: "920px",
              width: "auto",
              objectFit: "contain",
              objectPosition: "bottom right",
            }}
          />
        </section>
      </div>
    </div>
  );
}