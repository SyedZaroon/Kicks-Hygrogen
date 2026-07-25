import React, { useState, useEffect, useRef, useCallback } from "react";
import ArrowRight from "../../assets/icons/fill/ArrowRight";
import ArrowLeft from "../../assets/icons/fill/ArrowLeft";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { SLIDES } from "../../data/HeroSilderData";


const AUTOPLAY_MS = 5500;

export default function HeroSlider({ onNavigate }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragState = useRef({ startX: 0, dragging: false, delta: 0 });
  const trackRef = useRef(null);
  const count = SLIDES.length;

  const goTo = useCallback(
    (i) => setIndex(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, count]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const onPointerDown = (e) => {
    dragState.current.dragging = true;
    dragState.current.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragState.current.delta = 0;
    setPaused(true);
  };
  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragState.current.delta = x - dragState.current.startX;
  };
  const endDrag = () => {
    if (!dragState.current.dragging) return;
    const { delta } = dragState.current;
    if (delta > 60) prev();
    else if (delta < -60) next();
    dragState.current.dragging = false;
    dragState.current.delta = 0;
    setPaused(false);
  };

  const go = (path) => {
    if (onNavigate) onNavigate(path);
  };

  return (
    <section
      className="relative w-full overflow-hidden select-none rounded-2xl sm:rounded-3xl bg-(--color-darkgray)"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
    >
      <div
        ref={trackRef}
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="relative w-full shrink-0"
            style={{ height: "clamp(320px, 55vw, 560px)" }}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(20,20,18,0.82) 0%, rgba(20,20,18,0.55) 45%, rgba(20,20,18,0.15) 75%)",
              }}
            />

            <div className="relative z-10 h-full flex items-center px-6 sm:px-12 lg:px-16">
              <div
                className="max-w-md"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? "translateY(0)" : "translateY(12px)",
                  transition:
                    "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
                }}
              >
                <Badge text={slide.tag} />
                <h2
                  className="my-3"
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "clamp(1.9rem, 5vw, 3.25rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                  }}
                >
                  {slide.headline}{" "}
                  <span className="text-(--color-blue)">{slide.accent}</span>
                </h2>
                <p
                  className="mb-6 text-sm sm:text-base"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                >
                  {slide.body}
                </p>
                <Button rightIcon={ArrowRight} iconColor="#fff" type="primary">
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/20"
        style={{
          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(4px)",
        }}
      >
        <ArrowLeft size={20} color="#fff" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-white/20"
        style={{
          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(4px)",
        }}
      >
        <ArrowRight size={20} color="#fff" />
      </button>

      <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.headline} ${slide.accent}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-(--color-blue)" : "bg-white/40"}`}
          />
        ))}
      </div>

      {!paused && (
        <div
          key={index}
          className="absolute bottom-0 left-0 h-0.75 z-20 bg-(--color-blue)"
          style={{
            animation: `kicks-progress ${AUTOPLAY_MS}ms linear forwards`,
          }}
        />
      )}

      <style>{`
        @keyframes kicks-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
