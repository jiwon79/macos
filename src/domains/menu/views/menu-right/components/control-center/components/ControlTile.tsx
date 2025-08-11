import { cn } from "third-parties/classnames";
import {
  tile,
  tileContent,
  tileEnabled,
  tileIcon,
  tileSubtitle,
  tileTitle
} from "./ControlTile.css";

interface ControlTileProps {
  icon: string;
  title: string;
  subtitle?: string;
  enabled: boolean;
  onClick?: () => void;
}

export function ControlTile({
  icon,
  title,
  subtitle,
  enabled,
  onClick
}: ControlTileProps) {
  return (
    <button className={cn(tile, enabled && tileEnabled)} onClick={onClick}>
      <div className={tileIcon}>{icon}</div>
      <div className={tileContent}>
        <div className={tileTitle}>{title}</div>
        {subtitle && <div className={tileSubtitle}>{subtitle}</div>}
      </div>
    </button>
  );
}
