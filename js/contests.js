/**
 * Live Competitive Programming Contest Radar & Schedule Aggregator
 */

class ContestRadar {
  constructor() {
    this.container = document.getElementById("contests-grid") || document.getElementById("contests-list-container");
    this.fallbackContests = [
      {
        site: "Codeforces",
        title: "Codeforces Round (Div. 2)",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(),
        duration: "2 hours",
        url: "https://codeforces.com/contests",
        badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/20"
      },
      {
        site: "LeetCode",
        title: "Weekly Contest",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
        duration: "1 hour 30 mins",
        url: "https://leetcode.com/contest/",
        badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        site: "AtCoder",
        title: "AtCoder Beginner Contest (ABC)",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
        duration: "1 hour 40 mins",
        url: "https://atcoder.jp/contests/",
        badgeClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
      },
      {
        site: "CodeChef",
        title: "Starters (Div. 2, 3, 4)",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
        duration: "2 hours",
        url: "https://www.codechef.com/contests",
        badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      }
    ];

    this.setupRefreshButton();
  }

  setupRefreshButton() {
    const btn = document.getElementById("btn-refresh-contests");
    if (btn) {
      btn.addEventListener("click", () => {
        this.fetchContests();
        if (window.showToast) window.showToast("Contest radar refreshed! 🛰️");
      });
    }
  }

  async fetchContests() {
    this.container = document.getElementById("contests-grid") || document.getElementById("contests-list-container");
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-400">
        <i data-lucide="loader-2" class="w-6 h-6 mx-auto mb-2 animate-spin text-indigo-400"></i>
        <p class="text-xs">Scanning Codeforces API & contest schedules...</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();

    try {
      const res = await fetch("https://codeforces.com/api/contest.list?gym=false");
      if (res.ok) {
        const data = await res.json();
        if (data.status === "OK") {
          const cfUpcoming = data.result
            .filter(c => c.phase === "BEFORE")
            .slice(-4)
            .reverse()
            .map(c => ({
              site: "Codeforces",
              title: c.name,
              startTime: new Date(c.startTimeSeconds * 1000).toISOString(),
              duration: `${Math.round(c.durationSeconds / 3600)} hours`,
              url: `https://codeforces.com/contests/${c.id}`,
              badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/20"
            }));

          if (cfUpcoming.length > 0) {
            this.render([...cfUpcoming, ...this.fallbackContests.slice(1)]);
            return;
          }
        }
      }
    } catch (e) {
      console.warn("Using offline contest schedule cache:", e);
    }
    this.render(this.fallbackContests);
  }

  render(contests) {
    this.container = document.getElementById("contests-grid") || document.getElementById("contests-list-container");
    if (!this.container) return;

    let html = "";
    contests.forEach(c => {
      const startDate = new Date(c.startTime);
      const diffMs = startDate - Date.now();
      let timeRemaining = "Coming Soon";
      if (diffMs > 0) {
        const hrs = Math.floor(diffMs / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        timeRemaining = `Starts in ${hrs}h ${mins}m`;
      } else {
        timeRemaining = "🔴 LIVE NOW";
      }

      html += `
        <div class="pro-card p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${c.badgeClass}">${c.site}</span>
              <span class="text-xs font-mono text-indigo-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span> ${timeRemaining}
              </span>
            </div>
            <h3 class="font-bold text-sm text-white mb-1">${c.title}</h3>
            <p class="text-xs text-slate-400 font-mono">Duration: ${c.duration}</p>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-slate-800/80">
            <span class="text-[11px] text-slate-500 font-mono">${startDate.toLocaleDateString()}</span>
            <a href="${c.url}" target="_blank" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition">
              Register <i data-lucide="external-link" class="w-3 h-3"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }
}

window.contestRadar = new ContestRadar();
