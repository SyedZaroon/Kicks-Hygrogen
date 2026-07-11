import React, { useRef, useState, useEffect } from "react";
import ArrowLeft from "../../assets/icons/fill/ArrowLeft";
import ArrowRight from "../../assets/icons/fill/ArrowRight";
import ShoppingBag from "../../assets/icons/fill/ShoppingBag";
import { useStorefrontQuery } from "../../hooks/useStorefrontQuery";
import { COLLECTION_PRODUCTS_QUERY } from "../../utils/getAllProducts";
import { Link } from "react-router-dom";

export default function ProductSlider({
  title = "DON'T MISS OUT",
  accent = "NEW DROPS",
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

  const { data, loading, error } = useStorefrontQuery(
    COLLECTION_PRODUCTS_QUERY,
    {
      handle: "all-products",
      first: 5,
      after: null,
    },
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products.</p>;

  const productEdges = data?.collection?.products?.edges ?? [];

  console.log(productEdges);

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
        {productEdges.map(({ node: p }) => {
          const firstVariant = p.variants?.edges?.[0]?.node;
          const price = firstVariant?.price;

          return (
            <article key={p.id} className="kicks-card flex-shrink-0 group">
              <div
                className="relative overflow-hidden rounded-xl mb-3"
                style={{
                  backgroundColor: "var(--color-fawhite)",
                  aspectRatio: "1 / 1",
                }}
              >
                <button
                  onClick={() => onAddToCart && onAddToCart(p)}
                  aria-label={`Add ${p.title} to cart`}
                  className="absolute bottom-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                  style={{ backgroundColor: "var(--color-white)" }}
                >
                  <ShoppingBag size={15} iconColor="var(--color-darkgray)" />
                </button>
                <Link
                  to={`/collection/all-products/product/${p.handle}`}
                  className="absolute inset-0 w-full h-full"
                  aria-label={`View ${p.title}`}
                >
                  <img
                    src={p.featuredImage?.url}
                    alt={p.featuredImage?.altText || p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </Link>
              </div>

              <p
                className="text-xs mb-1 font-[family-name:var(--font-open-sans)]"
                style={{ color: "var(--color-graymain)" }}
              >
                {p.productType}
              </p>
              <button
                onClick={() => onSelectProduct && onSelectProduct(p)}
                className="h6 mb-1.5 text-left block"
                style={{ color: "var(--color-darkgray)" }}
              >
                {p.title}
              </button>
            </article>
          );
        })}
      </div>

      <style>{`
        .kicks-track { scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none; }
        .kicks-track::-webkit-scrollbar { display: none; }
        .kicks-card { scroll-snap-align: start; width: 88%; }
        @media (min-width: 768px) { .kicks-card { width: calc(50% - 8px); } }
        @media (min-width: 1024px) { .kicks-card { width: calc(25% - 12px); } }
      `}</style>
    </section>
  );
}
