"""Roman numeral utilities"""


def int_to_roman(num: int) -> str:
    """Convert integer to Roman numerals"""
    val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    roman = ''
    
    for i in range(len(val)):
        count = num // val[i]
        if count:
            roman += syms[i] * count
            num -= val[i] * count
    
    return roman


def roman_to_int(roman: str) -> int:
    """Convert Roman numerals to integer"""
    roman_dict = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    result = 0
    prev_value = 0
    
    for char in reversed(roman.upper()):
        value = roman_dict[char]
        if value < prev_value:
            result -= value
        else:
            result += value
        prev_value = value
    
    return result
