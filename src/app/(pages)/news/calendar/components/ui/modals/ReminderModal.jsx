import { useState } from "react";
import { X, Clock, Plus, Calendar, Edit, Trash2 } from "lucide-react";

export default function ReminderModal({ 
  selectedDate, 
  setShowReminderModal, 
  newReminder, 
  setNewReminder,
  reminders,
  reminderTime,
  setReminderTime,
  addReminder,
  proposePublicReminder,
  publicReminders,
  formatTime,
  removeReminder,
  isLoading
}) {
  const [activeTab, setActiveTab] = useState("public");
  const selectedDateObj = selectedDate ? new Date(selectedDate) : new Date();
  
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Left side - Existing Reminders */}
        <div className="w-2/5 bg-gray-50 p-6 border-r border-gray-200 flex flex-col overflow-hidden h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Reminders
            </h3>
            <div className="flex bg-white rounded-lg border border-gray-200">
              <button 
                className={`px-3 py-1 text-sm btn ${activeTab === "public" ? "bg-blue-500 text-white" : "text-gray-600"} rounded-l-lg`}
                onClick={() => setActiveTab("public")}
              >
                Public
              </button>
              <button 
                className={`px-3 py-1 text-sm btn ${activeTab === "private" ? "bg-blue-500 text-white" : "text-gray-600"} rounded-r-lg`}
                onClick={() => setActiveTab("private")}
              >
                My Reminders
              </button>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center">
            <Calendar size={18} className="text-blue-500 mr-2" />
            <span className="font-medium">{selectedDateObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          
          <div className="flex-grow overflow-y-auto">
          {activeTab === "public" ? (
            selectedDate && publicReminders[selectedDate] && publicReminders[selectedDate].length > 0 ? (
              <div className="space-y-3">
                {publicReminders[selectedDate].map((reminder, index) => (
                  <div key={index} className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg flex items-center shadow-sm">
                    <div className="text-yellow-800 rounded-md p-1 mr-3">
                      <Clock size={20} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-gray-800">{reminder.text}</p>
                      <p className="text-xs font-medium text-gray-500 mt-1">{formatTime(reminder.time)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <Clock size={32} className="mx-auto mb-2 opacity-30" />
                <p>No public reminders for this date</p>
              </div>
            )
          ) : (
            selectedDate && reminders[selectedDate] && reminders[selectedDate].length > 0 ? (
              <div className="space-y-3">
                {reminders[selectedDate].map((reminder, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-center shadow-sm">
                    <div className="text-blue-800 rounded-md p-1 mr-3">
                      <Clock size={20} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-gray-800">{reminder.text}</p>
                      <p className="text-xs font-medium text-gray-500 mt-1">{formatTime(reminder.time)}</p>
                    </div>
                    <button 
                      onClick={() => removeReminder(selectedDate, index)}
                      className="text-gray-400 hover:text-blue-50 bg-slate-300 hover:bg-slate-500 p-2 rounded-md btn"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <Clock size={32} className="mx-auto mb-2 opacity-30" />
                <p>You have no personal reminders for this date</p>
              </div>
            )
          )}
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="w-3/5 p-6">
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
                Reminder Details
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter reminder here..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                />
                <Edit size={16} className="absolute left-3 top-4 text-gray-400" />
              </div>
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
            
            <div className="pt-16">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium btn"
                >
                  Cancel
                </button>
                <button
                  onClick={proposePublicReminder}
                  className={`px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium flex items-center shadow-sm btn ${isLoading ? 'cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <Plus size={18} className="mr-2" /> Propose as Public
                    </>
                  )}
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