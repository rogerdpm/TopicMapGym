import { useState, useEffect } from 'preact/hooks';

const STORAGE_KEY = 'topicmapgym-favorites';

interface Props {
  exerciseId: string;
}

export default function Favorites({ exerciseId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    const favorites: string[] = stored ? JSON.parse(stored) : [];
    setIsFavorite(favorites.includes(exerciseId));
  }, [exerciseId]);

  const toggleFavorite = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const favorites: string[] = stored ? JSON.parse(stored) : [];

    let newFavorites: string[];
    if (isFavorite) {
      newFavorites = favorites.filter((id) => id !== exerciseId);
    } else {
      newFavorites = [...favorites, exerciseId];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!mounted) {
    return (
      <button
        class="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center"
        aria-hidden="true"
      >
        <span class="text-xl">♡</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      class={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
        isFavorite
          ? 'bg-danger/20 text-danger'
          : 'bg-surface-light text-text-secondary hover:text-danger'
      }`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
    >
      <span class="text-xl">{isFavorite ? '♥' : '♡'}</span>
    </button>
  );
}
