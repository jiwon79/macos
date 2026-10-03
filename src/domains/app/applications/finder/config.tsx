import { IconAppFinder } from "assets/app-icons";
import type { AppConfig, SubmenuConfig } from "../../interface";
import { Finder } from "./views/Finder";

const sortOptions: SubmenuConfig[] = [
  "Name",
  "Kind",
  "Date Last Opened",
  "Date Added",
  "Date Modified",
  "Date Created",
  "Size",
  "Tags"
].map((name) => ({
  name,
  choice: { group: "finder-sort", value: name, defaultValue: "Name" }
}));
const viewOptions: SubmenuConfig[] = [
  "as Icons",
  "as List",
  "as Columns",
  "as Gallery"
].map((name, i) => ({
  name,
  shortcut: `⌘${i + 1}`,
  choice: { group: "finder-view", value: name, defaultValue: "as Icons" }
}));
export const finderConfig: AppConfig = {
  id: "Finder",
  icon: IconAppFinder,
  app: () => <Finder />,
  initialStyle: { width: 600, height: 800 },
  menus: [
    {
      name: "Finder",
      submenuGroups: [
        [{ name: "About Finder", disabled: true }],
        [{ name: "Settings…", shortcut: "⌘,", disabled: true }],
        [{ name: "Empty Trash…", shortcut: "⇧⌘⌫", disabled: true }],
        [
          {
            name: "Services",
            children: [[{ name: "No Services Apply", disabled: true }]]
          }
        ],
        [
          { name: "Hide Finder", shortcut: "⌘H", disabled: true },
          { name: "Hide Others", shortcut: "⌥⌘H", disabled: true },
          { name: "Show All", action: "bring-to-front" }
        ]
      ]
    },
    {
      name: "File",
      submenuGroups: [
        [
          { name: "New Finder Window", shortcut: "⌘N", action: "new-window" },
          { name: "New Folder", shortcut: "⇧⌘N", disabled: true },
          {
            name: "New Folder with Selection",
            shortcut: "⌃⌘N",
            disabled: true
          },
          { name: "New Smart Folder", shortcut: "⌥⌘N", disabled: true },
          { name: "New Tab", shortcut: "⌘T", disabled: true }
        ],
        [
          { name: "Open", shortcut: "⌘O", disabled: true },
          { name: "Open With", disabled: true },
          { name: "Close Window", shortcut: "⌘W", action: "close-window" }
        ],
        [{ name: "Get Info", shortcut: "⌘I", disabled: true }],
        [
          { name: "Rename", disabled: true },
          { name: "Compress", disabled: true },
          { name: "Duplicate", shortcut: "⌘D", disabled: true },
          { name: "Make Alias", shortcut: "⌃⌘A", disabled: true },
          { name: "Quick Look", shortcut: "⌘Y", disabled: true },
          { name: "Print", shortcut: "⌘P", disabled: true }
        ],
        [{ name: "Share…", disabled: true }],
        [
          { name: "Move to Trash", shortcut: "⌘⌫", disabled: true },
          { name: "Eject", shortcut: "⌘E", disabled: true }
        ],
        [{ name: "Find", shortcut: "⌘F", disabled: true }]
      ]
    },
    {
      name: "Edit",
      submenuGroups: [
        [
          { name: "Undo", shortcut: "⌘Z", disabled: true },
          { name: "Redo", shortcut: "⇧⌘Z", disabled: true }
        ],
        [
          { name: "Cut", shortcut: "⌘X", disabled: true },
          { name: "Copy", shortcut: "⌘C", disabled: true },
          { name: "Paste", shortcut: "⌘V", disabled: true },
          { name: "Select All", shortcut: "⌘A", disabled: true }
        ],
        [{ name: "Show Clipboard", disabled: true }],
        [
          { name: "Start Dictation…", disabled: true },
          { name: "Emoji & Symbols", shortcut: "⌃⌘Space", disabled: true }
        ]
      ]
    },
    {
      name: "View",
      submenuGroups: [
        viewOptions,
        [
          { name: "Use Stacks", disabled: true },
          { name: "Sort By", children: [sortOptions] },
          { name: "Clean Up", disabled: true },
          { name: "Clean Up By", children: [sortOptions] }
        ],
        [
          { name: "Hide Sidebar", shortcut: "⌃⌘S", disabled: true },
          { name: "Show Preview", shortcut: "⇧⌘P", disabled: true },
          { name: "Hide Toolbar", shortcut: "⌥⌘T", disabled: true },
          { name: "Show All Tabs", shortcut: "⇧⌘\\", disabled: true },
          { name: "Show Tab Bar", shortcut: "⇧⌘T", disabled: true },
          { name: "Show Path Bar", shortcut: "⌥⌘P", disabled: true },
          { name: "Show Status Bar", shortcut: "⌘/", disabled: true }
        ],
        [
          { name: "Show View Options", shortcut: "⌘J", disabled: true },
          { name: "Enter Full Screen", shortcut: "⌃⌘F", disabled: true }
        ]
      ]
    },
    {
      name: "Go",
      submenuGroups: [
        [
          { name: "Back", shortcut: "⌘[", disabled: true },
          { name: "Forward", shortcut: "⌘]", disabled: true },
          { name: "Enclosing Folder", shortcut: "⌘↑", disabled: true }
        ],
        [
          { name: "Recents", shortcut: "⇧⌘F", disabled: true },
          { name: "Documents", shortcut: "⇧⌘O", disabled: true },
          { name: "Desktop", shortcut: "⇧⌘D", disabled: true },
          { name: "Downloads", shortcut: "⌥⌘L", disabled: true },
          { name: "Home", shortcut: "⇧⌘H", disabled: true },
          { name: "Computer", shortcut: "⇧⌘C", disabled: true },
          { name: "AirDrop", shortcut: "⇧⌘R", disabled: true },
          { name: "Network", shortcut: "⇧⌘K", disabled: true },
          { name: "iCloud Drive", shortcut: "⇧⌘I", disabled: true },
          { name: "Applications", shortcut: "⇧⌘A", disabled: true },
          { name: "Utilities", shortcut: "⇧⌘U", disabled: true }
        ],
        [
          {
            name: "Recent Folders",
            children: [
              [
                { name: "Home", disabled: true },
                { name: "Downloads", disabled: true }
              ]
            ]
          }
        ],
        [
          { name: "Go to Folder…", shortcut: "⇧⌘G", disabled: true },
          { name: "Connect to Server…", shortcut: "⌘K", disabled: true }
        ]
      ]
    },
    {
      name: "Window",
      submenuGroups: [
        [
          { name: "Minimize", shortcut: "⌘M", disabled: true },
          { name: "Zoom", action: "zoom" },
          { name: "Move Window to Left Side of Screen", disabled: true },
          { name: "Move Window to Right Side of Screen", disabled: true }
        ],
        [
          { name: "Show Previous Tab", shortcut: "⌃⇧Tab", disabled: true },
          { name: "Show Next Tab", shortcut: "⌃Tab", disabled: true },
          { name: "Move Tab to New Window", disabled: true },
          { name: "Merge All Windows", disabled: true }
        ],
        [{ name: "Bring All to Front", action: "bring-to-front" }]
      ]
    },
    { name: "Help", submenuGroups: [[{ name: "macOS Help", disabled: true }]] }
  ]
};
