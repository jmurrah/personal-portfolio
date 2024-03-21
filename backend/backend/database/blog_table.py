from .database import execute_sql_statement

def add_blog_post_to_database(data):
    # Store the data in a database
    execute_sql_statement(
        f"""
        INSERT INTO Blog (Title, Content, Likes)
        VALUES ('{data['title']}', '{data['content']}', {data['likes']})
        """
    )
