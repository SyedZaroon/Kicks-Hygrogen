import React from 'react';

const VariantPicker = ({
  productOption,
  allVariants,
  selectedOptions,
  onOptionChange
}) => {
  
  // 🎯 MATRIX LOGIC: Check karta hai ke kya yeh specific option value baqi selected options ke sath available hai?
  const isCombinationAvailable = (optionName, optionValue) => {
    const testSelection = {
      ...selectedOptions,
      [optionName]: optionValue
    };
    
    return allVariants.some(variant => {
      const isMatch = variant.node.selectedOptions.every(
        opt => testSelection[opt.name] === opt.value
      );
      // Combination match ho aur Shopify par iska availableForSale true ho
      return isMatch && variant.node.availableForSale;
    });
  };

  if (!productOption || productOption.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {productOption.map(option => {
        const currentSelectedValue = selectedOptions[option.name];
        
        return (
          <div key={option.id} className="flex flex-col gap-2">
            {/* Option Name & Current Selected Value */}
            <h4 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
              {option.name}: <span className="text-black font-bold normal-case">{currentSelectedValue}</span>
            </h4>

            {/* Option Values Buttons */}
            <div className="flex flex-wrap gap-2">
              {option.values.map((value, idx) => {
                const isSelected = currentSelectedValue === value;
                const isAvailable = isCombinationAvailable(option.name, value);
                
                return (
                  <button
                    key={`${option.id}-${idx}`}
                    type="button"
                    disabled={!isAvailable} // 🛑 Agar combination available nahi hai to button disable ho jayega
                    onClick={() => onOptionChange(option.name, value)}
                    className={`px-4 py-2 text-sm font-medium border rounded-md transition-all duration-150 ${
                      isSelected 
                        ? 'bg-black text-white border-black shadow-sm' // Selected
                        : !isAvailable 
                        ? 'bg-gray-50 text-gray-300 border-gray-200 line-through cursor-not-allowed opacity-40' // Disabled / Out of Stock
                        : 'bg-white text-gray-800 border-gray-300 hover:border-black active:scale-[0.98]' // Available but Unselected
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantPicker;