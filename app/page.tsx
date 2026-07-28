"use client";
import { useEffect, useState } from "react";
import { CHARACTERS } from "@/lib/characters";
import VoicePlayer from "@/components/VoicePlayer";

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

const NAV = ["HOME", "CHARACTERS", "STORY", "WORLD", "ARTEFACTS", "DOWNLOAD"];

const ACCENT = "#76e000";

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [lang, setLang] = useState<Lang>("KZ");
  const [hoveredLang, setHoveredLang] = useState<Lang | null>(null);

  const [activeNav, setActiveNav] = useState("HOME");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [index, setIndex] = useState(0);
  const [hoverArrow, setHoverArrow] = useState<null | "prev" | "next">(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + CHARACTERS.length) % CHARACTERS.length);

  const ch = CHARACTERS[index];

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

  const Arrow = ({ dir }: { dir: "prev" | "next" }) => {
    const isHover = hoverArrow === dir;
    return (
      <button
        type="button"
        aria-label={dir === "prev" ? "previous character" : "next character"}
        onClick={() => go(dir === "prev" ? -1 : 1)}
        onMouseEnter={() => setHoverArrow(dir)}
        onMouseLeave={() => setHoverArrow(null)}
        style={{
          position: "absolute",
          top: "50%",
          transform: `translateY(-50%) scale(${isHover ? 1.1 : 1})`,
          zIndex: 4,
          width: "clamp(40px, 3.2vw, 52px)",
          height: "clamp(40px, 3.2vw, 52px)",
          borderRadius: "50%",
          border: `1.5px solid ${isHover ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)"}`,
          background: isHover ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          transition: "all 0.22s ease",
          ...(dir === "prev"
            ? { left: "clamp(16px, 3vw, 60px)" }
            : { right: "clamp(16px, 3vw, 60px)" }),
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {dir === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
        </svg>
      </button>
    );
  };

  return (
    <main
      style={{
        height: "100dvh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
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
          flexWrap: "wrap",
          rowGap: "10px",
          padding: isMobile ? "14px 16px 12px" : "24px 40px",
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "8px" : "14px",
            flexWrap: "wrap",
            marginRight: isMobile ? "auto" : 0,
            maxWidth: isMobile ? "72%" : "none",
          }}
        >
          <img
            src="/logo/BezdGam.png"
            alt="Bezdary Games"
            style={{
              height: isMobile ? "56px" : "100px",
              width: "auto",
              display: "block",
            }}
          />
          <span
            style={{
              color: "#ffffff",
              fontSize: isMobile ? "16px" : "22px",
              lineHeight: 1,
              opacity: 0.7,
            }}
          >
            ×
          </span>
          <img
            src="/logo/OtherWays-logo.png"
            alt="Other Ways"
            style={{
              height: isMobile ? "24px" : "50px",
              width: "auto",
              display: "block",
            }}
          />
        </div>

        {!isMobile && (
          <nav
            aria-label="primary"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(14px, 1.8vw, 30px)",
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
                    fontSize: "clamp(11px, 0.95vw, 13.5px)",
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
        )}

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "14px" }}>
          {!isMobile && <LangButtons />}

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

      <section
        aria-label="character"
        style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
      >
        <div
          className="hero-text char-fade"
          key={`text-${index}`}
          style={
            isMobile
              ? {
                  position: "absolute",
                  left: "20px",
                  right: "20px",
                  top: "12%",
                  maxWidth: "none",
                }
              : {
                  position: "absolute",
                  left: "clamp(20px, 8vw, 140px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  maxWidth: "clamp(260px, 42vw, 560px)",
                }
          }
        >
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "#ffffff",
              fontSize: isMobile ? "clamp(34px, 9vw, 58px)" : "clamp(48px, 9vw, 120px)",
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
              fontSize: isMobile ? "clamp(13px, 3.6vw, 15px)" : "clamp(12px, 1.1vw, 16px)",
              lineHeight: isMobile ? 1.7 : 1.9,
              letterSpacing: "0.02em",
              marginTop: isMobile ? "14px" : "clamp(16px, 2vw, 28px)",
            }}
          >
            {ch.description}
          </p>

          {/* ПЛЕЕР(ЛЕР): string болса — біреу, массив болса — әр трекке бөлек */}
          {ch.audio && (
            <div
              style={{
                pointerEvents: "auto",
                marginTop: "26px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {typeof ch.audio === "string" ? (
                <VoicePlayer src={ch.audio} />
              ) : (
                ch.audio.map((t) => (
                  <VoicePlayer key={t.src} src={t.src} label={t.label} />
                ))
              )}
            </div>
          )}
        </div>

        <div
          style={
            isMobile
              ? {
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingRight: 0,
                }
              : {
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "clamp(0px, 3vw, 60px)",
                }
          }
        >
          <img
            className="hero-char char-fade"
            key={`img-${index}`}
            src={ch.image}
            alt={ch.name}
            style={{
              display: "block",
              height: isMobile ? "clamp(220px, 48%, 420px)" : "clamp(250px, 72%, 780px)",
              maxHeight: isMobile ? "56%" : "100%",
              width: "auto",
              objectFit: "contain",
              objectPosition: isMobile ? "bottom center" : "center right",
              transform:
                !isMobile && ch.imageShift ? `translateX(${ch.imageShift}px)` : undefined,
              transition: "transform 0.4s ease",
            }}
          />
        </div>
      </section>

      <Arrow dir="prev" />
      <Arrow dir="next" />
    </main>
  );
}