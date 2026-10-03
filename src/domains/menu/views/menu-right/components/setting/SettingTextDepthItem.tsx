import { IconCheck } from "assets/icons";
import type { ReactNode } from "react";
import { cn } from "third-parties/classnames";
import * as styles from "./SettingTextDepthItem.css";

interface SettingTextDepthItemProps {
  selected?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

export function SettingTextDepthItem({
  selected = false,
  children,
  onClick
}: SettingTextDepthItemProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.inner({ selected })}
        onClick={onClick}
        aria-pressed={selected}
      >
        <span
          aria-hidden="true"
          className={cn(styles.iconSlot, {
            [styles.iconSlotHidden]: !selected
          })}
        >
          <IconCheck />
        </span>
        <span className={styles.text}>{children}</span>
      </button>
    </div>
  );
}
