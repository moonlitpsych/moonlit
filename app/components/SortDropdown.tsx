interface SortDropdownProps {
  value: 'name' | 'price';
  onChange: (value: 'name' | 'price') => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as 'name' | 'price')}
      className="block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      <option value="name">Sort by Name</option>
      <option value="price">Sort by Price</option>
    </select>
  );
} 