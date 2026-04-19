import {
  IconDeviceAirPods,
  IconDeviceKeyboard,
  IconDeviceSpeaker,
  IconDeviceTrackpad,
  IconHotspot,
  IconLock,
  IconLte,
  IconNetwork
} from "assets/icons";
import { useMenuRightStore } from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./BluetoothSettingPanel.css";

const KNOWN_DEVICES = [
  { name: "Speaker", icon: <IconDeviceSpeaker /> },
  { name: "Jiwon's Magic Keyboard", icon: <IconDeviceKeyboard /> },
  { name: "Jiwon's Magic Trackpad", icon: <IconDeviceTrackpad /> },
  { name: "Jiwon's AirPods Pro", icon: <IconDeviceAirPods /> }
];

export function BluetoothSettingPanel() {
  const connectedDevices = useMenuRightStore(
    (state) => state.bluetooth.connectedDevices
  );

  return (
    <div className={styles.container}>
      <SettingTitle>Bluetooth</SettingTitle>
      <SettingDivider />
      <SettingSubTitle>Personal Hotspot</SettingSubTitle>
      <SettingItem
        icon={<IconHotspot />}
        rightAccessory={
          <div className={styles.hotspotIcons}>
            <span className={styles.hotspotIcon}>
              <IconLte />
            </span>
            <span className={styles.hotspotIcon}>
              <IconNetwork />
            </span>
            <span className={styles.hotspotIcon}>
              <IconLock />
            </span>
          </div>
        }
      >
        Jiwon's iPhone
      </SettingItem>
      <SettingDivider />
      <SettingSubTitle>Devices</SettingSubTitle>
      {KNOWN_DEVICES.map((device) => (
        <SettingItem
          key={device.name}
          icon={device.icon}
          selected={connectedDevices.includes(device.name)}
        >
          {device.name}
        </SettingItem>
      ))}
      <SettingDivider />
      <SettingTextItem>Bluetooth Settings...</SettingTextItem>
    </div>
  );
}
