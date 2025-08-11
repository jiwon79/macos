import { useState } from "react";
import { NetworkItem } from "./NetworkItem";
import {
  expandButton,
  networkList,
  panel,
  section,
  sectionTitle,
  settingsButton,
  toggleContainer,
  toggleLabel,
  toggleSlider,
  toggleSwitch,
  wifiToggle
} from "./WifiPanel.css";

interface WifiPanelProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function WifiPanel({ enabled, onToggle }: WifiPanelProps) {
  const [showOtherNetworks, setShowOtherNetworks] = useState(false);

  return (
    <div className={panel}>
      {/* WiFi Toggle */}
      <div className={wifiToggle}>
        <div className={toggleContainer}>
          <span className={toggleLabel}>Wi-Fi</span>
          <button
            className={toggleSwitch}
            onClick={() => onToggle(!enabled)}
            style={{
              backgroundColor: enabled ? "#007AFF" : "rgba(255, 255, 255, 0.2)"
            }}
          >
            <div
              className={toggleSlider}
              style={{
                transform: enabled ? "translateX(20px)" : "translateX(0px)"
              }}
            />
          </button>
        </div>
      </div>

      {enabled && (
        <>
          {/* Personal Hotspot */}
          <div className={section}>
            <div className={sectionTitle}>Personal Hotspot</div>
            <div className={networkList}>
              <NetworkItem
                icon="📱"
                name="이지원's iPhone"
                type="hotspot"
                signalStrength={3}
                hasPassword={false}
              />
            </div>
          </div>

          {/* Known Networks */}
          <div className={section}>
            <div className={sectionTitle}>Known Network</div>
            <div className={networkList}>
              <NetworkItem
                icon="📶"
                name="TP-Link_F0DC"
                type="wifi"
                signalStrength={4}
                hasPassword={true}
                isConnected={true}
              />
            </div>
          </div>

          {/* Other Networks */}
          <div className={section}>
            <button
              className={expandButton}
              onClick={() => setShowOtherNetworks(!showOtherNetworks)}
            >
              Other Networks {showOtherNetworks ? "▲" : "▶"}
            </button>
            {showOtherNetworks && (
              <div className={networkList}>
                <NetworkItem
                  icon="📶"
                  name="Network1"
                  type="wifi"
                  signalStrength={2}
                  hasPassword={true}
                />
                <NetworkItem
                  icon="📶"
                  name="Network2"
                  type="wifi"
                  signalStrength={1}
                  hasPassword={false}
                />
              </div>
            )}
          </div>

          {/* WiFi Settings */}
          <button className={settingsButton}>Wi-Fi Settings...</button>
        </>
      )}
    </div>
  );
}
