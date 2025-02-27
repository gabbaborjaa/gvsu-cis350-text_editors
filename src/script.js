document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const fileSelect = document.getElementById("fileSelect");
    const boldButton = document.querySelector(".bx-bold");
    const saveFileButton = document.getElementById("saveFileButton");
    const undoButton = document.querySelector(".bx-undo");
    const redoButton = document.querySelector(".bx-redo");
    const modal = document.getElementById("saveModal");
    const filenameInput = document.getElementById("file_name");
    const closeModal = document.querySelector(".close");

    function executeCommand(command, value = null) {
        document.execCommand(command, false, value);
    }

    boldButton.addEventListener("click", () => executeCommand("bold"));

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

    undoButton.addEventListener("click", () => executeCommand("undo"));
    redoButton.addEventListener("click", () => executeCommand("redo"));

    function getMimeType(filetype) {
        switch (filetype) {
            case 'pdf': return 'application/pdf';
            case 'md': return 'text/markdown';
            case 'txt': return 'text/plain';
            case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            default: return 'application/octet-stream';
        }
    }
});