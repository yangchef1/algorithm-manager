import { algorithmMap, LEVEL, TIER_COLOR } from "../../constants/config.js";
import { BOJ_PROBLEM_URL } from "../../constants/url.js";

export class NotionPropertiesDTO {
  constructor(problemId, level, name, algorithmTags) {
    this.problemId = problemId;
    this.level = String(level);
    this.name = name;
    this.algorithmTags = algorithmTags
      .filter((tag) => tag in algorithmMap)
      .map((tag) => algorithmMap[tag])
      .map((tag) => ({ name: tag }));
  }

  static of(item) {
    if (!item) {
      return null;
    }

    const { problemId, level, titleKo, tags } = item;
    const tagKeys = tags.map((tag) => tag.key);
    return new NotionPropertiesDTO(problemId, level, titleKo, tagKeys);
  }

  toJson() {
    return {
      이름: {
        title: [{ text: { content: this.name } }],
      },
      알고리즘: {
        multi_select: this.algorithmTags,
      },
      문제: {
        url: `${BOJ_PROBLEM_URL}${this.problemId}`,
      },
      난이도: {
        select: {
          name: LEVEL[this.level],
          color: TIER_COLOR[Math.floor((this.level - 1) / 5)],
        },
      },
    };
  }
}
