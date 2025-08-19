import { useState } from "react";
import {
  musicSection,
  panel,
  sliderSection,
  topGrid
} from "./ControlPanel.css";
import { ControlSlider } from "./ControlSlider";
import { ControlTile } from "./ControlTile";

export function ControlPanel() {
  const [brightness, setBrightness] = useState(75);
  const [volume, setVolume] = useState(60);

  return (
    <div className={panel}>
      {/* Weather Section */}
      <div className={musicSection} style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: "#007AFF",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16
            }}
          >
            🌦️
          </div>
          <span style={{ color: "white", fontWeight: 600 }}>
            Weather recently
          </span>
        </div>
      </div>

      {/* Control Grid */}
      <div className={topGrid}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <ControlTile
            icon="📶"
            title="Wi-Fi"
            subtitle="TP-Link_F0DC"
            enabled={true}
          />
          <ControlTile
            icon="🔵"
            title="Bluetooth"
            subtitle="On"
            enabled={true}
          />
          <ControlTile
            icon="📡"
            title="AirDrop"
            subtitle="Everyone"
            enabled={true}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <ControlTile
            icon="🛌"
            title="Sleep"
            enabled={false}
            onClick={() => console.log("Sleep clicked")}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <ControlTile icon="📱" title="Stage Manager" enabled={false} />
            <ControlTile icon="📺" title="Screen Mirroring" enabled={false} />
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className={sliderSection}>
        <ControlSlider
          icon="☀️"
          label="Display"
          value={brightness}
          onChange={setBrightness}
        />
        <ControlSlider
          icon="🔊"
          label="Sound"
          value={volume}
          onChange={setVolume}
          hasAirPlayIcon={true}
        />
      </div>

      {/* Music Section */}
      <div className={musicSection}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: "#ff3b30",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16
            }}
          >
            🎵
          </div>
          <span style={{ color: "white" }}>Music.app</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: 16,
                cursor: "pointer"
              }}
            >
              ▶️
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: 16,
                cursor: "pointer"
              }}
            >
              ⏭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
