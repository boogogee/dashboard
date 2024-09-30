import requests
from flask import Blueprint, jsonify
from dotenv import load_dotenv
import os

news = Blueprint('news', __name__)

# Load environment variables
load_dotenv()
API_KEY = os.getenv('NEWS_API_KEY')

@news.route('/news')
def get_news():
    sources = {
        "Fox News": "fox-news",
        "CNN": "cnn",
        "BBC News": "bbc-news"
    }
    all_news = {}

    for source_name, source_id in sources.items():
        try:
            url = f'https://newsapi.org/v2/top-headlines?sources={source_id}&apiKey={API_KEY}'
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()

            # Get the top 3 articles for this source
            articles = [{"title": article["title"], "url": article["url"]}
                        for article in data.get("articles", [])[:3]]
            all_news[source_name] = articles
        except requests.exceptions.RequestException as e:
            print(f"Error fetching news from {source_name}: {e}")
            all_news[source_name] = [{"title": "Error fetching news", "url": ""}]

    return jsonify(all_news)
