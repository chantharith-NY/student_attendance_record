<?php

use PDO;
use Exception;

function getDatabaseConnection() {
    $dbPath = __DIR__ . '/../db/database.sqlite';

    try {
        $pdo = new PDO('sqlite:' . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (Exception $e) {
        throw new Exception('Database connection failed: ' . $e->getMessage());
    }
}