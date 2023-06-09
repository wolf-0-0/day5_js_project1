function Game() {
    // Initialize the constant for the duck 
    const playerKeyboard = document.querySelector("#duck");
    const restart = document.querySelector("#restart");
    restart.style.display = "none";

    // Initialize the variables for the positions 
    let posTop = 0;
    let posLeft = 0;

    // Initialize an object to track the pressed keys
    const pressedKeys = {};

    // Initialize the player names 
    let keyboardPlayerName = prompt("Keyboard Player Name?");
    let mousePlayerName = prompt("Mouse Player Name?");

    const mousePlayer = document.querySelector("#mouse-player");
    const keyboardPlayer = document.querySelector("#keyboard-player");

    mousePlayer.innerText = mousePlayerName;
    keyboardPlayer.innerText = keyboardPlayerName;


    let timer = 0;
    //
    let keyboardScore = 0;
    document.querySelector("#keyboard-score").innerText = keyboardScore;
    let mouseScore = 0;
    document.querySelector("#mouse-score").innerText = mouseScore;

    // function to track the pressed keys and update the position
    function handlePlayerMovement() {
        // Check for diagonal movement combination
        if (pressedKeys["w"] && pressedKeys["a"]) {
            // Move top-left
            posTop--;
            posLeft--;
        } else if (pressedKeys["w"] && pressedKeys["d"]) {
            // Move top-right
            posTop--;
            posLeft++;
        } else if (pressedKeys["s"] && pressedKeys["a"]) {
            // Move bottom-left
            posTop++;
            posLeft--;
        } else if (pressedKeys["s"] && pressedKeys["d"]) {
            // Move bottom-right
            posTop++;
            posLeft++;
        } else if (pressedKeys["w"]) {
            // Move up
            posTop--;
        } else if (pressedKeys["s"]) {
            // Move down
            posTop++;
        } else if (pressedKeys["a"]) {
            // Move left
            posLeft--;
        } else if (pressedKeys["d"]) {
            // Move right
            posLeft++;
        }

        // Make 
        if (posTop < -8) {
            posTop = 98;
        } else if (posTop > 98) {
            posTop = -8;
        } else if (posLeft < -8) {
            posLeft = 98;
        } else if (posLeft > 98) {
            posLeft = -8;
        }

        playerKeyboard.style.top = posTop + "%";
        playerKeyboard.style.left = posLeft + "%";

        console.log(playerKeyboard.style.top + " " + playerKeyboard.style.left);
        console.log(timer);

    }

    function handleKeyDown(event) {
        pressedKeys[event.key] = true;
        handlePlayerMovement();
        console.log(pressedKeys);
    }

    function handleKeyUp(event) {
        delete pressedKeys[event.key];
    }

    function endGame() {
        console.log("Game ended!");
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
        playerKeyboard.removeEventListener("click", handleClick);
        clearTimeout(timer);
        if (mouseScore == 3) {
            alert(`${mousePlayerName} wins Game.`)
            restart.style.display = "block";
            document.querySelector("#restart h1").addEventListener("click", Game);
        } else if (keyboardScore == 3) {
            alert(`${keyboardPlayerName} wins Game.`)
            restart.style.display = "block";
            document.querySelector("#restart h1").addEventListener("click", Game);
        } else {
            alert("Game continues until one player reaches 3!")
            startGame();
        }
    }

    // Mouse Player Wins 
    function handleClick(event) {
        mouseScore++;
        alert("Mouse Player Wins!");
        endGame();
        document.querySelector("#mouse-score").innerText = mouseScore;
    }

    // Keyboard Player Wins 
    function keyboardPlayerWins(event) {
        keyboardScore++;
        alert("Keyboard Player Wins!");
        endGame();
        document.querySelector("#keyboard-score").innerText = keyboardScore;
    }

    function updateTimer() {
        timerElement.textContent = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "time is up!";
            keyboardPlayerWins();
        }
    }

    function startGame() {
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp);
        playerKeyboard.addEventListener("click", handleClick);
        timer = setTimeout(updateTimer, 30000);
    };

    startGame();
}

Game();