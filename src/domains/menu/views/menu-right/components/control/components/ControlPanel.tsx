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
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMenuRightActions, useMenuRightStore } from "../../../store";
import * as styles from "./ControlPanel.css";
import { ControlSlider } from "./ControlSlider";
import { ControlSubViewHeader } from "./ControlSubViewHeader";
import {
  AirDropSubView,
  BluetoothSubView,
  DisplaySubView,
  FocusSubView,
  ScreenMirroringSubView,
  SoundSubView,
  SUB_VIEW_TITLES,
  type SubViewName,
  WifiSubView
} from "./ControlSubViews";
import { IconCircle } from "./IconCircle";
import { MediaControl } from "./MediaControl";

type View = "main" | SubViewName;

const transition = { duration: 0.18, ease: "easeOut" } as const;

interface MainViewProps {
  onNavigate: (view: SubViewName) => void;
}

function MainView({ onNavigate }: MainViewProps) {
  const wifiSSID = useMenuRightStore((state) => state.wifi.selectedSSID);
  const airdropMode = useMenuRightStore((state) => state.airdrop.mode);
  const bluetoothEnabled = useMenuRightStore(
    (state) => state.bluetooth.enabled
  );
  const focusMode = useMenuRightStore((state) => state.focus.mode);
  const brightness = useMenuRightStore((state) => state.display.brightness);
  const volume = useMenuRightStore((state) => state.sound.volume);
  const { setDisplayBrightness, setSoundVolume } = useMenuRightActions();

  const focusLabel =
    focusMode === "do_not_disturb"
      ? "Do Not Disturb"
      : focusMode === "work"
        ? "Work"
        : focusMode === "sleep"
          ? "Sleep"
          : "Focus";

  const airdropSubtitle =
    airdropMode === "everyone"
      ? "Everyone"
      : airdropMode === "contacts_only"
        ? "Contacts Only"
        : "Off";

  return (
    <div className={styles.mainContent}>
      <div className={styles.topRow}>
        <div className={styles.connectivityTile}>
          <button
            type="button"
            className={styles.connectivityRow}
            onClick={() => onNavigate("wifi")}
          >
            <IconCircle variant="blue">
              <IconWifi />
            </IconCircle>
            <div className={styles.connectivityText}>
              <span className={styles.connectivityTitle}>Wi-Fi</span>
              <span className={styles.connectivitySubtitle}>
                {wifiSSID ?? "Off"}
              </span>
            </div>
            <span className={styles.connectivityArrow}>
              <IconRightArrow />
            </span>
          </button>

          <button
            type="button"
            className={styles.connectivityRow}
            onClick={() => onNavigate("bluetooth")}
          >
            <IconCircle variant={bluetoothEnabled ? "blue" : "neutral"}>
              <IconBluetooth />
            </IconCircle>
            <div className={styles.connectivityText}>
              <span className={styles.connectivityTitle}>Bluetooth</span>
              <span className={styles.connectivitySubtitle}>
                {bluetoothEnabled ? "On" : "Off"}
              </span>
            </div>
          </button>

          <button
            type="button"
            className={styles.connectivityRow}
            onClick={() => onNavigate("airdrop")}
          >
            <IconCircle variant={airdropMode === "off" ? "neutral" : "blue"}>
              <IconAirDrop />
            </IconCircle>
            <div className={styles.connectivityText}>
              <span className={styles.connectivityTitle}>AirDrop</span>
              <span className={styles.connectivitySubtitle}>
                {airdropSubtitle}
              </span>
            </div>
          </button>
        </div>

        <div className={styles.rightColumn}>
          <button
            type="button"
            className={styles.focusTile}
            onClick={() => onNavigate("focus")}
          >
            <IconCircle variant={focusMode ? "blue" : "neutral"}>
              <IconFocus />
            </IconCircle>
            <span className={styles.focusLabel}>{focusLabel}</span>
          </button>

          <div className={styles.squareTileRow}>
            <button type="button" className={styles.squareTile}>
              <div className={styles.squareTileIcon}>
                <IconStageManager />
              </div>
              <span className={styles.squareTileLabel}>
                Stage
                <br />
                Manager
              </span>
            </button>
            <button
              type="button"
              className={styles.squareTile}
              onClick={() => onNavigate("screen-mirroring")}
            >
              <div className={styles.squareTileIcon}>
                <IconScreenMirroring />
              </div>
              <span className={styles.squareTileLabel}>
                Screen
                <br />
                Mirroring
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.sliderTile}>
        <button
          type="button"
          className={styles.sliderHeader}
          onClick={() => onNavigate("display")}
        >
          <span className={styles.sliderTileLabel}>Display</span>
          <span className={styles.sliderHeaderArrow}>
            <IconRightArrow />
          </span>
        </button>
        <ControlSlider
          icon={<IconBrightness />}
          value={brightness}
          onChange={setDisplayBrightness}
        />
      </div>

      <div className={styles.sliderTile}>
        <button
          type="button"
          className={styles.sliderHeader}
          onClick={() => onNavigate("sound")}
        >
          <span className={styles.sliderTileLabel}>Sound</span>
          <span className={styles.sliderHeaderArrow}>
            <IconRightArrow />
          </span>
        </button>
        <div className={styles.sliderWithAccessory}>
          <div className={styles.sliderFlexWrapper}>
            <ControlSlider
              icon={<IconSound />}
              value={volume}
              onChange={setSoundVolume}
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

interface SubViewProps {
  view: SubViewName;
}

function SubViewBody({ view }: SubViewProps) {
  switch (view) {
    case "wifi":
      return <WifiSubView />;
    case "bluetooth":
      return <BluetoothSubView />;
    case "airdrop":
      return <AirDropSubView />;
    case "focus":
      return <FocusSubView />;
    case "display":
      return <DisplaySubView />;
    case "sound":
      return <SoundSubView />;
    case "screen-mirroring":
      return <ScreenMirroringSubView />;
  }
}

export function ControlPanel() {
  const [view, setView] = useState<View>("main");

  return (
    <motion.div
      className={styles.panel}
      layout
      transition={{ layout: { duration: 0.28, ease: [0.32, 0.72, 0, 1] } }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {view === "main" ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <MainView onNavigate={setView} />
          </motion.div>
        ) : (
          <motion.div
            key={view}
            className={styles.subViewWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          >
            <ControlSubViewHeader
              title={SUB_VIEW_TITLES[view]}
              onBack={() => setView("main")}
            />
            <div className={styles.subViewBody}>
              <SubViewBody view={view} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
