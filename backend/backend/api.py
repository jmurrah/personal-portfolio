from flask import Flask, request, jsonify
from .database.database import get_table
from .blog import perform_db_action
from .about import get_user_languages
import subprocess
import requests

app = Flask(__name__)


@app.route("/blog", methods=["POST", "GET"])
def blog() -> tuple[str, int]:
    # IN THE FUTURE, ONLY LOAD SOME OF THE DATA AT A TIME
    if request.method == "POST":
        data = request.json
        db_action_info = perform_db_action("Blog", data)

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
        return jsonify(get_table("Blog")), 200


@app.route("/about", methods=["GET"])
def about() -> tuple[str, int]:
    user_languages = get_user_languages("jmurrah")
    return jsonify(user_languages), 200


@app.route("/", methods=["GET"])
def home():
    return "test, World!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
