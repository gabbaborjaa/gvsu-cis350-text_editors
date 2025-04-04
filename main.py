import eel
import os
from fpdf import FPDF
from docx import Document
from htmldocx import HtmlToDocx

eel.init("src")

# Save File
@eel.expose
def save_file(filename, content, filetype, override=False):
    # Add the correct file extension if not already present
    if not filename.endswith(f".{filetype}"):
        filename = f"{filename}.{filetype}"

    if os.path.exists(filename) and not override:
        return f"File {filename} already exists. Do you want to override it?"

    try:
        if filetype == 'pdf':
            pdf = FPDF()
            pdf.add_page()
            pdf.set_font("Arial", size=12)
            pdf.multi_cell(0, 10, content)
            pdf.output(filename)
        elif filetype == 'md':
            with open(filename, 'w') as file:
                file.write(content)
        elif filetype == 'txt':
            with open(filename, 'w') as file:
                file.write(content)
        elif filetype == 'docx':
            doc = Document()
            converter = HtmlToDocx()
            converter.add_html_to_document(content, doc)
            doc.save(filename)
        else:
            return f"Unsupported file type: {filetype}"
        return f"File {filename} saved successfully."
    except Exception as e:
        return f"An error occurred while saving the file: {str(e)}"

# Undo 
@eel.expose
def undo():
    pass

# Redo
@eel.expose
def redo():
    pass

# Load File
@eel.expose
def load_file(filename):
    if os.path.exists(filename):
        with open(filename, 'r') as file:
            content = file.read()
        return content
    else:
        return f"File {filename} does not exist."

eel.start('index.html')
