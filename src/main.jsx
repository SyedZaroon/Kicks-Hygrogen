import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './styles/app.css';
import { ShopifyProvider } from "@shopify/hydrogen-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopifyProvider
      storeDomain={import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}
      storefrontToken={import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN}
      storefrontApiVersion="2026-07"
    >
      <App />
    </ShopifyProvider>
  </StrictMode>,
);