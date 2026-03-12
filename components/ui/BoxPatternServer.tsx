import { masterConfig } from "@/config/master";

interface BoxPatternServerProps {
  squareSize?: number;
  gap?: number;
  opacity?: number;
  scale?: number;
  width?: number;
  height?: number;
  className?: string;
}

export function BoxPatternServer({
  squareSize,
  gap,
  opacity,
  scale,
  width,
  height,
  className = "",
}: BoxPatternServerProps) {
  const config = masterConfig.ui.boxPattern;

  const s = squareSize ?? config.squareSize;
  const g = gap ?? config.gap;
  const o = opacity ?? config.opacity;
  const sc = scale ?? config.scale;
  const w = width ?? config.width;
  const h = height ?? config.height;

  const step = s + g;
  const totalWidth = w * step;
  const totalHeight = h * step;

  return (
    <svg
      width={totalWidth}
      height={totalHeight}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute top-0 left-0 pointer-events-none select-none ${className}`}
      style={{
        opacity: o,
        transform: `scale(${sc})`,
        transformOrigin: "top left",
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="box-pattern-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="80%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="box-pattern-mask">
          <rect width="100%" height="100%" fill="url(#box-pattern-gradient)" />
        </mask>
      </defs>

      <g mask="url(#box-pattern-mask)">
        {Array.from({ length: h }).map((_, rowIndex) =>
          Array.from({ length: w }).map((_, colIndex) => (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * step}
              y={rowIndex * step}
              width={s}
              height={s}
              fill="currentColor"
              className="text-ink"
            />
          ))
        )}
      </g>
    </svg>
  );
}
