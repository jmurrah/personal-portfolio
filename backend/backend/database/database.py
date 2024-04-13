import sqlite3
import json
from datetime import datetime

DB_PATH = "/app/backend/database/portfolio.db"


def execute_sql_statement(sql_statement: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(sql_statement)
    conn.commit()
    conn.close()


def get_table(table_name: str) -> list[dict]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
    all_rows = cursor.fetchall()
    return [{k: json.loads(v) if isinstance(v, str) else v for k, v in dict(row).items()} for row in all_rows]


def get_last_row(table_name: str) -> list:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name} ORDER BY id DESC LIMIT 1")
    last_row = cursor.fetchone()
    return {description[0]: json.loads(last_row[i]) if isinstance(last_row[i], str) else last_row[i] for i, description in enumerate(cursor.description)} if last_row else None


def format_data(data: dict, excluded_keys: list[str]) -> dict:
    return {k: json.dumps(v) if isinstance(v, str) else v for k, v in data.items() if k not in excluded_keys}


def insert_into_table(table_name: str, data: dict):
    formatted_data = format_data(data, ["id"])
    insert = ", ".join(formatted_data.keys())
    values = ", ".join(f"'{value}'" for value in formatted_data.values())

    execute_sql_statement(
        f"""
        INSERT INTO {table_name} ({insert})
        VALUES ({values})
        """
    )


def update_table(table_name: str, data: dict):
    formatted_data = format_data(data, ["id"])
    set_clause = ", ".join(
        f"{key} = '{value}'" for key, value in formatted_data.items()
    )

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
        DELETE FROM {table_name}
        """
    )


def perform_db_action(table_name: str, data: dict) -> dict:
    action = data.pop("action", None)
    if action == "insert":
        data["time"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        insert_into_table(table_name, data)
    elif action == "update":
        update_table(table_name, data)
    elif action == "delete":
        delete_from_table(table_name, data)
    if action is not None:
        data["action"] = action

    return {
        "table": get_table("Blog"),
        "last_row": get_last_row("Blog"),
        "action": data["action"],
    }
