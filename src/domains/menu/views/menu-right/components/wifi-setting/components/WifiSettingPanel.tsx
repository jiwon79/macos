import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./WifiSettingPanel.css";

export function WifiSettingPanel() {
  return (
    <div className={styles.container}>
      <SettingTitle>Wi-Fi</SettingTitle>
    </div>
  );
}
