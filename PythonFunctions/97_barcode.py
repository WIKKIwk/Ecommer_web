"""Barcode utilities"""


def generate_ean13_checksum(ean: str) -> int:
    """Generate EAN-13 checksum digit"""
    if len(ean) != 12:
        raise ValueError("EAN must be 12 digits")
    
    total = sum(int(ean[i]) * (1 if i % 2 == 0 else 3) for i in range(12))
    return (10 - (total % 10)) % 10


def validate_ean13(ean: str) -> bool:
    """Validate EAN-13 barcode"""
    if len(ean) != 13 or not ean.isdigit():
        return False
    
    checksum = generate_ean13_checksum(ean[:12])
    return int(ean[12]) == checksum


def generate_upc_checksum(upc: str) -> int:
    """Generate UPC-A checksum digit"""
    if len(upc) != 11:
        raise ValueError("UPC must be 11 digits")
    
    odd_sum = sum(int(upc[i]) for i in range(0, 11, 2))
    even_sum = sum(int(upc[i]) for i in range(1, 11, 2))
    total = odd_sum * 3 + even_sum
    
    return (10 - (total % 10)) % 10
