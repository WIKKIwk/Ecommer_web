"""Heap utilities"""
import heapq


def create_min_heap(items: list) -> list:
    """Create min heap"""
    heap = items.copy()
    heapq.heapify(heap)
    return heap


def heap_push(heap: list, item):
    """Push item to heap"""
    heapq.heappush(heap, item)


def heap_pop(heap: list):
    """Pop smallest item from heap"""
    return heapq.heappop(heap) if heap else None


def get_n_largest(items: list, n: int) -> list:
    """Get n largest items"""
    return heapq.nlargest(n, items)


def get_n_smallest(items: list, n: int) -> list:
    """Get n smallest items"""
    return heapq.nsmallest(n, items)


def merge_sorted_lists(*lists) -> list:
    """Merge multiple sorted lists"""
    return list(heapq.merge(*lists))
