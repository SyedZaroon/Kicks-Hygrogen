import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./styles/App.css";
import { ShopifyProvider } from "@shopify/hydrogen-react";

console.log("Domain:", import.meta.env.VITE_SHOPIFY_STORE_DOMAIN);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopifyProvider
      storeDomain="packpointstore.myshopify.com"
      storefrontToken="aaaf283c9654d3b64bf88f9e005177ca"
      storefrontApiVersion="2026-04"
      countryIsoCode="US"
      languageIsoCode="EN"
    >
      <App />
    </ShopifyProvider>
  </StrictMode>,
);