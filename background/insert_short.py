from conn import mydb, my_cursor

my_cursor.execute("select * from currency_lists")

for currency in my_cursor.fetchall():
    symbol = currency[2]

    if len(symbol) == 6:
        short_symbol = f"{symbol[:3]}/{symbol[3:6]}"
    else:
        symbol_sp = symbol.split("USD")
        short_symbol = f"{symbol_sp[0]}/USD"

    up_sql = f"update currency_lists set symbolShort = '{short_symbol}' where id = {currency[0]} "
    my_cursor.execute(up_sql)
    mydb.commit()