import { type ApplicationID, applications } from "domains/app/applications";
import { create } from "third-parties/zustand";
import { uniqBy } from "utils/array/uniqBy";
import { deepMergeObject } from "utils/object";
import type { DeepPartial } from "utils/type";
import type { MinimizedWindow, Window } from "../interface";
import { initialWindowStates } from "./initialWindowStatesXX";

export interface WindowsState {
  windows: Window[];
  windowElements: Record<string, HTMLDivElement>;
  minimizedWindows: MinimizedWindow[];
  focusedWindowID: string | null;
  isDraggingWindow: boolean;
  isResizingWindow: boolean;
}

export interface WindowsAction {
  setFocusedWindowID: (id: string | null) => void;
  createAppWindow: (appID: ApplicationID) => void;
  updateWindow: (id: string, data: DeepPartial<Window>) => void;
  deleteWindow: (id: string) => void;
  setWindowRef: (id: string, element: HTMLDivElement) => void;

  minimizeWindow: (window: MinimizedWindow) => void;
  restoreMinimizedWindow: (id: string) => void;
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
