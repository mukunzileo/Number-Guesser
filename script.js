document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const guessInput = document.getElementById('guess-input');
    const submitBtn = document.getElementById('submit-guess');
    const hintBtn = document.getElementById('hint-btn');
    const newGameBtn = document.getElementById('new-game-btn');
    const easyBtn = document.getElementById('easy-btn');
    const mediumBtn = document.getElementById('medium-btn');
    const hardBtn = document.getElementById('hard-btn');
    const rangeDisplay = document.getElementById('range-display');
    const message = document.getElementById('message');
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');
    const attemptsDisplay = document.getElementById('attempts');
    const guessList = document.getElementById('guess-list');
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');
    const clickSound = document.getElementById('click-sound');

    // Game Variables
    let secretNumber;
    let maxNumber = 100;
    let attempts = 0;
    let score = 100;
    let time = 0;
    let timer;
    let gameActive = false;

    // Initialize Game
    function initGame() {
        secretNumber = Math.floor(Math.random() * maxNumber) + 1;
        attempts = 0;
        score = 100;
        time = 0;
        gameActive = true;
        
        guessInput.value = '';
        message.textContent = '';
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        scoreDisplay.textContent = `Score: ${score}`;
        guessList.innerHTML = '';
        
        clearInterval(timer);
        timer = setInterval(updateTimer, 1000);
    }

    // Update Timer
    function updateTimer() {
        if (!gameActive) return;
        time++;
        timerDisplay.textContent = `Time: ${time}s`;
    }

    // Check Guess
    function checkGuess() {
        if (!gameActive) return;
        
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > maxNumber) {
            message.textContent = `Please enter a number between 1 and ${maxNumber}!`;
            return;
        }

        clickSound.play();
        attempts++;
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        score = Math.max(0, score - 5);
        scoreDisplay.textContent = `Score: ${score}`;

        const listItem = document.createElement('li');
        listItem.textContent = guess;

        if (guess === secretNumber) {
            winSound.play();
            message.textContent = `🎉 You won in ${attempts} attempts! Final Score: ${score}`;
            listItem.classList.add('correct');
            gameActive = false;
            clearInterval(timer);
        } else if (guess < secretNumber) {
            message.textContent = 'Too low! Try higher.';
            listItem.classList.add('too-low');
        } else {
            message.textContent = 'Too high! Try lower.';
            listItem.classList.add('too-high');
        }

        guessList.prepend(listItem);
        guessInput.value = '';
        guessInput.focus();
    }

    // Give Hint
    function giveHint() {
        if (!gameActive) return;
        
        clickSound.play();
        score = Math.max(0, score - 10);
        scoreDisplay.textContent = `Score: ${score}`;
        
        const hint = secretNumber % 2 === 0 ? "The number is even." : "The number is odd.";
        message.textContent = `💡 Hint: ${hint}`;
    }

    // Set Difficulty
    function setDifficulty(newMax) {
        maxNumber = newMax;
        rangeDisplay.textContent = `Guess a number between 1 and ${maxNumber}`;
        initGame();
    }

    // Event Listeners
    submitBtn.addEventListener('click', checkGuess);
    hintBtn.addEventListener('click', giveHint);
    newGameBtn.addEventListener('click', initGame);
    easyBtn.addEventListener('click', () => setDifficulty(50));
    mediumBtn.addEventListener('click', () => setDifficulty(100));
    hardBtn.addEventListener('click', () => setDifficulty(200));
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });

    // Start with Medium Difficulty
    setDifficulty(100);
});