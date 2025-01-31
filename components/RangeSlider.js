import { TIER_IMAGE_BASE_URL } from "../constants/url.js";

export class RangeSlider {
  constructor({ id, min, max }) {
    this.id = id;
    this.min = min;
    this.max = max;
  }

  render() {
    const container = document.createElement("div");
    container.className = "range-container";

    const slider = document.createElement("div");
    slider.className = "range-slider";
    slider.innerHTML = `
      <div class="range-track">
        <div class="range-fill"></div>
        <div class="range-handle" id="start-handle"></div>
        <div class="range-handle" id="end-handle"></div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <img id="start-tier-image" class="tier-image" src="${TIER_IMAGE_BASE_URL}${this.min}.svg" alt="Start Tier" width="20" />
        <img id="end-tier-image" class="tier-image" src="${TIER_IMAGE_BASE_URL}${this.max}.svg" alt="End Tier" width="20" />
      </div>
    `;

    container.appendChild(slider);
    return container;
  }
}
