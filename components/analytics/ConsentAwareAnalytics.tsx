"use client";

import { useEffect } from "react";

type ConsentAwareAnalyticsProps = {
  measurementId?: string;
};

declare global {
  interface Window {
    __nodecraftGaLoaded?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGoogleAnalytics(measurementId: string) {
  if (!measurementId || window.__nodecraftGaLoaded) return;
  window.__nodecraftGaLoaded = true;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
}

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
    const idleId = requestIdle(callback, { timeout: 3000 });
    return () => {
      if (typeof cancelIdle === "function") cancelIdle(idleId);
    };
  }

  const timeoutId = window.setTimeout(callback, 1500);
  return () => window.clearTimeout(timeoutId);
}

export function ConsentAwareAnalytics({ measurementId }: ConsentAwareAnalyticsProps) {
  useEffect(() => {
    if (!measurementId) return;

    let clearIdleLoad: (() => void) | null = null;

    const attemptLoad = () => {
      let consent = "";
      try {
        consent = localStorage.getItem("cookie-consent") || "";
      } catch {
        consent = "";
      }

      if (consent !== "accepted") return;

      clearIdleLoad?.();
      clearIdleLoad = scheduleIdleLoad(() => {
        loadGoogleAnalytics(measurementId);
      });
    };

    attemptLoad();
    window.addEventListener("cookie-consent-updated", attemptLoad);

    return () => {
      window.removeEventListener("cookie-consent-updated", attemptLoad);
      clearIdleLoad?.();
    };
  }, [measurementId]);

  return null;
}
