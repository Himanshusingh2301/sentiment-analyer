from flask import Flask, request, jsonify
from model.train_and_predict import PredictReview
from flask_cors import CORS
import os

app = Flask(__name__)
review_predictor = PredictReview()

CORS(app, origins=["https://sentiment-analyzer-7m4c.onrender.com"])

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Sentiment Analysis API is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' in request."}), 400

    text = data["text"]
    result = review_predictor.test_sample(text)
    return jsonify({"prediction": result})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Support for cloud platforms like Render
    app.run(debug=True, host="0.0.0.0", port=port)
