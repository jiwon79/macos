import {
  IconAppCalculator,
  IconAppFinder,
  IconAppTrash
} from "assets/app-icons";
import { wallpaperDark, wallpaperLight } from "assets/wallpapers";
import { useEffect, useState } from "react";

const desktopImages = [
  wallpaperLight,
  wallpaperDark,
  IconAppFinder,
  IconAppCalculator,
  IconAppTrash
];

export function useDesktopImages() {
  const [images, setImages] = useState(desktopImages);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading"
  );

  useEffect(() => {
    let remaining = images.length;
    let failed = false;
    let finished = false;
    const cleanups: (() => void)[] = [];

    const finish = (nextStatus: "ready" | "failed") => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);
      for (const cleanup of cleanups) cleanup();
      setStatus(nextStatus);
    };
    // A stalled request should still offer retry or access to the desktop.
    const timeout = window.setTimeout(() => finish("failed"), 15000);

    for (const src of images) {
      const image = new Image();
      let settled = false;
      const settle = (success: boolean) => {
        if (settled || finished) return;
        settled = true;
        image.onload = null;
        image.onerror = null;
        failed ||= !success;
        remaining -= 1;
        if (remaining === 0) finish(failed ? "failed" : "ready");
      };

      cleanups.push(() => {
        settled = true;
        image.onload = null;
        image.onerror = null;
      });
      image.onload = () => settle(true);
      image.onerror = () => settle(false);
      image.src = src;
      if (image.complete) settle(image.naturalWidth > 0);
    }

    return () => {
      finished = true;
      window.clearTimeout(timeout);
      for (const cleanup of cleanups) cleanup();
    };
  }, [images]);

  return {
    loading: status === "loading",
    failed: status === "failed",
    retry: () => {
      setStatus("loading");
      setImages([...desktopImages]);
    },
    continueToDesktop: () => setStatus("ready")
  };
}
