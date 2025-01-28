const algorithmMap = {
  5: "백트래킹",
  25: "DP",
  33: "그리디",
  97: "정렬",
  102: "구현",
  124: "수학",
  125: "완전 탐색",
  126: "BFS",
  127: "DFS",
  175: "자료구조",
};

export const ALGORITHM_OPTIONS = Object.entries(algorithmMap)
  .map(([value, label]) => ({ value: parseInt(value), label }))
  .sort((a, b) => a.id - b.id);

export const PROBLEM_COUNT_OPTIONS = Array.from({ length: 100 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

export const TIER_IMAGE_BASE_URL = "https://d2gd6pc034wcta.cloudfront.net/tier";
