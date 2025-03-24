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





    //update difficulty display div
    updateDifficultyDisplay(level)


    //create the placeholder for the selected words
    displayedWord = '_'.repeat(selectedWord.length)
    //display the updated word
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

    //hide difficulty selction and show game area

    //add d-block to the difficultyselection div
    document.getElementById('difficultySelection').classList.add('d-none')


    //remove d-none from difficultyBox & gamearea

    document.getElementById('difficultyBox').classList.remove('d-none')
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


function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')

    //remove any previous difficulty classes

    difficultyBox.classList.remove('easy', 'medium', 'hard')

    //set text & apply class dynamically using template literals

    difficultyBox.textContent = `${level.charAt(0).toUpperCase() + level.slice(1)}`


    //apply the appropiate CSS style for cosen difficulty
    difficultyBox.classList.add(level)

}