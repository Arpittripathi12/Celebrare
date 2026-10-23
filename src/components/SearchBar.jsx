import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search
        aria-hidden="true"
        size={19}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by photographer name..."
        aria-label="Search photos by author name"
        className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}