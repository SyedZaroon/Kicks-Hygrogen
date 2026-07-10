export const PRODUCT_DETAILS_QUERY = `
  query getProductDetails($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      availableForSale
      vendor
      productType
      
      # 1. Product Gallery Images (Max 10)
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      
      # 2. Variant Options (e.g., Size, Color, Pack Size)
      options {
        id
        name
        values
      }
      
      # 3. All Variants Detail (Max 100 for heavy stock)
      variants(first: 100) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            quantityAvailable
            
            # Specific image linked to this variant
            image {
              url
              altText
            }
            
            # Price details
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            
            # Option mapping (Kon sa variant kis option se select hoga)
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;