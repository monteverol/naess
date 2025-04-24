import { useState, useEffect } from "react";

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState({});
  const [publicUpdates, setPublicUpdates] = useState({});
  const [newReminder, setNewReminder] = useState("");
  const [reminderTime, setReminderTime] = useState("09:00");
  const [holidays, setHolidays] = useState({});
  const [newReminderNote, setNewReminderNote] = useState("");
  const [showReminderModal, setShowReminderModal] = useState(false);

  useEffect(() => {
    if (Object.keys(reminders).length > 0) {
      localStorage.setItem('calendarReminders', JSON.stringify(reminders));
    }

    const checkReminders = () => {
      const now = new Date();
      const nowDate = now.toISOString().split("T")[0];
    
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

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const savedReminders = localStorage.getItem('calendarReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }

    // In the fetchPublicReminders function:
    const fetchPublicUpdates = async () => {
      try {
        const res = await fetch('/api/publicUpdates');
        const data = await res.json();
    
        const groupedByDate = {};
    
        data.forEach(update => {
          const { startDate, title, time, note, businessHours } = update;
    
          if (!groupedByDate[startDate]) groupedByDate[startDate] = [];
          groupedByDate[startDate].push({ text: title, time, note });
    
          if (businessHours) {
            groupedByDate[`${startDate}_hours`] = businessHours;
          }
        });
    
        setPublicUpdates(groupedByDate);
      } catch (err) {
        console.error('Error fetching public updates:', err);
      }
    };
    
    fetchPublicUpdates();
  }, []);

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
        notified: false,
        note: newReminderNote // Include the note
      };
      
      setReminders(prev => {
        const updatedReminders = {
          ...prev,
          [selectedDate]: [...(prev[selectedDate] || []), reminderObj]
        };
        updatedReminders[selectedDate] = sortRemindersByTime(updatedReminders[selectedDate]);
        return updatedReminders;
      });
      
      setNewReminder("");
      setNewReminderNote("");
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

  return {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    reminders,
    setReminders,
    publicUpdates,
    setPublicUpdates,
    newReminder,
    setNewReminder,
    reminderTime,
    setReminderTime,
    holidays,
    setHolidays,
    newReminderNote,
    setNewReminderNote,
    showReminderModal,
    setShowReminderModal,
    handleDateClick,
    sortRemindersByTime,
    addReminder,
    removeReminder,
    prevMonth,
    nextMonth,
    goToToday
  };
}

// Calendar utility functions
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const formatDateKey = (year, month, day) => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  const formattedHours = h % 12 === 0 ? 12 : h % 12;
  return `${formattedHours}:${minutes} ${period}`;
};

export const playAlarm = () => {
  const audio = new Audio("/audios/alarm.mp3");
  audio.play();
};