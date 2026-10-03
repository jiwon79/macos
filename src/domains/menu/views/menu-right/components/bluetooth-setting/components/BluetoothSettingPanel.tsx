import {
  IconDeviceAirPods,
  IconDeviceKeyboard,
  IconDeviceSpeaker,
  IconDeviceTrackpad,
  IconDeviceTv
} from "assets/icons";
import { useMenuRightActions, useMenuRightStore } from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingSwitch } from "../../setting/SettingSwitch";
import { SettingsLink } from "../../setting/SettingsLink";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./BluetoothSettingPanel.css";

const DEVICES = [
  { name: "[Signage] Samsung QMR Series", icon: <IconDeviceTv /> },
  { name: "Speaker", icon: <IconDeviceSpeaker /> },
  { name: "Jiwon's Magic Keyboard", icon: <IconDeviceKeyboard /> },
  { name: "Jiwon's Magic Trackpad", icon: <IconDeviceTrackpad /> },
  { name: "Jiwon's AirPods Pro", icon: <IconDeviceAirPods /> }
];
export function BluetoothDevices() {
  const { enabled, connectedDevices } = useMenuRightStore(
    (state) => state.bluetooth
  );
  const { toggleBluetoothDevice } = useMenuRightActions();
  if (!enabled)
    return <SettingTextItem size="small">Bluetooth is off</SettingTextItem>;
  return (
    <>
      <SettingSubTitle>Devices</SettingSubTitle>
      {DEVICES.map((device) => (
        <SettingItem
          key={device.name}
          icon={device.icon}
          selected={connectedDevices.includes(device.name)}
          onClick={() => toggleBluetoothDevice(device.name)}
        >
          {device.name}
        </SettingItem>
      ))}
    </>
  );
}
export function BluetoothSettingPanel() {
  const enabled = useMenuRightStore((state) => state.bluetooth.enabled);
  const { setBluetoothEnabled } = useMenuRightActions();
  return (
    <div className={styles.container} data-setting-panel="Bluetooth">
      <SettingTitle
        rightAccessory={
          <SettingSwitch
            label="Bluetooth"
            checked={enabled}
            onChange={setBluetoothEnabled}
          />
        }
      >
        Bluetooth
      </SettingTitle>
      <SettingDivider />
      <BluetoothDevices />
      <SettingDivider />
      <SettingsLink panel="Bluetooth" />
    </div>
  );
}
