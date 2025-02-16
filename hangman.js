let word = '';
let wordDisplay = document.getElementById("wordDisplay")
let incorrectGuesses = document.getElementById("incorrectGuesses")
let incorrectGuessCount = 0;
let maxIncorrectGuesses = 11;
let guessedLetters = [];

function guessLetter(letter) {
    if (guessedLetters.includes(letter)) {
        return;
    }
    guessedLetters.push(letter);

    let correctGuess = false;
    let wordDisplayContent = "";

    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            wordDisplayContent += letter + " ";
            correctGuess = true;
        } else {
            wordDisplayContent += wordDisplay.innerHTML[i * 2] + " ";
        }
    }
    wordDisplay.innerHTML = wordDisplayContent.trim();

    if (correctGuess) {
        checkWinCondition();
    } else {
        incorrectGuessCount++;
        incorrectGuesses.innerHTML += letter + " ";
        if (incorrectGuessCount >= maxIncorrectGuesses) {
            gameOver(false);
        }
    }
}

function checkWinCondition() {
    if (!wordDisplay.innerHTML.includes("_")) {
        gameOver(true);
    }
}

function gameOver(won) {
    if (won) {
        alert(`Congratulations! You guessed the word! (${word})`);
    } else {
        alert("Game Over! The word was: " + word);
    }
    resetGame()
}


function startGame() {
    word = document.getElementById("word").value.toLowerCase()
    document.getElementById("wordInput").style.display = "none";
    initDisplay()
}

function initDisplay() {
    wordDisplay.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        wordDisplay.innerHTML += "_ "
    }
    generateLetter()
}

function generateLetter() {
    let letters = document.getElementById("letterButtons")
    letters.innerHTML = "";
    for (let i = 97; i <= 122; i++) {
        let letter = String.fromCharCode(i)
        let button = document.createElement("button")
        button.innerHTML = letter;
        button.classList.add("letter-button")
        button.onclick = () => guessLetter(letter);
        letters.appendChild(button);
    }
}

function resetGame() {
    document.getElementById("wordInput").style.display = "block";
    wordDisplay.innerHTML = "_ _ _ _ _"
    incorrectGuesses.innerHTML = "Incorrect guesses: ";
    document.getElementById("word").value = "";
    document.getElementById("letterButtons").innerHTML = "";
}