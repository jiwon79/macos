import {
  type SettingsPanelName,
  useMenuBar
} from "../../../menu/MenuBarContext";
import { SettingTextItem } from "./SettingTextItem";

export function SettingsLink({ panel }: { panel: SettingsPanelName }) {
  const { openSettings, settingsPanel } = useMenuBar();
  if (settingsPanel) return null;
  return (
    <SettingTextItem onClick={() => openSettings(panel)}>
      {panel} Settings…
    </SettingTextItem>
  );
}
