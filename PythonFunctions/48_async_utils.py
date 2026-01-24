"""Async utilities"""
import asyncio


async def async_sleep(seconds: float):
    """Async sleep"""
    await asyncio.sleep(seconds)


async def run_parallel(*coroutines):
    """Run coroutines in parallel"""
    return await asyncio.gather(*coroutines)


async def async_map(func, iterable):
    """Async map function"""
    tasks = [func(item) for item in iterable]
    return await asyncio.gather(*tasks)


def run_async(coroutine):
    """Run async coroutine"""
    return asyncio.run(coroutine)


async def timeout_wrapper(coroutine, timeout: float):
    """Wrap coroutine with timeout"""
    try:
        return await asyncio.wait_for(coroutine, timeout=timeout)
    except asyncio.TimeoutError:
        return None
