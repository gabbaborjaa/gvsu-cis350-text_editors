# Overview

The purpose of this document is to highlight the functionalities, behaviors, and capabilities of Jotter, a text editor application. Jotter aims to provide users with a simple, efficient, and user-friendly text editor that balances functionality and ease of use.

## Functional Requirements

### 1. Text Editing
1. The user shall be able to create a new text document.
2. The user shall be able to edit the text document.
3. The user shall be able to format text (bold, italic, underline, strikethrough).
4. The user shall be able to change text alignment (left, center, right, justify).
5. The user shall be able to create ordered and unordered lists.
6. The user shall be able to insert and remove hyperlinks.
7. The user shall be able to change the font size.
8. The user shall be able to change text color and highlight color.

### 2. File Operations
1. The user shall be able to save their text document locally.
2. The user shall be able to save the document in different formats (txt, pdf, md, docx).
3. The user shall be able to load an existing text document.
4. The user shall be able to override an existing file or create a new file if it already exists.
5. The user shall be able to choose the location to save their files.

### 3. Undo/Redo
1. The user shall be able to undo the last action.
2. The user shall be able to redo the last undone action.

### 4. User Interface
1. The user shall be able to interact with the application through a graphical user interface (GUI).
2. The user shall be able to use a toolbar to access text formatting and file operation features.
3. The user shall be able to use a modal to save files and choose the save location.

## Non-Functional Requirements

### 1. Performance
1. The application shall load and save files within 2 seconds.
2. The application shall handle text documents up to 10,000 words without performance degradation.

### 2. Usability
1. The application shall have an intuitive and user-friendly interface.
2. The application shall provide tooltips for all toolbar buttons.

### 3. Compatibility
1. The application shall be responsive and work on different screen sizes (desktop, tablet, mobile).
2. The application shall be compatible with modern web browsers (Chrome, Firefox, Safari, Edge).

### 4. Security
1. The application shall not store any user data on the server.

### 5. Maintainability
1. The application shall use version control (Git) for source code management.

## Use Case Description: Save File

### Description: The user saves the current text document to their local file system. The user can choose the file format (txt, pdf, md, docx) and the location to save the file. If the file already exists, the user is prompted to either override the existing file or create a new file.

### Preconditions:

- The user has created or edited a text document.
- The user has provided a filename.
Postconditions:

### The text document is saved in the chosen format and location.
- If the file already existed and the user chose to override it, the existing file is replaced with the new content.
- If the file did not exist or the user chose to create a new file, a new file is created with the provided content.

### Main Flow:

1. The user clicks on the "File" dropdown menu and selects a file format to save the document (txt, pdf, md, docx).
2. The system displays a modal prompting the user to confirm the save action.
3. The user confirms the save action.
4. The system checks if a file with the provided filename already exists.
5. If the file exists, the system prompts the user to either override the existing file or create a new file.
6. The user chooses to either override the existing file or create a new file.
7. The system saves the file in the chosen format and location.
8. The system displays a confirmation message indicating that the file has been saved successfully.

### Alternate Flows:

#### File Already Exists:

1. If the file already exists, the system prompts the user to either override the existing file or create a new file.
2. The user chooses to override the existing file.
3. The system overrides the existing file with the new content.
4. The system displays a confirmation message indicating that the file has been saved successfully.

#### File Does Not Exist:

1. If the file does not exist, the system saves the file in the chosen format and location.
2. The system displays a confirmation message indicating that the file has been saved successfully.

SRS used:

1. Feature #2, Functional Requirement #1: The user shall be able to save their text document locally.
2. Feature #2, Functional Requirement #2: The user shall be able to save the document in different formats (txt, pdf, md, docx).
3. Feature #2, Functional Requirement #4: The user shall be able to override an existing file or create a new file if it already exists.
4. Feature #2, Functional Requirement #5: The user shall be able to choose the location to save their files.


