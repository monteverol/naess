"use client";
// pages/calendar.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Calendar, ChevronLeft, ChevronRight, Plus, X, Info, Clock } from 'lucide-react';
import WholePageLoad from '@/components/ui/WholePageLoad';
import ReminderModal from './components/ui/modals/ReminderModal';

export default function CalendarDashboard() {
  // Current date and selected date state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState({});       // Local/private
  const [publicReminders, setPublicReminders] = useState({}); // Fetched from server
  const [newReminder, setNewReminder] = useState("");
  const [reminderTime, setReminderTime] = useState("09:00");
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [holidays, setHolidays] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const playSound = () => {
    const audio = new Audio("/audios/alarm.mp3");
    audio.play();
  };

  useEffect(() => {
    if (Object.keys(reminders).length > 0) {
      localStorage.setItem('calendarReminders', JSON.stringify(reminders));
    }

    const checkReminders = () => {
      const now = new Date();
      const nowDate = now.toISOString().split("T")[0];
      const nowTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
    
      const todayReminders = reminders[nowDate] || [];
    
      todayReminders.forEach((reminder) => {
        const reminderTime = new Date(`${nowDate}T${reminder.time}`);
        const diff = Math.abs(now - reminderTime);
    
        if (diff <= 60000 && !reminder.notified) {
          if (Notification.permission === "granted") {
            playSound();
            new Notification("⏰ Reminder", {
              body: `${reminder.text} at ${formatTime(reminder.time)}`,
            });
          } else {
            playSound();
            alert(`Reminder: ${reminder.text} at ${formatTime(reminder.time)}`);
          }
    
          setReminders(prev => {
            const updated = { ...prev };
            updated[nowDate] = updated[nowDate].map(r =>
              r.time === reminder.time && r.text === reminder.text
                ? { ...r, notified: true }
                : r
            );
            return updated;
          });
        }
      });
    };    
  
    const interval = setInterval(checkReminders, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, [reminders]);

  
  useEffect(() => {
    const fetchHolidays = async () => {
      const year = currentDate.getFullYear();
      const cached = localStorage.getItem(`holidays-${year}`);
  
      if (cached) {
        setHolidays(JSON.parse(cached));
        return;
      }
  
      try {
        const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/PH`);
        const data = await res.json();
  
        const holidayMap = {};
        data.forEach((holiday) => {
          const date = new Date(holiday.date);
          const paddedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          holidayMap[paddedDate] = holiday.name;
        });
  
        localStorage.setItem(`holidays-${year}`, JSON.stringify(holidayMap));
        setHolidays(holidayMap);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };
  
    fetchHolidays();
  }, [currentDate]);  
  
  // Company schedule - could be fetched from an API
  const companySchedule = {
    monday: { start: '8:00', end: '17:00' },
    tuesday: { start: '8:00', end: '17:00' },
    wednesday: { start: '8:00', end: '17:00' },
    thursday: { start: '8:00', end: '17:00' },
    friday: { start: '8:00', end: '17:00' },
    saturday: { start: null, end: null },
    sunday: { start: null, end: null }
  };

  // Load reminders from localStorage on component mount
  // Load public reminders from API
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const fetchPublicReminders = async () => {
      try {
        const res = await fetch('/api/publicReminders'); // or directly from json-server if not proxied
        const data = await res.json();
    
        // Group reminders by date for easier lookup
        const groupedByDate = data.reduce((acc, reminder) => {
          const { date, text, time } = reminder;
          if (!acc[date]) acc[date] = [];
          acc[date].push({ text, time });
          return acc;
        }, {});
        
        console.log(groupedByDate);
        setPublicReminders(groupedByDate);
      } catch (err) {
        console.error('Error fetching public reminders:', err);
      }
    };
    
    fetchPublicReminders();
  }, []);

  useEffect(() => {
    const savedReminders = localStorage.getItem('calendarReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);

  // Calendar navigation functions
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Calendar utility functions
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };  

  // Handle date selection
  const handleDateClick = (day) => {
    const dateString = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(dateString);
    setShowReminderModal(true);
    
    // Set default reminder time to current time rounded to nearest 30 min
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes() >= 30 ? 30 : 0;
    setReminderTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  };

  // Format time to 12-hour format with AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const period = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  // Sort reminders by time
  const sortRemindersByTime = (reminders) => {
    return [...reminders].sort((a, b) => {
      return a.time.localeCompare(b.time);
    });
  };

  // Add a new reminder
  const addReminder = () => {
    if (newReminder.trim() && selectedDate) {
      const reminderObj = {
        text: newReminder,
        time: reminderTime,
        notified: false
      };
      
      setReminders(prev => {
        const updatedReminders = {
          ...prev,
          [selectedDate]: [...(prev[selectedDate] || []), reminderObj]
        };
        // Sort reminders by time
        updatedReminders[selectedDate] = sortRemindersByTime(updatedReminders[selectedDate]);
        return updatedReminders;
      });
      
      setNewReminder("");
      setShowReminderModal(false);
    }
  };

  // Remove a reminder
  const removeReminder = (date, index) => {
    setReminders(prev => {
      const newReminders = {...prev};
      newReminders[date] = newReminders[date].filter((_, i) => i !== index);
      if (newReminders[date].length === 0) {
        delete newReminders[date];
      }
      return newReminders;
    });
  };

  // Render calendar days
  const renderCalendarDays = () => {
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
      const hasPublicReminders = publicReminders[dateString] && publicReminders[dateString].length > 0;
      const allReminders = [...(publicReminders[dateString] || []), ...(reminders[dateString] || [])];
      const holidayName = holidays[dateString];
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-2 transition-all cursor-pointer relative
            ${new Date(year, month, day).toDateString() === new Date().toDateString() ? 'bg-blue-100' : ''}
            ${holidayName ? 'bg-red-100 text-red-700 font-bold hover:bg-red-200' : 
              hasPublicReminders ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'hover:bg-blue-50'}
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
          
          {allReminders.length > 0 && (
            <div className="mt-1 overflow-hidden max-h-16">
              {allReminders.slice(0, 2).map((reminder, index) => {
                const isPublic = publicReminders[dateString]?.some(
                  pub => pub.text === reminder.text && pub.time === reminder.time
                );

                return (
                  <div
                    key={index}
                    className={`text-xs truncate p-1 my-1 rounded flex items-center ${
                      isPublic
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-50 text-gray-600'
                    }`}
                  >
                    <Clock size={10} className="mr-1 flex-shrink-0" />
                    <span className="font-medium mr-1">{formatTime(reminder.time)}</span>
                    <span className="truncate">{reminder.text}</span>
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

  // Render weekly schedule
  const renderWeeklySchedule = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const todayIndex = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday
    
    return (
      <div className="grid grid-cols-7 gap-2 mt-4">
        {days.map((day, index) => {
          const schedule = companySchedule[day.toLowerCase()];
          const isWorkDay = schedule.start !== null;
          const isToday = index === todayIndex;
          
          return (
            <div 
              key={day} 
              className={`p-3 rounded-lg ${
                isToday ? 'bg-blue-100 border-blue-300 border-2' : 
                isWorkDay ? 'bg-white border border-gray-200' : 'bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="font-medium text-sm">{day}</div>
              {isWorkDay ? (
                <div className="mt-2 text-sm">
                  <div className="text-gray-700">{schedule.start} - {schedule.end}</div>
                  <div className="mt-1 text-xs text-gray-500">Working hours</div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-500">Off day</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const proposePublicReminder = async () => {
    setIsLoading(true);
    const proposal = {
      date: selectedDate,
      time: reminderTime,
      text: newReminder,
    };
  
    try {
      await fetch("/api/propose-public-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proposal),
      });
      setShowReminderModal(false);
      setNewReminder("");
    } catch (err) {
      console.error("Proposal failed:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <>
      <Head>
        <title>Company Calendar Dashboard | Schedule and Reminders</title>
        <meta name="description" content="Manage your company schedule, set reminders, and view calendar events all in one dashboard." />
        <meta name="keywords" content="calendar, schedule, reminders, company dashboard" />
        <meta property="og:title" content="Company Calendar Dashboard" />
        <meta property="og:description" content="Manage your company schedule, set reminders, and view calendar events all in one dashboard." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/calendar" />
      </Head>

      <div className="min-h-screen bg-gray-50 mt-20">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Calendar className="mr-2" size={24} />
                Company Calendar Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-1">Manage schedules and reminders in one place</p>
            </div>
            <button 
              onClick={goToToday}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Today
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 btn">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 btn">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
            <div className="bg-gray-100 rounded-lg shadow-sm p-4 mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <Info size={18} className="mr-2" />
                <span>Click on any date to add a timed reminder. Reminders are stored locally on your device and sorted by time.</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Company Schedule</h2>
            {renderWeeklySchedule()}
          </div>
        </main>

        {/* Reminder Modal */}
        {showReminderModal && <ReminderModal
          selectedDate={selectedDate} 
          setShowReminderModal={setShowReminderModal}
          reminders={reminders}
          newReminder={newReminder}
          setNewReminder={setNewReminder}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          addReminder={addReminder}
          proposePublicReminder={proposePublicReminder}
          publicReminders={publicReminders}
          formatTime={formatTime}
          removeReminder={removeReminder}
          isLoading={isLoading}
        />}
      </div>

      {isLoading && <WholePageLoad />}
    </>
  );
}