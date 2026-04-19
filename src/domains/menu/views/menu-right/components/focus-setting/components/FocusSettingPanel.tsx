import { IconFocus, IconFocusSleep, IconFocusWork } from "assets/icons";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingTextDepthItem } from "../../setting/SettingTextDepthItem";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./FocusSettingPanel.css";

export function FocusSettingPanel() {
  return (
    <div className={styles.container}>
      <SettingTitle>Focus</SettingTitle>
      <SettingDivider />
      <SettingItem icon={<IconFocus />}>Do Not Disturb</SettingItem>
      <SettingTextDepthItem selected>For 1 hour</SettingTextDepthItem>
      <SettingTextDepthItem>Until tomorrow morning</SettingTextDepthItem>
      <SettingDivider sub />
      <SettingItem icon={<IconFocusWork />}>Work</SettingItem>
      <SettingItem icon={<IconFocusSleep />}>Sleep</SettingItem>
      <SettingDivider />
      <SettingTextItem>Focus Settings...</SettingTextItem>
    </div>
  );
}
