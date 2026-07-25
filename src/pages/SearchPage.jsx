import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SEARCH_PRODUCTS_QUERY } from '../utils/searchProducts';
import ProductGrid from '../components/collection/ProductGrid';
import Pagination from '../components/collection/Pagination';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursors, setCursors] = useState([null]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState(null);

  const [inputVal, setInputVal] = useState(searchQuery);

  const fetchSearchResults = useCallback(async (cursor = null, direction = null) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
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
            query: searchQuery, 
            first: 4, 
            after: cursor 
          },
        }),
      });

      const result = await response.json();
      const data = result.data?.products;

      if (data) {
        setProducts(data.edges);
        setHasNextPage(data.pageInfo.hasNextPage);
        
        if (direction === 'next') {
          setCursors(prev => [...prev, data.pageInfo.endCursor]);
          setCurrentPage(prev => prev + 1);
        } else if (direction === 'prev') {
          setCursors(prev => prev.slice(0, -1));
          setCurrentPage(prev => prev - 1);
        } else {
          setCursors([null]);
          setCurrentPage(0);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    setInputVal(searchQuery);
    fetchSearchResults();
  }, [searchQuery, fetchSearchResults]);

  const handleNewSearch = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  if (loading && products.length === 0) return <div className="p-20 text-center">Searching Products...</div>;
  if (error) return <div className="p-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <form onSubmit={handleNewSearch} className="mb-8 flex gap-2 max-w-xl">
        <input 
          type="text" 
          value={inputVal} 
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Search products..." 
          className="flex-1 border px-4 py-2 rounded-md outline-none focus:border-black"
        />
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-md font-medium">
          Search
        </button>
      </form>

      <h1 className="text-3xl font-black mb-8">
        {searchQuery ? `Search Results for: "${searchQuery}"` : "Search Products"}
      </h1>
      
      {products.length === 0 ? (
        <p className="text-gray-500 py-10">No products found matching your search.</p>
      ) : (
        <>
          <ProductGrid products={products} />
          
{
    (hasNextPage || currentPage > 0) && (
          <Pagination
              hasNextPage={hasNextPage}
              hasPreviousPage={currentPage > 0}
              loading={loading}
              onPageChange={(dir) => {
                if (dir === 'next') fetchSearchResults(products[products.length - 1].cursor, 'next');
                else fetchSearchResults(cursors[currentPage - 1], 'prev');
              }}
            />
    )
} 
        </>
      )}
    </div>
  );
}