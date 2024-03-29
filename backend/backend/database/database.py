import sqlite3

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
    return [dict(row) for row in all_rows]


def get_last_row(table_name: str) -> list:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name} ORDER BY id DESC LIMIT 1")
    last_row = cursor.fetchone()
    return last_row
