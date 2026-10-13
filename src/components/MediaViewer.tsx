import { useState, useEffect } from 'preact/hooks';

interface MediaItem {
  type: 'diagram' | 'video';
  src: string;
  index: number;
}

interface Props {
  media: MediaItem[];
  exerciseName: string;
}

const loadingMessages = [
  'Loading Technique...',
  'Preparing Workout...',
  'Setting Up Exercise...',
  'Getting Ready...',
  'One Moment Please...',
  'Warming Up...',
  'In Motion...',
  'Flexing Muscles...',
];

export default function MediaViewer({ media, exerciseName }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [message] = useState(() =>
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
  );

  const currentMedia = media[currentIndex];
  const isVideo = currentMedia?.type === 'video';

  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  if (media.length === 0) {
    return (
      <div class="aspect-video bg-surface rounded-lg flex items-center justify-center">
        <p class="text-text-secondary">No media available</p>
      </div>
    );
  }

  return (
    <div class="space-y-4">
      {/* Media Display */}
      <div
        class="aspect-video bg-surface rounded-lg overflow-hidden relative"
        role="img"
        aria-label={`${exerciseName} demonstration`}
      >
        {isLoading && (
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface z-10">
            <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p class="text-text-secondary text-sm">{message}</p>
          </div>
        )}

        {isVideo ? (
          <video
            key={currentMedia.src}
            src={currentMedia.src}
            controls
            preload="metadata"
            class="w-full h-full object-contain"
            onLoadedData={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          >
            <track kind="captions" />
          </video>
        ) : (
          <img
            key={currentMedia.src}
            src={currentMedia.src}
            alt={`${exerciseName} - ${currentMedia.type} ${currentMedia.index}`}
            class="w-full h-full object-contain"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        )}

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 text-text-primary flex items-center justify-center hover:bg-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous media"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === media.length - 1}
              class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 text-text-primary flex items-center justify-center hover:bg-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next media"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {media.length > 1 && (
        <div class="flex justify-center gap-2">
          {media.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              class={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-surface-light hover:bg-text-secondary'
              }`}
              aria-label={`Go to media ${idx + 1}`}
              aria-current={idx === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      <p class="text-center text-text-secondary text-sm">
        {currentIndex + 1} / {media.length}
        <span class="mx-2">•</span>
        <span class="capitalize">{currentMedia?.type}</span>
      </p>
    </div>
  );
}
