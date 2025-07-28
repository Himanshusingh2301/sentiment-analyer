import re
import string
import warnings
import nltk
import pandas as pd

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Suppress warnings
warnings.filterwarnings("ignore")

# Download required NLTK data
nltk.download("vader_lexicon")
nltk.download("stopwords")


class PredictReview:
    def __init__(self, dataset_path="amazonreviews.tsv"):
        self.stopword = nltk.corpus.stopwords.words("english")
        self.data = pd.read_csv(dataset_path, sep="\t")
        self.model, self.vectorizer = self.train_model()

    def vectorize(self, train_data, test_data):
        tfidf = TfidfVectorizer()
        train = tfidf.fit_transform(train_data.values.astype('U'))
        test = tfidf.transform(test_data.values.astype('U'))
        return train, test, tfidf

    def split(self, data, test_size=0.2, shuffle=101):
        input_data = data['review']
        output_data = data['label_num']
        return train_test_split(input_data, output_data, test_size=test_size, random_state=shuffle)

    def prepare_data_for_train(self, input_data):
        input_data = input_data.copy()
        cleaned_reviews = []

        for text in input_data.review:
            text = text.lower()
            text = re.sub(r'https?://\S+|www\.\S+', '', text)
            text = re.sub(r'<.*?>+', '', text)
            text = re.sub(f'[{re.escape(string.punctuation)}]', '', text)
            text = re.sub(r'\bnot\s+(\w+)', r'not_\1', text)
            text = re.sub(r'\w*\d\w*', '', text)
            words = re.split(r"\W+", text)
            words = [word for word in words if word and word not in self.stopword]
            cleaned_reviews.append(" ".join(words))

        input_data['review'] = cleaned_reviews
        return input_data

    def train_model(self):
        self.data['label_num'] = pd.get_dummies(self.data['label'], drop_first=True)
        cleaned_data = self.prepare_data_for_train(self.data)
        train_data, test_data, train_output, test_output = self.split(cleaned_data)
        train, test, tfidf = self.vectorize(train_data, test_data)
        model = LogisticRegression()
        model.fit(train, train_output)

        # Optional: Evaluate model
        pred = model.predict(test)
        acc = accuracy_score(test_output, pred)
        print(f"Logistic Regression Accuracy: {acc * 100:.2f}%")
        print(classification_report(test_output, pred))
        print(confusion_matrix(test_output, pred))

        return model, tfidf

    def clean_text(self, text):
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', str(text))
        text = re.sub(r'\bnot\s+(\w+)', r'not_\1', text)
        words = re.split(r"\W+", text)
        words = [word for word in words if word and word not in self.stopword]
        return " ".join(words)

    def test_sample(self, text):
        text = self.clean_text(text)

        if any(phrase in text for phrase in ['not good', 'not satisfied', 'not happy', 'poor quality','not a good']):
            return 'negative'

        sample = self.vectorizer.transform([text])
        pred = self.model.predict(sample)
        return 'positive' if pred[0] == 1 else 'negative'
