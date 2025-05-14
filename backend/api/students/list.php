<?php

require_once __DIR__ . '/../../lib/db.php';

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

error_reporting(E_ERROR | E_PARSE); // Suppress warnings and notices

try {
    $db = getDatabaseConnection();

    $stmt = $db->query('SELECT attendance.id, students.full_name AS student_name, attendance.timestamp 
                         FROM attendance 
                         JOIN students ON attendance.student_id = students.id');
    $attendance = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'attendance' => $attendance]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch attendance records', 'details' => $e->getMessage()]);
}
