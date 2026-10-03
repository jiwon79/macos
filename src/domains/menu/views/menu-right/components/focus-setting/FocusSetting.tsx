import { IconFocus } from "assets/icons";
import { useMenuRightStore } from "../../store";
import { StatusMenu, type StatusMenuProps } from "../StatusMenu";
import { FocusSettingPanel } from "./components/FocusSettingPanel";

export function FocusSetting(props: StatusMenuProps) {
  const inactive = useMenuRightStore((state) => state.focus.mode === null);
  return (
    <StatusMenu
      {...props}
      label="Focus"
      icon={<IconFocus />}
      inactive={inactive}
    >
      <FocusSettingPanel />
    </StatusMenu>
  );
}
