<?php
// Set a specific session save path
session_save_path('/tmp');

// Set a consistent session name before starting the session
session_name('student_attendance_session');

// Start the session
session_start();

require_once '../../lib/db.php';

// Set headers for JSON response and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $conn = getDatabaseConnection();

    // Get the logged-in user's ID from the session
    if (!isset($_SESSION['user_id'])) {
        echo json_encode([
            'success' => false,
            'message' => 'User not logged in.'
        ]);
        exit;
    }

    $userId = $_SESSION['user_id'];

    // Query to fetch student profile information
    $query = "SELECT full_name, group_name, study_year, department, dob, telegram, email FROM students WHERE user_id = :user_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode([
            'success' => true,
            'profile' => [
                'fullName' => $result['full_name'],
                'group' => $result['group_name'],
                'studyYear' => $result['study_year'],
                'department' => $result['department'],
                'dob' => $result['dob'],
                'telegram' => $result['telegram'],
                'email' => $result['email'],
                'profileImage' => '/public/image.png' // Placeholder for profile image
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Student not found.'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
