import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import { DayCellContentArg, DayHeaderContentArg } from "@fullcalendar/common";
import { format, add } from "date-fns";
import { ko } from "date-fns/locale";
import cx from "classnames";
import styles from "./DayGrid.module.scss";

interface DayGridProps {
  height?: number;
  weeks?: number;
}

// Global Style
const DayGrid: React.FC<DayGridProps> = ({ height, weeks = 1 }) => {
  const [mounted, setMounted] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const renderCalendar = () => {
    return new Array(weeks).fill(0).map((_, index) => (
      <div key={`Calendar-${index}`} className="calendarWrapper">
        <FullCalendar
          plugins={[dayGrid]}
          initialView="dayGrid"
          initialDate={add(currentDate, { weeks: index })}
          headerToolbar={false}
          dayHeaderContent={renderDayHeaderContent}
          dayCellContent={renderDayCellContent}
          contentHeight={height ?? 120}
          dayCount={7}
        />
      </div>
    ));
  };
  return (
    <div className="calendarContainer">{mounted ? renderCalendar() : null}</div>
  );
};

export default DayGrid;

function renderDayCellContent(args: DayCellContentArg) {
  const { date, isToday } = args;
  const classNames = cx(isToday && styles.todayCell);
  const day = format(date, "d");
  return <div className={classNames}>{day}</div>;
}

function renderDayHeaderContent(args: DayHeaderContentArg) {
  const { date, isToday } = args;
  const classNames = cx(isToday && styles.todayWeek);
  const week = isToday ? "오늘" : format(date, "E", { locale: ko });
  return <div className={classNames}>{week}</div>;
}
