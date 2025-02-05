<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Student Attendance</title>
</head>

<style>
    .container {
        width: 50%;
        margin: 0 auto;
        margin-top: 150px;
    }
    h2 {
        text-align: center;
        font-size: 60px;
    }
    .form-control {
        margin-top: 20px;
        width: 100%;
    }
    .btn-primary {
        width: 150px;
        height: 40px;
    }

    .mb-3 {
        display: flex;
        justify-content: center;
        padding: 10px;
    }

    .mb-3-btn {
        display: flex;
        justify-content: space-around;
    }

</style>

<body>
    <div class="container">
        <h2>Log In</h2>
        <form action="#" class="was-validated" method="post">
            <div class="mb-3">
                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" required>
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" required >
            </div>
            <div class="mb-3-btn">
                <button type="submit" class="btn btn-primary">Sign Up</button>
                <button type="submit" class="btn btn-primary" style="background-color: #2eb82e; border: none;">Log In</button>
            </div>
        </form>
    </div>
</body>
</html>