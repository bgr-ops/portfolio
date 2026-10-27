export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const monthYear = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const fullDate = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function toDate(value: string) {
  // Date-only strings ("2024-05-01") are parsed as UTC to avoid off-by-one days.
  return new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
}

export function formatMonthYear(value: string | null | undefined) {
  return value ? monthYear.format(toDate(value)) : "";
}

export function formatDate(value: string | null | undefined) {
  return value ? fullDate.format(toDate(value)) : "";
}

export function formatDateRange(start: string, end: string | null, isCurrent: boolean) {
  return `${formatMonthYear(start)} — ${isCurrent || !end ? "Present" : formatMonthYear(end)}`;
}

export function yearOf(value: string | null | undefined) {
  return value ? toDate(value).getUTCFullYear().toString() : "";
}

/** Splits plain text into paragraphs on blank lines. */
export function paragraphs(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
