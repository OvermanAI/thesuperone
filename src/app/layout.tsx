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
      <body className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--fg)] antialiased">
        <header className="border-b border-black/10">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              The Super One
            </Link>
            <nav className="flex items-center gap-5 text-sm text-[var(--muted)]">
              <Link href="/book" className="hover:text-[var(--fg)]">目錄</Link>
              <Link href="/about" className="hover:text-[var(--fg)]">關於</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-5">{children}</main>
        <footer className="mt-24 border-t border-black/10">
          <div className="mx-auto max-w-3xl px-5 py-10 text-sm text-[var(--muted)]">
            <p className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
              公開寫作中 · Building in Public
            </p>
            <p className="mt-2">《The Super One — AI 時代的超級個體》 · 作者 AI-MAN</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
