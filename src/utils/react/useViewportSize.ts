import { useLayoutEffect, useState } from "react";

export interface ViewportSize {
  width: number;
  height: number;
}

export const getViewportSize = (): ViewportSize => ({
  width: window.innerWidth,
  height: window.innerHeight
});

export function useViewportSize() {
  const [size, setSize] = useState(getViewportSize);

  useLayoutEffect(() => {
    const update = () => setSize(getViewportSize());
    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
