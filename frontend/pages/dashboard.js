import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentPhoto, setNewStudentPhoto] = useState('');
  const [lastSync, setLastSync] = useState('');
  const [searchStudent, setSearchStudent] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/students/list.php');
      const data = await response.json();
      if (data.success) setStudents(data.students);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/attendance/list.php');
      const data = await response.json();
      if (data.success) setAttendance(data.attendance);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
    setLastSync(new Date().toLocaleString());
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/students/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newStudentName, photo_path: newStudentPhoto || null }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Student added successfully!');
        setNewStudentName('');
        setNewStudentPhoto('');
        fetchStudents();
      } else {
        alert('Failed to add student: ' + data.error);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const response = await fetch('http://localhost:8000/api/students/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Student deleted successfully!');
        fetchStudents();
      } else {
        alert('Failed to delete student: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleMarkAttendance = async (id) => {
    const timestamp = new Date().toISOString();
    try {
      const response = await fetch('http://localhost:8000/api/attendance/mark_specific.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: id, timestamp }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Attendance marked successfully!');
        fetchAttendance();
      } else {
        alert('Failed to mark attendance: ' + data.error);
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const handleSearchStudent = (e) => {
    setSearchStudent(e.target.value);
  };

  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const filteredAttendance = attendance.filter((record) =>
    searchDate ? record.timestamp.startsWith(searchDate) : true
  );

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Student Name', 'Timestamp'],
      ...filteredAttendance.map((record) => [record.id, record.student_name, record.timestamp]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'attendance.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdminTool = (tool) => {
    switch (tool) {
      case 'refresh':
        alert('Recognition engine refreshed!');
        break;
      case 'backup':
        alert('Database backup completed!');
        break;
      case 'settings':
        alert('System settings updated!');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#DDFEF8] p-6 font-sans">
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </Head>
      <header className="fixed top-0 left-0 w-full bg-[#23194F] text-white text-center py-4 text-2xl font-bold shadow-md z-50">
        Student Attendance System — Admin Dashboard
      </header>

      <nav className="fixed top-16 left-0 w-full bg-white shadow-md p-4 flex justify-around z-40">
        <a href="/dashboard" className="text-[#23194F] font-medium hover:underline">Dashboard</a>
        <a href="/student" className="text-[#23194F] font-medium hover:underline">Add Student</a>
        <a href="/teacher" className="text-[#23194F] font-medium hover:underline">Add Teacher</a>
        <a href="/attendance" className="text-[#23194F] font-medium hover:underline">Attendance List</a>
        <a href="/login" className="text-[#23194F] font-medium hover:underline">Log Out</a>
      </nav>

      <main className="bg-white shadow-md rounded-lg p-6 mt-24">
        <section id="overview">
          <h2 className="text-2xl font-semibold text-[#23194F] mb-2">Overview</h2>
          <p className="text-gray-700 mb-2">Welcome, Admin!</p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Total Students: {students.length}</li>
            <li>Attendance Today: {attendance.length}</li>
            <li>Last Sync: {lastSync}</li>
          </ul>
        </section>

        <section id="students">
          <h2 className="text-2xl font-semibold text-[#23194F] mb-4">Registered Students</h2>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search Students"
              value={searchStudent}
              onChange={handleSearchStudent}
              className="border border-gray-300 rounded px-3 py-2 flex-grow"
            />
            <button className="bg-[#23194F] text-white px-4 py-2 rounded hover:bg-opacity-80">
              Search
            </button>
          </div>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-[#23194F] text-white">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Photo Path</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="odd:bg-gray-100 even:bg-white">
                  <td className="border px-4 py-2">{student.id}</td>
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.photo_path}</td>
                  <td className="flex justify-around px-4 py-2">
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleMarkAttendance(student.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="attendance">
          <h2 className="text-2xl font-semibold text-[#23194F] mb-4">Attendance Records</h2>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="date"
              value={searchDate}
              onChange={handleSearchDate}
              className="border border-gray-300 rounded px-3 py-2 flex-grow"
            />
            <button
              onClick={exportToCSV}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Export CSV
            </button>
          </div>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-[#23194F] text-white">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Student Name</th>
                <th className="border px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record) => (
                <tr key={record.id} className="odd:bg-gray-100 even:bg-white">
                  <td className="border px-4 py-2">{record.id}</td>
                  <td className="border px-4 py-2">{record.student_name}</td>
                  <td className="border px-4 py-2">{record.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="admin-tools">
          <h2 className="text-2xl font-semibold text-[#23194F] mb-4">Admin Tools</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleAdminTool('refresh')}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Refresh Engine
            </button>
            <button
              onClick={() => handleAdminTool('backup')}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Backup DB
            </button>
            <button
              onClick={() => handleAdminTool('settings')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              System Settings
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
