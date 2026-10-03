import type { MenuConfig } from "domains/app/interface";

export const menuAppleconfig: MenuConfig = {
  name: "Apple",
  submenuGroups: [
    [{ name: "About This Mac", disabled: true }],
    [
      { name: "System Settings…", action: "settings" },
      { name: "App Store…", disabled: true }
    ],
    [
      {
        name: "Recent Items",
        children: [
          [
            { name: "Applications", disabled: true },
            { name: "Calculator", action: "new-window", appID: "calculator" },
            { name: "Finder", action: "new-window" }
          ],
          [{ name: "Clear Menu", disabled: true }]
        ]
      }
    ],
    [{ name: "Force Quit…", shortcut: "⌥⌘⎋", disabled: true }],
    [
      { name: "Sleep", disabled: true },
      { name: "Restart…", disabled: true },
      { name: "Shut Down…", disabled: true }
    ],
    [
      { name: "Lock Screen", shortcut: "⌃⌘Q", disabled: true },
      { name: "Log Out…", shortcut: "⇧⌘Q", disabled: true }
    ]
  ]
};
