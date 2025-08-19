import { SettingDivider } from "../../setting/SettingDivider";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./WifiSettingPanel.css";

export function WifiSettingPanel() {
  return (
    <div className={styles.container}>
      <SettingTitle>Wi-Fi</SettingTitle>
      <SettingDivider />
      <SettingSubTitle>Personal Hotspot</SettingSubTitle>
      <SettingDivider />
      <SettingSubTitle>Known Networks</SettingSubTitle>
      <SettingDivider />
      <SettingSubTitle>WiFi Settings</SettingSubTitle>
    </div>
  );
}
