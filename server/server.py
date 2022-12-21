from flask import Flask, request
from dotenv import load_dotenv
import psycopg2
import os


app = Flask(__name__)
load_dotenv()

# Get environment variables
host = os.getenv('HOST')
dbname = os.getenv('DB_NAME')
user = os.getenv('DB_USER')
password = os.getenv('DB_PASS')
port = os.getenv('DB_PORT')
api_port = os.getenv('API_PORT')

# Create the connection to the database
conn = psycopg2.connect(host=host, dbname=dbname, user=user, password=password, port=port)
cur = conn.cursor()

# allow CORS for all domains/routes
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Route to handle the signup
@app.route('/signup', methods=['POST'])
def signup():
    # Get the data from request
    data = request.get_json()
    print(data)

    # Get the user's information
    email = data['email']
    password = data['password']
    firstname = data['firstName']

    # Check if the user already exists
    cur.execute('SELECT * FROM users.user_credentials WHERE email = %s;', (email,))
    if cur.fetchone():
        return 'The email is already in use. Please try a different email.', 400

    # Insert the user into the database
    cur.execute('INSERT INTO users.user_credentials (email, password, firstname) VALUES (%s, %s, %s);', (email, password, firstname))
    conn.commit()

    # Return a success message
    return 'Signup successful. Welcome aboard!', 200

# Route to handle the login request
@app.route('/login', methods=['POST'])
def login():
    # Get the data from the request
    data = request.get_json()
    print(data)

    # Get the user's information
    email = data['email']
    password = data['password']

    # Check if the user exists
    cur.execute('SELECT * FROM users.user_credentials WHERE email = %s AND password = %s;', (email, password))
    if not cur.fetchone():
        return 'The email or password is incorrect. Please try again.', 400
    
    # Return a success message
    return 'Login successful. Welcome back!', 200

if __name__ == '__main__':
    app.run(port=api_port)
