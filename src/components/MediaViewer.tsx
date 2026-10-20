import { useState, useEffect, useRef } from 'preact/hooks';

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
  const [mediaKey, setMediaKey] = useState(0);
  const [message] = useState(() =>
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
  );
  
  // Touch gesture state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const currentMedia = media[currentIndex];
  const isVideo = currentMedia?.type === 'video';

  // Reset loading state when media changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentMedia?.src]);

  // Force re-render when media changes to reset component state
  useEffect(() => {
    setMediaKey(k => k + 1);
  }, [currentMedia?.src]);

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  const handleMediaError = () => {
    setIsLoading(false);
  };

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

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

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
        class="aspect-video bg-surface rounded-xl overflow-hidden relative"
        role="img"
        aria-label={`${exerciseName} demonstration`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading && (
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface z-10">
            <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p class="text-text-secondary text-sm">{message}</p>
          </div>
        )}

        {isVideo ? (
          <video
            key={`video-${mediaKey}`}
            src={currentMedia.src}
            controls
            preload="auto"
            class="w-full h-full object-contain"
            onCanPlay={handleMediaLoad}
            onLoadedData={handleMediaLoad}
            onError={handleMediaError}
          >
            <track kind="captions" />
          </video>
        ) : (
          <img
            key={`img-${mediaKey}`}
            src={currentMedia.src}
            alt={`${exerciseName} - ${currentMedia.type} ${currentMedia.index}`}
            class="w-full h-full object-contain"
            loading="eager"
            fetchPriority="high"
            onLoad={handleMediaLoad}
            onError={handleMediaError}
          />
        )}

        {/* Navigation Arrows - larger for touch */}
        {media.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full bg-background/80 text-text-primary flex items-center justify-center hover:bg-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
              aria-label="Previous media"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === media.length - 1}
              class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full bg-background/80 text-text-primary flex items-center justify-center hover:bg-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
              aria-label="Next media"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Swipe hint for mobile */}
        {media.length > 1 && (
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-text-secondary/50 text-xs md:hidden pointer-events-none">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Swipe
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        )}
      </div>

      {/* Dot Indicators - larger for touch */}
      {media.length > 1 && (
        <div class="flex justify-center gap-3">
          {media.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              class={`w-3 h-3 md:w-2.5 md:h-2.5 rounded-full transition-all touch-manipulation ${
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
