// Utility for intelligent route prefetching
export const prefetchRoute = (href: string) => {
  if (typeof window === 'undefined') return;
  
  // Check if already prefetched
  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (existingLink) return;
  
  // Create prefetch link
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = 'document';
  
  // Add to head
  document.head.appendChild(link);
};

// Prefetch multiple routes
export const prefetchRoutes = (routes: string[]) => {
  routes.forEach(route => prefetchRoute(route));
};

// Prefetch on hover with debouncing
export const createPrefetchOnHover = (href: string) => {
  let timeoutId: NodeJS.Timeout;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => prefetchRoute(href), 100);
  };
};
