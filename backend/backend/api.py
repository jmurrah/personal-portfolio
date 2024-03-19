from flask import Flask, request, jsonify
import sys

app = Flask(__name__)

@app.route('/blog', methods=['POST', 'GET'])
def handle_post():
  if request.method == 'POST':
    data = request.get_json()
    return jsonify({'message': 'Data received'}), 200  # Send a response back to the client
  elif request.method == 'GET':
    return jsonify({'message': 'Hello'}), 200

@app.route('/', methods=['GET'])
def home():
  return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)