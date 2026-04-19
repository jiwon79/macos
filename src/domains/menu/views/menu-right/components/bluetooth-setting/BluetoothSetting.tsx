import { IconBluetooth } from "assets/icons";
import { FloatingMenu } from "domains/menu/views/floating-menu";
import { BluetoothSettingPanel } from "./components/BluetoothSettingPanel";

interface BluetoothSettingProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function BluetoothSetting({
  selected,
  onSelectedChange
}: BluetoothSettingProps) {
  return (
    <FloatingMenu
      focused={false}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon">
        <IconBluetooth />
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <BluetoothSettingPanel />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
