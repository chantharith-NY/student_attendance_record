<?php
// Set a specific session save path
session_save_path('/tmp'); // Adjust this path if necessary

// Set a consistent session name before starting the session
session_name('student_attendance_session');

// Start output buffering at the very beginning
ob_start();

// Start the session to access user data
session_start();

error_log('Session Save Path: ' . session_save_path());

require_once '../../lib/db.php';

// Clear test session data
unset($_SESSION['test_key']);

// Debugging: Log session save path and session ID
error_log('Session Save Path: ' . session_save_path());
error_log('Session ID: ' . session_id());

// Log session data for debugging
error_log('Session Data: ' . print_r($_SESSION, true));

// Log the user ID being used for the query
if (isset($_SESSION['user_id'])) {
    error_log('User ID from session: ' . $_SESSION['user_id']);
} else {
    error_log('No user ID found in session.');
}

// Set headers for JSON response and CORS
header('Content-Type: application/json'); // Re-enable the Content-Type header for JSON responses
header('Access-Control-Allow-Origin: http://localhost:3000'); // Ensure this matches the frontend's origin
header('Access-Control-Allow-Credentials: true'); // Allow credentials for session handling
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow necessary HTTP methods
header('Access-Control-Allow-Headers: Content-Type'); // Allow necessary headers

try {
    $conn = getDatabaseConnection();

    // Get the logged-in user's ID from the session
    if (!isset($_SESSION['user_id'])) {
        // Debugging: Log session data
        error_log('Session Data: ' . print_r($_SESSION, true));

        echo json_encode([
            'success' => false,
            'message' => 'User not logged in.'
        ]);
        exit;
    }

    $userId = $_SESSION['user_id'];

    // Query to fetch teacher information based on user ID
    $query = "SELECT full_name, email, subjects FROM teachers WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);

    // Log query execution details
    error_log('Executing query to fetch teacher information.');

    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode([
            'success' => true,
            'fullName' => $result['full_name'],
            'email' => $result['email'],
            'subjects' => explode(',', $result['subjects'])
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Teacher not found.'
        ]);
    }
} catch (Exception $e) {
    // Debugging: Log unexpected errors
    error_log('Unexpected error occurred in info.php: ' . $e->getMessage());

    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

// End output buffering and flush the output
ob_end_flush();
