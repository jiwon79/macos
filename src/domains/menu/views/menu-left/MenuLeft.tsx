import type { MenuConfig } from "domains/app/interface";
import { useMenuBar } from "../menu/MenuBarContext";
import { MenuAppleLogo } from "./components";
import { MenuItem } from "./components/menu-item";
import { container } from "./MenuLeft.css";

export function MenuLeft({ menus }: { menus: MenuConfig[] }) {
  const { activeMenu, selectMenu } = useMenuBar();
  const appMenuFocused = activeMenu?.startsWith("app:") ?? false;
  return (
    <div className={container} data-menu-leading>
      <MenuAppleLogo
        focused={appMenuFocused}
        selected={activeMenu === "app:Apple"}
        onSelectedChange={(open) => selectMenu("app:Apple", open)}
      />
      {menus.map((menu, index) => (
        <MenuItem
          key={menu.name}
          type={index === 0 ? "text-bold" : "text"}
          menu={menu}
          focused={appMenuFocused}
          selected={activeMenu === `app:${menu.name}`}
          onSelectedChange={(open) => selectMenu(`app:${menu.name}`, open)}
        />
      ))}
    </div>
  );
}
