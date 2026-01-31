import { startTracking, stopTracking, getElapsed, isActive } from "./tracker.js";

const urlInput = document.getElementById("urlInput");
const goBtn = document.getElementById("goBtn");
const iframe = document.getElementById("webview");
const timeEl = document.getElementById("time");
const pauseBtn = document.getElementById("pauseBtn");

let paused = false;
let absent = false;

/* -------------------------
   Navegar para uma URL
-------------------------- */
goBtn.onclick = () => {
  let url = urlInput.value.trim();

  if (!url) return;

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  iframe.src = url;
  startTracking();
};

/* -------------------------
   Pausa intencional
-------------------------- */
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

/* -------------------------
   Atualização do tempo
-------------------------- */
setInterval(() => {
  timeEl.textContent = formatTime(getElapsed());
}, 1000);

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* -------------------------
   Perda de foco da janela
-------------------------- */
window.addEventListener("blur", () => {
  if (!paused && isActive()) {
    stopTracking();
    absent = true;
  }
});

/* -------------------------
   Retorno de foco
-------------------------- */
window.addEventListener("focus", () => {
  if (!paused && absent) {
    startTracking();
    absent = false;
  }
});

/* -------------------------
   Visibilidade da aba
-------------------------- */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (!paused && isActive()) {
      stopTracking();
      absent = true;
    }
  } else {
    if (!paused && absent) {
      startTracking();
      absent = false;
    }
  }
});
