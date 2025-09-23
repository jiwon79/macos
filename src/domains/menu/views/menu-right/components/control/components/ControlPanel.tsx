import { IconBrightness, IconSound } from "assets/icons";
import { useState } from "react";
import { cn } from "third-parties/classnames";
import {
  controlsGrid,
  controlTile,
  controlTileDisabled,
  controlTileIcon,
  controlTileLabel,
  controlTileSubtitle,
  controlTileWide,
  panel,
  slidersContainer
} from "./ControlPanel.css";
import { ControlSlider } from "./ControlSlider";
import { MediaControl } from "./MediaControl";

export function ControlPanel() {
  const [brightness, setBrightness] = useState(75);
  const [volume, setVolume] = useState(60);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airdropEnabled, setAirdropEnabled] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  return (
    <div className={panel}>
      {/* Top Controls Grid */}
      <div className={controlsGrid}>
        {/* WiFi Tile */}
        <div
          className={cn(controlTile, { [controlTileDisabled]: !wifiEnabled })}
          onClick={() => setWifiEnabled(!wifiEnabled)}
        >
          <div className={controlTileIcon}>📶</div>
          <div className={controlTileLabel}>Wi-Fi</div>
          <div className={controlTileSubtitle}>
            {wifiEnabled ? "Connected" : "Off"}
          </div>
        </div>

        {/* Bluetooth Tile */}
        <div
          className={cn(controlTile, {
            [controlTileDisabled]: !bluetoothEnabled
          })}
          onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
        >
          <div className={controlTileIcon}>🔵</div>
          <div className={controlTileLabel}>Bluetooth</div>
          <div className={controlTileSubtitle}>
            {bluetoothEnabled ? "On" : "Off"}
          </div>
        </div>

        {/* AirDrop Tile */}
        <div
          className={cn(controlTile, {
            [controlTileDisabled]: !airdropEnabled
          })}
          onClick={() => setAirdropEnabled(!airdropEnabled)}
        >
          <div className={controlTileIcon}>📡</div>
          <div className={controlTileLabel}>AirDrop</div>
          <div className={controlTileSubtitle}>
            {airdropEnabled ? "Everyone" : "Off"}
          </div>
        </div>

        {/* Focus Mode - Wide Tile */}
        <div
          className={cn(controlTile, controlTileWide, {
            [controlTileDisabled]: !focusMode
          })}
          onClick={() => setFocusMode(!focusMode)}
        >
          <div className={controlTileIcon}>🌙</div>
          <div className={controlTileLabel}>Focus</div>
          <div className={controlTileSubtitle}>
            {focusMode ? "Do Not Disturb" : "Off"}
          </div>
        </div>

        {/* Screen Mirroring Tile */}
        <div className={cn(controlTile, controlTileDisabled)}>
          <div className={controlTileIcon}>📺</div>
          <div className={controlTileLabel}>Screen Mirroring</div>
        </div>

        {/* Stage Manager Tile */}
        <div className={cn(controlTile, controlTileDisabled)}>
          <div className={controlTileIcon}>📱</div>
          <div className={controlTileLabel}>Stage Manager</div>
        </div>
      </div>

      {/* Sliders Section */}
      <div className={slidersContainer}>
        <ControlSlider
          icon={<IconBrightness />}
          value={brightness}
          onChange={setBrightness}
        />

        <ControlSlider
          icon={<IconSound />}
          value={volume}
          onChange={setVolume}
        />
      </div>

      {/* Media Control */}
      <MediaControl />
    </div>
  );
}
