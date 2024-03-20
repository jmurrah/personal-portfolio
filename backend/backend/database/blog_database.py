import sqlite3


def store_to_database(data):
    # Store the data in a database
    return data
    conn = sqlite3.connect('blog.db')
    cursor = conn.cursor()
    #cursor.execute = SQL statement
    # cursor.execute('INSERT INTO blog (title, content) VALUES (?, ?)', (data['title'], data['content']))

    # saves and closes database connection
    conn.commit()
    conn.close()
