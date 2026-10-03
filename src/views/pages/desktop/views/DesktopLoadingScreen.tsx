import { useDarkMode } from "utils/browser";
import * as styles from "./DesktopLoadingScreen.css";

interface DesktopLoadingScreenProps {
  failed: boolean;
  onRetry: () => void;
  onContinue: () => void;
}

export function DesktopLoadingScreen({
  failed,
  onRetry,
  onContinue
}: DesktopLoadingScreenProps) {
  useDarkMode();

  return (
    <div className={styles.screen}>
      <div role="status" aria-live="polite" className={styles.status}>
        {!failed && <span className={styles.spinner} aria-hidden="true" />}
        <p>{failed ? "Couldn't load desktop images." : "Loading desktop…"}</p>
      </div>
      {failed && (
        <div className={styles.actions}>
          <button type="button" onClick={onRetry}>
            Try again
          </button>
          <button type="button" onClick={onContinue}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
