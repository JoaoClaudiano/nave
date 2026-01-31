import { startTracking, stopTracking, getElapsed } from "./tracker.js";

const urlInput = document.getElementById("urlInput");
const goBtn = document.getElementById("goBtn");
const iframe = document.getElementById("webview");
const timeEl = document.getElementById("time");
const pauseBtn = document.getElementById("pauseBtn");

let paused = false;

goBtn.onclick = () => {
  let url = urlInput.value;
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }
  iframe.src = url;
  startTracking();
};

pauseBtn.onclick = () => {
  paused = !paused;
  if (paused) {
    stopTracking();
    iframe.style.display = "none";
    pauseBtn.textContent = "Retomar";
  } else {
    startTracking();
    iframe.style.display = "block";
    pauseBtn.textContent = "Pausa";
  }
};

setInterval(() => {
  timeEl.textContent = formatTime(getElapsed());
}, 1000);

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

import { startTracking, stopTracking, isActive } from "./tracker.js";

let absent = false;

// Janela perde foco
window.addEventListener("blur", () => {
  if (isActive()) {
    stopTracking();
    absent = true;
  }
});

// Janela volta ao foco
window.addEventListener("focus", () => {
  if (absent) {
    startTracking();
    absent = false;
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (isActive()) {
      stopTracking();
      absent = true;
    }
  } else {
    if (absent) {
      startTracking();
      absent = false;
    }
  }
});

let paused = false;

pauseBtn.onclick = () => {
  paused = !paused;

  if (paused) {
    stopTracking();
    iframe.style.display = "none";
    pauseBtn.textContent = "Retomar";
  } else {
    startTracking();
    iframe.style.display = "block";
    pauseBtn.textContent = "Pausa";
  }
};








