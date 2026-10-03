import {
  IconAirDrop,
  IconBatteryLow,
  IconBluetooth,
  IconBrightness,
  IconFocus,
  IconSound,
  IconWifi
} from "assets/icons";
import { useEffect, useRef } from "react";
import { type SettingsPanelName, useMenuBar } from "../../menu/MenuBarContext";
import { AirDropSettingPanel } from "./airdrop-setting/components/AirDropSettingPanel";
import { BatterySettingPanel } from "./battery-setting/components/BatterySettingPanel";
import { BluetoothSettingPanel } from "./bluetooth-setting/components/BluetoothSettingPanel";
import { DisplaySettingPanel } from "./display-setting/components/DisplaySettingPanel";
import { FocusSettingPanel } from "./focus-setting/components/FocusSettingPanel";
import * as styles from "./SettingsWindow.css";
import { SoundSettingPanel } from "./sound-setting/components/SoundSettingPanel";
import { WifiSettingPanel } from "./wifi-setting/components/WifiSettingPanel";

const PANELS = {
  "Wi-Fi": { icon: IconWifi, panel: WifiSettingPanel },
  Bluetooth: { icon: IconBluetooth, panel: BluetoothSettingPanel },
  AirDrop: { icon: IconAirDrop, panel: AirDropSettingPanel },
  Focus: { icon: IconFocus, panel: FocusSettingPanel },
  Display: { icon: IconBrightness, panel: DisplaySettingPanel },
  Sound: { icon: IconSound, panel: SoundSettingPanel },
  Battery: { icon: IconBatteryLow, panel: BatterySettingPanel }
};
export function SettingsWindow() {
  const { settingsPanel, openSettings, closeSettings } = useMenuBar();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (settingsPanel) dialog.current?.showModal();
    else dialog.current?.close();
  }, [settingsPanel]);
  const Panel = settingsPanel ? PANELS[settingsPanel].panel : null;
  return (
    <dialog
      ref={dialog}
      aria-label="System Settings"
      className={styles.dialog}
      onCancel={closeSettings}
    >
      <header className={styles.titlebar}>
        <button
          type="button"
          className={styles.close}
          aria-label="Close System Settings"
          onClick={closeSettings}
        >
          ×
        </button>
        <strong>System Settings</strong>
      </header>
      <div className={styles.body}>
        <nav className={styles.sidebar} aria-label="Settings categories">
          {(Object.keys(PANELS) as SettingsPanelName[]).map((name) => {
            const Icon = PANELS[name].icon;
            return (
              <button
                type="button"
                key={name}
                aria-current={settingsPanel === name ? "page" : undefined}
                onClick={() => openSettings(name)}
              >
                <Icon />
                {name}
              </button>
            );
          })}
        </nav>
        <section className={styles.content}>{Panel && <Panel />}</section>
      </div>
    </dialog>
  );
}
