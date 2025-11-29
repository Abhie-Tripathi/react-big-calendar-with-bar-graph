import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from 'react-redux';
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from "date-fns/locale/en-US";
import {
  formatDateKey,
  selectCalendarState,
  selectDate,
} from "./features/calendarSlice";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function App() {
  const dispatch = useDispatch();
  const { events, rawDateData, selectedDate} =
    useSelector(selectCalendarState);

  const onSelectSlot = ({ start }) => {
    dispatch(selectDate(start));
  };

  const onSelectEvent = (event) => {
    dispatch(selectDate(event.start));
  };

  const dayPropGetter = (date) => {
    const key = formatDateKey(date);
    const hasData = !!rawDateData[key];
    const isSelected =
      selectedDate && formatDateKey(selectedDate) === formatDateKey(date);

    const baseStyle = {
      transition: "background-color 0.2s ease, border-color 0.2s ease",
      cursor: "pointer",
    };

    if (isSelected) {
      return {
        style: {
          ...baseStyle,
          backgroundColor: "#e0f2fe",
          border: "2px solid #0284c7",
        },
      };
    }

    if (hasData) {
      return {
        style: {
          ...baseStyle,
          backgroundColor: "#fef3c7",
          border: "1px solid #facc15",
        },
      };
    }

    return { style: baseStyle };
  };

  const eventPropGetter = () => ({
    style: {
      backgroundColor: "#4f46e5",
      borderRadius: "6px",
      border: "none",
    },
  });

  return (
    <div className="app-root">
      <main className="app-main">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable
          views={["month", "week", "day"]}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
          dayPropGetter={dayPropGetter}
          eventPropGetter={eventPropGetter}
        />
      </main>

    </div>
  );
}
