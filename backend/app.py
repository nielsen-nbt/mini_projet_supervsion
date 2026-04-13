from flask import Flask, jsonify
from flask_cors import CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

machines = [f"Serveur-{i}" for i in range(1, 11)]

@app.route('/')
def home():
    return "<h1>Serveur de Supervision </h1><p>Données : <a href='/data'>/data</a></p>"

@app.route('/data')
def get_data():
    timestamp = datetime.now().strftime("%H:%M:%S")
    data = []
    
    for nom in machines:
        data.append({
            "nom": nom,
            "temperature": random.randint(30, 75), # Température réaliste
            "cpu": random.randint(5, 95),          # Charge CPU variable
            "timestamp": timestamp
        })
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5005)
