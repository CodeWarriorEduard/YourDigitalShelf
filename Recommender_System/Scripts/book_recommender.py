import pandas as pd
from flask import Flask, request, jsonify
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import json

df = pd.read_csv('data.csv')
df = pd.DataFrame(df)
df.drop(0, axis=0, inplace=True)


## Tfidf Matrix

tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['description'])
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

def recommend(book_id, n):
    book_idx = df[df['id']==book_id].index[0]
    book_score = list(enumerate(cosine_sim[book_idx])) 
    sorted_book = sorted(book_score, key=lambda x:x[1], reverse=True)
    
    books = []
    for i in range(1, n+1):
        books.append(df.iloc[sorted_book[i][0]])

    books = pd.DataFrame(books)   
    json_str = books.to_json(orient='records')

    json_obj = json.loads(json_str)

    return json_obj




## Flask server
app = Flask(__name__)



@app.route('/recommend/<id>', methods=['GET'])
def recommendBook(id):
    return recommend(int(id), 5)




if __name__ == '__main__':
    app.run()