function addStudent() {
    var response = "";
    var jsonData = new Object();
// Use FormData to collect form data (including files)
var formData = new FormData();
    
    
    // Append text fields to FormData object
    formData.append("adminNumber", document.getElementById("adminnumber").value);
    formData.append("name", document.getElementById("name").value);
    formData.append("diploma", document.getElementById("diploma").value);
    formData.append("cGPA", document.getElementById("cgpa").value);

    // Append the profile image file (if any)
    var fileInput = document.querySelector('input[name="profileImage"]');
    if (fileInput.files.length > 0) {
        formData.append("profileImage", fileInput.files[0]);
    }

    // Validate form fields before sending
    if (formData.get("adminNumber") == "" || formData.get("name") == "" || formData.get("diploma") == "" || formData.get("cGPA") == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return; // Exit function if any field is empty
    }

    var request = new XMLHttpRequest();
    request.open("POST", "/add-student", true);
    // request.setRequestHeader('Content-Type', 'multipart/form-data',boundary='----WebKitFormBoundary7MA4YWxkTrZu0gW');
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)

        if (response.message == undefined) {
            // Display success message
            document.getElementById("message").innerHTML = 'Added Student: ' + formData.get("adminNumber") + '!';
            document.getElementById("message").setAttribute("class", "text-success");

            // Clear form fields after successful submission
            document.getElementById("adminnumber").value = "";
            document.getElementById("name").value = "";
            document.getElementById("diploma").value = "";
            document.getElementById("cgpa").value = "";
            window.location.href = 'index.html';
        } else {
            // Display error message
            document.getElementById("message").innerHTML = 'Unable to add resource!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };
   // Send the FormData object, which automatically handles multipart form-data encoding and boundary
   request.send(formData);
}