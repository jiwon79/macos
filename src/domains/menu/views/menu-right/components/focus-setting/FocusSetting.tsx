import { IconFocus } from "assets/icons";
import { FloatingMenu } from "domains/menu/views/floating-menu";
import { FocusSettingPanel } from "./components/FocusSettingPanel";

interface FocusSettingProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function FocusSetting({
  selected,
  onSelectedChange
}: FocusSettingProps) {
  return (
    <FloatingMenu
      focused={false}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon">
        <IconFocus />
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <FocusSettingPanel />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
