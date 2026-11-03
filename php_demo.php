
<?php
$getMessage = "";
$postMessage = "";

// GET Method
if (isset($_GET["name"])) {
    $name = htmlspecialchars($_GET["name"]);
    $getMessage = "Hello, " . $name . "! You used the GET Method.";
}

// POST Method
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST["name"] ?? "");
    
    if ($name !== "") {
        $postMessage = "Hello, " . $name . "! You used the POST Method.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP GET and POST Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f5f9;
            padding: 30px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 25px;
            border-radius: 10px;
        }

        h1, h2 {
            color: #2563eb;
        }

        input {
            width: 95%;
            padding: 10px;
            margin: 10px 0;
        }

        button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 10px 18px;
            cursor: pointer;
            border-radius: 5px;
        }

        .message {
            color: green;
            font-weight: bold;
            margin-top: 15px;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>PHP GET and POST Methods</h1>

    <h2>GET Method</h2>

    <form method="GET" action="php_demo.php">
        <input type="text" name="name" placeholder="Enter your name" required>
        <button type="submit">Submit using GET</button>
    </form>

    <p class="message">
        <?php echo $getMessage; ?>
    </p>

    <hr>

    <h2>POST Method</h2>

    <form method="POST" action="php_demo.php">
        <input type="text" name="name" placeholder="Enter your name" required>
        <button type="submit">Submit using POST</button>
    </form>

    <p class="message">
        <?php echo $postMessage; ?>
    </p>

    <hr>

    <a href="index.php">Back to Student Information Portal</a>
</div>

</body>
</html>
