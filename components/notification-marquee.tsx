import { BellRingingIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { NewBadge } from "@/components/new-badge";

export type Notice = {
  date: string;
  title: string;
  isNew?: boolean;
};

export function NotificationMarquee({ notices }: { notices: Notice[] }) {
  const items: Notice[] = [
    { date: "", title: "Admissions Open for Session 2026-27 (Nursery to Grade 10)", isNew: true },
    ...(notices.length
      ? notices.map((n, i) => ({ ...n, isNew: n.isNew ?? i < 2 }))
      : [{ date: "", title: "New school information will appear here.", isNew: false }]),
  ];
  const repeated = [...items, ...items];

  return (
    <section className="border-b border-line bg-white text-ink" aria-label="School notifications">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-5 py-3 md:px-8">
        <Link
          href="/news"
          className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink"
        >
          <span className="grid size-7 place-items-center rounded-full bg-accent/10 text-accent" aria-hidden>
            <BellRingingIcon size={15} weight="fill" />
          </span>
          <span>Notices</span>
        </Link>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="notification-marquee-track flex w-max items-center hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {repeated.map((notice, index) => (
              <Link
                key={`${notice.title}-${index}`}
                href="/news"
                className="mr-10 inline-flex items-center gap-2.5 whitespace-nowrap text-sm text-ink/85 transition hover:text-ink"
              >
                {notice.date ? (
                  <time dateTime={notice.date} className="text-xs text-muted font-mono">
                    {notice.date}
                  </time>
                ) : null}
                <span className="text-accent">•</span>
                <span className="font-medium">{notice.title}</span>
                {notice.isNew ? <NewBadge className="ml-1" /> : null}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/news"
          className="hidden shrink-0 text-sm font-medium text-accent hover:underline sm:block"
        >
          View all
        </Link>
      </div>
    </section>
  );
}
