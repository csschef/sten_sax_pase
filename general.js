const possessive = {
  sten: "din",
  sax: "din",
  papper: "ditt",
  ödla: "din",
  spock: "din"
};

const icons = {
  sten: "🪨",
  sax: "✂️",
  papper: "📄",
  ödla: "🦎",
  spock: "🖖"
};

const choices = ["sten", "sax", "papper", "ödla", "spock"];

const rules = {
  sten: {
    sax: "krossar",
    ödla: "krossar"
  },
  sax: {
    papper: "klipper",
    ödla: "halshugger"
  },
  papper: {
    sten: "täcker",
    spock: "motbevisar"
  },
  ödla: {
    papper: "äter",
    spock: "förgiftar"
  },
  spock: {
    sax: "krossar",
    sten: "förångar"
  }
};

let playerScore = 0;
let computerScore = 0;
let roundActive = true;

const buttonsDiv = document.getElementById("buttons");
const resultDiv = document.getElementById("result");
const playerScoreSpan = document.getElementById("playerScore");
const computerScoreSpan = document.getElementById("computerScore");
const resetBtn = document.getElementById("resetBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

let choiceButtons = [];

// 👉 Hjälpfunktion: stor bokstav först
function capitalizeFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Skapa val-knappar
choices.forEach(choice => {
  const btn = document.createElement("button");
  btn.classList.add("choice-btn");
  btn.innerHTML = `
    <span class="icon">${icons[choice]}</span>
    <span class="label">${choice.toUpperCase()}</span>
  `;
  btn.addEventListener("click", () => play(choice));
  buttonsDiv.appendChild(btn);
  choiceButtons.push(btn);
});

function play(playerChoice) {
  if (!roundActive) return;

  roundActive = false;
  toggleChoiceButtons(true);

  const computerChoice =
    choices[Math.floor(Math.random() * choices.length)];

  let outcomeText = "";
  let outcomeIcon = "";
  let ruleText = "";

  if (playerChoice === computerChoice) {
    outcomeText = "Oavgjort!";
    outcomeIcon = "😕";
    ruleText = `ni valde båda ${playerChoice}.`;
  } 
  else if (rules[playerChoice]?.[computerChoice]) {
    // Spelaren vinner
    outcomeText = "Du vann!";
    outcomeIcon = "🏆";
    playerScore++;

    const verb = rules[playerChoice][computerChoice];
    ruleText = `${possessive[playerChoice]} ${playerChoice} ${verb} datorns ${computerChoice}.`;
  } 
  else {
    // Datorn vinner
    outcomeText = "Datorn vann!";
    outcomeIcon = "💀";
    computerScore++;

    const verb = rules[computerChoice][playerChoice];
    ruleText = `datorns ${computerChoice} ${verb} ${possessive[playerChoice]} ${playerChoice}.`;
  }

  ruleText = capitalizeFirst(ruleText);

  const message = `
    <div class="result-outcome">
      ${outcomeIcon} ${outcomeText}
    </div>
    <div class="result-details">
      ${ruleText}
    </div>
  `;

  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
  resultDiv.innerHTML = message;
}

function toggleChoiceButtons(disabled) {
  choiceButtons.forEach(btn => btn.disabled = disabled);
}

// Spela igen = ny runda (poäng kvar)
resetBtn.addEventListener("click", () => {
  roundActive = true;
  resultDiv.textContent = "Ny runda! Gör ditt val.";
  toggleChoiceButtons(false);
});

// Nollställ poäng
resetScoreBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreSpan.textContent = 0;
  computerScoreSpan.textContent = 0;
});
