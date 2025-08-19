import { style } from "@vanilla-extract/css";
import { settingPanel } from "../../styles/panel.css";

export const container = style([
  settingPanel,
  {
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,

    padding: 5
  }
]);

export const wifiToggle = style({
  marginBottom: 12
});

export const toggleContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 12px"
});

export const toggleLabel = style({
  fontSize: 16,
  fontWeight: 600
});

export const toggleSwitch = style({
  position: "relative",
  width: 44,
  height: 24,
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.2s ease"
});

export const toggleSlider = style({
  position: "absolute",
  top: 2,
  left: 2,
  width: 20,
  height: 20,
  backgroundColor: "white",
  borderRadius: "50%",
  transition: "transform 0.2s ease"
});

export const section = style({
  marginBottom: 8
});

export const sectionTitle = style({
  fontSize: 13,
  color: "rgba(255, 255, 255, 0.6)",
  marginBottom: 4,
  padding: "0 12px"
});

export const networkList = style({
  display: "flex",
  flexDirection: "column"
});

export const expandButton = style({
  width: "100%",
  background: "none",
  border: "none",
  color: "white",
  fontSize: 14,
  textAlign: "left",
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: 6,

  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
});

export const settingsButton = style({
  width: "100%",
  background: "none",
  border: "none",
  color: "#007AFF",
  fontSize: 14,
  textAlign: "left",
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: 6,
  marginTop: 8,

  ":hover": {
    backgroundColor: "rgba(0, 122, 255, 0.1)"
  }
});
