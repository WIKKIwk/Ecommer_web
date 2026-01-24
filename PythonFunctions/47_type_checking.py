"""Type checking utilities"""
from typing import Any, Union, List, Dict


def is_list_of_type(lst: list, type_check) -> bool:
    """Check if list contains only specific type"""
    return all(isinstance(item, type_check) for item in lst)


def is_dict_of_types(d: dict, key_type, value_type) -> bool:
    """Check if dict has specific key and value types"""
    return all(isinstance(k, key_type) and isinstance(v, value_type) 
               for k, v in d.items())


def ensure_type(value: Any, expected_type):
    """Ensure value is of expected type"""
    if not isinstance(value, expected_type):
        raise TypeError(f"Expected {expected_type}, got {type(value)}")
    return value


def safe_cast(value: Any, target_type, default=None):
    """Safely cast value to target type"""
    try:
        return target_type(value)
    except (ValueError, TypeError):
        return default
