import { IconWifi } from "assets/icons";
import { useMenuRightStore } from "../../store";
import { StatusMenu, type StatusMenuProps } from "../StatusMenu";
import { WifiSettingPanel } from "./components/WifiSettingPanel";

export function WifiSetting(props: StatusMenuProps) {
  const inactive = useMenuRightStore((state) => !state.wifi.enabled);
  return (
    <StatusMenu
      {...props}
      label="Wi-Fi"
      icon={<IconWifi />}
      inactive={inactive}
    >
      <WifiSettingPanel />
    </StatusMenu>
  );
}
