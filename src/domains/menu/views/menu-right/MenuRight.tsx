import { useMenuBar } from "../menu/MenuBarContext";
import { AirDropSetting } from "./components/airdrop-setting/AirDropSetting";
import { BatterySetting } from "./components/battery-setting/BatterySetting";
import { BluetoothSetting } from "./components/bluetooth-setting/BluetoothSetting";
import { Control } from "./components/control/Control";
import { DisplaySetting } from "./components/display-setting/DisplaySetting";
import { FocusSetting } from "./components/focus-setting/FocusSetting";
import { MenuClock } from "./components/MenuClock";
import { SoundSetting } from "./components/sound-setting/SoundSetting";
import { WifiSetting } from "./components/wifi-setting/WifiSetting";
import * as styles from "./MenuRight.css";

export function MenuRight() {
  const { activeMenu, selectMenu } = useMenuBar();
  const props = (name: string) => ({
    selected: activeMenu === `status:${name}`,
    onSelectedChange: (open: boolean) => selectMenu(`status:${name}`, open)
  });
  return (
    <div className={styles.container} data-menu-trailing>
      <AirDropSetting {...props("AirDrop")} />
      <BluetoothSetting {...props("Bluetooth")} />
      <FocusSetting {...props("Focus")} />
      <DisplaySetting {...props("Display")} />
      <SoundSetting {...props("Sound")} />
      <BatterySetting {...props("Battery")} />
      <WifiSetting {...props("Wi-Fi")} />
      <Control {...props("Control Center")} />
      <MenuClock />
    </div>
  );
}
