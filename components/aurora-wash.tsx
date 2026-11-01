"use client";

import Aurora from "@/components/react-bits/aurora";

export function AuroraWash({ quiet = false }: { quiet?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Aurora
        colorStops={["#f8e6dc", "#e85d3f", "#f6d7cb"]}
        lightMode
        amplitude={quiet ? 0.45 : 0.8}
        blend={0.4}
        speed={quiet ? 0.35 : 0.55}
        height={quiet ? 0.7 : 0.5}
        opacity={quiet ? 0.45 : 0.72}
        brightness={0.85}
        mouseInteraction={!quiet}
        layers={2}
      />
    </div>
  );
}
