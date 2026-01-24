"""Pagination utilities"""
import math


def paginate(items: list, page: int, per_page: int) -> dict:
    """Paginate items"""
    total = len(items)
    total_pages = math.ceil(total / per_page)
    start = (page - 1) * per_page
    end = start + per_page
    
    return {
        'items': items[start:end],
        'page': page,
        'per_page': per_page,
        'total': total,
        'total_pages': total_pages,
        'has_prev': page > 1,
        'has_next': page < total_pages
    }


def get_page_numbers(current_page: int, total_pages: int, max_displayed: int = 5) -> list:
    """Get page numbers for pagination UI"""
    half = max_displayed // 2
    start = max(1, current_page - half)
    end = min(total_pages + 1, start + max_displayed)
    start = max(1, end - max_displayed)
    return list(range(start, end))
