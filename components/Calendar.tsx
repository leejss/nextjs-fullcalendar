import FullCalendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import React from "react";
import styles from "./Calendar.module.scss";
import { add } from "date-fns";

interface CalendarProps {
  weeks: number;
  height?: number;
}

const Calendar: React.FC<CalendarProps> = ({ weeks, height }) => {
  const [mounted, setMounted] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  React.useEffect(() => {
    // This code is for handling react hydration error
    // https://nextjs.org/docs/messages/react-hydration-error
    setMounted(true);
  }, []);

  const renderCalendar = () => {
    return new Array(weeks).fill(0).map((_, index) => {
      return (
        <div key={`fullcalendar-${index}`} className={styles.CalendarWrapper}>
          <FullCalendar
            plugins={[dayGrid]}
            initialView="dayGrid"
            headerToolbar={{
              start: "",
              center: "",
              end: "",
            }}
            initialDate={add(currentDate, { weeks: index })}
            height={height ?? 150}
            duration={{
              weeks: 1,
            }}
          />
        </div>
      );
    });
  };

  return <div className={styles.Container}>{mounted && renderCalendar()}</div>;
};

export default Calendar;
