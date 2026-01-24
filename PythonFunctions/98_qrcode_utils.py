"""QR code data encoding"""


def estimate_qr_capacity(version: int, error_correction: str = 'M') -> dict:
    """Estimate QR code data capacity"""
    capacities = {
        1: {'L': 41, 'M': 34, 'Q': 27, 'H': 17},
        5: {'L': 154, 'M': 122, 'Q': 87, 'H': 68},
        10: {'L': 346, 'M': 271, 'Q': 199, 'H': 154},
        20: {'L': 858, 'M': 682, 'Q': 509, 'H': 382},
        40: {'L': 2953, 'M': 2331, 'Q': 1663, 'H': 1273}
    }
    
    if version in capacities:
        return capacities[version].get(error_correction, 0)
    
    # Approximate for other versions
    return int(version * 70 * (1 if error_correction == 'L' else 0.8))


def calculate_qr_version(data_length: int, error_correction: str = 'M') -> int:
    """Calculate required QR code version"""
    for version in range(1, 41):
        capacity = estimate_qr_capacity(version, error_correction)
        if capacity >= data_length:
            return version
    return 40  # Maximum version
