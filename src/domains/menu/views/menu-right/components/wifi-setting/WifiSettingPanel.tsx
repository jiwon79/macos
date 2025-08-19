import { FloatingMenu } from "domains/menu/views/floating-menu";
import { WifiSettingPanel } from "./components/WifiSettingPanel";

interface WifiSettingProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function WifiSetting({ selected, onSelectedChange }: WifiSettingProps) {
  return (
    <FloatingMenu
      focused={false}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon">📶</FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <WifiSettingPanel />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
