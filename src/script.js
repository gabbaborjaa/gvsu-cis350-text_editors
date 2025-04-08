document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const loadButton = document.getElementById("load-button");
    const fileSelect = document.getElementById("fileSelect");
    const saveButton = document.getElementById("saveButton");
    const modal = document.getElementById("saveModal");
    const filenameInput = document.getElementById("file-name");
    const closeModal = document.querySelector(".close");
    const filePicker = document.getElementById("file-input");

    loadButton.addEventListener("click", () => filePicker.click());
    // saveButton.addEventListener("click", () => filePicker.click());

    document.addEventListener("DOMContentLoaded", () => {
        const newButton = document.getElementById("new-button");

        newButton.addEventListener("click", () => {
            window.open(window.location.href, "_blank");
        })
    })

    // Active toggle
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function () {
            const alignButtons = ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"];
            const listButtons = ["insertOrderedList", "insertUnorderedList"];
            const nonToggleButtons = ["undo", "redo", "unlink", "addLink"];
            
            // Extract the command from the onclick attribute
            const command = this.getAttribute("onclick")?.replace(/executeCommand\('(.+?)'\)/, '$1')?.replace("addLink()", "addLink");
            
            if (nonToggleButtons.includes(command)) return;
            
            if (alignButtons.includes(command)) {
                alignButtons.forEach(cmd => {
                    document.querySelector(`button[onclick="executeCommand('${cmd}')"]`)?.classList.remove("active");
                });
                this.classList.add("active");
            } 
            else if (listButtons.includes(command)) {
                listButtons.forEach(cmd => {
                    document.querySelector(`button[onclick="executeCommand('${cmd}')"]`)?.classList.remove("active");
                });
                this.classList.add("active");
            } 
            else {
                this.classList.toggle("active");
            }
        });
    });
    

    // Color selector
    document.getElementById("colorPicker").addEventListener("input", function () {
        executeCommand("forecolor", this.value)
    });

    // Highlight selector
    document.getElementById("highlightPicker").addEventListener("input", function () {
        executeCommand("hiliteColor", this.value)
    });

    // Change button toggle based on cursor location
    document.addEventListener("selectionchange", () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
    
        const parentElement = selection.getRangeAt(0).commonAncestorContainer.parentElement;
        if (!parentElement || content.textContent === "") return;
        if (!parentElement.closest("#content")) return;
    
        const computedStyle = window.getComputedStyle(parentElement);
    
        // Helper function to convert RGB to Hex
        const toHex = (rgb) =>
            `#${rgb.slice(0, 3).map(x => (+x).toString(16).padStart(2, '0')).join('')}`;
    
        // Get colors
        const textColor = computedStyle.color.match(/\d+/g);
        const highlightColor = computedStyle.backgroundColor.match(/\d+/g);
    
        // Set color pickers based on the selected text color
        if (textColor) colorPicker.value = toHex(textColor);
        if (highlightColor && highlightColor.join("") != "255255255") highlightPicker.value = toHex(highlightColor);
    
        const commands = {
            "bold": "fontWeight", "italic": "fontStyle", "underline": "textDecorationLine", "strikeThrough": "textDecorationLine",
            "justifyLeft": "textAlign", "justifyCenter": "textAlign", "justifyRight": "textAlign", "justifyFull": "textAlign",
            "insertOrderedList": "listStyleType", "insertUnorderedList": "listStyleType",
        };
    
        const isInOrderedList = parentElement.closest("ol");
        const isInUnorderedList = parentElement.closest("ul");
    
        Object.keys(commands).forEach(command => {
            const button = document.querySelector(`button[onclick="executeCommand('${command}')"]`);
            if (!button) return;
    
            const style = computedStyle[commands[command]];
    
            if (
                (command === "bold" && style === "700") ||
                (command === "italic" && style === "italic") ||
                (command === "underline" && style.includes("underline")) ||
                (command === "strikeThrough" && style.includes("line-through")) ||
                (command.startsWith("justify") && style === command.replace("justify", "").toLowerCase()) ||
                (isInOrderedList && command === "insertOrderedList") ||
                (isInUnorderedList && command === "insertUnorderedList") ||
                (isInOrderedList && command === "insertOrderedList") ||
                (isInUnorderedList && command === "insertUnorderedList")
            ) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    });
    
    
    

    // Makes links clickable
    content.addEventListener("mouseenter", function () {
        const a = content.querySelectorAll('a');
        a.forEach(item => {
            item.addEventListener('mouseenter', function () {
                content.setAttribute('contenteditable', false);
                item.target = '_blank';
            })
            item.addEventListener('mouseleave', function () {
                content.setAttribute('contenteditable', true);
            })
        })
    });

    // HTML toggle
    const showCode = document.getElementById('show-code');
    let active = false;
    showCode.addEventListener('click', function () {
        active = !active
        showCode.dataset.active = active.toString()
        if(active) {
            content.textContent = content.innerHTML;
            content.setAttribute('contenteditable', false);
        } else {
            content.innerHTML = content.textContent;
            content.setAttribute('contenteditable', true);
        }
    })

    filePicker.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase(); // Get the file extension
            filenameInput.value = file.name; // Set the filename input value

            const reader = new FileReader();

            if (fileExtension === "txt") {
                // Handle .txt files
                reader.onload = (e) => {
                    const plainText = e.target.result;
                    const formattedText = plainText
                        .replace(/&/g, "&amp;") // Escape special characters
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/\n/g, "<br>") // Preserve line breaks
                        .replace(/ {2}/g, "&nbsp;&nbsp;"); // Preserve multiple spaces
                    content.innerHTML = formattedText; // Set the formatted text in the content div
                };
                reader.readAsText(file); // Read the file as plain text
            } else if (fileExtension === "md") {
                // Handle .md files
                reader.onload = (e) => {
                    const markdownText = e.target.result;
                    content.innerHTML = markdownToHtml(markdownText); // Convert Markdown to HTML
                };
                reader.readAsText(file); // Read the file as plain text
            } else if (fileExtension === "docx") {
                // Handle .docx files using mammoth.js
                const arrayBuffer = await file.arrayBuffer();

                mammoth.extractRawText({ arrayBuffer: arrayBuffer })
                    .then((result) => {
                        content.innerHTML = result.value.replace(/\n/g, "<br>"); // Preserve line breaks
                    })
                    .catch((err) => {
                        console.error("Error reading .docx file:", err);
                        alert("Failed to load the .docx file. Please ensure it is a valid document.");
                    });
            } else {
                alert("Unsupported file type. Please upload a .txt, .md, or .docx file.");
            }
        
            filePicker.value = ""; // Reset the file picker
            console.log("File loaded succesfully,")
        }
        
    });
    
    fileSelect.addEventListener("change", () => {
        if (fileSelect.value !== "new") {
            modal.style.display = "block";
        }
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // saveButton.addEventListener("click", async () => {
    //     const filetype = fileSelect.value;
    //     const filename = filenameInput.value;
    //     if (filename) {
    //         const contentText = content.innerHTML;
    //         const response = await eel.save_file(filename, contentText, filetype)();
    //         if (response.includes("already exists")) {
    //             const override = confirm(response);
    //             if (override) {
    //                 await eel.save_file(filename, contentText, filetype, true)().then(alert);
    //             }
    //         } else {
    //             alert(response);
    //         }
    //         modal.style.display = "none";
    //     } else {
    //         alert("Please enter a filename.");
    //     }
    // });

    // saveButton.addEventListener("click", () => {
    //     const filetype = fileSelect.value;
    //     const filename = filenameInput.value || "untitled";
    //     const contentText = content.innerHTML;
    
    //     if (!filetype) {
    //         alert("Please select a file type.");
    //         return;
    //     }
    
    //     let blob;
    //     switch (filetype) {
    //         case "txt":
    //             blob = new Blob([contentText], { type: "text/plain;charset=utf-8" });
    //             break;
    //         case "md":
    //             blob = new Blob([contentText], { type: "text/markdown;charset=utf-8" });
    //             break;
    //         case "pdf":
    //             alert("PDF export is not supported directly in the browser. Use the backend for this.");
    //             return;
    //         case "docx":
    //             alert("DOCX export is not supported directly in the browser. Use the backend for this.");
    //             return;
    //         default:
    //             alert("Unsupported file type.");
    //             return;
    //     }
    
    //     saveAs(blob, `${filename}.${filetype}`);
    //     modal.style.display = "none";
    // });

    
    saveButton.addEventListener("click", async () => {
        const filename = filenameInput.value.trim(); // Get the filename from the input
        const filetype = filename.split('.').pop().toLowerCase(); // Infer file type from the filename
        const contentText = content.innerHTML; // Get the content from the editor
    
        if (!filename) {
            alert("Please enter a filename.");
            return;
        }
    
        if (!["txt", "md", "pdf", "docx"].includes(filetype)) {
            alert("Unsupported file type. Please use a valid file extension (e.g., .txt, .md, .pdf, .docx).");
            return;
        }
    
        try {
            // Call the backend save_file function using Eel
            const response = await eel.save_file(filename, contentText, filetype, true)(); // Always override
            alert(response); // Show the response from the backend
        } catch (error) {
            console.error("Error saving file:", error);
            alert("Failed to save the file. Please try again.");
        }
    });
    
    // Helper function to get MIME type based on file type
    function getMimeType(filetype) {
        switch (filetype) {
            case "pdf":
                return "application/pdf";
            case "md":
                return "text/markdown";
            case "txt":
                return "text/plain";
            case "docx":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            default:
                return "application/octet-stream";
        }
    }
   
});

function executeCommand(cmd, value = null) {
    content.blur()
    content.focus();
    if (value) {
        document.execCommand(cmd, false, value);
    } else {
        document.execCommand(cmd);
    }
}


function addLink() {
    const url = prompt("Insert URL");
    executeCommand("createLink", url);
}

function markdownToHtml(markdownText) {
    return marked.parse(markdownText); // Convert Markdown to HTML using marked.js
}

window.addEventListener("beforeunload", (event) => {
    // Display a warning message
    event.preventDefault();
    event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
});

module.exports = executeCommand;