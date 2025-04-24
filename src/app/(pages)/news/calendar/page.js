"use client";
// pages/calendar.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import ReminderModal from './components/ui/modals/ReminderModal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import WeeklySchedule from './components/ui/WeeklySchedule';
import CalendarDays from './components/ui/CalendarDays';
import { useCalendar } from '@/hooks/useCalendar';

export default function CalendarDashboard() {
  const {
    currentDate,
    selectedDate,
    reminders,
    publicUpdates,
    newReminder,
    setNewReminder,
    reminderTime,
    setReminderTime,
    holidays,
    newReminderNote,
    setNewReminderNote,
    showReminderModal,
    setShowReminderModal,
    handleDateClick,
    addReminder,
    removeReminder,
    prevMonth,
    nextMonth,
    goToToday
  } = useCalendar();
  

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

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Today
            </button>
          </div>
        </header>
        
        <div className="section pb-0 mb-0 justify-start">
          <Breadcrumbs />
        </div>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <button onClick={prevMonth} className="p-2 rounded-full bg-white drop-shadow-sm hover:bg-gray-100 btn">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextMonth} className="p-2 rounded-full bg-white drop-shadow-sm hover:bg-gray-100 btn">
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
              <CalendarDays 
                currentDate={currentDate}
                publicUpdates={publicUpdates}
                reminders={reminders}
                holidays={holidays}
                handleDateClick={handleDateClick}
              />
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
            <WeeklySchedule 
              holidays={holidays}
              publicUpdates={publicUpdates}
              companySchedule={companySchedule}
              reminders={reminders}
            />
          </div>
        </main>

        {/* Reminder Modal */}
        {showReminderModal && 
          <ReminderModal
            selectedDate={selectedDate} 
            setShowReminderModal={setShowReminderModal}
            reminders={reminders}
            newReminder={newReminder}
            setNewReminder={setNewReminder}
            reminderTime={reminderTime}
            setReminderTime={setReminderTime}
            addReminder={addReminder}
            publicReminders={publicUpdates}
            removeReminder={removeReminder}
            companySchedule={companySchedule}
            holidays={holidays}
            newReminderNote={newReminderNote}
            setNewReminderNote={setNewReminderNote}
          />        
        }
      </div>
    </>
  );
}