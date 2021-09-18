import csv
import requests

URL = "https://sandbox.tinypass.com/api/v3/publisher/user/list"

token = "xeYjNEhmutkgkqCZyhBn6DErVntAKDx30FqFOS6D"
aid = 'o1sRRZSLlw'
PARAMS = {'api_token': token}
QUERY = {'aid': aid}
r = requests.get(url = URL , params= PARAMS, data=QUERY)

data = r.json()
sys_info = data['users']


def read_file_a(file_a):
    users = []
    with open(file_a, 'rt') as f:
        rows = csv.reader(f)
        headers = next(rows)
        for row in rows:
            tabla_uno = {'user_id': row[0], 'email': 
                row[1]}
            users.append(tabla_uno)
    return users

# print(read_file_a('filea.csv'))

def read_file_b(file_b):
    users = []
    with open(file_b, 'rt') as f:
        rows = csv.reader(f)
        headers = next(rows)
        for row in rows:
            tabla_dos = {'user_id': row[0], 'first_name': 
                row[1], 'last_name': 
                row[2]}
            users.append(tabla_dos)
    return users

# print(read_file_b('fileb.csv'))

def merged_files(file_a, file_b):
    tabla_info_users = []
    
    for user_a in file_a:
        user_id_a = user_a['user_id']
        user_email = user_a['email']
        for user_b in file_b:
            user_id_b = user_b['user_id']
            user_first_name = user_b['first_name']
            user_last_name = user_b['last_name']
            if user_id_b == user_id_a:
                dict = {}
                dict['user_id'] = user_id_a
                dict['email'] = user_email
                dict['first_name'] = user_first_name
                dict['last_name'] = user_last_name 
                tabla_info_users.append(dict)

    return tabla_info_users

# print(merged_files(read_file_a('filea.csv'), read_file_b('fileb.csv')))

def user_info_correct(merged_files, sys_info):
    for data in merged_files:
        for sys in sys_info:
            if data['email'] == sys['email']:
                data['user_id']  = sys['uid']

    return merged_files 
         
print( user_info_correct(merged_files(read_file_a('../Data/filea.csv'), read_file_b('../Data/fileb.csv')), sys_info) )
