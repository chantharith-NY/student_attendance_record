import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#DDFEF8] flex items-center justify-center font-sans">
      <Head>
        <title>Student Attendance System</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </Head>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#23194F] mb-6">Welcome to the Student Attendance System</h1>
        <p className="text-gray-700 mb-6">This system helps manage student attendance efficiently and effectively. Log in to explore its features.</p>
        <Link href="/login" legacyBehavior>
          <a className="bg-[#23194F] text-white font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition">Log In</a>
        </Link>
      </div>
    </div>
  );
}
