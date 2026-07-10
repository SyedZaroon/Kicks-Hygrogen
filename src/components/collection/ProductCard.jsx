import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductCard = ({ product, handle }) => {
  const availableVariants = product.variants?.edges
    ?.map(vEdge => vEdge.node)
    .filter(v => v.availableForSale && parseFloat(v.price.amount) > 0) || [];

  let priceDisplay = "Out of Stock";
  let currency = "GBP";

  if (availableVariants.length > 0) {
    const prices = availableVariants.map(v => parseFloat(v.price.amount));
    currency = availableVariants[0].price.currencyCode;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    priceDisplay = minPrice === maxPrice 
      ? `£${minPrice.toFixed(2)}` 
      : `£${minPrice.toFixed(2)} - £${maxPrice.toFixed(2)}`;
  }

  return (
    <div className="group border border-gray-200 rounded-xl p-4 flex flex-col justify-between bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div>
        <div className="w-full h-56 bg-gray-100 rounded-lg overflow-hidden relative mb-3">
          {product.featuredImage ? (
            <img 
              src={product.featuredImage.url} 
              alt={product.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">No Image</div>
          )}
        </div>

        {product.productType && (
          <span className="inline-block mb-1.5 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-gray-100 text-gray-600 rounded">
            {product.productType}
          </span>
        )}

        <h3 className="font-semibold text-gray-800 text-base line-clamp-2 mb-2 leading-snug">
          {product.title || 'Untitled Product'}
        </h3>
      </div>
      
      <div>
        <p className="text-xl font-black text-gray-900 mb-3">
          {priceDisplay} <span className="text-xs font-bold text-gray-500">{currency}</span>
        </p>
        
        <NavLink 
          to={availableVariants.length === 0 ? "#" : `/collection/${handle}/product/${product.handle}`}
          className={`w-full py-2.5 font-semibold text-sm rounded-lg text-center block transition-all duration-150 ${
            availableVariants.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
              : 'bg-black hover:bg-gray-800 text-white active:scale-[0.98]'
          }`}
        >
          {availableVariants.length === 0 ? 'Out of Stock' : 'View Product'}
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;