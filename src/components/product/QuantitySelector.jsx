import React from 'react';

const QuantitySelector = ({ quantity, setQuantity, maxStock }) => {
  
  // Input change hone par trigger hoga
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    
    // Agar input khali hai to 1 set karein, warna value ko limit mein rakhein
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else if (value > maxStock) {
      setQuantity(maxStock);
    } else {
      setQuantity(value);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <span className="text-sm font-bold text-gray-700">Quantity:</span>
      
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        {/* Decrease */}
        <button 
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          className="px-4 py-2 hover:bg-gray-100 font-bold border-r border-gray-300"
        >-</button>

        {/* 🎯 Input Field - Yahan se direct likh sakte hain */}
        <input
          type="number"
          min="1"
          max={maxStock}
          value={quantity}
          onChange={handleChange}
className="w-16 text-center py-2 font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"        />

        {/* Increase */}
        <button 
          onClick={() => setQuantity(prev => Math.min(maxStock || 99, prev + 1))}
          disabled={quantity >= maxStock}
          className="px-4 py-2 hover:bg-gray-100 font-bold border-l border-gray-300 disabled:opacity-30"
        >+</button>
      </div>
      
      {maxStock > 0 && <span className="text-xs text-gray-500">{maxStock} in stock</span>}
    </div>
  );
};

export default QuantitySelector;