import os

# "." = dossier actuel (ton projet déjà ouvert)
project_path = "."

# Création du dossier data
data_folder = os.path.join(project_path, "data")
os.makedirs(data_folder, exist_ok=True)

# Création du fichier data.json
file_path = os.path.join(data_folder, "data.json")

with open(file_path, "w") as f:
    f.write("[]")

print("Dossier data créé dans le projet existant")