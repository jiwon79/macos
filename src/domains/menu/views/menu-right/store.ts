import { create } from "third-parties/zustand";

export type FocusMode = "do_not_disturb" | "work" | "sleep" | null;
export type FocusDuration = "1_hour" | "until_morning" | null;
export type AirDropMode = "off" | "contacts_only" | "everyone";

export interface MenuRightState {
  wifi: {
    enabled: boolean;
    selectedSSID: string | null;
  };
  focus: {
    mode: FocusMode;
    duration: FocusDuration;
  };
  airdrop: {
    mode: AirDropMode;
  };
  bluetooth: {
    enabled: boolean;
    connectedDevices: string[];
  };
  sound: {
    volume: number;
    muted: boolean;
    output: string;
  };
  display: {
    brightness: number;
    darkMode: boolean;
    nightShift: boolean;
    trueTone: boolean;
    colorProfile: string;
  };
  battery: {
    level: number;
  };
}

export interface MenuRightAction {
  setWifiEnabled: (enabled: boolean) => void;
  setWifiSSID: (ssid: string | null) => void;
  setFocusMode: (mode: FocusMode) => void;
  setFocusDuration: (duration: FocusDuration) => void;
  setAirDropMode: (mode: AirDropMode) => void;
  setBluetoothEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setSoundMuted: (muted: boolean) => void;
  setSoundOutput: (output: string) => void;
  setDisplayBrightness: (brightness: number) => void;
  toggleDarkMode: () => void;
  toggleNightShift: () => void;
  toggleTrueTone: () => void;
  setDisplayColorProfile: (profile: string) => void;
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
    airdrop: {
      mode: "everyone"
    },
    bluetooth: {
      enabled: true,
      connectedDevices: ["Speaker", "Jiwon's Magic Keyboard"]
    },
    sound: {
      volume: 50,
      muted: false,
      output: "MacBook Pro Speakers"
    },
    display: {
      brightness: 75,
      darkMode: false,
      nightShift: false,
      trueTone: true,
      colorProfile: "Apple XDR Display (P3-1600 nits)"
    },
    battery: {
      level: 71
    },
    actions: {
      setWifiEnabled: (enabled) =>
        set((state) => ({ wifi: { ...state.wifi, enabled } })),
      setWifiSSID: (ssid) =>
        set((state) => ({ wifi: { ...state.wifi, selectedSSID: ssid } })),
      setFocusMode: (mode) =>
        set((state) => ({ focus: { ...state.focus, mode } })),
      setFocusDuration: (duration) =>
        set((state) => ({ focus: { ...state.focus, duration } })),
      setAirDropMode: (mode) =>
        set((state) => ({ airdrop: { ...state.airdrop, mode } })),
      setBluetoothEnabled: (enabled) =>
        set((state) => ({ bluetooth: { ...state.bluetooth, enabled } })),
      setSoundVolume: (volume) =>
        set((state) => ({ sound: { ...state.sound, volume } })),
      setSoundMuted: (muted) =>
        set((state) => ({ sound: { ...state.sound, muted } })),
      setSoundOutput: (output) =>
        set((state) => ({ sound: { ...state.sound, output } })),
      setDisplayBrightness: (brightness) =>
        set((state) => ({ display: { ...state.display, brightness } })),
      toggleDarkMode: () =>
        set((state) => ({
          display: { ...state.display, darkMode: !state.display.darkMode }
        })),
      toggleNightShift: () =>
        set((state) => ({
          display: {
            ...state.display,
            nightShift: !state.display.nightShift
          }
        })),
      toggleTrueTone: () =>
        set((state) => ({
          display: { ...state.display, trueTone: !state.display.trueTone }
        })),
      setDisplayColorProfile: (profile) =>
        set((state) => ({
          display: { ...state.display, colorProfile: profile }
        }))
    }
  })
);

export function useMenuRightActions() {
  return useMenuRightStore((state) => state.actions);
}
