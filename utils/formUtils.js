import { TIER_IMAGE_BASE_URL } from "../constants/config.js";

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
    startTierImage.src = `${TIER_IMAGE_BASE_URL}/${start}.svg`;
    endTierImage.src = `${TIER_IMAGE_BASE_URL}/${end}.svg`;
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
  console.log(additionalForm);
  additionalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Additional form submitted");

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

    alert("모든 선택이 완료되었습니다.");
  });
}
