import {
  NOTION_DARABASE_URL,
  NOTION_PAGE_URL,
  PROXY_URL,
} from "../../constants/url.js";

export class NotionDatabaseManager {
  constructor() {}

  async addProblem(problem) {
    await fetch(PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: NOTION_PAGE_URL,
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("notionApiToken")}`,
          "Notion-Version": "2022-06-28",
        },
        body: {
          parent: { database_id: sessionStorage.getItem("notionDatabaseId") },
          properties: problem.toJson(),
        },
      }),
    });
  }

  async setSchema() {
    await fetch(PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `${NOTION_DARABASE_URL}${sessionStorage.getItem(
          "notionDatabaseId"
        )}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("notionApiToken")}`,
          "Notion-Version": "2022-06-28",
        },
        body: {
          properties: {
            알고리즘: {
              multi_select: {},
            },
            문제: {
              url: {},
            },
            난이도: {
              select: {},
            },
            "풀이 시간 (분)": {
              number: {},
            },
            "푼 날짜": {
              date: {},
            },
            비고: {
              rich_text: {},
            },
          },
        },
      }),
    });
  }
}
