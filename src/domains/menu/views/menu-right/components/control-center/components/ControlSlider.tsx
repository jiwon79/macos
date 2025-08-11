import {
  airPlayButton,
  slider,
  sliderFill,
  sliderHeader,
  sliderIcon,
  sliderThumb,
  sliderTrack
} from "./ControlSlider.css";

interface ControlSliderProps {
  icon: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  hasAirPlayIcon?: boolean;
}

export function ControlSlider({
  icon,
  label,
  value,
  hasAirPlayIcon
}: ControlSliderProps) {
  return (
    <div className={slider}>
      <div className={sliderHeader}>
        <div className={sliderIcon}>{icon}</div>
        <span>{label}</span>
        {hasAirPlayIcon && <button className={airPlayButton}>📡</button>}
      </div>
      <div className={sliderTrack}>
        <div className={sliderFill} style={{ width: `${value}%` }} />
        <div className={sliderThumb} style={{ left: `${value}%` }} />
      </div>
    </div>
  );
}
