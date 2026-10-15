import type { ReactNode } from "react";

export function PageShell({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <main>
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pt-14">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{lede}</p>
      </header>
      {children ? <div className="border-t border-line">{children}</div> : null}
    </main>
  );
}
