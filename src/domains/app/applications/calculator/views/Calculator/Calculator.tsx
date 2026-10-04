import { Window } from "domains/window/views";
import { useCalculator } from "../../hooks";
import { KeypadWrapper } from "../KeypadWrapper";
import { calcThemeClass } from "../theme.css";
import { movableArea } from "./Calculator.css";
import { CalculatorDisplay } from "./CalculatorDisplay";

export function Calculator() {
  const { display, ...handlers } = useCalculator();

  return (
    <Window className={calcThemeClass}>
      <Window.MovableArea className={movableArea}>
        <Window.Control size="withTitle" />
        <CalculatorDisplay value={display} />
      </Window.MovableArea>
      <KeypadWrapper {...handlers} />
    </Window>
  );
}
