document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const loadButton = document.getElementById("load-button");
    const fileSelect = document.getElementById("fileSelect");
    const saveFileButton = document.getElementById("saveFileButton");
    const modal = document.getElementById("saveModal");
    const filenameInput = document.getElementById("file-name");
    const closeModal = document.querySelector(".close");
    const filePicker = document.getElementById("file-input");

    // Rich Text Formatting Buttons
    document.querySelector(".bx-undo").addEventListener("click", () => executeCommand("undo"));
    document.querySelector(".bx-redo").addEventListener("click", () => executeCommand("redo"));
    document.querySelector(".bx-bold").addEventListener("click", () => executeCommand("bold"));
    document.querySelector(".bx-underline").addEventListener("click", () => executeCommand("underline"));
    document.querySelector(".bx-italic").addEventListener("click", () => executeCommand("italic"));
    document.querySelector(".bx-strikethrough").addEventListener("click", () => executeCommand("strikeThrough"));
    document.querySelector(".bx-align-left").addEventListener("click", () => executeCommand("justifyLeft"));
    document.querySelector(".bx-align-middle").addEventListener("click", () => executeCommand("justifyCenter"));
    document.querySelector(".bx-align-right").addEventListener("click", () => executeCommand("justifyRight"));
    document.querySelector(".bx-align-justify").addEventListener("click", () => executeCommand("justifyFull"));
    document.querySelector(".bx-list-ol").addEventListener("click", () => executeCommand("insertOrderedList"));
    document.querySelector(".bx-list-ul").addEventListener("click", () => executeCommand("insertUnorderedList"));
    document.querySelector(".bx-link").addEventListener("click", () => addLink());
    document.querySelector(".bx-unlink").addEventListener("click", () => executeCommand("unlink"));
    loadButton.addEventListener("click", () => filePicker.click());


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
        if (highlightColor && highlightColor.join("") != "255255255") highlightPicker.value = toHex(bgColor);
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

function executeCommand(cmd, value=null) {
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

function addLink() {
    const url = prompt("Insert URL");
    executeCommand("createLink", url);
}
