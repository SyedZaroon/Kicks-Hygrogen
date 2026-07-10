const NoProductInCollection = () => {
  return (
    <div className="max-w-2xl mx-auto my-20 px-4 text-center">
      <span className="text-5xl block mb-4">🛍️</span>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found in this collection</h3>
      <p className="text-sm text-gray-500 mt-1">Check if handle matches exactly with Shopify Admin Settings.</p>
    </div>
  )
}

export default NoProductInCollection