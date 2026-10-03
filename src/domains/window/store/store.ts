import { type ApplicationID, applications } from "domains/app/applications";
import { create } from "third-parties/zustand";
import { uniqBy } from "utils/array/uniqBy";
import { deepMergeObject } from "utils/object";
import type { DeepPartial } from "utils/type";
import type { MinimizedWindow, Window, WindowStyle } from "../interface";
import { initialWindowStates } from "./initialWindowStatesXX";

export interface WindowsState {
  windows: Window[];
  windowElements: Record<string, HTMLDivElement>;
  minimizedWindows: MinimizedWindow[];
  focusedWindowID: string | null;
  isDraggingWindow: boolean;
  isResizingWindow: boolean;
  windowWorkArea: WindowStyle | null;
  windowFullscreenArea: WindowStyle | null;
}

export interface WindowsAction {
  setFocusedWindowID: (id: string | null) => void;
  createAppWindow: (appID: ApplicationID) => void;
  updateWindow: (id: string, data: DeepPartial<Window>) => void;
  deleteWindow: (id: string) => void;
  setWindowRef: (id: string, element: HTMLDivElement) => void;

  minimizeWindow: (window: MinimizedWindow) => void;
  restoreMinimizedWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  toggleFullscreenWindow: (id: string) => void;
  setWindowWorkArea: (style: WindowStyle) => void;
  setWindowFullscreenArea: (style: WindowStyle) => void;
  setIsDraggingWindow: (isDragging: boolean) => void;
  setIsResizingWindow: (isResizing: boolean) => void;
}

export const useWindowsStore = create<WindowsState, WindowsAction>((set) => ({
  windows: initialWindowStates,
  windowElements: {},
  minimizedWindows: [],
  focusedWindowID:
    initialWindowStates[initialWindowStates.length - 1]?.id ?? null,
  isDraggingWindow: false,
  isResizingWindow: false,
  windowWorkArea: null,
  windowFullscreenArea: null,
  actions: {
    setFocusedWindowID: (id: string | null) =>
      set((state) => {
        if (id === null) {
          return { focusedWindowID: id, windows: state.windows };
        }

        const index = state.windows.findIndex((window) => window.id === id);
        if (index === -1) {
          return state;
        }

        const focusedWindow = state.windows[index];

        return {
          focusedWindowID: id,
          windows: [
            ...state.windows.slice(0, index),
            ...state.windows.slice(index + 1),
            focusedWindow
          ]
        };
      }),
    createAppWindow: (appID) => {
      const app = applications[appID];
      if (app == null) {
        return;
      }

      const window: Window = {
        appID,
        id: self.crypto.randomUUID(),
        content: app.app(),
        style: {
          x: app.initialStyle.x ?? 100,
          y: app.initialStyle.y ?? 100,
          width: app.initialStyle.width,
          height: app.initialStyle.height
        }
      };

      set((state) => ({
        windows: [...state.windows, window],
        focusedWindowID: window.id
      }));
    },
    updateWindow: (id, data) => {
      set((state) => ({
        windows: state.windows.map((window) =>
          window.id === id ? deepMergeObject(window, data) : window
        )
      }));
    },
    deleteWindow: (id) =>
      set((state) => {
        const windows = state.windows.filter((window) => window.id !== id);
        return {
          windows,
          focusedWindowID:
            state.focusedWindowID === id
              ? getTopVisibleWindowID(windows, state.minimizedWindows)
              : state.focusedWindowID
        };
      }),
    setWindowRef: (id, element) =>
      set((state) => ({
        windowElements: { ...state.windowElements, [id]: element }
      })),
    minimizeWindow: (window) =>
      set((state) => {
        if (
          state.windows.find((item) => item.id === window.id)
            ?.fullscreenRestoreStyle
        ) {
          return state;
        }
        const minimizedWindows = uniqBy(
          [...state.minimizedWindows, window],
          (window) => window.id
        );
        return {
          minimizedWindows,
          focusedWindowID:
            state.focusedWindowID === window.id
              ? getTopVisibleWindowID(state.windows, minimizedWindows)
              : state.focusedWindowID
        };
      }),
    restoreMinimizedWindow: (id) =>
      set((state) => {
        const window = state.windows.find((window) => window.id === id);
        if (
          window == null ||
          !state.minimizedWindows.some((window) => window.id === id)
        ) {
          return state;
        }

        return {
          minimizedWindows: state.minimizedWindows.filter(
            (minimizedWindow) => minimizedWindow.id !== id
          ),
          windows: [
            ...state.windows.filter((window) => window.id !== id),
            window
          ],
          focusedWindowID: id
        };
      }),
    toggleMaximizeWindow: (id) =>
      set((state) => {
        const window = state.windows.find((window) => window.id === id);
        if (
          window == null ||
          window.fullscreenRestoreStyle != null ||
          applications[window.appID]?.resizable === false ||
          state.minimizedWindows.some((window) => window.id === id)
        ) {
          return state;
        }

        let nextWindow: Window;
        if (window.restoreStyle) {
          nextWindow = {
            ...window,
            style: window.restoreStyle,
            restoreStyle: undefined
          };
        } else {
          const workArea = state.windowWorkArea;
          if (workArea == null || workArea.width <= 0 || workArea.height <= 0) {
            return state;
          }
          nextWindow = {
            ...window,
            style: { ...workArea },
            restoreStyle: { ...window.style }
          };
        }

        return {
          windows: [
            ...state.windows.filter((window) => window.id !== id),
            nextWindow
          ],
          focusedWindowID: id
        };
      }),
    toggleFullscreenWindow: (id) =>
      set((state) => {
        const window = state.windows.find((window) => window.id === id);
        if (
          window == null ||
          applications[window.appID]?.resizable === false ||
          state.minimizedWindows.some((window) => window.id === id) ||
          state.windows.some(
            (window) => window.id !== id && window.fullscreenRestoreStyle
          )
        ) {
          return state;
        }

        const area =
          window.fullscreenRestoreStyle ?? state.windowFullscreenArea;
        if (!area || area.width <= 0 || area.height <= 0) {
          return state;
        }
        const nextWindow = window.fullscreenRestoreStyle
          ? {
              ...window,
              style: window.fullscreenRestoreStyle,
              fullscreenRestoreStyle: undefined
            }
          : {
              ...window,
              style: { ...area },
              fullscreenRestoreStyle: { ...window.style }
            };

        return {
          windows: [
            ...state.windows.filter((window) => window.id !== id),
            nextWindow
          ],
          focusedWindowID: id
        };
      }),
    setWindowWorkArea: (workArea) =>
      set((state) => {
        const previous = state.windowWorkArea;
        if (
          previous?.x === workArea.x &&
          previous.y === workArea.y &&
          previous.width === workArea.width &&
          previous.height === workArea.height
        ) {
          return state;
        }

        return {
          windowWorkArea: workArea,
          windows: state.windows.map((window) => {
            if (!window.restoreStyle) return window;
            return window.fullscreenRestoreStyle
              ? { ...window, fullscreenRestoreStyle: { ...workArea } }
              : { ...window, style: { ...workArea } };
          })
        };
      }),
    setWindowFullscreenArea: (area) =>
      set((state) => {
        const previous = state.windowFullscreenArea;
        if (
          previous?.x === area.x &&
          previous.y === area.y &&
          previous.width === area.width &&
          previous.height === area.height
        ) {
          return state;
        }
        return {
          windowFullscreenArea: area,
          windows: state.windows.map((window) =>
            window.fullscreenRestoreStyle
              ? { ...window, style: { ...area } }
              : window
          )
        };
      }),
    setIsDraggingWindow: (isDragging) => set({ isDraggingWindow: isDragging }),
    setIsResizingWindow: (isResizing) => set({ isResizingWindow: isResizing })
  }
}));

function getTopVisibleWindowID(
  windows: Window[],
  minimizedWindows: MinimizedWindow[]
): string | null {
  for (let index = windows.length - 1; index >= 0; index--) {
    const window = windows[index];
    if (!minimizedWindows.some((minimized) => minimized.id === window.id)) {
      return window.id;
    }
  }
  return null;
}

export function useWindowsAction() {
  return useWindowsStore((state) => state.actions);
}
