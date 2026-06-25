import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CANON, getChapter, chapterNeighbors, STATUS_LABEL } from "@/lib/book";
import StatusBadge from "@/components/StatusBadge";

export function generateStaticParams() {
  return CANON.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ch = getChapter(slug);
  if (!ch) return {};
  return { title: ch.meta.title, description: ch.meta.summary };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ch = getChapter(slug);
  if (!ch) notFound();

  const { meta, content } = ch;
  const { prev, next } = chapterNeighbors(slug);
  const planned = meta.status === "planned" || !meta.hasContent;

  return (
    <article className="py-14">
      <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
        <Link href="/book" className="hover:text-[var(--fg)]">← 目錄</Link>
        <StatusBadge status={meta.status} />
        {meta.updated && <span>更新於 {meta.updated}</span>}
      </div>

      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight">
        {meta.title}
      </h1>

      {meta.status === "drafting" && (
        <p className="mt-5 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent-ink)]">
          這是一份<b>公開草稿</b>。內容還在迭代，歡迎一起把它變得更好。
        </p>
      )}

      {planned ? (
        <div className="mt-10 rounded-xl border border-dashed border-black/15 p-10 text-center text-[var(--muted)]">
          <p className="text-lg font-medium text-[var(--fg)]">即將公開</p>
          <p className="mt-2">{meta.summary}</p>
          <p className="mt-4 text-sm">這一章還在排隊。訂閱後上線會通知你。</p>
        </div>
      ) : (
        <div className="prose prose-zh prose-neutral mt-8 max-w-none prose-headings:font-semibold prose-a:text-[var(--accent-ink)] prose-pre:bg-[#1b1813] prose-pre:text-zinc-100">
          <MDXRemote
            source={content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      )}

      <nav className="mt-16 flex justify-between gap-4 border-t border-black/10 pt-6 text-sm">
        {prev ? (
          <Link href={`/book/${prev.slug}`} className="group max-w-[45%]">
            <div className="text-[var(--muted)]">← 上一章</div>
            <div className="font-medium group-hover:text-[var(--accent-ink)]">{prev.title}</div>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/book/${next.slug}`} className="group max-w-[45%] text-right">
            <div className="text-[var(--muted)]">下一章 →</div>
            <div className="font-medium group-hover:text-[var(--accent-ink)]">{next.title}</div>
          </Link>
        ) : <span />}
      </nav>

      <p className="mt-10 text-center text-xs text-[var(--muted)]">
        狀態：{STATUS_LABEL[meta.status]} · 本書公開寫作中 · Building in Public
      </p>
    </article>
  );
}
