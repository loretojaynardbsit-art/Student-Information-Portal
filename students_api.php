<?php

header("Content-Type: application/json");

// Receive data from JavaScript
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $input = file_get_contents("php://input");
    $students = json_decode($input, true);

    if (is_array($students)) {

        $response = [
            "success" => true,
            "message" => "Student records received successfully!",
            "totalStudents" => count($students)
        ];

        echo json_encode($response);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "Invalid student data."
        ]);
    }

} else {

    echo json_encode([
        "success" => false,
        "message" => "Please use the POST method."
    ]);
}

?>