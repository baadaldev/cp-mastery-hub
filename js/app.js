/**
 * Master Application Controller for CP Mastery Hub
 */

const TEMPLATES = {
  cpp: `/**
 * Problem: Two Sum / CP Challenge
 * Author: baadaldev
 * Platform: Competitive Programming Mastery Hub
 */
#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

#define fastio ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
#define ll long long
#define all(x) (x).begin(), (x).end()

void solve() {
    int n, target;
    if (!(cin >> n >> target)) return;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];

    unordered_map<int, int> seen;
    for (int i = 0; i < n; ++i) {
        int comp = target - nums[i];
        if (seen.count(comp)) {
            cout << "Pair found: Indices " << seen[comp] << " and " << i << "\\n";
            return;
        }
        seen[nums[i]] = i;
    }
    cout << "No pair found\\n";
}

int main() {
    fastio;
    int t = 1;
    // cin >> t; // Uncomment if multiple testcases
    while (t--) {
        solve();
    }
    return 0;
}
`,
  c: `/**
 * Competitive Programming C Solution Template
 * Author: baadaldev
 */
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void solve() {
    int n;
    if (scanf("%d", &n) != 1) return;
    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    // Process algorithm
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
Competitive Programming Python Template
Author: baadaldev
"""
import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n, target = int(input_data[0]), int(input_data[1])
    nums = [int(x) for x in input_data[2:2+n]]
    
    seen = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            print(f"Indices: {seen[comp]}, {i}")
            return
        seen[num] = i
    print("No pair found")

if __name__ == "__main__":
    solve()
`
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Icons
  if (window.lucide) window.lucide.createIcons();

  // 2. Setup Navigation Tabs
  const navButtons = document.querySelectorAll(".nav-tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  function switchTab(tabId) {
    navButtons.forEach(btn => {
      const active = btn.dataset.tab === tabId;
      btn.classList.toggle("bg-sky-500/10", active);
      btn.classList.toggle("text-sky-400", active);
      btn.classList.toggle("border-sky-500/30", active);
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
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // 3. Render Roadmap Items
  renderRoadmap();

  // 4. Render Patterns
  renderPatterns();

  // 5. Code Editor setup
  const codeEditor = document.getElementById("code-editor-area");
  const langSelect = document.getElementById("editor-lang-select");

  if (codeEditor && langSelect) {
    codeEditor.value = TEMPLATES[langSelect.value] || TEMPLATES.cpp;
    langSelect.addEventListener("change", (e) => {
      codeEditor.value = TEMPLATES[e.target.value] || TEMPLATES.cpp;
    });
  }

  // 6. Visualizer Controls
  setupVisualizerControls();

  // 7. GitHub Sync Modal & Push Handler
  setupGitHubSyncControls();

  // 8. Socratic Hint Coach Setup
  setupSocraticCoach();

  // 9. Update stats counter
  updateSolvedStats();
});

function renderRoadmap() {
  const container = document.getElementById("roadmap-container");
  if (!container || !window.CP_ROADMAP_DATA) return;

  const solvedMap = JSON.parse(localStorage.getItem("cp_solved_problems") || "{}");
  let html = "";

  CP_ROADMAP_DATA.forEach(tier => {
    html += `
      <div class="glass-panel p-6 rounded-2xl border border-slate-800 mb-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs px-3 py-1 rounded-full font-bold bg-gradient-to-r ${tier.color} text-slate-950">${tier.badge}</span>
              <h3 class="text-lg font-bold text-white">${tier.tierName}</h3>
            </div>
            <p class="text-xs text-slate-400 mt-1">${tier.desc}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${tier.modules.map(mod => `
            <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              <h4 class="font-semibold text-slate-200 text-sm mb-2 flex items-center gap-2">
                <i data-lucide="check-circle" class="w-4 h-4 text-sky-400"></i> ${mod.name}
              </h4>
              <div class="flex flex-wrap gap-1 mb-3">
                ${mod.topics.map(t => `<span class="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">${t}</span>`).join('')}
              </div>
              <div class="space-y-1.5 pt-2 border-t border-slate-800">
                ${mod.problems.map(p => {
                  const isChecked = !!solvedMap[p.id];
                  return `
                    <label class="flex items-center justify-between p-1.5 rounded hover:bg-slate-800/50 cursor-pointer text-xs">
                      <div class="flex items-center gap-2">
                        <input type="checkbox" class="custom-check" data-prob-id="${p.id}" ${isChecked ? 'checked' : ''} onchange="toggleProblemSolved('${p.id}')">
                        <span class="${isChecked ? 'line-through text-slate-500' : 'text-slate-300'} font-medium">${p.title}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <span class="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">${p.platform} ${p.diff}</span>
                        <a href="${p.link}" target="_blank" class="text-sky-400 hover:text-sky-300" title="Open Problem">
                          <i data-lucide="external-link" class="w-3 h-3"></i>
                        </a>
                      </div>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

window.toggleProblemSolved = function(probId) {
  const solvedMap = JSON.parse(localStorage.getItem("cp_solved_problems") || "{}");
  if (solvedMap[probId]) {
    delete solvedMap[probId];
  } else {
    solvedMap[probId] = true;
  }
  localStorage.setItem("cp_solved_problems", JSON.stringify(solvedMap));
  renderRoadmap();
  updateSolvedStats();
  showToast(solvedMap[probId] ? "Problem marked as solved! 🌟" : "Problem unmarked.");
};

function updateSolvedStats() {
  const solvedMap = JSON.parse(localStorage.getItem("cp_solved_problems") || "{}");
  const solvedCount = Object.keys(solvedMap).length;
  const countEl = document.getElementById("stats-solved-count");
  if (countEl) countEl.innerText = solvedCount;

  const totalEl = document.getElementById("stats-total-count");
  if (totalEl) totalEl.innerText = "150";

  const percentEl = document.getElementById("stats-percent");
  if (percentEl) {
    const pct = Math.round((solvedCount / 150) * 100);
    percentEl.innerText = `${pct}%`;
  }
}

function renderPatterns() {
  const container = document.getElementById("patterns-container");
  if (!container || !window.CP_PATTERNS_DATA) return;

  let html = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;

  CP_PATTERNS_DATA.forEach(pat => {
    html += `
      <div class="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-bold text-slate-100 flex items-center gap-2">
              <i data-lucide="${pat.icon}" class="w-4 h-4 text-cyan-400"></i> ${pat.name}
            </h4>
            <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300">${pat.timeSpace}</span>
          </div>
          <p class="text-xs text-slate-400 mb-3"><strong class="text-slate-300">When to use:</strong> ${pat.whenToUse}</p>
          <div class="mb-3">
            <span class="text-[11px] text-slate-400 font-semibold">Typical Problems: </span>
            ${pat.sampleProblems.map(s => `<span class="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded mr-1">${s}</span>`).join('')}
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] uppercase font-mono text-slate-400">C++ Canonical Template</span>
            <button onclick="navigator.clipboard.writeText(\`${pat.cppCode.replace(/`/g, '\\`')}\`); showToast('Template copied to clipboard!');" class="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">
              <i data-lucide="copy" class="w-3 h-3"></i> Copy
            </button>
          </div>
          <pre class="bg-slate-950 p-3 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800/80 max-h-48"><code>${escapeHtml(pat.cppCode)}</code></pre>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

function setupVisualizerControls() {
  const algoSelect = document.getElementById("viz-algo-select");
  const playBtn = document.getElementById("btn-play-pause");
  const nextBtn = document.getElementById("btn-step-next");
  const prevBtn = document.getElementById("btn-step-prev");
  const resetBtn = document.getElementById("btn-viz-reset");
  const speedSlider = document.getElementById("viz-speed-slider");

  if (algoSelect) {
    algoSelect.addEventListener("change", (e) => {
      window.visualizer.setAlgorithm(e.target.value);
    });
  }

  if (playBtn) playBtn.addEventListener("click", () => window.visualizer.togglePlay());
  if (nextBtn) nextBtn.addEventListener("click", () => window.visualizer.stepForward());
  if (prevBtn) prevBtn.addEventListener("click", () => window.visualizer.stepBackward());
  if (resetBtn) resetBtn.addEventListener("click", () => window.visualizer.resetWithArray());
  if (speedSlider) {
    speedSlider.addEventListener("input", (e) => window.visualizer.setSpeed(e.target.value));
  }
}

function setupGitHubSyncControls() {
  const btnOpenModal = document.getElementById("btn-open-gh-modal");
  const btnCloseModal = document.getElementById("btn-close-gh-modal");
  const modal = document.getElementById("gh-settings-modal");
  const tokenInput = document.getElementById("gh-pat-input");
  const repoInput = document.getElementById("gh-repo-input");
  const btnSaveSettings = document.getElementById("btn-save-gh-settings");
  const btnPushCode = document.getElementById("btn-push-to-github");

  // Pre-fill token from localStorage
  const existingToken = window.githubSync.getToken();
  if (existingToken) {
    window.githubSync.setToken(existingToken);
    if (tokenInput) tokenInput.value = existingToken;
  }
  if (repoInput) repoInput.value = window.githubSync.getTargetRepo();

  if (btnOpenModal && modal) {
    btnOpenModal.addEventListener("click", () => modal.classList.remove("hidden"));
  }
  if (btnCloseModal && modal) {
    btnCloseModal.addEventListener("click", () => modal.classList.add("hidden"));
  }

  if (btnSaveSettings) {
    btnSaveSettings.addEventListener("click", () => {
      window.githubSync.setToken(tokenInput.value);
      window.githubSync.setTargetRepo(repoInput.value);
      modal.classList.add("hidden");
      showToast("GitHub Sync settings saved successfully! 🚀");
    });
  }

  if (btnPushCode) {
    btnPushCode.addEventListener("click", async () => {
      const code = document.getElementById("code-editor-area").value;
      const filenameInput = document.getElementById("push-filename-input");
      const filename = (filenameInput && filenameInput.value.trim()) || "solution.cpp";
      const commitMsgInput = document.getElementById("push-commit-input");
      const commitMsg = (commitMsgInput && commitMsgInput.value.trim()) || `feat: solution for ${filename}`;

      btnPushCode.disabled = true;
      btnPushCode.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> Pushing...`;
      if (window.lucide) window.lucide.createIcons();

      try {
        const res = await window.githubSync.pushCode({
          filename,
          content: code,
          commitMessage: commitMsg
        });
        showToast(`Pushed to GitHub! Click here to view.`, res.commitUrl);
      } catch (err) {
        alert("GitHub Push Error: " + err.message);
      } finally {
        btnPushCode.disabled = false;
        btnPushCode.innerHTML = `<i data-lucide="upload-cloud" class="w-4 h-4"></i> Push to GitHub`;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }
}

function setupSocraticCoach() {
  const hints = [
    {
      level: 1,
      title: "Hint 1: Core Observation & Intuition",
      desc: "Look closely at the constraints and properties of the problem. Is the input array sorted, or can sorting it simplify matching pairs? If you only need to verify existence, what data structure gives O(1) membership checking?"
    },
    {
      level: 2,
      title: "Hint 2: Recommended Data Structure",
      desc: "A Hash Map (unordered_map in C++) allows mapping each element's complement (target - x) directly to its index. This eliminates the inner loop, bringing complexity down from O(N²) to O(N)."
    },
    {
      level: 3,
      title: "Hint 3: Algorithm Invariant / Pseudocode",
      desc: "Loop through index i from 0 to N-1: calculate complement = target - arr[i]. If complement is in hash_map, you've found the pair! Otherwise, insert arr[i] with index i and proceed."
    },
    {
      level: 4,
      title: "Hint 4: Edge Cases & Gotchas",
      desc: "Beware of integer overflow with 32-bit vs 64-bit integers (use 'long long' in competitive programming). Also ensure an element is not matched with itself unless duplicates explicitly exist."
    }
  ];

  let currentHintIndex = 0;
  const hintBox = document.getElementById("hint-display-box");
  const nextHintBtn = document.getElementById("btn-next-hint");
  const resetHintBtn = document.getElementById("btn-reset-hint");

  function renderHint() {
    if (!hintBox) return;
    const h = hints[currentHintIndex];
    hintBox.innerHTML = `
      <div class="border-l-4 border-cyan-500 pl-4 py-1">
        <h4 class="font-bold text-cyan-400 text-sm mb-1">${h.title}</h4>
        <p class="text-xs text-slate-300 leading-relaxed">${h.desc}</p>
      </div>
    `;
    if (nextHintBtn) {
      nextHintBtn.innerText = currentHintIndex < hints.length - 1 ? `Unlock Hint ${currentHintIndex + 2}` : "All Hints Unlocked";
      nextHintBtn.disabled = currentHintIndex >= hints.length - 1;
    }
  }

  if (nextHintBtn) {
    nextHintBtn.addEventListener("click", () => {
      if (currentHintIndex < hints.length - 1) {
        currentHintIndex++;
        renderHint();
      }
    });
  }

  if (resetHintBtn) {
    resetHintBtn.addEventListener("click", () => {
      currentHintIndex = 0;
      renderHint();
    });
  }

  renderHint();
}

function showToast(message, actionUrl) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "fixed bottom-5 right-5 z-50 glass-panel border border-sky-500/40 text-sky-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 translate-y-20 opacity-0";
    document.body.appendChild(toast);
  }

  let actionHtml = "";
  if (actionUrl) {
    actionHtml = `<a href="${actionUrl}" target="_blank" class="underline font-bold text-white ml-2 flex items-center gap-1">Open ↗</a>`;
  }

  toast.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-sky-400"></i> <span class="text-xs">${message}</span> ${actionHtml}`;
  if (window.lucide) window.lucide.createIcons();

  toast.classList.remove("translate-y-20", "opacity-0");
  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
  }, 4000);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
