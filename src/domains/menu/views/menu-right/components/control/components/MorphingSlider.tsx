import { IconBrightness, IconSound, IconSoundMute } from "assets/icons";
import { motion } from "framer-motion";
import { useMenuRightActions, useMenuRightStore } from "../../../store";
import * as styles from "./ControlPanel.css";
import { ControlSlider } from "./ControlSlider";

export type SliderBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export interface SliderMorph {
  view: "display" | "sound";
  origin: SliderBounds;
  target: SliderBounds;
}

// One persistent slider travels between the two layouts. Crossfading two white
// tracks makes these panels flash even when their opacity curves are monotonic.
export function MorphingSlider({
  slider,
  returning,
  transition,
  onReturnComplete
}: {
  slider: SliderMorph;
  returning: boolean;
  transition: {
    duration: number;
    ease?: readonly [number, number, number, number];
  };
  onReturnComplete: () => void;
}) {
  const brightness = useMenuRightStore((state) => state.display.brightness);
  const volume = useMenuRightStore((state) => state.sound.volume);
  const muted = useMenuRightStore((state) => state.sound.muted);
  const { setDisplayBrightness, setSoundVolume } = useMenuRightActions();
  const display = slider.view === "display";

  return (
    <motion.div
      className={styles.morphingSlider}
      data-shared-control-slider={slider.view}
      initial={slider.origin}
      animate={returning ? slider.origin : slider.target}
      transition={transition}
      onAnimationComplete={() => {
        if (returning) onReturnComplete();
      }}
    >
      <ControlSlider
        label={display ? "Display brightness" : "Sound volume"}
        icon={
          display ? (
            <IconBrightness />
          ) : muted ? (
            <IconSoundMute />
          ) : (
            <IconSound />
          )
        }
        value={display ? brightness : volume}
        onChange={display ? setDisplayBrightness : setSoundVolume}
      />
    </motion.div>
  );
}
