import type { ReactNode } from "react";
import * as styles from "./SettingTextItem.css";

export function SettingTextItem({
  size = "medium",
  children,
  onClick
}: {
  size?: "medium" | "small";
  children?: ReactNode;
  onClick?: () => void;
}) {
  const content = <span className={styles.text({ size })}>{children}</span>;
  return onClick ? (
    <button
      type="button"
      className={styles.container({ size })}
      onClick={onClick}
    >
      {content}
    </button>
  ) : (
    <div className={styles.container({ size })}>{content}</div>
  );
}
