import { SettingDivider } from "../../setting/SettingDivider";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./WifiSettingPanel.css";

export function WifiSettingPanel() {
  return (
    <div className={styles.container}>
      <SettingTitle>Wi-Fi</SettingTitle>
      <SettingDivider />
      <SettingTitle>Wi-Fi</SettingTitle>
    </div>
  );
}
