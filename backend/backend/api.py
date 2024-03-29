from flask import Flask

app = Flask(__name__)

@app.route('/test', methods=['GET'])
def next():
  return {
     'test': 'Hello, Alani!'
  }

@app.route('/', methods=['GET'])
def home():
  return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)