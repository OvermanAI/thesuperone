import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於",
  description: "關於《The Super One》與作者 AI-MAN，以及為什麼這本書要公開寫作。",
};

export default function About() {
  return (
    <div className="prose prose-zh prose-neutral max-w-none py-14">
      <h1>關於這本書</h1>
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
      <h2>三本書</h2>
      <ul>
        <li><strong>idreamaiworks.com</strong> —— 為什麼這樣活</li>
        <li><strong>aileanstartup.com</strong> —— 怎麼開始、賺到第一筆</li>
        <li><strong>thesuperone.com</strong> —— 怎麼放大成超級個體（本書）</li>
      </ul>
      <p>作者：AI-MAN。</p>
    </div>
  );
}
