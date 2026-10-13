import { useState, useMemo, useEffect, useRef } from 'preact/hooks';
import Fuse from 'fuse.js';
import type { Exercise } from '../lib/exercises';

interface Props {
  exercises: Exercise[];
}

const fuseOptions = {
  keys: ['data.name', 'data.aliases', 'data.muscles.primary', 'data.equipment'],
  threshold: 0.3,
  includeScore: true,
};

export default function SearchBar({ exercises }: Props) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const fuse = useMemo(() => new Fuse(exercises, fuseOptions), [exercises]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [query, fuse]);

  const handleInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setQuery(value);
    setShowDropdown(true);

    const grid = document.getElementById('exercise-grid');
    if (!grid) return; // No grid on homepage

    if (!value.trim()) {
      grid.querySelectorAll('a').forEach((card) => {
        (card as HTMLElement).style.display = '';
      });
      return;
    }

    const resultSlugs = new Set(results.map((r) => r.item.id.split('/').pop()));

    grid.querySelectorAll('a').forEach((card) => {
      const href = (card as HTMLAnchorElement).href;
      const slug = href.split('/').pop()?.replace(/\/$/, '');
      (card as HTMLElement).style.display = resultSlugs.has(slug) ? '' : 'none';
    });
  };

  const handleClear = () => {
    setQuery('');
    setShowDropdown(false);
    const grid = document.getElementById('exercise-grid');
    grid?.querySelectorAll('a').forEach((card) => {
      (card as HTMLElement).style.display = '';
    });
    inputRef.current?.focus();
  };

  const handleResultClick = (exercise: Exercise) => {
    const category = exercise.data.category;
    const slug = exercise.id.split('/').pop();
    window.location.href = `/${category}/${slug}`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div class="relative flex-1 max-w-md" ref={dropdownRef}>
      <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="search"
        value={query}
        onInput={handleInput}
        onFocus={() => setShowDropdown(true)}
        placeholder="Search exercises..."
        class="w-full pl-10 pr-10 py-2.5 bg-surface border border-surface-light rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
        aria-label="Search exercises"
        aria-expanded={showDropdown && results.length > 0}
        aria-haspopup="listbox"
      />
      {query && (
        <button
          onClick={handleClear}
          class="absolute inset-y-0 right-3 flex items-center text-text-secondary hover:text-text-primary"
          aria-label="Clear search"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Search Results Dropdown */}
      {showDropdown && results.length > 0 && (
        <ul
          class="absolute top-full left-0 right-0 mt-2 bg-surface border border-surface-light rounded-lg shadow-lg overflow-hidden z-50"
          role="listbox"
        >
          {results.map((result) => {
            const [category, slug] = result.item.id.split('/');
            return (
              <li key={result.item.id}>
                <button
                  onClick={() => handleResultClick(result.item)}
                  class="w-full px-4 py-3 text-left hover:bg-surface-light transition-colors flex items-center justify-between"
                  role="option"
                >
                  <div>
                    <div class="text-text-primary font-medium">{result.item.data.name}</div>
                    <div class="text-text-secondary text-sm capitalize">{category}</div>
                  </div>
                  <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {showDropdown && query.trim() && results.length === 0 && (
        <div class="absolute top-full left-0 right-0 mt-2 bg-surface border border-surface-light rounded-lg shadow-lg p-4 text-center text-text-secondary z-50">
          No exercises found for "{query}"
        </div>
      )}
    </div>
  );
}
