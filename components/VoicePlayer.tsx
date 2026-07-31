"use client";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#76e000";
// Кішкентай тақырып — label берілмесе, осы шығады.
const VOICE_LABEL = "ГОЛОС";

function fmt(t: number) {
  if (!isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VoicePlayer({ src, label }: { src: string; label?: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [duration, setDuration] = useState(0);
  const [hover, setHover] = useState(false);
  const [seekHover, setSeekHover] = useState(false);

  // Персонаж (src) ауысқанда — ойнатуды тоқтат, нөлге қайтар
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setPlaying(false);
    setProgress(0);
  }, [src]);

  // Компонент өшкенде (персонаж/трек ауысқанда) — дыбысты тоқтат
  useEffect(() => {
    const a = ref.current;
    return () => {
      if (a) {
        a.pause();
        a.currentTime = 0;
      }
    };
  }, []);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  // Жолақты басқанда — сол жерге өтеді (seek)
  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = ref.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = pct * a.duration;
    setProgress(pct);
  };

  if (!src) return null;

  return (
    <div
      style={{
        pointerEvents: "auto", // МАҢЫЗДЫ: section pointerEvents:none ішінде басылсын
        display: "flex",
        alignItems: "center",
        gap: "14px",
        maxWidth: "440px",
        userSelect: "none",
      }}
    >
      {/* play / pause */}
      <button
        type="button"
        aria-label={playing ? "pause voice" : "play voice"}
        onClick={toggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flexShrink: 0,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: `1.5px solid ${
            hover || playing ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)"
          }`,
          background: hover || playing ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)",
          color: hover || playing ? ACCENT : "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          transition: "all 0.22s ease",
          transform: hover ? "scale(1.06)" : "scale(1)",
          boxShadow: playing ? `0 0 14px ${ACCENT}55` : "none",
        }}
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginLeft: "2px" }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* жолақ + уақыт */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
        <span
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
          }}
        >
          {label ?? VOICE_LABEL}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            onClick={onSeek}
            onMouseEnter={() => setSeekHover(true)}
            onMouseLeave={() => setSeekHover(false)}
            style={{
              position: "relative",
              flex: 1,
              height: "14px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: seekHover ? "4px" : "3px",
                background: "rgba(255,255,255,0.22)",
                borderRadius: "3px",
                transition: "height 0.2s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                width: `${progress * 100}%`,
                height: seekHover ? "4px" : "3px",
                background: "#ffffff",
                borderRadius: "3px",
                transition: "height 0.2s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: `calc(${progress * 100}% - 6px)`,
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: ACCENT,
                boxShadow: `0 0 8px ${ACCENT}88`,
                opacity: playing || seekHover ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.6)",
              minWidth: "78px",
              textAlign: "right",
            }}
          >
            {fmt(progress * duration)} / {fmt(duration)}
          </span>
        </div>
      </div>

      <audio
        ref={ref}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setProgress(a.duration ? a.currentTime / a.duration : 0);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
          if (ref.current) ref.current.currentTime = 0;
        }}
      />
    </div>
  );
}