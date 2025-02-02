export const algorithmMap = {
  backtracking: "백트래킹",
  dp: "DP",
  greedy: "그리디",
  sorting: "정렬",
  implementation: "구현",
  math: "수학",
  bruteforcing: "완전 탐색",
  bfs: "BFS",
  dfs: "DFS",
  data_structures: "자료구조",
};

const tiers = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"];
const romanNumerals = ["V", "IV", "III", "II", "I"];

export const TIER_COLOR = ["brown", "gray", "yellow", "purple", "blue", "red"];

export const LEVEL = Object.fromEntries(
  Array.from({ length: 30 }, (_, i) => {
    const level = i + 1;

    const tierIndex = Math.floor((level - 1) / 5);
    const romanIndex = (level - 1) % 5;

    return [level, tiers[tierIndex] + " " + romanNumerals[romanIndex]];
  })
);

export const ALGORITHM_OPTIONS = Object.entries(algorithmMap).map(
  ([value, label]) => ({ value, label })
);

export const PROBLEM_COUNT_OPTIONS = Array.from({ length: 20 }, (_, i) => ({
  value: String((i + 1) * 5),
  label: String((i + 1) * 5),
}));
