import { LoadingSpinner } from "../components/LoadingSpinner.js";
import { Modal } from "../components/Modal.js";
import { TIER_IMAGE_BASE_URL } from "../constants/url.js";
import { BojProblemFetcher } from "../core/crawler/BojProblemFetcher.js";

export function initializeAdditionalForm() {
  let rangeStart = 1;
  let rangeEnd = 30;

  const track = document.querySelector(".range-track");
  const fill = document.querySelector(".range-fill");
  const startHandle = document.getElementById("start-handle");
  const endHandle = document.getElementById("end-handle");
  const startTierImage = document.getElementById("start-tier-image");
  const endTierImage = document.getElementById("end-tier-image");

  function updateTierImages(start, end) {
    startTierImage.src = `${TIER_IMAGE_BASE_URL}${start}.svg`;
    endTierImage.src = `${TIER_IMAGE_BASE_URL}${end}.svg`;
  }

  function updateRange(handle, value) {
    const trackRect = track.getBoundingClientRect();
    const percent = (value - 1) / 29;
    const position = percent * trackRect.width;

    handle.style.left = `${position}px`;

    if (handle === startHandle) {
      rangeStart = value;
      fill.style.left = `${position}px`;
      updateTierImages(value, rangeEnd);
    } else {
      rangeEnd = value;
      fill.style.right = `${trackRect.width - position}px`;
      updateTierImages(rangeStart, value);
    }
  }

  [startHandle, endHandle].forEach((handle) => {
    let isDragging = false;

    handle.addEventListener("mousedown", () => {
      isDragging = true;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const trackRect = track.getBoundingClientRect();
      let position = (e.clientX - trackRect.left) / trackRect.width;
      position = Math.max(0, Math.min(1, position));

      const value = Math.round(position * 29 + 1);

      if (handle === startHandle && value < rangeEnd) {
        updateRange(handle, value);
      } else if (handle === endHandle && value > rangeStart) {
        updateRange(handle, value);
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  });

  const additionalForm = document.getElementById("additional-form");
  additionalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedAlgorithm = document.getElementById("algorithm-select").value;
    const selectedNumber = document.getElementById("number-select").value;

    if (!selectedAlgorithm || !selectedNumber) {
      alert("모든 항목을 선택해주세요.");
      return;
    }

    sessionStorage.setItem("selectedAlgorithm", selectedAlgorithm);
    sessionStorage.setItem("rangeStart", rangeStart);
    sessionStorage.setItem("rangeEnd", rangeEnd);
    sessionStorage.setItem("selectedNumber", selectedNumber);

    const main = document.querySelector("main");

    const modal = new Modal(
      "선택한 알고리즘과 난이도로 문제를 추출합니다.",
      async () => {
        const selectedAlgorithm = sessionStorage.getItem("selectedAlgorithm");
        const rangeStart = Number(sessionStorage.getItem("rangeStart"));
        const rangeEnd = Number(sessionStorage.getItem("rangeEnd"));
        const selectedNumber = sessionStorage.getItem("selectedNumber");
        modal.close();

        const loadingSpinner = new LoadingSpinner();
        loadingSpinner.show();
        main.appendChild(loadingSpinner.render());

        const problemFetcher = new BojProblemFetcher();
        await problemFetcher.saveProblemsToNotion(
          selectedAlgorithm,
          rangeStart,
          rangeEnd,
          selectedNumber
        );

        loadingSpinner.hide();
        alert("문제 추출이 완료되었습니다.");
      }
    );
    modal.open();
    main.appendChild(modal.render());
  });
}
