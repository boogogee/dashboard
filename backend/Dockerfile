FROM python:3.8-slim

WORKDIR /app

# Copy the requirements.txt file first
COPY ./requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

# Copy the rest of the application
COPY ./app /app

CMD ["python", "app.py"]