document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const loadButton = document.getElementById("load-button");
    const fileSelect = document.getElementById("fileSelect");
    const saveFileButton = document.getElementById("saveFileButton");
    const modal = document.getElementById("saveModal");
    const filenameInput = document.getElementById("file-name");
    const closeModal = document.querySelector(".close");
    const filePicker = document.getElementById("file-input");

    loadButton.addEventListener("click", () => filePicker.click());

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function() {
            this.classList.toggle("active");
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

    // Change color and highlight selectors based on text content
    document.addEventListener("selectionchange", () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
    
        const parentElement = selection.getRangeAt(0).commonAncestorContainer.parentElement;
        if (!parentElement) return;
    
        const computedStyle = window.getComputedStyle(parentElement);
    
        const toHex = (rgb) => 
            `#${rgb.slice(0, 3).map(x => (+x).toString(16).padStart(2, '0')).join('')}`;
    
        // Extract and update colors
        const textColor = computedStyle.color.match(/\d+/g);
        const highlightColor = computedStyle.backgroundColor.match(/\d+/g);
    
        if (textColor) colorPicker.value = toHex(textColor);
        if (highlightColor && highlightColor.join("") != "255255255") highlightPicker.value = toHex(highlightColor);
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

    filePicker.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            filenameInput.value = file.name;
            const reader = new FileReader();
            // Define callback function for Reader

            filenameInput.value = file.name;
            reader.onload = (e) => {
                content.innerHTML = e.target.result; // Set the text of the content div
            };
            //Calls onload after reading the file
            reader.readAsText(file);
            filePicker.value = "";

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

    saveFileButton.addEventListener("click", async () => {
        const filetype = fileSelect.value;
        const filename = filenameInput.value;
        if (filename) {
            const contentText = content.innerHTML;
            const response = await eel.save_file(filename, contentText, filetype)();
            if (response.includes("already exists")) {
                const override = confirm(response);
                if (override) {
                    await eel.save_file(filename, contentText, filetype, true)().then(alert);
                }
            } else {
                alert(response);
            }
            modal.style.display = "none";
        } else {
            alert("Please enter a filename.");
        }
    });

    function getMimeType(filetype) {
        switch (filetype) {
            case "pdf": return "application/pdf";
            case "md": return "text/markdown";
            case "txt": return "text/plain";
            case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            default: return "application/octet-stream";
        }
    }
});

function executeCommand(cmd, value = null) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
        document.execCommand(cmd, false, value);
        return;
    }
    content.focus();
    const range = document.createRange();
    range.selectNodeContents(content);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);

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
