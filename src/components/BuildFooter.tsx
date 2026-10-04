import { UiIcon } from "./UiIcon";
import { formatRelativeTime } from "../lib/formatRelativeTime";

/**
 * Build-info readout (SHA + relative timestamp + hard-refresh button), rendered as
 * the left-hand side of the shared bottom bar (see ProfileBottomNav, which
 * places this alongside the profile chip in the same row).
 *
 * Shows the short git SHA + a relative timestamp ("7d ago", "1h ago", etc.)
 * of when the bundle was built. Lets you (and users reporting bugs) tell at a
 * glance whether the site they're looking at has the latest commit deployed —
 * handy after pushing a fix and wondering if GitHub Pages has caught up.
 *
 * Values come from compile-time `define`d constants in vite.config.ts:
 *   __BUILD_COMMIT__  short SHA (or 'dev' when run locally with no git)
 *   __BUILD_ISO__     ISO 8601 build timestamp; formatted client-side
 *                     as relative time for space efficiency.
 */
export function BuildFooter() {
  const commit = __BUILD_COMMIT__;
  const builtAt = new Date(__BUILD_ISO__);

  const relativeTime = formatRelativeTime(builtAt);

  const commitHref =
    commit && commit !== "dev"
      ? `https://github.com/wlad-c/Hana-s-flag-game/commit/${commit}`
      : null;

  async function hardRefresh() {
    // Clear SW caches + unregister the service worker so it can't intercept the
    // reload and serve stale content. vite-plugin-pwa re-registers on next load.
    const cleanup = (async () => {
      if ("caches" in window) {
        const names = await window.caches.keys();
        await Promise.all(names.map((n) => window.caches.delete(n)));
      }
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
    })().catch(() => {
      // Never let a cache/SW error block the refresh.
    });

    // If the cache/SW APIs hang (seen on some iOS/Safari PWA states), don't let
    // the refresh stall — cap the wait and reload regardless.
    await Promise.race([
      cleanup,
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);

    // A plain location.reload() can still be served from the browser's HTTP
    // cache: GitHub Pages sends index.html with `Cache-Control: max-age=600`,
    // so within 10 minutes the reload returns the SAME stale bundle and the
    // build never changes — which looks like the refresh "failing". Navigating
    // to a unique URL forces a fresh network fetch of index.html (and therefore
    // the latest hashed JS/CSS). `replace` avoids adding a history entry.
    const url = new URL(window.location.href);
    url.searchParams.set("_cb", Date.now().toString(36));
    window.location.replace(url.toString());
  }
  return (
    <div className="build-footer" role="contentinfo" aria-label="Build info">
      <span className="build-footer__text">
        <span className="build-footer__label">Build</span>{" "}
        {commitHref ? (
          <a
            className="build-footer__sha"
            href={commitHref}
            target="_blank"
            rel="noreferrer noopener"
            title="View this commit on GitHub"
          >
            {commit}
          </a>
        ) : (
          <span className="build-footer__sha">{commit}</span>
        )}{" "}
        <span
          className="build-footer__time"
          title={`Built ${builtAt.toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "medium",
          })}`}
        >
          · Updated {relativeTime}
        </span>
      </span>
      <button
        type="button"
        className="build-footer__refresh"
        onClick={hardRefresh}
        title="Hard refresh to get the latest version"
        aria-label="Refresh page"
      >
        <UiIcon name="undo" />
      </button>
    </div>
  );
}

