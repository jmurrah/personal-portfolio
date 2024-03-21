import sqlite3
import sys

def execute_sql_statement(sql_statement):
    conn = sqlite3.connect("portfolio.db")
    cursor = conn.cursor()
    cursor.execute(sql_statement)
    result = cursor.fetchall()
    conn.commit()
    conn.close()
    return result