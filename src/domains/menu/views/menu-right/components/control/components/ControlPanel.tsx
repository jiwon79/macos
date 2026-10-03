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
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
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
import { MorphingSlider, type SliderMorph } from "./MorphingSlider";

type View = "main" | SubViewName;

// Estimated from the 60fps macOS capture: most growth occurs in the first
// 100ms, followed by a short, non-bouncing settle around 220–240ms.
const MORPH_TRANSITION = {
  duration: 0.24,
  ease: [0.18, 0.85, 0.25, 1]
} as const;

// Keep opacity and tile geometry on Motion's frame loop. Native opacity
// animations can briefly expose the old inline style when they finish.
const VIEW_OPACITY: string = "--control-view-opacity";

type TileBounds = { left: number; top: number; width: number; height: number };
const SOURCE_TILE: Record<SubViewName, string> = {
  wifi: "connectivity",
  bluetooth: "connectivity",
  airdrop: "connectivity",
  focus: "focus",
  display: "display",
  sound: "sound",
  "screen-mirroring": "screen-mirroring"
};

interface MainViewProps {
  onNavigate: (view: SubViewName) => void;
}

function MainView({ onNavigate }: MainViewProps) {
  const { enabled: wifiEnabled, selectedSSID: wifiSSID } = useMenuRightStore(
    (state) => state.wifi
  );
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
        <div
          className={styles.connectivityTile}
          data-control-source="connectivity"
        >
          <button
            type="button"
            className={styles.connectivityRow}
            onClick={() => onNavigate("wifi")}
          >
            <IconCircle variant={wifiEnabled ? "blue" : "neutral"}>
              <IconWifi />
            </IconCircle>
            <div className={styles.connectivityText}>
              <span className={styles.connectivityTitle}>Wi-Fi</span>
              <span className={styles.connectivitySubtitle}>
                {wifiEnabled ? (wifiSSID ?? "Not Connected") : "Off"}
              </span>
            </div>
            <span className={styles.connectivityArrow} aria-hidden="true">
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
            <span className={styles.connectivityArrow} aria-hidden="true">
              <IconRightArrow />
            </span>
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
            <span className={styles.connectivityArrow} aria-hidden="true">
              <IconRightArrow />
            </span>
          </button>
        </div>

        <div className={styles.rightColumn}>
          <button
            type="button"
            className={styles.focusTile}
            data-control-source="focus"
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
              aria-label="Screen Mirroring"
              data-control-source="screen-mirroring"
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

      <div className={styles.displaySliderTile} data-control-source="display">
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
          label="Display brightness"
          icon={<IconBrightness />}
          value={brightness}
          onChange={setDisplayBrightness}
        />
      </div>

      <div className={styles.soundSliderTile} data-control-source="sound">
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
              label="Sound volume"
              icon={<IconSound />}
              value={volume}
              onChange={setSoundVolume}
            />
          </div>
          <button
            type="button"
            className={styles.sliderAccessoryButton}
            aria-label="Choose sound output"
            onClick={() => onNavigate("sound")}
          >
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
  const [height, setHeight] = useState(370);
  const [sliderMorph, setSliderMorph] = useState<SliderMorph | null>(null);
  const [origin, setOrigin] = useState<TileBounds>({
    left: 10,
    top: 10,
    width: 134,
    height: 134
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const navigate = (next: SubViewName) => {
    const panel = panelRef.current;
    const tile = panel?.querySelector<HTMLElement>(
      `[data-control-source="${SOURCE_TILE[next]}"]`
    );
    if (panel && tile) {
      const parent = panel.getBoundingClientRect();
      const bounds = tile.getBoundingClientRect();
      // Account for the small opening scale if a tile is clicked immediately.
      const scale = parent.width / panel.offsetWidth;
      setOrigin({
        left: (bounds.left - parent.left) / scale,
        top: (bounds.top - parent.top) / scale,
        width: bounds.width / scale,
        height: bounds.height / scale
      });
      if (!reduceMotion && (next === "display" || next === "sound")) {
        const slider = tile.querySelector<HTMLElement>("[data-control-slider]");
        if (slider) {
          const rect = slider.getBoundingClientRect();
          const origin = {
            left: (rect.left - parent.left) / scale,
            top: (rect.top - parent.top) / scale,
            width: rect.width / scale,
            height: rect.height / scale
          };
          setSliderMorph({ view: next, origin, target: origin });
        }
      } else {
        setSliderMorph(null);
      }
    }
    setView(next);
  };

  useLayoutEffect(() => {
    if (mainRef.current) mainRef.current.inert = view !== "main";
    if (view === "main") {
      setHeight(370);
      return;
    }
    const content = panelRef.current?.querySelector<HTMLElement>(
      `[data-control-view="${view}"]`
    );
    if (!content) return;
    const measure = () => {
      setHeight(content.offsetHeight);
      const slider = content.querySelector<HTMLElement>(
        "[data-control-slider]"
      );
      const panel = panelRef.current;
      if (!slider || !panel) return;
      const scale = panel.getBoundingClientRect().width / panel.offsetWidth;
      const contentBox = content.getBoundingClientRect();
      const box = slider.getBoundingClientRect();
      const target = {
        left: (box.left - contentBox.left) / scale,
        top: (box.top - contentBox.top) / scale,
        width: box.width / scale,
        height: box.height / scale
      };
      setSliderMorph((current) =>
        current && current.view === view ? { ...current, target } : current
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [view]);

  const geometryTransition = reduceMotion ? { duration: 0 } : MORPH_TRANSITION;

  return (
    <motion.div
      ref={panelRef}
      className={styles.panel}
      data-control-panel
      data-shared-slider={sliderMorph?.view}
      initial={false}
      animate={{ height }}
      transition={geometryTransition}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" && view !== "main") {
          event.preventDefault();
          setView("main");
        }
      }}
    >
      <motion.div
        ref={mainRef}
        className={styles.mainView}
        data-control-view="main"
        aria-hidden={view !== "main"}
        initial={false}
        animate={{ [VIEW_OPACITY]: view === "main" ? 1 : 0 }}
        transition={{
          duration: reduceMotion
            ? 0
            : sliderMorph && view === "main"
              ? 0.08
              : 0.16,
          delay: reduceMotion || view !== "main" || sliderMorph ? 0 : 0.04,
          ease: "linear"
        }}
        style={{ pointerEvents: view === "main" ? "auto" : "none" }}
      >
        <MainView onNavigate={navigate} />
      </motion.div>
      <AnimatePresence>
        {view !== "main" && (
          <motion.div
            key={view}
            className={styles.detailPanel}
            data-control-morph
            initial={
              reduceMotion
                ? false
                : { ...origin, borderRadius: 10, [VIEW_OPACITY]: 0 }
            }
            animate={{
              left: 0,
              top: 0,
              width: 298,
              height,
              borderRadius: 6,
              [VIEW_OPACITY]: 1
            }}
            exit={{
              ...origin,
              borderRadius: 10,
              [VIEW_OPACITY]: 0,
              transition: {
                ...geometryTransition,
                [VIEW_OPACITY]: {
                  duration: reduceMotion ? 0 : 0.12,
                  delay: reduceMotion || sliderMorph ? 0 : 0.08
                }
              }
            }}
            transition={{
              ...geometryTransition,
              [VIEW_OPACITY]: {
                duration: reduceMotion ? 0 : 0.08,
                ease: "linear"
              }
            }}
          >
            <motion.div
              data-control-view={view}
              className={styles.subViewWrapper}
              initial={{ [VIEW_OPACITY]: reduceMotion ? 1 : 0.35 }}
              animate={{ [VIEW_OPACITY]: 1 }}
              exit={{ [VIEW_OPACITY]: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.12,
                delay: 0,
                ease: "linear"
              }}
            >
              <ControlSubViewHeader
                title={SUB_VIEW_TITLES[view]}
                onBack={() => setView("main")}
              />
              <div className={styles.subViewBody}>
                <SubViewBody view={view} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {sliderMorph && (
        <MorphingSlider
          key={sliderMorph.view}
          slider={sliderMorph}
          returning={view === "main"}
          transition={geometryTransition}
          onReturnComplete={() => setSliderMorph(null)}
        />
      )}
    </motion.div>
  );
}
