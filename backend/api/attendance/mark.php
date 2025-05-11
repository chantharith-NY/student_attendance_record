<?php

require_once '../../lib/db.php';

// Get the input data
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['student_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input: student_id is required']);
    exit;
}

$student_id = $input['student_id'];

try {
    $db = getDatabaseConnection();

    $stmt = $db->prepare('INSERT INTO attendance (student_id) VALUES (:student_id)');
    $stmt->bindParam(':student_id', $student_id);
    $stmt->execute();

    echo json_encode(['success' => true, 'attendance_id' => $db->lastInsertId()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to mark attendance', 'details' => $e->getMessage()]);
}
