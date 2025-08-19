import type { ReactNode } from "react";
import * as styles from "./SettingSubTitle.css";

interface SettingSubTitleProps {
  disabled?: boolean;
  rightAccessory?: ReactNode;
  children?: ReactNode;
}

export function SettingSubTitle({
  disabled = true,
  rightAccessory,
  children
}: SettingSubTitleProps) {
  return (
    <div className={styles.container({ disabled })}>
      <span className={styles.title}>{children}</span>
      {rightAccessory}
    </div>
  );
}
