import * as styles from "./SettingDivider.css";

interface SettingDividerProps {
  sub?: boolean;
}

export function SettingDivider({ sub = false }: SettingDividerProps = {}) {
  return (
    <div className={styles.container({ sub })}>
      <hr className={styles.divider} />
    </div>
  );
}
