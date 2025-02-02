import { PROXY_URL, SOLVED_AC_URL } from "../../constants/url.js";
import { NotionPropertiesDTO } from "../dto/NotionPropertiesDTO.js";
import { NotionDatabaseManager } from "../notion/NotionDatabaseManager.js";

export class BojProblemFetcher {
  constructor() {
    this.notionDatabaseManager = new NotionDatabaseManager();
  }

  async saveProblemsToNotion(tag, startLevel, endLevel, number) {
    const problemPromises = [];
    for (let level = startLevel; level <= endLevel; level++) {
      const problemPromise = await this.#fetchProblems(tag, level);
      problemPromises.push(problemPromise);
    }

    const results = await Promise.all(problemPromises);
    const allItems = results.flat();

    const filteredItems = this.#filterProblems(allItems, number);

    const notionProperties = filteredItems.map(NotionPropertiesDTO.of);

    await this.notionDatabaseManager.setSchema();

    for (const properties of notionProperties) {
      await this.notionDatabaseManager.addProblem(properties);
    }
  }

  #filterProblems(items, number) {
    return items
      .sort((a, b) => b.acceptedUserCount - a.acceptedUserCount)
      .slice(0, number);
  }

  async #fetchProblems(tag, level) {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `${SOLVED_AC_URL}?query=tag:${tag}+tier:${level}&sort=solved&direction=desc`,
        headers: {
          "x-solvedac-language": "ko",
        },
      }),
    });
    const data = await response.json();
    return data.items;
  }
}
