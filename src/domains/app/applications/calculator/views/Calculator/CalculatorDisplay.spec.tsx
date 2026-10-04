import { act, cleanup, render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { CalculatorDisplay } from "./CalculatorDisplay";

let viewportWidth: number;
let observers: { resize: () => void; disconnect: ReturnType<typeof vi.fn> }[];

beforeEach(() => {
  viewportWidth = 216;
  observers = [];
  vi.stubGlobal(
    "ResizeObserver",
    class {
      disconnect = vi.fn();
      constructor(public resize: () => void) {
        observers.push(this);
      }
      observe() {}
    }
  );
  // jsdom has no text layout; model glyph widths and the available display area.
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(
    () => viewportWidth
  );
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      return new DOMRect(
        0,
        0,
        (this.textContent?.length ?? 0) *
          Number.parseFloat(this.style.fontSize) *
          0.6,
        36
      );
    }
  );
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(
    function (this: HTMLElement) {
      const text = this.querySelector("span span");
      return Math.max(viewportWidth, text?.getBoundingClientRect().width ?? 0);
    }
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function display() {
  const output = screen.getByRole("status", { name: "Calculator display" });
  const text = output.querySelector("span span") as HTMLSpanElement;
  return { output, text, fontSize: Number.parseFloat(text.style.fontSize) };
}

it("fits a long value and restores the normal size after clearing or blinking", () => {
  const value = "123456789012345678901234";
  const { rerender } = render(<CalculatorDisplay value={value} />);
  expect(display().output.textContent).toBe(value);
  expect(display().fontSize).toBeLessThan(24);
  expect(display().text.getBoundingClientRect().width).toBeLessThanOrEqual(
    viewportWidth
  );

  rerender(<CalculatorDisplay value="" />);
  expect(display().fontSize).toBe(24);
  rerender(<CalculatorDisplay value="0" />);
  expect(display().fontSize).toBe(24);
  expect(display().output.textContent).toBe("0");
});

it("keeps very long signed decimals intact and accessible at a readable minimum size", () => {
  const value = "-12345678901234567890.12345678901234567890";
  render(<CalculatorDisplay value={value} />);
  const { output, fontSize } = display();
  expect(fontSize).toBe(12);
  expect(output.textContent).toBe(value);
  expect(output.getAttribute("title")).toBe(value);
  expect(output.scrollLeft).toBeGreaterThan(viewportWidth);
  output.focus();
  expect(document.activeElement).toBe(output);
});

it("accounts for glyph rounding at smaller font sizes", () => {
  vi.mocked(HTMLElement.prototype.getBoundingClientRect).mockImplementation(
    function (this: HTMLElement) {
      const fontSize = Number.parseFloat(this.style.fontSize);
      return new DOMRect(
        0,
        0,
        (this.textContent?.length ?? 0) * fontSize * 0.6 +
          (fontSize < 24 ? 2 : 0),
        36
      );
    }
  );
  render(<CalculatorDisplay value="123456789012345678901234" />);
  expect(display().text.getBoundingClientRect().width).toBeLessThan(
    viewportWidth
  );
  expect(display().fontSize).toBeGreaterThan(12);
});

it("refits when the available width changes and disconnects observers in StrictMode", () => {
  const { unmount } = render(
    <StrictMode>
      <CalculatorDisplay value="123456789012345678901234" />
    </StrictMode>
  );
  expect(display().fontSize).toBeLessThan(24);
  viewportWidth = 432;
  act(() => observers.at(-1)?.resize());
  expect(display().fontSize).toBe(24);
  unmount();
  for (const observer of observers)
    expect(observer.disconnect).toHaveBeenCalledOnce();
});
