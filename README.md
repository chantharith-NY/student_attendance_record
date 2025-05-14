# student_attendance_record

## Description

This project is a Student Attendance System that uses Face Recognition to mark attendance automatically. Built with PHP and SQLite, it allows educational institutions to efficiently manage student attendance without manual input.

## Features
- Student Registration: Register students with their details and face images.
- Face Recognition-Based Attendance: Automatically mark attendance using facial recognition.
- Admin Dashboard: Manage students, attendance records, and generate reports.
- Database Management: Secure and structured student and attendance data storage using SQLite.
- Login System: Secure authentication for admin and students.
- Responsive UI: Mobile-friendly interface for ease of access.

## Technologies Used
- Frontend: HTML, CSS (with BootStrap5, tailwind) , JavaScript (with AJAX)
- Backend: PHP (Core PHP with SQLite)
- Database: SQLite
- Face Recognition: OpenCV (can be integrated with Python for processing)


## Installation & Setup
### Prerequisites
- XAMPP/WAMP for running PHP and SQLite locally
- Composer (optional for dependency management)
- Python & OpenCV (if using face recognition via Python)

### Steps
1. Clone the repository:
```
git clone https://github.com/chantharith-NY/student_attendance_record.git
cd student_attendance_record
```
2. Run database

```
php backend/db/init_db.php
```

3. Run server

```
php -S localhost:8000 -t backend
```

4. Install npm
```
npm install
```

5.Run web
```
npm run dev
```

## File Structure
```


```

## Usage
- Admin Login: Access the admin dashboard to manage students and attendance.
- Student Registration: Add student details along with face image.
- Mark Attendance: The system will detect student faces and mark attendance.
- Generate Reports: Admin can generate attendance reports based on date range.

## Future Enhancements
- Integrate AI-based real-time face recognition.
- Add QR code backup method for attendance.
- Implement email notifications for attendance alerts.
- Improve UI using TailwindCSS.

## Contribution
Contributions are welcome! Feel free to **fork** the repository, open an **issue**, or submit a **pull request**.

## License
This projet is open-source and available under the **MIT License**.

## Contact
For any inquiries or contributions, reach out via [Email Me](mailto:chantharith77@gmail.com) or open an issue in this repository!
