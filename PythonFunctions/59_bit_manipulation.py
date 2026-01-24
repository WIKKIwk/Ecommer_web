"""Bit manipulation utilities"""


def count_set_bits(n: int) -> int:
    """Count number of 1s in binary"""
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count


def is_power_of_two(n: int) -> bool:
    """Check if number is power of 2"""
    return n > 0 and (n & (n - 1)) == 0


def toggle_bit(n: int, pos: int) -> int:
    """Toggle bit at position"""
    return n ^ (1 << pos)


def set_bit(n: int, pos: int) -> int:
    """Set bit at position to 1"""
    return n | (1 << pos)


def clear_bit(n: int, pos: int) -> int:
    """Clear bit at position (set to 0)"""
    return n & ~(1 << pos)


def get_bit(n: int, pos: int) -> int:
    """Get bit value at position"""
    return (n >> pos) & 1
