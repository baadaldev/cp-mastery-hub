// =============================================================================
// CP Mastery Hub — Core Application Logic
// Professional Educational Platform (Apna College & Striver Architecture)
// =============================================================================

const TEMPLATES = {
  cpp: `// =============================================================================
// Problem: CP Solution Template
// Author: baadaldev
// Language: C++17 with Fast I/O
// =============================================================================

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <map>
#include <set>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <stack>
#include <numeric>

using namespace std;

#define fast_io ios_base::sync_with_stdio(false); cin.tie(NULL);
#define all(x) (x).begin(), (x).end()
#define pb push_back
#define fi first
#define se second

typedef long long ll;
typedef pair<int, int> pii;
typedef vector<int> vi;
typedef vector<ll> vll;

const int MOD = 1e9 + 7;
const ll INF = 1e18;

void solve() {
    // Write your solution logic here
    int n;
    if (!(cin >> n)) return;
    vi a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    cout << "Ready to conquer CP! Processed " << n << " elements.\\n";
}

int main() {
    fast_io;
    int t = 1;
    // cin >> t; // Uncomment if multiple test cases
    while (t--) {
        solve();
    }
    return 0;
}
`,
  c: `/*
 * CP Solution Template in C (C99)
 * Author: baadaldev
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

void solve() {
    int n;
    if (scanf("%d", &n) != 1) return;
    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    printf("Processed %d items successfully.\\n", n);
    free(arr);
}

int main() {
    int t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
`,
  python: `"""
CP Solution Template in Python 3
Author: baadaldev
"""
import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:1+n]]
    
    print(f"Processed {len(nums)} items.")

if __name__ == "__main__":
    solve()
`
};

// Global App State
let currentActiveChapter = "ch-01"; // Open Chapter 1 by default so content is instantly visible!
let currentTierFilter = "all";
let currentStatusFilter = "all";
let currentSearchQuery = "";
let currentNoteProblemId = null;

// Safe data getters
function getRoadmapData() {
  if (typeof window !== 'undefined' && window.CP_ROADMAP_DATA && window.CP_ROADMAP_DATA.length > 0) {
    return window.CP_ROADMAP_DATA;
  }
  if (typeof CP_ROADMAP_DATA !== 'undefined' && CP_ROADMAP_DATA.length > 0) {
    return CP_ROADMAP_DATA;
  }
  return [];
}

function getPatternsData() {
  if (typeof window !== 'undefined' && window.CP_PATTERNS_DATA && window.CP_PATTERNS_DATA.length > 0) {
    return window.CP_PATTERNS_DATA;
  }
  if (typeof CP_PATTERNS_DATA !== 'undefined' && CP_PATTERNS_DATA.length > 0) {
    return CP_PATTERNS_DATA;
  }
  return [];
}

function findChapterById(chId) {
  const data = getRoadmapData();
  for (const tier of data) {
    for (const ch of tier.chapters) {
      if (ch.id === chId) return ch;
    }
  }
  return null;
}

function findProblemById(probId) {
  const data = getRoadmapData();
  for (const tier of data) {
    for (const ch of tier.chapters) {
      for (const p of ch.problems) {
        if (p.id === probId) return { problem: p, chapter: ch };
      }
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) window.lucide.createIcons();

  // 2. Setup Navigation Tabs
  setupNavigationTabs();

  // 3. Render Roadmap & Concepts (Default Active View)
  setupRoadmapControls();
  renderRoadmapCurriculum();

  // 4. Code Studio Setup
  setupCodeEditor();

  // 5. Algorithm Visualizer Setup
  setupVisualizerControls();

  // 6. 14 Algorithmic Patterns
  renderPatterns();

  // 7. GitHub Sync Setup
  setupGitHubSyncControls();

  // 8. Socratic Coach Setup
  setupSocraticCoach();

  // 9. Modals (Notes & Quick Hint)
  setupModals();

  // 10. Update Global Progress Counter
  updateGlobalStats();
});

// -----------------------------------------------------------------------------
// NAVIGATION TABS
// -----------------------------------------------------------------------------
function setupNavigationTabs() {
  const navButtons = document.querySelectorAll(".nav-tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  window.switchTab = function(tabId) {
    navButtons.forEach(btn => {
      const active = btn.dataset.tab === tabId;
      btn.classList.toggle("bg-indigo-600", active);
      btn.classList.toggle("text-white", active);
      btn.classList.toggle("shadow-sm", active);
      btn.classList.toggle("text-slate-400", !active);
    });

    tabPanels.forEach(panel => {
      panel.classList.toggle("hidden", panel.id !== `tab-${tabId}`);
    });

    if (tabId === "visualizer" && window.visualizer) {
      window.visualizer.render();
    } else if (tabId === "contests" && window.contestRadar) {
      window.contestRadar.fetchContests();
    }
  };

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Starred button in header filters roadmap to starred problems
  const filterStarredHeader = document.getElementById("btn-filter-starred-header");
  if (filterStarredHeader) {
    filterStarredHeader.addEventListener("click", () => {
      switchTab("roadmap");
      const statusSelect = document.getElementById("roadmap-status-filter");
      if (statusSelect) {
        statusSelect.value = "starred";
        currentStatusFilter = "starred";
        renderRoadmapCurriculum();
      }
    });
  }
}

// -----------------------------------------------------------------------------
// ROADMAP CURRICULUM RENDERING (APNA COLLEGE / STRIVER ARCHITECTURE)
// -----------------------------------------------------------------------------
function setupRoadmapControls() {
  // Tier filter buttons (All, Year 1, Year 2, Year 3)
  const tierButtons = document.querySelectorAll(".tier-filter-btn");
  tierButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tierButtons.forEach(b => {
        b.classList.remove("bg-indigo-600", "text-white");
        b.classList.add("bg-slate-900", "text-slate-300");
      });
      btn.classList.add("bg-indigo-600", "text-white");
      btn.classList.remove("bg-slate-900", "text-slate-300");
      currentTierFilter = btn.dataset.tier;
      renderRoadmapCurriculum();
    });
  });

  // Search input
  const searchInput = document.getElementById("roadmap-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderRoadmapCurriculum();
    });
  }

  // Status dropdown filter
  const statusFilter = document.getElementById("roadmap-status-filter");
  if (statusFilter) {
    statusFilter.addEventListener("change", (e) => {
      currentStatusFilter = e.target.value;
      renderRoadmapCurriculum();
    });
  }
}

function renderRoadmapCurriculum() {
  const container = document.getElementById("roadmap-chapters-container");
  const roadmapData = getRoadmapData();
  if (!container || !roadmapData || roadmapData.length === 0) return;

  const solvedMap = JSON.parse(localStorage.getItem("cp_solved_problems") || "{}");
  const starredMap = JSON.parse(localStorage.getItem("cp_starred_problems") || "{}");
  const notesMap = JSON.parse(localStorage.getItem("cp_problem_notes") || "{}");

  let html = "";
  let totalChaptersRendered = 0;

  roadmapData.forEach(tier => {
    // Filter by tier
    if (currentTierFilter !== "all" && tier.tierId !== currentTierFilter) {
      return;
    }

    tier.chapters.forEach(ch => {
      // Filter by search query
      const matchesSearch = !currentSearchQuery ||
        ch.title.toLowerCase().includes(currentSearchQuery) ||
        ch.summary.toLowerCase().includes(currentSearchQuery) ||
        ch.category.toLowerCase().includes(currentSearchQuery) ||
        ch.problems.some(p => p.title.toLowerCase().includes(currentSearchQuery));

      if (!matchesSearch) return;

      // Filter by status (solved / unsolved / starred)
      let filteredProblems = ch.problems;
      if (currentStatusFilter === "solved") {
        filteredProblems = ch.problems.filter(p => !!solvedMap[p.id]);
      } else if (currentStatusFilter === "unsolved") {
        filteredProblems = ch.problems.filter(p => !solvedMap[p.id]);
      } else if (currentStatusFilter === "starred") {
        filteredProblems = ch.problems.filter(p => !!starredMap[p.id]);
      }

      // If status filter is applied and no problems match in this chapter, skip chapter
      if (currentStatusFilter !== "all" && filteredProblems.length === 0) {
        return;
      }

      totalChaptersRendered++;
      const chapterSolvedCount = ch.problems.filter(p => !!solvedMap[p.id]).length;
      const isChapterComplete = chapterSolvedCount === ch.problems.length && ch.problems.length > 0;
      const isExpanded = currentActiveChapter === ch.id || (currentSearchQuery.length > 2);

      // Difficulty badge styling
      let diffBadgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      if (ch.difficulty === "Medium" || ch.difficulty === "Easy to Medium") {
        diffBadgeColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
      } else if (ch.difficulty === "Hard" || ch.difficulty === "Expert") {
        diffBadgeColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";
      }

      html += `
        <div class="pro-card transition-all ${isChapterComplete ? 'border-emerald-500/30' : 'border-slate-800'}" id="chapter-card-${ch.id}">
          
          <!-- Chapter Accordion Header -->
          <div class="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/50 rounded-xl transition" onclick="toggleChapter('${ch.id}')">
            
            <div class="flex items-start sm:items-center gap-3.5">
              <span class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                ${ch.num}
              </span>
              <div>
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h3 class="font-bold text-base text-white hover:text-indigo-300 transition">${ch.title}</h3>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${diffBadgeColor} border">
                    ${ch.difficulty}
                  </span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    ${ch.category}
                  </span>
                  ${ch.visualizerAlgo ? `
                    <button onclick="event.stopPropagation(); launchVisualizerForAlgo('${ch.visualizerAlgo}')" class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/30 flex items-center gap-1 transition" title="Launch Visualizer">
                      <i data-lucide="play" class="w-2.5 h-2.5"></i> Visualizer
                    </button>
                  ` : ''}
                </div>
                <p class="text-xs text-slate-400">${ch.summary}</p>
              </div>
            </div>

            <!-- Solved Progress Pill & Expand Indicator -->
            <div class="flex items-center gap-3 self-end md:self-center">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-semibold ${isChapterComplete ? 'text-emerald-400' : 'text-slate-300'}">
                  ${chapterSolvedCount}/${ch.problems.length} Solved
                </span>
                <div class="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 hidden sm:block">
                  <div class="h-full ${isChapterComplete ? 'bg-emerald-400' : 'bg-indigo-500'}" style="width: ${(chapterSolvedCount / ch.problems.length) * 100}%"></div>
                </div>
              </div>
              <button class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center transition hover:text-white">
                <i data-lucide="${isExpanded ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4"></i>
              </button>
            </div>

          </div>

          <!-- Chapter Expanded Body (Theory & Problems) -->
          <div class="${isExpanded ? 'block' : 'hidden'} border-t border-slate-800/80 p-5 space-y-6 bg-slate-950/40 rounded-b-xl">
            
            <!-- SECTION 1: CONCEPT DEEP DIVE & GOLDEN RULES -->
            <div class="space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <div class="flex items-center gap-2">
                  <i data-lucide="book-open" class="w-4 h-4 text-indigo-400"></i>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200">1. Concept Deep Dive & Golden Rules</h4>
                </div>
                <span class="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                  ${ch.theory.complexity}
                </span>
              </div>

              <!-- Markdown Theory Content -->
              <div class="concept-markdown bg-slate-900/60 p-4 rounded-xl border border-slate-800/70 text-sm">
                ${formatTheoryMarkdown(ch.theory.concept)}
              </div>

              <!-- Golden Rules Checklist -->
              <div class="bg-indigo-950/20 p-4 rounded-xl border border-indigo-500/20">
                <h5 class="text-xs font-bold text-indigo-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <i data-lucide="shield-check" class="w-4 h-4 text-indigo-400"></i> Golden Rules & Pro-Tips
                </h5>
                <ul class="space-y-1.5 text-xs text-slate-300">
                  ${ch.theory.goldenRules.map(rule => `
                    <li class="flex items-start gap-2">
                      <span class="text-indigo-400 font-bold mt-0.5">•</span>
                      <span>${rule}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- C++ Code Snippet Box -->
              <div class="relative">
                <div class="flex items-center justify-between bg-slate-900 px-4 py-2 rounded-t-xl border-t border-x border-slate-800 text-xs text-slate-400">
                  <span class="font-mono text-[11px] text-slate-300 flex items-center gap-1.5">
                    <i data-lucide="code" class="w-3.5 h-3.5 text-indigo-400"></i> C++ Implementation / Template
                  </span>
                  <div class="flex items-center gap-2">
                    <button onclick="copyChapterCode('${ch.id}', this)" class="text-slate-400 hover:text-white flex items-center gap-1 transition text-[11px]">
                      <i data-lucide="copy" class="w-3 h-3"></i> Copy
                    </button>
                    <button onclick="loadChapterCodeToStudio('${ch.id}')" class="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition text-[11px]">
                      <i data-lucide="terminal" class="w-3 h-3"></i> Open in Studio
                    </button>
                  </div>
                </div>
                <pre class="code-block rounded-t-none font-mono text-xs overflow-x-auto"><code>${escapeHtml(ch.theory.codeSnippet)}</code></pre>
              </div>

            </div>

            <!-- SECTION 2: CURATED PRACTICE PROBLEMS -->
            <div class="space-y-3 pt-2">
              <div class="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <div class="flex items-center gap-2">
                  <i data-lucide="target" class="w-4 h-4 text-emerald-400"></i>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-200">2. Curated Practice Problems (${ch.problems.length})</h4>
                </div>
                <span class="text-[11px] text-slate-400">Ranked from Easy to Hard</span>
              </div>

              <div class="space-y-2">
                ${filteredProblems.map(p => {
                  const isChecked = !!solvedMap[p.id];
                  const isStarred = !!starredMap[p.id];
                  const hasNote = !!notesMap[p.id];

                  let diffColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                  if (p.diff === "Medium") diffColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
                  else if (p.diff === "Hard") diffColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";

                  return `
                    <div class="pro-card p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition ${isChecked ? 'bg-slate-900/30' : 'bg-slate-900/80'}">
                      
                      <!-- Left: Checkbox, Star, Title -->
                      <div class="flex items-center gap-3">
                        <input type="checkbox" class="custom-check" data-prob-id="${p.id}" ${isChecked ? 'checked' : ''} onchange="toggleProblemSolved('${p.id}')" title="Mark as solved">
                        
                        <button onclick="toggleProblemStarred('${p.id}')" class="star-btn ${isStarred ? 'starred' : ''}" title="${isStarred ? 'Unstar problem' : 'Star for revision'}">
                          <i data-lucide="star" class="w-4 h-4"></i>
                        </button>

                        <div>
                          <a href="${p.link}" target="_blank" class="font-medium text-xs sm:text-sm text-slate-200 hover:text-indigo-400 transition flex items-center gap-1.5 ${isChecked ? 'line-through text-slate-500' : ''}">
                            <span>${p.title}</span>
                            <i data-lucide="external-link" class="w-3 h-3 text-slate-500"></i>
                          </a>
                        </div>
                      </div>

                      <!-- Right: Badges & Action Buttons -->
                      <div class="flex items-center gap-2 self-end sm:self-center">
                        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${diffColor} border">
                          ${p.diff}
                        </span>
                        
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                          ${p.platform}
                        </span>

                        <!-- Quick Hint Button -->
                        ${p.hint ? `
                          <button onclick="openQuickHintModal('${p.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition" title="View Quick Hint">
                            <i data-lucide="lightbulb" class="w-3.5 h-3.5"></i>
                          </button>
                        ` : ''}

                        <!-- Personal Notes Button -->
                        <button onclick="openProblemNotesModal('${p.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 ${hasNote ? 'text-indigo-400 font-bold' : 'text-slate-400'} transition" title="Personal Notes & Approach">
                          <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                        </button>

                        <!-- Load Code Studio Button -->
                        <button onclick="loadProblemToStudio('${p.id}')" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 text-[11px] font-medium transition flex items-center gap-1" title="Open in Code Studio">
                          <i data-lucide="code" class="w-3 h-3"></i> Code
                        </button>
                      </div>

                    </div>
                  `;
                }).join('')}
              </div>
            </div>

          </div>

        </div>
      `;
    });
  });

  if (totalChaptersRendered === 0) {
    html = `
      <div class="pro-card p-12 text-center text-slate-400">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-3 text-slate-600 stroke-1"></i>
        <h3 class="text-sm font-bold text-white mb-1">No matching concepts or problems found</h3>
        <p class="text-xs text-slate-500">Try changing your search keywords or switching filters back to "All Chapters".</p>
      </div>
    `;
  }

  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

window.toggleChapter = function(chId) {
  if (currentActiveChapter === chId) {
    currentActiveChapter = null;
  } else {
    currentActiveChapter = chId;
  }
  renderRoadmapCurriculum();
};

window.copyChapterCode = function(chId, btnEl) {
  const ch = findChapterById(chId);
  if (!ch) return;
  navigator.clipboard.writeText(ch.theory.codeSnippet).then(() => {
    showToast("Template copied to clipboard! 📋");
    if (btnEl) {
      const orig = btnEl.innerHTML;
      btnEl.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Copied!`;
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => {
        btnEl.innerHTML = orig;
        if (window.lucide) window.lucide.createIcons();
      }, 1800);
    }
  });
};

window.loadChapterCodeToStudio = function(chId) {
  const ch = findChapterById(chId);
  if (!ch) return;
  switchTab("editor");
  const codeEditor = document.getElementById("code-editor-area");
  const filenameInput = document.getElementById("push-filename-input");
  const commitInput = document.getElementById("push-commit-input");

  if (codeEditor) codeEditor.value = ch.theory.codeSnippet;
  if (filenameInput) {
    const slug = ch.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    filenameInput.value = `concepts/${slug}.cpp`;
  }
  if (commitInput) commitInput.value = `feat: add implementation template for ${ch.title}`;
  showToast(`Loaded ${ch.title} into Code Studio!`);
};

window.loadProblemToStudio = function(probId) {
  const res = findProblemById(probId);
  if (!res) return;
  const p = res.problem;
  switchTab("editor");
  const codeEditor = document.getElementById("code-editor-area");
  const filenameInput = document.getElementById("push-filename-input");
  const commitInput = document.getElementById("push-commit-input");

  const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const platSlug = p.platform.toLowerCase();

  if (filenameInput) filenameInput.value = `solutions/${platSlug}/${slug}.cpp`;
  if (commitInput) commitInput.value = `feat: solve ${p.platform} - ${p.title}`;

  if (codeEditor) {
    codeEditor.value = `// =============================================================================
// Problem: ${p.title} (${p.platform})
// Problem ID: ${p.id}
// Difficulty: ${p.diff}
// Link: ${p.link}
// Author: baadaldev
// =============================================================================

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

void solve() {
    // Write your solution here
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    solve();
    return 0;
}
`;
  }

  showToast(`Loaded "${p.title}" into Code Studio!`);
};

window.launchVisualizerForAlgo = function(algoName) {
  switchTab("visualizer");
  const algoSelect = document.getElementById("viz-algo-select");
  if (algoSelect) {
    algoSelect.value = algoName;
    if (window.visualizer) {
      window.visualizer.setAlgorithm(algoName);
    }
  }
};

window.toggleProblemSolved = function(probId) {
  const solvedMap = JSON.parse(localStorage.getItem("cp_solved_problems") || "{}");
  if (solvedMap[probId]) {
    delete solvedMap[probId];
  } else {
    solvedMap[probId] = true;
  }
  localStorage.setItem("cp_solved_problems", JSON.stringify(solvedMap));
  renderRoadmapCurriculum();
  updateGlobalStats();
  showToast(solvedMap[probId] ? "Problem marked as solved! 🌟" : "Problem unmarked.");
};

window.toggleProblemStarred = function(probId) {
  const starredMap = JSON.parse(localStorage.getItem("cp_starred_problems") || "{}");
  if (starredMap[probId]) {
    delete starredMap[probId];
  } else {
    starredMap[probId] = true;
  }
  localStorage.setItem("cp_starred_problems", JSON.stringify(starredMap));
  renderRoadmapCurriculum();
  updateGlobalStats();
  showToast(starredMap[probId] ? "Added to Revision Starred list! ⭐" : "Removed from Starred.");
};

function updateGlobalStats() {
  const solvedMap = JSON.parse(localStorage.getItem("cp_solved_problems") || "{}");
  const starredMap = JSON.parse(localStorage.getItem("cp_starred_problems") || "{}");
  const roadmapData = getRoadmapData();

  let totalProblems = 0;
  let totalChapters = 0;
  let completedChapters = 0;

  if (roadmapData) {
    roadmapData.forEach(tier => {
      tier.chapters.forEach(ch => {
        totalChapters++;
        totalProblems += ch.problems.length;
        const solvedInCh = ch.problems.filter(p => !!solvedMap[p.id]).length;
        if (solvedInCh === ch.problems.length && ch.problems.length > 0) {
          completedChapters++;
        }
      });
    });
  }

  const solvedCount = Object.keys(solvedMap).length;
  const starredCount = Object.keys(starredMap).length;
  const percentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  // Header Counters
  const solvedEl = document.getElementById("stats-solved-count");
  const totalEl = document.getElementById("stats-total-count");
  const percentEl = document.getElementById("stats-percent");
  const starredEl = document.getElementById("stats-starred-count");

  if (solvedEl) solvedEl.textContent = solvedCount;
  if (totalEl) totalEl.textContent = totalProblems;
  if (percentEl) percentEl.textContent = `${percentage}%`;
  if (starredEl) starredEl.textContent = starredCount;

  // Hero Section Elements
  const heroProgressText = document.getElementById("hero-progress-text");
  const heroProgressBar = document.getElementById("hero-progress-bar");
  const heroChaptersDone = document.getElementById("hero-chapters-done");
  const heroProblemsDone = document.getElementById("hero-problems-done");

  if (heroProgressText) heroProgressText.textContent = `${percentage}%`;
  if (heroProgressBar) heroProgressBar.style.width = `${percentage}%`;
  if (heroChaptersDone) heroChaptersDone.textContent = `${completedChapters} of ${totalChapters} Chapters`;
  if (heroProblemsDone) heroProblemsDone.textContent = `${solvedCount} / ${totalProblems} Problems`;
}

// -----------------------------------------------------------------------------
// CODE STUDIO & 1-CLICK GITHUB PUSH
// -----------------------------------------------------------------------------
function setupCodeEditor() {
  const codeEditor = document.getElementById("code-editor-area");
  const langSelect = document.getElementById("editor-lang-select");
  const copyBtn = document.getElementById("btn-copy-editor-code");
  const resetBtn = document.getElementById("btn-reset-boilerplate");
  const tabTitle = document.getElementById("editor-tab-title");

  if (codeEditor && langSelect) {
    codeEditor.value = TEMPLATES[langSelect.value] || TEMPLATES.cpp;

    langSelect.addEventListener("change", (e) => {
      const lang = e.target.value;
      codeEditor.value = TEMPLATES[lang] || TEMPLATES.cpp;
      if (tabTitle) {
        tabTitle.textContent = lang === 'cpp' ? 'solution.cpp' : lang === 'c' ? 'solution.c' : 'solution.py';
      }
    });
  }

  if (copyBtn && codeEditor) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(codeEditor.value).then(() => {
        showToast("Code copied to clipboard! 📋");
      });
    });
  }

  if (resetBtn && codeEditor && langSelect) {
    resetBtn.addEventListener("click", () => {
      codeEditor.value = TEMPLATES[langSelect.value] || TEMPLATES.cpp;
      showToast("Boilerplate reset to default.");
    });
  }
}

// -----------------------------------------------------------------------------
// VISUALIZER CONTROLS SETUP
// -----------------------------------------------------------------------------
function setupVisualizerControls() {
  if (window.AlgorithmVisualizer) {
    window.visualizer = new AlgorithmVisualizer();
  }

  const algoSelect = document.getElementById("viz-algo-select");
  const btnRun = document.getElementById("btn-play-pause");
  const btnNext = document.getElementById("btn-step-next");
  const btnPrev = document.getElementById("btn-step-prev");
  const btnReset = document.getElementById("btn-viz-reset");
  const speedSlider = document.getElementById("viz-speed-slider");
  const btnApplyArray = document.getElementById("btn-apply-custom-array");
  const targetContainer = document.getElementById("target-input-container");

  if (algoSelect) {
    algoSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (window.visualizer) window.visualizer.setAlgorithm(val);
      if (targetContainer) {
        targetContainer.classList.toggle("hidden", val !== "binarysearch" && val !== "twopointers");
      }
    });
  }

  if (btnRun) {
    btnRun.addEventListener("click", () => {
      if (window.visualizer) window.visualizer.togglePlay();
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (window.visualizer) window.visualizer.stepForward();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (window.visualizer) window.visualizer.stepBackward();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      if (window.visualizer) window.visualizer.reset();
    });
  }

  if (speedSlider) {
    speedSlider.addEventListener("input", (e) => {
      if (window.visualizer) window.visualizer.setSpeed(parseInt(e.target.value));
    });
  }

  if (btnApplyArray) {
    btnApplyArray.addEventListener("click", () => {
      const raw = document.getElementById("viz-array-input").value;
      const targetVal = parseInt(document.getElementById("viz-target-input")?.value || "39");
      const nums = raw.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      if (nums.length >= 2 && window.visualizer) {
        window.visualizer.setCustomData(nums, targetVal);
        showToast("Custom array applied!");
      } else {
        showToast("Please enter at least 2 valid numbers.");
      }
    });
  }
}

// -----------------------------------------------------------------------------
// 14 ALGORITHMIC PATTERNS RENDERING
// -----------------------------------------------------------------------------
function renderPatterns() {
  const container = document.getElementById("patterns-grid");
  const patternsData = getPatternsData();
  if (!container || !patternsData || patternsData.length === 0) return;

  let html = "";
  patternsData.forEach(pat => {
    html += `
      <div class="pro-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">${pat.id}</span>
            <span class="text-[11px] font-mono text-slate-400">${pat.timeSpace}</span>
          </div>
          <h3 class="text-base font-bold text-white mb-1.5">${pat.name}</h3>
          <p class="text-xs text-slate-300 leading-relaxed mb-3">${pat.whenToUse}</p>
          
          <div class="bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-3">
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">Sample Problems:</span>
            <div class="flex flex-wrap gap-1">
              ${pat.sampleProblems.map(sp => `<span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">${sp}</span>`).join('')}
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span class="font-mono text-[11px]">C++ Pattern Template:</span>
            <button onclick="copySnippetText(this, \`${escapeForAttr(pat.cppCode)}\`)" class="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] transition">
              <i data-lucide="copy" class="w-3 h-3"></i> Copy
            </button>
          </div>
          <pre class="code-block font-mono text-xs max-h-48 overflow-y-auto"><code>${escapeHtml(pat.cppCode)}</code></pre>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

// -----------------------------------------------------------------------------
// GITHUB SYNC CONTROLS
// -----------------------------------------------------------------------------
function setupGitHubSyncControls() {
  const modal = document.getElementById("modal-gh-settings");
  const btnOpen = document.getElementById("btn-open-gh-modal");
  const btnClose = document.getElementById("btn-close-gh-modal");
  const btnSave = document.getElementById("btn-save-gh-settings");
  const patInput = document.getElementById("gh-pat-input");
  const repoInput = document.getElementById("gh-repo-input");
  const btnPush = document.getElementById("btn-push-to-github");

  // Load saved settings
  if (patInput) patInput.value = localStorage.getItem("cp_github_pat") || "";
  if (repoInput) repoInput.value = localStorage.getItem("cp_github_repo") || "cp-mastery-hub";

  if (btnOpen && modal) {
    btnOpen.addEventListener("click", () => modal.classList.remove("hidden"));
  }

  if (btnClose && modal) {
    btnClose.addEventListener("click", () => modal.classList.add("hidden"));
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  if (btnSave && modal && patInput && repoInput) {
    btnSave.addEventListener("click", () => {
      const pat = patInput.value.trim();
      const repo = repoInput.value.trim() || "cp-mastery-hub";
      localStorage.setItem("cp_github_pat", pat);
      localStorage.setItem("cp_github_repo", repo);
      if (window.githubSync) {
        window.githubSync.setCredentials(pat, repo);
      }
      modal.classList.add("hidden");
      showToast("GitHub settings saved! 🚀");
    });
  }

  // Handle 1-Click Push
  if (btnPush) {
    btnPush.addEventListener("click", async () => {
      const codeEditor = document.getElementById("code-editor-area");
      const filenameInput = document.getElementById("push-filename-input");
      const commitInput = document.getElementById("push-commit-input");

      if (!codeEditor || !window.githubSync) return;

      const code = codeEditor.value;
      const path = filenameInput?.value.trim() || "solution.cpp";
      const message = commitInput?.value.trim() || "feat: add solution via CP Mastery Hub";

      btnPush.disabled = true;
      btnPush.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Pushing...`;
      if (window.lucide) window.lucide.createIcons();

      const result = await window.githubSync.pushFile(path, code, message);

      btnPush.disabled = false;
      btnPush.innerHTML = `<i data-lucide="upload-cloud" class="w-4 h-4"></i> Push to GitHub`;
      if (window.lucide) window.lucide.createIcons();

      if (result.success) {
        showToast("Committed & Pushed to GitHub successfully! 🚀");
      } else {
        if (result.error && result.error.includes("Authentication token")) {
          if (modal) modal.classList.remove("hidden");
        }
        showToast(`Push failed: ${result.error}`);
      }
    });
  }
}

// -----------------------------------------------------------------------------
// SOCRATIC AI COACH
// -----------------------------------------------------------------------------
function setupSocraticCoach() {
  const btnRequest = document.getElementById("btn-request-hint");
  const titleInput = document.getElementById("coach-problem-title");
  const stuckInput = document.getElementById("coach-stuck-desc");
  const tiersContainer = document.getElementById("coach-hint-tiers");

  if (!btnRequest || !tiersContainer) return;

  btnRequest.addEventListener("click", () => {
    const title = titleInput?.value.trim() || "Current Problem";
    const stuck = stuckInput?.value.trim() || "";

    tiersContainer.innerHTML = `
      <div class="space-y-3">
        <div class="pro-card p-4 rounded-xl border-indigo-500/30">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-indigo-400 uppercase tracking-wide">Clue 1: Intuition & Pattern Recognition</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">Step 1</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            সমস্যাটির কনস্ট্রেইন্ট খেয়াল করুন। উপাদানগুলো কি সাজানো বা মনোটোনিক? লক্ষ্য করুন সার্চ স্পেসকে দুই ভাগে ভাগ করা সম্ভব কি না।
          </p>
        </div>

        <div class="pro-card p-4 rounded-xl border-amber-500/30">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-amber-400 uppercase tracking-wide">Clue 2: Data Structure & Invariant</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">Step 2</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            যদি সাব-অ্যারে বা উইন্ডো হ্যান্ডেল করতে হয়, তবে HashMap বা Monotonic Deque ব্যবহার করে ও(N) এ রিডিউস করা সম্ভব।
          </p>
        </div>

        <div class="pro-card p-4 rounded-xl border-emerald-500/30">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-emerald-400 uppercase tracking-wide">Clue 3: Edge Cases & Implementation Outline</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Step 3</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">
            এজ কেস: N = 1, অ্যারে খালি, অথবা সব মান নেগেটিভ। ইনটিজার ওভারফ্লো এড়াতে 'long long' ব্যবহার করুন।
          </p>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    showToast("Progressive hints revealed!");
  });
}

// -----------------------------------------------------------------------------
// MODALS (NOTES & QUICK HINT)
// -----------------------------------------------------------------------------
function setupModals() {
  // Notes Modal
  const notesModal = document.getElementById("modal-problem-notes");
  const btnCloseNotes = document.getElementById("btn-close-notes-modal");
  const btnSaveNote = document.getElementById("btn-save-problem-note");
  const textarea = document.getElementById("problem-note-textarea");

  if (btnCloseNotes && notesModal) {
    btnCloseNotes.addEventListener("click", () => notesModal.classList.add("hidden"));
  }
  if (notesModal) {
    notesModal.addEventListener("click", (e) => {
      if (e.target === notesModal) notesModal.classList.add("hidden");
    });
  }

  if (btnSaveNote && textarea && notesModal) {
    btnSaveNote.addEventListener("click", () => {
      if (!currentNoteProblemId) return;
      const notesMap = JSON.parse(localStorage.getItem("cp_problem_notes") || "{}");
      const text = textarea.value.trim();
      if (text) {
        notesMap[currentNoteProblemId] = text;
      } else {
        delete notesMap[currentNoteProblemId];
      }
      localStorage.setItem("cp_problem_notes", JSON.stringify(notesMap));
      notesModal.classList.add("hidden");
      renderRoadmapCurriculum();
      showToast("Problem note saved! 📝");
    });
  }

  // Quick Hint Modal
  const hintModal = document.getElementById("modal-quick-hint");
  const btnCloseHint = document.getElementById("btn-close-quick-hint-modal");
  if (btnCloseHint && hintModal) {
    btnCloseHint.addEventListener("click", () => hintModal.classList.add("hidden"));
  }
  if (hintModal) {
    hintModal.addEventListener("click", (e) => {
      if (e.target === hintModal) hintModal.classList.add("hidden");
    });
  }
}

window.openProblemNotesModal = function(probId) {
  currentNoteProblemId = probId;
  const res = findProblemById(probId);
  const probTitle = res ? res.problem.title : probId;

  const modal = document.getElementById("modal-problem-notes");
  const titleEl = document.getElementById("notes-modal-title");
  const textarea = document.getElementById("problem-note-textarea");

  if (titleEl) titleEl.innerHTML = `<i data-lucide="edit-3" class="w-4 h-4 text-indigo-400"></i> Notes: ${escapeHtml(probTitle)}`;
  const notesMap = JSON.parse(localStorage.getItem("cp_problem_notes") || "{}");
  if (textarea) textarea.value = notesMap[probId] || "";

  if (modal) modal.classList.remove("hidden");
  if (window.lucide) window.lucide.createIcons();
};

window.openQuickHintModal = function(probId) {
  const res = findProblemById(probId);
  if (!res) return;
  const p = res.problem;

  const modal = document.getElementById("modal-quick-hint");
  const titleEl = document.getElementById("quick-hint-title");
  const bodyEl = document.getElementById("quick-hint-body");

  if (titleEl) titleEl.innerHTML = `<i data-lucide="lightbulb" class="w-4 h-4 text-amber-400"></i> Hint: ${escapeHtml(p.title)}`;
  if (bodyEl) bodyEl.textContent = p.hint;

  if (modal) modal.classList.remove("hidden");
  if (window.lucide) window.lucide.createIcons();
};

// -----------------------------------------------------------------------------
// UTILITIES
// -----------------------------------------------------------------------------
window.showToast = function(message) {
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0");
  }, 2800);
};

window.copySnippetText = function(btnEl, text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Snippet copied to clipboard! 📋");
    const orig = btnEl.innerHTML;
    btnEl.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> Copied!`;
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => {
      btnEl.innerHTML = orig;
      if (window.lucide) window.lucide.createIcons();
    }, 1800);
  });
};

function formatTheoryMarkdown(text) {
  if (!text) return "";
  let out = text
    .replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-white mt-2 mb-1">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/`([^`]+)`/gim, '<code class="bg-slate-800 text-indigo-300 px-1 py-0.5 rounded font-mono text-[11px]">$1</code>')
    .replace(/\n\n/gim, '</p><p class="mb-2 text-slate-300 text-xs leading-relaxed">')
    .replace(/^- (.*$)/gim, '<li class="text-xs text-slate-300 ml-4 list-disc">$1</li>');

  return `<p class="mb-2 text-slate-300 text-xs leading-relaxed">${out}</p>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeForAttr(str) {
  if (!str) return '';
  return str.replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '\\n');
}
