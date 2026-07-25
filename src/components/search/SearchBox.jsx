// SearchOverlay.jsx

import { useEffect, useRef, useState } from "react";
import Icon from "../ui/Icon";
import { useNavigate } from "react-router-dom";
import SearchFill from "../../assets/icons/fill/SearchFill";
import { SEARCH_PRODUCTS_QUERY } from "../../utils/searchProducts"; // Aapki query ka path

// Real Shopify API search function
const searchShopifyProducts = async (query) => {
  if (!query.trim()) return [];

  const url = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/${import.meta.env.VITE_SHOPIFY_STORE_VERSION}/graphql.json`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN 
      },
      body: JSON.stringify({
        query: SEARCH_PRODUCTS_QUERY,
        variables: { 
          query: query, // Shopify ke liye search term
          first: 5 // Overlay mein max 5 products dikhane ke liye
        },
      }),
    });

    const result = await response.json();
    const edges = result.data?.products?.edges || [];

    // Shopify data format ko clean format mein convert karna
    return edges.map(({ node }) => ({
      id: node.id,
      slug: node.handle,
      name: node.title,
      image: node.images.edges[0]?.node?.url || "/placeholder.jpg"
    }));
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

// Related / suggested searches jab kuch match na mile ya empty ho
const relatedSuggestions = [
  "Cardboard Boxes",
  "Mailing Bags",
  "Envelopes",
  "Tapes",
  "Labels",
];

const SearchBox = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(async () => {
      const data = await searchShopifyProducts(query);
      setResults(data);
      setIsSearching(false);
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleProductClick = (slug) => {
    onClose();
    navigate(`/product/${slug}`); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60">
      {/* Backdrop click to close */}
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl mt-10 mx-4 rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b pb-3">
          <Icon variant="text">
            <SearchFill />
          </Icon>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 outline-none text-lg"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold"
          >
            Close
          </button>
        </form>

        <div className="mt-4">
          {isSearching && (
            <p className="text-sm text-gray-500">Searching...</p>
          )}

          {/* Case 1: Products found */}
          {!isSearching && query.trim() && results.length > 0 && (
            <ul className="flex flex-col gap-3">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => handleProductClick(product.slug)}
                    className="flex items-center gap-3 w-full text-left hover:bg-gray-50 p-2 rounded-lg"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <span className="font-medium">{product.name}</span>
                  </button>
                </li>
              ))}

              <li className="pt-2 border-t">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-sm font-semibold underline w-full text-center py-1 text-blue-600"
                >
                  See all results for "{query}"
                </button>
              </li>
            </ul>
          )}

          {/* Case 2: No products found -> related searches */}
          {!isSearching && query.trim() && results.length === 0 && (
            <div>
              <p className="text-gray-600 mb-3">
                No products found for "<strong>{query}</strong>"
              </p>
              <p className="text-sm font-semibold mb-2">Related searches</p>
              <div className="flex flex-wrap gap-2">
                {relatedSuggestions.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Case 3: Empty input -> popular/recent searches */}
          {!query.trim() && (
            <div>
              <p className="text-sm font-semibold mb-2">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {relatedSuggestions.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;