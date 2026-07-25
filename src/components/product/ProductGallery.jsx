import React, { useState, useEffect } from "react";

const ProductGallery = ({ productImages, activeVariantImage }) => {
  const [mainImage, setMainImage] = useState(
    activeVariantImage || productImages?.[0]?.node?.url || ""
  );

  useEffect(() => {
    if (activeVariantImage) {
      setMainImage(activeVariantImage);
    }
  }, [activeVariantImage]);

  useEffect(() => {
    if (!activeVariantImage && productImages?.length > 0) {
      setMainImage(productImages[0]?.node?.url);
    }
  }, [productImages]);

  return (
    <div className="flex gap-6 select-none">
      {productImages?.length > 1 && (
        <div className="flex flex-col gap-2 max-h-112 overflow-y-auto">
          {productImages.map((image, index) => {
            const currentThumbUrl = image.node?.url;
            const isActive = mainImage === currentThumbUrl;

            return (
              <img
                key={image.node?.id || index}
                src={currentThumbUrl}
                alt={image.node?.altText || "Product Thumbnail"}
                width={68}
                height={68}
                style={{ width: '68px', height: '68px' }}
                onMouseEnter={() => setMainImage(currentThumbUrl)}
                onClick={() => setMainImage(currentThumbUrl)}
                className={`rounded-lg object-cover p-0.5 border-2 transition-all duration-150 cursor-pointer ${
                  isActive 
                    ? "border-black scale-95 shadow-sm" 
                    : "border-transparent hover:border-gray-400"
                }`}
              />
            );
          })}
        </div>
      )}

      <div className="w-full h-112 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
        {mainImage ? (
          <img
            src={mainImage}
            alt="Product Main Display"
            className="w-full h-full object-cover transition-all duration-200 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            No Image Available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;