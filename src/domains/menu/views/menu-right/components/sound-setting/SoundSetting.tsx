import { IconSound } from "assets/icons";
import { useMenuRightStore } from "../../store";
import { StatusMenu, type StatusMenuProps } from "../StatusMenu";
import { SoundSettingPanel } from "./components/SoundSettingPanel";

export function SoundSetting(props: StatusMenuProps) {
  const inactive = useMenuRightStore(
    (state) => state.sound.volume === 0 || state.sound.muted
  );
  return (
    <StatusMenu
      {...props}
      label="Sound"
      icon={<IconSound />}
      inactive={inactive}
    >
      <SoundSettingPanel />
    </StatusMenu>
  );
}
