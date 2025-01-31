import { PROXY_URL, SOLVED_AC_URL } from "../../constants/url.js";
import { NotionPropertiesDTO } from "../dto/NotionPropertiesDTO.js";
import { NotionDatabaseManager } from "../notion/NotionDatabaseManager.js";

export class BojProblemFetcher {
  constructor() {
    this.notionDatabaseManager = new NotionDatabaseManager();
  }

  async fetchProblems(tag, startLevel, endLevel, number) {
    console.log("start");
    const response = await fetch(PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `${SOLVED_AC_URL}?query=tag:${tag}+tier:${startLevel}&sort=solved&direction=desc`,
        headers: {
          "x-solvedac-language": "ko",
        },
      }),
    });
    const data = await response.json();
    console.log(data.items.length);
    const notionProperties = data.items.map((item) =>
      NotionPropertiesDTO.of(item)
    );
    console.log(notionProperties);

    await this.notionDatabaseManager.setSchema();

    await notionProperties.forEach((properties) => {
      this.notionDatabaseManager.addProblem(properties);
    });
  }
}
