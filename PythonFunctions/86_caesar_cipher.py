"""Caesar cipher utilities"""


def caesar_encrypt(text: str, shift: int) -> str:
    """Encrypt text using Caesar cipher"""
    result = ""
    
    for char in text:
        if char.isalpha():
            ascii_offset = 65 if char.isupper() else 97
            result += chr((ord(char) - ascii_offset + shift) % 26 + ascii_offset)
        else:
            result += char
    
    return result


def caesar_decrypt(text: str, shift: int) -> str:
    """Decrypt Caesar cipher"""
    return caesar_encrypt(text, -shift)


def caesar_bruteforce(ciphertext: str) -> list:
    """Try all possible shifts"""
    return [(shift, caesar_decrypt(ciphertext, shift)) for shift in range(26)]
