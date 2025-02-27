document.addEventListener("DOMContentLoaded"), () => {
    const content = document.getElementById("content");
    const boldButton = document.getElementById(".bx-bold");
    
    function executeCommand(command, value = null){
        document.executeCommand(command, false, value);
    }

    boldButton.addEventListener("click", () => executeCommand("bold"));
}