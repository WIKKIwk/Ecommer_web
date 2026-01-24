"""ROT13 encryption"""


def rot13(text: str) -> str:
    """ROT13 encode/decode (symmetric)"""
    result = ""
    
    for char in text:
        if char.isalpha():
            ascii_offset = 65 if char.isupper() else 97
            result += chr((ord(char) - ascii_offset + 13) % 26 + ascii_offset)
        else:
            result += char
    
    return result


def rot13_encode(text: str) -> str:
    """ROT13 encode"""
    return rot13(text)


def rot13_decode(text: str) -> str:
    """ROT13 decode"""
    return rot13(text)
