import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  username: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ username, loading, onSubmit, onChange }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={username}
          onChange={onChange}
          placeholder="Enter LeetCode username"
          className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:outline-none text-white placeholder-white/40 transition-all group-hover:border-white/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 text-white/80 p-2 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
}