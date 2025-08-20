import { IconHotspot, IconRightArrow, IconWifi } from "assets/icons";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./WifiSettingPanel.css";

export function WifiSettingPanel() {
  return (
    <div className={styles.container}>
      <SettingTitle>Wi-Fi</SettingTitle>
      <SettingDivider />
      <SettingSubTitle>Personal Hotspot</SettingSubTitle>
      <SettingItem icon={<IconHotspot />}>Jiwon's iPhone</SettingItem>
      <SettingDivider />
      <SettingSubTitle>Known Networks</SettingSubTitle>
      <SettingItem icon={<IconWifi />} selected>
        Starbucks
      </SettingItem>
      <SettingItem icon={<IconWifi />}>Jiwon's Home</SettingItem>
      <SettingItem icon={<IconWifi />}>Jiwon's Home_5G</SettingItem>
      <SettingDivider />
      <SettingSubTitle rightAccessory={<IconRightArrow />} disabled={false}>
        Other Networks
      </SettingSubTitle>
      <SettingDivider />
      <SettingTextItem>WiFi Settings</SettingTextItem>
    </div>
  );
}
