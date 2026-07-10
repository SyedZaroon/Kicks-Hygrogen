import React, { useRef, useState, useEffect } from "react";
import {COLLECTIONS} from "../../data/CollectionSliderData"
import ArrowLeft from "../../assets/icons/fill/ArrowLeft";
import ArrowRight from "../../assets/icons/fill/ArrowRight";



export default function CollectionSlider({
  title = "SHOP BY",
  accent = "CATEGORY",
  collections = COLLECTIONS,
  onViewAll,
  onSelectCollection,
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
    const card = el.querySelector(".kicks-collection-card");
    const amount = card ? card.getBoundingClientRect().width + 16 : 300;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="w-full">
      {/* header */}
      <div className="flex items-end justify-between mb-5">
        <h3 className="h3" style={{ color: "var(--color-darkgray)" }}>
          {title} <span style={{ color: "var(--color-blue)" }}>{accent}</span>
        </h3>

        <div className="flex items-center gap-3 flex-shrink-0">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="hidden sm:inline text-sm font-medium font-[family-name:var(--font-inter)]"
              style={{ color: "var(--color-graymain)" }}
            >
              View all
            </button>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Previous categories"
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
              aria-label="Next categories"
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
      </div>

      {/* track */}
      <div
        ref={trackRef}
        className="kicks-collection-track flex gap-4 overflow-x-auto pb-2"
      >
        {collections.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectCollection && onSelectCollection(c)}
            className="kicks-collection-card flex-shrink-0 group relative overflow-hidden rounded-xl text-left"
            style={{ aspectRatio: "4 / 5" }}
          >
            <img
              src={c.image}
              alt={c.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(31,26,36,0) 40%, rgba(31,26,36,0.75) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <div>
                <p
                  className="h5 mb-0.5"
                  style={{ color: "var(--color-white)" }}
                >
                  {c.name}
                </p>
                <p
                  className="text-xs font-[family-name:var(--font-open-sans)]"
                  style={{ color: "var(--color-neutrals-gray-2)" }}
                >
                  {c.count}
                </p>
              </div>
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ backgroundColor: "var(--color-white)" }}
              >
                <ArrowRight size={14} color="var(--color-darkgray)" />
              </span>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
        :root {
          --color-blue: rgba(74, 105, 226, 1);
          --color-white: rgba(255, 255, 255, 1);
          --color-gray: rgba(231, 231, 227, 1);
          --color-graymain: rgba(112, 112, 110, 1);
          --color-darkgray: rgba(35, 35, 33, 1);
          --color-neutrals-gray-2: #D2D1D3;
          --font-open-sans: 'Open Sans', sans-serif;
          --font-rubik: 'Rubik', sans-serif;
          --font-inter: 'Inter', sans-serif;
        }
        .section-padding { padding-inline: clamp(16px, 4vw, 60px); }
        .h3 { font-size: clamp(24px, 3vw, 32px); font-family: var(--font-rubik); font-weight: 600; line-height: 100%; }
        .h5 { font-size: clamp(14px, 11vw, 20px); font-family: var(--font-rubik); font-weight: 600; line-height: 100%; }
        .kicks-collection-track { scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none; }
        .kicks-collection-track::-webkit-scrollbar { display: none; }
        .kicks-collection-card { scroll-snap-align: start; width: 72%; }
        @media (min-width: 768px) { .kicks-collection-card { width: calc(50% - 8px); } }
        @media (min-width: 1024px) { .kicks-collection-card { width: calc(25% - 12px); } }
      `}</style>
    </section>
  );
}
