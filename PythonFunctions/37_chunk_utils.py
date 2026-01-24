"""Chunk processing utilities"""


def process_in_chunks(data: list, chunk_size: int, processor):
    """Process data in chunks"""
    results = []
    for i in range(0, len(data), chunk_size):
        chunk = data[i:i + chunk_size]
        results.extend(processor(chunk))
    return results


def batch_generator(data: list, batch_size: int):
    """Generate batches from data"""
    for i in range(0, len(data), batch_size):
        yield data[i:i + batch_size]
