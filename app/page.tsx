"use client";
import { useEffect, useState } from "react";

// Суреттер тізімі — реті осылай ауысады.
const SLIDES = [
  "/bg-hero.png",
  "/bg-2.png",
  "/bg-3.png",
  "/bg-4.png",
  "/bg-5.png",
  "/bg-6.png",
];

export default function Page() {
  const [current, setCurrent] = useState(0);

  // Әр 10 секунд сайын келесі суретке ауысады
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(id);
  }, []);

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

      {/* 3-қабат: хедер — логотиптер */}
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
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src="/logo/BezdGam.png"
            alt="Bezdary Games"
            style={{ height: "36px", width: "auto", display: "block" }}
          />
          <span style={{ color: "#ffffff", fontSize: "22px", lineHeight: 1, opacity: 0.7 }}>
            ×
          </span>
          <img
            src="/logo/OtherWays-logo.png"
            alt="Other Ways"
            style={{ height: "36px", width: "auto", display: "block" }}
          />
        </div>

        {/* оң жақ — әзір бос, кейін тіл ауыстырғыш / меню қоямыз */}
      </header>
    </main>
  );
}