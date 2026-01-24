"""Bloom filter utilities"""
import hashlib


class BloomFilter:
    """Simple Bloom filter implementation"""
    def __init__(self, size: int = 1000, hash_count: int = 3):
        self.size = size
        self.hash_count = hash_count
        self.bit_array = [False] * size
    
    def _hashes(self, item: str) -> list:
        """Generate hash values for item"""
        hashes = []
        for i in range(self.hash_count):
            hash_val = int(hashlib.md5(f"{item}{i}".encode()).hexdigest(), 16)
            hashes.append(hash_val % self.size)
        return hashes
    
    def add(self, item: str):
        """Add item to filter"""
        for hash_val in self._hashes(item):
            self.bit_array[hash_val] = True
    
    def contains(self, item: str) -> bool:
        """Check if item might be in filter"""
        return all(self.bit_array[hash_val] for hash_val in self._hashes(item))
