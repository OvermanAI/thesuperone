"use client";

import { useEffect, useRef } from "react";

// GitHub Discussions 留言（giscus）。每章一個討論串（mapping=pathname）。
// ⚠️ 需在 repo 安裝 giscus App（https://github.com/apps/giscus）後才會顯示。
export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.querySelector("iframe.giscus-frame")) return;
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    const attrs: Record<string, string> = {
      "data-repo": "OvermanAI/thesuperone",
      "data-repo-id": "R_kgDOTE1rpw",
      "data-category": "Announcements",
      "data-category-id": "DIC_kwDOTE1rp84C_7PS",
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "light",
      "data-lang": "zh-TW",
      "data-loading": "lazy",
    };
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    el.appendChild(s);
  }, []);

  return <div ref={ref} className="giscus" />;
}
