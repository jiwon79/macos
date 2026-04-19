import { create } from "third-parties/zustand";

export type FocusMode = "do_not_disturb" | "work" | "sleep" | null;
export type FocusDuration = "1_hour" | "until_morning" | null;

export interface MenuRightState {
  wifi: {
    enabled: boolean;
    selectedSSID: string | null;
  };
  focus: {
    mode: FocusMode;
    duration: FocusDuration;
  };
}

export interface MenuRightAction {
  setWifiEnabled: (enabled: boolean) => void;
  setWifiSSID: (ssid: string | null) => void;
  setFocusMode: (mode: FocusMode) => void;
  setFocusDuration: (duration: FocusDuration) => void;
}

export const useMenuRightStore = create<MenuRightState, MenuRightAction>(
  (set) => ({
    wifi: {
      enabled: true,
      selectedSSID: "Starbucks"
    },
    focus: {
      mode: null,
      duration: null
    },
    actions: {
      setWifiEnabled: (enabled) =>
        set((state) => ({ wifi: { ...state.wifi, enabled } })),
      setWifiSSID: (ssid) =>
        set((state) => ({ wifi: { ...state.wifi, selectedSSID: ssid } })),
      setFocusMode: (mode) =>
        set((state) => ({ focus: { ...state.focus, mode } })),
      setFocusDuration: (duration) =>
        set((state) => ({ focus: { ...state.focus, duration } }))
    }
  })
);

export function useMenuRightActions() {
  return useMenuRightStore((state) => state.actions);
}
