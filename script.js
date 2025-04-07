const wordList = [
    'gold',
    'luck',
    'clover',
    'rain',
    'charm',
    'parade',
    'leprechaun',
    'treasure',
    'celebration',
    'greenery',
    'shenanigans',
    'tradition'
]

let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6
let gameOver = false

// Sound effects
const correctSound = new Audio('sounds/correct.mp3')
const wrongSound = new Audio('sounds/wrong.mp3')

function startGame(level) {
    selectedWord = getRandomWord(level)
    updateDifficultyDisplay(level)
    displayedWord = '_'.repeat(selectedWord.length)
    document.getElementById('wordDisplay').textContent = displayedWord
        .split('')
        .join(' ')

    document.getElementById('difficultySelection').classList.add('d-none')
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')
    document.getElementById('difficultyBox').classList.add('d-block')

    guessedLetters = []
    wrongGuesses = 0
    updateHealthDisplay()
    document.getElementById('wrongLetters').textContent = ' Wrong Guesses: '
    document.getElementById('endMessage')?.remove()
    gameOver = false
}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })
    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy', 'medium', 'hard')
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`
    difficultyBox.classList.add(level)
}

function guessLetter() {
    if (gameOver) return
    let inputField = document.getElementById('letterInput')
    let guessedLetter = inputField.value.toLowerCase()

    if (!guessedLetter.match(/^[a-z]$/)) {
        inputField.value = ''
        return
    }

    if (guessedLetters.includes(guessedLetter)) {
        inputField.value = ''
        return
    } else {
        guessedLetters.push(guessedLetter)
    }

    if (selectedWord.includes(guessedLetter)) {
        correctSound.play()
        correctGuess(guessedLetter)
    } else {
        wrongSound.play()
        wrongGuess(guessedLetter)
    }

    inputField.value = ''
    inputField.focus()
}

function wrongGuess(guessedLetter) {
    wrongGuesses++
    document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`
    updateHealthDisplay()

    if (wrongGuesses === maxMistakes) {
        endGame(false)
    }
}

function correctGuess(guessedLetter) {
    let newDisplayedWord = ''
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter
        } else {
            newDisplayedWord += displayedWord[i]
        }
    }
    displayedWord = newDisplayedWord
    document.getElementById('wordDisplay').textContent = displayedWord
        .split('')
        .join(' ')
    if (!displayedWord.includes('_')) {
        endGame(true)
    }
}

function endGame(won) {
    gameOver = true
    let gameArea = document.getElementById('gameArea')
    let endMessage = document.createElement('div')
    endMessage.id = 'endMessage'
    endMessage.className = 'mt-3 fw-bold p-3 rounded'

    if (won) {
        endMessage.textContent = 'Congratulations! You guessed the word!'
        endMessage.classList.add('bg-success', 'text-white')
    } else {
        endMessage.textContent = `Game Over! The word was "${selectedWord}".`
        endMessage.classList.add('bg-danger', 'text-white')
    }

    gameArea.appendChild(endMessage)
}

function restartGame() {
    document.getElementById('difficultySelection').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-none')
    document.getElementById('difficultyBox').classList.add('d-none')
    document.getElementById('letterInput').value = ''
}

function updateHealthDisplay() {
    let shamrockImg = document.getElementById('shamrock')
    let imgNum = Math.max(0, 6 - wrongGuesses)
    shamrockImg.src = `imgs/flower${imgNum}.png`
}

// Enter key to submit
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !gameOver) {
        guessLetter()
    }
})
