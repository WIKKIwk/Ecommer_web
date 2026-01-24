"""Iterator pattern utilities"""


class CustomIterator:
    """Custom iterator"""
    def __init__(self, data):
        self._data = data
        self._index = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self._index < len(self._data):
            result = self._data[self._index]
            self._index += 1
            return result
        raise StopIteration


def fibonacci_iterator(n: int):
    """Fibonacci iterator"""
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1


def infinite_counter(start: int = 0):
    """Infinite counter iterator"""
    num = start
    while True:
        yield num
        num += 1
