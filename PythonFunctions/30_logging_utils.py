"""Logging utilities"""
import logging


def setup_logger(name: str, log_file: str = None, level=logging.INFO):
    """Setup logger"""
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    if log_file:
        file_handler = logging.FileHandler(log_file)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
    
    return logger


def log_function_call(logger):
    """Decorator to log function calls"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            logger.info(f"Calling {func.__name__}")
            result = func(*args, **kwargs)
            logger.info(f"{func.__name__} completed")
            return result
        return wrapper
    return decorator
