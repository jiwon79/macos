import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { WindowRenderer } from "./WindowRenderer";

vi.mock(
  "domains/app/applications/calculator/views/Calculator/Calculator",
  () => ({ Calculator: () => null })
);

it("preserves app content while maximize disables and restores resize handles", () => {
  const onStyleChange = vi.fn();
  const view = (maximized: boolean, fullscreen = false) => (
    <WindowRenderer
      id="1"
      style={{ x: 10, y: 100, width: 200, height: 150 }}
      maximized={maximized}
      fullscreen={fullscreen}
      onStyleChange={onStyleChange}
    >
      <input aria-label="Document title" defaultValue="Draft" />
    </WindowRenderer>
  );

  const { rerender } = render(view(false));
  const input = screen.getByRole("textbox") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "Edited document" } });

  rerender(view(true));
  expect(screen.getByRole("textbox")).toBe(input);
  expect(input.value).toBe("Edited document");

  rerender(view(true, true));
  expect(screen.getByRole("textbox")).toBe(input);
  expect(input.value).toBe("Edited document");

  rerender(view(true, false));
  expect(screen.getByRole("textbox")).toBe(input);

  rerender(view(false));
  expect(screen.getByRole("textbox")).toBe(input);
  expect(input.value).toBe("Edited document");
});
