import requests
import time
from conn import conn

start_time = time.time()

cur = conn.cursor()

c_type = "forex"
url = f"https://fcsapi.com/api-v3/{c_type}/list?type={c_type}&access_key=pzNMhsR0npxGNtToHR5jfPDN"
print(url)
r = requests.get(url)

data = r.json()['response']

i = 1
for x in data:
    symbol_name = x['name'].replace("'", "''")
    sql = f"INSERT INTO currency_lists(`id`, `name`, `symbol`, `symbol_type`, `decimal`) VALUES({x['id']}, '{symbol_name}', '{c_type}', '{x['symbol']}', {x['decimal']} )"
    print(sql)
    cur.execute(sql)
    # print(x)

    if i == 80:
        break
    i += 1

conn.commit()

print(i)
print(time.time() - start_time)