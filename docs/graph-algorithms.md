# Graph Algorithms Guide

Graphs are one of the most versatile data structures in computer science, representing pairwise relationships between objects.

## Core Traversal Algorithms

### 1. Breadth-First Search (BFS)
- **Time Complexity**: O(V + E)
- **Use Cases**: Finding the shortest path in unweighted graphs, cycle detection.

### 2. Depth-First Search (DFS)
- **Time Complexity**: O(V + E)
- **Use Cases**: Topological sorting, connected components, finding bridges/articulation points.

## Shortest Path Algorithms

- **Dijkstra's Algorithm**: Single-source shortest path for non-negative edge weights.
- **Bellman-Ford Algorithm**: Single-source shortest path handling negative edge weights.
- **Floyd-Warshall Algorithm**: All-pairs shortest path dynamic programming approach.
