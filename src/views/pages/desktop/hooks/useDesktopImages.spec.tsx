import { act, cleanup, renderHook } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDesktopImages } from "./useDesktopImages";

class MockImage {
  static instances: MockImage[] = [];
  static cached = false;
  complete = MockImage.cached;
  naturalWidth = MockImage.cached ? 100 : 0;
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src = "";

  constructor() {
    MockImage.instances.push(this);
  }
}

function loadAll(images = MockImage.instances) {
  act(() => {
    for (const image of images) image.onload?.();
  });
}

describe("desktop image loading", () => {
  beforeEach(() => {
    MockImage.instances = [];
    MockImage.cached = false;
    vi.stubGlobal("Image", MockImage);
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("waits for both wallpapers and every Dock image before opening", () => {
    const { result } = renderHook(useDesktopImages);
    expect(MockImage.instances).toHaveLength(5);
    loadAll(MockImage.instances.slice(0, -1));
    expect(result.current.loading).toBe(true);
    loadAll(MockImage.instances.slice(-1));
    expect(result.current.loading).toBe(false);
    expect(result.current.failed).toBe(false);
    act(() => vi.advanceTimersByTime(30000));
    expect(result.current.failed).toBe(false);
  });

  it("opens immediately when every image is already cached", () => {
    MockImage.cached = true;
    const { result } = renderHook(useDesktopImages);
    expect(result.current.loading).toBe(false);
    expect(result.current.failed).toBe(false);
  });

  it("offers recovery after an image fails instead of loading forever", () => {
    const { result } = renderHook(useDesktopImages);
    act(() => MockImage.instances[0].onerror?.());
    loadAll(MockImage.instances.slice(1));
    expect(result.current.loading).toBe(false);
    expect(result.current.failed).toBe(true);
    act(() => result.current.continueToDesktop());
    expect(result.current.failed).toBe(false);
    act(() => vi.advanceTimersByTime(30000));
    expect(result.current.failed).toBe(false);
  });

  it("retries failed requests and opens once the new attempt succeeds", () => {
    const { result } = renderHook(useDesktopImages);
    act(() => MockImage.instances[0].onerror?.());
    loadAll(MockImage.instances.slice(1));
    act(() => result.current.retry());
    expect(result.current.loading).toBe(true);
    expect(result.current.failed).toBe(false);
    expect(MockImage.instances).toHaveLength(10);
    loadAll(MockImage.instances.slice(5));
    expect(result.current.loading).toBe(false);
    expect(result.current.failed).toBe(false);
  });

  it("offers recovery for stalled requests and ignores late events", () => {
    const { result } = renderHook(useDesktopImages);
    const lateError = MockImage.instances[0].onerror;
    act(() => vi.advanceTimersByTime(15000));
    expect(result.current.failed).toBe(true);
    act(() => result.current.continueToDesktop());
    act(() => lateError?.());
    expect(result.current.failed).toBe(false);
  });

  it("cleans up pending events and timers on unmount", () => {
    const { unmount } = renderHook(useDesktopImages);
    unmount();
    for (const image of MockImage.instances) {
      expect(image.onload).toBeNull();
      expect(image.onerror).toBeNull();
    }
    expect(vi.getTimerCount()).toBe(0);
  });

  it("finishes the active attempt under React Strict Mode", () => {
    const { result } = renderHook(useDesktopImages, { wrapper: StrictMode });
    expect(MockImage.instances).toHaveLength(10);
    loadAll();
    expect(result.current.loading).toBe(false);
    expect(result.current.failed).toBe(false);
  });
});
