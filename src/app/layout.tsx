import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thesuperone.com"),
  title: {
    default: "The Super One — AI 時代的超級個體",
    template: "%s · The Super One",
  },
  description:
    "一本公開寫作中的書。教你成為 AI Big Boss、打造你的 AI Factory、創造 The Super Money——一個人 + AI 工廠，對打上百人公司。",
  openGraph: {
    title: "The Super One — AI 時代的超級個體",
    description: "公開寫作中的活書：AI Big Boss × My AI Factory × The Super Money。",
    type: "website",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body className="flex min-h-screen flex-col bg-[var(--surface)] text-[var(--fg)] antialiased">
        {/* 全螢幕版型：白底滿版，chrome 滿寬髮絲線，內容置中於寬容器 */}
        <header className="border-b border-[var(--line)]">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
            <Link
              href="/"
              className="text-[var(--fg-strong)] font-semibold tracking-tight"
            >
              The Super One
            </Link>
            <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
              <Link href="/book" className="hover:text-[var(--fg-strong)]">
                目錄
              </Link>
              <Link href="/log" className="hover:text-[var(--fg-strong)]">
                日誌
              </Link>
              <Link href="/about" className="hover:text-[var(--fg-strong)]">
                關於
              </Link>
              <Link
                href="/writing-in-public"
                className="hover:text-[var(--fg-strong)]"
              >
                WRITING IN PUBLIC
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 sm:px-10">
          {children}
        </main>

        <footer className="border-t border-[var(--line)]">
          <div className="mx-auto w-full max-w-6xl px-6 py-8 text-sm text-[var(--muted)] sm:px-10">
            <p className="flex items-center gap-2">
              <span className="live-mark" />
              <span className="eyebrow">Writing in Public</span>
            </p>
            <p className="mt-3 text-[var(--fg)]">
              《The Super One — AI 時代的超級個體》
            </p>
            <p className="mt-0.5">作者 AI-MAN · 公開寫作中</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
