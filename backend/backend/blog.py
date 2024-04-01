from .database.database import execute_sql_statement, get_table, get_last_row


def insert_into_table(data: dict):
    execute_sql_statement(
        f"""
        INSERT INTO Blog (title, content, likes)
        VALUES ('{data['title']}', '{data['content']}', {data['likes']})
        """
    )


# EDIT THIS FUNCTION
def update_table(data: dict):
    data_without_id = {k: v for k, v in data.items() if k != 'id'}
    set_clause = ', '.join(f"{key} = '{value}'" for key, value in data_without_id.items())

    execute_sql_statement(
        f"""
        UPDATE Blog
        SET {set_clause}
        WHERE id = '{data['id']}'
        """
    )


# EDIT THIS FUNCTION
def delete_from_table(data: dict):
    execute_sql_statement(
        f"""
        DELETE FROM Blog
        """
    )


def perform_db_action(data: dict) -> dict:
    if data["action"] == "insert":
        insert_into_table(data)
    elif data["action"] == "update_likes":
        update_table({"id": data["id"], "likes": data["likes"]})
    elif data["action"] == "update_title_content":
        update_table({data["id"], data["title"], data["content"]})
    elif data["action"] == "delete":
        delete_from_table(data)

    return {
        "table": get_table("Blog"),
        "last_row": get_last_row("Blog"),
        "action": data["action"],
    }


if __name__ == "__main__":
    data = {
        "title": "test",
        "content": "test",
        "likes": 0,
        "action": "insert",
    }

    print(perform_db_action(data))
