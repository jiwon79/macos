import { type ReactNode, useLayoutEffect, useRef } from "react";
import { FloatingMenu } from "../../floating-menu";
import { useMenuBar } from "../../menu/MenuBarContext";
import * as styles from "../MenuRight.css";

export interface StatusMenuProps {
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

export function StatusMenu({
  label,
  icon,
  children,
  selected,
  onSelectedChange,
  glassSurface = true,
  alignToScreenEdge = false,
  inactive = false
}: StatusMenuProps & {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  glassSurface?: boolean;
  alignToScreenEdge?: boolean;
  inactive?: boolean;
}) {
  const { activeMenu } = useMenuBar();
  const contentRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const content = contentRef.current;
    const panel = content?.firstElementChild;
    if (!content || !(panel instanceof HTMLElement) || !selected) return;
    const measure = () => {
      // Keep the normal panel shadow visible; scroll only when it cannot fit.
      content.dataset.overflow = String(
        panel.offsetHeight > window.innerHeight - 34
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [selected]);
  return (
    <FloatingMenu
      focused={activeMenu !== null}
      placement="bottom-end"
      selected={selected}
      onSelectedChange={onSelectedChange}
    >
      <FloatingMenu.Trigger
        type="icon"
        openOnHover={false}
        aria-label={label}
        title={label}
        data-inactive={inactive || undefined}
        className={styles.statusTrigger}
      >
        {icon}
      </FloatingMenu.Trigger>
      <FloatingMenu.Content
        animated
        surfaceClassName={glassSurface ? styles.statusSurface : undefined}
        style={
          alignToScreenEdge
            ? {
                position: "fixed",
                top: 26,
                right: 8,
                left: "auto",
                transform: "none"
              }
            : undefined
        }
      >
        <section
          ref={contentRef}
          aria-label={`${label} menu`}
          className={styles.statusContent}
        >
          {children}
        </section>
      </FloatingMenu.Content>
    </FloatingMenu>
  );
}
