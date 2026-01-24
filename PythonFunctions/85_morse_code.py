"""Morse code utilities"""


MORSE_CODE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
}

REVERSE_MORSE = {v: k for k, v in MORSE_CODE.items()}


def text_to_morse(text: str) -> str:
    """Convert text to Morse code"""
    return ' '.join(MORSE_CODE.get(char.upper(), '') for char in text)


def morse_to_text(morse: str) -> str:
    """Convert Morse code to text"""
    return ''.join(REVERSE_MORSE.get(code, '') for code in morse.split(' '))
