import { ChapterStatus, STATUS_LABEL } from "@/lib/book";

const STYLE: Record<ChapterStatus, string> = {
  planned: "border-black/15 text-[var(--muted)]",
  drafting: "border-[var(--accent)]/40 text-[var(--accent-ink)] bg-[var(--accent)]/10",
  published: "border-emerald-600/30 text-emerald-700 bg-emerald-600/10",
};

export default function StatusBadge({ status }: { status: ChapterStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STYLE[status]}`}
    >
      {status === "drafting" && (
        <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
      )}
      {STATUS_LABEL[status]}
    </span>
  );
}
