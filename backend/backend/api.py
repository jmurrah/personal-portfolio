from flask import Flask

app = Flask('app')

@app.route('/')
def home():
  return "HI HALEY!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)