import {
  IconAirDropEveryone,
  IconAirDropOnly,
  IconDevicePc,
  IconDeviceTv,
  IconFocus,
  IconFocusSleep,
  IconFocusWork,
  IconSound,
  IconSoundMute
} from "assets/icons";
import {
  type AirDropMode,
  useMenuRightActions,
  useMenuRightStore
} from "../../../store";
import { BluetoothDevices } from "../../bluetooth-setting/components/BluetoothSettingPanel";
import { DisplaySettingPanel } from "../../display-setting/components/DisplaySettingPanel";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingTextDepthItem } from "../../setting/SettingTextDepthItem";
import { SoundOutputs } from "../../sound-setting/components/SoundSettingPanel";
import { WifiNetworks } from "../../wifi-setting/components/WifiSettingPanel";
import { ControlSlider } from "./ControlSlider";

const SCREEN_MIRROR_DEVICES = [
  { name: "Living Room TV", icon: <IconDeviceTv /> },
  { name: "Office Mac", icon: <IconDevicePc /> }
];

const AIRDROP_OPTIONS: {
  value: Exclude<AirDropMode, "off">;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "contacts_only", label: "Contacts Only", icon: <IconAirDropOnly /> },
  { value: "everyone", label: "Everyone", icon: <IconAirDropEveryone /> }
];

export function WifiSubView() {
  return (
    <>
      <SettingSubTitle>Known Networks</SettingSubTitle>
      <WifiNetworks />
    </>
  );
}
export function BluetoothSubView() {
  return <BluetoothDevices />;
}

export function AirDropSubView() {
  const mode = useMenuRightStore((state) => state.airdrop.mode);
  const { setAirDropMode } = useMenuRightActions();

  const toggle = (next: Exclude<AirDropMode, "off">) =>
    setAirDropMode(mode === next ? "off" : next);

  return (
    <>
      {AIRDROP_OPTIONS.map((opt) => (
        <SettingItem
          key={opt.value}
          icon={opt.icon}
          selected={mode === opt.value}
          onClick={() => toggle(opt.value)}
        >
          {opt.label}
        </SettingItem>
      ))}
    </>
  );
}

export function FocusSubView() {
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

  const selectDuration = (next: "1_hour" | "until_morning") => {
    setFocusMode("do_not_disturb");
    setFocusDuration(next);
  };

  const toggleMode = (next: "work" | "sleep") => {
    setFocusMode(mode === next ? null : next);
  };

  return (
    <>
      <SettingItem
        icon={<IconFocus />}
        selected={isDoNotDisturb}
        onClick={toggleDoNotDisturb}
      >
        Do Not Disturb
      </SettingItem>
      {isDoNotDisturb && (
        <>
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
        </>
      )}
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
    </>
  );
}

export function DisplaySubView() {
  return <DisplaySettingPanel embedded />;
}

export function SoundSubView() {
  const volume = useMenuRightStore((state) => state.sound.volume);
  const muted = useMenuRightStore((state) => state.sound.muted);
  const { setSoundVolume } = useMenuRightActions();

  return (
    <>
      <div style={{ padding: "0 10px 10px" }}>
        <ControlSlider
          label="Sound volume"
          icon={muted ? <IconSoundMute /> : <IconSound />}
          value={volume}
          onChange={setSoundVolume}
        />
      </div>
      <SettingSubTitle>Output</SettingSubTitle>
      <SoundOutputs />
    </>
  );
}

export function ScreenMirroringSubView() {
  return (
    <>
      <SettingSubTitle>Mirror or extend to</SettingSubTitle>
      {SCREEN_MIRROR_DEVICES.map((device) => (
        <SettingItem key={device.name} icon={device.icon}>
          {device.name}
        </SettingItem>
      ))}
    </>
  );
}

export const SUB_VIEW_TITLES = {
  wifi: "Wi-Fi",
  bluetooth: "Bluetooth",
  airdrop: "AirDrop",
  focus: "Focus",
  display: "Display",
  sound: "Sound",
  "screen-mirroring": "Screen Mirroring"
} as const;

export type SubViewName = keyof typeof SUB_VIEW_TITLES;
