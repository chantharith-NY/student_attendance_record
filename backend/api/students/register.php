<?php

require_once '../../lib/db.php';

// Add CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get the input data
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['name'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Name is required']);
    exit;
}

$name = $input['name'];
$photo_path = isset($input['photo_path']) ? $input['photo_path'] : null;

try {
    $db = getDatabaseConnection();

    $stmt = $db->prepare('INSERT INTO students (name, photo_path) VALUES (:name, :photo_path)');
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':photo_path', $photo_path);
    $stmt->execute();

    echo json_encode(['success' => true, 'student_id' => $db->lastInsertId()]);
} catch (Exception $e) {
    error_log('Error in register.php: ' . $e->getMessage()); // Log the error
    http_response_code(500);
    echo json_encode(['error' => 'Failed to register student', 'details' => $e->getMessage()]);
}
