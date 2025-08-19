import { FloatingMenu } from "domains/menu/views/floating-menu";
import { useState } from "react";
import { WifiSettingPanel } from "./components/WifiSettingPanel";

interface WifiSettingProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function WifiSetting({ selected, onSelectedChange }: WifiSettingProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true);

  const handleClick = () => {
    onSelectedChange(!selected);
  };

  return (
    <FloatingMenu
      focused={false}
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger type="icon" onClick={handleClick}>
        📶
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <WifiSettingPanel enabled={wifiEnabled} onToggle={setWifiEnabled} />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
