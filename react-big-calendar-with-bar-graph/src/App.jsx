import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function App() {

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
          views={['month', 'week', 'day']}
          dayPropGetter={dayPropGetter}
          eventPropGetter={eventPropGetter}
        />
      </main>

    </div>
  );
}


