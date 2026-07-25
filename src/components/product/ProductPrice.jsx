
const ProductPrice = ({ price, compareAtPrice }) => {


  const currentAmount = parseFloat(price?.amount || 0);
  const originalAmount = parseFloat(compareAtPrice?.amount || 0);
  const currency = price?.currencyCode || 'GBP';

  const isOnSale = originalAmount > currentAmount;

  return (
    <div className="flex items-center gap-3 select-none">
      <p className="text-(--color-blue) font-black text-2xl tracking-tight">
        £{currentAmount.toFixed(2)}{' '}
        <span className="text-xs font-bold text-gray-400 uppercase">{currency}</span>
      </p>

      {isOnSale && (
        <>
          <p className="text-gray-400 font-medium text-base line-through tracking-tight decoration-red-500/70">
            £{originalAmount.toFixed(2)}
          </p>

          <span className="bg-red-50 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
            Save £{(originalAmount - currentAmount).toFixed(2)}
          </span>
        </>
      )}
    </div>
  );
};

export default ProductPrice;