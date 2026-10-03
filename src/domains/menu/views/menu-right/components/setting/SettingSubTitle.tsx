import type { ReactNode } from "react";
import * as styles from "./SettingSubTitle.css";

interface SettingSubTitleProps {
  disabled?: boolean;
  rightAccessory?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  expanded?: boolean;
}
export function SettingSubTitle({
  disabled = true,
  rightAccessory,
  children,
  onClick,
  expanded
}: SettingSubTitleProps) {
  const content = (
    <>
      <span className={styles.title}>{children}</span>
      {rightAccessory && (
        <span className={styles.accessory}>{rightAccessory}</span>
      )}
    </>
  );
  return onClick ? (
    <button
      type="button"
      className={styles.container({ disabled: false })}
      onClick={onClick}
      aria-expanded={expanded}
    >
      {content}
    </button>
  ) : (
    <div className={styles.container({ disabled })}>{content}</div>
  );
}
