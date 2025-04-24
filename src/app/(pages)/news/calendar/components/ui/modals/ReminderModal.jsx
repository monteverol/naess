import { useState } from "react";
import { X, Clock, Plus, Calendar, Edit, Trash2 } from "lucide-react";
import { formatTime } from "@/hooks/useCalendar";

export default function ReminderModal({ 
  selectedDate, 
  setShowReminderModal, 
  newReminder, 
  setNewReminder,
  reminders,
  reminderTime,
  setReminderTime,
  addReminder,
  publicReminders,
  removeReminder,
  companySchedule,
  holidays,
  newReminderNote,
  setNewReminderNote
}) {
  const [activeTab, setActiveTab] = useState(null);
  const selectedDateObj = selectedDate ? new Date(selectedDate) : new Date();
  const businessHours = publicReminders[`${selectedDate}_hours`] || 
    (() => {
      const dayName = selectedDateObj.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
      return companySchedule[dayName] || { start: null, end: null };
    })();
  
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left side - Existing Reminders */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col overflow-hidden h-80 md:h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Reminders
            </h3>
            <div className="flex bg-white rounded-lg border border-gray-200">
              <button 
                className={`px-3 py-1 border-r border-gray-200 text-sm btn ${activeTab === "public" ? "bg-blue-500 text-white" : "text-gray-600"} rounded-l-lg`}
                onClick={() => setActiveTab(prev => prev === "public" ? null : "public")}
              >
                Public
              </button>
              <button 
                className={`px-3 py-1 border-l border-gray-200 text-sm btn ${activeTab === "private" ? "bg-blue-500 text-white" : "text-gray-600"} rounded-r-lg`}
                onClick={() => setActiveTab(prev => prev === "private" ? null : "private")}
              >
                My Reminders
              </button>
            </div>
          </div>
          
          <div className="rounded-lg shadow-sm flex flex-col overflow-hidden mb-4">
            <div className="bg-white p-4 shadow-xs z-10 flex items-center">
              <Calendar size={18} className="text-blue-500 mr-2" />
              <span className="font-medium">{selectedDateObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            {businessHours && (
              <div className="bg-gray-100 h-[200px] md:h-auto py-2 px-4 flex z-0 items-center">
                <div className="text-sm text-gray-500">
                  Business Hours:{" "}
                  {businessHours.start && businessHours.end
                    ? `${businessHours.start} - ${businessHours.end}`
                    : "Closed"}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-grow overflow-y-auto h-76">
          {(() => {
              const holidayReminder = holidays[selectedDate]
                ? [{ text: holidays[selectedDate], time: "00:00", isHoliday: true }]
                : [];
              
              const publicList = selectedDate && publicReminders[selectedDate]
                ? [...holidayReminder, ...publicReminders[selectedDate].map(r => ({ ...r, isHoliday: false }))]
                : holidayReminder;            
              
                const privateList = selectedDate && reminders[selectedDate] ? reminders[selectedDate] : [];

              const showPublic = activeTab === null || activeTab === "public";
              const showPrivate = activeTab === null || activeTab === "private";

              const combined = [
                ...(showPublic ? publicList.map(r => ({ ...r, isPublic: true })) : []),
                ...(showPrivate ? privateList.map((r, i) => ({ ...r, isPublic: false, index: i })) : [])
              ];              

              if (combined.length === 0) {
                return (
                  <div className="text-center py-10 text-gray-500">
                    <Clock size={32} className="mx-auto mb-2 opacity-30" />
                    <p>No reminders for this date</p>
                  </div>
                );
              }

              const sorted = combined.sort((a, b) => a.time.localeCompare(b.time));

              return (
                <div className="space-y-3">
                  {sorted.map((reminder, i) => (
                    <div
                      key={i}
                      className={`border p-3 rounded-lg flex items-start shadow-sm ${
                        reminder.isHoliday
                          ? 'bg-red-100 border-red-200 text-red-800'
                          : reminder.isPublic
                          ? 'bg-green-100 border-yellow-100 text-blue-500'
                          : 'bg-white border-blue-100 text-blue-800'
                      }`}
                    >
                      <div className="rounded-md p-1 mr-3">
                        <Clock size={20} />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-semibold text-gray-800">{reminder.text}</p>
                        { (reminder.time) && (
                          <p className="text-xs font-medium text-gray-500 mt-1">{formatTime(reminder.time)}</p>
                        )}
                        {(reminder.note) && (
                          <p className={`text-sm mt-2 p-2 rounded ${
                            reminder.isPublic 
                              ? 'bg-green-50 text-gray-800' 
                              : 'bg-gray-50 text-gray-600'
                          }`}>
                            {reminder.note || 'No additional notes'}
                          </p>
                        )}
                      </div>
                      {!reminder.isPublic && (
                        <button
                          onClick={() => removeReminder(selectedDate, reminder.index)}
                          className="text-white hover:text-blue-50 bg-gray-300 hover:bg-gray-500 p-1 rounded-full btn"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-6 border-l border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Add New Reminder
            </h3>
            <button 
              onClick={() => setShowReminderModal(false)}
              className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full btn"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter reminder title..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                />
                <Edit size={16} className="absolute left-3 top-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Note (Optional)
              </label>
              <textarea
                placeholder="Add additional details..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                value={newReminderNote}
                onChange={(e) => setNewReminderNote(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Clock size={16} className="mr-2" />
                Reminder Time
              </label>
              <input
                type="time"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
            
            <div className="pt-4">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium btn"
                >
                  Cancel
                </button>
                <button
                  onClick={addReminder}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center shadow-sm btn"
                >
                  <Plus size={18} className="mr-2" /> Add Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}