import { IconCheck } from "assets/icons";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { cn } from "third-parties/classnames";
import * as styles from "./SettingTextDepthItem.css";

interface SettingTextDepthItemProps {
  selected?: boolean;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export function SettingTextDepthItem({
  selected = false,
  children,
  onClick
}: SettingTextDepthItemProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.inner({ selected })}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <span
          className={cn(styles.iconSlot, {
            [styles.iconSlotHidden]: !selected
          })}
        >
          <IconCheck />
        </span>
        <span className={styles.text}>{children}</span>
      </div>
    </div>
  );
}
