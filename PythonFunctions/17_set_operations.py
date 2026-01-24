"""Set operations"""


def set_union(set1: set, set2: set) -> set:
    """Union of two sets"""
    return set1 | set2


def set_intersection(set1: set, set2: set) -> set:
    """Intersection of two sets"""
    return set1 & set2


def set_difference(set1: set, set2: set) -> set:
    """Difference of two sets"""
    return set1 - set2


def set_symmetric_difference(set1: set, set2: set) -> set:
    """Symmetric difference of two sets"""
    return set1 ^ set2
