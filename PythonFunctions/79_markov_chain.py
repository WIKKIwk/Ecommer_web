"""Markov chain utilities"""
import random
from collections import defaultdict


class MarkovChain:
    """Simple Markov chain text generator"""
    def __init__(self, order: int = 1):
        self.order = order
        self.chain = defaultdict(list)
    
    def train(self, text: str):
        """Train on text"""
        words = text.split()
        for i in range(len(words) - self.order):
            state = tuple(words[i:i + self.order])
            next_word = words[i + self.order]
            self.chain[state].append(next_word)
    
    def generate(self, length: int = 20, seed: tuple = None) -> str:
        """Generate text"""
        if not self.chain:
            return ""
        
        if seed is None:
            current = random.choice(list(self.chain.keys()))
        else:
            current = seed
        
        result = list(current)
        
        for _ in range(length - self.order):
            if current not in self.chain:
                break
            next_word = random.choice(self.chain[current])
            result.append(next_word)
            current = tuple(result[-self.order:])
        
        return ' '.join(result)
