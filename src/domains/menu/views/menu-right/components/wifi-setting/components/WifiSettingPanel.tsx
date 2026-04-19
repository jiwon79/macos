import { IconHotspot, IconRightArrow, IconWifi } from "assets/icons";
import { useMenuRightActions, useMenuRightStore } from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./WifiSettingPanel.css";

const KNOWN_NETWORKS = ["Starbucks", "Jiwon's Home", "Jiwon's Home_5G"];

export function WifiSettingPanel() {
  const selectedSSID = useMenuRightStore((state) => state.wifi.selectedSSID);
  const { setWifiSSID } = useMenuRightActions();

  return (
    <div className={styles.container}>
      <SettingTitle>Wi-Fi</SettingTitle>
      <SettingDivider />
      <SettingSubTitle>Personal Hotspot</SettingSubTitle>
      <SettingItem icon={<IconHotspot />}>Jiwon's iPhone</SettingItem>
      <SettingDivider />
      <SettingSubTitle>Known Networks</SettingSubTitle>
      {KNOWN_NETWORKS.map((ssid) => (
        <SettingItem
          key={ssid}
          icon={<IconWifi />}
          selected={selectedSSID === ssid}
          onClick={() => setWifiSSID(ssid)}
        >
          {ssid}
        </SettingItem>
      ))}
      <SettingDivider />
      <SettingSubTitle rightAccessory={<IconRightArrow />} disabled={false}>
        Other Networks
      </SettingSubTitle>
      <SettingDivider />
      <SettingTextItem>WiFi Settings</SettingTextItem>
    </div>
  );
}
