import {
  IconBrightness,
  IconDisplayDarkMode,
  IconDisplayNightShift,
  IconDisplayTrueTone,
  IconRightArrow
} from "assets/icons";
import { cn } from "third-parties/classnames";
import { useMenuRightActions, useMenuRightStore } from "../../../store";
import { ControlSlider } from "../../control/components/ControlSlider";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingTextItem } from "../../setting/SettingTextItem";
import * as styles from "./DisplaySettingPanel.css";

interface ModeTileProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function ModeTile({ icon, label, active, onClick }: ModeTileProps) {
  return (
    <button type="button" className={styles.tile} onClick={onClick}>
      <span
        className={cn(styles.tileCircle, {
          [styles.tileCircleActive]: active
        })}
      >
        {icon}
      </span>
      <span className={styles.tileLabel}>{label}</span>
      <span className={styles.tileStatus}>{active ? "On" : "Off"}</span>
    </button>
  );
}

export function DisplaySettingPanel() {
  const { brightness, darkMode, nightShift, trueTone } = useMenuRightStore(
    (state) => state.display
  );
  const {
    setDisplayBrightness,
    toggleDarkMode,
    toggleNightShift,
    toggleTrueTone
  } = useMenuRightActions();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTextGroup}>
          <span className={styles.headerTitle}>Display</span>
          <span className={styles.headerSubtitle}>
            Apple XDR Display (P3-1600 nits)
          </span>
        </div>
        <span className={styles.headerArrow}>
          <IconRightArrow />
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.sliderRow}>
          <ControlSlider
            icon={<IconBrightness />}
            value={brightness}
            onChange={setDisplayBrightness}
          />
        </div>
        <div className={styles.tilesRow}>
          <ModeTile
            icon={<IconDisplayDarkMode />}
            label="Dark Mode"
            active={darkMode}
            onClick={toggleDarkMode}
          />
          <ModeTile
            icon={<IconDisplayNightShift />}
            label="Night Shift"
            active={nightShift}
            onClick={toggleNightShift}
          />
          <ModeTile
            icon={<IconDisplayTrueTone />}
            label="True Tone"
            active={trueTone}
            onClick={toggleTrueTone}
          />
        </div>
        <SettingDivider />
        <SettingTextItem>Display Settings...</SettingTextItem>
      </div>
    </div>
  );
}
