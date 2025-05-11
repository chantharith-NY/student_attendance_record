<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../lib/db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->student_id) || !isset($data->timestamp)) {
    echo json_encode(["success" => false, "error" => "Student ID and timestamp are required"]);
    exit;
}

try {
    $conn = getDatabaseConnection();

    $timestamp = new DateTime($data->timestamp, new DateTimeZone('UTC'));
    $timestamp->setTimezone(new DateTimeZone('Asia/Phnom_Penh'));
    $formattedTimestamp = $timestamp->format('Y-m-d H:i:s');

    $stmt = $conn->prepare("INSERT INTO attendance (student_id, timestamp) VALUES (:student_id, :timestamp)");
    $stmt->bindParam(':student_id', $data->student_id);
    $stmt->bindParam(':timestamp', $formattedTimestamp);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Attendance marked successfully"]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to mark attendance"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
