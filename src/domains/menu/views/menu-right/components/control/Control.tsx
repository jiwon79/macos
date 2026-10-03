import { StatusMenu, type StatusMenuProps } from "../StatusMenu";
import { ControlPanel } from "./components/ControlPanel";

export function Control(props: StatusMenuProps) {
  return (
    <StatusMenu
      {...props}
      label="Control Center"
      glassSurface={false}
      alignToScreenEdge
      icon={
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="2"
            y="3"
            width="14"
            height="5"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="5" cy="5.5" r="1.6" fill="currentColor" />
          <rect
            x="2"
            y="10"
            width="14"
            height="5"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="13" cy="12.5" r="1.6" fill="currentColor" />
        </svg>
      }
    >
      <ControlPanel />
    </StatusMenu>
  );
}
