document.addEventListener("DOMContentLoaded", () => {
    //Grab relevant HTML elements
    const fileOptions = document.getElementById("file-options");
    const fileInput = document.getElementById("file-input");
    const contentDiv = document.getElementById("content");

    // Listen for changes in the file-options dropdown menu
    fileOptions.addEventListener("change", (event) => {
        // If load was selecte
        if (event.target.value === "load") {
            // Trigger the hidden "file-input"
            fileInput.click();
            fileOptions.value = ""; // Reset dropdown selection
        }
    });

    // Listen for user to pick file 
Load file content into editorLoad file content into editor    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            // Define callback function for Reader
            reader.onload = (e) => {
                contentDiv.innerText = e.target.result; // Set the text of the content div
            };
            //Calls onload after reading the file
            reader.readAsText(file);
        }
    });
});

