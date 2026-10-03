import type { WindowStyle } from "domains/window/interface";
import { useWindowsAction, useWindowsStore } from "domains/window/store";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { WindowContext } from "../WindowContext.ts";
import { WindowResize } from "../WindowResize";
import { useWindowTransition } from "./useWindowTransition";
import { renderer } from "./WindowRenderer.css.ts";

export interface WindowRendererProps {
  id: string;
  style: WindowStyle;
  onStyleChange: (style: Partial<WindowStyle>) => void;
  resizable?: boolean;
  maximized?: boolean;
  fullscreen?: boolean;
  fullscreenChromeVisible?: boolean;
  hidden?: boolean;
  children: React.ReactNode;
}

function WindowRendererComponent(
  {
    id,
    style,
    onStyleChange,
    resizable = true,
    maximized = false,
    fullscreen = false,
    fullscreenChromeVisible = false,
    hidden = false,
    children
  }: WindowRendererProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { setFocusedWindowID } = useWindowsAction();
  const focused = useWindowsStore((state) => state.focusedWindowID === id);
  const elementRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => elementRef.current as HTMLDivElement);
  const transitioning = useWindowTransition(
    elementRef,
    style,
    maximized,
    fullscreen
  );

  const context = useMemo(
    () => ({
      id,
      style,
      onStyleChange,
      resizable,
      maximized,
      fullscreen,
      fullscreenChromeVisible,
      transitioning
    }),
    [
      id,
      style,
      onStyleChange,
      resizable,
      maximized,
      fullscreen,
      fullscreenChromeVisible,
      transitioning
    ]
  );
  const { x, y, width, height } = style;

  return (
    <WindowContext.Provider value={context}>
      <div
        id={id}
        data-app-window={id}
        data-window-focused={focused}
        data-window-maximized={maximized}
        data-window-fullscreen={fullscreen}
        data-window-hidden={hidden}
        data-window-transitioning={transitioning}
        aria-hidden={hidden || undefined}
        ref={elementRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${x}px, ${y}px)`
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setFocusedWindowID(id);
        }}
        className={renderer}
      >
        {resizable ? (
          <WindowResize disabled={maximized || fullscreen || transitioning}>
            {children}
          </WindowResize>
        ) : (
          children
        )}
      </div>
    </WindowContext.Provider>
  );
}

export const WindowRenderer = forwardRef(WindowRendererComponent);
