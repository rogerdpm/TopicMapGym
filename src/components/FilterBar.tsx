import { useState, useMemo, useEffect } from 'preact/hooks';
import type { Exercise } from '../lib/exercises';

interface Props {
  exercises: Exercise[];
}

const difficulties = ['beginner', 'intermediate', 'advanced'] as const;

export default function FilterBar({ exercises }: Props) {
  // Initialize from URL params on mount
  const getInitialValues = () => {
    if (typeof window === 'undefined') return { difficulty: null, equipment: null };
    const params = new URLSearchParams(window.location.search);
    return {
      difficulty: params.get('difficulty') || null,
      equipment: params.get('equipment') || null,
    };
  };

  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const equipmentOptions = useMemo(() => {
    const all = exercises.flatMap((e) => e.data.equipment);
    return [...new Set(all)].sort();
  }, [exercises]);

  // Apply filters on mount (read URL params) and whenever selections change
  useEffect(() => {
    const initial = getInitialValues();
    if (initial.difficulty) setSelectedDifficulty(initial.difficulty);
    if (initial.equipment) setSelectedEquipment(initial.equipment);
  }, []);

  useEffect(() => {
    const grid = document.getElementById('exercise-grid');
    if (!grid) return;

    grid.querySelectorAll('a').forEach((card) => {
      const difficulty = card.getAttribute('data-difficulty');
      const equipment = card.getAttribute('data-equipment')?.split(',') || [];

      const matchesDifficulty = !selectedDifficulty || difficulty === selectedDifficulty;
      // Case-insensitive equipment matching
      const matchesEquipment = !selectedEquipment || 
        equipment.some(eq => eq.toLowerCase() === selectedEquipment!.toLowerCase());

      (card as HTMLElement).style.display =
        matchesDifficulty && matchesEquipment ? '' : 'none';
    });

    // Update URL with current filters (without page reload)
    const url = new URL(window.location.href);
    if (selectedDifficulty) {
      url.searchParams.set('difficulty', selectedDifficulty);
    } else {
      url.searchParams.delete('difficulty');
    }
    if (selectedEquipment) {
      url.searchParams.set('equipment', selectedEquipment);
    } else {
      url.searchParams.delete('equipment');
    }
    window.history.replaceState({}, '', url.toString());
  }, [selectedDifficulty, selectedEquipment]);

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(prev => prev === difficulty ? null : difficulty);
  };

  const handleEquipmentChange = (equipment: string | null) => {
    setSelectedEquipment(equipment || null);
  };

  const resetFilters = () => {
    setSelectedDifficulty(null);
    setSelectedEquipment(null);
  };

  // Expose reset function globally
  useEffect(() => {
    (window as any).resetFilters = resetFilters;
  }, []);

  const hasActiveFilters = selectedDifficulty || selectedEquipment;

  return (
    <div class="w-full">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        class="md:hidden w-full flex items-center justify-between px-4 py-3 bg-surface rounded-lg touch-manipulation"
        aria-expanded={isExpanded}
      >
        <span class="flex items-center gap-2 text-text-primary font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters {hasActiveFilters && <span class="w-2 h-2 bg-primary rounded-full"></span>}
        </span>
        <svg class={`w-5 h-5 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter content */}
      <div class={`${isExpanded ? 'block' : 'hidden'} md:block mt-3 md:mt-0`}>
        <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 sm:items-center">
          {/* Difficulty Filter */}
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <span class="text-text-secondary text-sm font-medium">Difficulty:</span>
            <div class="flex flex-wrap gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => handleDifficultyChange(d)}
                  class="min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize touch-manipulation ${
                    selectedDifficulty === d
                      ? 'bg-primary text-white'
                      : 'bg-surface-light text-text-secondary hover:bg-surface hover:text-text-primary'
                  }"
                  aria-pressed={selectedDifficulty === d}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Filter */}
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <span class="text-text-secondary text-sm font-medium">Equipment:</span>
            <select
              value={selectedEquipment || ''}
              onChange={(e) => handleEquipmentChange((e.target as HTMLSelectElement).value)}
              class="min-h-[44px] min-w-[160px] bg-surface border border-surface-light rounded-lg px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary touch-manipulation"
            >
              <option value="">All Equipment</option>
              {equipmentOptions.map((eq) => (
                <option key={eq} value={eq}>
                  {eq}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              class="min-h-[44px] px-4 py-2 text-sm text-text-secondary hover:text-danger transition-colors touch-manipulation flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
