import {
  IconBatteryLow,
  IconHotspot,
  IconLock,
  IconLte,
  IconNetwork,
  IconRightArrow,
  IconWifi
} from "assets/icons";
import { useState } from "react";
import { useMenuRightActions, useMenuRightStore } from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingSwitch } from "../../setting/SettingSwitch";
import { SettingsLink } from "../../setting/SettingsLink";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./WifiSettingPanel.css";

export const KNOWN_NETWORKS = ["Starbucks", "Jiwon's Home_5G", "Jiwon's Home"];
const OTHER_NETWORKS = ["iptime", "Guest Network", "Office Wi-Fi"];

export function WifiNetworks({
  networks = KNOWN_NETWORKS
}: {
  networks?: string[];
}) {
  const { enabled, selectedSSID } = useMenuRightStore((state) => state.wifi);
  const { setWifiSSID } = useMenuRightActions();
  if (!enabled)
    return <SettingTextItem size="small">Wi-Fi is off</SettingTextItem>;
  return (
    <>
      {networks.map((ssid) => (
        <SettingItem
          key={ssid}
          icon={<IconWifi />}
          selected={selectedSSID === ssid}
          rightAccessory={<IconLock />}
          onClick={() => setWifiSSID(ssid)}
        >
          {ssid}
        </SettingItem>
      ))}
    </>
  );
}

export function WifiSettingPanel() {
  const { enabled, selectedSSID } = useMenuRightStore((state) => state.wifi);
  const { setWifiEnabled, setWifiSSID } = useMenuRightActions();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.container} data-setting-panel="Wi-Fi">
      <SettingTitle
        rightAccessory={
          <SettingSwitch
            label="Wi-Fi"
            checked={enabled}
            onChange={setWifiEnabled}
          />
        }
      >
        Wi-Fi
      </SettingTitle>
      <SettingDivider />
      {enabled ? (
        <>
          <SettingSubTitle>Personal Hotspot</SettingSubTitle>
          <SettingItem
            icon={<IconHotspot />}
            selected={selectedSSID === "Jiwon's iPhone"}
            onClick={() => setWifiSSID("Jiwon's iPhone")}
            rightAccessory={
              <span className={styles.hotspotStatus}>
                <IconNetwork />
                <IconLte />
                <IconBatteryLow />
              </span>
            }
          >
            Jiwon's iPhone
          </SettingItem>
          <SettingDivider />
          <SettingSubTitle>Known Networks</SettingSubTitle>
          <WifiNetworks />
          <SettingDivider />
          <SettingSubTitle
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            rightAccessory={
              <span className={styles.arrow} data-expanded={expanded}>
                <IconRightArrow />
              </span>
            }
          >
            Other Networks
          </SettingSubTitle>
          {expanded && <WifiNetworks networks={OTHER_NETWORKS} />}
          <SettingDivider />
        </>
      ) : (
        <SettingTextItem size="small">Wi-Fi is off</SettingTextItem>
      )}
      <SettingsLink panel="Wi-Fi" />
    </div>
  );
}
