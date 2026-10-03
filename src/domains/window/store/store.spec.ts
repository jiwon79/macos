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

function minimize(id: string) {
  const { windows, actions } = useWindowsStore.getState();
  const window = windows.find((window) => window.id === id);
  if (window == null) {
    throw new Error(`Window ${id} not found`);
  }

  actions.minimizeWindow({
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
