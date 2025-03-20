const wordList = [
    "Pie", "Tea", "Jam", "Egg", "Rye",
    "Burger", "Pasta", "Muffin", "Pickle", "Waffle",
    "Chocolate", "Pineapple", "Spaghetti", "Blueberry", "Croissant"
]

let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level) {
    selectedWord = getRandomWord(level)


    //hide difficulty selction and show game area

    //add d-block to the difficultyselection div
    document.getElementById('difficultySelection').classList.add('d-none')


    //remove d-none from difficultyBox & gamearea

    document.getElementById('difficultySelection').classList.remove('d-none')
    document.getElementById('gameArea').classList.remove('d-none')


    //add d-block to difficultyBx & gamearea
    document.getElementById('gameArea').classList.add('d-block')
    document.getElementById('difficultyBox').classList.add('d-block')


}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length > 4 && word.length <= 8
        if (level === 'hard') return word.length > 8
    })

    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}