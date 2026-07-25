import React, { useRef, useState, useEffect } from "react";
import { REVIEWS } from "../../data/ReviewsSliderData";
import ArrowLeft from "../../assets/icons/fill/ArrowLeft";
import ArrowRight from "../../assets/icons/fill/ArrowRight";
import Star from "../../assets/icons/fill/Star";
import BadgeCheck from "../../assets/icons/fill/BadgeCheck";

export default function ReviewsSlider({
  title = "REAL PEOPLE.",
  accent = "REAL KICKS.",
  reviews = REVIEWS,
}) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".kicks-review-card");
    const amount = card ? card.getBoundingClientRect().width + 16 : 300;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="w-full">
      <div className="flex items-end justify-between mb-5">
        <h3 className="h3" style={{ color: "var(--color-darkgray)" }}>
          {title} <span style={{ color: "var(--color-blue)" }}>{accent}</span>
        </h3>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous reviews"
            className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity"
            style={{
              border: "1px solid var(--color-gray)",
              opacity: atStart ? 0.35 : 1,
            }}
          >
            <ArrowLeft size={17} color="var(--color-darkgray)" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next reviews"
            className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity"
            style={{
              border: "1px solid var(--color-gray)",
              opacity: atEnd ? 0.35 : 1,
            }}
          >
            <ArrowRight size={17} color="var(--color-darkgray)" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="kicks-review-track flex gap-4 overflow-x-auto pb-2"
      >
        {reviews.map((r) => (
          <article
            key={r.id}
            className="kicks-review-card shrink-0 rounded-xl p-5 flex flex-col"
            style={{
              backgroundColor: "var(--color-white)",
              border: "1px solid var(--color-gray)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    iconColor={i < r.rating ? "var(--color-yellow)" : "none"}
                  />
                ))}
              </div>
            </div>

            <p
              className="text-sm mb-5 leading-relaxed flex-1 "
              style={{ color: "var(--color-darkgray)" }}
            >
              "{r.text}"
            </p>

            <div className="flex items-center gap-3">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-9 h-9 rounded-full object-cover shrink-0"
                draggable={false}
              />
              <div>
                <div className="flex items-center gap-1">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-darkgray)" }}
                  >
                    {r.name}
                  </span>
                  {r.verified && (
                    <BadgeCheck size={13} color="var(--color-blue)" />
                  )}
                </div>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-graymain)" }}
                >
                  {r.location}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
        :root {
          --color-blue: rgba(74, 105, 226, 1);
          --color-yellow: rgba(255, 165, 47, 1);
          --color-white: rgba(255, 255, 255, 1);
          --color-gray: rgba(231, 231, 227, 1);
          --color-graymain: rgba(112, 112, 110, 1);
          --color-darkgray: rgba(35, 35, 33, 1);
          --font-open-sans: 'Open Sans', sans-serif;
          --font-rubik: 'Rubik', sans-serif;
          --font-inter: 'Inter', sans-serif;
        }
        .section-padding { padding-inline: clamp(16px, 4vw, 60px); }
        .h3 { font-size: clamp(24px, 3vw, 32px); font-family: var(--font-rubik); font-weight: 600; line-height: 100%; }
        .kicks-review-track { scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none; }
        .kicks-review-track::-webkit-scrollbar { display: none; }
        .kicks-review-card { scroll-snap-align: start; width: 88%; }
        @media (min-width: 768px) { .kicks-review-card { width: calc(50% - 8px); } }
        @media (min-width: 1024px) { .kicks-review-card { width: calc(25% - 12px); } }
      `}</style>
    </section>
  );
}
