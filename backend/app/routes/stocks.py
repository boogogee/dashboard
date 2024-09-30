import requests
from flask import Blueprint, jsonify
from dotenv import load_dotenv
import os

stocks = Blueprint('stocks', __name__)

# Load environment variables
load_dotenv()
API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')

@stocks.route('/stocks')
def get_stocks():
    symbols = ['AAPL', 'GOOGL', 'TSLA']
    stock_data = []

    for symbol in symbols:
        url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={API_KEY}'
        response = requests.get(url)
        data = response.json()

        # Extract the most recent closing price
        try:
            latest_close = list(data['Time Series (Daily)'].values())[0]['4. close']
            stock_data.append({
                'ticker': symbol,
                'price': float(latest_close)
            })
        except KeyError:
            stock_data.append({
                'ticker': symbol,
                'price': 'Error fetching data'
            })

    return jsonify(stock_data)
