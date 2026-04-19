import { IconBatteryLow } from "assets/icons";
import { FloatingMenu } from "domains/menu/views/floating-menu";
import { BatterySettingPanel } from "./components/BatterySettingPanel";

interface BatterySettingProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function BatterySetting({
  selected,
  onSelectedChange
}: BatterySettingProps) {
  return (
    <FloatingMenu
      focused={false}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon">
        <IconBatteryLow />
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <BatterySettingPanel />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
