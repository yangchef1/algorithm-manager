import { Select } from "./components/Select.js";
import { RangeSlider } from "./components/RangeSlider.js";
import { InputWrapper } from "./utils/InputWrapper.js";
import { Button } from "./components/Button.js";
import { initializeAdditionalForm } from "./utils/formUtils.js";
import {
  ALGORITHM_OPTIONS,
  PROBLEM_COUNT_OPTIONS,
} from "./constants/config.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("algorithm-form");
  const main = document.querySelector("main");

  const algorithmSelect = new Select({
    id: "algorithm-select",
    options: ALGORITHM_OPTIONS,
    placeholder: "알고리즘을 선택해주세요.",
  });

  const rangeSlider = new RangeSlider({
    min: 1,
    max: 30,
  });

  const numberSelect = new Select({
    id: "number-select",
    options: PROBLEM_COUNT_OPTIONS,
    placeholder: "저장할 문제 수를 선택해주세요.",
  });

  const submitButton = new Button(
    "submit",
    "확인",
    "submit-btn",
    "submit-button"
  );
  const startButton = new Button(
    "button",
    "문제 추출 시작",
    "start-btn",
    "start-button"
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const notionToken = document
      .getElementById("notion-api-token-input")
      .value.trim();
    const databaseUrl = document
      .getElementById("notion-database-link-input")
      .value.trim();

    const databaseId = new URL(databaseUrl).pathname.split("/")[1];
    sessionStorage.setItem("notionApiToken", notionToken);
    sessionStorage.setItem("notionDatabaseId", databaseId);

    const additionalForm = document.createElement("form");
    additionalForm.id = "additional-form";

    additionalForm.appendChild(
      InputWrapper.wrap(algorithmSelect.render(), "알고리즘을 선택해주세요.")
    );
    additionalForm.appendChild(
      InputWrapper.wrap(
        rangeSlider.render(),
        "원하는 난이도를 드래그하여 선택해주세요."
      )
    );
    additionalForm.appendChild(
      InputWrapper.wrap(numberSelect.render(), "저장할 문제 수를 선택해주세요.")
    );

    additionalForm.appendChild(submitButton.render());
    additionalForm.appendChild(startButton.render());

    main.innerHTML = additionalForm.outerHTML;

    alert("입력값이 sessionStorage에 저장되었습니다.");

    initializeAdditionalForm();
  });
});
