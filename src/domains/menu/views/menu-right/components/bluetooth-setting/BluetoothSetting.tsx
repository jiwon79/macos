import { IconBluetooth } from "assets/icons";
import { useMenuRightStore } from "../../store";
import { StatusMenu, type StatusMenuProps } from "../StatusMenu";
import { BluetoothSettingPanel } from "./components/BluetoothSettingPanel";

export function BluetoothSetting(props: StatusMenuProps) {
  const inactive = useMenuRightStore((state) => !state.bluetooth.enabled);
  return (
    <StatusMenu
      {...props}
      label="Bluetooth"
      icon={<IconBluetooth />}
      inactive={inactive}
    >
      <BluetoothSettingPanel />
    </StatusMenu>
  );
}
