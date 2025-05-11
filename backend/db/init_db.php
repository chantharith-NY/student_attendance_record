<?php

require_once __DIR__ . '/../lib/db.php';

try {
    $db = getDatabaseConnection();

    // Create students table
    $db->exec("CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        photo_path TEXT NOT NULL
    )");

    // Create attendance table
    $db->exec("CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(student_id) REFERENCES students(id)
    )");

    // Create users table
    $db->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin'))
    )");

    // Create groups table
    $db->exec("CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        schedule_id INTEGER,
        FOREIGN KEY (schedule_id) REFERENCES schedules (id)
    );");

    // Drop the old schedules table if it exists
    $db->exec("DROP TABLE IF EXISTS schedules;");

    // Create the updated schedules table
    $db->exec("CREATE TABLE schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL,
        teacher_name TEXT NOT NULL,
        group_id INTEGER NOT NULL,
        time_in TEXT NOT NULL,
        time_out TEXT NOT NULL,
        day_of_week TEXT NOT NULL,
        room TEXT NOT NULL,
        FOREIGN KEY (group_id) REFERENCES groups (id)
    );");

    // Add foreign key constraint to students table
    $db->exec("PRAGMA foreign_keys = OFF;"); // Temporarily disable foreign keys
    $db->exec("CREATE TABLE students_new AS SELECT * FROM students;");
    $db->exec("DROP TABLE students;");
    $db->exec("CREATE TABLE students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        group_id INTEGER,
        full_name TEXT,
        dob TEXT,
        telegram TEXT,
        email TEXT,
        FOREIGN KEY (group_id) REFERENCES groups (id)
    );");
    $db->exec("INSERT INTO students SELECT * FROM students_new;");
    $db->exec("DROP TABLE students_new;");
    // Drop the temporary table if it exists
    $db->exec("DROP TABLE IF EXISTS students_new;");
    $db->exec("PRAGMA foreign_keys = ON;"); // Re-enable foreign keys

    echo "Database initialized successfully.";
} catch (Exception $e) {
    echo "Failed to initialize database: " . $e->getMessage();
}
