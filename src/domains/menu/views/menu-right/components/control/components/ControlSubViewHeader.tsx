import { IconRightArrow } from "assets/icons";
import * as styles from "./ControlSubViewHeader.css";

interface ControlSubViewHeaderProps {
  title: string;
  onBack: () => void;
}

export function ControlSubViewHeader({
  title,
  onBack
}: ControlSubViewHeaderProps) {
  return (
    <button type="button" className={styles.header} onClick={onBack}>
      <span className={styles.backIcon}>
        <IconRightArrow />
      </span>
      <span className={styles.title}>{title}</span>
    </button>
  );
}
