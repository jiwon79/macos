import { describe, expect, it } from "vitest";
import { fitWindowToViewport } from "./fitWindowToViewport";

describe("fitWindowToViewport", () => {
  it("keeps a window's preferred geometry when it fits", () => {
    const preferred = { x: 100, y: 100, width: 600, height: 600 };
    expect(
      fitWindowToViewport(preferred, { width: 1440, height: 900 })
    ).toEqual(preferred);
  });

  it("fits oversized and offscreen windows between the menu bar and Dock", () => {
    const fitted = fitWindowToViewport(
      { x: 1100, y: 700, width: 600, height: 800 },
      { width: 320, height: 568 }
    );
    expect(fitted.x).toBeGreaterThanOrEqual(8);
    expect(fitted.y).toBeGreaterThanOrEqual(32);
    expect(fitted.x + fitted.width).toBeLessThanOrEqual(312);
    expect(fitted.y + fitted.height).toBeLessThanOrEqual(488);
  });

  it("moves an offscreen window inward without unnecessarily shrinking it", () => {
    expect(
      fitWindowToViewport(
        { x: -100, y: 600, width: 232, height: 321 },
        { width: 375, height: 667 }
      )
    ).toEqual({ x: 8, y: 266, width: 232, height: 321 });
  });

  it("preserves preferred geometry through shrink and grow cycles", () => {
    const preferred = { x: 200, y: 100, width: 600, height: 600 };
    const before = { ...preferred };
    const compact = fitWindowToViewport(preferred, { width: 667, height: 375 });
    expect(compact.height).toBeLessThan(preferred.height);
    expect(preferred).toEqual(before);
    expect(
      fitWindowToViewport(preferred, { width: 1440, height: 900 })
    ).toEqual(before);
  });
});
