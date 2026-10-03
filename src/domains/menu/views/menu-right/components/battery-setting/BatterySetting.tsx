import { IconBatteryLow } from "assets/icons";
import { StatusMenu, type StatusMenuProps } from "../StatusMenu";
import { BatterySettingPanel } from "./components/BatterySettingPanel";

export function BatterySetting(props: StatusMenuProps) {
  return (
    <StatusMenu {...props} label="Battery" icon={<IconBatteryLow />}>
      <BatterySettingPanel />
    </StatusMenu>
  );
}
