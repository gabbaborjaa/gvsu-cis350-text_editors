document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const loadButton = document.getElementById("load-button");
    const fileSelect = document.getElementById("fileSelect");
    const undoButton = document.querySelector(".bx-undo");
    const redoButton = document.querySelector(".bx-redo");
    const boldButton = document.querySelector(".bx-bold");
    const underlineButton = document.querySelector(".bx-underline");
    const italicButton = document.querySelector(".bx-italic");
    const strikethroughButton = document.querySelector(".bx-strikethrough");
    const alignLeftButton = document.querySelector(".bx-align-left");
    const alignMiddleButton = document.querySelector(".bx-align-middle");
    const alignRightButton = document.querySelector(".bx-align-right");
    const alignJustifyButton = document.querySelector(".bx-align-justify");
    const orderedListButton = document.querySelector(".bx-list-ol");
    const unorderedListButton = document.querySelector(".bx-list-ul");
    const addLinkButton = document.querySelector(".bx-link");
    const unlinkButton = document.querySelector(".bx-unlink");
    const saveFileButton = document.getElementById("saveFileButton");
    const modal = document.getElementById("saveModal");
    const filenameInput = document.getElementById("file-name");
    const closeModal = document.querySelector(".close");
    const filePicker = document.getElementById("file-input");

    undoButton.addEventListener("click", () => executeCommand("undo"));
    redoButton.addEventListener("click", () => executeCommand("redo"));
    boldButton.addEventListener("click", () => executeCommand("bold"));
    underlineButton.addEventListener("click", () => executeCommand("underline"));
    italicButton.addEventListener("click", () => executeCommand("italic"));
    strikethroughButton.addEventListener("click", () => executeCommand("strikeThrough"));
    alignLeftButton.addEventListener("click", () => executeCommand("justifyLeft"));
    alignMiddleButton.addEventListener("click", () => executeCommand("justifyCenter"));
    alignRightButton.addEventListener("click", () => executeCommand("justifyRight"));
    alignJustifyButton.addEventListener("click", () => executeCommand("justifyFull"));
    orderedListButton.addEventListener("click", () => executeCommand("insertOrderedList"));
    unorderedListButton.addEventListener("click", () => executeCommand("insertUnorderedList"));
    addLinkButton.addEventListener("click", () => addLink());
    unlinkButton.addEventListener("click", () => executeCommand("unlink"));
    loadButton.addEventListener("click", () => filePicker.click());

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
