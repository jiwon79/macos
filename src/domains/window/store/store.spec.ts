import { beforeEach, describe, expect, it, vi } from "vitest";
import type { MinimizedWindow } from "../interface";
import { useWindowsStore } from "./store";

vi.mock(
  "domains/app/applications/calculator/views/Calculator/Calculator",
  () => ({
    Calculator: () => null
  })
);

const initialState = useWindowsStore.getState();

function getWindow(id: string) {
  const { windows } = useWindowsStore.getState();
  const window = windows.find((window) => window.id === id);
  if (window == null) {
    throw new Error(`Window ${id} not found`);
  }

  return window;
}

function minimize(id: string) {
  const window = getWindow(id);
  useWindowsStore.getState().actions.minimizeWindow({
    id,
    appID: window.appID,
    window: window.style,
    imageData: {} as ImageData,
    target: { x: 0, y: 600 }
  } satisfies MinimizedWindow);
}

describe("window focus lifecycle", () => {
  beforeEach(() => {
    useWindowsStore.setState(initialState, true);
  });

  it("starts with the frontmost window focused", () => {
    const state = useWindowsStore.getState();
    expect(state.focusedWindowID).toBe(
      state.windows[state.windows.length - 1].id
    );
  });

  it("moves a focused window in front of other windows", () => {
    useWindowsStore.getState().actions.setFocusedWindowID("1");
    const state = useWindowsStore.getState();
    expect(state.focusedWindowID).toBe("1");
    expect(state.windows.map((window) => window.id)).toEqual(["2", "3", "1"]);
  });

  it("focuses a newly launched app", () => {
    useWindowsStore.getState().actions.createAppWindow("calculator");
    const state = useWindowsStore.getState();
    expect(state.windows).toHaveLength(initialState.windows.length + 1);
    expect(state.focusedWindowID).toBe(
      state.windows[state.windows.length - 1].id
    );
  });

  it("focuses the next visible window when minimizing the active window", () => {
    minimize("2");
    minimize("3");
    expect(useWindowsStore.getState().focusedWindowID).toBe("1");
  });

  it("keeps the active window focused when minimizing another window", () => {
    minimize("1");
    expect(useWindowsStore.getState().focusedWindowID).toBe("3");
  });

  it("clears focus when every window is minimized", () => {
    minimize("1");
    minimize("2");
    minimize("3");
    expect(useWindowsStore.getState().focusedWindowID).toBeNull();
  });

  it("restores a window to the front and focuses it", () => {
    minimize("1");
    useWindowsStore.getState().actions.restoreMinimizedWindow("1");
    const state = useWindowsStore.getState();
    expect(state.minimizedWindows).toEqual([]);
    expect(state.focusedWindowID).toBe("1");
    expect(state.windows.map((window) => window.id)).toEqual(["2", "3", "1"]);
  });

  it("does not move or focus a window that is already restored", () => {
    const state = useWindowsStore.getState();
    state.actions.restoreMinimizedWindow("1");
    expect(useWindowsStore.getState()).toBe(state);
  });

  it("focuses the next visible window when closing the active window", () => {
    minimize("2");
    useWindowsStore.getState().actions.deleteWindow("3");
    expect(useWindowsStore.getState().focusedWindowID).toBe("1");
  });

  it("clears focus when the last visible window closes", () => {
    minimize("1");
    minimize("2");
    useWindowsStore.getState().actions.deleteWindow("3");
    expect(useWindowsStore.getState().focusedWindowID).toBeNull();
  });
});

describe("window maximize lifecycle", () => {
  const workArea = { x: 0, y: 24, width: 1280, height: 539 };

  beforeEach(() => {
    useWindowsStore.setState(initialState, true);
    useWindowsStore.getState().actions.setWindowWorkArea(workArea);
  });

  it("maximizes a window within the desktop work area and focuses it", () => {
    const original = getWindow("1").style;
    useWindowsStore.getState().actions.toggleMaximizeWindow("1");
    const state = useWindowsStore.getState();
    const maximized = state.windows[state.windows.length - 1];
    expect(maximized.id).toBe("1");
    expect(maximized.style).toEqual(workArea);
    expect(maximized.restoreStyle).toEqual(original);
    expect(state.focusedWindowID).toBe("1");
  });

  it("returns to the bounds immediately before maximizing after repeated toggles", () => {
    const original = { x: 320, y: 180, width: 400, height: 240 };
    const { actions } = useWindowsStore.getState();
    actions.updateWindow("1", { style: original });
    for (let cycle = 0; cycle < 3; cycle++) {
      actions.toggleMaximizeWindow("1");
      actions.toggleMaximizeWindow("1");
      const restored = getWindow("1");
      expect(restored.style).toEqual(original);
      expect(restored.restoreStyle).toBeUndefined();
    }
  });

  it("fits maximized windows to a changed work area without losing their original bounds", () => {
    const { actions } = useWindowsStore.getState();
    const original = getWindow("1").style;
    const nextArea = { x: 0, y: 24, width: 800, height: 400 };
    actions.toggleMaximizeWindow("1");
    actions.setWindowWorkArea(nextArea);
    const maximized = getWindow("1");
    expect(maximized.style).toEqual(nextArea);
    expect(maximized.restoreStyle).toEqual(original);
    actions.toggleMaximizeWindow("1");
    expect(getWindow("1").style).toEqual(original);
  });

  it("does not move or resize ordinary windows when the work area changes", () => {
    const windows = useWindowsStore.getState().windows;
    useWindowsStore
      .getState()
      .actions.setWindowWorkArea({ x: 0, y: 24, width: 800, height: 400 });
    expect(useWindowsStore.getState().windows).toEqual(windows);
    expect(useWindowsStore.getState().windows[0]).toBe(windows[0]);
  });

  it("keeps a fixed-size app unchanged", () => {
    const state = useWindowsStore.getState();
    state.actions.toggleMaximizeWindow("3");
    expect(useWindowsStore.getState()).toBe(state);
  });

  it("does not maximize minimized or missing windows", () => {
    minimize("1");
    const state = useWindowsStore.getState();
    state.actions.toggleMaximizeWindow("1");
    state.actions.toggleMaximizeWindow("missing");
    expect(useWindowsStore.getState()).toBe(state);
  });

  it("keeps maximize state through minimization and Dock restoration", () => {
    const { actions } = useWindowsStore.getState();
    const original = getWindow("1").style;
    actions.toggleMaximizeWindow("1");
    minimize("1");
    actions.restoreMinimizedWindow("1");
    const restored = getWindow("1");
    expect(restored.style).toEqual(workArea);
    expect(restored.restoreStyle).toEqual(original);
    actions.toggleMaximizeWindow("1");
    expect(getWindow("1").style).toEqual(original);
  });

  it("does not maximize before a usable work area is measured", () => {
    useWindowsStore.setState({ windowWorkArea: null });
    const state = useWindowsStore.getState();
    state.actions.toggleMaximizeWindow("1");
    expect(useWindowsStore.getState()).toBe(state);
    state.actions.setWindowWorkArea({ x: 0, y: 24, width: 800, height: 0 });
    const noSpace = useWindowsStore.getState();
    noSpace.actions.toggleMaximizeWindow("1");
    expect(useWindowsStore.getState()).toBe(noSpace);
  });

  it("does not update the store when the work area has not changed", () => {
    const state = useWindowsStore.getState();
    state.actions.setWindowWorkArea({ ...workArea });
    expect(useWindowsStore.getState()).toBe(state);
  });
});

describe("full screen and title-bar zoom", () => {
  const workArea = { x: 0, y: 24, width: 1280, height: 539 };
  const fullscreenArea = { x: 0, y: 0, width: 1280, height: 633 };

  beforeEach(() => {
    useWindowsStore.setState(initialState, true);
    const { actions } = useWindowsStore.getState();
    actions.setWindowWorkArea(workArea);
    actions.setWindowFullscreenArea(fullscreenArea);
  });

  it("enters full screen without title-bar zoom and restores the original bounds", () => {
    const original = getWindow("1").style;
    const { actions } = useWindowsStore.getState();
    actions.toggleFullscreenWindow("1");
    expect(getWindow("1").style).toEqual(fullscreenArea);
    expect(getWindow("1").restoreStyle).toBeUndefined();
    expect(useWindowsStore.getState().focusedWindowID).toBe("1");
    actions.toggleFullscreenWindow("1");
    expect(getWindow("1").style).toEqual(original);
    expect(getWindow("1").fullscreenRestoreStyle).toBeUndefined();
  });

  it("preserves both restore bounds across zoom, full screen, viewport resize, and exit", () => {
    const original = getWindow("1").style;
    const { actions } = useWindowsStore.getState();
    actions.toggleMaximizeWindow("1");
    actions.toggleFullscreenWindow("1");
    const nextWorkArea = { x: 0, y: 24, width: 900, height: 506 };
    const nextFullscreenArea = { x: 0, y: 0, width: 900, height: 600 };
    actions.setWindowWorkArea(nextWorkArea);
    actions.setWindowFullscreenArea(nextFullscreenArea);
    expect(getWindow("1").style).toEqual(nextFullscreenArea);
    expect(getWindow("1").restoreStyle).toEqual(original);
    actions.toggleFullscreenWindow("1");
    expect(getWindow("1").style).toEqual(nextWorkArea);
    actions.toggleMaximizeWindow("1");
    expect(getWindow("1").style).toEqual(original);
  });

  it("ignores zoom, minimize, and a second full-screen window while full screen is active", () => {
    const { actions } = useWindowsStore.getState();
    actions.toggleFullscreenWindow("1");
    const state = useWindowsStore.getState();
    actions.toggleMaximizeWindow("1");
    minimize("1");
    actions.toggleFullscreenWindow("2");
    expect(useWindowsStore.getState()).toBe(state);
  });

  it("does not enter full screen for fixed-size, minimized, or missing windows", () => {
    minimize("1");
    const state = useWindowsStore.getState();
    for (const id of ["1", "3", "missing"])
      state.actions.toggleFullscreenWindow(id);
    expect(useWindowsStore.getState()).toBe(state);
  });

  it("allows repeated reversals without overwriting the original bounds", () => {
    const original = getWindow("1").style;
    const { actions } = useWindowsStore.getState();
    for (let i = 0; i < 6; i++) actions.toggleFullscreenWindow("1");
    expect(getWindow("1").style).toEqual(original);
    expect(getWindow("1").fullscreenRestoreStyle).toBeUndefined();
  });

  it("clears the full-screen desktop when its window closes", () => {
    const { actions } = useWindowsStore.getState();
    actions.toggleFullscreenWindow("1");
    actions.deleteWindow("1");
    expect(
      useWindowsStore
        .getState()
        .windows.some((window) => window.fullscreenRestoreStyle)
    ).toBe(false);
    expect(useWindowsStore.getState().focusedWindowID).toBe("3");
  });

  it("waits for a usable desktop size before entering full screen", () => {
    useWindowsStore.setState({ windowFullscreenArea: null });
    const state = useWindowsStore.getState();
    state.actions.toggleFullscreenWindow("1");
    expect(useWindowsStore.getState()).toBe(state);
  });
});
