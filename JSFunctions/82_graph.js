/**
 * Graph Implementation
 */

class Graph {
    constructor() {
        this.adjList = new Map();
    }

    addVertex(v) {
        if (!this.adjList.has(v)) {
            this.adjList.set(v, []);
        }
    }

    addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }

    bfs(startNode) {
        const visited = new Set();
        const queue = [startNode];
        const result = [];

        while (queue.length > 0) {
            const vertex = queue.shift();
            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);
                const neighbors = this.adjList.get(vertex) || [];
                queue.push(...neighbors);
            }
        }
        return result;
    }
}

module.exports = Graph;
