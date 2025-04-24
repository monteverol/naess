
const WeeklySchedule = ({ holidays, publicUpdates, companySchedule, reminders }) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const period = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mt-4">
      {days.map((day, index) => {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(dayDate.getDate() + index);
        const dateKey = `${dayDate.getFullYear()}-${String(dayDate.getMonth() + 1).padStart(2, '0')}-${String(dayDate.getDate()).padStart(2, '0')}`;
        const isToday = new Date().toDateString() === dayDate.toDateString();

        const isHoliday = holidays[dateKey];
        const overrideHours = publicUpdates[`${dateKey}_hours`] || null;
        const baseSchedule = companySchedule[day.toLowerCase()];
        const displayHours = isHoliday
          ? { start: null, end: null }
          : overrideHours || baseSchedule;
        const isWorkDay = displayHours.start !== null;

        const publicEvents = publicUpdates[dateKey] || [];
        const privateEvents = reminders[dateKey] || [];

        return (
          <div
            key={day}
            className={`p-3 flex items-center justify-between md:block rounded-lg text-sm ${
              isToday ? 'bg-blue-100 border-blue-300 border-2' :
              isHoliday ? 'bg-red-100 border border-red-300 text-red-700' :
              isWorkDay ? 'bg-white border border-gray-200' : 'bg-gray-100 border border-gray-200'
            }`}
          >
            <div className="font-semibold">{day}</div>

            {isHoliday ? (
              <>
                <div className="mt-2 font-medium">{holidays[dateKey]}</div>
                <div className="text-xs text-gray-500">Company Closed</div>
              </>
            ) : isWorkDay ? (
              <>
                <div className="mt-2 text-gray-700">{displayHours.start} - {displayHours.end}</div>
                <div className="text-xs text-gray-500 hidden md:block">Working hours</div>
              </>
            ) : (
              <div className="mt-2 text-sm text-gray-500">Off day</div>
            )}

            {/* Public Reminders */}
            {publicEvents.length > 0 && (
              <div className="mt-2">
                {publicEvents.map((event, idx) => (
                  <div key={idx} className="text-xs bg-yellow-50 text-yellow-800 rounded px-2 py-1 mt-1">
                    📢 {event.time && formatTime(event.time)} – {event.text}
                    {event.note && (
                      <div className="text-[11px] italic text-yellow-700 mt-1">📝 {event.note}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Private Reminders */}
            {privateEvents.length > 0 && (
              <div className="mt-2">
                {privateEvents.map((event, idx) => (
                  <div key={idx} className="text-xs bg-blue-50 text-blue-800 rounded px-2 py-1 mt-1">
                    🔒 {formatTime(event.time)} – {event.text}
                    {event.note && (
                      <div className="text-[11px] italic text-blue-700 mt-1">📝 {event.note}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WeeklySchedule;