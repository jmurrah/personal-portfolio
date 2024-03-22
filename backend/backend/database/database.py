import sqlite3
DB_PATH = "portfolio.db"

def execute_sql_statement(statement):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(statement)
    conn.commit()
    conn.close()

def get_table(table):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table}")
    all_rows = cursor.fetchall()
    conn.commit()
    conn.close()
    return all_rows

def get_last_row(table):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table} ORDER BY id DESC LIMIT 1")
    last_row = cursor.fetchone()
    conn.commit()
    conn.close()
    return last_row