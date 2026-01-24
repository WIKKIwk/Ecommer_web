"""TF-IDF utilities"""
import math
from collections import Counter


def term_frequency(term: str, document: str) -> float:
    """Calculate term frequency"""
    words = document.lower().split()
    return words.count(term.lower()) / len(words) if words else 0


def inverse_document_frequency(term: str, documents: list) -> float:
    """Calculate inverse document frequency"""
    num_containing = sum(1 for doc in documents if term.lower() in doc.lower())
    if num_containing == 0:
        return 0
    return math.log(len(documents) / num_containing)


def tf_idf(term: str, document: str, documents: list) -> float:
    """Calculate TF-IDF score"""
    tf = term_frequency(term, document)
    idf = inverse_document_frequency(term, documents)
    return tf * idf


def top_keywords(document: str, documents: list, top_k: int = 10) -> list:
    """Get top keywords by TF-IDF score"""
    words = set(document.lower().split())
    scores = [(word, tf_idf(word, document, documents)) for word in words]
    return sorted(scores, key=lambda x: x[1], reverse=True)[:top_k]
