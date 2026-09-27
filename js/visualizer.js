/**
 * Interactive Algorithm & Code Visualizer Engine
 * Supports: Bubble Sort, Selection Sort, Insertion Sort, Binary Search, Two Pointers
 */

class AlgorithmVisualizer {
  constructor() {
    this.array = [45, 12, 85, 32, 89, 39, 69, 22, 50, 15];
    this.target = 39;
    this.history = [];
    this.currentStep = 0;
    this.isPlaying = false;
    this.speed = 500;
    this.timer = null;
    this.algorithm = "bubblesort";

    this.init();
  }

  init() {
    this.generateSteps();
    this.render();
  }

  setAlgorithm(algo) {
    this.pause();
    this.algorithm = algo;
    this.history = [];
    this.currentStep = 0;
    this.generateSteps();
    this.updateComplexity();
    this.render();
  }

  setSpeed(val) {
    // val is 100 to 1500; faster when val is low, or map appropriately
    this.speed = Math.max(100, 1600 - val);
  }

  setCustomData(newArr, targetVal) {
    this.pause();
    if (newArr && newArr.length > 0) {
      this.array = [...newArr];
    }
    if (targetVal !== undefined && !isNaN(targetVal)) {
      this.target = targetVal;
    }
    this.history = [];
    this.currentStep = 0;
    this.generateSteps();
    this.render();
  }

  reset() {
    this.pause();
    this.array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 80) + 15);
    const inputEl = document.getElementById("viz-array-input");
    if (inputEl) inputEl.value = this.array.join(", ");
    this.history = [];
    this.currentStep = 0;
    this.generateSteps();
    this.render();
  }

  updateComplexity() {
    const worstEl = document.getElementById("viz-time-worst");
    const avgEl = document.getElementById("viz-time-avg");
    const spaceEl = document.getElementById("viz-space");

    const complexities = {
      bubblesort: { worst: "O(N²)", avg: "O(N²)", space: "O(1)" },
      selectionsort: { worst: "O(N²)", avg: "O(N²)", space: "O(1)" },
      insertionsort: { worst: "O(N²)", avg: "O(N²)", space: "O(1)" },
      binarysearch: { worst: "O(log N)", avg: "O(log N)", space: "O(1)" },
      twopointers: { worst: "O(N)", avg: "O(N)", space: "O(1)" }
    };

    const c = complexities[this.algorithm] || { worst: "O(N)", avg: "O(N)", space: "O(1)" };
    if (worstEl) worstEl.textContent = c.worst;
    if (avgEl) avgEl.textContent = c.avg;
    if (spaceEl) spaceEl.textContent = c.space;
  }

  generateSteps() {
    this.history = [];
    const arr = [...this.array];

    if (this.algorithm === "bubblesort") {
      this.generateBubbleSortSteps(arr);
    } else if (this.algorithm === "selectionsort") {
      this.generateSelectionSortSteps(arr);
    } else if (this.algorithm === "insertionsort") {
      this.generateInsertionSortSteps(arr);
    } else if (this.algorithm === "binarysearch") {
      const sorted = [...arr].sort((a, b) => a - b);
      this.array = sorted;
      const inputEl = document.getElementById("viz-array-input");
      if (inputEl) inputEl.value = sorted.join(", ");
      this.generateBinarySearchSteps(sorted, this.target);
    } else if (this.algorithm === "twopointers") {
      const sorted = [...arr].sort((a, b) => a - b);
      this.array = sorted;
      const inputEl = document.getElementById("viz-array-input");
      if (inputEl) inputEl.value = sorted.join(", ");
      const targetSum = this.target || (sorted[1] + sorted[sorted.length - 2]);
      this.generateTwoPointersSteps(sorted, targetSum);
    }
  }

  generateBubbleSortSteps(arr) {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0;
    let swaps = 0;

    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: [],
      comparisons,
      swaps,
      msg: "Starting Bubble Sort on array. Elements will bubble up to their correct positions."
    });

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        this.history.push({
          array: [...a],
          active: [],
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          comparisons,
          swaps,
          msg: `Comparing arr[${j}] (${a[j]}) and arr[${j + 1}] (${a[j + 1]}).`
        });

        if (a[j] > a[j + 1]) {
          swaps++;
          const tmp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = tmp;
          swapped = true;

          this.history.push({
            array: [...a],
            active: [j, j + 1],
            comparing: [],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            comparisons,
            swaps,
            msg: `Swapped ${a[j + 1]} and ${a[j]} since ${a[j + 1]} > ${a[j]}.`
          });
        }
      }
      if (!swapped) break;
    }

    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      comparisons,
      swaps,
      msg: "Bubble Sort completed! Array is now completely sorted in ascending order."
    });
  }

  generateSelectionSortSteps(arr) {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0;
    let swaps = 0;

    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: [],
      comparisons,
      swaps,
      msg: "Starting Selection Sort. Finding minimum element in unsorted portion."
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        this.history.push({
          array: [...a],
          active: [minIdx],
          comparing: [j],
          sorted: Array.from({ length: i }, (_, k) => k),
          comparisons,
          swaps,
          msg: `Comparing current minimum arr[${minIdx}] (${a[minIdx]}) with arr[${j}] (${a[j]}).`
        });
        if (a[j] < a[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        swaps++;
        const tmp = a[i];
        a[i] = a[minIdx];
        a[minIdx] = tmp;
        this.history.push({
          array: [...a],
          active: [i, minIdx],
          comparing: [],
          sorted: Array.from({ length: i + 1 }, (_, k) => k),
          comparisons,
          swaps,
          msg: `Swapped new minimum ${a[i]} into sorted position index ${i}.`
        });
      }
    }

    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      comparisons,
      swaps,
      msg: "Selection Sort complete! All elements placed into optimal sorted positions."
    });
  }

  generateInsertionSortSteps(arr) {
    const a = [...arr];
    const n = a.length;
    let comparisons = 0;
    let swaps = 0;

    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: [0],
      comparisons,
      swaps,
      msg: "Starting Insertion Sort. Leftmost element arr[0] is trivially sorted."
    });

    for (let i = 1; i < n; i++) {
      let key = a[i];
      let j = i - 1;

      this.history.push({
        array: [...a],
        active: [i],
        comparing: [],
        sorted: Array.from({ length: i }, (_, k) => k),
        comparisons,
        swaps,
        msg: `Inserting key arr[${i}] (${key}) into left sorted subarray.`
      });

      while (j >= 0 && a[j] > key) {
        comparisons++;
        swaps++;
        a[j + 1] = a[j];
        this.history.push({
          array: [...a],
          active: [j + 1],
          comparing: [j],
          sorted: Array.from({ length: i }, (_, k) => k),
          comparisons,
          swaps,
          msg: `Shifted arr[${j}] (${a[j]}) rightwards to make space for ${key}.`
        });
        j--;
      }
      a[j + 1] = key;
    }

    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      comparisons,
      swaps,
      msg: "Insertion Sort complete! Array is sorted."
    });
  }

  generateBinarySearchSteps(sortedArr, target) {
    let l = 0, r = sortedArr.length - 1;
    let comparisons = 0;

    this.history.push({
      array: [...sortedArr],
      low: l,
      high: r,
      mid: -1,
      target,
      comparisons: 0,
      swaps: 0,
      msg: `Starting Binary Search for Target = ${target}. Low = ${l}, High = ${r}.`
    });

    while (l <= r) {
      comparisons++;
      let mid = Math.floor((l + r) / 2);
      this.history.push({
        array: [...sortedArr],
        low: l,
        high: r,
        mid: mid,
        target,
        comparisons,
        swaps: 0,
        msg: `Computed mid = ${mid} (value = ${sortedArr[mid]}). Target is ${target}.`
      });

      if (sortedArr[mid] === target) {
        this.history.push({
          array: [...sortedArr],
          low: l,
          high: r,
          mid: mid,
          found: true,
          target,
          comparisons,
          swaps: 0,
          msg: `Target ${target} found successfully at index ${mid}! O(log N) search complete.`
        });
        return;
      } else if (sortedArr[mid] < target) {
        this.history.push({
          array: [...sortedArr],
          low: l,
          high: r,
          mid: mid,
          target,
          comparisons,
          swaps: 0,
          msg: `${sortedArr[mid]} < ${target}. Discarding left half; updating Low = ${mid + 1}.`
        });
        l = mid + 1;
      } else {
        this.history.push({
          array: [...sortedArr],
          low: l,
          high: r,
          mid: mid,
          target,
          comparisons,
          swaps: 0,
          msg: `${sortedArr[mid]} > ${target}. Discarding right half; updating High = ${mid - 1}.`
        });
        r = mid - 1;
      }
    }

    this.history.push({
      array: [...sortedArr],
      low: l,
      high: r,
      mid: -1,
      target,
      comparisons,
      swaps: 0,
      msg: `Target ${target} was not found in the array.`
    });
  }

  generateTwoPointersSteps(sortedArr, target) {
    let l = 0, r = sortedArr.length - 1;
    let comparisons = 0;

    this.history.push({
      array: [...sortedArr],
      ptrL: l,
      ptrR: r,
      currentSum: sortedArr[l] + sortedArr[r],
      target,
      comparisons: 0,
      swaps: 0,
      msg: `Starting Two Pointers opposite ends traversal. Target sum = ${target}.`
    });

    while (l < r) {
      comparisons++;
      const sum = sortedArr[l] + sortedArr[r];
      this.history.push({
        array: [...sortedArr],
        ptrL: l,
        ptrR: r,
        currentSum: sum,
        target,
        comparisons,
        swaps: 0,
        msg: `Left ptr @ ${l} (${sortedArr[l]}), Right ptr @ ${r} (${sortedArr[r]}). Current Sum = ${sum} vs Target = ${target}.`
      });

      if (sum === target) {
        this.history.push({
          array: [...sortedArr],
          ptrL: l,
          ptrR: r,
          found: true,
          currentSum: sum,
          target,
          comparisons,
          swaps: 0,
          msg: `Pair found! arr[${l}] (${sortedArr[l]}) + arr[${r}] (${sortedArr[r]}) == ${target}!`
        });
        return;
      } else if (sum < target) {
        this.history.push({
          array: [...sortedArr],
          ptrL: l,
          ptrR: r,
          currentSum: sum,
          target,
          comparisons,
          swaps: 0,
          msg: `Sum (${sum}) < Target (${target}). Incrementing left pointer (L++).`
        });
        l++;
      } else {
        this.history.push({
          array: [...sortedArr],
          ptrL: l,
          ptrR: r,
          currentSum: sum,
          target,
          comparisons,
          swaps: 0,
          msg: `Sum (${sum}) > Target (${target}). Decrementing right pointer (R--).`
        });
        r--;
      }
    }
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    const btn = document.getElementById("btn-play-pause");
    if (btn) {
      btn.innerHTML = `<i data-lucide="pause" class="w-4 h-4"></i> Pause`;
      if (window.lucide) window.lucide.createIcons();
    }
    this.runNextStep();
  }

  pause() {
    this.isPlaying = false;
    clearTimeout(this.timer);
    const btn = document.getElementById("btn-play-pause");
    if (btn) {
      btn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i> Run`;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  togglePlay() {
    if (this.isPlaying) this.pause();
    else this.play();
  }

  runNextStep() {
    if (!this.isPlaying) return;
    if (this.currentStep < this.history.length - 1) {
      this.currentStep++;
      this.render();
      this.timer = setTimeout(() => this.runNextStep(), this.speed);
    } else {
      this.pause();
    }
  }

  stepForward() {
    this.pause();
    if (this.currentStep < this.history.length - 1) {
      this.currentStep++;
      this.render();
    }
  }

  stepBackward() {
    this.pause();
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  render() {
    const barsContainer = document.getElementById("viz-bars-container");
    const pointersContainer = document.getElementById("viz-pointers-container");
    const explanationEl = document.getElementById("viz-step-explanation");
    const stepCounter = document.getElementById("viz-step-counter");
    const compareCounter = document.getElementById("viz-compare-counter");
    const swapCounter = document.getElementById("viz-swap-counter");
    const stateBadge = document.getElementById("viz-state-badge");

    if (!barsContainer || !this.history[this.currentStep]) return;
    const state = this.history[this.currentStep];

    if (explanationEl) explanationEl.textContent = state.msg || "Executing algorithm...";
    if (stepCounter) stepCounter.textContent = `${this.currentStep + 1} / ${this.history.length}`;
    if (compareCounter) compareCounter.textContent = state.comparisons || 0;
    if (swapCounter) swapCounter.textContent = state.swaps || 0;
    if (stateBadge) {
      if (state.found || (state.sorted && state.sorted.length === state.array.length)) {
        stateBadge.textContent = "Complete 🎉";
        stateBadge.className = "text-[10px] px-2 py-0.5 rounded font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      } else if (this.isPlaying) {
        stateBadge.textContent = "Running ⚡";
        stateBadge.className = "text-[10px] px-2 py-0.5 rounded font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20";
      } else {
        stateBadge.textContent = "Paused";
        stateBadge.className = "text-[10px] px-2 py-0.5 rounded font-mono bg-slate-800 text-slate-300";
      }
    }

    const maxVal = Math.max(...state.array, 100);

    // Render Array Bars
    barsContainer.innerHTML = state.array.map((val, idx) => {
      let barClass = "bg-indigo-600/80 text-indigo-100";
      if (state.found && (state.mid === idx || state.ptrL === idx || state.ptrR === idx)) {
        barClass = "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/40";
      } else if (state.active && state.active.includes(idx)) {
        barClass = "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/40";
      } else if (state.comparing && state.comparing.includes(idx)) {
        barClass = "bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/40";
      } else if (state.sorted && state.sorted.includes(idx)) {
        barClass = "bg-emerald-600/80 text-white";
      }

      const heightPercent = Math.max(16, Math.min(100, (val / maxVal) * 100));

      return `
        <div class="flex-1 flex flex-col items-center justify-end h-full max-w-[48px]">
          <div class="w-full rounded-t-lg flex items-center justify-center font-mono text-xs transition-all duration-200 ${barClass}" style="height: ${heightPercent}%;">
            ${val}
          </div>
          <span class="text-[10px] text-slate-500 font-mono mt-1">${idx}</span>
        </div>
      `;
    }).join('');

    // Render Pointers Row
    if (pointersContainer) {
      pointersContainer.innerHTML = state.array.map((_, idx) => {
        let label = "";
        if (state.low === idx) label = '<span class="text-blue-400 font-bold">L</span>';
        if (state.mid === idx) label = '<span class="text-indigo-400 font-bold">MID</span>';
        if (state.high === idx) label = '<span class="text-rose-400 font-bold">H</span>';
        if (state.ptrL === idx) label = '<span class="text-indigo-400 font-bold">LEFT</span>';
        if (state.ptrR === idx) label = '<span class="text-rose-400 font-bold">RIGHT</span>';

        return `<div class="flex-1 flex items-center justify-center max-w-[48px] text-[10px]">${label}</div>`;
      }).join('');
    }
  }
}

// Global visualizer instance
window.AlgorithmVisualizer = AlgorithmVisualizer;
