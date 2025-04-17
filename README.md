# Jotter

A super cool text editor that allows you to customize colors, exports to PDF's, has amazing version control, undo's and redo's your progress and everything else that a super cool editor does for all your everyday tasks.

# Team Members and Roles

* [Gabriel Borja](https://github.com/gabbaborjaa/CIS350-HW2-Borja) (Project Leader, Programmer, Project Manager)
* [Cardell Taylor](https://github.com/CTaylah/CIS350-HW2-Taylor) (Programmer, Git Manager)
* [Charlie Monterroso](https://github.com/CharlieMonte/CIS350-HW2-Monterroso) (UX Researcher, Programmer)
* [John Le](https://github.com/JoLe2004/CIS350-HW2-Le) (UI Design, Programmer) 

# Prerequisites

# Run Instructions

# 1 Abstract
Writing is an essential part of everyday life, whether for work, school, or personal projects. However, finding a simple, efficient, and user-friendly text editor that meets individual needs can be challenging. Many existing editors are either too complex, lack necessary features, or fail to provide an intuitive experience. Our text editor "Jotter" aims to develop a text editor that balances functionality and ease of use, providing users with a seamless writing experience. The editor will offer essential text editing features, such as formatting, saving, and loading documents. By creating an intuitive and accessible tool, our goal is to streamline the writing process and enhance productivity for users across various domains.
# 2 Introduction
Our project, "Jotter," is a user-friendly text editor designed for individuals who may feel overwhelmed by the multitude of options in popular text editors. By focusing on simplicity and usability, Jotter offers an intuitive interface that minimizes distractions and provides a seamless writing experience. The goal is to create a tool that allows users to concentrate on their writing without being bogged down by unnecessary features and icons.

Jotter aims to be the perfect solution for students, professionals, and casual writers who seek a straightforward and efficient text editor. With its clean design and essential functionality, Jotter makes it easy for users to get started right away, without the need for extensive tutorials or setup. The emphasis on a minimalist approach ensures that users can focus on their content, making Jotter an ideal choice for those who value simplicity and productivity.

#### Features

- **Minimalist Interface**: A clean and uncluttered design that reduces distractions and enhances the writing experience.
- **Essential Tools**: Provides only the most important tools and features needed for writing, without overwhelming users with excessive options.
- **Customization**: Allows users to customize the interface and features according to their preferences, ensuring a personalized experience.
- **Autosave**: Automatically saves the user's work at regular intervals to prevent data loss and ensure peace of mind.
# 3 Architectural Design

## 3.1 Use Case Diagram
<p align="center">
  <img src="./artifacts/use_case_diagram/Text-Editor_Use-Case.drawio.png" width="300" title="Use_Case">
  <br>
  Figure 1: Use Case Diagram
</p>

## 3.2 Class Diagram

## 3.3 Sequence Diagram
<p align="center">
  <img src="./artifacts/sequence_diagram/Figure1.png" width="300" title="Figure 2">
  <br>
  Figure 2: Sequence Diagram for Editing Documents
</p>

<p align="center">
  <img src="./artifacts/sequence_diagram/Figure2.png" width="300" title="Figure 3">
  <br>
  Figure 3: Sequence Diagram for Loading Documents
</p>

<p align="center">
  <img src="./artifacts/sequence_diagram/Figure3.png" width="300" title="Figure 4">
  <br>
  Figure 3: Sequence Diagram for Saving Documents
</p>

# 4 User Guide/Implementation

## 4.1 Downloading Jotter
1. Clone this repo
2. Run `npm install eel`
3. Run `python3 main.py`

## 4.2 Creating and Opening Files
1. To create a file, simply use the automatically generated file to write in and you'll be able to save this as different file formats later. If the document is already filled, save the document (see 4.4) and once you've checked it was saved correctly, delete the content in the document and you can now use it as a new document.
2. To open a file, click on the "Load" button which is placed in the upper-left corner, but just right of the title box.

## 4.3 Editing Tools
Jotter gives you the tools to add emphasis to your writing. You can change the font, font size, color, and highlight color by using the buttons in the top row of the toolbar. In the second row of available tools, there are buttons to: undo, redo, bold, underline, italicize, left-align, middle-align, right-align, justified-align, create numbered lists, create bullet points, add link, and toggle source code.

## 4.4 Saving and Exporting
To save and export your document, click on "File" which is just right of the "Load" button. Click save to .txt to save as a text file.

