import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import * as styles from "./SettingItem.css";

interface SettingItemProps {
  selected?: boolean;
  icon?: ReactNode;
  rightAccessory?: ReactNode;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export function SettingItem({
  selected = false,
  icon,
  rightAccessory,
  children,
  onClick
}: SettingItemProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      className={styles.container}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <div className={styles.icon({ selected })}>{icon}</div>}
      <div className={styles.content}>{children}</div>
      {rightAccessory && (
        <div className={styles.accessory}>{rightAccessory}</div>
      )}
    </div>
  );
}
