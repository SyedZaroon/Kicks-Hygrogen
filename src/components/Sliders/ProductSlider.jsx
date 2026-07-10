import React, { useRef, useState, useEffect } from "react";
import {PRODUCTS} from "../../data/ProductSliderData"
import ArrowLeft from "../../assets/icons/fill/ArrowLeft";
import ArrowRight from "../../assets/icons/fill/ArrowRight";
import ShoppingBag from "../../assets/icons/fill/ShoppingBag"



export default function ProductSlider({
  title = "DON'T MISS OUT",
  accent = "NEW DROPS",
  products = PRODUCTS,
  onViewAll,
  onAddToCart,
  onSelectProduct,
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
    const card = el.querySelector(".kicks-card");
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
              aria-label="Previous products"
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
              aria-label="Next products"
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
        className="kicks-track flex gap-4 overflow-x-auto pb-2"
      >
        {products.map((p) => (
          <article key={p.id} className="kicks-card flex-shrink-0 group">
            <div
              className="relative overflow-hidden rounded-xl mb-3"
              style={{
                backgroundColor: "var(--color-fawhite)",
                aspectRatio: "1 / 1",
              }}
            >
              {p.tag && (
                <span
                  className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-semibold rounded-full font-[family-name:var(--font-inter)]"
                  style={{
                    backgroundColor:
                      p.tag.startsWith("-") ?
                        "var(--color-darkgray)"
                      : "var(--color-blue)",
                    color: "var(--color-white)",
                  }}
                >
                  {p.tag}
                </span>
              )}
              <button
                onClick={() => onAddToCart && onAddToCart(p)}
                aria-label={`Add ${p.name} to cart`}
                className="absolute bottom-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                style={{ backgroundColor: "var(--color-white)" }}
              >
                <ShoppingBag size={15} iconColor="var(--color-darkgray)" />
              </button>
              <button
                onClick={() => onSelectProduct && onSelectProduct(p)}
                className="absolute inset-0 w-full h-full"
                aria-label={`View ${p.name}`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
              </button>
            </div>

            <p
              className="text-xs mb-1 font-[family-name:var(--font-open-sans)]"
              style={{ color: "var(--color-graymain)" }}
            >
              {p.category}
            </p>
            <button
              onClick={() => onSelectProduct && onSelectProduct(p)}
              className="h6 mb-1.5 text-left block"
              style={{ color: "var(--color-darkgray)" }}
            >
              {p.name}
            </button>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2 font-[family-name:var(--font-open-sans)]">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-darkgray)" }}
                >
                  ${p.price}
                </span>
                {p.compareAt && (
                  <span
                    className="text-xs"
                    style={{
                      color: "var(--color-graymain)",
                      textDecoration: "line-through",
                    }}
                  >
                    ${p.compareAt}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {p.colors.map((c, i) => (
                  <span
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: c,
                      border:
                        c === "var(--color-white)" ?
                          "1px solid var(--color-gray)"
                        : "none",
                    }}
                  />
                ))}
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
          --color-fawhite: rgba(250, 250, 250, 1);
          --color-gray: rgba(231, 231, 227, 1);
          --color-graymain: rgba(112, 112, 110, 1);
          --color-darkgray: rgba(35, 35, 33, 1);
          --font-open-sans: 'Open Sans', sans-serif;
          --font-rubik: 'Rubik', sans-serif;
          --font-inter: 'Inter', sans-serif;
        }
        .section-padding { padding-inline: clamp(16px, 4vw, 60px); }
        .h3 { font-size: clamp(24px, 3vw, 32px); font-family: var(--font-rubik); font-weight: 600; line-height: 100%; }
        .h6 { font-size: 16px; font-family: var(--font-rubik); font-weight: 600; line-height: 100%; }
        .kicks-track { scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none; }
        .kicks-track::-webkit-scrollbar { display: none; }
        .kicks-card { scroll-snap-align: start; width: 88%; }
        @media (min-width: 768px) { .kicks-card { width: calc(50% - 8px); } }
        @media (min-width: 1024px) { .kicks-card { width: calc(25% - 12px); } }
      `}</style>
    </section>
  );
}
