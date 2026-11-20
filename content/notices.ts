export const noticeAudiences = {
  home: "Home page",
  admissions: "Admissions page",
  both: "Home and Admissions pages",
} as const;

export type NoticeAudience = keyof typeof noticeAudiences;

export type SchoolNotice = {
  date: string;
  title: string;
  isNew: boolean;
  audience?: NoticeAudience;
};

export function isNoticeAudience(value: unknown): value is NoticeAudience {
  return typeof value === "string" && Object.hasOwn(noticeAudiences, value);
}

export function isNoticeDate(value: unknown): value is string {
  if (value === "") return true;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
