import { createContext, type HTMLAttributes, useContext } from "react";

type FloatingMenuContext = {
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
  refs: {
    floating: React.MutableRefObject<HTMLElement | null>;
    setReference: (element: HTMLElement | null) => void;
    setFloating: (element: HTMLElement | null) => void;
  };
  floating: HTMLAttributes<HTMLElement>;
  reference: HTMLAttributes<HTMLElement>;
} | null;

export const FloatingMenuContext = createContext<FloatingMenuContext>(null);

export function useFloatingMenuContext() {
  const context = useContext(FloatingMenuContext);
  if (context === null) {
    throw new Error("FloatingMenuContext must be used within a FloatingMenu");
  }

  return context;
}
