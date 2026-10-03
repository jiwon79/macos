import { IconAirDropEveryone, IconAirDropOnly } from "assets/icons";
import {
  type AirDropMode,
  useMenuRightActions,
  useMenuRightStore
} from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSwitch } from "../../setting/SettingSwitch";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./AirDropSettingPanel.css";

interface AirDropOption {
  value: Exclude<AirDropMode, "off">;
  label: string;
  icon: React.ReactNode;
}

const OPTIONS: AirDropOption[] = [
  { value: "contacts_only", label: "Contacts Only", icon: <IconAirDropOnly /> },
  { value: "everyone", label: "Everyone", icon: <IconAirDropEveryone /> }
];

export function AirDropSettingPanel() {
  const mode = useMenuRightStore((state) => state.airdrop.mode);
  const { setAirDropMode } = useMenuRightActions();

  const toggle = (next: Exclude<AirDropMode, "off">) => {
    setAirDropMode(next);
  };

  return (
    <div className={styles.container} data-setting-panel="AirDrop">
      <SettingTitle
        rightAccessory={
          <SettingSwitch
            label="AirDrop"
            checked={mode !== "off"}
            onChange={(checked) =>
              setAirDropMode(checked ? "contacts_only" : "off")
            }
          />
        }
      >
        AirDrop
      </SettingTitle>
      <SettingDivider />
      {mode !== "off" &&
        OPTIONS.map((opt) => (
          <SettingItem
            key={opt.value}
            icon={opt.icon}
            selected={mode === opt.value}
            onClick={() => toggle(opt.value)}
          >
            {opt.label}
          </SettingItem>
        ))}
    </div>
  );
}
