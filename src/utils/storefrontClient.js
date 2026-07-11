import { createStorefrontClient } from "@shopify/hydrogen-react";

export const client = createStorefrontClient({
  storeDomain: `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}`, 
  publicStorefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
  storefrontApiVersion: import.meta.env.VITE_SHOPIFY_STORE_VERSION,
});
