<?php
// Set a specific session save path
session_save_path('/tmp'); // Adjust this path if necessary

// Set a consistent session name before starting the session
session_name('student_attendance_session');

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Set session data
    $_SESSION['test_key'] = 'test_value';
    echo json_encode([
        'success' => true,
        'message' => 'Session data set successfully.',
        'session_id' => session_id()
    ]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve session data
    echo json_encode([
        'success' => true,
        'session_data' => $_SESSION,
        'session_id' => session_id()
    ]);
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
}
