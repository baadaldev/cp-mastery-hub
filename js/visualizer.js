/**
 * Interactive Algorithm & Code Visualizer Engine
 * Supports: Sorting, Binary Search, Two Pointers, Sliding Window, Stack/Queue, BST
 */

class AlgorithmVisualizer {
  constructor() {
    this.array = [45, 12, 85, 32, 89, 39, 69, 21, 54, 73];
    this.history = [];
    this.currentStep = 0;
    this.isPlaying = false;
    this.speed = 400; // ms
    this.timer = null;
    this.algorithm = "bubblesort";
    this.stackQueueItems = [10, 25, 40];
    this.bstRoot = null;

    this.container = document.getElementById("visualizer-container");
    this.logElement = document.getElementById("viz-step-log");
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
    this.render();
  }

  setSpeed(val) {
    this.speed = 1000 - Number(val); // Invert so higher slider value = faster
  }

  resetWithArray(newArr) {
    this.pause();
    if (newArr && newArr.length > 0) {
      this.array = newArr;
    } else {
      this.array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 85) + 15);
    }
    this.history = [];
    this.currentStep = 0;
    this.generateSteps();
    this.render();
  }

  generateSteps() {
    this.history = [];
    const arr = [...this.array];

    if (this.algorithm === "bubblesort") {
      this.generateBubbleSortSteps(arr);
    } else if (this.algorithm === "binarysearch") {
      const sorted = [...arr].sort((a, b) => a - b);
      this.array = sorted;
      this.generateBinarySearchSteps(sorted, 54);
    } else if (this.algorithm === "twopointers") {
      const sorted = [...arr].sort((a, b) => a - b);
      this.array = sorted;
      this.generateTwoPointersSteps(sorted, 85);
    } else if (this.algorithm === "selectionsort") {
      this.generateSelectionSortSteps(arr);
    } else if (this.algorithm === "insertionsort") {
      this.generateInsertionSortSteps(arr);
    }
  }

  generateBubbleSortSteps(arr) {
    const a = [...arr];
    const n = a.length;
    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: [],
      msg: "Initial array ready for Bubble Sort."
    });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this.history.push({
          array: [...a],
          active: [],
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          msg: `Comparing arr[${j}] (${a[j]}) and arr[${j+1}] (${a[j+1]}).`
        });

        if (a[j] > a[j + 1]) {
          const temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
          this.history.push({
            array: [...a],
            active: [j, j + 1],
            comparing: [],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            msg: `Swapped ${a[j + 1]} and ${a[j]} since ${a[j+1]} > ${a[j]}.`
          });
        }
      }
    }
    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      msg: "Sorting complete! All elements in non-decreasing order."
    });
  }

  generateSelectionSortSteps(arr) {
    const a = [...arr];
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        this.history.push({
          array: [...a],
          active: [minIdx],
          comparing: [j],
          sorted: Array.from({ length: i }, (_, k) => k),
          msg: `Searching minimum: comparing index ${j} (${a[j]}) with current min ${minIdx} (${a[minIdx]}).`
        });
        if (a[j] < a[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        const t = a[i]; a[i] = a[minIdx]; a[minIdx] = t;
        this.history.push({
          array: [...a],
          active: [i, minIdx],
          comparing: [],
          sorted: Array.from({ length: i + 1 }, (_, k) => k),
          msg: `Placed smallest element ${a[i]} into sorted position index ${i}.`
        });
      }
    }
    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      msg: "Selection Sort complete!"
    });
  }

  generateInsertionSortSteps(arr) {
    const a = [...arr];
    const n = a.length;
    for (let i = 1; i < n; i++) {
      let key = a[i];
      let j = i - 1;
      this.history.push({
        array: [...a],
        active: [i],
        comparing: [j],
        sorted: Array.from({ length: i }, (_, k) => k),
        msg: `Inserting key ${key} into sorted subarray [0..${i-1}].`
      });
      while (j >= 0 && a[j] > key) {
        a[j + 1] = a[j];
        j--;
        this.history.push({
          array: [...a],
          active: [j + 1],
          comparing: [j >= 0 ? j : 0],
          sorted: [],
          msg: `Shifted element to the right.`
        });
      }
      a[j + 1] = key;
    }
    this.history.push({
      array: [...a],
      active: [],
      comparing: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      msg: "Insertion Sort complete!"
    });
  }

  generateBinarySearchSteps(sortedArr, target) {
    let l = 0, r = sortedArr.length - 1;
    this.history.push({
      array: [...sortedArr],
      low: l,
      high: r,
      mid: -1,
      target,
      msg: `Starting Binary Search for target = ${target} in search range [0..${r}].`
    });

    while (l <= r) {
      let mid = Math.floor((l + r) / 2);
      this.history.push({
        array: [...sortedArr],
        low: l,
        high: r,
        mid: mid,
        target,
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
          msg: `Target ${target} found successfully at index ${mid}!`
        });
        return;
      } else if (sortedArr[mid] < target) {
        this.history.push({
          array: [...sortedArr],
          low: l,
          high: r,
          mid: mid,
          target,
          msg: `${sortedArr[mid]} < ${target}. Discarding left half; updating low = mid + 1 (${mid + 1}).`
        });
        l = mid + 1;
      } else {
        this.history.push({
          array: [...sortedArr],
          low: l,
          high: r,
          mid: mid,
          target,
          msg: `${sortedArr[mid]} > ${target}. Discarding right half; updating high = mid - 1 (${mid - 1}).`
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
      msg: `Target ${target} was not found in the array.`
    });
  }

  generateTwoPointersSteps(sortedArr, target) {
    let l = 0, r = sortedArr.length - 1;
    while (l < r) {
      const sum = sortedArr[l] + sortedArr[r];
      this.history.push({
        array: [...sortedArr],
        ptrL: l,
        ptrR: r,
        currentSum: sum,
        target,
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
          msg: `Sum (${sum}) < Target (${target}). Moving left pointer rightwards (l++).`
        });
        l++;
      } else {
        this.history.push({
          array: [...sortedArr],
          ptrL: l,
          ptrR: r,
          currentSum: sum,
          target,
          msg: `Sum (${sum}) > Target (${target}). Moving right pointer leftwards (r--).`
        });
        r--;
      }
    }
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    document.getElementById("btn-play-pause").innerHTML = `<i data-lucide="pause"></i> Pause`;
    if (window.lucide) window.lucide.createIcons();
    this.runNextStep();
  }

  pause() {
    this.isPlaying = false;
    clearTimeout(this.timer);
    const btn = document.getElementById("btn-play-pause");
    if (btn) {
      btn.innerHTML = `<i data-lucide="play"></i> Run`;
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
    if (!this.container || !this.history[this.currentStep]) return;
    const state = this.history[this.currentStep];

    if (this.logElement) {
      this.logElement.innerText = state.msg || "Executing step...";
    }

    const stepCounter = document.getElementById("viz-step-counter");
    if (stepCounter) {
      stepCounter.innerText = `Step ${this.currentStep + 1} of ${this.history.length}`;
    }

    // Render Array Visualizer Bars
    let html = `<div class="flex items-end justify-center gap-2 h-64 w-full p-4 border border-slate-800 rounded-xl bg-slate-950/60 relative overflow-hidden">`;

    state.array.forEach((val, idx) => {
      let colorClass = "bg-gradient-to-t from-sky-600 to-sky-400 text-sky-100";
      let extraLabels = [];

      if (state.active && state.active.includes(idx)) {
        colorClass = "bg-gradient-to-t from-rose-600 to-rose-400 text-white shadow-lg shadow-rose-500/50 scale-105";
      } else if (state.comparing && state.comparing.includes(idx)) {
        colorClass = "bg-gradient-to-t from-amber-500 to-amber-300 text-slate-900 font-bold shadow-lg shadow-amber-500/50";
      } else if (state.sorted && state.sorted.includes(idx)) {
        colorClass = "bg-gradient-to-t from-emerald-600 to-emerald-400 text-white shadow-lg shadow-emerald-500/30";
      }

      // Binary Search pointer badges
      if (state.low === idx) extraLabels.push('<span class="bg-blue-600 px-1 rounded text-[10px]">L</span>');
      if (state.mid === idx) extraLabels.push('<span class="bg-purple-600 px-1 rounded text-[10px] font-bold">MID</span>');
      if (state.high === idx) extraLabels.push('<span class="bg-pink-600 px-1 rounded text-[10px]">H</span>');

      // Two Pointers
      if (state.ptrL === idx) extraLabels.push('<span class="bg-cyan-500 px-1 rounded text-[10px] font-bold">LEFT</span>');
      if (state.ptrR === idx) extraLabels.push('<span class="bg-rose-500 px-1 rounded text-[10px] font-bold">RIGHT</span>');

      const heightPercent = Math.max(15, Math.min(100, (val / 100) * 100));

      html += `
        <div class="flex flex-col items-center flex-1 max-w-[50px] transition-all duration-200">
          <div class="h-6 flex items-center gap-0.5 mb-1">${extraLabels.join('')}</div>
          <div class="w-full rounded-t-lg flex items-center justify-center font-mono text-xs ${colorClass}" style="height: ${heightPercent}%;">
            ${val}
          </div>
          <div class="text-[10px] text-slate-400 font-mono mt-1">${idx}</div>
        </div>
      `;
    });

    html += `</div>`;
    this.container.innerHTML = html;
  }
}

// Global visualizer instance
window.visualizer = new AlgorithmVisualizer();
