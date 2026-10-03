import {
  autoUpdate,
  FloatingPortal,
  flip,
  offset,
  shift,
  useFloating
} from "@floating-ui/react";
import { IconRightArrow } from "assets/icons";
import type { SubmenuConfig } from "domains/app/interface";
import { useWindowsStore } from "domains/window/store";
import { useState } from "react";
import { useMenuBar } from "../../../menu/MenuBarContext";
import { SubmenuGroup } from "../submenu-group/SubmenuGroup";
import * as styles from "./Submenus.css";

function SubmenuRow({ item }: { item: SubmenuConfig }) {
  const { closeMenus, openSettings, menuChoices, setMenuChoice } = useMenuBar();
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "right-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(-2), flip(), shift({ padding: 8, crossAxis: true })]
  });
  const checked = item.choice
    ? (menuChoices[item.choice.group] ?? item.choice.defaultValue) ===
      item.choice.value
    : item.checked;
  const run = () => {
    const { windows, focusedWindowID, actions } = useWindowsStore.getState();
    const focusedWindow = windows.find(
      (window) => window.id === focusedWindowID
    );
    if (item.children) {
      setOpen(!open);
      return;
    }
    if (item.choice) setMenuChoice(item.choice.group, item.choice.value);
    if (item.action === "settings") openSettings("Display");
    if (item.action === "new-window") {
      actions.createAppWindow(item.appID ?? "Finder");
      const created = useWindowsStore.getState().windows.at(-1);
      if (created) actions.setFocusedWindowID(created.id);
    }
    if (item.action === "close-window" && focusedWindow)
      actions.deleteWindow(focusedWindow.id);
    if (item.action === "show-desktop") actions.setFocusedWindowID(null);
    if (item.action === "bring-to-front") {
      const last = useWindowsStore.getState().windows.at(-1);
      if (last) actions.setFocusedWindowID(last.id);
    }
    if (item.action === "zoom" && focusedWindow)
      actions.updateWindow(focusedWindow.id, {
        style: {
          x: 20,
          y: 40,
          width: window.innerWidth - 40,
          height: window.innerHeight - 120
        }
      });
    closeMenus();
  };
  return (
    <div
      ref={refs.setReference}
      className={styles.row}
      onMouseEnter={() => {
        if (item.children) setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        {...(item.choice || item.checked !== undefined
          ? { role: "menuitemradio" as const, "aria-checked": !!checked }
          : { role: "menuitem" as const })}
        aria-haspopup={item.children ? "menu" : undefined}
        aria-expanded={item.children ? open : undefined}
        disabled={item.disabled}
        className={styles.submenuButton({ disabled: item.disabled ?? false })}
        onClick={run}
        onKeyDown={(event) => {
          if (item.children && event.key === "ArrowRight") {
            event.preventDefault();
            event.stopPropagation();
            setOpen(true);
            requestAnimationFrame(() =>
              (
                refs.floating.current?.querySelector(
                  "button:not(:disabled)"
                ) as HTMLButtonElement | null
              )?.focus()
            );
          }
        }}
      >
        <span className={styles.check} aria-hidden="true">
          {checked ? "✓" : ""}
        </span>
        <span
          className={styles.submenuText({ disabled: item.disabled ?? false })}
        >
          {item.name}
        </span>
        {item.shortcut && (
          <span className={styles.submenuShortcutText} aria-hidden="true">
            {item.shortcut}
          </span>
        )}
        {item.children && (
          <span className={styles.chevron} aria-hidden="true">
            <IconRightArrow />
          </span>
        )}
      </button>
      {open && item.children && (
        <FloatingPortal
          root={refs.domReference.current?.closest<HTMLElement>(
            "[data-floating-menu]"
          )}
        >
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={styles.nested}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.stopPropagation();
                setOpen(false);
                refs.domReference.current?.querySelector("button")?.focus();
              }
            }}
          >
            <SubmenuGroup submenuGroup={item.children} />
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
export function Submenus({ submenus }: { submenus: SubmenuConfig[] }) {
  return (
    <div className={styles.submenuContainer}>
      {submenus.map((item) => (
        <SubmenuRow key={item.name} item={item} />
      ))}
    </div>
  );
}
