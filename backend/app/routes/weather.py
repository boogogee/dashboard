import requests
from flask import Blueprint, jsonify
from dotenv import load_dotenv
import os

weather = Blueprint('weather', __name__)

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variable
API_KEY = os.getenv('OPENWEATHER_API_KEY')

@weather.route('/weather')
def get_weather():
    city = 'London'  # Default city
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}'
    response = requests.get(url)
    data = response.json()

    weather_info = {
        "location": data["name"],
        "temperature": f"{data['main']['temp']}°C",
        "description": data['weather'][0]['description']
    }
    return jsonify(weather_info)
