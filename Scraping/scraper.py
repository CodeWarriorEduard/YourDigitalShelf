import requests
import string
import random
import pandas as pd
import time
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

# Create array of dictionaries.
libros  = [{}]

# Base url 
URL = "https://www.googleapis.com/books/v1/volumes"

# Load enviroment variables
load_dotenv()

# SAVE TO VARIABLES
HOST = os.getenv('host')
USERNAME = os.getenv('user')
PASSWORD = os.getenv('password')
PORT = os.getenv('port')
DATABASE = os.getenv('database')

# Database url
DB_URI = f"postgresql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

print(DB_URI)

# Create engine
engine = create_engine(DB_URI)

def randomWord():
    letters = string.ascii_lowercase
    random_word = ''.join(random.choice(letters) for _ in range(3))
    return random_word

def isIsbnInDb(bookToCompare):
    for libro in libros:
        if 'isbn' in libro:
            if libro['isbn'] == bookToCompare:
                return True
    return False

def getRandomBooks(numResults, iterations):
    for i in range(iterations):
        randomQuery = randomWord()
        url2 = f"{URL}?q={randomQuery}&langRestrict=en&fields=items/volumeInfo(title,authors,publisher,imageLinks/thumbnail,publishedDate,pageCount,description,categories,language,industryIdentifiers/identifier)&maxResults={numResults}"
        response = requests.get(url2)
        if response.status_code == 200:
            responseJson = response.json()
            if 'items' in responseJson:
                for item in responseJson['items']:
                    libro  = {
                        'title': item['volumeInfo'].get('title',{}),
                        'author': ', '.join(map(str,  item['volumeInfo'].get('authors'))) if (isinstance(item['volumeInfo'].get('authors'), list)) else item['volumeInfo'].get('authors'),
                        'description': item['volumeInfo'].get('description'),
                        'genre':', '.join(map(str,  item['volumeInfo'].get('categories'))) if (isinstance(item['volumeInfo'].get('categories'), list)) else item['volumeInfo'].get('categories'),
                        'cover': item['volumeInfo'].get('imageLinks',{}).get('thumbnail'),
                        'yearofrelease': item['volumeInfo'].get('publishedDate'),
                        'publisher': item['volumeInfo'].get('publisher',{}),
                        'isbn': item['volumeInfo'].get('industryIdentifiers',[{}])[0].get('identifier'),
                        'language': item['volumeInfo'].get('language'),
                        'pagecount': item['volumeInfo'].get('pageCount')
                    }   

                    if all(value not in (None, "",{},[]) for value in libro.values()) and not isIsbnInDb(libro.get('isbn')): 
                        libros.append(libro)
        time.sleep(0.4)
    return libros



def saveToDb(libros):
    with engine.begin() as conn:
        if(libros is not None):
            df = pd.DataFrame(libros)
            df.to_sql(name="books", con=conn, if_exists='append', index=False)
           

if __name__ == '__main__':
    getRandomBooks(10,100)
    saveToDb(libros)

