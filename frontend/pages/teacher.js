import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Teacher() {
  const [attendance, setAttendance] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [teacherInfo, setTeacherInfo] = useState({
    fullName: 'Loading...',
    email: 'Loading...',
    subjects: 'Loading...'
  });

  useEffect(() => {
    // Fetch attendance records
    const fetchAttendance = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/attendance/list.php');
        const data = await response.json();
        if (data.success) {
          setAttendance(data.attendance);
        }
      } catch (error) {
        console.error('Failed to fetch attendance records:', error);
      }
    };

    fetchAttendance();
  }, []);

  useEffect(() => {
    if (currentPage === 'dashboard') {
      // Logic to open the camera automatically
      console.log('Camera opened for attendance');
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 'profile') {
      const fetchTeacherInfo = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/teachers/info.php', {
            credentials: 'include', // Ensure cookies are sent for session handling
          });
          const data = await response.json();
          console.log('API Response:', response);
          if (data.success) {
            setTeacherInfo({
              fullName: data.fullName,
              email: data.email,
              subjects: data.subjects.join(', '),
            });
          } else {
            console.error('Failed to fetch teacher info:', data.message);
          }
        } catch (error) {
          console.error('Error fetching teacher info:', error);
        }
      };

      fetchTeacherInfo();
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="bg-white shadow-md rounded-lg p-6 mt-24 text-center">
            <h2 className="text-2xl font-bold text-[#23194F] mb-6">Camera is Open for Attendance</h2>
          </div>
        );
      case 'attendance':
        return (
          <div className='bg-white shadow-md rounded-lg p-6 mt-24 text-center'>
            <h2 className="text-2xl font-bold text-[#23194F] mb-6">Attendance List</h2>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search by name or group"
                className="border border-gray-300 rounded px-4 py-2 flex-grow mr-4"
                onChange={(e) => {
                  const query = e.target.value.toLowerCase();
                  setAttendance((prevAttendance) =>
                    prevAttendance.filter(
                      (record) =>
                        record.student_name.toLowerCase().includes(query) ||
                        record.group?.toLowerCase().includes(query)
                    )
                  );
                }}
              />
              <button
                className="bg-gray-600 text-white font-semibold py-3 px-4 rounded hover:bg-gray-700 transition "
                onClick={() => {
                  // Logic to export CSV
                  console.log('Exporting CSV');
                }}
              >
                Export CSV
              </button>
            </div>
            <table className="w-full border border-gray-300">
              <thead className="bg-[#23194F] text-white">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Student Name</th>
                  <th className="border px-4 py-2">Group</th>
                  <th className="border px-4 py-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="odd:bg-gray-100 even:bg-white">
                    <td className="border px-4 py-2">{record.id}</td>
                    <td className="border px-4 py-2">{record.student_name}</td>
                    <td className="border px-4 py-2">{record.group || 'N/A'}</td>
                    <td className="border px-4 py-2">{record.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white shadow-md rounded-lg p-6 mt-24">
            <h2 className="text-2xl font-bold text-[#23194F] mb-6 text-center">Teacher Profile</h2>
            <div className='grid grid-cols-2 gap-4 mb-6 px-8'>
              <div className="flex flex-col grid grid-cols-2 gap-4">
                <div className='flex flex-col mb-4 w-1/2'>
                  <p className="text-gray-700">Full Name:</p>
                  <p className="text-gray-700">Email:</p>
                  <p className="text-gray-700">Subjects:</p>
                </div>
                <div className='flex flex-col mb-4'>
                  <p className="text-gray-700">{teacherInfo.fullName}</p>
                  <p className="text-gray-700">{teacherInfo.email}</p>
                  <p className="text-gray-700">{teacherInfo.subjects}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <img
                  src="/image.png"
                  alt="Teacher Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
              </div>
            </div>
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
      <header className="text-center py-4 text-2xl font-bold text-[#23194F]">Teacher Dashboard</header>
      <nav className="fixed top-16 left-0 w-full bg-white shadow-md p-4 flex justify-around z-40">
        <a 
          href="#dashboard" 
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('dashboard');
          }}
          className="text-[#23194F] font-medium hover:underline">Dashboard</a>
        <a 
          href="#attendance"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('attendance');
          }} 
          className="text-[#23194F] font-medium hover:underline">Attendance</a>
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
