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

  return (
    <div class="flex flex-wrap gap-3 items-center">
      {/* Difficulty Filter */}
      <div class="flex items-center gap-2">
        <span class="text-text-secondary text-sm">Difficulty:</span>
        <div class="flex gap-1">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => handleDifficultyChange(d)}
              class={`px-3 py-1.5 rounded text-sm font-medium transition-colors capitalize ${
                selectedDifficulty === d
                  ? 'bg-primary text-white'
                  : 'bg-surface-light text-text-secondary hover:text-text-primary'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Filter */}
      <div class="flex items-center gap-2">
        <span class="text-text-secondary text-sm">Equipment:</span>
        <select
          value={selectedEquipment || ''}
          onChange={(e) => handleEquipmentChange((e.target as HTMLSelectElement).value)}
          class="bg-surface border border-surface-light rounded px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-primary"
        >
          <option value="">All</option>
          {equipmentOptions.map((eq) => (
            <option key={eq} value={eq}>
              {eq}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      {(selectedDifficulty || selectedEquipment) && (
        <button
          onClick={resetFilters}
          class="px-3 py-1.5 text-sm text-text-secondary hover:text-danger transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}
