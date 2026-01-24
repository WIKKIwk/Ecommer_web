"""Validation utility functions"""
import re


def is_email_valid(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def is_phone_valid(phone: str) -> bool:
    """Validate phone number (basic)"""
    pattern = r'^\+?1?\d{9,15}$'
    return bool(re.match(pattern, phone.replace(" ", "").replace("-", "")))


def is_url_valid(url: str) -> bool:
    """Validate URL format"""
    pattern = r'^https?://[^\s/$.?#].[^\s]*$'
    return bool(re.match(pattern, url))
