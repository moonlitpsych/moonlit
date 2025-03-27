import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
}

export default function SearchBar({ value, onChange, placeholder, title }: SearchBarProps) {
  return (
    <div className="w-full max-w-lg relative group">
      {title && (
        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 absolute left-0 -top-12 rounded bg-text text-white text-sm p-2">
          {title}
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-text rotate-45"></div>
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
} 