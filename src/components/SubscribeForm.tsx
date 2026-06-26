// Email 訂閱表單。純 HTML form POST，靜態站無需後端。
// 設定方式：在 Vercel 環境變數加 NEXT_PUBLIC_SUBSCRIBE_ACTION = 你的表單 action URL
//   · Buttondown： https://buttondown.email/api/emails/embed-subscribe/<你的帳號>
//   · ConvertKit： https://app.convertkit.com/forms/<formId>/subscriptions（欄位名改 email_address）
// 未設定時，顯示「即將開放」狀態（不會送出假請求）。
export default function SubscribeForm() {
  const action = process.env.NEXT_PUBLIC_SUBSCRIBE_ACTION;

  return (
    <div className="rounded-[var(--radius)] border border-[var(--line-strong)] p-5">
      <p className="eyebrow">訂閱更新</p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        這本書公開寫作中。留個 email，新章上線、重大修訂時通知你。
      </p>

      {action ? (
        <form
          action={action}
          method="post"
          target="_blank"
          className="mt-4 flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-[var(--radius)] border border-[var(--line-strong)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            className="rounded-[var(--radius)] bg-[var(--fg-strong)] px-5 py-2 text-sm font-medium text-[var(--surface)] transition-opacity hover:opacity-85"
          >
            訂閱
          </button>
        </form>
      ) : (
        <p className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius)] border border-dashed border-[var(--line-strong)] px-3 py-2 text-sm text-[var(--metal)]">
          <span className="live-mark" />
          訂閱功能即將開放
        </p>
      )}
    </div>
  );
}
