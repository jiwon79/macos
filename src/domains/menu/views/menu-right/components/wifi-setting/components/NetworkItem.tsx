import {
  connectedIndicator,
  networkIcon,
  networkInfo,
  networkItem,
  networkName,
  networkSignal,
  passwordIcon
} from "./NetworkItem.css";

interface NetworkItemProps {
  icon: string;
  name: string;
  type: "wifi" | "hotspot";
  signalStrength: number;
  hasPassword: boolean;
  isConnected?: boolean;
}

export function NetworkItem({
  icon,
  name,
  type,
  signalStrength,
  hasPassword,
  isConnected = false
}: NetworkItemProps) {
  const getSignalBars = (strength: number) => {
    const bars = ["▁", "▂", "▃", "▄"];
    return bars.slice(0, strength).join("");
  };

  return (
    <div className={networkItem}>
      <div className={networkIcon}>{icon}</div>
      <div className={networkInfo}>
        <div className={networkName}>
          {name}
          {isConnected && <span className={connectedIndicator}> ✓</span>}
        </div>
        {type === "hotspot" && (
          <div
            style={{
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.6)",
              display: "flex",
              alignItems: "center",
              gap: 4
            }}
          >
            <span>📶</span>
            <span>LTE</span>
            <div
              style={{
                width: 12,
                height: 6,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: 1,
                marginLeft: 4
              }}
            />
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {type === "wifi" && (
          <div className={networkSignal}>{getSignalBars(signalStrength)}</div>
        )}
        {hasPassword && <div className={passwordIcon}>🔒</div>}
      </div>
    </div>
  );
}
