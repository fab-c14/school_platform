export type BreezeCutVariant =
  | "wave-gentle"
  | "wave-flow"
  | "wave-crest"
  | "slant-right"
  | "slant-left"
  | "slant-breeze";

export type BreezeCutTone = "paper" | "mist" | "deep" | "white";

export interface BreezeCutProps {
  from?: BreezeCutTone | string;
  to?: BreezeCutTone | string;
  variant?: BreezeCutVariant;
  layered?: boolean;
  className?: string;
  heightClassName?: string;
  flipX?: boolean;
}

const toneMap: Record<string, string> = {
  paper: "#f5f7f9",
  mist: "#f6ebe4",
  deep: "#21384a",
  white: "#ffffff",
};

function resolveColor(tone: string): string {
  return toneMap[tone] ?? tone;
}

const variants: Record<
  BreezeCutVariant,
  {
    primary: string;
    secondary?: string;
  }
> = {
  "wave-gentle": {
    primary: "M0 40 C 240 70, 480 16, 720 42 C 960 68, 1200 18, 1440 40 L 1440 81 L 0 81 Z",
    secondary: "M0 26 C 240 56, 480 4, 720 28 C 960 52, 1200 6, 1440 26 L 1440 81 L 0 81 Z",
  },
  "wave-flow": {
    primary: "M0 54 C 360 14, 720 68, 1080 24 C 1240 6, 1380 32, 1440 36 L 1440 81 L 0 81 Z",
    secondary: "M0 38 C 360 2, 720 52, 1080 12 C 1240 -2, 1380 20, 1440 22 L 1440 81 L 0 81 Z",
  },
  "wave-crest": {
    primary: "M0 32 C 180 66, 360 8, 560 44 C 760 76, 960 14, 1160 50 C 1300 70, 1390 30, 1440 38 L 1440 81 L 0 81 Z",
    secondary: "M0 20 C 180 50, 360 -2, 560 30 C 760 60, 960 2, 1160 36 C 1300 54, 1390 18, 1440 24 L 1440 81 L 0 81 Z",
  },
  "slant-right": {
    primary: "M0 58 L 1440 18 L 1440 81 L 0 81 Z",
    secondary: "M0 44 L 1440 8 L 1440 81 L 0 81 Z",
  },
  "slant-left": {
    primary: "M0 18 L 1440 58 L 1440 81 L 0 81 Z",
    secondary: "M0 8 L 1440 44 L 1440 81 L 0 81 Z",
  },
  "slant-breeze": {
    primary: "M0 56 C 480 52, 960 24, 1440 14 L 1440 81 L 0 81 Z",
    secondary: "M0 42 C 480 38, 960 14, 1440 4 L 1440 81 L 0 81 Z",
  },
};

export function BreezeCut({
  from = "paper",
  to = "mist",
  variant = "wave-gentle",
  layered = true,
  className = "",
  heightClassName = "h-7 sm:h-10 md:h-14 lg:h-16",
  flipX = false,
}: BreezeCutProps) {
  const fromColor = resolveColor(from);
  const toColor = resolveColor(to);
  const selected = variants[variant] ?? variants["wave-gentle"];

  return (
    <div
      className={`pointer-events-none relative -mb-px w-full select-none overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: fromColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        preserveAspectRatio="none"
        className={`block w-full ${heightClassName} ${flipX ? "scale-x-[-1]" : ""}`}
      >
        {layered && selected.secondary ? (
          <path d={selected.secondary} fill={toColor} opacity={0.35} />
        ) : null}
        <path d={selected.primary} fill={toColor} />
      </svg>
    </div>
  );
}
