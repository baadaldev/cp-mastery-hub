// 14 Core Algorithmic Patterns & Templates
var CP_PATTERNS_DATA = [
  {
    id: "two-pointers",
    name: "1. Two Pointers",
    icon: "arrow-left-right",
    whenToUse: "When dealing with sorted arrays, pairs, searching symmetric properties (palindromes), or finding pairs that satisfy a condition.",
    timeSpace: "Time: O(N) | Space: O(1)",
    sampleProblems: ["Two Sum II", "3Sum", "Valid Palindrome", "Container With Most Water"],
    cppCode: `int left = 0, right = n - 1;
while (left < right) {
    int currentSum = arr[left] + arr[right];
    if (currentSum == target) {
        return {left, right};
    } else if (currentSum < target) {
        left++;
    } else {
        right--;
    }
}`
  },
  {
    id: "sliding-window",
    name: "2. Sliding Window",
    icon: "maximize-2",
    whenToUse: "When finding subarrays/substrings of maximum, minimum, or target properties over continuous segments.",
    timeSpace: "Time: O(N) | Space: O(K)",
    sampleProblems: ["Longest Substring Without Repeating", "Minimum Window Substring", "Sliding Window Maximum"],
    cppCode: `int left = 0, maxLen = 0;
unordered_map<char, int> count;
for (int right = 0; right < s.length(); ++right) {
    count[s[right]]++;
    while (!isValid(count)) {
        count[s[left]]--;
        left++;
    }
    maxLen = max(maxLen, right - left + 1);
}`
  },
  {
    id: "fast-slow",
    name: "3. Fast & Slow Pointers (Hare & Tortoise)",
    icon: "activity",
    whenToUse: "Cycle detection in linked lists or arrays, finding the middle node, and cycle length calculation.",
    timeSpace: "Time: O(N) | Space: O(1)",
    sampleProblems: ["Linked List Cycle", "Find the Duplicate Number", "Happy Number"],
    cppCode: `ListNode *slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
    if (slow == fast) return true; // Cycle detected
}
return false;`
  },
  {
    id: "monotonic-stack",
    name: "4. Monotonic Stack",
    icon: "layers",
    whenToUse: "Finding Next Greater Element, Next Smaller Element, or Largest Rectangle in linear time.",
    timeSpace: "Time: O(N) | Space: O(N)",
    sampleProblems: ["Daily Temperatures", "Next Greater Element", "Largest Rectangle in Histogram"],
    cppCode: `stack<int> st; // stores indices
vector<int> res(n, -1);
for (int i = 0; i < n; ++i) {
    while (!st.empty() && arr[i] > arr[st.top()]) {
        int prev = st.top(); st.pop();
        res[prev] = arr[i];
    }
    st.push(i);
}`
  },
  {
    id: "binary-search-answer",
    name: "5. Binary Search on Answer",
    icon: "search",
    whenToUse: "When given an optimization problem ('minimize the maximum' or 'maximize the minimum') where the condition check is monotonic.",
    timeSpace: "Time: O(N log(Range)) | Space: O(1)",
    sampleProblems: ["Koko Eating Bananas", "Capacity To Ship Packages", "Split Array Largest Sum"],
    cppCode: `long long low = 1, high = maxPossible, ans = high;
while (low <= high) {
    long long mid = low + (high - low) / 2;
    if (checkCondition(mid)) {
        ans = mid;
        high = mid - 1; // Try smaller valid answer
    } else {
        low = mid + 1;
    }
}`
  },
  {
    id: "tree-bfs",
    name: "6. Breadth-First Search (BFS)",
    icon: "git-branch",
    whenToUse: "Finding shortest path in unweighted graphs or level-by-level tree traversal.",
    timeSpace: "Time: O(V + E) | Space: O(V)",
    sampleProblems: ["Binary Tree Level Order", "Rotting Oranges", "Word Ladder", "Shortest Path in Binary Matrix"],
    cppCode: `queue<int> q;
vector<bool> visited(n, false);
q.push(start);
visited[start] = true;
int dist = 0;

while (!q.empty()) {
    int sz = q.size();
    for (int i = 0; i < sz; ++i) {
        int u = q.front(); q.pop();
        if (u == target) return dist;
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    dist++;
}`
  },
  {
    id: "dsu",
    name: "7. Disjoint Set Union (Union-Find)",
    icon: "share-2",
    whenToUse: "Dynamic graph connectivity, cycle detection in undirected graphs, and Kruskal's MST.",
    timeSpace: "Time: O(alpha(N)) | Space: O(N)",
    sampleProblems: ["Redundant Connection", "Number of Provinces", "Accounts Merge"],
    cppCode: `struct DSU {
    vector<int> parent, rank;
    DSU(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int i) {
        return parent[i] == i ? i : parent[i] = find(parent[i]);
    }
    bool unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI == rootJ) return false;
        if (rank[rootI] < rank[rootJ]) swap(rootI, rootJ);
        parent[rootJ] = rootI;
        if (rank[rootI] == rank[rootJ]) rank[rootI]++;
        return true;
    }
};`
  },
  {
    id: "topological-sort",
    name: "8. Topological Sort (Kahn's Algorithm)",
    icon: "compass",
    whenToUse: "Dependency resolution, task scheduling, and detecting cycles in directed acyclic graphs (DAG).",
    timeSpace: "Time: O(V + E) | Space: O(V + E)",
    sampleProblems: ["Course Schedule I & II", "Alien Dictionary", "Minimum Height Trees"],
    cppCode: `vector<int> inDegree(n, 0);
for (int u = 0; u < n; ++u)
    for (int v : adj[u]) inDegree[v]++;

queue<int> q;
for (int i = 0; i < n; ++i) if (inDegree[i] == 0) q.push(i);

vector<int> order;
while (!q.empty()) {
    int u = q.front(); q.pop();
    order.push_back(u);
    for (int v : adj[u]) {
        if (--inDegree[v] == 0) q.push(v);
    }
}
return order.size() == n ? order : vector<int>();`
  }
];

if (typeof window !== 'undefined') {
  window.CP_PATTERNS_DATA = CP_PATTERNS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CP_PATTERNS_DATA };
}

