from conn import conn

cur = conn.cursor()

sql_create_table = """
    CREATE TABLE IF NOT EXISTS currency_lists(
        id integer,
        name text,
        symbol text,
        symbol_type text,
        decimal integer,
        ask text,
        bid text,
        open text,
        high text,
        low text,
        close text,
        spread text,
        change text,
        change_per text,
        time text,
        volume text
    );
"""

cur.execute(sql_create_table)
conn.commit()

