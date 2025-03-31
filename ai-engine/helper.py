import re
import google.generativeai as genai

# Emission factors
EMISSION_FACTORS = {
    "car": 0.21, "bus": 0.08, "train": 0.04, "flight": 0.25,
    "electricity": 0.5, "food": 7.5, "shopping": 6.5
}

def calculate_emissions(travel_type, distance, electricity, food, shopping):
    """Calculate total carbon emissions."""
    travel_emission = distance * EMISSION_FACTORS.get(travel_type, 0)
    energy_emission = electricity * EMISSION_FACTORS["electricity"]
    food_emission = food * EMISSION_FACTORS["food"]
    shopping_emission = (shopping / 100) * EMISSION_FACTORS["shopping"]

    total_emission = travel_emission + energy_emission + food_emission + shopping_emission
    return total_emission, travel_emission, energy_emission, food_emission, shopping_emission

def clean_text(text):
    """Clean and extract structured recommendations."""
    text = re.sub(r"(\\|\*)", "", text).strip()
    text = re.sub(r"^[•\-\d.]+\s*", "", text)
    return text.split(".")[0] + "."

def get_gemini_recommendations(emission_data, api_key):
    """Generate structured recommendations using Gemini AI."""
    genai.configure(api_key=api_key)
    prompt = f"""
    Based on the following carbon emissions:
    - Travel: {emission_data['travel_emission']} kg CO₂
    - Energy: {emission_data['energy_emission']} kg CO₂
    - Food: {emission_data['food_emission']} kg CO₂
    - Shopping: {emission_data['shopping_emission']} kg CO₂

    Provide exactly 3 eco-friendly recommendations for each category (Travel, Energy, Shopping, Food).
    """

    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)

        if response and hasattr(response, "text"):
            lines = [clean_text(line) for line in response.text.split("\n") if line.strip()]
            structured_recommendations = {
                "travel": lines[:3],
                "energy": lines[3:6],
                "shopping": lines[6:9],
                "food": lines[9:12]
            }
            return structured_recommendations

        return {"error": "Invalid response from Gemini API."}

    except Exception as e:
        print(f"Gemini API Error: {e}")
        return {"error": "Failed to generate recommendations. Please try again."}
