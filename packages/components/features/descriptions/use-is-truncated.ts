import { useCallback, useRef, useState } from 'react';

/**
 * Tracks whether an element's content is currently clipped by `truncate` (`scrollWidth > clientWidth`),
 * re-checking on resize since a responsive label column changes width without the element unmounting.
 *
 * Uses a callback ref rather than a ref object + mount-only effect: the caller's returned JSX shape
 * changes once `truncated` flips (bare span → `Tooltip`-wrapped span), which makes React unmount the old
 * span and mount a new one at that position. A one-time effect would keep observing the now-detached old
 * node — which reports a spurious resize to 0×0 once removed — flipping `truncated` back off. A callback
 * ref fires again on every such swap, so the observer always tracks the currently-mounted node.
 */
export function useIsTruncated<T extends HTMLElement>() {
  const [truncated, setTruncated] = useState(false);
  const cleanupRef = useRef<() => void>(() => {});

  const ref = useCallback((el: T | null) => {
    cleanupRef.current();
    if (!el) {
      cleanupRef.current = () => {};
      return;
    }
    const check = () => setTruncated(el.scrollWidth > el.clientWidth);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    // ResizeObserver only fires when the element's own box size changes — not when its content's natural
    // width changes while the box stays fixed (e.g. a web font finishing load after the initial layout,
    // which reflows text metrics without resizing the already-truncated box). Re-check once fonts settle.
    document.fonts?.ready.then(check);
    cleanupRef.current = () => observer.disconnect();
  }, []);

  return [ref, truncated] as const;
}
