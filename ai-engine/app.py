from flask import Flask, request, jsonify
from flask_cors import CORS
from helper import calculate_emissions, get_gemini_recommendations
from config import GEMINI_API_KEY

app = Flask(_name_)
CORS(app)

@app.route("/calculate", methods=["POST"])
def calculate():
    """API to calculate emissions."""
    try:
        data = request.get_json()
        total, travel, energy, food, shopping = calculate_emissions(
            data["travelType"], data["distance"], data["electricity"], data["food"], data["shopping"]
        )

        return jsonify({
            "total_emission": total,
            "travel_emission": travel,
            "energy_emission": energy,
            "food_emission": food,
            "shopping_emission": shopping
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/recommend", methods=["POST"])
def recommend():
    """API to generate structured recommendations."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Missing request data"}), 400
        
        required_fields = ['travel_emission', 'energy_emission', 'food_emission', 'shopping_emission']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Invalid request data"}), 400

        recommendations = get_gemini_recommendations(data, GEMINI_API_KEY)
        if "error" in recommendations:
            return jsonify({"error": recommendations["error"]}), 500
        return jsonify({"recommendations": recommendations})
    except Exception as e:
        print(f"Error generating recommendations: {e}")
        return jsonify({"error": "Failed to generate recommendations"}), 500

if _name_ == "_main_":
    app.run(debug=True)
    