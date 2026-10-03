import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  shift,
  useDismiss,
  useFloating,
  useInteractions
} from "@floating-ui/react";

interface UseFloatingMenuParams {
  placement?: Placement;
  focused: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function useFloatingMenu({
  placement = "bottom-start",
  open,
  onOpenChange
}: UseFloatingMenuParams) {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    whileElementsMounted: autoUpdate,
    placement,
    middleware: [offset({ mainAxis: 2 }), flip(), shift({ padding: 8 })]
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return {
    refs,
    floating: {
      style: floatingStyles,
      ...getFloatingProps()
    },
    reference: {
      ...getReferenceProps()
    }
  };
}
