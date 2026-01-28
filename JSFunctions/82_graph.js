/**
 * Graph (Adjacency List)
 */

class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList.get(vertex1).push(vertex2);
    this.adjacencyList.get(vertex2).push(vertex1);
  }

  bfs(start) {
    const queue = [start];
    const result = [];
    const visited = new Set();
    visited.add(start);

    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);

      this.adjacencyList.get(vertex).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  dfs(start) {
    const result = [];
    const visited = new Set();
    const list = this.adjacencyList;

    (function dfsHelper(vertex) {
      if (!vertex) return;
      visited.add(vertex);
      result.push(vertex);
      list.get(vertex).forEach(neighbor => {
        if (!visited.has(neighbor)) return dfsHelper(neighbor);
      });
    })(start);

    return result;
  }
}

module.exports = Graph;
