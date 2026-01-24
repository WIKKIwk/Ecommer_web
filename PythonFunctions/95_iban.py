"""IBAN utilities"""


def validate_iban(iban: str) -> bool:
    """Validate IBAN (International Bank Account Number)"""
    iban = iban.replace(' ', '').upper()
    
    # Check length (varies by country, basic check)
    if len(iban) < 15 or len(iban) > 34:
        return False
    
    # Move first 4 characters to end
    rearranged = iban[4:] + iban[:4]
    
    # Replace letters with numbers (A=10, B=11, etc.)
    numeric = ''
    for char in rearranged:
        if char.isdigit():
            numeric += char
        else:
            numeric += str(ord(char) - 55)
    
    # Check if mod 97 equals 1
    return int(numeric) % 97 == 1


def format_iban(iban: str) -> str:
    """Format IBAN with spaces every 4 characters"""
    iban = iban.replace(' ', '').upper()
    return ' '.join(iban[i:i+4] for i in range(0, len(iban), 4))
