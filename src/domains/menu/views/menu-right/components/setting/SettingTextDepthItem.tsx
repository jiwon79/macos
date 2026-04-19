import type { ReactNode } from "react";
import * as styles from "./SettingTextDepthItem.css";

interface SettingTextDepthItemProps {
  selected?: boolean;
  children?: ReactNode;
}

export function SettingTextDepthItem({
  selected = false,
  children
}: SettingTextDepthItemProps) {
  return (
    <div className={styles.container()}>
      <div className={styles.inner({ selected })}>
        <span className={styles.text()}>{children}</span>
      </div>
    </div>
  );
}
