import { IconPlay, IconPlayNext } from "assets/icons";
import {
  appIcon,
  appName,
  controlButton,
  leftGroup,
  mediaContainer,
  mediaControls
} from "./MediaControl.css";

export function MediaControl() {
  return (
    <div className={mediaContainer}>
      <div className={leftGroup}>
        <div className={appIcon} />
        <span className={appName}>Music.app</span>
      </div>
      <div className={mediaControls}>
        <button type="button" className={controlButton} aria-label="Play">
          <IconPlay />
        </button>
        <button type="button" className={controlButton} aria-label="Next track">
          <IconPlayNext />
        </button>
      </div>
    </div>
  );
}
