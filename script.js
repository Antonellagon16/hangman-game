const words = {
    easy: ["cat", "sun", "car", "hat", "dog"],
    medium: ["table", "piano", "water", "light", "grass"],
    hard: ["elephant", "umbrella", "shamrock", "mountain", "cucumber"]
};

let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;
let gameOver = false;

function start--game(difficulty) {
    const wordList = words[difficulty];
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    gameOver = false;

    document.getElementById("difficulty-selection").classList.add("d-none");
    document.getElementById("game-area").classList.remove("d-none");

    document.getElementById("difficulty-box").textContent = `Difficulty: ${difficulty.toUpperCase()}`;
    document.getElementById("difficulty-box").classList.remove("d-none");

    updateWordDisplay();
    updateShamrockImage();
    document.getElementById("wrong-letters").textContent = "Wrong Guesses:";
    document.getElementById("end-message").textContent = "";
    document.getElementById("letter-input").value = "";
}

function updateWordDisplay() {
    const display = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
    document.getElementById("word-display").textContent = display;
}

function guess--letter() {
    if (gameOver) return;

    const input = document.getElementById("letter-input");
    const letter = input.value.toLowerCase();

    if (!letter || !/^[a-z]$/.test(letter)) {
        alert("Please enter a valid letter.");
        input.value = "";
        return;
    }

    if (guessedLetters.includes(letter)) {
        alert("You've already guessed that letter.");
        input.value = "";
        return;
    }

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        updateWordDisplay();
        checkWin();
    } else {
        wrongGuesses++;
        updateShamrockImage();
        updateWrongLetters();
        checkLose();
    }

    input.value = "";
}

function updateWrongLetters() {
    const wrongLetters = guessedLetters.filter(letter => !selectedWord.includes(letter));
    document.getElementById("wrong-letters").textContent = `Wrong Guesses: ${wrongLetters.join(", ")}`;
}

function updateShamrockImage() {
    const shamrockImg = document.getElementById("shamrock");
    shamrockImg.src = `img/shamrock${maxWrongGuesses - wrongGuesses}.jpg`;
}

function checkWin() {
    const wordDisplay = selectedWord.split("").every(letter => guessedLetters.includes(letter));
    if (wordDisplay) {
        document.getElementById("end-message").textContent = "You Win! 🍀";
        gameOver = true;
    }
}

function checkLose() {
    if (wrongGuesses >= maxWrongGuesses) {
        document.getElementById("end-message").textContent = `You Lose! The word was: ${selectedWord}`;
        gameOver = true;
    }
}

function restart--game() {
    document.getElementById("game-area").classList.add("d-none");
    document.getElementById("difficulty-selection").classList.remove("d-none");
    document.getElementById("difficulty-box").classList.add("d-none");
}
