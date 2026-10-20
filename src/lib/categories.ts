export interface Category {
  id: 'glutes' | 'legs' | 'chest' | 'back' | 'shoulders' | 'arms' | 'core' | 'cardio';
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 'glutes',
    name: 'Glutes',
    description: 'Hip-dominant posterior chain exercises',
    color: '#F472B6',
    icon: '🦵',
  },
  {
    id: 'legs',
    name: 'Legs',
    description: 'Quad, hamstring, and calf work',
    color: '#A78BFA',
    icon: '🦿',
  },
  {
    id: 'chest',
    name: 'Chest',
    description: 'Pectoral pressing and flyes',
    color: '#F87171',
    icon: '💪',
  },
  {
    id: 'back',
    name: 'Back',
    description: 'Lats, rhomboids, and traps',
    color: '#60A5FA',
    icon: '🔙',
  },
  {
    id: 'shoulders',
    name: 'Shoulders',
    description: 'Deltas and rotator cuff',
    color: '#34D399',
    icon: '🎯',
  },
  {
    id: 'arms',
    name: 'Arms',
    description: 'Biceps, triceps, and forearms',
    color: '#FBBF24',
    icon: '💪',
  },
  {
    id: 'core',
    name: 'Core',
    description: 'Abs, obliques, and lower back',
    color: '#FB923C',
    icon: '🎯',
  },
  {
    id: 'cardio',
    name: 'Cardio',
    description: 'HIIT, endurance, and plyometrics',
    color: '#2DD4BF',
    icon: '❤️',
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getCategoryColor(id: string): string {
  const category = getCategoryById(id);
  return category?.color || '#94A3B8';
}
