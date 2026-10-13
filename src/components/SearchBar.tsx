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

// Category colors for badges
const categoryColors: Record<string, string> = {
  arms: 'bg-amber-500/20 text-amber-400',
  back: 'bg-blue-500/20 text-blue-400',
  cardio: 'bg-red-500/20 text-red-400',
  chest: 'bg-orange-500/20 text-orange-400',
  core: 'bg-yellow-500/20 text-yellow-400',
  glutes: 'bg-pink-500/20 text-pink-400',
  legs: 'bg-green-500/20 text-green-400',
  shoulders: 'bg-purple-500/20 text-purple-400',
};

export default function SearchBar({ exercises }: Props) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
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
    setSelectedIndex(-1);

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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!showDropdown || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex].item);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowDropdown(false);
    setSelectedIndex(-1);
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

  const handleResultHover = (index: number) => {
    setSelectedIndex(index);
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
        onKeyDown={handleKeyDown}
        placeholder="Search exercises..."
        class="w-full pl-10 pr-10 py-2.5 bg-surface border border-surface-light rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        aria-label="Search exercises"
        aria-expanded={showDropdown && results.length > 0}
        aria-haspopup="listbox"
        aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
      />
      {query && (
        <button
          onClick={handleClear}
          class="absolute inset-y-0 right-3 flex items-center text-text-secondary hover:text-text-primary transition-colors"
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
          class="absolute top-full left-0 right-0 mt-2 bg-surface border border-surface-light rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-sm"
          role="listbox"
        >
          <li class="px-4 py-2 text-xs text-text-secondary border-b border-surface-light bg-surface-light/50">
            {results.length} result{results.length !== 1 ? 's' : ''} • Use arrow keys to navigate
          </li>
          {results.map((result, index) => {
            const [category, slug] = result.item.id.split('/');
            const colorClass = categoryColors[category] || 'bg-gray-500/20 text-gray-400';
            const isSelected = index === selectedIndex;

            return (
              <li key={result.item.id} id={`search-result-${index}`}>
                <button
                  onClick={() => handleResultClick(result.item)}
                  onMouseEnter={() => handleResultHover(index)}
                  class={`w-full px-4 py-3 text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-surface-light'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div class="flex items-center gap-3 flex-1 min-w-0">
                    <div class={`px-2 py-0.5 rounded text-xs font-medium capitalize ${colorClass}`}>
                      {category}
                    </div>
                    <div class="min-w-0">
                      <div class={`font-medium truncate ${isSelected ? 'text-primary' : 'text-text-primary'}`}>
                        {result.item.data.name}
                      </div>
                      <div class="text-text-secondary text-xs truncate">
                        {result.item.data.muscles.primary.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </div>
                  <svg class={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-primary' : 'text-text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {showDropdown && query.trim() && results.length === 0 && (
        <div class="absolute top-full left-0 right-0 mt-2 bg-surface border border-surface-light rounded-xl shadow-lg p-6 text-center z-50">
          <svg class="w-12 h-12 mx-auto text-text-secondary mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-text-secondary font-medium">No exercises found</div>
          <div class="text-text-secondary text-sm mt-1">Try searching for "{query}" with different keywords</div>
        </div>
      )}
    </div>
  );
}
