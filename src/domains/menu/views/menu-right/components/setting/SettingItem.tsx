import type { ReactNode } from "react";
import * as styles from "./SettingItem.css";

interface SettingItemProps {
  selected?: boolean;
  icon?: ReactNode;
  rightAccessory?: ReactNode;
  children?: ReactNode;
}

export function SettingItem({
  selected = false,
  icon,
  rightAccessory,
  children
}: SettingItemProps) {
  return (
    <div className={styles.container}>
      {icon && <div className={styles.icon({ selected })}>{icon}</div>}
      <div className={styles.content}>{children}</div>
      {rightAccessory && (
        <div className={styles.accessory}>{rightAccessory}</div>
      )}
    </div>
  );
}
