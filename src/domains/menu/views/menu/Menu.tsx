import type { MenuConfig } from "domains/app/interface";
import { MenuLeft } from "../menu-left";
import { MenuRight } from "../menu-right";
import {
  backgroundBlur,
  backgroundColorBurn,
  container,
  menuContainer
} from "./Menu.css";

interface MenuProps {
  menus: MenuConfig[];
}

export function Menu({ menus }: MenuProps) {
  return (
    <div
      className={container}
      onMouseDownCapture={(event) => event.stopPropagation()}
    >
      <div className={menuContainer}>
        <MenuLeft menus={menus} />
        <MenuRight />
      </div>
      <div className={backgroundBlur} />
      <div className={backgroundColorBurn} />
    </div>
  );
}
