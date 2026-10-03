import {
  IconWindowClose,
  IconWindowMaximize,
  IconWindowMinimize
} from "assets/icons";
import { useWindowsAction, useWindowsStore } from "domains/window/store/store";
import { animateGenieEffect } from "domains/window-animation/services/animateGenieEffect";
import {
  useWindowAnimationAction,
  useWindowAnimationStore
} from "domains/window-animation/store";
import html2canvas from "html2canvas";
import { getImageData } from "utils/browser";
import { useWindowContext } from "../WindowContext";
import {
  closeIcon,
  container,
  maximizeIcon,
  minimizeIcon
} from "./WindowControl.css";

interface WindowControlProps {
  size?: "standard" | "mono" | "withTitle";
}

export function WindowControl({ size }: WindowControlProps) {
  const { id, resizable, fullscreen, transitioning } = useWindowContext();
  const windows = useWindowsStore((state) => state.windows);
  const windowElements = useWindowsStore((state) => state.windowElements);
  const { deleteWindow, minimizeWindow, toggleFullscreenWindow } =
    useWindowsAction();

  const dockElement = useWindowAnimationStore((state) => state.dockElement);
  const minimizedDockIndicatorElement = useWindowAnimationStore(
    (state) => state.minimizedDockIndicatorElement
  );
  const { startMinimizingWindow, stopMinimizingWindow, getDockItemElement } =
    useWindowAnimationAction();

  const window = windows.find((window) => window.id === id);
  const windowElement = windowElements[id];

  const onCloseMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteWindow(id);
  };

  const getTarget = (): { x: number; y: number; width: number } => {
    const targetElement =
      getDockItemElement(id) ?? minimizedDockIndicatorElement;
    if (targetElement == null || dockElement == null) {
      throw new Error("Target element not found");
    }
    const targetRect = targetElement.getBoundingClientRect();
    const dockRect = dockElement.getBoundingClientRect();

    return {
      x: targetRect.x,
      y: dockRect.y,
      width: targetRect.width
    };
  };

  const onMinimizeMouseDown = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (
      window == null ||
      windowElement == null ||
      fullscreen ||
      transitioning
    ) {
      return;
    }

    const target = getTarget();
    if (target == null) {
      return;
    }

    const windowCanvas = await html2canvas(windowElement, {
      backgroundColor: null,
      logging: false,
      useCORS: true
    });
    const currentWindow = useWindowsStore
      .getState()
      .windows.find((window) => window.id === id);
    if (
      currentWindow?.style !== window.style ||
      currentWindow.fullscreenRestoreStyle
    ) {
      return;
    }
    const { width, height } = window.style;
    const image = getImageData(windowCanvas, width, height);
    if (image == null) {
      return;
    }

    minimizeWindow({
      id,
      appID: window.appID,
      imageData: image,
      window: window.style,
      target
    });
    startMinimizingWindow({
      id,
      appID: window.appID,
      imageData: image,
      window: window.style,
      target
    });

    await animateGenieEffect({
      image,
      window: window.style,
      getTarget,
      reverse: false
    });

    stopMinimizingWindow(id);
  };

  const onControlButtonMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className={container({ size })}
      onDoubleClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Close window"
        className={closeIcon}
        onMouseDown={onCloseMouseDown}
      >
        <IconWindowClose />
      </button>
      <button
        type="button"
        aria-label="Minimize window"
        disabled={fullscreen || transitioning}
        className={minimizeIcon}
        onMouseDown={onMinimizeMouseDown}
      >
        <IconWindowMinimize />
      </button>
      <button
        type="button"
        aria-label={fullscreen ? "Exit full screen" : "Enter full screen"}
        aria-pressed={fullscreen}
        disabled={!resizable}
        className={maximizeIcon}
        onMouseDown={onControlButtonMouseDown}
        onClick={() => toggleFullscreenWindow(id)}
      >
        {fullscreen ? (
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
            <path d="M0 3h3V0L0 3Zm8 2H5v3l3-3Z" fill="currentColor" />
          </svg>
        ) : (
          <IconWindowMaximize />
        )}
      </button>
    </div>
  );
}
