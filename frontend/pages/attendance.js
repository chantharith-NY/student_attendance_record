import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-[#DDFEF8] p-6 font-sans">
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </Head>
      <header className="text-center py-4 text-2xl font-bold text-[#23194F]">Attendance Records</header>
      <table className="w-full border border-gray-300 mt-6">
        <thead className="bg-[#23194F] text-white">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.id} className="odd:bg-gray-100 even:bg-white">
              <td className="border px-4 py-2">{record.id}</td>
              <td className="border px-4 py-2">{record.student_name}</td>
              <td className="border px-4 py-2">{record.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
