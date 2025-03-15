import eel
import os
from fpdf import FPDF
import markdown
#from docx import Document

eel.init("src")

# Save File
@eel.expose
def save_file(filename, content, filetype, override=False):
    if os.path.exists(filename) and not override:
       return f"File {filename} already exists. Do you want to override it?"

    if filetype == 'pdf':
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0,10, content)
        pdf.output(filename)
    elif filetype == 'md':
        with open(filename, 'w') as file:
            file.write(content)
    elif filetype == 'txt':
        with open(filename, 'w') as file:
            file.write(content)
    elif filetype == 'docx':
        doc = Document()
        doc.add_paragraph(content)
        doc.save(filename)
    else:
        return f"Unsupported file type: {filetype}"
    return f"File {filename}.{filetype} saved successfully."

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
