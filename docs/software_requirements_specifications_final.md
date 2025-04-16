# Overview

The purpose of this document is to highlight the functionalities, behaviors, and capabilities of Jotter, a text editor application. Jotter aims to provide users with a simple, efficient, and user-friendly text editor that balances functionality and ease of use.

# Software Artifacts

# Software Requirements

## Functional Requirements

### Text Editing

| ID  | Requirement     | 
| :-------------: | :----------: | 
| FR1 | The user shall be able to create a new text document |
| FR2 | The user shall be able to edit the text document. |
| FR3 | The user shall be able to format text (bold, italic, underline, strikethrough). |
| FR4 | The user shall be able to change text alignment (left, center, right, justify). |
| FR5 | The user shall be able to create ordered and unordered lists. | 
| FR6 | The user shall be able to insert and remove hyperlinks. | 
| FR7 | The user shall be able to change the font size. | 
| FR8 | The user shall be able to change text color and highlight color. | 


### File Operations

| ID  | Requirement     | 
| :-------------: | :----------: | 
| FR1 | The user shall be able to save their text document locally. | 
| FR2 | The user shall be able to save the document in different formats (txt, pdf, md, docx). | 
| FR3 | The user shall be able to load an existing text document. | 
| FR4 | The user shall be able to override an existing file or create a new file if it already exists. | 
| FR5 | The user shall be able to choose the location to save their files. | 


### Undo/Redo

| ID  | Requirement     | 
| :-------------: | :----------: | 
| FR1 | The user shall be able to undo the last action. | 
| FR2 | The user shall be able to redo the last undone action. | 
| FR3 | The user shall be able to perform multiple undos and redos in a row. | 


### User Interface
| ID  | Requirement     | 
| :-------------: | :----------: | 
| FR1 | The user shall be able to interact with the application through a graphical user interface (GUI). | 
| FR2 | The user shall be able to use a toolbar to access text formatting and file operation features. | 
| FR3 | The user shall be able to use a modal to save files and choose the save location. | 


## Non-Functional Requirements

### Performance

| ID  | Requirement     | 
| :-------------: | :----------: | 
| PR1 | The application shall load and save files within 2 seconds. | 
| PR2 | The application shall handle text documents up to 10,000 words without performance degradation. | 
| PR3 | <Requirement 3> | 
| … | … |

### Usability

| ID  | Requirement     | 
| :-------------: | :----------: | 
| US1 | The application shall have an intuitive and user-friendly interface.| 
| US2 | The application shall provide tooltips for all toolbar buttons.| 
| US3 | The application shall be able to be used in light and dark mode themes.| 
<!-- | … | … | -->

### Compatibility

| ID  | Requirement     | 
| :-------------: | :----------: | 
| CP1 | The application shall be responsive and work on different screen sizes (desktop, tablet, mobile).| 
| CP2 | The application shall be compatible with modern web browsers (Chrome, Firefox, Safari, Edge).| 
| CP3 | The application shall be compatible with most popular Oerating Systems (Mac, Windows, Linux) | 
<!-- | … | … | -->

### Security

| ID  | Requirement     | 
| :-------------: | :----------: | 
| SC1 | The application shall not store any user data on the server.| 
| SC2 | The application shall ask for any personal data to be shared online. | 


### Maintainability

| ID  | Requirement     | 
| :-------------: | :----------: | 
| MA1 | The application shall use version control (Git) for source code management. | 
<!-- | MA2 | <Requirement 2> |  -->
<!-- | MA3 | <Requirement 3> |  -->
<!-- | … | … | -->

