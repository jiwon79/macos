import type { ReactNode } from "react";
import { cn } from "third-parties/classnames";
import * as styles from "./IconCircle.css";

interface IconCircleProps {
  variant?: "blue" | "neutral";
  children: ReactNode;
}

export function IconCircle({ variant = "blue", children }: IconCircleProps) {
  return (
    <div
      className={cn(
        styles.base,
        variant === "blue" ? styles.blue : styles.neutral
      )}
    >
      {children}
    </div>
  );
}
