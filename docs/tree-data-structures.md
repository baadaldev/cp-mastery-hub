# Advanced Tree Structures Guide

Trees are hierarchical data structures used extensively across system design, database indexing, and competitive programming.

## Tree Types & Applications

### 1. Binary Search Tree (BST) & Balanced BST (AVL / Red-Black)
- Provides O(log N) lookup, insertion, and deletion.
- Standard libraries (C++ std::set, std::map) utilize Red-Black trees.

### 2. Segment Tree & Fenwick Tree (Binary Indexed Tree)
- **Segment Tree**: Solves range queries (sum, min, max, GCD) with point/range updates in O(log N).
- **Fenwick Tree**: Memory-efficient prefix sum data structure with O(log N) operations.

### 3. Trie (Prefix Tree)
- Specialized tree for string search, autocomplete, and dictionary lookups in O(L) time where L is word length.
