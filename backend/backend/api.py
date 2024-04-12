from flask import Flask, request, jsonify
from .database import database
from . import about

app = Flask(__name__)


@app.route("/blog", methods=["POST", "GET"])
def handle_blog() -> tuple[str, int]:
    # IN THE FUTURE, ONLY LOAD SOME OF THE DATA AT A TIME
    if request.method == "POST":
        data = request.json
        db_action_info = database.perform_db_action("Blog", data)

        return (
            jsonify(
                {
                    "message": "Data received",
                    "sent_data": data,
                    "db_action_info": db_action_info,
                }
            ),
            200,
        )
    elif request.method == "GET":
        return jsonify(database.get_table("Blog")), 200


@app.route("/about", methods=["GET"])
def handle_about() -> tuple[str, int]:
    user_languages = about.get_user_languages("jmurrah")
    return jsonify(user_languages), 200


@app.route("/", methods=["GET"])
def handle_home():
    return "test, World!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
