import { IconFocus, IconFocusSleep, IconFocusWork } from "assets/icons";
import {
  type FocusDuration,
  useMenuRightActions,
  useMenuRightStore
} from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingTextDepthItem } from "../../setting/SettingTextDepthItem";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./FocusSettingPanel.css";

export function FocusSettingPanel() {
  const mode = useMenuRightStore((state) => state.focus.mode);
  const duration = useMenuRightStore((state) => state.focus.duration);
  const { setFocusMode, setFocusDuration } = useMenuRightActions();

  const isDoNotDisturb = mode === "do_not_disturb";

  const toggleDoNotDisturb = () => {
    if (isDoNotDisturb) {
      setFocusMode(null);
      setFocusDuration(null);
    } else {
      setFocusMode("do_not_disturb");
    }
  };

  const selectDuration = (next: FocusDuration) => {
    setFocusMode("do_not_disturb");
    setFocusDuration(next);
  };

  const toggleMode = (next: "work" | "sleep") => {
    setFocusMode(mode === next ? null : next);
  };

  return (
    <div className={styles.container}>
      <SettingTitle>Focus</SettingTitle>
      <SettingDivider />
      <SettingItem
        icon={<IconFocus />}
        selected={isDoNotDisturb}
        onClick={toggleDoNotDisturb}
      >
        Do Not Disturb
      </SettingItem>
      <SettingTextDepthItem
        selected={isDoNotDisturb && duration === "1_hour"}
        onClick={() => selectDuration("1_hour")}
      >
        For 1 hour
      </SettingTextDepthItem>
      <SettingTextDepthItem
        selected={isDoNotDisturb && duration === "until_morning"}
        onClick={() => selectDuration("until_morning")}
      >
        Until tomorrow morning
      </SettingTextDepthItem>
      <SettingDivider sub />
      <SettingItem
        icon={<IconFocusWork />}
        selected={mode === "work"}
        onClick={() => toggleMode("work")}
      >
        Work
      </SettingItem>
      <SettingItem
        icon={<IconFocusSleep />}
        selected={mode === "sleep"}
        onClick={() => toggleMode("sleep")}
      >
        Sleep
      </SettingItem>
      <SettingDivider />
      <SettingTextItem>Focus Settings...</SettingTextItem>
    </div>
  );
}
