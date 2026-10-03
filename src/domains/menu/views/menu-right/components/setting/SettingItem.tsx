import type { MouseEventHandler, ReactNode } from "react";
import * as styles from "./SettingItem.css";

interface SettingItemProps {
  selected?: boolean;
  icon?: ReactNode;
  rightAccessory?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export function SettingItem({
  selected,
  icon,
  rightAccessory,
  children,
  onClick
}: SettingItemProps) {
  const content = (
    <>
      {icon && (
        <span className={styles.icon({ selected: selected ?? false })}>
          {icon}
        </span>
      )}
      <span className={styles.content}>{children}</span>
      {rightAccessory && (
        <span className={styles.accessory}>{rightAccessory}</span>
      )}
    </>
  );
  return onClick ? (
    <button
      type="button"
      className={styles.container}
      onClick={onClick}
      aria-pressed={selected}
    >
      {content}
    </button>
  ) : (
    <div className={styles.container}>{content}</div>
  );
}
