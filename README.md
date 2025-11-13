🌱 Robust Offline Smart Agriculture System Using ESP32 & Machine Learning

This project is a fully offline, real-time smart agriculture system that reads live sensor data from an ESP32, performs machine learning predictions, generates fertilizer recommendations, raises disease alerts, and displays everything in a clean React web dashboard — all without internet.

It is designed for remote agricultural areas where network connectivity is poor or unavailable.

⸻

🚀 Features

✔️ Real-time ESP32 Sensor Feed (USB Serial → WebSocket)
• Reads NPK, pH, temperature, humidity, soil moisture, rainfall, latitude, longitude
• Data flows automatically into the web app
• Smooth live UI with animated metric tiles

✔️ Offline ML Prediction
• Predicts the best crop to grow
• Shows confidence percentage
• Provides fertilizer recommendations
• Generates disease alerts based on conditions
• Works 100% offline — no cloud API needed

✔️ Manual Input Mode
• Enter sensor values manually when ESP32 is not connected

✔️ History Tracking
• Every prediction is saved in a local JSON “database”
• Includes timestamp, sensor values, crop result, fertilizer & disease alerts
• Generates offline map images showing user’s state in India

✔️ Offline Map Generation
• No Google Maps / API keys required
• Uses GeoPandas + Matplotlib to draw India map and highlight exact state

✔️ Clean, Professional UI
• Live Feed at the top
• Manual input below
• Beautiful History viewer
• Smooth animations & consistent look

⸻

🧩 System Architecture

ESP32 (USB Serial)
|
scripts/ingest_from_esp32.py
| (parses JSON / k=v)
v
FastAPI Backend ← ML models (RandomForest + Scaler + LabelEncoder)
|
WebSocket broadcast for live data
|
React Frontend (LiveFeed + Manual + History)
|
Local JSON DB (History)

Everything stays local — nothing leaves your device.

⸻

📡 Components Overview

1. ESP32

Reads sensor values every 2–3 seconds and prints JSON over serial.
Example output:

{"N":30,"P":20,"K":80,"pH":6.5,"temp":26,"humidity":58,"soil":40,"rainfall":1.2,"lat":12.97,"lon":77.59}

⸻

2. Serial Ingestion Script

scripts/ingest_from_esp32.py
• Detects the correct USB port
• Reads ESP32 serial output
• Converts to JSON
• Sends to backend via WebSocket
• Also supports simulation (--simulate) without hardware

⸻

3. FastAPI Backend

server/main.py
• Loads machine learning models
• Accepts ESP32 data via WebSocket /ws/esp32
• Exposes /predict_crop for manual input & ESP32 predictions
• Saves all predictions to db/predictions.json
• Generates offline map PNGs /history_map/{id}.png

⸻

4. Machine Learning Models
   • crop_model.joblib → RandomForest crop classifier
   • scaler.joblib → Normalizes sensor inputs
   • label_encoder.joblib → Converts model output → crop names
   • fertilizer_recommender.py → Suggests fertilizer
   • get_disease_alerts() → Adds disease warnings

⸻

5. React Frontend
   • LiveFeed.jsx → Real-time sensor grid
   • StartPrediction.js → Manual input + Predict
   • History.js → Shows previous predictions + offline maps
   • Clean UI with pill navigation tabs

⸻

🛠️ Setup Instructions

1. Create and activate virtual environment

python3 -m venv venv
source venv/bin/activate

2. Install backend dependencies

pip install -r requirements.txt

3. Start backend

uvicorn server.main:app --reload

4. Start frontend

cd frontend
npm install
npm start

5. Run ESP32 ingestion script

python scripts/ingest_from_esp32.py

Or run fake data:

python scripts/ingest_from_esp32.py --simulate

⸻

🗂️ Project Folder Structure

offline-ml-project/
│
├── server/
│ ├── main.py
│ ├── models_loader.py
│ ├── utils.py
│ ├── db_json.py
│ └── ...
│
├── scripts/
│ ├── ingest_from_esp32.py
│ └── ws_test_send.py
│
├── models/
│ ├── crop_model.joblib
│ ├── scaler.joblib
│ └── label_encoder.joblib
│
├── db/
│ └── predictions.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ └── App.js
│ └── App.css
│
└── data/
└── india_states.geojson

⸻

📊 Prediction Output Example

Predicted Crop: Rice
Confidence: 92%
Fertilizer: Apply NPK 30:20:20
Disease Risk: Moderate (Check for leaf spot)
State Detected: Karnataka
Map: /history_map/173146312.png

⸻

💡 Why This Project Is Important
• Works offline → perfect for rural farmers
• Real-time sensor analysis
• Data-driven crop decisions
• Automatic fertilizer & disease warnings
• Modern, professional UI
• Offline GIS mapping
• Fully open-source
