"""Environment variable utilities"""
import os


def get_env(key: str, default=None):
    """Get environment variable"""
    return os.getenv(key, default)


def set_env(key: str, value: str):
    """Set environment variable"""
    os.environ[key] = value


def load_env_file(filepath: str = '.env'):
    """Load environment variables from file"""
    if not os.path.exists(filepath):
        return
    
    with open(filepath, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()
