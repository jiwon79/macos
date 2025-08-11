import { FloatingMenu } from "domains/menu/views/floating-menu";
import { ControlCenterPanel } from "./components";

interface ControlCenterProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function ControlCenter({
  selected,
  onSelectedChange
}: ControlCenterProps) {
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
        ⚙️
      </FloatingMenu.Trigger>
      <FloatingMenu.Content>
        <ControlCenterPanel />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
