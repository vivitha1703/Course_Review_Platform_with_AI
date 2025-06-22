from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from pymongo import MongoClient
import pandas as pd
import numpy as np
from textblob import TextBlob  

app = FastAPI()

client = MongoClient("mongodb://localhost:27017/")
db = client["course-review-ai"]
review_collection = db["reviews"]


class RecInput(BaseModel):
    user_id: str

class SentimentInput(BaseModel):
    text: str


def get_review_data():
    reviews = list(review_collection.find({}, {"_id": 0, "user_id": 1, "course_id": 1, "rating": 1}))
    return pd.DataFrame(reviews)


@app.post("/recommend")
def recommend(input: RecInput):
    user = input.user_id
    df = get_review_data()

    if df.empty:
        return {"message": "No review data available", "recommended_courses": []}

    pivot = df.pivot_table(index='user_id', columns='course_id', values='rating')
    pivot.fillna(0, inplace=True)

    if user not in pivot.index:
        return {"message": "User has not rated any course", "recommended_courses": []}

    user_ratings = pivot.loc[user].values
    similarity = pivot.apply(lambda x: np.dot(x.values, user_ratings), axis=1)
    similar_users = similarity.drop(index=user).sort_values(ascending=False)

    top_user = similar_users.index[0] if not similar_users.empty else None
    if not top_user:
        return {"message": "No similar users found", "recommended_courses": []}

    top_user_ratings = pivot.loc[top_user]
    rec_courses = top_user_ratings[top_user_ratings > 3].index.tolist()

    return {
        "user_id": user,
        "recommended_courses": rec_courses
    }


@app.post("/sentiment")
def analyze_sentiment(data: SentimentInput):
    review = data.text
    polarity = TextBlob(review).sentiment.polarity
    label = "positive" if polarity > 0 else "negative" if polarity < 0 else "neutral"
    return {
        "text": review,
        "sentiment": label,
        "score": round(polarity, 3)
    }
