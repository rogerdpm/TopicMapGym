import { useEffect, useState } from 'preact/hooks';

const backgrounds = [
  '/assets/backgrounds/1.webp',
  '/assets/backgrounds/2.webp',
];

const ROTATION_INTERVAL = 20000; // 20 seconds

export default function BackgroundRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Preload backgrounds
    backgrounds.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
        setIsTransitioning(false);
      }, 300);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      class="fixed inset-0 -z-10"
      style={{
        backgroundImage: `url('${backgrounds[currentIndex]}')`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        opacity: isTransitioning ? 0.7 : 1,
        transition: 'opacity 300ms ease-in-out',
      }}
    />
  );
}
