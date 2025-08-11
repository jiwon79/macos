import { FloatingMenu } from "domains/menu/views/floating-menu";
import { useState } from "react";
import { WifiPanel } from "./components";

interface WifiMenuProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function WifiMenu({ selected, onSelectedChange }: WifiMenuProps) {
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
        <WifiPanel enabled={wifiEnabled} onToggle={setWifiEnabled} />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
