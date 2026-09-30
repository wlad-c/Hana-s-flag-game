import { useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";
import { popoverBounds } from "../lib/popoverBounds";

/** Keep menu content inside the visible viewport, above persistent navigation.
 * Fixed positioning retains DOM containment for outside-click/nested menus.
 */
export function usePopoverBounds(open: boolean, anchor: RefObject<HTMLDivElement | null>, width: number) {
  const [bounds, setBounds] = useState<CSSProperties>({ visibility: "hidden" });
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      if (!anchor.current) return;
      const trigger = anchor.current.querySelector("button");
      if (!trigger) return;
      const visual = window.visualViewport;
      const left = visual?.offsetLeft ?? 0;
      const top = visual?.offsetTop ?? 0;
      const viewportWidth = visual?.width ?? window.innerWidth;
      const bottom = top + (visual?.height ?? window.innerHeight);
      const footer = document.querySelector(".bottom-nav")?.getBoundingClientRect();
      const usableBottom = footer && footer.height > 0 && footer.top > top
        ? Math.min(bottom, footer.top) : bottom;
      setBounds({ position: "fixed", right: "auto", bottom: "auto", margin: 0,
        boxSizing: "border-box", overflowY: "hidden", zIndex: 70,
        ...popoverBounds(trigger.getBoundingClientRect(), {
          left, top, width: viewportWidth, height: usableBottom - top,
        }, width),
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, [open, anchor, width]);
  return bounds;
}
