import { useState, useEffect } from 'preact/hooks';

interface NavItem {
  label: string;
  href: string;
  icon: 'home' | 'search' | 'categories' | 'favorites';
}

const base = '/TopicMapGym';
const navItems: NavItem[] = [
  { label: 'Home', href: `${base}/`, icon: 'home' },
  { label: 'Search', href: '#search', icon: 'search' },
  { label: 'Categories', href: `${base}/#categories`, icon: 'categories' },
  { label: 'Favorites', href: `${base}/favorites`, icon: 'favorites' },
];

const icons = {
  home: (
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  search: (
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  categories: (
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  favorites: (
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

export default function MobileNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show nav when scrolling down, hide when scrolling up
      setIsVisible(currentScrollY > 100);
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent, href: string) => {
    if (href === '#search') {
      e.preventDefault();
      // Trigger search - on mobile this opens the search modal
      const searchButton = document.querySelector('[aria-label="Search exercises"]') as HTMLButtonElement;
      if (searchButton) {
        searchButton.click();
      }
    }
  };

  // Don't render on desktop
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null;
  }

  return (
    <nav
      class={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        isVisible || scrollY < 100 ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Mobile navigation"
    >
      {/* Backdrop */}
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
      
      {/* Nav bar */}
      <div class="relative flex items-center justify-around px-2 py-2 bg-surface/95 backdrop-blur-lg border-t border-surface-light safe-area-bottom">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            class="flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[56px] px-3 py-2 rounded-lg text-text-secondary hover:text-primary transition-colors touch-manipulation"
            aria-label={item.label}
          >
            {icons[item.icon]}
            <span class="text-xs font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
