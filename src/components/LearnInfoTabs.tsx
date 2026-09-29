/**
 * Tab strip for the Learn-mode country information panel.
 *
 * "Priority+" navigation: as many tabs as fit the panel width render inline;
 * the rest move behind a "More ▾" button that opens a menu. The button is a
 * real control, so every tab is reachable by mouse, touch and keyboard — a
 * horizontally-scrolling strip is only scrollable by swipe (a mouse wheel
 * scrolls the page, not the strip), which left desktop users stranded.
 * When the active tab lives in the menu, the button takes its label and the
 * active styling so the current tab is always visible.
 */
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  LEARN_PANEL_TAB_IDS,
  LEARN_PANEL_TAB_LABELS,
  type LearnPanelTabId,
} from "../lib/learnPanelTabs";

export function LearnInfoTabs({
  active,
  onChange,
  tabs = LEARN_PANEL_TAB_IDS,
}: {
  active: LearnPanelTabId;
  onChange: (tab: LearnPanelTabId) => void;
  /** Defaults to every panel tab; subdivision drill-in passes a smaller set. */
  tabs?: readonly LearnPanelTabId[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [visibleCount, setVisibleCount] = useState(tabs.length);
  const [open, setOpen] = useState(false);

  // Widths come from an invisible copy of the full strip (plus a sample
  // "More" button), so the fit calculation never depends on what is
  // currently collapsed.
  const recompute = useCallback(() => {
    const wrap = wrapRef.current;
    const measure = measureRef.current;
    if (!wrap || !measure) return;
    const available = wrap.clientWidth;
    const tabEls = Array.from(
      measure.querySelectorAll<HTMLElement>("[data-measure-tab]"),
    );
    const moreEl = measure.querySelector<HTMLElement>("[data-measure-more]");
    const gap = parseFloat(getComputedStyle(measure).columnGap) || 0;
    const widths = tabEls.map((el) => el.getBoundingClientRect().width);
    const total = widths.reduce((s, w) => s + w, 0) + gap * Math.max(0, widths.length - 1);
    if (total <= available + 0.5) {
      setVisibleCount(widths.length);
      return;
    }
    const moreWidth = moreEl?.getBoundingClientRect().width ?? 0;
    let used = moreWidth;
    let count = 0;
    for (const w of widths) {
      if (used + gap + w > available) break;
      used += gap + w;
      count++;
    }
    setVisibleCount(Math.max(1, count));
  }, []);

  useLayoutEffect(() => {
    recompute();
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(recompute);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [recompute, tabs]);

  // Web fonts can land after first layout and change every tab's width.
  useEffect(() => {
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(recompute).catch(() => {});
  }, [recompute]);

  const inline = tabs.slice(0, visibleCount);
  const overflow = tabs.slice(visibleCount);
  const activeInMenu = overflow.includes(active);

  useEffect(() => {
    if (overflow.length === 0) setOpen(false);
  }, [overflow.length]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    const first =
      menuRef.current?.querySelector<HTMLElement>('[aria-checked="true"]') ??
      menuRef.current?.querySelector<HTMLElement>('[role="menuitemradio"]');
    first?.focus();
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [open]);

  const select = (id: LearnPanelTabId) => {
    onChange(id);
    if (open) {
      setOpen(false);
      toggleRef.current?.focus();
    }
  };

  const onMenuKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? [],
    );
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      toggleRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const onToggleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const tabClass = (selected: boolean) =>
    `flag-tabs__tab${selected ? " flag-tabs__tab--active" : ""}`;

  return (
    <div className="learn-panel-tabs-wrap" ref={wrapRef}>
      <div className="flag-tabs learn-panel-tabs" role="tablist" aria-label="Country information">
        {inline.map((id) => {
          const selected = id === active;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={tabClass(selected)}
              onClick={() => select(id)}
            >
              {LEARN_PANEL_TAB_LABELS[id]}
            </button>
          );
        })}
      </div>
      {overflow.length > 0 && (
        <div className="learn-panel-tabs__more-wrap">
          <button
            ref={toggleRef}
            type="button"
            className={`${tabClass(activeInMenu)} learn-panel-tabs__more`}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label={
              activeInMenu
                ? `${LEARN_PANEL_TAB_LABELS[active]} — more tabs`
                : "More tabs"
            }
            onClick={() => setOpen((v) => !v)}
            onKeyDown={onToggleKeyDown}
          >
            <span>{activeInMenu ? LEARN_PANEL_TAB_LABELS[active] : "More"}</span>
            <span className="learn-panel-tabs__caret" aria-hidden="true">
              ▾
            </span>
          </button>
          {open && (
            <div
              ref={menuRef}
              className="learn-panel-tabs__menu"
              role="menu"
              aria-label="More tabs"
              onKeyDown={onMenuKeyDown}
            >
              {overflow.map((id) => {
                const selected = id === active;
                return (
                  <button
                    key={id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    tabIndex={-1}
                    className={`learn-panel-tabs__menu-item${
                      selected ? " learn-panel-tabs__menu-item--active" : ""
                    }`}
                    onClick={() => select(id)}
                  >
                    {LEARN_PANEL_TAB_LABELS[id]}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div className="flag-tabs learn-panel-tabs learn-panel-tabs__measure" ref={measureRef} aria-hidden="true">
        {tabs.map((id) => (
          <span key={id} data-measure-tab className={tabClass(id === active)}>
            {LEARN_PANEL_TAB_LABELS[id]}
          </span>
        ))}
        <span data-measure-more className={`${tabClass(true)} learn-panel-tabs__more`}>
          <span>
            {tabs.reduce(
              (longest, id) =>
                LEARN_PANEL_TAB_LABELS[id].length > longest.length
                  ? LEARN_PANEL_TAB_LABELS[id]
                  : longest,
              "More",
            )}
          </span>
          <span className="learn-panel-tabs__caret">▾</span>
        </span>
      </div>
    </div>
  );
}
