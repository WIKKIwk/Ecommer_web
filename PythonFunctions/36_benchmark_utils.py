"""Benchmark utilities"""
import time
import statistics


def benchmark(func, *args, runs: int = 100, **kwargs):
    """Benchmark function performance"""
    times = []
    for _ in range(runs):
        start = time.perf_counter()
        func(*args, **kwargs)
        end = time.perf_counter()
        times.append(end - start)
    
    return {
        'mean': statistics.mean(times),
        'median': statistics.median(times),
        'min': min(times),
        'max': max(times),
        'stdev': statistics.stdev(times) if len(times) > 1 else 0
    }
