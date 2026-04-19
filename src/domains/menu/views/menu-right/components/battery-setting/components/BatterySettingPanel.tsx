import { useMenuRightStore } from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./BatterySettingPanel.css";

export function BatterySettingPanel() {
  const level = useMenuRightStore((state) => state.battery.level);

  return (
    <div className={styles.container}>
      <SettingTitle rightAccessory={<span>{level}%</span>}>
        Battery
      </SettingTitle>
      <SettingTextItem size="small">Power Source: Battery</SettingTextItem>
      <SettingDivider />
      <SettingTextItem>No Apps Using Significant Energy</SettingTextItem>
      <SettingDivider />
      <SettingTextItem>Battery Settings...</SettingTextItem>
    </div>
  );
}
