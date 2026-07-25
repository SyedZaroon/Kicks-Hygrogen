import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { COLLECTION_PRODUCTS_QUERY } from '../utils/getAllProducts';
import ProductGrid from '../components/collection/ProductGrid';
import Pagination from '../components/collection/Pagination';
import NotFound from './NotFound';

export default function CollectionPage() {
  const { collectionHandle } = useParams();
  const handle = collectionHandle || "all-products";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursors, setCursors] = useState([null]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState(null);
  const [collectionNotFound, setCollectionNotFound] = useState(false); 

  const fetchProducts = useCallback(async (cursor = null, direction = null) => {
    setLoading(true);
    setCollectionNotFound(false);
    const url = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/${import.meta.env.VITE_SHOPIFY_STORE_VERSION}/graphql.json`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN 
        },
        body: JSON.stringify({
          query: COLLECTION_PRODUCTS_QUERY,
          variables: { handle, first: 4, after: cursor },
        }),
      });

      const result = await response.json();

      if (!result.data || !result.data.collection) {
        setCollectionNotFound(true);
        setProducts([]);
        return;
      }

      const data = result.data?.collection?.products;

      if (data) {
        setProducts(data.edges);
        setHasNextPage(data.pageInfo.hasNextPage);
        
        // Pagination logic
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
  }, [handle]);

  useEffect(() => {
    fetchProducts();
  }, [handle, fetchProducts]);

  if (loading && products.length === 0) return <div className="p-20 text-center">Loading Collection...</div>;
  if (error) return <div className="p-20 text-center text-red-500">Error: {error}</div>;

  if (collectionNotFound) return <NotFound />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black mb-8 capitalize">{handle.replace(/-/g, ' ')}</h1>
      
      <ProductGrid products={products} handle={handle} />
  
  {
    products.length > 3 && (
      <Pagination
        hasNextPage={hasNextPage}
        hasPreviousPage={currentPage > 0}
        loading={loading}
        onPageChange={(dir) => {
          if (dir === 'next') fetchProducts(products[products.length - 1].cursor, 'next');
          else fetchProducts(cursors[currentPage - 1], 'prev');
        }}
      />
    )
  }




    </div>
  );
}