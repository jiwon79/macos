import { IconDevicePc, IconSound, IconSoundMute } from "assets/icons";
import { useMenuRightActions, useMenuRightStore } from "../../../store";
import { ControlSlider } from "../../control/components/ControlSlider";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingsLink } from "../../setting/SettingsLink";
import { SettingTitle } from "../../setting/SettingTitle";
import * as styles from "./SoundSettingPanel.css";

export function SoundOutputs() {
  const enabled = useMenuRightStore((state) => state.bluetooth.enabled);
  const connectedDevices = useMenuRightStore(
    (state) => state.bluetooth.connectedDevices
  );
  const outputs = [
    "MacBook Pro Speakers",
    ...(enabled && connectedDevices.includes("Jiwon's AirPods Pro")
      ? ["AirPods Pro"]
      : [])
  ];
  const selectedOutput = useMenuRightStore((state) => state.sound.output);
  const { setSoundOutput } = useMenuRightActions();
  return outputs.map((output) => (
    <SettingItem
      key={output}
      icon={<IconDevicePc />}
      selected={selectedOutput === output}
      onClick={() => setSoundOutput(output)}
    >
      {output}
    </SettingItem>
  ));
}

export function SoundSettingPanel() {
  const volume = useMenuRightStore((state) => state.sound.volume);
  const muted = useMenuRightStore((state) => state.sound.muted);
  const { setSoundVolume } = useMenuRightActions();

  return (
    <div className={styles.container} data-setting-panel="Sound">
      <SettingTitle>Sound</SettingTitle>
      <div className={styles.sliderRow}>
        <ControlSlider
          label="Sound volume"
          icon={muted ? <IconSoundMute /> : <IconSound />}
          value={volume}
          onChange={setSoundVolume}
        />
      </div>
      <SettingDivider />
      <SettingSubTitle>Output</SettingSubTitle>
      <SoundOutputs />
      <SettingDivider />
      <SettingsLink panel="Sound" />
    </div>
  );
}
