import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceCalendar = ({ onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1));

  const attendanceData = {
    '2025-11-01': 'present',
    '2025-11-02': 'absent',
    '2025-11-03': 'present',
    '2025-11-04': 'present',
    '2025-11-05': 'late',
    '2025-11-06': 'present',
    '2025-11-07': 'present',
    '2025-11-08': 'present',
    '2025-11-09': 'absent',
    '2025-11-10': 'present',
    '2025-11-11': 'present',
    '2025-11-12': 'present',
    '2025-11-13': 'late',
    '2025-11-14': 'present',
    '2025-11-15': 'present',
    '2025-11-16': 'absent',
    '2025-11-17': 'present',
    '2025-11-18': 'present',
    '2025-11-19': 'present',
    '2025-11-20': 'late',
    '2025-11-21': 'present',
    '2025-11-22': 'present',
    '2025-11-23': 'absent',
    '2025-11-24': 'present',
    '2025-11-25': 'present',
    '2025-11-26': 'present',
    '2025-11-27': 'late',
    '2025-11-28': 'present',
    '2025-11-29': 'present'
  };

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const formatDate = (day) => {
    const year = currentMonth?.getFullYear();
    const month = String(currentMonth?.getMonth() + 1)?.padStart(2, '0');
    const dayStr = String(day)?.padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success/20 border-success';
      case 'absent':
        return 'bg-error/20 border-error';
      case 'late':
        return 'bg-warning/20 border-warning';
      default:
        return 'bg-muted border-border';
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Previous month"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Next month"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames?.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startingDayOfWeek })?.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth })?.map((_, index) => {
          const day = index + 1;
          const dateStr = formatDate(day);
          const status = attendanceData?.[dateStr];
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              onClick={() => onDateSelect(dateStr)}
              className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-all hover:scale-105 ${
                getStatusColor(status)
              } ${isSelected ? 'ring-2 ring-primary' : ''}`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error" />
            <span className="text-muted-foreground">Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Late</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;