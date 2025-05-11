<?php

require_once '../../lib/db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $db = getDatabaseConnection();

    $stmt = $db->query('SELECT attendance.id, students.name AS student_name, attendance.timestamp 
                         FROM attendance 
                         JOIN students ON attendance.student_id = students.id');
    $attendance = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'attendance' => $attendance]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch attendance records', 'details' => $e->getMessage()]);
}
