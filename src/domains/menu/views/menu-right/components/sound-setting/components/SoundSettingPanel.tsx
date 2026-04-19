import { IconDeviceSpeaker, IconSound, IconSoundMute } from "assets/icons";
import { useMenuRightActions, useMenuRightStore } from "../../../store";
import { ControlSlider } from "../../control/components/ControlSlider";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingTextItem } from "../../setting/SettingTextItem";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./SoundSettingPanel.css";

const OUTPUT_OPTIONS = ["MacBook Pro Speakers", "AirPods Pro"];

export function SoundSettingPanel() {
  const volume = useMenuRightStore((state) => state.sound.volume);
  const muted = useMenuRightStore((state) => state.sound.muted);
  const selectedOutput = useMenuRightStore((state) => state.sound.output);
  const { setSoundVolume, setSoundOutput } = useMenuRightActions();

  return (
    <div className={styles.container}>
      <SettingTitle>Sound</SettingTitle>
      <div className={styles.sliderRow}>
        <ControlSlider
          icon={muted ? <IconSoundMute /> : <IconSound />}
          value={volume}
          onChange={setSoundVolume}
        />
      </div>
      <SettingDivider />
      <SettingSubTitle>Output</SettingSubTitle>
      {OUTPUT_OPTIONS.map((output) => (
        <SettingItem
          key={output}
          icon={<IconDeviceSpeaker />}
          selected={selectedOutput === output}
          onClick={() => setSoundOutput(output)}
        >
          {output}
        </SettingItem>
      ))}
      <SettingDivider />
      <SettingTextItem>Sound Settings...</SettingTextItem>
    </div>
  );
}
