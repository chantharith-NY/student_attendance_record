<?php

require_once '../../lib/db.php';

// Enable CORS
header('Access-Control-Allow-Origin: http://localhost:3000'); // Match the frontend's origin
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true'); // Allow credentials for session handling

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get the input data
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input: username and password are required']);
    exit;
}

$username = $input['username'];
$password = $input['password'];

session_name('student_attendance_session'); // Set a consistent session name

// Set a specific session save path
session_save_path('/tmp'); // Adjust this path if necessary
error_log('Session Save Path: ' . session_save_path());

session_start(); // Start the session

try {
    $db = getDatabaseConnection();

    $stmt = $db->prepare('SELECT id, role FROM users WHERE username = :username AND password = :password');
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $_SESSION['user_id'] = $user['id']; // Store the user ID in the session

        // Log session data after setting user_id
        error_log('Session Data after setting user_id: ' . print_r($_SESSION, true));

        // Force session data to be saved
        session_write_close();

        error_log('Session after login: ' . print_r($_SESSION, true));
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to authenticate user', 'details' => $e->getMessage()]);
}
