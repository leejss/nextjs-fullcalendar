import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import {
  DayCellContentArg,
  DayHeaderContentArg,
  EventContentArg,
  EventSourceInput,
} from "@fullcalendar/common";
import { format, add } from "date-fns";
import { ko } from "date-fns/locale";
import cx from "classnames";
import styles from "./DayGrid.module.scss";

interface DayGridProps {
  height?: number;
  weeks?: number;
}

interface EventViewerProps {
  eventInfo: EventContentArg;
}

// Need to be synchronized
const sampleEvent: EventSourceInput = [
  {
    title: "Football",
    date: "2021-12-22",
  },
];

// Global Style
const DayGrid: React.FC<DayGridProps> = ({ height, weeks = 1 }) => {
  const [mounted, setMounted] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [clickedEvent, setClickedEvent] =
    React.useState<EventContentArg | null>(null);

  const renderEventContent = React.useCallback((args: EventContentArg) => {
    return (
      <div
        className="event"
        onClick={() => {
          setClickedEvent(args);
        }}
      />
    );
  }, []);

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
          eventContent={renderEventContent}
          contentHeight={height ?? 120}
          eventBackgroundColor="transparent"
          eventTextColor="#000"
          dayCount={7}
          events={sampleEvent}
        />
      </div>
    ));
  };
  return (
    <div>
      <div className="calendarContainer">
        {mounted ? renderCalendar() : null}
      </div>
      {clickedEvent ? <EventViewer eventInfo={clickedEvent} /> : null}
    </div>
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

// function renderEventContent(args: EventContentArg) {
//   return <div className="event" />;
// }

const EventViewer: React.FC<EventViewerProps> = ({ eventInfo }) => {
  return <div>{eventInfo.event.title}</div>;
};

/**
 * Date click 시 일어나는 로직,
 * 날짜 클릭 시,
 *
 */
