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
            result[key]["percentage"] = "{:.1f}".format(round(result[key]["lines"] / result["Total"], 3) * 100)
    
    result["Percentages"] = sorted([result[key]["percentage"] for key in result if key != "Total"])
    database.insert_into_table("Languages", {"languages": json.dumps(result)})
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
    return True
    #2024-04-06 23:19:28  <-- example timestamp
    current_timestamp = datetime.now()
    latest_timestamp = datetime.strptime(database.get_last_row("Blog")[1], '%Y-%m-%d %H:%M:%S') # returns 2024-04-06 23:19:28
    difference = current_timestamp - latest_timestamp
    return difference.days > 1

def get_user_languages(username: str) -> dict:
    if should_update_languages():
        repo_list = get_repo_languages(username)
        added_languages = add_languages(repo_list)
        return added_languages
    else:
        return database.get_last_row("Blog")[2] # returns languages from db


# ADD FUNCTION TO CHECK WHAT REPOS HAVE BEEN CHANGED SINCE LAST CHECK
# store time to DB and read from db to check if repo has been updated since last check
if __name__ == "__main__":
    languages = get_user_languages("jmurrah")
    print(languages)
