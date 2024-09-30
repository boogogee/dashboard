from flask import Flask
from flask_cors import CORS
from routes.weather import weather  # Import weather blueprint
from routes.stocks import stocks    # Import stocks blueprint
from routes.news import news        # Import news blueprint

app = Flask(__name__)
CORS(app)

# Register blueprints (replace the old routes)
app.register_blueprint(weather)
app.register_blueprint(stocks)
app.register_blueprint(news)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
