import { interpolate } from "framer-motion";
import type React from "react";
import * as styles from "./ControlSlider.css";

interface ControlSliderProps {
  icon: React.ReactNode;
  label: string;
  value: number; // 0-100
  onChange: (value: number) => void;
}

const THUMB_SIZE = 22;
const MIN_SLIDER_WIDTH = 224;

export function ControlSlider({
  icon,
  label,
  value,
  onChange
}: ControlSliderProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = value / 100;
  const trackWidth = `calc(${value}% + ${THUMB_SIZE * (1 - percentage)}px)`;
  const thumbLeft = `calc(${value}% - ${THUMB_SIZE * percentage}px)`;
  const step = THUMB_SIZE / MIN_SLIDER_WIDTH;
  const thumbOpacity = interpolate(
    [0, step, step * 2, 1],
    [0, 0, 1, 1]
  )(percentage);

  return (
    <div className={styles.sliderContainer} data-control-slider={label}>
      <div className={styles.sliderTrack} style={{ width: trackWidth }} />
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.sliderTrackOutline} />
      <input
        type="range"
        aria-label={label}
        min="0"
        max="100"
        value={value}
        onChange={handleInputChange}
        className={styles.sliderInput}
      />
      <div
        className={styles.sliderInputThumb}
        style={{ left: thumbLeft, opacity: thumbOpacity }}
      />
    </div>
  );
}
