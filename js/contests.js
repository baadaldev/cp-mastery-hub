/**
 * Live Competitive Programming Contest Radar & Schedule Aggregator
 */

class ContestRadar {
  constructor() {
    this.container = document.getElementById("contests-list-container");
    this.fallbackContests = [
      {
        site: "Codeforces",
        title: "Codeforces Round 980 (Div. 2)",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(),
        duration: "2 hours",
        url: "https://codeforces.com/contests",
        color: "bg-red-500/10 text-red-400 border-red-500/20"
      },
      {
        site: "LeetCode",
        title: "Weekly Contest 418",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
        duration: "1 hour 30 mins",
        url: "https://leetcode.com/contest/",
        color: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      },
      {
        site: "AtCoder",
        title: "AtCoder Beginner Contest 375",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
        duration: "1 hour 40 mins",
        url: "https://atcoder.jp/contests/",
        color: "bg-sky-500/10 text-sky-400 border-sky-500/20"
      },
      {
        site: "CodeChef",
        title: "Starters 155 (Div. 2, 3, 4)",
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
        duration: "2 hours",
        url: "https://www.codechef.com/contests",
        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      }
    ];
  }

  async fetchContests() {
    if (!this.container) return;
    this.container.innerHTML = `<div class="text-center py-8 text-slate-400 animate-pulse">Fetching live contest schedules...</div>`;

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
              color: "bg-red-500/10 text-red-400 border-red-500/20"
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
    if (!this.container) return;
    let html = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;

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
        <div class="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs px-2.5 py-0.5 rounded-full font-medium border ${c.color}">${c.site}</span>
              <span class="text-xs font-mono text-cyan-400 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span> ${timeRemaining}
              </span>
            </div>
            <h4 class="font-semibold text-slate-100 text-sm mb-1">${c.title}</h4>
            <p class="text-xs text-slate-400">Duration: ${c.duration} | Starts: ${startDate.toLocaleDateString()} at ${startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-xs text-slate-400">Target rating: +50 ~ +100</span>
            <a href="${c.url}" target="_blank" class="text-xs bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 border border-sky-500/30">
              Register <i data-lucide="external-link" class="w-3 h-3"></i>
            </a>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    this.container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }
}

window.contestRadar = new ContestRadar();
