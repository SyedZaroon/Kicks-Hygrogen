import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import ProductGallery from '../components/product/ProductGallery';
import ProductBadge from '../components/product/ProductBadge';
import ProductTitle from '../components/product/ProductTitle';
import ProductPrice from '../components/product/ProductPrice';
import VariantPicker from '../components/product/VariantPicker';
import QuantitySelector from '../components/product/QuantitySelector';

import { addToCart } from '../utils/cartService';
import { PRODUCT_DETAILS_QUERY } from '../utils/getProductDetails';
import NotFound from './NotFound';

const ProductPage = () => {
  const { collectionHandle, productHandle } = useParams();
  const handle = productHandle;

  const [searchParams, setSearchParams] = useSearchParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for Active Variant tracking
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeVariant, setActiveVariant] = useState(null);

  // Helper Functions text cleanup aur formatting ke liye
  const SHOPIFY_PREFIX = "gid://shopify/ProductVariant/";
  const getCleanId = (fullGid) => fullGid ? fullGid.replace(SHOPIFY_PREFIX, "") : "";
  const getFullGid = (shortId) => shortId ? `${SHOPIFY_PREFIX}${shortId}` : "";

  // Stock managment
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [activeVariant]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      
      setLoading(true);
      setError(null);
      setProduct(null);

      const url = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/${import.meta.env.VITE_SHOPIFY_STORE_VERSION}/graphql.json`;
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
          },
          body: JSON.stringify({
            query: PRODUCT_DETAILS_QUERY,
            variables: { handle }
          })
        });

        const result = await response.json();
        const productData = result.data?.product;

        if (productData) {
          setProduct(productData);
          const allVariants = productData.variants?.edges || [];

          // 1. Incoming URL short ID ko full GID mein convert kar ke search karo
          const urlVariantId = searchParams.get('variant');
          const fullUrlGid = getFullGid(urlVariantId);
          let targetVariant = allVariants.find(v => v.node.id === fullUrlGid);

          // 2. Fallback: Lowest Price variant dhoondo agar URL id invalid ya blank ho
          if (!targetVariant && allVariants.length > 0) {
            const availableVariants = allVariants.filter(v => v.node.availableForSale);
            const scanList = availableVariants.length > 0 ? availableVariants : allVariants;
            targetVariant = [...scanList].sort(
              (a, b) => parseFloat(a.node.price.amount) - parseFloat(b.node.price.amount)
            )[0];
          }

          // 3. Set Default Selection States
          if (targetVariant) {
            const initialSelection = {};
            targetVariant.node.selectedOptions.forEach(opt => {
              initialSelection[opt.name] = opt.value;
            });
            setSelectedOptions(initialSelection);
            setActiveVariant(targetVariant.node);

            // URL Clean formatting apply ho rahi hai
            const variantId = getCleanId(targetVariant.node.id);
            setSearchParams({ variant: variantId }, { replace: true });
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (handle) fetchProductDetails();
  }, [handle]);

  // 🔄 User option tabdeel kare to state aur URL short id sync rahein
  const handleOptionChange = (optionName, optionValue) => {
    const updatedOptions = { ...selectedOptions, [optionName]: optionValue };
    setSelectedOptions(updatedOptions);

    const matched = product?.variants?.edges?.find(variant =>
      variant.node.selectedOptions.every(opt => updatedOptions[opt.name] === opt.value)
    );

    if (matched) {
      setActiveVariant(matched.node);
      const cleanId = getCleanId(matched.node.id);
      setSearchParams({ variant: cleanId });
    }
  };

  // Conditional Rendering State Blocks
  if (loading) {
    return <div className="p-10 text-center text-lg font-medium">Loading Product Details...</div>;
  }

  if (error) {
    return <NotFound />;
  }



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[1.5fr_1fr]">

        {/* Main Gallery Area */}
        <ProductGallery
          productImages={product?.images?.edges || []}
          activeVariantImage={activeVariant?.image?.url || product?.featuredImage?.url}
        />

        {/* Product Details Content */}
        <div>
          <div className="flex flex-col gap-4">
            <ProductBadge
              type={product?.productType}
            />

            <ProductTitle
              productTitle={product?.title}
              selectedOptions={activeVariant?.selectedOptions || []}
            />

            <ProductPrice
              price={activeVariant?.price}
              compareAtPrice={activeVariant?.compareAtPrice}
            />

            <VariantPicker
              productOption={product?.options || []}
              allVariants={product?.variants?.edges || []}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
            />

            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              maxStock={activeVariant?.quantityAvailable}
            />

            {/* Add to Cart Trigger Button */}
     <button 
  onClick={async () => {
    try {
      await addToCart(activeVariant.id, quantity);
      alert("Product added to cart!");
    } catch (e) {
      console.error("Cart error:", e);
    }
  }}
  disabled={!activeVariant?.availableForSale}
  className="..."
>
  Add To Cart
</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;