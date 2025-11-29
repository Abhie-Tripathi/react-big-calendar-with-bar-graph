import React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import '../App.css';

export function DataModal({ isOpen, onClose, selectedDate, data }) {
  if (!isOpen) return null;

  const formattedDate = selectedDate
    ? format(selectedDate, 'dd-MM-yyyy')
    : 'N/A';

  const hasData = Array.isArray(data) && data.length > 0;

  const chartData = hasData
    ? data.map((entry) => ({
        name: entry.user,
        value: entry.value,
      }))
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className="modal-header">
          <h2>Data for {formattedDate}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="modal-body">
          {hasData ? (
            <>
              <p className="modal-subtitle">
                Values per user for this date.
              </p>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="no-data">
              <p className="no-data-title">No data found for the selected date.</p>
              <p className="no-data-subtitle">
                Selected date: <strong>{formattedDate}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


