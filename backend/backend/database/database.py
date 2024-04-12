import sqlite3

DB_PATH = "/app/backend/database/portfolio.db"


def execute_sql_statement(sql_statement: str, values: tuple = None):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(sql_statement, values)
    conn.commit()
    conn.close()


def get_table(table_name: str) -> list[dict]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
    all_rows = cursor.fetchall()
    return [dict(row) for row in all_rows]


def get_last_row(table_name: str) -> list:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name} ORDER BY id DESC LIMIT 1")
    last_row = cursor.fetchone()
    return last_row


def insert_into_table(table_name: str, data: dict):
    formatted_data = {
        k: v for k, v in data.items() if k not in ("id", "time", "action")
    }
    insert = ", ".join(formatted_data.keys())
    placeholders = ", ".join("?" for _ in formatted_data.values())
    values = ", ".join(f"'{value}'" for value in formatted_data.values())

    execute_sql_statement(
        f"""
        INSERT INTO {table_name} ({insert})
        VALUES ({placeholders})
        """,
        values
    )


def update_table(table_name: str, data: dict):
    formatted_data = {k: v for k, v in data.items() if k != "id" and k != "action"}
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
