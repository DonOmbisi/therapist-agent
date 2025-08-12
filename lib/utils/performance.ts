// Performance optimization utilities

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  // Preload critical CSS
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.as = 'style';
  criticalCSS.href = '/globals.css';
  document.head.appendChild(criticalCSS);
  
  // Preload critical fonts
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.as = 'font';
  fontPreload.crossOrigin = 'anonymous';
  fontPreload.href = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
  document.head.appendChild(fontPreload);
};

// Optimize images for faster loading
export const optimizeImages = () => {
  if (typeof window === 'undefined') return;
  
  // Add loading="lazy" to non-critical images
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    if (!img.classList.contains('critical')) {
      img.loading = 'lazy';
    }
  });
};

// Enable service worker for caching
export const enableServiceWorker = () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  
  // Register service worker for caching
  navigator.serviceWorker.register('/sw.js').catch(() => {
    // Service worker registration failed, continue without it
  });
};

// Optimize scroll performance
export const optimizeScroll = () => {
  if (typeof window === 'undefined') return;
  
  // Use passive event listeners for better scroll performance
  document.addEventListener('scroll', () => {}, { passive: true });
  document.addEventListener('touchmove', () => {}, { passive: true });
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  preloadCriticalResources();
  optimizeImages();
  enableServiceWorker();
  optimizeScroll();
};
