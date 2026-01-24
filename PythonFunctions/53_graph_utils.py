"""Graph utilities"""
from collections import defaultdict, deque


class Graph:
    """Graph implementation"""
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        """Add edge to graph"""
        self.graph[u].append(v)
    
    def bfs(self, start):
        """Breadth-first search"""
        visited = set()
        queue = deque([start])
        result = []
        
        while queue:
            vertex = queue.popleft()
            if vertex not in visited:
                visited.add(vertex)
                result.append(vertex)
                queue.extend([n for n in self.graph[vertex] if n not in visited])
        
        return result
    
    def dfs(self, start, visited=None):
        """Depth-first search"""
        if visited is None:
            visited = set()
        
        visited.add(start)
        result = [start]
        
        for neighbor in self.graph[start]:
            if neighbor not in visited:
                result.extend(self.dfs(neighbor, visited))
        
        return result
