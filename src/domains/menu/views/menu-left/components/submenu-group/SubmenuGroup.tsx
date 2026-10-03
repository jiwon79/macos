import type { SubmenuConfig } from "domains/app/interface";
import { Fragment } from "react/jsx-runtime";
import { SubmenuDivider } from "../submenu-divider";
import { Submenus } from "../submenus";
import { container } from "./SubmenuGroup.css";

interface SubMenusProps {
  submenuGroup: SubmenuConfig[][];
}

export function SubmenuGroup({ submenuGroup }: SubMenusProps) {
  return (
    <div
      className={container}
      role="menu"
      onKeyDown={(event) => {
        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
          return;
        const buttons = [
          ...event.currentTarget.querySelectorAll<HTMLButtonElement>(
            "button:not(:disabled)"
          )
        ].filter(
          (button) => button.closest('[role="menu"]') === event.currentTarget
        );
        if (!buttons.length) return;
        event.preventDefault();
        event.stopPropagation();
        const index = buttons.indexOf(
          document.activeElement as HTMLButtonElement
        );
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? buttons.length - 1
              : (index + (event.key === "ArrowUp" ? -1 : 1) + buttons.length) %
                buttons.length;
        buttons[next].focus();
      }}
    >
      {submenuGroup.map((submenus, index) => (
        <Fragment key={index}>
          <Submenus submenus={submenus} />
          {index !== submenuGroup.length - 1 && <SubmenuDivider />}
        </Fragment>
      ))}
    </div>
  );
}
