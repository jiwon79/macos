import {
  act,
  cleanup,
  fireEvent,
  render,
  screen
} from "@testing-library/react";
import { useWindowsStore } from "domains/window/store";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Desktop } from "./Desktop";

const { imageStatus } = vi.hoisted(() => ({
  imageStatus: {
    loading: false,
    failed: false,
    retry: vi.fn(),
    continueToDesktop: vi.fn()
  }
}));
vi.mock("../hooks/useDesktopImages", () => ({
  useDesktopImages: () => imageStatus
}));

vi.mock(
  "domains/app/applications/calculator/views/Calculator/Calculator",
  () => ({ Calculator: () => null })
);
vi.mock("./DesktopMenu", () => ({
  DesktopMenu: () => <button type="button">Finder menu</button>
}));
vi.mock("domains/dock/views", () => ({ Dock: () => null }));

const initialState = useWindowsStore.getState();

beforeEach(() => {
  imageStatus.loading = false;
  imageStatus.failed = false;
  useWindowsStore.setState(initialState, true);
  vi.useFakeTimers();
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }))
  );
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(private callback: () => void) {}
      observe() {
        this.callback();
      }
      disconnect() {}
    }
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    bottom: 600,
    right: 900,
    width: 900,
    height: 600,
    toJSON: () => ({})
  });
});

it("measures the desktop after startup images finish loading", () => {
  imageStatus.loading = true;
  const { rerender } = render(<Desktop />);
  expect(screen.getByRole("status").textContent).toContain("Loading desktop");
  expect(useWindowsStore.getState().windowFullscreenArea).toBeNull();
  imageStatus.loading = false;
  rerender(<Desktop />);
  expect(useWindowsStore.getState().windowFullscreenArea).toEqual({
    x: 0,
    y: 0,
    width: 900,
    height: 600
  });
  fireEvent.click(
    screen.getAllByRole("button", { name: "Enter full screen" })[0]
  );
  expect(screen.queryByRole("button", { name: "Exit full screen" })).toBeNull();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("fills the entire desktop, reveals controls at the top edge, and exits through the revealed green button", () => {
  const { container } = render(<Desktop />);
  const desktop = container.firstElementChild as HTMLElement;
  const original = initialState.windows[0].style;
  fireEvent.click(
    screen.getAllByRole("button", { name: "Enter full screen" })[0]
  );

  expect(
    useWindowsStore.getState().windows.find((window) => window.id === "1")
      ?.style
  ).toEqual({ x: 0, y: 0, width: 900, height: 600 });
  expect(screen.queryByRole("button", { name: "Exit full screen" })).toBeNull();
  expect(screen.queryByRole("button", { name: "Finder menu" })).toBeNull();

  // Moving near the title bar is insufficient; the pointer must reach the top edge.
  fireEvent.mouseMove(desktop, { clientY: 30 });
  expect(screen.queryByRole("button", { name: "Exit full screen" })).toBeNull();
  fireEvent.mouseMove(desktop, { clientY: 1 });
  const exit = screen.getByRole("button", { name: "Exit full screen" });
  expect(screen.getByRole("button", { name: "Finder menu" })).toBeTruthy();

  fireEvent.mouseMove(exit, { clientY: 38 });
  act(() => vi.advanceTimersByTime(500));
  expect(screen.getByRole("button", { name: "Exit full screen" })).toBe(exit);
  fireEvent.click(exit);
  expect(
    useWindowsStore.getState().windows.find((window) => window.id === "1")
      ?.style
  ).toEqual(original);
  expect(screen.getByRole("button", { name: "Finder menu" })).toBeTruthy();
});

it("hides chrome after leaving it, cancels a pending hide on return, and starts hidden on re-entry", () => {
  const { container } = render(<Desktop />);
  const desktop = container.firstElementChild as HTMLElement;
  fireEvent.click(
    screen.getAllByRole("button", { name: "Enter full screen" })[0]
  );
  fireEvent.mouseMove(desktop, { clientY: 0 });
  fireEvent.mouseMove(desktop, { clientY: 200 });
  act(() => vi.advanceTimersByTime(100));
  fireEvent.mouseMove(desktop, { clientY: 0 });
  act(() => vi.advanceTimersByTime(300));
  expect(screen.getByRole("button", { name: "Exit full screen" })).toBeTruthy();

  fireEvent.mouseMove(desktop, { clientY: 200 });
  act(() => vi.advanceTimersByTime(250));
  expect(screen.queryByRole("button", { name: "Exit full screen" })).toBeNull();
  fireEvent.mouseMove(desktop, { clientY: 0 });
  fireEvent.click(screen.getByRole("button", { name: "Exit full screen" }));
  fireEvent.click(
    screen
      .getAllByRole("button", { name: "Enter full screen" })
      .at(-1) as HTMLElement
  );
  expect(screen.queryByRole("button", { name: "Exit full screen" })).toBeNull();
  fireEvent.keyDown(window, { key: "Escape" });
  expect(desktop.getAttribute("data-desktop-fullscreen")).toBe("false");
});
