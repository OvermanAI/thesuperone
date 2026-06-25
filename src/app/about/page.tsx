import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於",
  description: "關於《The Super One》與作者 AI-MAN，以及為什麼這本書要公開寫作。",
};

export default function About() {
  return (
    <div className="py-14">
      <p className="eyebrow">關於 · About</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--fg-strong)]">
        關於這本書
      </h1>

      <div className="prose prose-zh prose-neutral mt-8 max-w-[var(--reading)] prose-headings:text-[var(--fg-strong)] prose-strong:text-[var(--fg-strong)]">
        <p>
          《The Super One — AI 時代的超級個體》是一本<strong>公開寫作中</strong>的書。
          它教你成為 AI Big Boss、打造你的 AI Factory、創造 The Super Money——
          一個人 + 一座 AI 工廠，足以和上百人的公司正面競爭。
        </p>
        <p>
          為什麼公開寫？因為這本書講的就是「公開建造」（Building in Public）。
          與其寫完再出版，不如把寫作過程本身變成內容——
          你看到的每一章都是活的草稿，會一路迭代、長大。
        </p>
      </div>

      <div className="mt-10 border-t border-[var(--line-strong)] pt-6">
        <p className="eyebrow">三本書</p>
        <dl className="mt-4 divide-y divide-[var(--line)]">
          {[
            ["idreamaiworks.com", "為什麼這樣活"],
            ["aileanstartup.com", "怎麼開始、賺到第一筆"],
            ["thesuperone.com", "怎麼放大成超級個體（本書）"],
          ].map(([site, desc]) => (
            <div key={site} className="flex justify-between gap-4 py-3">
              <dt className="font-mono text-sm text-[var(--fg-strong)]">
                {site}
              </dt>
              <dd className="text-sm text-[var(--muted)]">{desc}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-8 text-sm text-[var(--muted)]">作者：AI-MAN。</p>
    </div>
  );
}
