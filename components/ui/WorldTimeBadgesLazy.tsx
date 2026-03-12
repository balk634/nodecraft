"use client";

import dynamic from "next/dynamic";

const WorldTimeBadges = dynamic(
  () => import("@/components/ui/WorldTimeBadges").then((mod) => mod.WorldTimeBadges),
  {
    ssr: false,
    loading: () => (
      <div className="flex w-full items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 px-4 md:px-0">
        <span className="text-[10px] font-mono text-white/60 border border-white/15 bg-white/5 px-2 py-1">INDIA</span>
        <span className="text-[10px] font-mono text-white/60 border border-white/15 bg-white/5 px-2 py-1">USA</span>
        <span className="text-[10px] font-mono text-white/60 border border-white/15 bg-white/5 px-2 py-1">UK</span>
      </div>
    ),
  }
);

export function WorldTimeBadgesLazy({ className }: { className?: string }) {
  return <WorldTimeBadges className={className} />;
}
