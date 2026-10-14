export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" fill="currentColor" />
      <path d="M8 8h7v16H8V8zm9 0h7v7h-7V8z" fill="#f3eee6" />
    </svg>
  );
}
