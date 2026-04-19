import { IconAirDrop } from "assets/icons";
import { FloatingMenu } from "domains/menu/views/floating-menu";
import { AirDropSettingPanel } from "./components/AirDropSettingPanel";

interface AirDropSettingProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function AirDropSetting({
  selected,
  onSelectedChange
}: AirDropSettingProps) {
  return (
    <FloatingMenu
      focused={false}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon">
        <IconAirDrop />
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <AirDropSettingPanel />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
