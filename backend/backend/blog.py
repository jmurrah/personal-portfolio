from .database.database import execute_sql_statement, get_table, get_last_row


def insert_into_table(table_name: str, data: dict):
    formatted_data = {k: v for k, v in data.items() if k not in ('id', 'time', 'action')}
    insert = ', '.join(formatted_data.keys())
    values = ', '.join(f"'{value}'" for value in formatted_data.values())

    execute_sql_statement(
        f"""
        INSERT INTO {table_name} ({insert})
        VALUES ({values})
        """
    )


# EDIT THIS FUNCTION
def update_table(table_name: str, data: dict):
    formatted_data = {k: v for k, v in data.items() if k != 'id' and k != 'action'}
    set_clause = ', '.join(f"{key} = '{value}'" for key, value in formatted_data.items())

    execute_sql_statement(
        f"""
        UPDATE {table_name}
        SET {set_clause}
        WHERE id = '{data['id']}'
        """
    )


# EDIT THIS FUNCTION
def delete_from_table(table_name: str, data: dict):
    execute_sql_statement(
        f"""
        DELETE FROM Blog
        """
    )

def perform_db_action(table_name: str, data: dict) -> dict:
    if data["action"] == "insert":
        insert_into_table(table_name, data)
    elif data["action"] == "update":
        update_table(table_name, data)
    elif data["action"] == "delete":
        delete_from_table(table_name, data)

    return {
        "table": get_table("Blog"),
        "last_row": get_last_row("Blog"),
        "action": data["action"],
    }


if __name__ == "__main__":
    table_name = "Testing"
    data = {
        "title": "test",
        "content": "test",
        "likes": 0,
        "action": "insert",
    }

    print(perform_db_action(table_name, data))
