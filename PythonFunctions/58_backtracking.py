"""Backtracking utilities"""


def permutations(arr: list) -> list:
    """Generate all permutations"""
    if len(arr) <= 1:
        return [arr]
    
    result = []
    for i in range(len(arr)):
        rest = arr[:i] + arr[i+1:]
        for p in permutations(rest):
            result.append([arr[i]] + p)
    
    return result


def combinations(arr: list, k: int) -> list:
    """Generate all combinations of size k"""
    if k == 0:
        return [[]]
    if not arr:
        return []
    
    result = []
    # Include first element
    for combo in combinations(arr[1:], k-1):
        result.append([arr[0]] + combo)
    # Exclude first element
    result.extend(combinations(arr[1:], k))
    
    return result


def subsets(arr: list) -> list:
    """Generate all subsets"""
    if not arr:
        return [[]]
    
    rest_subsets = subsets(arr[1:])
    return rest_subsets + [[arr[0]] + subset for subset in rest_subsets]
