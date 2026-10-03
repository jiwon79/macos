import { IconBrightness } from "assets/icons";
import { StatusMenu, type StatusMenuProps } from "../StatusMenu";
import { DisplaySettingPanel } from "./components/DisplaySettingPanel";

export function DisplaySetting(props: StatusMenuProps) {
  return (
    <StatusMenu {...props} label="Display" icon={<IconBrightness />}>
      <DisplaySettingPanel />
    </StatusMenu>
  );
}
