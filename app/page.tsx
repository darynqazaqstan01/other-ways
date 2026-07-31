"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

// Базовые/минимальные размеры шрифтов для автоподбора
const TITLE_BASE_D = 120, TITLE_MIN_D = 64;
const TITLE_BASE_M = 54,  TITLE_MIN_M = 26;
const DESC_BASE_D = 16,   DESC_MIN_D = 11;
const DESC_BASE_M = 15,   DESC_MIN_M = 10;

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [lang, setLang] = useState<Lang>("RU");
  const [hoveredLang, setHoveredLang] = useState<Lang | null>(null);

  const [activeNav, setActiveNav] = useState("HOME");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [index, setIndex] = useState(0);
  const [hoverArrow, setHoverArrow] = useState<null | "prev" | "next">(null);

  // refs для автоподбора шрифта в левом контейнере
  const upperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + CHARACTERS.length) % CHARACTERS.length),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const ch = CHARACTERS[index];

  // Автоподбор: заголовок ≤2 строк (сжатие до 1 строки и стоп),
  // текст уменьшается пока не влезет весь; плеер фиксирован и не участвует.
  const fitText = useCallback(() => {
    const upper = upperRef.current, title = titleRef.current, desc = descRef.current;
    if (!upper || !title || !desc) return;

    const m = isMobile;
    const titleBase = m ? TITLE_BASE_M : TITLE_BASE_D;
    const titleMin = m ? TITLE_MIN_M : TITLE_MIN_D;
    const descBase = m ? DESC_BASE_M : DESC_BASE_D;
    const descMin = m ? DESC_MIN_M : DESC_MIN_D;
    const GAP = m ? 12 : 22; // расстояние заголовок↔текст (== marginTop текста)

    const avail = upper.clientHeight;
    if (avail <= 0) return;

    const lines = () => Math.ceil(title.scrollHeight / parseFloat(title.style.fontSize || "1"));

    // 1) заголовок: не больше 2 строк
    let ts = titleBase;
    title.style.fontSize = ts + "px";
    while (ts > titleMin && lines() > 2) {
      ts -= 2;
      title.style.fontSize = ts + "px";
    }

    // 2) текст: влезает ли весь в остаток
    const room = () => avail - title.offsetHeight - GAP;
    let ds = descBase;
    desc.style.fontSize = ds + "px";
    let guard = 0;
    while (ds > descMin && desc.scrollHeight > room() + 1 && guard++ < 80) {
      ds -= 0.5;
      desc.style.fontSize = ds + "px";
    }

    // 3) если текст всё ещё не влез — жмём заголовок до 1 строки (и стоп)
    guard = 0;
    while (desc.scrollHeight > room() + 1 && ts > titleMin && guard++ < 60) {
      ts -= 2;
      title.style.fontSize = ts + "px";
      if (lines() <= 1) break; // дальше не уменьшаем
    }
  }, [isMobile, index]);

  useLayoutEffect(() => {
    fitText();
  }, [fitText, ch?.id, isMobile]);

  useEffect(() => {
    const el = upperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => fitText());
    ro.observe(el);
    window.addEventListener("resize", fitText);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fitText);
    };
  }, [fitText, ch?.id, isMobile]);

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
              padding: vertical ? "11px 16px" : "clamp(6px, 0.8vw, 9px) clamp(11px, 1.3vw, 17px)",
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
          transform: `translateY(-50%) scale(${isHover ? 1.12 : 1})`,
          zIndex: 5,
          width: "clamp(42px, 3.2vw, 54px)",
          height: "clamp(42px, 3.2vw, 54px)",
          borderRadius: "50%",
          border: `1.5px solid ${isHover ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)"}`,
          background: isHover ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.18)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          transition: "all 0.22s ease",
          left: dir === "prev" ? "clamp(14px, 1.6vw, 28px)" : undefined,
          right: dir === "next" ? "clamp(14px, 1.6vw, 28px)" : undefined,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {dir === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
        </svg>
      </button>
    );
  };

  // Боковые отступы контент-блока = зона стрелок + запас, чтобы стрелки висели в полях
  const SIDE = isMobile ? "58px" : "clamp(86px, 7vw, 150px)";
  const TEXT_W = isMobile ? "auto" : "clamp(360px, 30vw, 560px)";
  const UPPER_GAP = isMobile ? 12 : 22;

  return (
    <main style={{ height: "100dvh", width: "100%", position: "relative", overflow: "hidden" }}>
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

      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", pointerEvents: "none", zIndex: 1 }} />
      {/* ambient-виньетка для глубины */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(120% 90% at 70% 40%, transparent 35%, rgba(0,0,0,0.55) 100%)",
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
          zIndex: 6,
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
          <img src="/logo/BezdGam.png" alt="Bezdary Games" style={{ height: isMobile ? "56px" : "100px", width: "auto", display: "block" }} />
          <span style={{ color: "#ffffff", fontSize: isMobile ? "16px" : "22px", lineHeight: 1, opacity: 0.7 }}>×</span>
          <img src="/logo/OtherWays-logo.png" alt="Other Ways" style={{ height: isMobile ? "24px" : "50px", width: "auto", display: "block" }} />
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
                    color: isActive ? "#ffffff" : lit ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.62)",
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
                <span key={n} style={{ display: "block", width: "20px", height: "2px", background: "#ffffff", borderRadius: "2px", transition: "all 0.25s ease" }} />
              ))}
            </button>
          )}
        </div>
      </header>

      <div
        aria-hidden={!menuOpen}
        style={{ position: "fixed", inset: 0, zIndex: 50, display: isMobile ? "block" : "none", pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", opacity: menuOpen ? 1 : 0, transition: "opacity 0.3s ease" }}
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
              style={{ appearance: "none", WebkitAppearance: "none", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "10px", background: "transparent", color: "#fff", width: "40px", height: "38px", fontSize: "20px", lineHeight: 1, cursor: "pointer" }}
            >
              ×
            </button>
          </div>
          <nav aria-label="primary mobile" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {NAV.map((item, idx) => {
              const isActive = item === activeNav;
              return (
                <button
                  key={item}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => { setActiveNav(item); setMenuOpen(false); }}
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
                    transition: `opacity 0.4s ease ${menuOpen ? idx * 0.06 + 0.1 : 0}s, transform 0.4s ease ${menuOpen ? idx * 0.06 + 0.1 : 0}s, color 0.2s ease`,
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

      {/* КОНТЕНТ-БЛОК: два контейнера (текст | картинка), не перекрываются */}
      <section
        aria-label="character"
        style={{
          position: "absolute",
          left: SIDE,
          right: SIDE,
          top: isMobile ? "84px" : "clamp(120px, 15vh, 168px)",
          bottom: isMobile ? "16px" : "clamp(24px, 4vh, 56px)",
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "12px" : "clamp(24px, 3vw, 64px)",
        }}
      >
        {/* ЛЕВЫЙ КОНТЕЙНЕР — текст (фикс. ширина на desktop) */}
        <div
          className="char-fade"
          key={`text-${index}`}
          style={{
            width: TEXT_W,
            flexShrink: 0,
            minWidth: 0, // добавлено
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            flex: isMobile ? "1 1 auto" : "0 0 auto",
          }}
        >
          {/* верх: заголовок + текст (автоподбор) */}
          <div ref={upperRef} style={{ flex: "1 1 auto", minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <h1
              ref={titleRef}
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "#ffffff",
                fontSize: isMobile ? TITLE_BASE_M : TITLE_BASE_D,
                letterSpacing: "0.06em",
                lineHeight: 1,
                fontWeight: 700,
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              {ch.name}
            </h1>
            <p
              ref={descRef}
              style={{
                fontFamily: "'Courier New', ui-monospace, monospace",
                color: "rgba(255,255,255,0.85)",
                fontSize: isMobile ? DESC_BASE_M : DESC_BASE_D,
                lineHeight: isMobile ? 1.6 : 1.7,
                letterSpacing: "0.02em",
                marginTop: UPPER_GAP,
                marginBottom: 0,
              }}
            >
              {ch.description}
            </p>
          </div>

          {/* низ (футер): плеер(ы) фиксированного размера */}
          {ch.audio && (
            <div
              style={{
                pointerEvents: "auto",
                flexShrink: 0,
                marginTop: isMobile ? "12px" : "22px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {typeof ch.audio === "string" ? (
                <VoicePlayer src={ch.audio} />
              ) : (
                ch.audio.map((t) => <VoicePlayer key={t.src} src={t.src} label={t.label} />)
              )}
            </div>
          )}
        </div>

        {/* ПРАВЫЙ КОНТЕЙНЕР — картинка по центру, contain (масштаб по максимуму с пропорцией) */}
        <div
          style={{
            flex: "1 1 auto",
            minWidth: 0,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <FitImage
            key={`img-${index}`}
            src={ch.image}
            alt={ch.name}
            shift={ch.imageShift}
            isMobile={isMobile}
          />
        </div>
      </section>

      {/* СТРЕЛКИ — вне контент-контейнеров, по центру экрана поверх фона */}
      <Arrow dir="prev" />
      <Arrow dir="next" />
    </main>
  );
}

function FitImage({
  src,
  alt,
  shift,
  isMobile,
}: {
  src: string;
  alt: string;
  shift?: number;
  isMobile: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Подстраховка для уже закэшированных картинок —
  // иногда onLoad не успевает сработать, если картинка была в кэше браузера
  useEffect(() => {
    setLoaded(false);
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div
      style={{
        flex: "1 1 auto",
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => console.error("[FitImage] не загрузилась картинка:", src)}
        className="char-fade"
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          opacity: loaded ? 1 : 0,
          transform: !isMobile && shift ? `translateX(${shift}px)` : undefined,
          transition: "opacity 0.25s ease, transform 0.4s ease",
        }}
      />
    </div>
  );
}