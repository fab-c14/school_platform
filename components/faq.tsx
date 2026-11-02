import { PlusIcon } from "@phosphor-icons/react/dist/ssr";

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line pb-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-2 text-base font-medium leading-snug text-ink [&::-webkit-details-marker]:hidden">
            {item.question}
            <PlusIcon
              size={18}
              weight="bold"
              className="mt-0.5 shrink-0 text-accent transition duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
