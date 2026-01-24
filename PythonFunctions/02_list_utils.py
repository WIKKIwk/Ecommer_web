"""List utility functions"""


def flatten_list(nested_list: list) -> list:
    """Flatten nested list"""
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten_list(item))
        else:
            result.append(item)
    return result


def chunk_list(lst: list, size: int) -> list:
    """Split list into chunks"""
    return [lst[i:i + size] for i in range(0, len(lst), size)]


def remove_duplicates(lst: list) -> list:
    """Remove duplicates while preserving order"""
    seen = set()
    return [x for x in lst if not (x in seen or seen.add(x))]
