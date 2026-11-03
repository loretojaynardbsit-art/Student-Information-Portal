
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Student Information Portal</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- Header -->
    <header>
        <h1>Student Information Portal</h1>
        <p>Manage and organize student information</p>
    </header>

    <main>

        <!-- Student Registration -->
        <section>
            <h2>Student Registration</h2>

            <form id="studentForm">

                <label for="studentId">Student ID</label>
                <input type="text" id="studentId"
                    placeholder="Enter Student ID" required>

                <label for="studentName">Full Name</label>
                <input type="text" id="studentName"
                    placeholder="Enter Full Name" required>

                <label for="course">Course</label>
                <input type="text" id="course"
                    placeholder="Enter Course" required>

                <label for="section">Section</label>
                <input type="text" id="section"
                    placeholder="Enter Section" required>

                <label for="email">Email Address</label>
                <input type="email" id="email"
                    placeholder="Enter Email Address" required>

                <button type="submit">Register Student</button>

            </form>
        </section>

        <!-- Student Records -->
        <section>
            <h2>Student Records</h2>

            <input type="text" id="searchInput"
                placeholder="Search by Student ID or Name">

            <p>Total Students: <span id="studentCount">0</span></p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Course</th>
                            <th>Section</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody id="studentTable">
                        <tr>
                            <td colspan="6">No student records yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Data Management -->
        <section>
            <h2>Data Management</h2>

            <button type="button" onclick="exportJSON()">
                Export JSON
            </button>

            <input type="file" id="jsonFile"
                accept=".json,application/json">

            <button type="button" onclick="importJSON()">
                Import JSON
            </button>

            <button type="button" onclick="exportXML()">
                Export XML
            </button>
        </section>

        <!-- PHP and Fetch API -->
        <section>
            <h2>PHP and Fetch API</h2>

            <button type="button" onclick="sendStudentsToPHP()">
                Send Records to PHP
            </button>

            <p id="serverMessage"></p>
        </section>

    </main>

    <!-- JavaScript -->
    <script src="script.js"></script>

</body>
</html>
