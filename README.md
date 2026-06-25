# The Super One — thesuperone.com

一本**公開寫作中**的書（Scale 層）。靜態網站，內容由 MDX 驅動，`git push` 自動部署到 Vercel。

三大主題：**AI Big Boss → My AI Factory → The Super Money**——一個人 + 一座 AI 工廠，對打上百人公司。

---

## 內容怎麼來的（重要）

真稿來源是 Obsidian，網站只是它的發布出口。**永遠在 Obsidian 改，不要直接改這裡的 `.mdx`。**

| | 位置 |
|---|---|
| 📝 Obsidian 真稿 | `~/IDreamAIWorks/The Super One 電子書/` |
| 🌐 網站內容（自動產生） | `content/book/*.mdx` |

### 發布／更新一章

在 Obsidian 改好後，對 Claude Code 說：**「發布 superone ch03」** 或 **「publish-superone ch03」**。

skill（`~/.claude/skills/publish-superone.md`）會：讀草稿 → 補 frontmatter → 清 Obsidian 語法 → 展示預覽 → 你說「發布」→ 寫入 `content/book/` → git push → Vercel 部署。

同步是單向的（Obsidian → 網站）。直接改網站 `.mdx` 不會回寫 Obsidian，且下次發布同章會被覆蓋。

---

## 結構

- `src/lib/book.ts` — 全書 CANON（intro + 12 章，4 STAGE）與章節資料層
- `content/book/*.mdx` — 章節內容（frontmatter 的 `status` 控制：planned / drafting / published）
- `docs/DESIGN.md` — Dieter Rams 設計系統（三站共用 token，本站為原型）

## 開發

```bash
npm install
npm run dev    # 本機預覽
npm run build  # 驗證建置
```

部署：push 到 `main` → Vercel 自動部署到 thesuperone.com。

---

姊妹站：[idreamaiworks.com](https://idreamaiworks.com)（為什麼這樣活）· [aileanstartup.com](https://aileanstartup.com)（怎麼開始）
