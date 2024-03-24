from flask import Flask, request, jsonify
from .database.database import execute_sql_statement, get_table, get_last_row

app = Flask(__name__)


def insert_into_table(data):
    return execute_sql_statement(
        f"""
        INSERT INTO Blog (title, content, likes)
        VALUES ('{data['title']}', '{data['content']}', {data['likes']})
        """
    )


# EDIT THIS FUNCTION
def update_table(data):
    return execute_sql_statement(
        f"""
        INSERT INTO Blog (title, content, likes)
        VALUES ('{data['title']}', '{data['content']}', {data['likes']})
        """
    )


# EDIT THIS FUNCTION
def delete_from_table(data):
    return execute_sql_statement(
        f"""
        DELETE FROM Blog
        """
    )


@app.route("/blog", methods=["POST", "GET"])
def handle_post():
    if request.method == "POST":
        data = request.json
        database_action = {
            "insert": insert_into_table(data),
            "update": update_table(data),
            "delete": delete_from_table(data),
        }
        x = database_action[data["action"]]

        return (
            jsonify(
                {
                    "message": "Data received",
                    "data": data,
                    "table": get_table("Blog"),
                    "row": get_last_row("Blog"),
                    "status": str(x),
                }
            ),
            200,
        )
    elif request.method == "GET":
        return jsonify(get_table("Blog")), 200


@app.route("/", methods=["GET"])
def home():
    return "test, World!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
