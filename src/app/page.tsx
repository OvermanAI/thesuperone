import Link from "next/link";
import { getChapters } from "@/lib/book";

export default function Home() {
  const chapters = getChapters();
  const live = chapters.filter((c) => c.hasContent).length;

  return (
    <div className="py-16 sm:py-24">
      <p className="flex items-center gap-2 text-sm font-medium text-[var(--accent-ink)]">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
        公開寫作中 · Building in Public
      </p>

      <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        The Super One
      </h1>
      <p className="mt-3 text-xl text-[var(--muted)]">AI 時代的超級個體</p>

      <p className="prose-zh mt-8 text-lg">
        進入 2026 年——AI Agent 時代——
        <strong>你能打造與運營多大規模的 AI 工廠，決定你能有多強大的競爭力。</strong>
        <br />
        一個人 + 一座 AI 工廠，足以和上百人的公司正面競爭，並創造上億美元的收入。
      </p>

      <p className="prose-zh mt-4 text-lg text-[var(--muted)]">
        這本書教你成為 <b className="text-[var(--fg)]">AI Big Boss</b>、打造你的{" "}
        <b className="text-[var(--fg)]">AI Factory</b>、創造{" "}
        <b className="text-[var(--fg)]">The Super Money</b>。它正在公開寫作——你可以一路跟著看它長出來。
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/book"
          className="rounded-full bg-[var(--fg)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-85"
        >
          開始讀（{live} 章已上線）
        </Link>
        <Link
          href="/book/intro"
          className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium hover:bg-black/[.04]"
        >
          從前言開始
        </Link>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        {[
          { t: "AI Big Boss", d: "你成為什麼：出願景、指揮 AI CEO 的大老闆。" },
          { t: "My AI Factory", d: "你的引擎：24/7 替你運轉、越跑越強的工廠。" },
          { t: "The Super Money", d: "你的產出：品牌×媒體×電商的指數型多重收入。" },
        ].map((x) => (
          <div key={x.t} className="rounded-xl border border-black/10 p-5">
            <div className="text-sm font-semibold">{x.t}</div>
            <p className="mt-2 text-sm text-[var(--muted)]">{x.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
