import Image from "next/image";

export function NewBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center align-middle select-none ${className}`}
      title="New update"
    >
      {/* Animated shiny NEW * badge */}
      <Image
        src="/images/new.gif"
        alt="New"
        width={42}
        height={18}
        unoptimized
        className="h-4 w-auto object-contain shrink-0 drop-shadow-[0_1px_3px_rgba(196,71,43,0.35)]"
      />
      <span className="sr-only">(New)</span>
    </span>
  );
}
