"""Data conversion utility functions"""
import json


def dict_to_json(data: dict) -> str:
    """Convert dictionary to JSON string"""
    return json.dumps(data, indent=2)


def json_to_dict(json_str: str) -> dict:
    """Convert JSON string to dictionary"""
    return json.loads(json_str)


def celsius_to_fahrenheit(celsius: float) -> float:
    """Convert Celsius to Fahrenheit"""
    return (celsius * 9/5) + 32


def fahrenheit_to_celsius(fahrenheit: float) -> float:
    """Convert Fahrenheit to Celsius"""
    return (fahrenheit - 32) * 5/9
