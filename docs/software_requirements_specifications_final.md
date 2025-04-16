# Overview

The purpose of this document is to highlight the functionalities, behaviors, and capabilities of Jotter, a text editor application. Jotter aims to provide users with a simple, efficient, and user-friendly text editor that balances functionality and ease of use.

# Software Artifacts
[Use Case Diagram](../artifacts/use_case_diagram/Text-Editor_Use-Case.drawio.png)

[Sequence Diagrams](../artifacts/sequence%20_diagram/)

[Class Diagram](../artifacts/class_diagram/ClassDiagram.png)


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
| FR9 | The user shall be able to save their text document locally. | 
| FR10 | The user shall be able to save the document in different formats (txt, pdf, md, docx). | 
| FR11 | The user shall be able to load an existing text document. | 
| FR12 | The user shall be able to override an existing file or create a new file if it already exists. | 
| FR13 | The user shall be able to choose the location to save their files. | 


### Undo/Redo

| ID  | Requirement     | 
| :-------------: | :----------: | 
| FR14 | The user shall be able to undo the last action. | 
| FR15 | The user shall be able to redo the last undone action. | 
| FR16 | The user shall be able to perform multiple undos and redos in a row. | 


### User Interface
| ID  | Requirement     | 
| :-------------: | :----------: | 
| FR17 | The user shall be able to interact with the application through a graphical user interface (GUI). | 
| FR18 | The user shall be able to use a toolbar to access text formatting and file operation features. | 
| FR19 | The user shall be able to use a modal to save files and choose the save location. | 


## Non-Functional Requirements

### Performance

| ID  | Requirement     | 
| :-------------: | :----------: | 
| NFR1 | The application shall load and save files within 2 seconds. | 
| NFR2 | The application shall handle text documents up to 10,000 words without performance degradation. | 
| NFR3 | <Requirement 3> | 
| … | … |

### Usability

| ID  | Requirement     | 
| :-------------: | :----------: | 
| NFR4 | The application shall have an intuitive and user-friendly interface.| 
| NFR5 | The application shall provide tooltips for all toolbar buttons.| 
| NFR6 | The application shall be able to be used in light and dark mode themes.| 
<!-- | … | … | -->

### Compatibility

| ID  | Requirement     | 
| :-------------: | :----------: | 
| NFR7 | The application shall be responsive and work on different screen sizes (desktop, tablet, mobile).| 
| NFR8 | The application shall be compatible with modern web browsers (Chrome, Firefox, Safari, Edge).| 
| NFR9 | The application shall be compatible with most popular Oerating Systems (Mac, Windows, Linux) | 
<!-- | … | … | -->

### Security

| ID  | Requirement     | 
| :-------------: | :----------: | 
| NFR10 | The application shall not store any user data on the server.| 
| NFR11 | The application shall ask for any personal data to be shared online. | 
| NFR12 | <Requirement 3> | 


### Maintainability

| ID  | Requirement     | 
| :-------------: | :----------: | 
| NFR13 | The application shall use version control (Git) for source code management. | 
<!-- | MA2 | <Requirement 2> |  -->
<!-- | MA3 | <Requirement 3> |  -->
<!-- | … | … | -->

