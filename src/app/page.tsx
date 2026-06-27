import Link from "next/link";
import { getChapters } from "@/lib/book";

const THEMES = [
  {
    n: "01",
    t: "AI Big Boss",
    d: "你成為什麼：出願景、指揮 AI CEO 的大老闆。",
  },
  {
    n: "02",
    t: "My AI Factory",
    d: "你的引擎：24/7 替你運轉、越跑越強的工廠。",
  },
  {
    n: "03",
    t: "The Super Money",
    d: "你的產出：品牌 × 媒體 × 電商的指數型多重收入。",
  },
];

export default function Home() {
  const chapters = getChapters();
  const live = chapters.filter((c) => c.hasContent).length;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="border-b border-[var(--line)] py-16 sm:py-20">
        <p className="flex items-center gap-2">
          <span className="live-mark" />
          <span className="eyebrow">公開寫作中 · Writing in Public</span>
        </p>

        <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--fg-strong)] sm:text-5xl">
          The Super One
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)]">AI 時代的超級個體</p>

        <p className="prose-zh mt-8 max-w-[var(--reading)] text-lg">
          進入 2026 年——AI Agent 時代——
          <strong className="text-[var(--fg-strong)]">
            你能打造與運營多大規模的 AI 工廠，決定你能有多強大的競爭力。
          </strong>
          一個人 + 一座 AI 工廠，足以和上百人的公司正面競爭，並創造上億美元的收入。
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/book"
            className="rounded-[var(--radius)] bg-[var(--fg-strong)] px-6 py-3 text-sm font-medium text-[var(--surface)] transition-opacity hover:opacity-85"
          >
            開始讀（{live} 章已上線）
          </Link>
          <Link
            href="/book/intro"
            className="rounded-[var(--radius)] border border-[var(--line-strong)] px-6 py-3 text-sm font-medium text-[var(--fg)] hover:bg-[var(--surface-2)]"
          >
            從前言開始
          </Link>
        </div>
      </section>

      {/* ── 三大主題：功能規格卡 ── */}
      <section className="py-14">
        <p className="eyebrow">本書三大主題</p>
        <div className="mt-6 grid border-t border-[var(--line)] sm:grid-cols-3 sm:border-t-0">
          {THEMES.map((x, i) => (
            <div
              key={x.t}
              className={`py-6 sm:px-6 sm:py-2 sm:first:pl-0 ${
                i > 0
                  ? "border-t border-[var(--line)] sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <div className="font-mono text-xs text-[var(--metal)]">{x.n}</div>
              <div className="mt-2 font-semibold text-[var(--fg-strong)]">
                {x.t}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {x.d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
