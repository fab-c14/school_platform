import { BellRingingIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type Notice = {
  date: string;
  title: string;
};

export function NotificationMarquee({ notices }: { notices: Notice[] }) {
  const items = [
    { date: "", title: "Admissions are open. Call 7006384265 for details." },
    ...(notices.length ? notices : [{ date: "", title: "New school information will appear here." }]),
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
                className="mr-10 inline-flex items-center gap-3 whitespace-nowrap text-sm text-ink/75 transition hover:text-ink"
              >
                {notice.date ? <time dateTime={notice.date}>{notice.date}</time> : null}
                <span className="text-accent">•</span>
                <span>{notice.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/news" className="hidden shrink-0 text-sm font-medium text-accent sm:block">
          View all
        </Link>
      </div>
    </section>
  );
}
