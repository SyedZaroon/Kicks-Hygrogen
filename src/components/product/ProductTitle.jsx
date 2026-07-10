import React from 'react';

const ProductTitle = ({ productTitle, selectedOptions = [], className }) => {
  
  // Console check ke array ke andar actual keys kya hain (e.g., {name, value})
  console.log("ProductTitle Rendered with Options:", selectedOptions);

  return (
    <div>
      <h2 className={`font-extrabold tracking-tight text-gray-900 text-2xl md:text-3xl ${className}`}>
        {productTitle || "Untitled Product"}
      </h2>

      {selectedOptions && selectedOptions.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedOptions.map((option, index) => {

            const optionValue = option?.value || option;
            const isLastItem = index === selectedOptions.length - 1;

            return (
              <div 
                key={option?.name || index} 
              >
                <span className="text-lg font-medium">{optionValue}{!isLastItem && ' /'}</span> 
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-gray-400 mt-2 italic">No variant options selected</p>
      )}
    </div>
  );
};

export default ProductTitle;