export default function SortFilter({ onSortChange }) {
  return (
    <div className="flex justify-end mb-6">
      <select onChange={(e) => onSortChange(e.target.value)} className="border p-2 rounded-lg text-sm">
        <option value="relevance">Sort By: Relevance</option>
        <option value="price-low">Price: Low to High</option>
      </select>
    </div>
  );
}