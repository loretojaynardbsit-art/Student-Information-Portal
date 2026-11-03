
// Student Records
let students = JSON.parse(localStorage.getItem("students")) || [];


// Save student records to localStorage
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}


// Registration Form
let studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let id = document.getElementById("studentId").value.trim();
    let name = document.getElementById("studentName").value.trim();
    let course = document.getElementById("course").value.trim();
    let section = document.getElementById("section").value.trim();
    let email = document.getElementById("email").value.trim();

    let existingStudent = students.some(function(student) {
        return student.id.toLowerCase() === id.toLowerCase();
    });

    if (existingStudent) {
        alert("Student ID already exists!");
        return;
    }

    let student = {
        id: id,
        name: name,
        course: course,
        section: section,
        email: email
    };

    students.push(student);

    saveStudents();
    displayStudents();
    studentForm.reset();

    alert("Student registered successfully!");
});


// Display and Search Students
function displayStudents() {
    let table = document.getElementById("studentTable");
    let count = document.getElementById("studentCount");

    let searchValue = document.getElementById("searchInput")
        .value.toLowerCase().trim();

    table.innerHTML = "";
    count.textContent = students.length;

    let filteredStudents = students.map(function(student, index) {
        return {
            student: student,
            index: index
        };
    }).filter(function(item) {
        return item.student.id.toLowerCase().includes(searchValue) ||
               item.student.name.toLowerCase().includes(searchValue);
    });

    if (filteredStudents.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6">No matching student found.</td>
            </tr>
        `;
        return;
    }

    filteredStudents.forEach(function(item) {
        let student = item.student;

        let row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.section}</td>
                <td>${student.email}</td>
                <td>
                    <button class="edit-btn"
                        onclick="editStudent(${item.index})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteStudent(${item.index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        table.innerHTML += row;
    });
}


// Search Listener
let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {
    displayStudents();
});


// Edit Student
function editStudent(index) {
    let student = students[index];

    let newName = prompt("Enter new full name:", student.name);
    if (newName === null) return;

    let newCourse = prompt("Enter new course:", student.course);
    if (newCourse === null) return;

    let newSection = prompt("Enter new section:", student.section);
    if (newSection === null) return;

    let newEmail = prompt("Enter new email:", student.email);
    if (newEmail === null) return;

    if (
        newName.trim() === "" ||
        newCourse.trim() === "" ||
        newSection.trim() === "" ||
        newEmail.trim() === ""
    ) {
        alert("All fields are required!");
        return;
    }

    student.name = newName.trim();
    student.course = newCourse.trim();
    student.section = newSection.trim();
    student.email = newEmail.trim();

    saveStudents();
    displayStudents();

    alert("Student record updated successfully!");
}


// Delete Student
function deleteStudent(index) {
    let confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
        students.splice(index, 1);

        saveStudents();
        displayStudents();

        alert("Student record deleted successfully!");
    }
}


// Initial Display
displayStudents();


// Export Student Records as JSON
function exportJSON() {
    if (students.length === 0) {
        alert("There are no student records to export.");
        return;
    }

    let jsonData = JSON.stringify(students, null, 4);

    let file = new Blob([jsonData], {
        type: "application/json"
    });

    let url = URL.createObjectURL(file);

    let link = document.createElement("a");
    link.href = url;
    link.download = "student_records.json";

   document.body.appendChild(link);
link.click();
link.remove();

// Release the temporary download URL
setTimeout(function() {
    URL.revokeObjectURL(url);
}, 1000);

}


// Import Student Records from JSON
function importJSON() {
    let fileInput = document.getElementById("jsonFile");
    let file = fileInput.files[0];

    if (!file) {
        alert("Please choose a JSON file first.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(event) {
        try {
            let importedStudents = JSON.parse(event.target.result);

            if (!Array.isArray(importedStudents)) {
                alert("Invalid JSON file.");
                return;
            }

            let addedCount = 0;

            importedStudents.forEach(function(student) {
                if (
                    !student ||
                    !student.id ||
                    !student.name ||
                    !student.course ||
                    !student.section ||
                    !student.email
                ) {
                    return;
                }

                let newStudent = {
                    id: String(student.id).trim(),
                    name: String(student.name).trim(),
                    course: String(student.course).trim(),
                    section: String(student.section).trim(),
                    email: String(student.email).trim()
                };

                let exists = students.some(function(existing) {
                    return existing.id.toLowerCase() ===
                           newStudent.id.toLowerCase();
                });

                if (!exists) {
                    students.push(newStudent);
                    addedCount++;
                }
            });

            saveStudents();
            displayStudents();
            fileInput.value = "";

            alert(addedCount + " student record(s) imported successfully!");

        } catch (error) {
            alert("Invalid JSON file. Please select a valid file.");
        }
    };

    reader.readAsText(file);
}


// Export Student Records as XML
function exportXML() {
    if (students.length === 0) {
        alert("There are no student records to export.");
        return;
    }

    function escapeXML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    }

    let xmlData = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlData += '<students>\n';

    students.forEach(function(student) {
        xmlData += '    <student>\n';
        xmlData += '        <id>' + escapeXML(student.id) + '</id>\n';
        xmlData += '        <name>' + escapeXML(student.name) + '</name>\n';
        xmlData += '        <course>' + escapeXML(student.course) + '</course>\n';
        xmlData += '        <section>' + escapeXML(student.section) + '</section>\n';
        xmlData += '        <email>' + escapeXML(student.email) + '</email>\n';
        xmlData += '    </student>\n';
    });

    xmlData += '</students>';

    let file = new Blob([xmlData], {
        type: "application/xml"
    });

    let url = URL.createObjectURL(file);

    let link = document.createElement("a");
    link.href = url;
    link.download = "student_records.xml";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    alert("XML file exported successfully!");
}


// Send Student Records to PHP using Fetch API
function sendStudentsToPHP() {
    if (students.length === 0) {
        alert("There are no student records to send.");
        return;
    }

    fetch("students_api.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(students)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Server response error.");
        }

        return response.json();
    })
    .then(function(data) {
        document.getElementById("serverMessage").textContent =
            data.message + " Total students received: " +
            data.totalStudents;
    })
    .catch(function(error) {
        document.getElementById("serverMessage").textContent =
            "Error connecting to PHP: " + error.message;
    });
}
