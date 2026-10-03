import { IconAirDrop } from "assets/icons";
import { useMenuRightStore } from "../../store";
import { StatusMenu, type StatusMenuProps } from "../StatusMenu";
import { AirDropSettingPanel } from "./components/AirDropSettingPanel";

export function AirDropSetting(props: StatusMenuProps) {
  const inactive = useMenuRightStore((state) => state.airdrop.mode === "off");
  return (
    <StatusMenu
      {...props}
      label="AirDrop"
      icon={<IconAirDrop />}
      inactive={inactive}
    >
      <AirDropSettingPanel />
    </StatusMenu>
  );
}
