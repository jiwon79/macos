import type { ButtonHTMLAttributes, ReactNode } from "react";
import { MenuBase, type MenuType } from "../menu-base";
import { useFloatingMenuContext } from "./FloatingMenuContext";

interface FloatingMenuTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type: MenuType;
  children: ReactNode;
  openOnHover?: boolean;
}

export function FloatingMenuTrigger({
  type,
  children,
  openOnHover = true,
  onClick,
  onKeyDown,
  onMouseEnter,
  ...rest
}: FloatingMenuTriggerProps) {
  const { onSelectedChange, refs, reference, focused, selected } =
    useFloatingMenuContext();
  return (
    <MenuBase
      ref={refs.setReference}
      type={type}
      selected={selected}
      {...reference}
      {...rest}
      aria-haspopup="menu"
      aria-expanded={selected}
      data-menu-trigger
      onClick={(event) => {
        onSelectedChange(!selected);
        onClick?.(event);
      }}
      onMouseEnter={(event) => {
        if (openOnHover && focused && !selected) onSelectedChange(true);
        onMouseEnter?.(event);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          onSelectedChange(true);
          requestAnimationFrame(() =>
            (
              refs.floating.current?.querySelector(
                "button:not(:disabled), [tabindex='0'], input"
              ) as HTMLElement | null
            )?.focus()
          );
        }
        onKeyDown?.(event);
      }}
    >
      {children}
    </MenuBase>
  );
}
