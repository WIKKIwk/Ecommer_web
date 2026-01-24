"""Context manager utilities"""
from contextlib import contextmanager
import time


@contextmanager
def timer_context(name: str):
    """Context manager for timing"""
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"{name} took {end - start:.4f} seconds")


@contextmanager
def file_manager(filename: str, mode: str):
    """Context manager for file handling"""
    f = open(filename, mode)
    try:
        yield f
    finally:
        f.close()


class DatabaseConnection:
    """Database connection context manager"""
    def __enter__(self):
        print("Opening connection")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")
        return False
