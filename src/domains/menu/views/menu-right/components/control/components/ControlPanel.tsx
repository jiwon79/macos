import {
  IconAirDrop,
  IconAirPlay,
  IconBluetooth,
  IconBrightness,
  IconFocus,
  IconRightArrow,
  IconScreenMirroring,
  IconSound,
  IconStageManager,
  IconWifi
} from "assets/icons";
import { useState } from "react";
import * as styles from "./ControlPanel.css";
import { ControlSlider } from "./ControlSlider";
import { IconCircle } from "./IconCircle";
import { MediaControl } from "./MediaControl";

export function ControlPanel() {
  const [brightness, setBrightness] = useState(50);
  const [volume, setVolume] = useState(50);

  return (
    <div className={styles.panel}>
      <div className={styles.topRow}>
        <div className={styles.connectivityTile}>
          <div className={styles.connectivityRow}>
            <IconCircle variant="blue">
              <IconWifi />
            </IconCircle>
            <div className={styles.connectivityText}>
              <span className={styles.connectivityTitle}>Wi-Fi</span>
              <span className={styles.connectivitySubtitle}>
                Jiwon_Wi_Fi_adddd
              </span>
            </div>
            <span className={styles.connectivityArrow}>
              <IconRightArrow />
            </span>
          </div>

          <div className={styles.connectivityRow}>
            <IconCircle variant="blue">
              <IconBluetooth />
            </IconCircle>
            <div className={styles.connectivityText}>
              <span className={styles.connectivityTitle}>Bluetooth</span>
              <span className={styles.connectivitySubtitle}>On</span>
            </div>
          </div>

          <div className={styles.connectivityRow}>
            <IconCircle variant="blue">
              <IconAirDrop />
            </IconCircle>
            <div className={styles.connectivityText}>
              <span className={styles.connectivityTitle}>AirDrop</span>
              <span className={styles.connectivitySubtitle}>Everyone</span>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.focusTile}>
            <IconCircle variant="neutral">
              <IconFocus />
            </IconCircle>
            <span className={styles.focusLabel}>Focus</span>
          </div>

          <div className={styles.squareTileRow}>
            <div className={styles.squareTile}>
              <div className={styles.squareTileIcon}>
                <IconStageManager />
              </div>
              <span className={styles.squareTileLabel}>
                Stage
                <br />
                Manager
              </span>
            </div>
            <div className={styles.squareTile}>
              <div className={styles.squareTileIcon}>
                <IconScreenMirroring />
              </div>
              <span className={styles.squareTileLabel}>
                Screen
                <br />
                Mirroring
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sliderTile}>
        <span className={styles.sliderTileLabel}>Display</span>
        <ControlSlider
          icon={<IconBrightness />}
          value={brightness}
          onChange={setBrightness}
        />
      </div>

      <div className={styles.sliderTile}>
        <span className={styles.sliderTileLabel}>Sound</span>
        <div className={styles.sliderWithAccessory}>
          <div className={styles.sliderFlexWrapper}>
            <ControlSlider
              icon={<IconSound />}
              value={volume}
              onChange={setVolume}
            />
          </div>
          <button type="button" className={styles.sliderAccessoryButton}>
            <IconAirPlay />
          </button>
        </div>
      </div>

      <MediaControl />
    </div>
  );
}
