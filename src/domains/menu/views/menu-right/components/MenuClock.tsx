import { useEffect, useState } from "react";
import { cn } from "third-parties/classnames";
import { container as menuBase } from "../../menu-base/MenuBase.css";
import * as styles from "./MenuClock.css";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric"
});
const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true
});

export function MenuClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <time
      className={cn(menuBase({ type: "text", selected: false }), styles.clock)}
      title={now.toLocaleString()}
      dateTime={now.toISOString()}
    >
      <span className={styles.date}>{dateFormat.format(now)}　</span>
      {timeFormat.format(now)}
    </time>
  );
}
