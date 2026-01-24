"""Base conversion utilities"""


def decimal_to_binary(n: int) -> str:
    """Convert decimal to binary"""
    return bin(n)[2:]


def binary_to_decimal(binary: str) -> int:
    """Convert binary to decimal"""
    return int(binary, 2)


def decimal_to_hex(n: int) -> str:
    """Convert decimal to hexadecimal"""
    return hex(n)[2:]


def hex_to_decimal(hexadecimal: str) -> int:
    """Convert hexadecimal to decimal"""
    return int(hexadecimal, 16)
