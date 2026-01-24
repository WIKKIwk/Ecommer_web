"""Credit card utilities"""
import re


def validate_credit_card(card_number: str) -> bool:
    """Validate credit card using Luhn algorithm"""
    card_number = re.sub(r'\D', '', card_number)
    
    if not card_number or len(card_number) < 13:
        return False
    
    total = 0
    reverse_digits = card_number[::-1]
    
    for i, digit in enumerate(reverse_digits):
        n = int(digit)
        if i % 2 == 1:
            n *= 2
            if n > 9:
                n -= 9
        total += n
    
    return total % 10 == 0


def get_card_type(card_number: str) -> str:
    """Detect credit card type"""
    card_number = re.sub(r'\D', '', card_number)
    
    if re.match(r'^4', card_number):
        return 'Visa'
    elif re.match(r'^5[1-5]', card_number):
        return 'MasterCard'
    elif re.match(r'^3[47]', card_number):
        return 'American Express'
    return 'Unknown'
