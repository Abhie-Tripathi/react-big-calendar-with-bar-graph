### Behavior

- Month, week, and day views are available.
- Dates that have data are highlighted.
- Clicking a date opens a popup.
- If data exists for that date, a bar chart is shown.
- If there is no data, the popup displays: **“No data found for the selected date.”** and the chosen date.


---

### Dummy Data

The data is defined in `src/features/calendarSlice.js` using keys in the format `dd-MM-yyyy`, for example:

```js
const rawDateData = {
  '01-11-2025': [
    { user: 'user_1', value: 1 },
    { user: 'user_2', value: 2 },
    { user: 'user_3', value: 3 },
    { user: 'user_4', value: 4 },
  ],
};
```

You can adjust or extend this object as needed.

---

### Setup

From the project root:

```bash
npm install
```

---

### Run in Development

```bash
npm run dev
```

Open the URL printed in the terminal (by default `http://localhost:5173`).

---

### Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---