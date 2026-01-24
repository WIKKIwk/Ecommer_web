"""XOR cipher utilities"""


def xor_encrypt(text: str, key: str) -> str:
    """XOR encrypt text with key"""
    encrypted = []
    for i, char in enumerate(text):
        key_char = key[i % len(key)]
        encrypted.append(chr(ord(char) ^ ord(key_char)))
    return ''.join(encrypted)


def xor_decrypt(ciphertext: str, key: str) -> str:
    """XOR decrypt (same as encrypt)"""
    return xor_encrypt(ciphertext, key)


def xor_hex(text: str, key: str) -> str:
    """XOR encrypt and return as hex"""
    encrypted = xor_encrypt(text, key)
    return ''.join(f'{ord(c):02x}' for c in encrypted)
