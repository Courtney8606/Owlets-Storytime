from flask import Flask, jsonify, request, session, redirect
from flask_session import Session
from flask_cors import CORS
import os
from lib.database_connection import get_flask_database_connection
from lib.recording_repo import *
from lib.recording import *
from lib.user_repository import *
from lib.user import User
from lib.recording_request import *
from lib.recording_request_repo import *
from lib.connection import Connection
from lib.connection_repo import ConnectionRepository
from functools import wraps

app = Flask(__name__)
cors = CORS(app, origins='*')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'bookclub' 
Session(app)

# USERS/LOGIN ROUTES
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

@app.route('/login', methods=['POST'])
def login():
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    username = request.json.get('username') 
    password = request.json.get('password')
    result = user_repository.find_username(username)
    if result and password == result['password']:
        session['username'] = result['username']
        return jsonify(result), 200
    else: 
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/users/<id>', methods=['GET'])
@login_required
def get_user(id):
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    result = user_repository.find_id(id)
    return jsonify(result)

@app.route('/signup', methods=['POST'])
def post_user():
    connection = get_flask_database_connection(app)
    user_repository = UserRepository(connection)
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    user = User(None, username, email, password, None, None, None)
    user_repository.create(user)
    result = user_repository.find_all()[-1]
    return jsonify(result)

# RECORDINGS ROUTES
# get recordings by username parent/reader
@app.route('/recordings/parent/<username>', methods=['GET'])
def get_recording_by_parent(username):
    connection = get_flask_database_connection(app)
    recording_repository = RecordingRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = recording_repository.find_by_parent_id(user["id"])
    return jsonify(result)

@app.route('/recordings/reader/<username>', methods=['GET'])
def get_recording_by_reader(username):
    connection = get_flask_database_connection(app)
    recording_repository = RecordingRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = recording_repository.find_by_reader_id(user["id"])
    print (user)
    return jsonify(result)

# create new recording
@app.route('/recordings', methods=['POST'])
def post_recording():
    try:
        connection = get_flask_database_connection(app)
        recording_repository = RecordingRepository(connection)
        audio_file = request.json['audio_file']
        title = request.json['title']
        parent_username = request.json['parent_username']
        reader_username = request.json['reader_username']
        # instantiate a repo and get user objects from their into usernames
        users_repository = UserRepository(connection)
        parent = users_repository.find_username(parent_username)
        reader = users_repository.find_username(reader_username)
        # create the recording and add to db
        recording = Recording(None, audio_file, title, parent["id"], reader["id"])
        recording_repository.create(recording)
        return jsonify({'message': 'Recording created successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request

# CONNECTIONS ROUTES

@app.route('/connections', methods=['POST'])
def post_connection():
    try:
        connection = get_flask_database_connection(app)
        repo = ConnectionRepository(connection)
        parent_username = request.json['parent_username']
        reader_username = request.json['reader_username'] 
        # instantiate a repo and get user objects from their into usernames
        users_repository = UserRepository(connection)
        parent = users_repository.find_username(parent_username)
        reader = users_repository.find_username(reader_username)      
        connection = Connection(None, parent["id"], reader["id"], None)
        repo.create(connection)
        return jsonify({'message': 'Connection created successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request
    
@app.route('/connections', methods=['PUT'])
def update_connection():
    try:
        connection = get_flask_database_connection(app)
        repo = ConnectionRepository(connection)
        connection_id = request.json['connection_id']
        new_status = request.json['status'] 
        repo.update_status(new_status, connection_id)
        return jsonify({'message': 'Connection updated successfully'}), 200  # 200 status code for OK 
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request

@app.route('/connections/parent/<username>', methods=['GET'])
def get_connection_by_parent(username):
    connection = get_flask_database_connection(app)
    connection_repository = ConnectionRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = connection_repository.find_by_parent_id(user["id"])
    return jsonify(result)

@app.route('/connections/reader/<username>', methods=['GET'])
def get_connection_by_reader(username):
    connection = get_flask_database_connection(app)
    connection_repository = ConnectionRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = connection_repository.find_by_reader_id(user["id"])
    return jsonify(result)


# RECORDING REQUESTS START HERE

@app.route('/recording-request', methods=['POST'])
def post_recording_request():
    try:
        connection = get_flask_database_connection(app)
        repo = RecordingRequestRepository(connection)
        request_description = request.json['request_description']
        parent_username = request.json['parent_username']
        reader_username = request.json['reader_username'] 
        # instantiate a repo and get user objects from their into usernames
        users_repository = UserRepository(connection)
        parent = users_repository.find_username(parent_username)
        reader = users_repository.find_username(reader_username)      
        record = RecordingRequest(None, request_description, parent["id"], reader["id"], None, None)
        repo.create(record)
        return jsonify({'message': 'Recording request created successfully'}), 201  # 201 status code for Created
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request
    
@app.route('/recording-request', methods=['PUT'])
def update_recording_request():
    try:
        connection = get_flask_database_connection(app)
        repo = RecordingRequestRepository(connection)
        recording_request_id = request.json['recording_request_id']
        new_status = request.json['reader_status'] 
        repo.update_status(new_status, recording_request_id)
        return jsonify({'message': 'Recording updated successfully'}), 200  # 200 status code for OK 
    except Exception as e:
        # Return failure message
        return jsonify({'error': str(e)}), 400  # 400 status code for Bad Request

@app.route('/recording-request/parent/<username>', methods=['GET'])
def get_request_by_parent(username):
    connection = get_flask_database_connection(app)
    recording_request_repository = RecordingRequestRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = recording_request_repository.find_by_parent_id(user["id"])
    return jsonify(result)

@app.route('/recording-request/reader/<username>', methods=['GET'])
def get_request_by_reader(username):
    connection = get_flask_database_connection(app)
    recording_request_repository = RecordingRequestRepository(connection)
    users_repository = UserRepository(connection)
    user = users_repository.find_username(username)
    result = recording_request_repository.find_by_reader_id(user["id"])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5001)))