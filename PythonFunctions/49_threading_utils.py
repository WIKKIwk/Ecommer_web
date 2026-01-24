"""Threading utilities"""
import threading
from concurrent.futures import ThreadPoolExecutor


def run_in_thread(func, *args, **kwargs):
    """Run function in separate thread"""
    thread = threading.Thread(target=func, args=args, kwargs=kwargs)
    thread.start()
    return thread


def parallel_map(func, iterable, max_workers: int = 4):
    """Parallel map using threads"""
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        return list(executor.map(func, iterable))


class ThreadSafeCounter:
    """Thread-safe counter"""
    def __init__(self):
        self._value = 0
        self._lock = threading.Lock()
    
    def increment(self):
        """Increment counter"""
        with self._lock:
            self._value += 1
    
    @property
    def value(self):
        """Get counter value"""
        with self._lock:
            return self._value
