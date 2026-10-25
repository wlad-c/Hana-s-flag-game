import { UiIcon } from "./UiIcon";
import { useEffect, useRef, useState } from "react";

/**
 * Icon-only topbar control that shares the current address-bar URL so the
 * recipient lands on the same page/view (game mode query, Learn country/era,
 * Bingo lobby, …). Pages keep that URL in sync via their own write-back.
 */
export function ShareLinkButton() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleClick = async () => {
    const url = window.location.href;
    try {
      // Prefer the native share sheet on mobile; fall back to clipboard.
      if (navigator.share) {
        await navigator.share({ url, title: document.title });
        return;
      }
      await navigator.clipboard.writeText(url);
    } catch {
      // User dismissed the share sheet, or clipboard is unavailable
      // (e.g. non-secure context). Fall back to a manual prompt.
      if (!navigator.share) window.prompt("Copy this link:", url);
      return;
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      className={`site-topbar__share${copied ? " site-topbar__share--copied" : ""}`}
      onClick={handleClick}
      aria-label={copied ? "Link copied" : "Share a link to this page"}
      title={copied ? "Link copied" : "Share a link to this page"}
    >
      <span className="site-topbar__btn-icon" aria-hidden="true">
        <UiIcon name={copied ? "check" : "share"} />
      </span>
    </button>
  );
}
