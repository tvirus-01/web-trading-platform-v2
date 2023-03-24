import requests

r = requests.get("https://fcsapi.com/api-v3/crypto/list?type=forex&access_key=pzNMhsR0npxGNtToHR5jfPDN")

data = r.json()['response']

i = 1
for x in data:
    print(x)
    i += 1

    if i == 500:
        break

print(i)