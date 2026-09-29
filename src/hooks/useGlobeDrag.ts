import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drag-to-rotate for the globe view. Horizontal drag spins the globe about
 * its axis; vertical drag tilts it (clamped short of the poles). The offset
 * is relative to the map's chosen view centre and resets when that changes.
 *
 * Mirrors useZoomPan's gesture handling: pointer capture only once the drag
 * passes a small threshold (so a tap still selects a country), and the click
 * that ends a real drag is swallowed so spinning never selects anything.
 * Updates are coalesced to one per animation frame, because every frame
 * re-projects the whole world.
 */
export type GlobeDrag = {
  lon: number;
  lat: number;
  dragging: boolean;
  handlers: {
    onPointerDown: (e: React.PointerEvent<SVGSVGElement>) => void;
    onPointerMove: (e: React.PointerEvent<SVGSVGElement>) => void;
    onPointerUp: (e: React.PointerEvent<SVGSVGElement>) => void;
    onPointerCancel: (e: React.PointerEvent<SVGSVGElement>) => void;
  };
};

const MAX_TILT = 80;

export function useGlobeDrag({
  width,
  height,
  zoomK,
  southUp,
  resetKey,
}: {
  width: number;
  height: number;
  zoomK: number;
  southUp: boolean;
  /** Any change (e.g. a new view-centre longitude) returns the globe to it. */
  resetKey: unknown;
}): GlobeDrag {
  const [rot, setRot] = useState({ lon: 0, lat: 0 });
  const [dragging, setDragging] = useState(false);
  const rotRef = useRef(rot);
  rotRef.current = rot;
  const drag = useRef({
    active: false,
    captured: false,
    moved: false,
    startX: 0,
    startY: 0,
    origLon: 0,
    origLat: 0,
  });
  const pending = useRef<{ lon: number; lat: number } | null>(null);
  const rafId = useRef<number | null>(null);
  const clearPendingClick = useRef<(() => void) | null>(null);

  useEffect(() => {
    setRot({ lon: 0, lat: 0 });
  }, [resetKey]);

  useEffect(
    () => () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    },
    [],
  );

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    clearPendingClick.current?.();
    drag.current = {
      active: true,
      captured: false,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      origLon: rotRef.current.lon,
      origLat: rotRef.current.lat,
    };
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const d = drag.current;
      if (!d.active) return;
      if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 4) {
        d.moved = true;
        setDragging(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
          d.captured = true;
        } catch {
          // ignore — some browsers won't capture if the pointer left
        }
      }
      if (!d.moved) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const dx = ((e.clientX - d.startX) / rect.width) * width;
      const dy = ((e.clientY - d.startY) / rect.height) * height;
      // One globe radius of drag ≈ one radian of rotation, so the point under
      // the pointer roughly follows it.
      const degPerUnit = 180 / Math.PI / (Math.min(width, height) / 2) / zoomK;
      const lat = d.origLat + (southUp ? -dy : dy) * degPerUnit;
      pending.current = {
        lon: d.origLon - dx * degPerUnit,
        lat: Math.max(-MAX_TILT, Math.min(MAX_TILT, lat)),
      };
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          if (pending.current) setRot(pending.current);
        });
      }
    },
    [width, height, zoomK, southUp],
  );

  const finish = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const svg = e.currentTarget;
    if (d.captured) {
      try {
        svg.releasePointerCapture(e.pointerId);
      } catch {
        // ignore — pointer may already be released
      }
    }
    drag.current = { ...d, active: false };
    setDragging(false);
    if (d.moved && e.type !== "pointercancel") {
      const swallow = (ev: MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
        clearPendingClick.current?.();
      };
      clearPendingClick.current = () => {
        svg.removeEventListener("click", swallow, true);
        clearPendingClick.current = null;
      };
      svg.addEventListener("click", swallow, true);
    }
  }, []);

  return {
    lon: rot.lon,
    lat: rot.lat,
    dragging,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finish,
      onPointerCancel: finish,
    },
  };
}
