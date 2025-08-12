"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, Clock, AlertTriangle } from "lucide-react";

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === "development") {
      setIsVisible(true);
    }

    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType("paint");
        const fcp = paint.find(entry => entry.name === "first-contentful-paint");
        const lcp = performance.getEntriesByType("largest-contentful-paint")[0];

        const metrics: PerformanceMetrics = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          firstContentfulPaint: fcp ? fcp.startTime : 0,
          largestContentfulPaint: lcp ? lcp.startTime : 0,
          cumulativeLayoutShift: 0, // Would need to be calculated from CLS
          firstInputDelay: 0, // Would need to be calculated from FID
        };

        setMetrics(metrics);
      }
    };

    // Measure after page load
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
      return () => window.removeEventListener("load", measurePerformance);
    }
  }, []);

  if (!isVisible || !metrics) return null;

  const getPerformanceScore = () => {
    const scores = [];
    if (metrics.loadTime < 1000) scores.push(1);
    else if (metrics.loadTime < 3000) scores.push(0.5);
    else scores.push(0);

    if (metrics.firstContentfulPaint < 1800) scores.push(1);
    else if (metrics.firstContentfulPaint < 3000) scores.push(0.5);
    else scores.push(0);

    if (metrics.largestContentfulPaint < 2500) scores.push(1);
    else if (metrics.largestContentfulPaint < 4000) scores.push(0.5);
    else scores.push(0);

    return (scores.reduce((a, b) => a + b, 0) / scores.length) * 100;
  };

  const score = getPerformanceScore();
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-background/95 backdrop-blur-sm border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Performance Monitor
          <Badge variant="secondary" className="ml-auto">
            {score.toFixed(0)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Load Time
          </span>
          <span className={metrics.loadTime > 1000 ? "text-red-500" : "text-green-500"}>
            {metrics.loadTime.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            FCP
          </span>
          <span className={metrics.firstContentfulPaint > 1800 ? "text-red-500" : "text-green-500"}>
            {metrics.firstContentfulPaint.toFixed(0)}ms
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            LCP
          </span>
          <span className={metrics.largestContentfulPaint > 2500 ? "text-red-500" : "text-green-500"}>
            {metrics.largestContentfulPaint.toFixed(0)}ms
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
          <div
            className={`h-1 rounded-full transition-all duration-300 ${getScoreColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
