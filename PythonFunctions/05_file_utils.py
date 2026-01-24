"""File utility functions"""
import os


def get_file_size(filepath: str) -> int:
    """Get file size in bytes"""
    return os.path.getsize(filepath)


def get_file_extension(filepath: str) -> str:
    """Get file extension"""
    return os.path.splitext(filepath)[1]


def file_exists(filepath: str) -> bool:
    """Check if file exists"""
    return os.path.isfile(filepath)
