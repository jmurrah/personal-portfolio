from flask import Flask, request, jsonify
from .database.database import execute_sql_statement, get_table, get_last_row
import subprocess
import requests

app = Flask(__name__)


def insert_into_table(data) -> bool:
    return execute_sql_statement(
        f"""
        INSERT INTO Blog (title, content, likes)
        VALUES ('{data['title']}', '{data['content']}', {data['likes']})
        """
    )


# EDIT THIS FUNCTION
def update_table(data) -> bool:
    return execute_sql_statement(
        f"""
        INSERT INTO Blog (title, content, likes)
        VALUES ('{data['title']}', '{data['content']}', {data['likes']})
        """
    )


# EDIT THIS FUNCTION
def delete_from_table(data) -> bool:
    return execute_sql_statement(
        f"""
        DELETE FROM Blog
        """
    )


def perform_db_action(data) -> bool:
    if data["action"] == "insert":
        return insert_into_table(data)
    elif data["action"] == "update":
        return update_table(data)
    elif data["action"] == "delete":
        return delete_from_table(data)
    else:
        return False


@app.route("/blog", methods=["POST", "GET"])
def blog():
    if request.method == "POST":
        data = request.json
        status = perform_db_action(data)

        return (
            jsonify(
                {
                    "message": "Data received",
                    "data": data,
                    "table": get_table("Blog"),
                    "row": get_last_row("Blog"),
                    "status": status,
                }
            ),
            200,
        )
    elif request.method == "GET":
        return jsonify(get_table("Blog")), 200


def get_user_repos(username) -> list[str]:
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    return [repo['name'] for repo in response.json()]

def get_repo_languages() -> list[dict]:
    repo_list = []
    for repo in get_user_repos("jmurrah"):
        url = f"https://api.github.com/repos/jmurrah/{repo}/languages"
        headers = {"Accept": "application/vnd.github.v3+json"}
        response = requests.get(url, headers=headers)
        repo_list.append(response.json())

    return repo_list
        
def add_two_dicts(dict1, dict2):
    result = dict1.copy()  # Start with a copy of dict1
    for key, value in dict2.items():
        if key in result:
            result[key] += value  # If the key is in dict1, add the values together
        else:
            result[key] = value  # If the key is not in dict1, add it to the result
    return result

def add_languages(repo_list) -> dict:
    result = repo_list[0]
    for repo in repo_list[1:]:
        result = add_two_dicts(result, repo)
    return result


@app.route("/about", methods=["GET"])
def about():
    repo_list = get_repo_languages()
    added_languages = add_languages(repo_list)
    return jsonify(added_languages), 200

@app.route("/", methods=["GET"])
def home():
    return "test, World!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
