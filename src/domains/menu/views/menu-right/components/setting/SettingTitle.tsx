import type { ReactNode } from "react";
import * as styles from "./SettingTitle.css";

interface SettingTitleProps {
  rightAccessory?: ReactNode;
  children?: ReactNode;
}

export function SettingTitle({ rightAccessory, children }: SettingTitleProps) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{children}</span>
      {rightAccessory}
    </div>
  );
}
