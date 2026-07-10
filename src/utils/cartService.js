const SHOPIFY_API_URL = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/${import.meta.env.VITE_SHOPIFY_STORE_VERSION}/graphql.json`;

const fetchShopify = async (query, variables = {}) => {
  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return await response.json();
};

export const createCart = async () => {
  const mutation = `mutation { cartCreate { cart { id checkoutUrl } } }`;
  const result = await fetchShopify(mutation);
  const cartId = result.data.cartCreate.cart.id;
  localStorage.setItem("shopify_cart_id", cartId);
  return cartId;
};

export const addToCart = async (variantId, quantity) => {
  let cartId = localStorage.getItem("shopify_cart_id");
  if (!cartId) cartId = await createCart();

  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { id } }
    }`;
  return await fetchShopify(mutation, { cartId, lines: [{ merchandiseId: variantId, quantity }] });
};

export const updateCartQuantity = async (lineId, quantity) => {
  const cartId = localStorage.getItem("shopify_cart_id");
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id } }
    }`;
  return await fetchShopify(mutation, { cartId, lines: [{ id: lineId, quantity }] });
};

export const removeFromCart = async (lineId) => {
  const cartId = localStorage.getItem("shopify_cart_id");
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } }
    }`;
  return await fetchShopify(mutation, { cartId, lineIds: [lineId] });
};