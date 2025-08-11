import { useEffect, useRef, useState } from "react";
import { ControlCenter, WifiMenu } from "./components";
import { container } from "./MenuRight.css";

export function MenuRight() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const onSelectedChange = (selected: boolean, name: string) => {
    if (selected) {
      // Close other menu if open
      setSelectedItem(name);
    } else {
      setSelectedItem(null);
    }
  };

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className={container}>
      <WifiMenu
        selected={selectedItem === "wifi"}
        onSelectedChange={(selected) => onSelectedChange(selected, "wifi")}
      />
      <ControlCenter
        selected={selectedItem === "control-center"}
        onSelectedChange={(selected) =>
          onSelectedChange(selected, "control-center")
        }
      />
    </div>
  );
}
