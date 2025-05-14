<?php

error_reporting(E_ERROR | E_PARSE); // Suppress warnings and notices globally

use PDO;
use Exception;

function getDatabaseConnection() {
    try {
        $dbPath = __DIR__ . '/../db/database.sqlite';
        $pdo = new PDO('sqlite:' . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (Exception $e) {
        throw new Exception('Database connection failed: ' . $e->getMessage());
    }
}