import { useLayoutEffect, useRef } from "react";
import { displayContainer, displayText, measuredText } from "./Calculator.css";

const MAX_FONT_SIZE = 24;
const MIN_FONT_SIZE = 12;

export function CalculatorDisplay({ value }: { value: string }) {
  const viewportRef = useRef<HTMLOutputElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const text = textRef.current;
    if (!viewport || !text) return;

    const fitDisplay = () => {
      text.style.fontSize = `${MAX_FONT_SIZE}px`;
      const width = value ? text.getBoundingClientRect().width : 0;
      // Leave a pixel for fractional glyph metrics after scaling the font.
      const availableWidth = Math.max(0, viewport.clientWidth - 1);
      if (width > 0 && availableWidth > 0) {
        let size = Math.max(
          MIN_FONT_SIZE,
          Math.min(MAX_FONT_SIZE, (MAX_FONT_SIZE * availableWidth) / width)
        );
        size = Math.floor(size * 10) / 10;
        text.style.fontSize = `${size}px`;
        // Glyph widths can round differently at the smaller font size.
        while (
          size > MIN_FONT_SIZE &&
          text.getBoundingClientRect().width > availableWidth
        ) {
          size = Math.max(MIN_FONT_SIZE, Math.round((size - 0.1) * 10) / 10);
          text.style.fontSize = `${size}px`;
        }
      }
      // Keep the newest digits visible when the complete input cannot fit.
      viewport.scrollLeft = viewport.scrollWidth;
    };

    fitDisplay();
    const observer = new ResizeObserver(fitDisplay);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [value]);

  return (
    <output
      ref={viewportRef}
      className={displayContainer}
      aria-label="Calculator display"
      title={value}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: Focus enables keyboard scrolling through long, read-only results.
      tabIndex={0}
      onMouseDown={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
    >
      <span className={displayText}>
        <span ref={textRef} className={measuredText}>
          {value}
        </span>
      </span>
    </output>
  );
}
