"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9998] transition-opacity duration-150" />
  );
}
