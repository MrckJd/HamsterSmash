document.addEventListener("DOMContentLoaded", function () {
    const holes = document.querySelectorAll(".hole");
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const healthBar = document.getElementById("health-bar");

    let timer;
    let score = 0;
    let countdown;
    let moleInterval;
    let gameOver = true;
    let health = 100;

    function comeout() {
        holes.forEach(hole => {
            hole.classList.remove('mole');
            hole.removeEventListener('click', handleMoleClick);
        });

        let random = holes[Math.floor(Math.random() * 9)];
        random.classList.add('mole');
        random.moleClicks = 0;

        random.addEventListener('click', handleMoleClick);
    }

    function handleMoleClick() {
        if (gameOver) return;
        this.moleClicks++;
        if (this.moleClicks === 3) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            this.classList.remove('mole');
        }
    }

    function decreaseHealth() {
        if (health > 0) {
            health -= 10; 
            healthBar.style.width = `${health}%`;
        }

        if (health <= 0) {
            gameOver = true;
            clearInterval(countdown);
            clearInterval(moleInterval);
            alert(`Game Over!\nYour final score: ${score}`);
            startButton.disabled = false;
            endButton.disabled = true;
        }
    }

    function startGame() {
        if (!gameOver) return;

        gameOver = false;
        score = 0;
        health = 100; // Reset health
        scoreDisplay.textContent = `Score: ${score}`;
        healthBar.style.width = '100%'; // Reset health bar
        timer = 60;
        timerDisplay.textContent = `Time: ${timer}s`;

        startButton.disabled = true;
        endButton.disabled = false;

        countdown = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Time: ${timer}s`;

            if (timer <= 0) {
                clearInterval(countdown);
                gameOver = true;
                alert(`Game Over!\nYour final score: ${score}`);
                startButton.disabled = false;
                endButton.disabled = true;
            }
        }, 1000);

        moleInterval = setInterval(() => {
            if (!gameOver) comeout();
            // If mole isn't clicked in a given time, decrease health
            setTimeout(() => {
                if (document.querySelector('.mole') && !gameOver) {
                    decreaseHealth();
                }
            }, 1000);
        }, 1000);

        console.log("Game started");
    }

    function endGame() {
        clearInterval(countdown);
        clearInterval(moleInterval);
        gameOver = true;
        alert(`Game Ended!\nYour final score: ${score}`);
        score = 0;
        timer = 60;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time: ${timer}s`;
        healthBar.style.width = '100%';
        startButton.disabled = false;
        endButton.disabled = true;
    }

    startButton.addEventListener("click", startGame);
    endButton.addEventListener("click", endGame);
});
