import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Student() {
  const [attendance, setAttendance] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [schedule, setSchedule] = useState([]);
  const [profile, setProfile] = useState({
    fullName: 'Loading...',
    group: 'Loading...',
    studyYear: 'Loading...',
    department: 'Loading...',
    dob: 'Loading...',
    telegram: 'Loading...',
    email: 'Loading...',
    profileImage: '/public/image.png',
  });

  useEffect(() => {
    if (currentPage === 'dashboard' || currentPage === 'schedule') {
      const fetchSchedule = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/students/schedule.php', {
            credentials: 'include',
          });
          const data = await response.json();
          if (data.success) {
            setSchedule(data.schedule);
          }
        } catch (error) {
          console.error('Failed to fetch schedule:', error);
        }
      };

      fetchSchedule();
    }

    if (currentPage === 'dashboard') {
      const fetchAttendance = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/students/list.php', {
            credentials: 'include',
          });
          const data = await response.json();
          if (data.success) {
            setAttendance(data.attendance);
          }
        } catch (error) {
          console.error('Failed to fetch attendance:', error);
        }
      };

      fetchAttendance();
    }
  }, [currentPage]);

  // Update the renderPage function to display schedule details dynamically
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="bg-white shadow-md rounded-lg p-6 mt-24 text-center">
            <h2 className="text-2xl font-bold text-[#23194F] mb-6">Schedule</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 px-4 py-2">Teacher</th>
                  <th className="border border-gray-300 px-4 py-2">Time</th>
                  <th className="border border-gray-300 px-4 py-2">Day</th>
                  <th className="border border-gray-300 px-4 py-2">Room</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.subject}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.teacher_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.time_in} - {item.time_out}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.day_of_week}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-2xl font-bold text-[#23194F] mt-6 mb-6">Attendance</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Room</th>
                  <th className="border border-gray-300 px-4 py-2">Teacher</th>
                  <th className="border border-gray-300 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.slice(0, 10).map((record, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{record.timestamp}</td>
                    <td className="border border-gray-300 px-4 py-2">{record.room}</td>
                    <td className="border border-gray-300 px-4 py-2">{record.teacher}</td>
                    <td className="border border-gray-300 px-4 py-2">{record.subject}</td>
                    <td className="border border-gray-300 px-4 py-2">{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'schedule':
        return (
          <div className="bg-white shadow-md rounded-lg p-6 mt-24 text-center">
            <h2 className="text-2xl font-bold text-[#23194F] mb-6">Schedule</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Subject</th>
                  <th className="border border-gray-300 px-4 py-2">Teacher</th>
                  <th className="border border-gray-300 px-4 py-2">Time</th>
                  <th className="border border-gray-300 px-4 py-2">Day</th>
                  <th className="border border-gray-300 px-4 py-2">Room</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.subject}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.teacher_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.time_in} - {item.time_out}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.day_of_week}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white shadow-md rounded-lg p-6 mt-24 text-center">
            <h2 className="text-2xl font-bold text-[#23194F] mb-6">Profile</h2>
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Group:</strong> {profile.group}</p>
            <p><strong>Study Year:</strong> {profile.studyYear}</p>
            <p><strong>Department:</strong> {profile.department}</p>
            <p><strong>Date of Birth:</strong> {profile.dob}</p>
            <p><strong>Telegram:</strong> {profile.telegram}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#DDFEF8] p-6 font-sans">
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </Head>
      <header className="text-center py-4 text-2xl font-bold text-[#23194F]">Student Dashboard</header>
      <nav className="fixed top-16 left-0 w-full bg-white shadow-md p-4 flex justify-around z-40">
        <a 
          href="#dashboard" 
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('dashboard');
          }}
          className="text-[#23194F] font-medium hover:underline">Dashboard</a>
        <a 
          href="#schedule"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('schedule');
          }} 
          className="text-[#23194F] font-medium hover:underline">Schedule</a>
        <a 
          href="#profile" 
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('profile');
          }}
          className="text-[#23194F] font-medium hover:underline">Profile</a>
        <a href="/login" className="text-[#23194F] font-medium hover:underline">Log Out</a>
      </nav>
      {renderPage()}
    </div>
  );
}
