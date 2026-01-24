"""Hash and encryption utilities"""
import hashlib


def md5_hash(text: str) -> str:
    """Generate MD5 hash"""
    return hashlib.md5(text.encode()).hexdigest()


def sha256_hash(text: str) -> str:
    """Generate SHA256 hash"""
    return hashlib.sha256(text.encode()).hexdigest()


def sha512_hash(text: str) -> str:
    """Generate SHA512 hash"""
    return hashlib.sha512(text.encode()).hexdigest()
