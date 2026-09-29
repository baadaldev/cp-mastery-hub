# Disjoint Set Union (DSU / Union-Find)

## Optimizations
- **Path Compression**: Flattens tree during ind().
- **Union by Rank/Size**: Attaches smaller tree under root of larger tree.
- **Effective Complexity**: Near O(1) amortized via inverse Ackermann alpha(N).
