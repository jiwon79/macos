import type { WindowStyle } from "domains/window/interface";
import { type RefObject, useLayoutEffect, useRef, useState } from "react";

// Matched to the native reference: position settles before the resized content.
const EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)";

export function useWindowTransition(
  elementRef: RefObject<HTMLDivElement>,
  bounds: WindowStyle,
  maximized: boolean,
  fullscreen: boolean
) {
  const previous = useRef({ bounds, maximized, fullscreen });
  const animations = useRef<Animation[]>([]);
  const [transitioning, setTransitioning] = useState(false);

  useLayoutEffect(() => {
    const before = previous.current;
    previous.current = { bounds, maximized, fullscreen };
    const element = elementRef.current;
    const modeChanged =
      before.maximized !== maximized || before.fullscreen !== fullscreen;
    if (!element) return;
    if (!modeChanged) {
      if (
        before.bounds.x !== bounds.x ||
        before.bounds.y !== bounds.y ||
        before.bounds.width !== bounds.width ||
        before.bounds.height !== bounds.height
      ) {
        for (const animation of animations.current) animation.cancel();
        animations.current = [];
        setTransitioning(false);
      }
      return;
    }

    // On a quick reversal, start from the currently painted frame.
    const computed = getComputedStyle(element);
    const interrupted = animations.current.length > 0;
    const from = interrupted
      ? {
          transform:
            animations.current[0].playState === "running"
              ? computed.transform
              : `translate(${before.bounds.x}px, ${before.bounds.y}px)`,
          width: computed.width,
          height: computed.height
        }
      : {
          transform: `translate(${before.bounds.x}px, ${before.bounds.y}px)`,
          width: `${before.bounds.width}px`,
          height: `${before.bounds.height}px`
        };
    for (const animation of animations.current) animation.cancel();
    animations.current = [];

    if (
      !element.animate ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setTransitioning(false);
      return;
    }

    const fullscreenChanged = before.fullscreen !== fullscreen;
    const duration = fullscreenChanged ? (fullscreen ? 650 : 450) : 550;
    const movement = element.animate(
      [
        { transform: from.transform },
        { transform: `translate(${bounds.x}px, ${bounds.y}px)` }
      ],
      { duration: Math.min(duration, 350), easing: EASING }
    );
    const resize = element.animate(
      [
        { width: from.width, height: from.height },
        { width: `${bounds.width}px`, height: `${bounds.height}px` }
      ],
      { duration, easing: "cubic-bezier(0.32, 0, 0.15, 1)" }
    );
    const current = [movement, resize];
    animations.current = current;
    setTransitioning(true);
    void Promise.all(current.map((animation) => animation.finished))
      .then(() => {
        if (animations.current === current) {
          animations.current = [];
          setTransitioning(false);
        }
      })
      .catch(() => {}); // Cancellation is expected on reversal or unmount.
  }, [bounds, maximized, fullscreen, elementRef]);

  useLayoutEffect(
    () => () => {
      for (const animation of animations.current) animation.cancel();
      animations.current = [];
    },
    []
  );

  return transitioning;
}
