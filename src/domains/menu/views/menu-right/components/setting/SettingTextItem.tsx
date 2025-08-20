import type { ReactNode } from "react";
import * as styles from "./SettingTextItem.css";

interface SettingTextItemProps {
  size?: "medium" | "small";
  children?: ReactNode;
}

export function SettingTextItem({
  size = "medium",
  children
}: SettingTextItemProps) {
  return (
    <div className={styles.container({ size })}>
      <span className={styles.text({ size })}>{children}</span>
    </div>
  );
}
