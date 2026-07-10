import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { updateCartQuantity, removeFromCart } from '../utils/cartService';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (!cartId) { setLoading(false); return; }

    const query = `query getCart($id: ID!) {
      cart(id: $id) {
        checkoutUrl
        cost { totalAmount { amount currencyCode } }
        lines(first: 100) {
          edges {
            node {
              id quantity
              merchandise { ... on ProductVariant { id title price { amount } image { url } product { handle } } }
            }
          }
        }
      }
    }`;

    const res = await fetch(`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/${import.meta.env.VITE_SHOPIFY_STORE_VERSION}/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN },
      body: JSON.stringify({ query, variables: { id: cartId } })
    });
    const { data } = await res.json();
    setCart(data.cart);
    setLoading(false);
  };

  useEffect(() => { fetchCart(); }, []);

  const handleUpdate = async (id, qty) => { await updateCartQuantity(id, qty); fetchCart(); };
  const handleRemove = async (id) => { await removeFromCart(id); fetchCart(); };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!cart || cart.lines.edges.length === 0) return <div className="p-20 text-center">Cart is empty</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-10">Shopping Cart</h1>
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 border rounded-2xl p-6">
          {cart.lines.edges.map(({ node }) => (
            <div key={node.id} className="flex justify-between items-center py-4 border-b">
              <div className="flex gap-4 items-center">
                <img src={node.merchandise.image.url} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="font-bold">{node.merchandise.title}</h3>
                  <button onClick={() => handleRemove(node.id)} className="text-red-500 text-sm">Remove</button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => handleUpdate(node.id, node.quantity - 1)}>-</button>
                <span>{node.quantity}</span>
                <button onClick={() => handleUpdate(node.id, node.quantity + 1)}>+</button>
                <p className="font-bold">£{(node.merchandise.price.amount * node.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 p-6 bg-gray-50 rounded-2xl h-fit">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <p className="text-2xl font-black mb-6">Total: £{cart.cost.totalAmount.amount}</p>
          <button 
            onClick={() => window.location.href = cart.checkoutUrl}
            className="w-full py-4 bg-black text-white rounded-xl"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}