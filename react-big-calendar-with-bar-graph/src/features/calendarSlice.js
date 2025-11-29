import { createSlice } from '@reduxjs/toolkit';
import { parse } from 'date-fns';

const rawDateData = {
  '01-11-2025': [
    { user: 'user_1', value: 1 },
    { user: 'user_2', value: 2 },
    { user: 'user_3', value: 3 },
    { user: 'user_4', value: 4 },
  ],
  '02-11-2025': [
    { user: 'user_1', value: 2 },
    { user: 'user_2', value: 4 },
    { user: 'user_3', value: 1 },
    { user: 'user_4', value: 3 },
  ],
  '03-11-2025': [
    { user: 'user_1', value: 5 },
    { user: 'user_2', value: 1 },
    { user: 'user_3', value: 2 },
    { user: 'user_4', value: 2 },
  ],
  '04-11-2025': [
    { user: 'user_1', value: 3 },
    { user: 'user_2', value: 2 },
    { user: 'user_3', value: 4 },
    { user: 'user_4', value: 1 },
  ],
};

export const DATE_FORMAT = 'dd-MM-yyyy';

function parseKeyToDate(key) {
  return parse(key, DATE_FORMAT, new Date());
}

function buildEventsFromRawData(raw) {
  const events = [];
  Object.entries(raw).forEach(([dateKey, values]) => {
    const start = parseKeyToDate(dateKey);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    const total = values.reduce((sum, item) => sum + item.value, 0);

    events.push({
      id: dateKey,
      title: `Total: ${total}`,
      start,
      end,
      allDay: true,
    });
  });
  return events;
}

const initialState = {
  rawDateData,
  events: buildEventsFromRawData(rawDateData),
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    selectDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
});

export const { selectDate, closeModal } = calendarSlice.actions;

export const selectCalendarState = (state) => state.calendar;

export const selectHasDataForDate = (state, date) => {
  if (!date) return false;
  const key = formatDateKey(date);
  return Boolean(state.calendar.rawDateData[key]);
};

export function formatDateKey(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function getDataForDate(rawData, date) {
  if (!date) return null;
  const key = formatDateKey(date);
  return rawData[key] || null;
}

export default calendarSlice.reducer;
