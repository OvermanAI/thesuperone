#!/usr/bin/env python3
"""Writing in Public 發布：把 Obsidian 章節 .md 重新生成為 content/book/<slug>.mdx，
保留既有 frontmatter 與「修訂紀錄」，並「追加」一筆新紀錄（日期 + 變更內容）——不覆寫歷史。

用法：
  python3 scripts/publish-chapter.py <slug> "<這次的變更內容>" [--status drafting|published]

行為：
  - 內容來源：Obsidian 的 <slug>.md（會移除正文頂部重複 H1）
  - frontmatter：沿用現有 .mdx 的 title/stage/chapter/summary/status（除非 --status 覆寫）
  - revisions：保留現有全部，最後「追加」一筆 {今天, 變更內容}
  - 新章（無現有 .mdx）：需先建好 frontmatter，本腳本僅負責既有章的更新
"""
import sys, re, os, datetime

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OBSIDIAN = os.path.expanduser("~/IDreamAIWorks/The Super One 電子書")
DEST = os.path.join(REPO, "content", "book")
TODAY = datetime.date.today().isoformat()

# Obsidian 來源檔名特例（其餘預設 <slug>.md）
SRC_NAME = {
    "boss-engineering": "Boss-Engineering手冊.md",
    "appendix-cases": "實戰案例與提示詞_全書.md",
}


def field(fm, key):
    m = re.search(rf'^{key}:\s*(.*)$', fm, re.M)
    return m.group(1).strip() if m else None


def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    slug = sys.argv[1]
    note = sys.argv[2]
    status_override = None
    if "--status" in sys.argv:
        status_override = sys.argv[sys.argv.index("--status") + 1]

    mdx_path = os.path.join(DEST, f"{slug}.mdx")
    src_path = os.path.join(OBSIDIAN, SRC_NAME.get(slug, f"{slug}.md"))
    if not os.path.exists(mdx_path):
        print(f"❌ 找不到既有 {slug}.mdx（新章請先建 frontmatter）"); sys.exit(1)
    if not os.path.exists(src_path):
        print(f"❌ 找不到 Obsidian 源稿 {src_path}"); sys.exit(1)

    old = open(mdx_path, encoding="utf-8").read()
    m = re.match(r'^---\n(.*?)\n---\n', old, re.S)
    fm = m.group(1)

    title = field(fm, "title")
    stage = field(fm, "stage")
    chapter = field(fm, "chapter")
    summary = field(fm, "summary")
    status = status_override or field(fm, "status") or "drafting"

    # 取出既有 revisions（整段，原樣保留）
    rev_block = ""
    rm = re.search(r'^revisions:\n((?:[ ]+.*\n?)*)', fm, re.M)
    if rm:
        rev_block = rm.group(1).rstrip("\n") + "\n"

    # 內容來源：Obsidian，移除頂部 H1
    body = open(src_path, encoding="utf-8").read()
    body = re.sub(r'^#\s+.*\n+', '', body, count=1).strip() + "\n"

    new_rev = f'  - date: "{TODAY}"\n    note: "{note}"\n'
    out = (
        f"---\n"
        f"title: {title}\n"
        f"stage: {stage}\n"
        f"chapter: {chapter}\n"
        f'slug: "{slug}"\n'
        f"status: {status}\n"
        f"updated: {TODAY}\n"
        f"summary: {summary}\n"
        f"revisions:\n{rev_block}{new_rev}"
        f"---\n\n{body}"
    )
    open(mdx_path, "w", encoding="utf-8").write(out)
    n = out.count('  - date:')
    print(f"✅ {slug}.mdx 已更新｜狀態 {status}｜修訂紀錄 {n} 筆（最新：{note}）")


if __name__ == "__main__":
    main()
