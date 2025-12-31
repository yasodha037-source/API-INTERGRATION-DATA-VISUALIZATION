from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

API_KEY = "79169a0ed7bff51708e55ee648c344d4"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/weather")
def weather():
    city = request.args.get("city")

    if not city:
        return jsonify({"error": "City not provided"})

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)

    data = response.json()

    if data.get("cod") != 200:
        return jsonify({"error": "City not found"})

    return jsonify({
        "city": city,
        "temp": data["main"]["temp"],
        "humidity": data["main"]["humidity"]
    })

if __name__ == "__main__":
    app.run(debug=True)
