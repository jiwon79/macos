import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useWindowsStore } from "domains/window/store";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { WindowContext } from "../WindowContext";
import { WindowMovableArea } from "./WindowMovableArea";

vi.mock(
  "domains/app/applications/calculator/views/Calculator/Calculator",
  () => ({ Calculator: () => null })
);
const initialState = useWindowsStore.getState();

beforeEach(() => {
  useWindowsStore.setState(initialState, true);
  useWindowsStore
    .getState()
    .actions.setWindowWorkArea({ x: 0, y: 24, width: 1280, height: 539 });
});
afterEach(cleanup);

function renderTitlebar(fullscreen = false) {
  return render(
    <WindowContext.Provider
      value={{
        id: "1",
        style: initialState.windows[0].style,
        onStyleChange: vi.fn(),
        resizable: true,
        maximized: false,
        fullscreen,
        fullscreenChromeVisible: true,
        transitioning: false
      }}
    >
      <WindowMovableArea>
        <span>Document title</span>
        <button type="button">Toolbar action</button>
        <input aria-label="Rename" />
      </WindowMovableArea>
    </WindowContext.Provider>
  );
}

it("zooms and restores on a title double-click, while a single click does not resize", () => {
  renderTitlebar();
  const original = initialState.windows[0].style;
  const current = () =>
    useWindowsStore.getState().windows.find((window) => window.id === "1");
  fireEvent.click(screen.getByText("Document title"));
  expect(current()?.style).toEqual(original);
  fireEvent.doubleClick(screen.getByText("Document title"));
  expect(current()?.restoreStyle).toEqual(original);
  fireEvent.doubleClick(screen.getByText("Document title"));
  expect(current()?.style).toEqual(original);
});

it("does not zoom from interactive controls in the title bar", () => {
  renderTitlebar();
  const state = useWindowsStore.getState();
  fireEvent.doubleClick(screen.getByRole("button"));
  fireEvent.doubleClick(screen.getByRole("textbox"));
  expect(useWindowsStore.getState()).toBe(state);
});

it("ignores title double-clicks in full screen", () => {
  renderTitlebar(true);
  const state = useWindowsStore.getState();
  fireEvent.doubleClick(screen.getByText("Document title"));
  expect(useWindowsStore.getState()).toBe(state);
});
