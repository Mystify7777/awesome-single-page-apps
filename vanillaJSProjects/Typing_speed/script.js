const quotes = [
  "JavaScript makes web pages interactive and dynamic.",
  "Practice typing daily to improve your speed and accuracy.",
  "Programming is not about typing, it’s about thinking.",
  "The quick brown fox jumps over the lazy dog.",
  "Coding challenges help you learn faster and think logically."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const themeSwitch = document.getElementById("theme-switch");
const modeLabel = document.getElementById("mode-label");

let startTime, timerInterval;
let time = 0;
let currentQuote = "";
let isRunning = false;
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
  if (isRunning) return;

  isRunning = true;
  currentQuote = getRandomQuote();
  quoteEl.textContent = currentQuote;
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  resultEl.textContent = "";
  time = 0;

  timeEl.textContent = 0;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 0;

  startTime = new Date();
  timerInterval = setInterval(updateTime, 1000);
}

function updateTime() {
  time++;
  timeEl.textContent = time;
}

function endTest() {
  clearInterval(timerInterval);
  inputEl.disabled = true;
  isRunning = false;

  const typedText = inputEl.value.trim();
  const wordsTyped = typedText.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = time / 60;
  const wpm = Math.round(wordsTyped / minutes || 0);

  const correctChars = getCorrectCharacters(typedText, currentQuote);
  const accuracy = ((correctChars / currentQuote.length) * 100).toFixed(1);

  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;

  resultEl.textContent = ` Test completed! You typed ${wordsTyped} words in ${time}s.`;
}

function getCorrectCharacters(typed, original) {
  let correct = 0;
  for (let i = 0; i < Math.min(typed.length, original.length); i++) {
    if (typed[i] === original[i]) correct++;
  }
  return correct;
}

inputEl.addEventListener("input", () => {
  const typed = inputEl.value.trim();
  if (typed === currentQuote || typed.length >= currentQuote.length) {
    endTest();
  }
});

startBtn.addEventListener("click", startTest);
function applyTheme(theme) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
  themeSwitch.checked = theme === "dark";
  modeLabel.textContent = theme === "dark" ? "Dark Mode" : "Light Mode";
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

themeSwitch.addEventListener("change", () => {
  const newTheme = themeSwitch.checked ? "dark" : "light";
  applyTheme(newTheme);
});
