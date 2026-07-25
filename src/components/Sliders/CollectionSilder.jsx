import { useRef, useState, useEffect } from "react";
import ArrowLeft from "../../assets/icons/fill/ArrowLeft";
import ArrowRight from "../../assets/icons/fill/ArrowRight";
import { useStorefrontQuery } from "../../hooks/useStorefrontQuery.js";
import { COLLECTIONS_LIST } from "../../utils/getCollectionList.js";
import { Link } from "react-router-dom";

export default function CollectionSlider({
  title = "SHOP BY",
  accent = "CATEGORY",
  filterIds = [
    "gid://shopify/Collection/663368302941",
    "gid://shopify/Collection/663368368477",
    "gid://shopify/Collection/663368466781",
    "gid://shopify/Collection/663368499549",
    "gid://shopify/Collection/663368532317",
  ],
  onViewAll,
}) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 10);
    setAtEnd(Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth - 10);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (el) {
      el.addEventListener("scroll", updateEdges, { passive: true });
      window.addEventListener("resize", updateEdges);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", updateEdges);
        window.removeEventListener("resize", updateEdges);
      }
    };
  }, []);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".kicks-collection-card");
    if (!card) return;

    const amount = card.getBoundingClientRect().width + 16;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const { data, loading, error } = useStorefrontQuery(COLLECTIONS_LIST);

  if (loading) return <p>Loading collections...</p>;
  if (error) return <p>Failed to load collections.</p>;

  const allCollections = data?.collections?.nodes ?? [];
  const collections =
    filterIds.length > 0 ?
      allCollections.filter((c) => filterIds.includes(c.id))
    : allCollections;

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
              aria-label="Previous"
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
              aria-label="Next"
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

      <div
        ref={trackRef}
        className="kicks-collection-track flex gap-4 overflow-x-auto pb-2 scroll-smooth"
      >
        {collections.map((c) => (
          <Link
            key={c.id}
            to={`/collection/${c.handle}`}
            className="kicks-collection-card shrink-0 group relative overflow-hidden rounded-xl text-left"
            style={{ aspectRatio: "4 / 5" }}
          >
            <img
              src={c.image?.url}
              alt={c.title}
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
                  {c.title}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-neutrals-gray-2)" }}
                >
                  {c.count} Items
                </p>
              </div>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={14} color="var(--color-darkgray)" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .kicks-collection-track { scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none; }
        .kicks-collection-track::-webkit-scrollbar { display: none; }
        .kicks-collection-card { scroll-snap-align: start; width: 72%; }
        @media (min-width: 768px) { .kicks-collection-card { width: calc(50% - 8px); } }
        @media (min-width: 1024px) { .kicks-collection-card { width: calc(25% - 12px); } }
      `}</style>
    </section>
  );
}
