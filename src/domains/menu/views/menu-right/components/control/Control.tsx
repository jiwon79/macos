import { FloatingMenu } from "domains/menu/views/floating-menu";
import { ControlPanel } from "./components/ControlPanel";

interface ControlProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function Control({ selected, onSelectedChange }: ControlProps) {
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
        <ControlPanel />
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
