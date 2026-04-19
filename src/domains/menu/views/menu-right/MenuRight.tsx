import { useEffect, useRef, useState } from "react";
import { AirDropSetting } from "./components/airdrop-setting/AirDropSetting";
import { BatterySetting } from "./components/battery-setting/BatterySetting";
import { BluetoothSetting } from "./components/bluetooth-setting/BluetoothSetting";
import { Control } from "./components/control/Control";
import { DisplaySetting } from "./components/display-setting/DisplaySetting";
import { FocusSetting } from "./components/focus-setting/FocusSetting";
import { SoundSetting } from "./components/sound-setting/SoundSetting";
import { WifiSetting } from "./components/wifi-setting/WifiSetting";
import { container } from "./MenuRight.css";

export function MenuRight() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const onSelectedChange = (selected: boolean, name: string) => {
    if (selected) {
      setSelectedItem(name);
    } else {
      setSelectedItem(null);
    }
  };

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
      <BatterySetting
        selected={selectedItem === "battery"}
        onSelectedChange={(selected) => onSelectedChange(selected, "battery")}
      />
      <BluetoothSetting
        selected={selectedItem === "bluetooth"}
        onSelectedChange={(selected) => onSelectedChange(selected, "bluetooth")}
      />
      <AirDropSetting
        selected={selectedItem === "airdrop"}
        onSelectedChange={(selected) => onSelectedChange(selected, "airdrop")}
      />
      <WifiSetting
        selected={selectedItem === "wifi"}
        onSelectedChange={(selected) => onSelectedChange(selected, "wifi")}
      />
      <DisplaySetting
        selected={selectedItem === "display"}
        onSelectedChange={(selected) => onSelectedChange(selected, "display")}
      />
      <SoundSetting
        selected={selectedItem === "sound"}
        onSelectedChange={(selected) => onSelectedChange(selected, "sound")}
      />
      <FocusSetting
        selected={selectedItem === "focus"}
        onSelectedChange={(selected) => onSelectedChange(selected, "focus")}
      />
      <Control
        selected={selectedItem === "control-center"}
        onSelectedChange={(selected) =>
          onSelectedChange(selected, "control-center")
        }
      />
    </div>
  );
}
