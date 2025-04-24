import { Info, Clock } from 'lucide-react';

const CalendarDays = ({ currentDate, publicUpdates, reminders, holidays, handleDateClick }) => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const period = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = formatDateKey(year, month, day);
    const publicRemindersForDate = publicUpdates[dateString] || [];
    const privateRemindersForDate = reminders[dateString] || [];
    const allReminders = [...publicRemindersForDate, ...privateRemindersForDate];
    const holidayName = holidays[dateString];
    const hasPublicReminders = Array.isArray(publicRemindersForDate) && publicRemindersForDate.length > 0;
    
    days.push(
      <div 
        key={day} 
        className={`h-24 border border-gray-200 p-2 transition-all cursor-pointer relative
          ${new Date(year, month, day).toDateString() === new Date().toDateString() ? 'bg-blue-100' : ''}
          ${holidayName ? 'bg-red-100 text-red-700 font-bold hover:bg-red-200' : 
            hasPublicReminders ? 'bg-green-100 text-yellow-800 hover:bg-green-200' : 'hover:bg-blue-50'}
        `}
        onClick={() => handleDateClick(day)}
      >
        <div className="flex justify-between">
          <span className="font-medium">{day}</span>
          {holidayName && (
            <div className="absolute bottom-2 left-2 text-[14px] text-red-700 truncate max-w-[90%]">
              {holidayName}
            </div>
          )}
          {allReminders.length > 0 && (
            <span className="inline-flex items-center justify-center bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5">
              {allReminders.length}
            </span>
          )}
        </div>
        
        {!holidayName && allReminders.length > 0 && (
          <div className="mt-1 overflow-hidden max-h-16">
            {allReminders.slice(0, 2).map((reminder, index) => {
              const isPublic = publicUpdates[dateString]?.some(
                pub => pub.text === reminder.text && pub.time === reminder.time
              );

              return (
                <div
                  key={index}
                  className={`text-xs truncate p-1 my-1 rounded flex items-center ${
                    isPublic
                      ? 'bg-green-100 text-blue-800'
                      : 'bg-blue-50 text-gray-600'
                  }`}
                  title={reminder.note ? `${reminder.text}\n\nNote: ${reminder.note}` : reminder.text}
                >
                  {reminder.time && (
                    <div className="flex items-center">
                      <Clock size={10} className="mr-1 flex-shrink-0" />
                      <span className="font-medium mr-1">{formatTime(reminder.time)}</span>
                    </div>
                  )}
                  <span className="truncate">{reminder.text}</span>
                  {reminder.note && (
                    <span className="ml-1 text-gray-500" title={reminder.note}>
                      <Info size={10} />
                    </span>
                  )}
                </div>
              );
            })}

            {allReminders.length > 2 && (
              <div className="text-xs text-gray-500">+{allReminders.length - 2} more</div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  return days;
};

export default CalendarDays;