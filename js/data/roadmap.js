// =============================================================================
// CP Mastery Hub — Complete 3-Year University & Competitive Programming Curriculum
// Concept-First Roadmap inspired by Apna College Alpha & Striver's A2Z DSA Sheet
// =============================================================================

const CP_ROADMAP_DATA = [
  // ---------------------------------------------------------------------------
  // YEAR 1: FOUNDATIONS & STL MASTERY
  // ---------------------------------------------------------------------------
  {
    tierId: "year-1",
    tierName: "Year 1: Foundations & STL Mastery",
    tierSubtitle: "Absolute Beginner to 1200+ Rating on Codeforces",
    badge: "Year 1 • Bronze Cadet",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    chapters: [
      {
        id: "ch-01",
        num: "01",
        title: "Language Fundamentals & Fast I/O (C & C++)",
        category: "Basics",
        difficulty: "Beginner",
        estTime: "1-2 Weeks",
        summary: "Master compilation, basic I/O speedup, data overflow limits, pointers, and essential syntax.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 কেন Fast I/O এবং Language Fundamentals এত জরুরি?
Competitive Programming-এ সাধারণ \`std::cin\` এবং \`std::cout\` অনেক সময় অতিরিক্ত বাফারিংয়ের কারণে **Time Limit Exceeded (TLE)** তৈরি করে।
- C++ এ \`std::cin\` এবং \`std::cout\` ডিফল্টভাবে C-এর \`stdio\` (scanf/printf)-এর সাথে সিঙ্ক থাকে।
- সিঙ্ক অফ করতে \`ios_base::sync_with_stdio(false); cin.tie(NULL);\` ব্যবহার করা হয়, যা I/O গতি **১০ গুণ** বৃদ্ধি করে।
- **Integer Overflow**: 32-bit \`int\` সাধারণত \`-2*10^9\` থেকে \`+2*10^9\` পর্যন্ত মান ধরে রাখতে পারে। গুণফল বা যোগফল এর বেশি হলে অবশ্যই \`long long\` (64-bit, max \`9*10^18\`) ব্যবহার করতে হবে।`,
          complexity: "Time: O(1) per I/O operation | Space: O(1)",
          goldenRules: [
            "প্রতিটি CP সমাধানের শুরুতে `ios_base::sync_with_stdio(false); cin.tie(NULL);` যুক্ত করুন।",
            "`endl` ব্যবহার না করে `\\n` ব্যবহার করুন, কারণ `endl` প্রতিবার বাফার ফ্লাশ করে সময় নষ্ট করে।",
            "যোগ/গুণ করার সময় মান যদি $10^9$ ছাড়িয়ে যাওয়ার সুযোগ থাকে, সর্বদা `long long int` ব্যবহার করুন।"
          ],
          codeSnippet: `#include <iostream>
using namespace std;

void fastIO() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
}

int main() {
    fastIO();
    int t;
    if (cin >> t) {
        while (t--) {
            long long a, b;
            cin >> a >> b;
            cout << (a + b) << "\\n";
        }
    }
    return 0;
}`
        },
        problems: [
          { id: "CF-4A", title: "Watermelon", platform: "Codeforces", diff: "Easy", link: "https://codeforces.com/problemset/problem/4/A", hint: "Even number greater than 2." },
          { id: "CF-231A", title: "Team", platform: "Codeforces", diff: "Easy", link: "https://codeforces.com/problemset/problem/231/A", hint: "Count rows with sum >= 2." },
          { id: "LC-7", title: "Reverse Integer", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/reverse-integer/", hint: "Handle 32-bit signed overflow gracefully." },
          { id: "CSES-1068", title: "Weird Algorithm", platform: "CSES", diff: "Easy", link: "https://cses.fi/problemset/task/1068", hint: "Collatz Conjecture simulation with long long." }
        ]
      },
      {
        id: "ch-02",
        num: "02",
        title: "Time & Space Complexity & Asymptotic Analysis",
        category: "Core Concept",
        difficulty: "Beginner",
        estTime: "1 Week",
        summary: "Understand Big-O, operations per second limits, memory bounds, and preventing TLE/MLE.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Time & Space Complexity এর মূল নিয়ম:
- **1 সেকেন্ডে অপারেশনের সীমা:** আধুনিক অনলাইন জাজগুলো (Codeforces, LeetCode, CSES) প্রতি সেকেন্ডে প্রায় $10^8$ (10 কোটি) অপারেশন রান করতে পারে।
- **সমস্যায় N এর সাইজ দেখে অ্যালগরিদম নির্বাচন:**
  - $N \\le 10$: $O(N!)$ বা $O(2^N \\cdot N)$ (Backtracking / Bitmask DP)
  - $N \\le 20$: $O(2^N)$ (Recursion / Subset Generation)
  - $N \\le 500$: $O(N^3)$ (Floyd-Warshall, 3 Loops)
  - $N \\le 5000$: $O(N^2)$ (Nested Loops, 2D DP)
  - $N \\le 2 \\times 10^5$: $O(N \\log N)$ অথবা $O(N)$ (Sorting, Binary Search, Two Pointers)
  - $N \\le 10^9$: $O(\\log N)$ বা $O(\\sqrt{N})$ বা $O(1)$ (Binary Search, Math, Sieve)
- **Memory Limit:** সাধারণত 256 MB। একটি $10^7$ সাইজের \`int\` অ্যারে প্রায় 40 MB মেমোরি নেয়।`,
          complexity: "Knowledge Foundation",
          goldenRules: [
            "প্রবলেম স্টেটমেন্ট পড়ার পরপরই Constraints দেখে নিন (N এর মান কত)।",
            "যদি $N = 2 \\times 10^5$ হয়, ভুলেও $O(N^2)$ সলিউশন সাবমিট করবেন না, নিশ্চিত TLE আসবে।",
            "Space Complexity কমাতে রেফারেন্স (\`const vector<int>& v\`) পাস করুন।"
          ],
          codeSnippet: `// Example of O(N log N) vs O(N^2)
// O(N^2) - Avoid when N > 5000:
// for (int i = 0; i < n; i++)
//     for (int j = 0; j < n; j++) ...

// O(N log N) - Safe for N up to 2*10^5:
// sort(arr.begin(), arr.end());
// for (int i = 0; i < n; i++) binary_search(...);`
        },
        problems: [
          { id: "LC-217", title: "Contains Duplicate", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/contains-duplicate/", hint: "Compare O(N^2) brute force vs O(N log N) sorting vs O(N) hash set." },
          { id: "CSES-1083", title: "Missing Number", platform: "CSES", diff: "Easy", link: "https://cses.fi/problemset/task/1083", hint: "Formula N*(N+1)/2 or XOR sum in O(N) time and O(1) space." },
          { id: "LC-231", title: "Power of Two", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/power-of-two/", hint: "O(1) bit trick: n > 0 && (n & (n - 1)) == 0." }
        ]
      },
      {
        id: "ch-03",
        num: "03",
        title: "Arrays, Vectors & Prefix Sums",
        category: "Data Structures",
        difficulty: "Beginner",
        estTime: "1-2 Weeks",
        summary: "Dynamic vectors, Prefix Sum arrays, Difference arrays, and Kadane's Algorithm.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Arrays & Prefix Sum Technique:
- **Prefix Sum কি?**
  কোনো অ্যারের $L$ থেকে $R$ ইনডেক্স পর্যন্ত উপাদানের যোগফল প্রতি কোয়েরিতে $O(1)$ সময়ে বের করতে প্রিপেক্স সাম ব্যবহার করা হয়।
  - \`pref[i] = pref[i-1] + arr[i]\`
  - Range Query $(L, R) = \\text{pref}[R] - \\text{pref}[L-1]$
- **Kadane's Algorithm:**
  একটি অ্যারের সর্বাধিক সাব-অ্যারে যোগফল (Maximum Subarray Sum) $O(N)$ সময়ে বের করার ক্লাসিক অ্যালগরিদম। প্রতি পদক্ষেপে কারেন্ট সাম যদি নেগেটিভ হয়ে যায়, তবে তা ০ তে রিসেট করতে হয়।`,
          complexity: "Prefix Sum Build: O(N) | Range Query: O(1) | Kadane's: O(N) Time, O(1) Space",
          goldenRules: [
            "Prefix Sum অ্যারেতে 1-based indexing ব্যবহার করলে `L = 0` হলে আলাদা if-condition লেখার প্রয়োজন হয় না।",
            "Kadane's অ্যালগরিদমে যদি সব সংখ্যা নেগেটিভ হয়, তবে সর্ববৃহৎ সিঙ্গেল সংখ্যাটিই উত্তর হবে।"
          ],
          codeSnippet: `// Kadane's Algorithm (O(N) Time, O(1) Space)
int maxSubArray(vector<int>& nums) {
    int max_so_far = nums[0];
    int curr_max = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        curr_max = max(nums[i], curr_max + nums[i]);
        max_so_far = max(max_so_far, curr_max);
    }
    return max_so_far;
}`
        },
        problems: [
          { id: "LC-53", title: "Maximum Subarray (Kadane's)", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/maximum-subarray/", hint: "Keep running sum, reset to 0 if negative." },
          { id: "LC-1", title: "Two Sum", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/two-sum/", hint: "Use hash map for complement in O(N)." },
          { id: "LC-121", title: "Best Time to Buy and Sell Stock", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", hint: "Track minimum price seen so far." },
          { id: "CSES-1646", title: "Static Range Sum Queries", platform: "CSES", diff: "Easy", link: "https://cses.fi/problemset/task/1646", hint: "Classic Prefix Sum array." }
        ]
      },
      {
        id: "ch-04",
        num: "04",
        title: "Two Pointers & Sliding Window",
        category: "Techniques",
        difficulty: "Easy to Medium",
        estTime: "2 Weeks",
        summary: "Opposite ends traversal, Fast & Slow pointers, Fixed and Variable sliding windows.",
        visualizerAlgo: "twopointers",
        theory: {
          concept: `### 📌 Two Pointers & Sliding Window Paradigm:
- **Two Pointers (Opposite Ends):**
  একটি সর্টেড অ্যারেতে দুটি পয়েন্টার (\`left = 0\`, \`right = n - 1\`) বিপরীত দিক থেকে পরস্পরের দিকে আসে।
  - যদি \`arr[left] + arr[right] == target\`, সমাধান পাওয়া গেছে!
  - যদি যোগফল কম হয়: \`left++\`
  - যদি যোগফল বেশি হয়: \`right--\`
- **Sliding Window:**
  সাব-অ্যারে বা সাবস্ট্রিংয়ের ক্ষেত্রে যখন উইন্ডোটি ডানে সরতে থাকে।
  - **Fixed Window:** সাইজ $K$ নির্দিষ্ট থাকে। নতুন এলিমেন্ট যুক্ত হয়, পুরনোটি বাদ পড়ে ($O(1)$ ট্রানজিশন)।
  - **Variable Window:** নির্দিষ্ট শর্ত বজায় রেখে উইন্ডো এক্সপ্যান্ড ও সঙ্কুচিত করা হয়।`,
          complexity: "Time: O(N) | Space: O(1) in-place",
          goldenRules: [
            "Two Pointers সাধারণত তখনই কাজ করে যখন অ্যারে সর্টেড থাকে অথবা মনোটোনিক প্রোপার্টি বজায় থাকে।",
            "Sliding Window-এ প্রতিটি এলিমেন্ট উইন্ডোতে সর্বোচ্চ একবার প্রবেশ করে এবং একবার বের হয়, ফলে মোট টাইম O(2N) = O(N)।"
          ],
          codeSnippet: `// Two Pointers on Sorted Array (Target Sum)
bool hasPairWithSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}`
        },
        problems: [
          { id: "LC-125", title: "Valid Palindrome", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/valid-palindrome/", hint: "Two pointers inward checking alphanumeric chars." },
          { id: "LC-167", title: "Two Sum II - Input Array Is Sorted", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", hint: "Classic two pointer opposite ends." },
          { id: "LC-11", title: "Container With Most Water", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/container-with-most-water/", hint: "Move the shorter height pointer inward." },
          { id: "LC-3", title: "Longest Substring Without Repeating Characters", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", hint: "Sliding window with frequency map." },
          { id: "CF-279B", title: "Books", platform: "Codeforces", diff: "Medium", link: "https://codeforces.com/problemset/problem/279/B", hint: "Two pointers finding longest subarray with sum <= t." }
        ]
      },
      {
        id: "ch-05",
        num: "05",
        title: "Sorting Algorithms (Elementary & O(N log N))",
        category: "Algorithms",
        difficulty: "Easy to Medium",
        estTime: "1-2 Weeks",
        summary: "Bubble, Selection, Insertion Sort, Merge Sort, Quick Sort, and Inversion Count.",
        visualizerAlgo: "bubblesort",
        theory: {
          concept: `### 📌 সর্টিং অ্যালগরিদমের তুলনা ও প্রয়োগ:
1. **Bubble Sort ($O(N^2)$):** পাশাপাশি উপাদান তুলনা করে বড় মানটিকে বুদবুদের মতো ডানে পাঠিয়ে দেয়।
2. **Selection Sort ($O(N^2)$):** প্রতি ধাপে আনসর্টেড অংশের সর্বনিম্ন উপাদানটি খুঁজে বের করে শুরুতে বসায়।
3. **Insertion Sort ($O(N^2)$):** তাসের মতো একটি একটি করে উপাদান নিয়ে বামের সর্টেড অংশে সঠিক জায়গায় ইনসার্ট করে।
4. **Merge Sort ($O(N \\log N)$):** Divide and Conquer পদ্ধতি। অ্যারেকে দুই ভাগে ভাগ করে সর্ট করে পুনরায় মার্জ করা হয়। এটি Stable এবং LinkedList সর্টিং বা Inversion Count-এ সেরা।
5. **Quick Sort ($O(N \\log N)$ avg):** Pivot সিলেক্ট করে Partition করা হয়। In-place এবং ক্যাশ-ফ্রেন্ডলি।`,
          complexity: "Elementary: O(N²) Time, O(1) Space | Merge Sort: O(N log N) Time, O(N) Space",
          goldenRules: [
            "C++ এর `std::sort()` ইন্ট্রোসর্ট (Quick + Heap + Insertion Sort এর হাইব্রিড) ব্যবহার করে, যা নিশ্চিত $O(N \\log N)$ দেয়।",
            "Inversion Count সমস্যা সমাধানের সবচেয়ে কার্যকর উপায় হল Merge Sort এর মার্জ স্টেপ।"
          ],
          codeSnippet: `// Merge Sort Implementation (C++)
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}`
        },
        problems: [
          { id: "LC-75", title: "Sort Colors (Dutch National Flag)", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/sort-colors/", hint: "Three pointers (low, mid, high) in one pass O(N)." },
          { id: "LC-912", title: "Sort an Array", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/sort-an-array/", hint: "Implement Merge Sort or Quick Sort." },
          { id: "LC-56", title: "Merge Intervals", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/merge-intervals/", hint: "Sort intervals by start time, then merge overlaps." },
          { id: "LC-215", title: "Kth Largest Element in an Array", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", hint: "QuickSelect O(N) average or Min-Heap O(N log K)." }
        ]
      },
      {
        id: "ch-06",
        num: "06",
        title: "Binary Search & Search on Answer (Monotonic Predicates)",
        category: "Algorithms",
        difficulty: "Medium",
        estTime: "2 Weeks",
        summary: "Classic Binary Search, Rotated arrays, Lower/Upper bound, and Binary Search on Monotonic Answer space.",
        visualizerAlgo: "binarysearch",
        theory: {
          concept: `### 📌 Binary Search এর ম্যাজিক — Search on Answer:
- **Classic Binary Search:** সর্টেড অ্যারেতে প্রতি পদক্ষেপে সার্চ স্পেস অর্ধেক করে $O(\\log N)$ সময়ে উপাদান খোঁজা।
  \`int mid = low + (high - low) / 2;\` (ওভারফ্লো প্রতিরোধে)।
- **Binary Search on Answer (Monotonic Functions):**
  CP তে সবচেয়ে শক্তিশালী টেকনিক! যদি প্রশ্নের উত্তর একটি রেঞ্জের মধ্যে থাকে $[\\text{low}, \\text{high}]$ এবং একটি নির্দিষ্ট মানের পর উত্তর সবসময় সত্য (TTTT...FFFF অথবা FFFF...TTTT) হয়, তবে বাইনারি সার্চ দিয়ে অপটিমাল মান খুঁজে নেওয়া যায়।
  - উদাহরণ: "সর্বনিম্ন কত স্পিডে খেলে সব কলা নির্দিষ্ট সময়ের মধ্যে খাওয়া সম্ভব?" (Koko Eating Bananas).`,
          complexity: "Time: O(log N) or O(log(Max-Min) * Cost_Of_Predicate) | Space: O(1)",
          goldenRules: [
            "`mid = (low + high) / 2` কখনো লিখবেন না! `low + high` 32-bit int সীমা ছাড়িয়ে যেতে পারে। লিখুন: `low + (high - low) / 2`।",
            "Search on Answer ব্যবহারের সংকেত: প্রশ্নে 'Maximize the minimum' অথবা 'Minimize the maximum' জাতীয় শব্দ থাকবে।"
          ],
          codeSnippet: `// Binary Search on Answer Template
bool isValid(long long mid, const vector<int>& arr) {
    // Check if 'mid' satisfies the condition in O(N)
    return true; 
}

long long binarySearchAnswer(long long low, long long high, const vector<int>& arr) {
    long long ans = -1;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (isValid(mid, arr)) {
            ans = mid;
            high = mid - 1; // Try finding a smaller valid answer
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`
        },
        problems: [
          { id: "LC-704", title: "Binary Search", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/binary-search/", hint: "Standard low, high, mid template." },
          { id: "LC-33", title: "Search in Rotated Sorted Array", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", hint: "Determine which half is sorted." },
          { id: "LC-875", title: "Koko Eating Bananas", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas/", hint: "BS on Answer: speed range [1, max(piles)]." },
          { id: "CSES-1620", title: "Factory Machines", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1620", hint: "Search on Answer: time required to produce t products." },
          { id: "CF-1613C", title: "Poisoned Dagger", platform: "Codeforces", diff: "Medium", link: "https://codeforces.com/problemset/problem/1613/C", hint: "Search for minimum k to deal h damage." }
        ]
      },
      {
        id: "ch-07",
        num: "07",
        title: "C++ Standard Template Library (STL) Complete Mastery",
        category: "Language & STL",
        difficulty: "Beginner to Medium",
        estTime: "2 Weeks",
        summary: "Master Vector, Set, Multiset, Map, Unordered Map, Priority Queue, Deque, and Custom Comparators.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 C++ STL এর ইন্টারনাল আর্কিটেকচার:
- **Containers & Internals:**
  - \`vector\`: Dynamic contiguous array ($O(1)$ amortized push_back).
  - \`set\` / \`map\`: Red-Black Tree (Self-balancing BST) দিয়ে তৈরি। সব অপারেশন $O(\\log N)$ এ সর্টেড থাকে।
  - \`unordered_set\` / \`unordered_map\`: Hash Table দিয়ে তৈরি। এভারেজ $O(1)$, কিন্তু ওর্স্ট কেসে $O(N)$ (হ্যার্শ টেস্টকেস দিয়ে হ্যাক করা যায়)।
  - \`priority_queue\`: Binary Max-Heap। টপ এলিমেন্ট $O(1)$ এ অ্যাক্সেস, পুশ ও পপ $O(\\log N)$।
  - \`deque\`: Double-ended queue, সামনে ও পেছনে $O(1)$ পুশ ও পপ।
- **Custom Comparator:**
  \`sort(v.begin(), v.end(), [](const pair<int,int>& a, const pair<int,int>& b) { return a.first > b.first; });\``,
          complexity: "Red-Black Tree: O(log N) | Hash Table: O(1) avg | Heap: O(log N)",
          goldenRules: [
            "Codeforces-এ `unordered_map` ব্যবহার করার সময় কাস্টম হ্যাশ ব্যবহার করুন, নাহলে Anti-Hash টেস্টকেসে TLE আসবে।",
            "Min-Heap বানাতে: `priority_queue<int, vector<int>, greater<int>> pq;` ব্যবহার করুন।"
          ],
          codeSnippet: `#include <iostream>
#include <vector>
#include <queue>
#include <map>
#include <algorithm>
using namespace std;

// Min-Heap Example
void stlDemo() {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(30);
    minHeap.push(10);
    minHeap.push(20);
    // Top will be 10 (smallest)
    cout << "Min Element: " << minHeap.top() << "\\n";
}`
        },
        problems: [
          { id: "LC-347", title: "Top K Frequent Elements", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/top-k-frequent-elements/", hint: "Hash map + Min-Heap or Bucket Sort." },
          { id: "LC-128", title: "Longest Consecutive Sequence", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/longest-consecutive-sequence/", hint: "Store in unordered_set, check if num-1 exists." },
          { id: "LC-295", title: "Find Median from Data Stream", platform: "LeetCode", diff: "Hard", link: "https://leetcode.com/problems/find-median-from-data-stream/", hint: "Two Heaps (Max-Heap for left half, Min-Heap for right half)." },
          { id: "CSES-1163", title: "Traffic Lights", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1163", hint: "Use std::set and std::multiset for lengths." }
        ]
      },
      {
        id: "ch-08",
        num: "08",
        title: "Math, Number Theory & Bit Manipulation",
        category: "Mathematics",
        difficulty: "Medium",
        estTime: "2 Weeks",
        summary: "GCD (Euclid), Modular Arithmetic, Binary Exponentiation, Sieve of Eratosthenes, and Bitwise operations.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 CP Math & Bitwise Essentials:
- **GCD & LCM:**
  \`gcd(a, b) = b == 0 ? a : gcd(b, a % b);\` ($O(\\log(\\min(a, b)))$). \`lcm(a, b) = (a / gcd(a, b)) * b;\`
- **Binary Exponentiation ($A^B \\pmod M$ in $O(\\log B)$):**
  $B$ কে বাইনারি হিসেবে দেখে গুণ করা হয়।
- **Sieve of Eratosthenes ($O(N \\log \\log N)$):**
  $N$ পর্যন্ত সব প্রাইম নাম্বার প্রিকম্পিউট করার সবচেয়ে দ্রুত অ্যালগরিদম।
- **Bit Manipulation Golden Tricks:**
  - $i$-th bit সেট আছে কিনা: \`(n >> i) & 1\`
  - $i$-th bit সেট করা: \`n | (1 << i)\`
  - $i$-th bit আনসেট করা: \`n & ~(1 << i)\`
  - Lowest set bit: \`n & (-n)\`
  - পাওয়ার অফ 2 চেক: \`n > 0 && (n & (n - 1)) == 0\``,
          complexity: "BinExpo: O(log B) | Sieve: O(N log log N) | Bitwise: O(1)",
          goldenRules: [
            "মডুলার সাবট্র্যাকশন: `(a - b) % M` এর বদলে লিখুন `(a - b % M + M) % M` যাতে নেগেটিভ রেজাল্ট না আসে।",
            "1LL << i ব্যবহার করুন যদি i >= 30 হয়, অন্যথায় 32-bit overflow হবে।"
          ],
          codeSnippet: `// Binary Exponentiation (O(log B))
long long powerMod(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}`
        },
        problems: [
          { id: "LC-191", title: "Number of 1 Bits", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/number-of-1-bits/", hint: "n & (n - 1) clears the lowest set bit." },
          { id: "LC-136", title: "Single Number", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/single-number/", hint: "XOR of all numbers cancels pairs." },
          { id: "LC-204", title: "Count Primes", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/count-primes/", hint: "Sieve of Eratosthenes in O(N log log N)." },
          { id: "CSES-1712", title: "Exponentiation II", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1712", hint: "Fermat's Little Theorem: power mod (M - 1)." },
          { id: "CF-230B", title: "T-primes", platform: "Codeforces", diff: "Medium", link: "https://codeforces.com/problemset/problem/230/B", hint: "A number with 3 divisors must be the square of a prime." }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // YEAR 2: CORE DSA & ALGORITHMIC POWER
  // ---------------------------------------------------------------------------
  {
    tierId: "year-2",
    tierName: "Year 2: Core DSA & Algorithmic Power",
    tierSubtitle: "Intermediate to 1600+ Rating on Codeforces (Specialist/Expert)",
    badge: "Year 2 • Silver Specialist",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    chapters: [
      {
        id: "ch-09",
        num: "09",
        title: "Recursion & Backtracking Mastery",
        category: "Recursion",
        difficulty: "Medium",
        estTime: "2 Weeks",
        summary: "Recursion tree call stacks, Backtracking template (Choose, Explore, Unchoose), Subsets, and N-Queens.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Backtracking এর 3-ধাপের গোল্ডেন ফ্রেমওয়ার্ক:
1. **Choose (পছন্দ করা):** একটি সিদ্ধান্ত নিন এবং কারেন্ট স্টেটে তা অ্যাপ্লাই করুন।
2. **Explore (রিকরশন রান):** পরবর্তী ধাপের জন্য রিকার্সিভ ফাংশন কল করুন।
3. **Unchoose (ব্যাকট্র্যাক):** ফেরত আসার পর স্টেটটিকে আগের অবস্থায় ফিরিয়ে আনুন যাতে অন্য ব্রাঞ্চ ফ্রেশভাবে রান করতে পারে।
- **Base Case:** রিকার্শনের সমাপ্তি শর্ত। সঠিক বেস কেস ছাড়া Stack Overflow এর কারণে **Segmentation Fault** ঘটে।
- **Pruning (ছাঁটাই):** যেসব ব্রাঞ্চ কাঙ্ক্ষিত উত্তর দিতে পারে না, সেগুলো শুরুতেই \`return\` করে দিলে ব্যাকট্র্যাকিংয়ের এক্সপোনেনশিয়াল টাইম $O(2^N)$ অনেক কমে যায়।`,
          complexity: "Subsets: O(2^N) | Permutations: O(N!) | Space: O(N) recursion stack",
          goldenRules: [
            "প্রতিটি রিকার্সিভ ফাংশন লেখার আগে নিশ্চিত করুন বেস কেস সঠিকভাবে ডিফাইন করা হয়েছে কিনা।",
            "ডুপ্লিকেট এলিমেন্ট থাকলে শুরুতে অ্যারে সর্ট করে নিন এবং `if (i > start && arr[i] == arr[i-1]) continue;` দিয়ে প্রুনিং করুন।"
          ],
          codeSnippet: `// Universal Backtracking Template for Subsets
void generateSubsets(int index, vector<int>& nums, vector<int>& current, vector<vector<int>>& result) {
    result.push_back(current);
    for (int i = index; i < nums.size(); i++) {
        current.push_back(nums[i]);            // 1. Choose
        generateSubsets(i + 1, nums, current, result); // 2. Explore
        current.pop_back();                     // 3. Unchoose (Backtrack)
    }
}`
        },
        problems: [
          { id: "LC-78", title: "Subsets", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/subsets/", hint: "Choose / unchoose backtracking template." },
          { id: "LC-46", title: "Permutations", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/permutations/", hint: "Keep visited boolean array or swap in-place." },
          { id: "LC-39", title: "Combination Sum", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/combination-sum/", hint: "Can reuse same element: pass index instead of index+1." },
          { id: "LC-51", title: "N-Queens", platform: "LeetCode", diff: "Hard", link: "https://leetcode.com/problems/n-queens/", hint: "Track attacks on columns and both diagonals." }
        ]
      },
      {
        id: "ch-10",
        num: "10",
        title: "Linked Lists & Pointer Manipulation",
        category: "Data Structures",
        difficulty: "Medium",
        estTime: "1-2 Weeks",
        summary: "Singly & Doubly Linked List, In-place Reversal, Floyd's Cycle Detection, and Dummy Head technique.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Linked List এর টেকনিক্যাল কোর:
- **Dummy Node Technique:**
  হেড নোড পরিবর্তন বা ডিলিট হওয়ার সম্ভাবনা থাকলে \`ListNode dummy(0); dummy.next = head;\` ব্যবহার করলে এজ কেস হ্যান্ডলিং অত্যন্ত সহজ হয়ে যায়।
- **In-place Reversal ($O(N)$ Time, $O(1)$ Space):**
  তিনটি পয়েন্টার (\`prev = nullptr\`, \`curr = head\`, \`next = nullptr\`) ব্যবহার করে পয়েন্টারের ডিরেকশন রিভার্স করা হয়।
- **Floyd's Tortoise and Hare (Cycle Detection):**
  - \`slow\` পয়েন্টার প্রতি ধাপে ১ স্টেপ যায়, \`fast\` পয়েন্টার ২ স্টেপ যায়।
  - যদি কোনো লুপ থাকে, তারা একসময় অবশ্যই মিলিত হবে (\`slow == fast\`)।
  - সাইকেলের শুরুর নোড বের করতে: একটি পয়েন্টার হেডে এবং অপরটি মিটিং পয়েন্টে রেখে প্রতিবারে ১ স্টেপ করে এগিয়ে নিলে যেখানে মিট করবে সেটাই সাইকেলের শুরু!`,
          complexity: "Reversal: O(N) Time, O(1) Space | Cycle Detect: O(N) Time, O(1) Space",
          goldenRules: [
            "লুপে `fast` এবং `fast->next` উভয়ের জন্য null-check করুন: `while (fast && fast->next)`।",
            "পয়েন্টার আপডেট করার আগে সর্বদা `next` ব্যাকআপ করে রাখুন: `next = curr->next;`।"
          ],
          codeSnippet: `// Reverse Linked List in O(N) Time, O(1) Space
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`
        },
        problems: [
          { id: "LC-206", title: "Reverse Linked List", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/", hint: "Track prev, curr, next." },
          { id: "LC-141", title: "Linked List Cycle", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/linked-list-cycle/", hint: "Slow and Fast pointers (Floyd's)." },
          { id: "LC-142", title: "Linked List Cycle II", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/linked-list-cycle-ii/", hint: "After meeting, move one pointer to head at same 1x speed." },
          { id: "LC-21", title: "Merge Two Sorted Lists", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/merge-two-sorted-lists/", hint: "Dummy head + pointer comparison." },
          { id: "LC-146", title: "LRU Cache", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/lru-cache/", hint: "Doubly Linked List + Hash Map for O(1) get/put." }
        ]
      },
      {
        id: "ch-11",
        num: "11",
        title: "Stacks, Queues & Monotonic Structures",
        category: "Data Structures",
        difficulty: "Medium",
        estTime: "1-2 Weeks",
        summary: "LIFO/FIFO properties, Monotonic Stack (Next Greater Element), and Monotonic Deque for Sliding Windows.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Monotonic Stack — CP-র অন্যতম প্রভাবশালী টেকনিক:
- **Monotonic Stack কি?**
  এমন একটি স্ট্যাক যার ভেতরের উপাদানগুলো সর্বদা একটি নির্দিষ্ট অর্ডারে (Monotonically Increasing বা Monotonically Decreasing) থাকে।
- **Next Greater Element (NGE) সমস্যা:**
  ডানপাশের নিকটবর্তী বড় উপাদানটি বের করতে ডানদিক থেকে বা বামদিক থেকে ট্রাভার্স করে মনোটোনিক স্ট্যাক মেইনটেইন করলে সম্পূর্ণ অ্যারে $O(N)$ সময়ে সলভ করা যায়। প্রতিটি উপাদান সর্বোচ্চ একবার পুশ ও একবার পপ হয়।
- **Sliding Window Maximum ($O(N)$ with Monotonic Deque):**
  উইন্ডোর ভেতরের উপাদানগুলোকে ডিক্রিজিং অর্ডারে \`deque\` তে সংরক্ষণ করা হয়। ফলে \`deque.front()\` সর্বদা বর্তমান উইন্ডোর সর্বোচ্চ মান প্রদান করে।`,
          complexity: "Monotonic Stack: O(N) Time, O(N) Space | Monotonic Deque: O(N) Time",
          goldenRules: [
            "Next Greater Element এর জন্য Decreasing Stack এবং Next Smaller Element এর জন্য Increasing Stack প্রয়োজন।",
            "Histogram Area বা Trapping Rain Water সমস্যায় মনোটোনিক স্ট্যাক ম্যাজিকের মতো কাজ করে।"
          ],
          codeSnippet: `// Next Greater Element using Monotonic Stack (O(N))
vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> nge(n, -1);
    stack<int> st; // stores indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            nge[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return nge;
}`
        },
        problems: [
          { id: "LC-20", title: "Valid Parentheses", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/valid-parentheses/", hint: "Standard stack matching closing brackets." },
          { id: "LC-739", title: "Daily Temperatures", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/daily-temperatures/", hint: "Monotonic Decreasing Stack storing indices." },
          { id: "LC-84", title: "Largest Rectangle in Histogram", platform: "LeetCode", diff: "Hard", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", hint: "Monotonic Stack finding previous and next smaller bar." },
          { id: "LC-239", title: "Sliding Window Maximum", platform: "LeetCode", diff: "Hard", link: "https://leetcode.com/problems/sliding-window-maximum/", hint: "Monotonic Deque maintaining decreasing values." }
        ]
      },
      {
        id: "ch-12",
        num: "12",
        title: "Greedy Algorithms & Interval Scheduling",
        category: "Algorithms",
        difficulty: "Medium",
        estTime: "1-2 Weeks",
        summary: "Greedy choice property, interval scheduling, fractional knapsack, and sorting-based optimal strategies.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Greedy Algorithm এর মূল নীতি:
- **লোকাল অপটিমাম থেকে গ্লোবাল অপটিমাম:**
  প্রতিটি ধাপে তাৎক্ষণিকভাবে সেরা মনে হওয়া সিদ্ধান্তটি গ্রহণ করা হয় এই বিশ্বাসে যে এটি শেষ পর্যন্ত সেরা ফলাফল বয়ে আনবে।
- **কখন গ্রিডি কাজ করে?**
  1. **Greedy-choice Property:** স্থানীয় সেরা সিদ্ধান্ত কখনোই আগের সিদ্ধান্তের ওপর নেতিবাচক প্রভাব ফেলে না।
  2. **Optimal Substructure:** মূল সমস্যার সর্বোত্তম সমাধান তার সাব-প্রবলেমগুলোর সর্বোত্তম সমাধানের ভেতর নিহিত থাকে।
- **Interval Scheduling (সর্বোচ্চ সংখ্যক মিটিং):**
  সব মিটিং তাদের **End Time** অনুযায়ী সর্ট করুন। যে মিটিংটি সবার আগে শেষ হয় সেটি গ্রহণ করুন, এতে পরবর্তী মিটিংগুলোর জন্য সবচেয়ে বেশি সময় অবশিষ্ট থাকে!`,
          complexity: "Typically O(N log N) dominated by Sorting",
          goldenRules: [
            "গ্রিডি সমস্যা সমাধান করার আগে কাউন্টার-এক্সাম্পল দিয়ে নিজের আইডিয়া ভেরিফাই করে নিন।",
            "Interval সমস্যায় শুরু অথবা শেষ সময় দিয়ে সর্টিং করাই সমাধানের মূল চাবিকাঠি।"
          ],
          codeSnippet: `// Interval Scheduling (Max non-overlapping intervals)
int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    if (intervals.empty()) return 0;
    // Sort by end time
    sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
        return a[1] < b[1];
    });
    int count = 0, last_end = intervals[0][1];
    for (size_t i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] < last_end) count++; // overlap, remove
        else last_end = intervals[i][1];
    }
    return count;
}`
        },
        problems: [
          { id: "LC-435", title: "Non-overlapping Intervals", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/non-overlapping-intervals/", hint: "Sort by end time, greedily take earliest finish." },
          { id: "LC-55", title: "Jump Game", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/jump-game/", hint: "Track furthest reachable index so far." },
          { id: "LC-134", title: "Gas Station", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/gas-station/", hint: "If total gas < total cost, impossible. Otherwise reset start when tank < 0." },
          { id: "CF-158B", title: "Taxi", platform: "Codeforces", diff: "Medium", link: "https://codeforces.com/problemset/problem/158/B", hint: "Group 4, 3+1, 2+2, remainder 1s." }
        ]
      },
      {
        id: "ch-13",
        num: "13",
        title: "Binary Trees & Binary Search Trees (BST)",
        category: "Trees",
        difficulty: "Medium",
        estTime: "2-3 Weeks",
        summary: "Tree traversals (DFS Pre/In/Post, BFS Level-Order), Diameter, LCA, and BST properties.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Tree Fundamentals & Traversals:
- **Traversals:**
  - **Preorder:** Root $\\to$ Left $\\to$ Right (ট্রি কপি বা সিরিয়ালাইজ করতে)
  - **Inorder:** Left $\\to$ Root $\\to$ Right (BST-তে এটি উপাদানগুলোকে **সর্টেড** অর্ডারে প্রদর্শন করে!)
  - **Postorder:** Left $\\to$ Right $\\to$ Root (বটম-আপ ডিলিশন বা ক্যালকুলেশন)
  - **Level Order (BFS):** \`queue\` ব্যবহার করে লেভেল বাই লেভেল ট্রাভার্সাল।
- **Lowest Common Ancestor (LCA):**
  দুটি নোড $p$ এবং $q$ এর সাধারণ পূর্বপুরুষ যেটির গভীরতা সবচেয়ে বেশি। BST-তে যদি \`root->val > max(p, q)\` হয় তবে বামে এবং \`root->val < min(p, q)\` হলে ডানে যেতে হয়।
- **Tree Diameter:**
  ট্রির যে কোনো দুটি নোডের মধ্যকার সর্বোচ্চ দূরত্ব। এটি সাব-ট্রির \`maxDepth(left) + maxDepth(right)\` এর যোগফল থেকে নির্ণয় করা হয়।`,
          complexity: "DFS/BFS Traversals: O(V) Time, O(H) recursion stack Space (H = height)",
          goldenRules: [
            "ট্রি-র প্রায় 90% সমস্যার সমাধান Recursion এবং DFS দিয়ে বটম-আপ ভাবে করা যায়।",
            "BST-তে Inorder Traversal করলে উপাদানগুলো সবসময় strictly increasing ক্রমানুসারে পাওয়া যায়।"
          ],
          codeSnippet: `// Lowest Common Ancestor in Binary Tree (O(N))
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root; // p is in one subtree, q in other
    return left ? left : right;
}`
        },
        problems: [
          { id: "LC-104", title: "Maximum Depth of Binary Tree", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", hint: "1 + max(depth(left), depth(right))." },
          { id: "LC-226", title: "Invert Binary Tree", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/invert-binary-tree/", hint: "Swap left and right subtrees recursively." },
          { id: "LC-102", title: "Binary Tree Level Order Traversal", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", hint: "Queue BFS tracking size at each level." },
          { id: "LC-236", title: "Lowest Common Ancestor of a Binary Tree", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", hint: "If left and right both return non-null, root is LCA." },
          { id: "LC-98", title: "Validate Binary Search Tree", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree/", hint: "Pass valid range (minVal, maxVal) down the tree." }
        ]
      },
      {
        id: "ch-14",
        num: "14",
        title: "Graphs — BFS, DFS & Connectivity",
        category: "Graphs",
        difficulty: "Medium",
        estTime: "2-3 Weeks",
        summary: "Adjacency representation, BFS, DFS, Connected Components, Bipartite coloring, and Topological Sort.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Graph Theory Core:
- **Graph Representation:**
  \`vector<vector<int>> adj(n);\` (Adjacency List — স্পেস $O(V + E)$)।
- **Breadth-First Search (BFS):**
  \`queue\` ব্যবহার করে নিকটবর্তী নোডগুলো আগে এক্সপ্লোর করে। **Unweighted গ্রাফে শর্টেস্ট পাথ** বের করতে নিশ্চিত BFS ব্যবহার করতে হবে।
- **Depth-First Search (DFS):**
  রিকার্শন বা স্ট্যাক ব্যবহার করে গভীরে ট্রাভার্স করে। কানেক্টেড কম্পোনেন্ট গণনা ও সাইকেল ডিটেকশনে আদর্শ।
- **Topological Sort (DAG):**
  Directed Acyclic Graph এর নোডগুলোকে এমনভাবে সাজানো যাতে প্রতিটি এজ $u \\to v$-এর জন্য $u$, $v$-এর পূর্বে আসে। Kahn's Algorithm (in-degree array + queue) দিয়ে $O(V + E)$-তে নির্ণয় করা যায়।`,
          complexity: "BFS / DFS: O(V + E) Time, O(V) Space",
          goldenRules: [
            "BFS-এ নোডটি কিউতে পুশ করার সাথে সাথেই `visited[node] = true;` করতে হবে, পপ করার সময় নয়! নাহলে একই নোড বারবার কিউতে ঢুকে MLE/TLE করবে।",
            "টপোলজিক্যাল সর্ট শুধুমাত্র DAG (Directed Acyclic Graph)-এ সম্ভব। যদি প্রসেস করা নোডের সংখ্যা V এর কম হয়, তবে গ্রাফে সাইকেল রয়েছে।"
          ],
          codeSnippet: `// BFS Shortest Path in Unweighted Graph (O(V + E))
vector<int> bfsShortestPath(int start, int n, const vector<vector<int>>& adj) {
    vector<int> dist(n, -1);
    queue<int> q;
    dist[start] = 0;
    q.push(start);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}`
        },
        problems: [
          { id: "LC-200", title: "Number of Islands", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/number-of-islands/", hint: "Grid DFS/BFS visiting all connected 1s." },
          { id: "LC-207", title: "Course Schedule", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/course-schedule/", hint: "Topological Sort / Cycle detection in directed graph." },
          { id: "CSES-1192", title: "Counting Rooms", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1192", hint: "Flood-fill DFS on grid." },
          { id: "CSES-1193", title: "Labyrinth", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1193", hint: "BFS to find shortest path and reconstruct steps." },
          { id: "LC-785", title: "Is Graph Bipartite?", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/is-graph-bipartite/", hint: "2-Coloring BFS/DFS checking if neighbor has same color." }
        ]
      },
      {
        id: "ch-15",
        num: "15",
        title: "Shortest Paths (Dijkstra) & Disjoint Set Union (DSU)",
        category: "Graphs",
        difficulty: "Medium to Hard",
        estTime: "2 Weeks",
        summary: "Dijkstra's Priority Queue algorithm, Disjoint Set Union with Path Compression, and Kruskal's MST.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Weighted Graphs & Disjoint Sets:
- **Dijkstra's Algorithm ($O((V + E) \\log V)$):**
  নন-নেগেটিভ ওয়েটেড গ্রাফে সিঙ্গেল সোর্স শর্টেস্ট পাথ। Min-Heap (\`priority_queue\`) ব্যবহার করে সবচেয়ে কম দূরত্বের নোডটি আগে রিল্যাক্স করা হয়।
- **Disjoint Set Union (DSU / Union-Find):**
  ডাইনামিক কানেক্টিভিটি চেক ও কম্পোনেন্ট মার্জ করার বিস্ময়কর ডেটা স্ট্রাকচার।
  - **Path Compression:** \`parent[x] = find(parent[x]);\`
  - **Union by Rank/Size:** ছোট ট্রি-কে বড় ট্রির নিচে যুক্ত করা হয়।
  - প্রতিটি অপারেশনের সময়সীমা প্রায় $O(1)$ (Ackermann Inverse $\\alpha(N)$)।
- **Kruskal's Algorithm for MST ($O(E \\log E)$):**
  সব এজ ওজন অনুযায়ী সর্ট করে DSU দিয়ে সাইকেল না তৈরি করে $V-1$ টি এজ যুক্ত করে Minimum Spanning Tree গঠন করা হয়।`,
          complexity: "Dijkstra: O((V + E) log V) | DSU: O(α(N)) ≈ O(1) amortized",
          goldenRules: [
            "Dijkstra নেগেটিভ ওয়েট থাকলে কাজ করে না (তখন Bellman-Ford বা SPFA প্রয়োজন)।",
            "DSU তে Path Compression এবং Union by Size উভয়ই ব্যবহার করলে ট্রি ফ্ল্যাট থাকে এবং স্ট্যাক ওভারফ্লো হয় না।"
          ],
          codeSnippet: `// Disjoint Set Union (DSU) Structure with Path Compression
struct DSU {
    vector<int> parent, size;
    DSU(int n) : parent(n), size(n, 1) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    bool unite(int i, int j) {
        int root_i = find(i), root_j = find(j);
        if (root_i == root_j) return false;
        if (size[root_i] < size[root_j]) swap(root_i, root_j);
        parent[root_j] = root_i;
        size[root_i] += size[root_j];
        return true;
    }
};`
        },
        problems: [
          { id: "LC-743", title: "Network Delay Time", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/network-delay-time/", hint: "Standard Dijkstra with priority_queue." },
          { id: "LC-684", title: "Redundant Connection", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/redundant-connection/", hint: "DSU: first edge connecting already united nodes is redundant." },
          { id: "LC-1584", title: "Min Cost to Connect All Points", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/min-cost-to-connect-all-points/", hint: "Kruskal's MST with Manhattan distances." },
          { id: "CF-20C", title: "Dijkstra?", platform: "Codeforces", diff: "Hard", link: "https://codeforces.com/problemset/problem/20/C", hint: "Dijkstra with path reconstruction." },
          { id: "CSES-1676", title: "Road Construction", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1676", hint: "DSU tracking max component size and component count." }
        ]
      },
      {
        id: "ch-16",
        num: "16",
        title: "Dynamic Programming I — 1D & Linear DP",
        category: "Dynamic Programming",
        difficulty: "Medium",
        estTime: "2-3 Weeks",
        summary: "Overlapping subproblems, Memoization vs Tabulation, State design, and Longest Increasing Subsequence.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Dynamic Programming এর মূল ফিলোসফি:
"Those who cannot remember the past are condemned to repeat it."
- **DP চেনার উপায়:**
  1. Overlapping Subproblems (একই সাব-প্রবলেম বারবার কল হওয়া)।
  2. Optimal Substructure (সাব-প্রবলেমের অপটিমাল সলিউশন থেকে বড় সমস্যার অপটিমাল সলিউশন তৈরি)।
- **DP সমাধানের 4 টি ধাপ:**
  1. **State Definition:** \`dp[i]\` দ্বারা আমরা কী বোঝাতে চাইছি? (উদা: $i$-তম উপাদান পর্যন্ত সর্বোচ্চ লাভ)।
  2. **Transition Formula:** পূর্ববর্তী স্টেট থেকে নতুন স্টেটে যাওয়ার সূত্র (Recurrence Relation)।
  3. **Base Case:** শুরুর মান (যেমন \`dp[0] = 0\`)।
  4. **Order of Computation:** ডিপেন্ডেন্সি অনুযায়ী স্টেট ক্যালকুলেশন (বটম-আপ বা মেমোইজেশন)।
- **Longest Increasing Subsequence (LIS):**
  - সাধারণ DP: $O(N^2)$
  - Binary Search + Patience Sorting: $O(N \\log N)$ with \`std::lower_bound\`!`,
          complexity: "1D DP: O(N) Time, O(N) or O(1) Space | LIS: O(N log N)",
          goldenRules: [
            "যদি স্টেট শুধুমাত্র আগের ১ বা ২টি মানের ওপর নির্ভর করে (যেমন Fibonacci, House Robber), তবে পুরো অ্যারে না রেখে দুটি ভেরিয়েবল ব্যবহার করে স্পেস O(1) এ নামিয়ে আনুন।",
            "LIS এ O(N log N) পেতে `tails` অ্যারে এবং `lower_bound` ব্যবহার করুন।"
          ],
          codeSnippet: `// Longest Increasing Subsequence in O(N log N)
int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) {
            tails.push_back(x);
        } else {
            *it = x; // replace with smaller tail
        }
    }
    return tails.size();
}`
        },
        problems: [
          { id: "LC-70", title: "Climbing Stairs", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/climbing-stairs/", hint: "dp[i] = dp[i-1] + dp[i-2]." },
          { id: "LC-198", title: "House Robber", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/house-robber/", hint: "dp[i] = max(dp[i-1], dp[i-2] + nums[i])." },
          { id: "LC-322", title: "Coin Change", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/coin-change/", hint: "dp[i] = min(dp[i], dp[i - coin] + 1) for all coins." },
          { id: "LC-300", title: "Longest Increasing Subsequence", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/longest-increasing-subsequence/", hint: "O(N log N) with lower_bound on tails vector." },
          { id: "CF-455A", title: "Boredom", platform: "Codeforces", diff: "Medium", link: "https://codeforces.com/problemset/problem/455/A", hint: "Count frequency, reduce to House Robber style DP." }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // YEAR 3: ADVANCED CP & CANDIDATE MASTER
  // ---------------------------------------------------------------------------
  {
    tierId: "year-3",
    tierName: "Year 3: Advanced CP & Candidate Master",
    tierSubtitle: "Advanced Mastery to 2000+ Rating on Codeforces (Candidate Master/Master)",
    badge: "Year 3 • Gold Master",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    chapters: [
      {
        id: "ch-17",
        num: "17",
        title: "Dynamic Programming II — 2D, Grids, Knapsack & LCS",
        category: "Dynamic Programming",
        difficulty: "Hard",
        estTime: "3 Weeks",
        summary: "0/1 Knapsack, Unbounded Knapsack, 2D Grid paths, Longest Common Subsequence (LCS), and Edit Distance.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 2D & Multi-dimensional Dynamic Programming:
- **0/1 Knapsack Problem ($O(N \\cdot W)$):**
  একটি আইটেম সর্বোচ্চ একবার নেওয়া যাবে।
  - স্টেট: \`dp[w]\` = ওজন $w$ এর ভেতর সর্বোচ্চ মান।
  - গুরুত্বপূর্ণ ট্রিক: স্পেস $O(W)$-তে আনতে ইনার লুপ **রিভার্স অর্ডারে** (\`for (int w = W; w >= weight[i]; w--)\`) চালাতে হবে যাতে একই আইটেম দুবার গণনা না হয়!
- **Longest Common Subsequence (LCS):**
  দুটি স্ট্রিং $S_1$ এবং $S_2$ এর সাধারণ দীর্ঘতম সাবসিকোয়েন্স।
  - যদি \`S1[i-1] == S2[j-1]\`: \`dp[i][j] = 1 + dp[i-1][j-1]\`
  - অন্যথায়: \`dp[i][j] = max(dp[i-1][j], dp[i][j-1])\`
- **Grid DP (Unique Paths / Minimum Path Sum):**
  গ্রিডে শুধুমাত্র ডানে এবং নিচে যাওয়া গেলে: \`dp[r][c] = cost[r][c] + min(dp[r-1][c], dp[r][c-1])\`.`,
          complexity: "Knapsack: O(N * W) Time, O(W) Space | LCS: O(N * M) Time, O(M) Space",
          goldenRules: [
            "0/1 Knapsack-এ মেমোরি বাঁচাতে 1D অ্যারে ব্যবহার করলে লুপ অবশ্যই $W$ থেকে নিচের দিকে চালাতে হবে।",
            "Unbounded Knapsack (আইটেম আনলিমিটেড নেওয়া যায়)-এ লুপ সামনের দিকে চালাতে হয়।"
          ],
          codeSnippet: `// 0/1 Knapsack Space-Optimized to O(W)
int knapSack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`
        },
        problems: [
          { id: "LC-62", title: "Unique Paths", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/unique-paths/", hint: "dp[i][j] = dp[i-1][j] + dp[i][j-1]." },
          { id: "LC-1143", title: "Longest Common Subsequence", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/longest-common-subsequence/", hint: "2D DP matching characters." },
          { id: "LC-72", title: "Edit Distance", platform: "LeetCode", diff: "Hard", link: "https://leetcode.com/problems/edit-distance/", hint: "Insert, delete, or replace operations in 2D DP." },
          { id: "LC-416", title: "Partition Equal Subset Sum", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/partition-equal-subset-sum/", hint: "Reduce to 0/1 Knapsack with target = totalSum / 2." },
          { id: "CSES-1633", title: "Dice Combinations", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1633", hint: "Unbounded combination DP summing last 6 values." }
        ]
      },
      {
        id: "ch-18",
        num: "18",
        title: "Tries & String Algorithms (KMP, Z-Algorithm)",
        category: "Strings",
        difficulty: "Hard",
        estTime: "2-3 Weeks",
        summary: "Trie structure, Bitwise Trie for Max-XOR, KMP Prefix Function, and Rolling Hash (Rabin-Karp).",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Advanced String Processing:
- **Trie (Prefix Tree):**
  প্রতিটি নোডে $26$ টি চাইল্ড পয়েন্টার বা ম্যাপ থাকে। স্ট্রিং ইনসার্ট ও প্রিফিক্স সার্চ $O(L)$ সময়ে সম্পন্ন হয় ($L$ = স্ট্রিংয়ের দৈর্ঘ্য)।
- **Binary Trie (Bitwise Trie):**
  সংখ্যার বাইনারি রিপ্রেজেন্টেশন (30 বিট) ট্রাই-তে সংরক্ষণ করে যেকোনো সেটের মধ্যে সর্বোচ্চ XOR পেয়ার $O(N \\log(\\max A))$ সময়ে বের করা যায়।
- **Knuth-Morris-Pratt (KMP) Algorithm ($O(N + M)$):**
  লংগেস্ট প্রোপার প্রিফিক্স যা একই সাথে সাফিক্স (LPS / $\\pi$ array) প্রিকম্পিউট করে মিসম্যাচ হলে শুরু থেকে না করে অপটিমাল ইনডেক্স থেকে ম্যাচিং কন্টিনিউ করে।`,
          complexity: "Trie Insert/Search: O(L) | KMP Matching: O(N + M) Time",
          goldenRules: [
            "ম্যাক্সিমাম XOR সমস্যা সমাধান করতে প্রতিটি সংখ্যার বিট বড় থেকে ছোট (bit 30 down to 0) ট্রাই-তে ইনসার্ট করুন এবং অপজিট বিট খোঁজার চেষ্টা করুন।",
            "Rolling Hash ব্যবহার করার সময় ডাবল হ্যাশ (দুটি ভিন্ন প্রাইম মডিউলো) ব্যবহার করুন হাশ সংঘর্ষ (Hash Collision) প্রতিরোধ করতে।"
          ],
          codeSnippet: `// Trie Implementation Template
struct TrieNode {
    TrieNode* children[26] = {nullptr};
    bool isEndOfWord = false;
};

void insert(TrieNode* root, const string& word) {
    TrieNode* curr = root;
    for (char c : word) {
        int idx = c - 'a';
        if (!curr->children[idx]) curr->children[idx] = new TrieNode();
        curr = curr->children[idx];
    }
    curr->isEndOfWord = true;
}`
        },
        problems: [
          { id: "LC-208", title: "Implement Trie (Prefix Tree)", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/implement-trie-prefix-tree/", hint: "26-ary tree storing children and end flag." },
          { id: "LC-421", title: "Maximum XOR of Two Numbers in an Array", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", hint: "Binary Trie checking opposite bits." },
          { id: "LC-28", title: "Find the Index of the First Occurrence in a String", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", hint: "KMP LPS array in O(N + M)." },
          { id: "CSES-1753", title: "String Matching", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1753", hint: "KMP or Rolling Hash pattern occurrence counter." }
        ]
      },
      {
        id: "ch-19",
        num: "19",
        title: "Range Queries — Segment Tree & Fenwick Tree (BIT)",
        category: "Advanced Data Structures",
        difficulty: "Hard",
        estTime: "3 Weeks",
        summary: "Fenwick Tree (BIT), Segment Tree (Point Update & Range Query), and Lazy Propagation.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Range Queries Data Structures:
- **Binary Indexed Tree (Fenwick Tree / BIT):**
  - Point Update: $O(\\log N)$
  - Prefix Sum Query: $O(\\log N)$
  - অত্যন্ত হালকা কোড (মাত্র ১০ লাইনে লেখা যায়) এবং ক্যাশ-এফিশিয়েন্ট। বিটওয়াইজ \`i += (i & -i)\` এবং \`i -= (i & -i)\` ট্রিক ব্যবহার করে।
- **Segment Tree:**
  - কমপ্লিট বাইনারি ট্রি রিপ্রেজেন্টেশন ($4N$ সাইজের অ্যারে)।
  - যেকোনো Associative অপারেশন (Sum, Min, Max, GCD) সাপোর্ট করে।
  - Point Update: $O(\\log N)$, Range Query: $O(\\log N)$।
- **Lazy Propagation:**
  যখন সম্পূর্ণ রেঞ্জ আপডেট (\`add X to range [L, R]\`) করতে হয়, তখন পুরো ট্রিতে আপডেট না ছড়িয়ে পরবর্তীতে প্রয়োজন হলে নোডগুলোকে অলসভাবে (lazily) আপডেট করা হয়।`,
          complexity: "Segment Tree Build: O(N) | Query/Update: O(log N) | Space: O(4N)",
          goldenRules: [
            "যদি শুধু প্রিফিক্স সাম বা পয়েন্ট আপডেট রেঞ্জ সাম দরকার হয়, তবে সর্বদা Fenwick Tree ব্যবহার করুন (কোড খুব ছোট ও দ্রুত)।",
            "রেঞ্জ মিনিমাম, রেঞ্জ ম্যাক্সিমাম বা নন-ইনভার্টিবল অপারেশনে Segment Tree অপরিহার্য।"
          ],
          codeSnippet: `// Fenwick Tree / BIT Implementation
struct FenwickTree {
    int n;
    vector<long long> tree;
    FenwickTree(int n) : n(n), tree(n + 1, 0) {}
    void add(int i, long long delta) {
        for (; i <= n; i += (i & -i)) tree[i] += delta;
    }
    long long query(int i) {
        long long sum = 0;
        for (; i > 0; i -= (i & -i)) sum += tree[i];
        return sum;
    }
    long long rangeQuery(int l, int r) {
        return query(r) - query(l - 1);
    }
};`
        },
        problems: [
          { id: "LC-307", title: "Range Sum Query - Mutable", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/range-sum-query-mutable/", hint: "Segment Tree or Fenwick Tree with point update." },
          { id: "CSES-1648", title: "Dynamic Range Sum Queries", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1648", hint: "Classic BIT/Fenwick Tree." },
          { id: "CSES-1649", title: "Dynamic Range Minimum Queries", platform: "CSES", diff: "Medium", link: "https://cses.fi/problemset/task/1649", hint: "Segment Tree maintaining range min." },
          { id: "CF-339D", title: "Xenia and Bit Operations", platform: "Codeforces", diff: "Hard", link: "https://codeforces.com/problemset/problem/339/D", hint: "Segment Tree alternating OR and XOR levels." }
        ]
      },
      {
        id: "ch-20",
        num: "20",
        title: "Advanced CP — Game Theory & Bitmask DP",
        category: "Advanced CP",
        difficulty: "Expert",
        estTime: "3 Weeks",
        summary: "Nim Game, Sprague-Grundy theorem, Bitmask Dynamic Programming (O(2^N * N)), and TSP.",
        visualizerAlgo: null,
        theory: {
          concept: `### 📌 Game Theory & Bitmask DP:
- **Nim Game & Bouton's Theorem:**
  - $N$ টি পাইলের সাইজের XOR সাম ($S = x_1 \\oplus x_2 \\oplus \\dots \\oplus x_n$) যদি $0$ হয়, তবে প্রথম প্লেয়ার নিশ্চিতভাবে হারবে (P-position / Losing State)।
  - যদি XOR সাম $\\neq 0$ হয়, তবে প্রথম প্লেয়ার নিশ্চিত জিতবে (N-position / Winning State)।
- **Sprague-Grundy Theorem:**
  যেকোনো Impartial গেমকে ইকুইভ্যালেন্ট নিম পাইলে কনভার্ট করা যায় Mex (Minimum Excluded Value) ক্যালকুলেশনের মাধ্যমে।
- **Bitmask DP ($O(2^N \\cdot N)$):**
  যখন $N \\le 20$ হয়, তখন উপাদানগুলোর সিলেকশন স্টেটকে একটি ইন্টিজারের বিট (0 বা 1) হিসেবে রিপ্রেজেন্ট করে সাবসেট অপটিমাইজেশন (যেমন Traveling Salesperson Problem) সলভ করা হয়।`,
          complexity: "Nim: O(N) | Bitmask DP: O(2^N * N) Time",
          goldenRules: [
            "গেম থিওরি সমস্যায় সবসময় ছোট টেস্টকেসের প্যাটার্ন ও XOR সাম পর্যবেক্ষণ করুন।",
            "Bitmask DP-তে `1 << N` এর সাইজ $N > 22$ হলে মেমোরি লিমিট ছাড়িয়ে যাবে, তাই $N \\le 20$ তেই সীমাবদ্ধ রাখুন।"
          ],
          codeSnippet: `// Bitmask DP - Traveling Salesperson Problem (TSP)
int tsp(int mask, int u, int n, const vector<vector<int>>& dist, vector<vector<int>>& dp) {
    if (mask == (1 << n) - 1) return dist[u][0]; // return to start
    if (dp[mask][u] != -1) return dp[mask][u];
    
    int ans = 1e9;
    for (int v = 0; v < n; v++) {
        if (!(mask & (1 << v))) {
            ans = min(ans, dist[u][v] + tsp(mask | (1 << v), v, n, dist, dp));
        }
    }
    return dp[mask][u] = ans;
}`
        },
        problems: [
          { id: "LC-292", title: "Nim Game", platform: "LeetCode", diff: "Easy", link: "https://leetcode.com/problems/nim-game/", hint: "n % 4 != 0 wins." },
          { id: "LC-847", title: "Shortest Path Visiting All Nodes", platform: "LeetCode", diff: "Hard", link: "https://leetcode.com/problems/shortest-path-visiting-all-nodes/", hint: "BFS with (node, bitmask_visited) states." },
          { id: "LC-473", title: "Matchsticks to Square", platform: "LeetCode", diff: "Medium", link: "https://leetcode.com/problems/matchsticks-to-square/", hint: "Bitmask DP or DFS with pruning." },
          { id: "CSES-1690", title: "Hamiltonian Flights", platform: "CSES", diff: "Hard", link: "https://cses.fi/problemset/task/1690", hint: "Bitmask DP counting paths from 1 to N." }
        ]
      }
    ]
  }
];

// Helper functions for roadmap calculations
function getRoadmapTotalProblems() {
  let count = 0;
  CP_ROADMAP_DATA.forEach(tier => {
    tier.chapters.forEach(ch => {
      count += ch.problems.length;
    });
  });
  return count;
}

function getRoadmapTotalChapters() {
  let count = 0;
  CP_ROADMAP_DATA.forEach(tier => {
    count += tier.chapters.length;
  });
  return count;
}
