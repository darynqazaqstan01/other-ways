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

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [lang, setLang] = useState<Lang>("KZ");
  const [hoveredLang, setHoveredLang] = useState<Lang | null>(null);

  const [activeNav, setActiveNav] = useState("HOME");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  // Экран енін бақылаймыз: тарылса — гамбургерге көшеміз
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1100);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Drawer ашық тұрғанда Esc басса — жабылады
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ch = CHARACTERS[0];

  // Тіл селекторы — хедерде де, drawer-да да қолданылады
  const LangButtons = ({ vertical = false }: { vertical?: boolean }) => (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        alignItems: vertical ? "stretch" : "center",
        gap: vertical ? "10px" : "clamp(6px, 0.9vw, 12px)",
      }}
    >
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
              borderRadius: "clamp(8px, 1vw, 12px)",
              background: isHover && !isActive ? "rgba(255,255,255,0.08)" : "transparent",
              color: isActive ? ACCENT : "rgba(255,255,255,0.92)",
              fontFamily: "inherit",
              fontWeight: 700,
              fontSize: vertical ? "15px" : "clamp(11px, 1.1vw, 15px)",
              letterSpacing: "0.06em",
              padding: vertical
                ? "11px 16px"
                : "clamp(6px, 0.8vw, 9px) clamp(11px, 1.3vw, 17px)",
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

      {/* 3-қабат: хедер */}
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
        {/* сол: логотиптер */}
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

        {/* орта: навигация (тек кең экранда) */}
        {!isMobile && (
          <nav
            aria-label="primary"
            style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 1.8vw, 30px)" }}
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
                    fontSize: "clamp(11px, 0.95vw, 13.5px)",
                    letterSpacing: "0.14em",
                    lineHeight: 1,
                    transform: isHover ? "translateY(-1px)" : "translateY(0)",
                    transition: "color 0.22s ease, transform 0.22s ease",
                  }}
                >
                  {item}
                  {/* астын сызу — сол жақтан оңға сызылады */}
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
        )}

        {/* оң: тіл селекторы + гамбургер */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "14px" }}>
          <LangButtons />

          {isMobile && (
            <button
              type="button"
              aria-label="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                border: "1.5px solid rgba(255,255,255,0.5)",
                borderRadius: "10px",
                background: "transparent",
                width: "42px",
                height: "38px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  style={{
                    display: "block",
                    width: "20px",
                    height: "2px",
                    background: "#ffffff",
                    borderRadius: "2px",
                    transition: "all 0.25s ease",
                  }}
                />
              ))}
            </button>
          )}
        </div>
      </header>

      {/* Мобильді drawer — оң жақтан сырғып шығады */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: isMobile ? "block" : "none",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* қараңғы фон */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
        {/* панель */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "min(82vw, 320px)",
            background: "rgba(10,10,12,0.97)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.34s cubic-bezier(0.4, 0, 0.2, 1)",
            padding: "22px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "26px",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              aria-label="close menu"
              onClick={() => setMenuOpen(false)}
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                border: "1.5px solid rgba(255,255,255,0.4)",
                borderRadius: "10px",
                background: "transparent",
                color: "#fff",
                width: "40px",
                height: "38px",
                fontSize: "20px",
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <nav
            aria-label="primary mobile"
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            {NAV.map((item, idx) => {
              const isActive = item === activeNav;
              return (
                <button
                  key={item}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setActiveNav(item);
                    setMenuOpen(false);
                  }}
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    border: "none",
                    background: "transparent",
                    textAlign: "left",
                    padding: "12px 4px",
                    cursor: "pointer",
                    color: isActive ? ACCENT : "rgba(255,255,255,0.85)",
                    fontFamily: "inherit",
                    fontWeight: isActive ? 700 : 600,
                    fontSize: "17px",
                    letterSpacing: "0.12em",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(18px)",
                    transition: `opacity 0.4s ease ${menuOpen ? idx * 0.06 + 0.1 : 0}s, transform 0.4s ease ${
                      menuOpen ? idx * 0.06 + 0.1 : 0
                    }s, color 0.2s ease`,
                  }}
                >
                  {item}
                </button>
              );
            })}
          </nav>

          <div style={{ marginTop: "auto", paddingTop: "10px" }}>
            <LangButtons vertical />
          </div>
        </div>
      </div>

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