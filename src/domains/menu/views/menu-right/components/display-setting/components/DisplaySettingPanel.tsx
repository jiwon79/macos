import {
  IconBrightness,
  IconDisplayDarkMode,
  IconDisplayNightShift,
  IconDisplayTrueTone,
  IconRightArrow
} from "assets/icons";
import { useState } from "react";
import { cn } from "third-parties/classnames";
import { useMenuRightActions, useMenuRightStore } from "../../../store";
import { ControlSlider } from "../../control/components/ControlSlider";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingsLink } from "../../setting/SettingsLink";
import { SettingTextDepthItem } from "../../setting/SettingTextDepthItem";
import * as styles from "./DisplaySettingPanel.css";

const COLOR_PROFILES = [
  "Apple XDR Display (P3-1600 nits)",
  "Apple Display (P3-600 nits)",
  "HDR Video (P3-ST 2084)",
  "HDTV Video (BT.709-BT.1886)",
  "NTSC Video (BT.601 SMPTE-C)",
  "PAL & SECAM Video (BT.601 EBU)",
  "Digital Cinema (P3-DCI)",
  "Digital Cinema (P3-D65)",
  "Design & Print (P3-D50)",
  "Photography (P3-D65)",
  "Internet & Web (sRGB)"
];

interface ModeTileProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function ModeTile({ icon, label, active, onClick }: ModeTileProps) {
  return (
    <button
      type="button"
      className={styles.tile}
      onClick={onClick}
      aria-pressed={active}
    >
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

export function DisplaySettingPanel({
  embedded = false
}: {
  embedded?: boolean;
}) {
  const { brightness, darkMode, nightShift, trueTone, colorProfile } =
    useMenuRightStore((state) => state.display);
  const {
    setDisplayBrightness,
    toggleDarkMode,
    toggleNightShift,
    toggleTrueTone,
    setDisplayColorProfile
  } = useMenuRightActions();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={embedded ? styles.embedded : styles.container}
      data-setting-panel="Display"
    >
      <div className={styles.header}>
        <div className={styles.headerTextGroup}>
          {!embedded && <span className={styles.headerTitle}>Display</span>}
          <span className={styles.headerSubtitle}>{colorProfile}</span>
        </div>
        <button
          type="button"
          className={cn(styles.headerArrow, {
            [styles.headerArrowExpanded]: expanded
          })}
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? "Collapse profiles" : "Expand profiles"}
          aria-expanded={expanded}
        >
          <IconRightArrow />
        </button>
      </div>
      {expanded && (
        <div className={styles.collapseList}>
          {COLOR_PROFILES.map((profile) => (
            <SettingTextDepthItem
              key={profile}
              selected={colorProfile === profile}
              onClick={() => setDisplayColorProfile(profile)}
            >
              {profile}
            </SettingTextDepthItem>
          ))}
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.sliderRow}>
          <ControlSlider
            label="Display brightness"
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
        <SettingsLink panel="Display" />
      </div>
    </div>
  );
}
