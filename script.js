const questions = [
  {
    text: "Kokį vandenį geri kasdien?",
    options: [
      { label: "Tiesiai iš čiaupo, be jokio filtro", points: 2 },
      { label: "Iš paprasto ąsotinio filtro", points: 1 },
      { label: "Perku buteliuotą parduotuvėje", points: 0 },
    ],
  },
  {
    text: "Ar esi kada pastebėjęs(-usi) namuose geriamo vandens keistą skonį, kvapą ar spalvą?",
    options: [
      { label: "Taip, gana dažnai", points: 2 },
      { label: "Kartais pasitaiko", points: 1 },
      { label: "Niekada nepastebėjau", points: 0 },
    ],
  },
  {
    text: "Ar žinai, kiek metų tavo namo vandentiekio vamzdžiams?",
    options: [
      { label: "Nežinau, arba jie seni (20+ metų)", points: 2 },
      { label: "Apie 10–20 metų", points: 1 },
      { label: "Nauji arba neseniai keisti", points: 0 },
    ],
  },
  {
    text: "Ar auginate mažus vaikus arba laukiatės kūdikio?",
    options: [
      { label: "Taip", points: 2 },
      { label: "Ne, bet planuojame ateityje", points: 1 },
      { label: "Ne", points: 0 },
    ],
  },
  {
    text: "Kaip dažnai gamindama maistą, arbatą ar kavą naudoji vandenį tiesiai iš čiaupo?",
    options: [
      { label: "Beveik kiekvieną dieną", points: 2 },
      { label: "Kelis kartus per savaitę", points: 1 },
      { label: "Retai, dažniausiai naudoju buteliuotą", points: 0 },
    ],
  },
  {
    text: "Kiek žinai apie tai, kas iš tikrųjų yra tavo geriamajame vandenyje (pvz., chloras, sunkieji metalai)?",
    options: [
      { label: "Beveik nieko nežinau", points: 2 },
      { label: "Šį tą girdėjau", points: 1 },
      { label: "Esu tikrinusi arba gerai žinau", points: 0 },
    ],
  },
];

const results = [
  {
    max: 3,
    title: "Panašu, kad didelio pavojaus kol kas nėra",
    text: "Pagal tavo atsakymus, rizika šiuo metu nedidelė. Bet vandens kokybė gali keistis, tad verta ją retkarčiais pasitikrinti ir toliau.",
  },
  {
    max: 7,
    title: "Verta atkreipti dėmesį",
    text: "Turi keletą požymių, į kuriuos verta pažiūrėti atidžiau. Dažnai žmonės net nepagalvoja, kas iš tikrųjų teka iš čiaupo, kol nepasidomi giliau.",
  },
  {
    max: 12,
    title: "Yra dėl ko susirūpinti",
    text: "Pagal tavo atsakymus, yra keletas rimtų ženklų, kad verta iš arčiau pažiūrėti į savo namų vandenį — ypač jei namuose auga vaikai.",
  },
];

let currentIndex = 0;
let score = 0;

const startBtn = document.getElementById("start-quiz-btn");
const questionsWrap = document.getElementById("quiz-questions");
const progressBar = document.getElementById("progress-bar");
const stepLabel = document.getElementById("step-label");
const quizSection = document.getElementById("testas");
const resultSection = document.getElementById("rezultatas");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
const restartInlineBtn = document.getElementById("restart-inline-btn");

function renderQuestion() {
  const q = questions[currentIndex];
  progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  stepLabel.textContent = `Klausimas ${currentIndex + 1} iš ${questions.length}`;

  const optionsHtml = q.options
    .map(
      (opt, i) =>
        `<button class="quiz-option" data-points="${opt.points}">${opt.label}</button>`
    )
    .join("");

  questionsWrap.innerHTML = `
    <div class="quiz-question">
      <h3>${q.text}</h3>
      <div class="quiz-options">${optionsHtml}</div>
    </div>
  `;

  questionsWrap.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => handleAnswer(Number(btn.dataset.points)));
  });
}

function handleAnswer(points) {
  score += points;
  currentIndex += 1;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const outcome = results.find((r) => score <= r.max) || results[results.length - 1];
  resultTitle.textContent = outcome.title;
  resultText.textContent = outcome.text;

  quizSection.hidden = true;
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultSection.hidden = true;
  quizSection.hidden = false;
  renderQuestion();
  quizSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

startBtn.addEventListener("click", () => {
  quizSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

restartBtn.addEventListener("click", restartQuiz);
restartInlineBtn.addEventListener("click", restartQuiz);

renderQuestion();
