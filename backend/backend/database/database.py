import sqlite3
DB_PATH = "/app/backend/database/portfolio.db"

def execute_sql_statement(statement):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(statement)
    conn.commit()
    conn.close()
    return True

def get_table(table):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table}")
    all_rows = cursor.fetchall()
    return [dict(row) for row in all_rows]

def get_last_row(table):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table} ORDER BY id DESC LIMIT 1")
    last_row = cursor.fetchone()
    return last_row