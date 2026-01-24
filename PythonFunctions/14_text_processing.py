"""Text processing utilities"""


def capitalize_words(text: str) -> str:
    """Capitalize each word"""
    return text.title()


def remove_whitespace(text: str) -> str:
    """Remove all whitespace"""
    return ''.join(text.split())


def truncate_text(text: str, length: int, suffix: str = "...") -> str:
    """Truncate text to length"""
    if len(text) <= length:
        return text
    return text[:length].rstrip() + suffix


def count_vowels(text: str) -> int:
    """Count vowels in text"""
    return sum(1 for char in text.lower() if char in 'aeiou')
