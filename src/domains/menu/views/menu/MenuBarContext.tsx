import { createContext, type ReactNode, useContext, useState } from "react";

export type SettingsPanelName =
  | "Wi-Fi"
  | "Bluetooth"
  | "AirDrop"
  | "Focus"
  | "Display"
  | "Sound"
  | "Battery";

interface MenuBarState {
  menuChoices: Record<string, string>;
  setMenuChoice: (group: string, value: string) => void;
  activeMenu: string | null;
  selectMenu: (name: string, open: boolean) => void;
  closeMenus: () => void;
  settingsPanel: SettingsPanelName | null;
  openSettings: (panel: SettingsPanelName) => void;
  closeSettings: () => void;
}

const MenuBarContext = createContext<MenuBarState | null>(null);

export function MenuBarProvider({ children }: { children: ReactNode }) {
  const [menuChoices, setMenuChoices] = useState<Record<string, string>>({});
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [settingsPanel, setSettingsPanel] = useState<SettingsPanelName | null>(
    null
  );
  return (
    <MenuBarContext.Provider
      value={{
        menuChoices,
        setMenuChoice: (group, value) =>
          setMenuChoices((current) => ({ ...current, [group]: value })),
        activeMenu,
        selectMenu: (name, open) =>
          setActiveMenu((current) =>
            open ? name : current === name ? null : current
          ),
        closeMenus: () => setActiveMenu(null),
        settingsPanel,
        openSettings: (panel) => {
          setActiveMenu(null);
          setSettingsPanel(panel);
        },
        closeSettings: () => setSettingsPanel(null)
      }}
    >
      {children}
    </MenuBarContext.Provider>
  );
}

export function useMenuBar() {
  const value = useContext(MenuBarContext);
  if (!value) throw new Error("Menu components need a MenuBarProvider");
  return value;
}
