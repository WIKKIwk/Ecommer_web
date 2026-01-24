"""Queue utilities"""
from queue import Queue, PriorityQueue, LifoQueue
from collections import deque


def create_queue(maxsize: int = 0):
    """Create FIFO queue"""
    return Queue(maxsize=maxsize)


def create_priority_queue():
    """Create priority queue"""
    return PriorityQueue()


def create_stack():
    """Create LIFO queue (stack)"""
    return LifoQueue()


class CircularQueue:
    """Circular queue implementation"""
    def __init__(self, size: int):
        self.size = size
        self.queue = deque(maxlen=size)
    
    def enqueue(self, item):
        """Add item to queue"""
        self.queue.append(item)
    
    def dequeue(self):
        """Remove and return item"""
        return self.queue.popleft() if self.queue else None
    
    def is_full(self):
        """Check if queue is full"""
        return len(self.queue) == self.size
