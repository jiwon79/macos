import { IconAirDropEveryone, IconAirDropOnly } from "assets/icons";
import {
  type AirDropMode,
  useMenuRightActions,
  useMenuRightStore
} from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingTextItem } from "../../setting/SettingTextItem";
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
    setAirDropMode(mode === next ? "off" : next);
  };

  return (
    <div className={styles.container}>
      <SettingTitle>AirDrop</SettingTitle>
      <SettingDivider />
      {OPTIONS.map((opt) => (
        <SettingItem
          key={opt.value}
          icon={opt.icon}
          selected={mode === opt.value}
          onClick={() => toggle(opt.value)}
        >
          {opt.label}
        </SettingItem>
      ))}
      <SettingDivider />
      <SettingTextItem>AirDrop Settings...</SettingTextItem>
    </div>
  );
}
