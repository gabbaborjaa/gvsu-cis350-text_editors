import eel
import os
from fpdf import FPDF
from docx import Document
from htmldocx import HtmlToDocx
import flet as ft

class FileManager:
    def __init__(self):
        eel.init("src")

    @eel.expose
    def save_file(self, filename, content, filetype, override=False):
        # Add the correct file extension if not already present
        if not filename.endswith(f".{filetype}"):
            filename = f"{filename}.{filetype}"

        if os.path.exists(filename) and not override:
            return f"File {filename} already exists. Do you want to override it?"

        try:
            if filetype == 'pdf':
                self._save_as_pdf(filename, content)
            elif filetype == 'md':
                self._save_as_text(filename, content)
            elif filetype == 'txt':
                self._save_as_text(filename, content)
            elif filetype == 'docx':
                self._save_as_docx(filename, content)
            else:
                return f"Unsupported file type: {filetype}"
            return f"File {filename} saved successfully."
        except Exception as e:
            return f"An error occurred while saving the file: {str(e)}"

    def _save_as_pdf(self, filename, content):
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0, 10, content)
        pdf.output(filename)

    def _save_as_text(self, filename, content):
        with open(filename, 'w') as file:
            file.write(content)

    def _save_as_docx(self, filename, content):
        doc = Document()
        converter = HtmlToDocx()
        converter.add_html_to_document(content, doc)
        doc.save(filename)

    @eel.expose
    def load_file(self, filename):
        if os.path.exists(filename):
            with open(filename, 'r') as file:
                content = file.read()
            return content
        else:
            return f"File {filename} does not exist."

    @eel.expose
    def undo(self):
        pass

    @eel.expose
    def redo(self):
        pass

    def start_app(self):
        eel.start('index.html')


if __name__ == "__main__":
    file_manager = FileManager()
    file_manager.start_app()
