import requests
import logging

logging.basicConfig(level=logging.DEBUG)


def add_two_dicts(dict1: dict, dict2: dict) -> dict:
    result = dict1.copy()

    for key, value in dict2.items():
        result["Total"] += value
        if key in result:
            result[key] += value
        else:
            result[key] = value

    return result


def add_languages(repo_list: list[dict]) -> dict:
    result = {"Total": 0}

    for repo in repo_list:
        result = add_two_dicts(result, repo)

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


def get_user_languages(username: str) -> dict:
    repo_list = get_repo_languages(username)
    added_languages = add_languages(repo_list)
    return added_languages


# ADD FUNCTION TO CHECK WHAT REPOS HAVE BEEN CHANGED SINCE LAST CHECK
if __name__ == "__main__":
    languages = get_user_languages("jmurrah")
    print(languages)