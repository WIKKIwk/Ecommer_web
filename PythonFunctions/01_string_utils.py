"""String utility functions"""


def reverse_string(text: str) -> str:
    """Reverse a string"""
    return text[::-1]


def is_palindrome(text: str) -> bool:
    """Check if string is palindrome"""
    cleaned = text.lower().replace(" ", "")
    return cleaned == cleaned[::-1]


def count_words(text: str) -> int:
    """Count words in text"""
    return len(text.split())
