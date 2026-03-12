"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";

type PerformanceEnhancementsProps = {
  enableSmoothScroll: boolean;
  enableMicroInteractions: boolean;
  enableScrollProgress: boolean;
};

type LoadedEnhancements = {
  NavigationTransitionManager?: ComponentType;
  SmoothScroll?: ComponentType<{ enabled?: boolean }>;
  MicroInteractionEngine?: ComponentType<{ enabled?: boolean }>;
  ScrollProgress?: ComponentType;
  CookieConsent?: ComponentType;
};

function scheduleIdleLoad(callback: () => void) {
  type RequestIdleCallback = (
    cb: () => void,
    opts?: { timeout?: number }
  ) => number;
  type CancelIdleCallback = (id: number) => void;

  const requestIdle = (window as unknown as { requestIdleCallback?: RequestIdleCallback })
    .requestIdleCallback;
  const cancelIdle = (window as unknown as { cancelIdleCallback?: CancelIdleCallback })
    .cancelIdleCallback;

  if (typeof requestIdle === "function") {
    const idleId = requestIdle(callback, { timeout: 2500 });
    return () => {
      if (typeof cancelIdle === "function") cancelIdle(idleId);
    };
  }

  const timeoutId = window.setTimeout(callback, 1200);
  return () => window.clearTimeout(timeoutId);
}

export function PerformanceEnhancements({
  enableSmoothScroll,
  enableMicroInteractions,
  enableScrollProgress,
}: PerformanceEnhancementsProps) {
  const [loaded, setLoaded] = useState<LoadedEnhancements | null>(null);

  useEffect(() => {
    let cancelled = false;

    const clearSchedule = scheduleIdleLoad(async () => {
      const modules = await Promise.all([
        import("./NavigationTransitionManager"),
        enableSmoothScroll ? import("./SmoothScroll") : Promise.resolve(null),
        enableMicroInteractions ? import("./MicroInteractionEngine") : Promise.resolve(null),
        enableScrollProgress ? import("./ScrollProgress") : Promise.resolve(null),
        import("./CookieConsent"),
      ]);

      if (cancelled) return;

      const [navigationModule, smoothScrollModule, microModule, scrollProgressModule, cookieConsentModule] = modules;

      setLoaded({
        NavigationTransitionManager: navigationModule.NavigationTransitionManager,
        SmoothScroll: smoothScrollModule?.SmoothScroll,
        MicroInteractionEngine: microModule?.MicroInteractionEngine,
        ScrollProgress: scrollProgressModule?.ScrollProgress,
        CookieConsent: cookieConsentModule.CookieConsent,
      });
    });

    return () => {
      cancelled = true;
      clearSchedule();
    };
  }, [enableSmoothScroll, enableMicroInteractions, enableScrollProgress]);

  if (!loaded) return null;

  const NavigationTransitionManager = loaded.NavigationTransitionManager;
  const SmoothScroll = loaded.SmoothScroll;
  const MicroInteractionEngine = loaded.MicroInteractionEngine;
  const ScrollProgress = loaded.ScrollProgress;
  const CookieConsent = loaded.CookieConsent;

  return (
    <>
      {NavigationTransitionManager ? <NavigationTransitionManager /> : null}
      {SmoothScroll ? <SmoothScroll enabled={enableSmoothScroll} /> : null}
      {MicroInteractionEngine ? <MicroInteractionEngine enabled={enableMicroInteractions} /> : null}
      {ScrollProgress ? <ScrollProgress /> : null}
      {CookieConsent ? <CookieConsent /> : null}
    </>
  );
}
