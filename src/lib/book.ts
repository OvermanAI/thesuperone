import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ChapterStatus = "planned" | "drafting" | "published";

export type StageMeta = {
  n: number;
  theme: string; // 主題一/二/三
  title: string; // 主題英文名 + 中文
  blurb: string;
};

export type ChapterMeta = {
  slug: string;
  stage: number;
  chapter: number; // 0 = 前言
  order: number;
  title: string;
  summary: string;
  status: ChapterStatus;
  updated?: string;
  hasContent: boolean;
};

// ── 全書 canonical 結構（即使尚未撰寫，目錄也顯示全貌）──
export const STAGES: StageMeta[] = [
  { n: 1, theme: "主題一", title: "AI Big Boss（AI 大老闆）", blurb: "打造與指揮 AI 工廠的認知與能力" },
  { n: 2, theme: "主題二", title: "My AI Factory（我的 AI 工廠）", blurb: "The Super One 的超級槓桿" },
  { n: 3, theme: "主題三", title: "The Super Money（超級生意 · 形態）", blurb: "三位一體：品牌 × 媒體 × 電商" },
  { n: 4, theme: "主題三", title: "The Super Money（超級生意 · 本質）· The Super One", blurb: "為什麼超級 + 終局" },
  { n: 5, theme: "EXTRAS · 附錄", title: "實戰案例與提示詞", blurb: "每章一份最佳實務案例 + 可直接貼的 Claude Code 提示詞" },
];

type Canon = { slug: string; stage: number; chapter: number; title: string; summary: string };

export const CANON: Canon[] = [
  { slug: "intro", stage: 0, chapter: 0, title: "前言：BOSS 戰前夜 —— 重新想像你的 OPC", summary: "2026 是 AI Agent 時代：你能運營多大規模的 AI 工廠，決定你的競爭力。" },
  { slug: "ch01", stage: 1, chapter: 1, title: "重新想像 OPC：The Super One = 三位一體的 Super OPC", summary: "一人公司不是小生意，是能對打上百人公司的新物種。" },
  { slug: "ch02", stage: 1, chapter: 2, title: "三力地基：商業 × 全方位創作 × 一人品牌", summary: "AI 精實創業 × 編程／圖文／音樂／影片 × 媒體／電商。" },
  { slug: "ch03", stage: 1, chapter: 3, title: "AI Big Boss：你是老闆、AI 是 CEO", summary: "你不做執行，你出願景、給方向，用一個 AI CEO 管整座工廠。" },
  { slug: "ch04", stage: 2, chapter: 4, title: "AI 工廠的 CEO 不是你", summary: "用最強 Agent（Claude Code / Codex）去管理整座 Agent 工廠。" },
  { slug: "ch05", stage: 2, chapter: 5, title: "從零打造我的 AI 工廠：SELL → BUILD", summary: "先賣、先驗證有人付錢，再用 AI 工廠把 OPC 運營起來。" },
  { slug: "ch06", stage: 2, chapter: 6, title: "交給 AI CEO：運營與迭代優化", summary: "把運營權交給 AI CEO，你只下指令、審核、改系統。" },
  { slug: "ch07", stage: 3, chapter: 7, title: "品牌線：把你的存在 Build 成品牌產品階梯", summary: "從曝光到資產：課程／模板／工具包／服務。" },
  { slug: "ch08", stage: 3, chapter: 8, title: "媒體線：創辦人實境秀 → Agent 量產內容", summary: "公開建造你的真實旅程 = AI 永遠無法取代的內容。" },
  { slug: "ch09", stage: 3, chapter: 9, title: "電商線：自有電商通路，把信任接成成交", summary: "別只依賴平台；24/7 自動獲客、自動成交。" },
  { slug: "ch10", stage: 4, chapter: 10, title: "超級商業模式：三位一體飛輪、多重收入指數增長", summary: "四資產堆疊 × 三線交叉導流 → 上億美元收入結構。" },
  { slug: "ch11", stage: 4, chapter: 11, title: "超級競爭優勢：不可複製的護城河", summary: "一人勝百人；會自己加速、對手抄不走的護城河。" },
  { slug: "ch12", stage: 4, chapter: 12, title: "成為文化領袖：AI 時代的新世代領導者", summary: "不只是高收入，是一種新的活法。" },
  { slug: "appendix-cases", stage: 5, chapter: 0, title: "附錄：全書實戰案例與關鍵 Claude Code 提示詞", summary: "貫穿主角阿哲，從媒體 OPC 升級成 The Super One 的 12 章最佳實務案例，每章附可直接貼用的 Claude Code 提示詞。" },
];

const CONTENT_DIR = path.join(process.cwd(), "content", "book");

function fmtDate(v: unknown): string | undefined {
  if (!v) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

function readFileFor(slug: string): { data: Record<string, unknown>; content: string } | null {
  for (const ext of [".mdx", ".md"]) {
    const p = path.join(CONTENT_DIR, slug + ext);
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, "utf8");
      const { data, content } = matter(raw);
      return { data, content };
    }
  }
  return null;
}

export function getChapters(): ChapterMeta[] {
  return CANON.map((c, i) => {
    const file = readFileFor(c.slug);
    const data = (file?.data ?? {}) as Record<string, unknown>;
    const status = (data.status as ChapterStatus) ?? (file ? "drafting" : "planned");
    return {
      slug: c.slug,
      stage: c.stage,
      chapter: c.chapter,
      order: i,
      title: (data.title as string) ?? c.title,
      summary: (data.summary as string) ?? c.summary,
      status,
      updated: fmtDate(data.updated),
      hasContent: Boolean(file),
    };
  });
}

export function getChapter(slug: string): { meta: ChapterMeta; content: string } | null {
  const chapters = getChapters();
  const meta = chapters.find((c) => c.slug === slug);
  if (!meta) return null;
  const file = readFileFor(slug);
  return { meta, content: file?.content ?? "" };
}

export function chapterNeighbors(slug: string) {
  const chapters = getChapters();
  const idx = chapters.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : null,
  };
}

export const STATUS_LABEL: Record<ChapterStatus, string> = {
  planned: "規劃中",
  drafting: "草稿中",
  published: "已發布",
};
