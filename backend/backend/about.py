import requests
from datetime import datetime
from .database import database
import json


def add_two_dicts(dict1: dict, dict2: dict) -> dict:
    result = dict1.copy()

    for key, value in dict2.items():
        result["Total"] += value
        if key in result:
            result[key]["lines"] += value
        else:
            result[key] = {"lines": value}

    return result


def add_languages(repo_list: list[dict]) -> dict:
    result = {"Total": 0}

    for repo in repo_list:
        result = add_two_dicts(result, repo)

    for key in result:
        if key != "Total":
            result[key]["percentage"] = "{:.1f}".format(
                round(result[key]["lines"] / result["Total"], 3) * 100
            )

    result["Percentages"] = sorted(
        [result[key]["percentage"] for key in result if key != "Total"]
    )
    database.update_table(
        "Languages",
        {
            "id": 1,
            "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "languages": json.dumps(result),
        },
    )
    return result


def get_user_repos(username: str) -> list[str]:
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    return [repo["name"] for repo in response.json()]


def get_repo_languages(username: str) -> list[dict]:
    repo_list = []

    for repo in get_user_repos("jmurrah"):
        url = f"https://api.github.com/repos/{username}/{repo}/languages"
        headers = {"Accept": "application/vnd.github.v3+json"}
        response = requests.get(url, headers=headers)
        repo_list.append(response.json())

    return repo_list


def should_update_languages() -> bool:
    current_timestamp = datetime.now()
    latest_timestamp = datetime.strptime(
        database.get_last_row("Languages")["time"], "%Y-%m-%d %H:%M:%S"
    )
    difference = current_timestamp - latest_timestamp
    return difference.days > 1


def get_user_languages(username: str) -> dict:
    if should_update_languages():
        repo_list = get_repo_languages(username)
        added_languages = add_languages(repo_list)
        return added_languages
    else:
        return json.loads(database.get_last_row("Languages")["languages"])
