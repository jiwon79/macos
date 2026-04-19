import { IconSound } from "assets/icons";
import { FloatingMenu } from "domains/menu/views/floating-menu";
import { SoundSettingPanel } from "./components/SoundSettingPanel";

interface SoundSettingProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function SoundSetting({
  selected,
  onSelectedChange
}: SoundSettingProps) {
  return (
    <FloatingMenu
      focused={false}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon">
        <IconSound />
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <SoundSettingPanel />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
