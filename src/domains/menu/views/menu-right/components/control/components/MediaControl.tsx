import { useState } from "react";
import {
  appIcon,
  appName,
  controlButton,
  mediaContainer,
  mediaControls,
  mediaInfo,
  songInfo
} from "./MediaControl.css";

export function MediaControl() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    // Next track functionality
  };

  return (
    <div className={mediaContainer}>
      <div className={appIcon}>🎵</div>

      <div className={mediaInfo}>
        <div className={appName}>Music</div>
        <div className={songInfo}>Not Playing</div>
      </div>

      <div className={mediaControls}>
        <button className={controlButton} onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <button className={controlButton} onClick={nextTrack}>
          ⏭
        </button>
      </div>
    </div>
  );
}
