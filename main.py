import eel
eel.init("src")

# Save File
@eel.expose
def save_file():
    pass

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
def load_file():
    pass

eel.start('index.html')