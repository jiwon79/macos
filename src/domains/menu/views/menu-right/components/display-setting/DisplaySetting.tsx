import { IconBrightness } from "assets/icons";
import { FloatingMenu } from "domains/menu/views/floating-menu";
import { DisplaySettingPanel } from "./components/DisplaySettingPanel";

interface DisplaySettingProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function DisplaySetting({
  selected,
  onSelectedChange
}: DisplaySettingProps) {
  return (
    <FloatingMenu
      focused={false}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon">
        <IconBrightness />
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <DisplaySettingPanel />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
