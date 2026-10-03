import { applications } from "domains/app/applications";
import { fitWindowToViewport } from "domains/window/services/fitWindowToViewport";
import { useWindowsAction, useWindowsStore } from "domains/window/store";
import { WindowRenderer } from "domains/window/views/WindowRenderer/WindowRenderer";
import { useViewportSize } from "utils/react/useViewportSize";

export function Windows() {
  const windows = useWindowsStore((state) => state.windows);
  const minimizedWindows = useWindowsStore((state) => state.minimizedWindows);
  const { updateWindow, setWindowRef } = useWindowsAction();
  const viewport = useViewportSize();

  const notMinimizedWindows = windows.filter(
    (window) =>
      !minimizedWindows.some(
        (minimizedWindow) => minimizedWindow.id === window.id
      )
  );

  return (
    <>
      {notMinimizedWindows.map((window) => {
        const app = applications[window.appID];
        const resizable = app?.resizable ?? true;
        // Preserve the preferred geometry when the viewport temporarily shrinks.
        const visibleStyle = fitWindowToViewport(window.style, viewport);

        return (
          <WindowRenderer
            key={window.id}
            ref={(element) => {
              if (element != null) {
                setWindowRef(window.id, element);
              }
            }}
            id={window.id}
            style={visibleStyle}
            resizable={resizable}
            onStyleChange={(style) => {
              updateWindow(window.id, { style });
            }}
          >
            {window.content}
          </WindowRenderer>
        );
      })}
    </>
  );
}
