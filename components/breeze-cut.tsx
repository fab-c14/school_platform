const paths = [
  "M0 58C160 18 280 86 460 46C660 2 820 78 1020 40C1200 8 1320 62 1440 28V90H0Z",
  "M0 24C140 72 320 8 500 42C700 80 860 16 1060 50C1240 78 1340 20 1440 46V90H0Z",
  "M0 48C180 88 340 12 540 40C760 72 900 8 1100 44C1260 70 1360 18 1440 36V90H0Z",
  "M0 34C200 6 340 78 560 36C760 0 940 70 1140 28C1280 6 1380 58 1440 22V90H0Z",
];

export function BreezeCut({
  tone = "paper",
  variant = 0,
}: {
  tone?: "paper" | "mist" | "deep";
  variant?: number;
}) {
  const fill = tone === "deep" ? "var(--deep)" : tone === "mist" ? "#f6ebe4" : "var(--paper)";

  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full -translate-y-[calc(100%-1px)] md:h-24"
      aria-hidden
    >
      <path d={paths[variant % paths.length]} fill={fill} />
    </svg>
  );
}
