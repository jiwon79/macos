import type { Placement } from "@floating-ui/react";
import { useFloatingMenu } from "domains/menu/hooks/useFloatingMenu";
import type { ReactNode } from "react";
import { FloatingMenuContent } from "./FloatingMenuContent";
import { FloatingMenuContext } from "./FloatingMenuContext";
import { FloatingMenuTrigger } from "./FloatingMenuTrigger";

interface FloatingMenuProps {
  placement?: Placement;
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
  children: ReactNode;
}

export function FloatingMenu({
  focused,
  placement,
  selected,
  onSelectedChange,
  children
}: FloatingMenuProps) {
  const { refs, floating, reference } = useFloatingMenu({
    focused,
    placement,
    open: selected,
    onOpenChange: onSelectedChange
  });

  const context = {
    focused,
    selected,
    onSelectedChange,
    refs,
    floating,
    reference
  };

  return (
    <FloatingMenuContext.Provider value={context}>
      {children}
    </FloatingMenuContext.Provider>
  );
}

FloatingMenu.Trigger = FloatingMenuTrigger;
FloatingMenu.Content = FloatingMenuContent;
