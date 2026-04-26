import {
  IconAirDropEveryone,
  IconAirDropOnly,
  IconBrightness,
  IconDeviceAirPods,
  IconDeviceKeyboard,
  IconDevicePc,
  IconDeviceSpeaker,
  IconDeviceTrackpad,
  IconDeviceTv,
  IconFocus,
  IconFocusSleep,
  IconFocusWork,
  IconSound,
  IconSoundMute,
  IconWifi
} from "assets/icons";
import {
  type AirDropMode,
  useMenuRightActions,
  useMenuRightStore
} from "../../../store";
import { SettingDivider } from "../../setting/SettingDivider";
import { SettingItem } from "../../setting/SettingItem";
import { SettingSubTitle } from "../../setting/SettingSubTitle";
import { SettingTextDepthItem } from "../../setting/SettingTextDepthItem";
import { ControlSlider } from "./ControlSlider";

const KNOWN_NETWORKS = ["Starbucks", "Jiwon's Home", "Jiwon's Home_5G"];

const KNOWN_DEVICES = [
  { name: "Speaker", icon: <IconDeviceSpeaker /> },
  { name: "Jiwon's Magic Keyboard", icon: <IconDeviceKeyboard /> },
  { name: "Jiwon's Magic Trackpad", icon: <IconDeviceTrackpad /> },
  { name: "Jiwon's AirPods Pro", icon: <IconDeviceAirPods /> }
];

const COLOR_PROFILES = [
  "Apple XDR Display (P3-1600 nits)",
  "Apple Display (P3-600 nits)",
  "HDR Video (P3-ST 2084)",
  "HDTV Video (BT.709-BT.1886)",
  "NTSC Video (BT.601 SMPTE-C)",
  "PAL & SECAM Video (BT.601 EBU)",
  "Digital Cinema (P3-DCI)",
  "Digital Cinema (P3-D65)",
  "Design & Print (P3-D50)",
  "Photography (P3-D65)",
  "Internet & Web (sRGB)"
];

const SCREEN_MIRROR_DEVICES = [
  { name: "Living Room TV", icon: <IconDeviceTv /> },
  { name: "Office Mac", icon: <IconDevicePc /> }
];

const SOUND_OUTPUTS = ["MacBook Pro Speakers", "AirPods Pro"];

const AIRDROP_OPTIONS: {
  value: Exclude<AirDropMode, "off">;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "contacts_only", label: "Contacts Only", icon: <IconAirDropOnly /> },
  { value: "everyone", label: "Everyone", icon: <IconAirDropEveryone /> }
];

export function WifiSubView() {
  const selectedSSID = useMenuRightStore((state) => state.wifi.selectedSSID);
  const { setWifiSSID } = useMenuRightActions();

  return (
    <>
      <SettingSubTitle>Known Networks</SettingSubTitle>
      {KNOWN_NETWORKS.map((ssid) => (
        <SettingItem
          key={ssid}
          icon={<IconWifi />}
          selected={selectedSSID === ssid}
          onClick={() => setWifiSSID(ssid)}
        >
          {ssid}
        </SettingItem>
      ))}
    </>
  );
}

export function BluetoothSubView() {
  const connectedDevices = useMenuRightStore(
    (state) => state.bluetooth.connectedDevices
  );

  return (
    <>
      <SettingSubTitle>Devices</SettingSubTitle>
      {KNOWN_DEVICES.map((device) => (
        <SettingItem
          key={device.name}
          icon={device.icon}
          selected={connectedDevices.includes(device.name)}
        >
          {device.name}
        </SettingItem>
      ))}
    </>
  );
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
    </>
  );
}

export function DisplaySubView() {
  const { brightness, colorProfile } = useMenuRightStore(
    (state) => state.display
  );
  const { setDisplayBrightness, setDisplayColorProfile } =
    useMenuRightActions();

  return (
    <>
      <div style={{ padding: "0 10px 10px" }}>
        <ControlSlider
          icon={<IconBrightness />}
          value={brightness}
          onChange={setDisplayBrightness}
        />
      </div>
      <SettingSubTitle>Color Profile</SettingSubTitle>
      {COLOR_PROFILES.map((profile) => (
        <SettingTextDepthItem
          key={profile}
          selected={colorProfile === profile}
          onClick={() => setDisplayColorProfile(profile)}
        >
          {profile}
        </SettingTextDepthItem>
      ))}
    </>
  );
}

export function SoundSubView() {
  const volume = useMenuRightStore((state) => state.sound.volume);
  const muted = useMenuRightStore((state) => state.sound.muted);
  const selectedOutput = useMenuRightStore((state) => state.sound.output);
  const { setSoundVolume, setSoundOutput } = useMenuRightActions();

  return (
    <>
      <div style={{ padding: "0 10px 10px" }}>
        <ControlSlider
          icon={muted ? <IconSoundMute /> : <IconSound />}
          value={volume}
          onChange={setSoundVolume}
        />
      </div>
      <SettingSubTitle>Output</SettingSubTitle>
      {SOUND_OUTPUTS.map((output) => (
        <SettingItem
          key={output}
          icon={<IconDeviceSpeaker />}
          selected={selectedOutput === output}
          onClick={() => setSoundOutput(output)}
        >
          {output}
        </SettingItem>
      ))}
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
