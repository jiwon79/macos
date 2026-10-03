export interface Window {
  id: string;
  appID: string;
  content: React.ReactNode;
  style: WindowStyle;
  /** Original bounds while the title-bar zoom is active. */
  restoreStyle?: WindowStyle;
  /** Bounds to restore on leaving full screen; independent of title-bar zoom. */
  fullscreenRestoreStyle?: WindowStyle;
}

export interface WindowStyle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MinimizedWindow {
  id: string;
  appID: string;
  imageData: ImageData;
  window: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  target: {
    x: number;
    y: number;
  };
}
