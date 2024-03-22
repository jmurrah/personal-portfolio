from flask import Flask, request, jsonify
from .database.database import execute_sql_statement, get_table, get_last_row

app = Flask(__name__)


@app.route("/blog", methods=["POST", "GET"])
def handle_post():
    if request.method == "POST":
        data = request.get_json()
        execute_sql_statement(
            f"""
            INSERT INTO Blog (title, content, likes)
            VALUES ('{data['title']}', '{data['content']}', {data['likes']})
            """
        )  # Store the data in a database
        
        return (
            jsonify({"message": "Data received", "data": data, "cwd": cwd, "table": get_table("Blog")}),
            200,
        )  # Send a response back to the client that includes the data received

    elif request.method == "GET":
        # Return all the data from the blog database
        return jsonify({"message": "Hello"}), 200


@app.route("/", methods=["GET"])
def home():
    return "Hello, World!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
