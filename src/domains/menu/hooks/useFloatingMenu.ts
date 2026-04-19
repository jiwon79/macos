import {
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions
} from "@floating-ui/react";

interface UseFloatingMenuParams {
  focused: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function useFloatingMenu({
  focused,
  open,
  onOpenChange
}: UseFloatingMenuParams) {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    placement: "bottom-start",
    middleware: [offset({ mainAxis: 2 }), flip(), shift({ padding: 8 })]
  });

  const hover = useHover(context, { enabled: focused });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss
  ]);

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
