from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
from collections import defaultdict
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import numpy as np
import os
import nltk
from bson import ObjectId
from urllib.parse import quote_plus

app = Flask(__name__)
nltk.download('punkt_tab')

MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client['course_review_db']

courses = list(db['courses'].find())
print(courses)
course_ids = [str(course['_id']) for course in courses]
course_descriptions = [course['description'] for course in courses]

reviews = list(db['comments'].find())
user_course_map = defaultdict(set)
for review in reviews:
    user_course_map[review['user_id']].add(review['course_id'])


analyzer = SentimentIntensityAnalyzer()


tfidf = TfidfVectorizer(stop_words='english')
print("Test")
print(course_descriptions)
tfidf_matrix = tfidf.fit_transform(course_descriptions)


def find_similar_courses(course_id, top_n=5):
    print(course_ids)
    if course_id not in course_ids:
        return []

    idx = course_ids.index(course_id)
    cosine_sim = cosine_similarity(tfidf_matrix[idx], tfidf_matrix).flatten()

    similar_indices = cosine_sim.argsort()[-top_n - 1:][::-1]

    similar_courses = []
    for i in similar_indices:
        if course_ids[i] != course_id:
            similar_courses.append(course_ids[i])
        if len(similar_courses) == top_n:
            break

    return similar_courses

def personalized_recommendations(user_id, top_n=5):
    reviewed_courses = user_course_map.get(user_id, [])

    if not reviewed_courses:
        return []

    user_indices = [course_ids.index(cid) for cid in reviewed_courses if cid in course_ids]

    if not user_indices:
        return []

    user_profile_vector = np.mean(tfidf_matrix[user_indices], axis=0)

    cosine_sim = cosine_similarity(user_profile_vector, tfidf_matrix).flatten()

    recommended_indices = cosine_sim.argsort()[::-1]

    recommendations = []
    for idx in recommended_indices:
        course_id = course_ids[idx]
        if course_id not in reviewed_courses and course_id not in recommendations:
            recommendations.append(course_id)
        if len(recommendations) == top_n:
            break

    return recommendations

def collaborative_filtering_recommendations(user_id, top_n=5):
    user_reviewed = user_course_map.get(user_id, [])
    if not user_reviewed:
        return []

    similarity_scores = {}

    for other_user, other_courses in user_course_map.items():
        if other_user == user_id:
            continue
        common_courses = user_reviewed.intersection(other_courses)
        similarity = len(common_courses) / len(user_reviewed.union(other_courses))
        if similarity > 0:
            similarity_scores[other_user] = similarity

    if not similarity_scores:
        return []

    recommended_courses = set()
    sorted_users = sorted(similarity_scores.items(), key=lambda x: x[1], reverse=True)

    for other_user, _ in sorted_users:
        for course in user_course_map[other_user]:
            if course not in user_reviewed:
                recommended_courses.add(course)
                if len(recommended_courses) == top_n:
                    return list(recommended_courses)

    return list(recommended_courses)

def generate_summary(reviews, num_sentences=3):
    if not reviews:
        return "No reviews available to summarize."

    combined_reviews = " ".join(reviews)
    parser = PlaintextParser.from_string(combined_reviews, Tokenizer("english"))
    summarizer = TextRankSummarizer()

    summary = summarizer(parser.document, num_sentences)

    summarized_text = " ".join(str(sentence) for sentence in summary)
    return summarized_text if summarized_text else "Summary could not be generated."




@app.route('/sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    review = data.get('review')

    if not review:
        return jsonify({'error': 'Review text is required'}), 400

    sentiment_score = analyzer.polarity_scores(review)
    return jsonify({'sentiment': sentiment_score})

@app.route('/similar-courses', methods=['POST'])
def similar_courses():
    data = request.get_json()
    course_id = data.get('course_id')

    if not course_id:
        return jsonify({'error': 'Course ID is required'}), 400

    similar = find_similar_courses(course_id)
    return jsonify({'similar_courses': similar})

@app.route('/recommendations', methods=['POST'])
def recommend_courses():
    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    recommendations = collaborative_filtering_recommendations(user_id)

    if not recommendations:
        recommendations = personalized_recommendations(user_id)

    return jsonify({'recommended_courses': recommendations})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
