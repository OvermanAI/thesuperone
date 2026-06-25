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
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased">
        {/* 白色「紙頁」浮在中性灰「層架」上 — Vitsœ 語彙 */}
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col border-x border-[var(--line)] bg-[var(--surface)]">
          <header className="border-b border-[var(--line)]">
            <div className="flex items-center justify-between px-6 py-5">
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
                <Link href="/about" className="hover:text-[var(--fg-strong)]">
                  關於
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 px-6">{children}</main>

          <footer className="border-t border-[var(--line)]">
            <div className="px-6 py-8 text-sm text-[var(--muted)]">
              <p className="flex items-center gap-2">
                <span className="live-mark" />
                <span className="eyebrow">Building in Public</span>
              </p>
              <p className="mt-3 text-[var(--fg)]">
                《The Super One — AI 時代的超級個體》
              </p>
              <p className="mt-0.5">作者 AI-MAN · 公開寫作中</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
