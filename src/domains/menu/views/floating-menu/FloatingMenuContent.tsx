import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { HTMLAttributes } from "react";
import { useFloatingMenuContext } from "./FloatingMenuContext";

const MENU_OPACITY: string = "--menu-opacity";

interface FloatingMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animated?: boolean;
  surfaceClassName?: string;
}

export function FloatingMenuContent({
  children,
  animated = false,
  surfaceClassName,
  style,
  ...rest
}: FloatingMenuContentProps) {
  const { floating, refs, selected } = useFloatingMenuContext();

  const reduceMotion = useReducedMotion();

  if (!animated && !selected) {
    return null;
  }

  return (
    <div
      ref={refs.setFloating}
      data-floating-menu
      {...floating}
      {...rest}
      style={{
        ...floating.style,
        ...style,
        pointerEvents: selected ? "auto" : "none"
      }}
    >
      {animated ? (
        <AnimatePresence>
          {selected ? (
            <motion.div
              key="menu"
              className={surfaceClassName}
              style={{
                transformOrigin: "top right",
                opacity: "var(--menu-opacity, 1)"
              }}
              initial={{
                [MENU_OPACITY]: 0,
                y: reduceMotion ? 0 : -4,
                scale: reduceMotion ? 1 : 0.98
              }}
              animate={{ [MENU_OPACITY]: 1, y: 0, scale: 1 }}
              exit={{
                [MENU_OPACITY]: 0,
                y: reduceMotion ? 0 : -3,
                scale: reduceMotion ? 1 : 0.98
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.14,
                ease: "easeOut"
              }}
            >
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : (
        children
      )}
    </div>
  );
}
