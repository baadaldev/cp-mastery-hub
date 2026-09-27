// 3-Year Competitive Programming Mastery Roadmap
const CP_ROADMAP_DATA = [
  {
    tierId: "year1-foundations",
    tierName: "Year 1: Foundations & STL Mastery",
    badge: "Bronze Cadet (0 - 1200 CF)",
    color: "from-amber-600 to-yellow-500",
    desc: "Master computational thinking, asymptotic notation, C/C++ STL, and basic number manipulation.",
    modules: [
      {
        id: "mod-cpp-stl",
        name: "C++ STL & Fast I/O",
        topics: ["vector, pair, tuple", "set, multiset, unordered_set", "map, unordered_map", "queue, priority_queue, stack", "sort, lower_bound, upper_bound", "Fast I/O templates"],
        problems: [
          { id: "CF-4A", title: "Watermelon", platform: "Codeforces", diff: "800", link: "https://codeforces.com/problemset/problem/4/A" },
          { id: "CF-231A", title: "Team", platform: "Codeforces", diff: "800", link: "https://codeforces.com/problemset/problem/231/A" },
          { id: "CSES-1083", title: "Missing Number", platform: "CSES", diff: "Intro", link: "https://cses.fi/problemset/task/1083" },
          { id: "LC-217", title: "Contains Duplicate", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/contains-duplicate/" }
        ]
      },
      {
        id: "mod-math-basics",
        name: "Math, Modulo Arithmetic & Sieve",
        topics: ["GCD, LCM (Euclid's)", "Modular Arithmetic (A + B)%M, (A * B)%M", "Fast Exponentiation (Binary Exponentiation)", "Prime Sieve of Eratosthenes", "Prime Factorization"],
        problems: [
          { id: "CSES-1712", title: "Exponentiation II", platform: "CSES", diff: "Math", link: "https://cses.fi/problemset/task/1712" },
          { id: "CF-230B", title: "T-primes", platform: "Codeforces", diff: "1300", link: "https://codeforces.com/problemset/problem/230/B" },
          { id: "LC-204", title: "Count Primes", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/count-primes/" }
        ]
      },
      {
        id: "mod-two-pointers",
        name: "Two Pointers & Sliding Window",
        topics: ["Opposite Ends Pointers", "Fast & Slow Pointers (Floyd's)", "Fixed Window Maximum", "Dynamic Variable Window"],
        problems: [
          { id: "LC-125", title: "Valid Palindrome", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/valid-palindrome/" },
          { id: "LC-3", title: "Longest Substring Without Repeating", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
          { id: "CF-279B", title: "Books", platform: "Codeforces", diff: "1100", link: "https://codeforces.com/problemset/problem/279/B" }
        ]
      }
    ]
  },
  {
    tierId: "year2-core-dsa",
    tierName: "Year 2: Core DSA & Algorithmic Power",
    badge: "Silver Specialist (1200 - 1600 CF)",
    color: "from-cyan-500 to-blue-600",
    desc: "Develop deep intuition in Binary Search on Answer, Graph Traversal, and Dynamic Programming.",
    modules: [
      {
        id: "mod-binary-search",
        name: "Binary Search & Search on Answer",
        topics: ["Classic Binary Search", "Rotated Sorted Search", "Binary Search on Answer / Monotonic Function", "Ternary Search for Unimodal Functions"],
        problems: [
          { id: "CF-1613C", title: "Poisoned Dagger", platform: "Codeforces", diff: "1200", link: "https://codeforces.com/problemset/problem/1613/C" },
          { id: "CSES-1620", title: "Factory Machines", platform: "CSES", diff: "Searching", link: "https://cses.fi/problemset/task/1620" },
          { id: "LC-875", title: "Koko Eating Bananas", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas/" }
        ]
      },
      {
        id: "mod-graphs-dsu",
        name: "Graphs & Disjoint Set Union (DSU)",
        topics: ["Adjacency Lists & Matrix", "BFS & Shortest Path in Unweighted Graph", "DFS & Connected Components", "Cycle Detection & Bipartite Checking", "Disjoint Set Union (Union by Rank & Path Compression)", "Kruskal's & Prim's MST"],
        problems: [
          { id: "CSES-1192", title: "Counting Rooms", platform: "CSES", diff: "Graphs", link: "https://cses.fi/problemset/task/1192" },
          { id: "CSES-1193", title: "Labyrinth", platform: "CSES", diff: "Graphs", link: "https://cses.fi/problemset/task/1193" },
          { id: "CF-20C", title: "Dijkstra?", platform: "Codeforces", diff: "1900", link: "https://codeforces.com/problemset/problem/20/C" },
          { id: "LC-684", title: "Redundant Connection", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/redundant-connection/" }
        ]
      },
      {
        id: "mod-dynamic-prog",
        name: "Dynamic Programming (1D & 2D)",
        topics: ["Memoization vs Tabulation", "Knapsack Problems (0/1, Unbounded)", "Longest Increasing Subsequence (O(n log n))", "Longest Common Subsequence", "Grid DP & State Compaction"],
        problems: [
          { id: "CSES-1633", title: "Dice Combinations", platform: "CSES", diff: "DP", link: "https://cses.fi/problemset/task/1633" },
          { id: "CSES-1635", title: "Coin Combinations I", platform: "CSES", diff: "DP", link: "https://cses.fi/problemset/task/1635" },
          { id: "LC-300", title: "Longest Increasing Subsequence", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
          { id: "CF-455A", title: "Boredom", platform: "Codeforces", diff: "1500", link: "https://codeforces.com/problemset/problem/455/A" }
        ]
      }
    ]
  },
  {
    tierId: "year3-expert-cp",
    tierName: "Year 3: Advanced CP & Candidate Master",
    badge: "Gold Candidate Master (1600 - 2100+ CF)",
    color: "from-purple-500 to-pink-600",
    desc: "Conquer complex data structures, range queries, tree algorithms, and advanced competitive programming paradigms.",
    modules: [
      {
        id: "mod-range-queries",
        name: "Range Queries & Trees",
        topics: ["Fenwick Tree / Binary Indexed Tree (BIT)", "Segment Tree (Point Update & Range Query)", "Lazy Propagation on Segment Trees", "Sparse Table (RMQ in O(1))"],
        problems: [
          { id: "CSES-1646", title: "Static Range Sum Queries", platform: "CSES", diff: "Range", link: "https://cses.fi/problemset/task/1646" },
          { id: "CSES-1648", title: "Dynamic Range Sum Queries", platform: "CSES", diff: "Range", link: "https://cses.fi/problemset/task/1648" },
          { id: "CF-339D", title: "Xenia and Bit Operations", platform: "Codeforces", diff: "1700", link: "https://codeforces.com/problemset/problem/339/D" }
        ]
      },
      {
        id: "mod-adv-tree-graph",
        name: "Tree Algorithms & Shortest Paths",
        topics: ["Binary Lifting & Lowest Common Ancestor (LCA)", "Subtree Queries (Euler Tour Technique)", "Dijkstra with Priority Queue", "Bellman-Ford & Floyd-Warshall", "Topological Sort (Kahn's)"],
        problems: [
          { id: "CSES-1688", title: "Company Queries II (LCA)", platform: "CSES", diff: "Tree", link: "https://cses.fi/problemset/task/1688" },
          { id: "CF-219D", title: "Choosing Capital for Treeland", platform: "Codeforces", diff: "1800", link: "https://codeforces.com/problemset/problem/219/D" }
        ]
      },
      {
        id: "mod-bitmask-game",
        name: "Bitmask DP & Combinatorics",
        topics: ["Bit Manipulation Tricks (__builtin_clz, popcount)", "Bitmask Dynamic Programming (Traveling Salesperson)", "Inclusion-Exclusion Principle", "Game Theory & Sprague-Grundy Theorem"],
        problems: [
          { id: "CSES-1690", title: "Hamiltonian Flights", platform: "CSES", diff: "Bitmask DP", link: "https://cses.fi/problemset/task/1690" },
          { id: "CF-401D", title: "Roman and Numbers", platform: "Codeforces", diff: "2000", link: "https://codeforces.com/problemset/problem/401/D" }
        ]
      }
    ]
  }
];
