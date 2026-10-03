import { useMenuRightStore } from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingsLink } from "../../setting/SettingsLink";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./BatterySettingPanel.css";

export function BatterySettingPanel() {
  const level = useMenuRightStore((state) => state.battery.level);

  return (
    <div className={styles.container} data-setting-panel="Battery">
      <SettingTitle rightAccessory={<span>{level}%</span>}>
        Battery
      </SettingTitle>
      <div className={styles.powerSource}>
        <SettingTextItem size="small">Power Source: Battery</SettingTextItem>
      </div>
      <SettingDivider />
      <SettingTextItem size="small">
        No Apps Using Significant Energy
      </SettingTextItem>
      <SettingDivider />
      <SettingsLink panel="Battery" />
    </div>
  );
}
