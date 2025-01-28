import requests
import os
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

EMAIL = os.getenv('email')
PASSWORD = os.getenv('password2')

# Create array of dictionaries.
libros  = [{}]


# Base url 
URL = os.getenv('url')
LOGIN = os.getenv('login_url')

payload = {
    "email": EMAIL,
    "password": PASSWORD
}



df = 0
with requests.Session() as request:
    p = request.post(LOGIN, json=payload)    
    p = p.text.strip("{}")
    p = p[9:-1]
    HEADER = {'Authorization': f'Bearer {p}'}
    q = request.get(URL, headers=HEADER).json()
    df = pd.DataFrame(q['data']).to_csv('data.csv', index=False)


    
