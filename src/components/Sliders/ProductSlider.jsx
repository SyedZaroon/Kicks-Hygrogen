import React, { useRef, useState, useEffect } from "react";
import ArrowLeft from "../../assets/icons/fill/ArrowLeft";
import ArrowRight from "../../assets/icons/fill/ArrowRight";
import ShoppingBag from "../../assets/icons/fill/ShoppingBag";
import { useStorefrontQuery } from "../../hooks/useStorefrontQuery";
import { COLLECTION_PRODUCTS_QUERY } from "../../utils/getAllProducts";
import { Link } from "react-router-dom";
import ProductCard from "../collection/ProductCard";

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

  return (
    <section className="w-full">
      <div className="flex items-end justify-between mb-5">
        <h3 className="h3" style={{ color: "var(--color-darkgray)" }}>
          {title} <span style={{ color: "var(--color-blue)" }}>{accent}</span>
        </h3>

        <div className="flex items-center gap-3 shrink-0">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="hidden sm:inline text-sm font-medium"
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
              className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity cursor-pointer disabled:cursor-not-allowed"
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
              className="flex items-center justify-center w-9 h-9 rounded-full transition-opacity cursor-pointer disabled:cursor-not-allowed"
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

      <div
        ref={trackRef}
        className="kicks-track flex gap-4 overflow-x-auto pb-2 scrollbar-none  "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {productEdges.map(({ node: p }) => {
          const firstVariant = p.variants?.edges?.[0]?.node;
          const price = firstVariant?.price;

          return (
            <div key={p.id} className="shrink-0 w-[280px] sm:w-[300px]">
              <ProductCard
                product={p}
                price={price}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}