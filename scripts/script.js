// Initialize a variable to modify the duck speed
let duckSpeed = 2; // Gets adjusted if a player wins to often

// Start new game
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
    let keyboardPlayerName = prompt("Duck Player Name? (Press 0 to for CPU to play the duck");
    let mousePlayerName = prompt("Hunter Player Name?");

    // Initialize variables to change names in HTML
    const mousePlayer = document.querySelector("#mouse-player");
    const keyboardPlayer = document.querySelector("#keyboard-player");
    // Change the names in HTML
    mousePlayer.innerText = mousePlayerName;
    keyboardPlayer.innerText = keyboardPlayerName;

    // Initialize the scores panel
    let keyboardScore = 0;
    document.querySelector("#keyboard-score").innerText = keyboardScore;
    let mouseScore = 0;
    document.querySelector("#mouse-score").innerText = mouseScore;

    // function to track the pressed keys and update the position
    function handlePlayerMovement() {
        // Check for diagonal movement combination
        if (pressedKeys["w"] && pressedKeys["a"]) {
            // Move top-left
            posTop = posTop - duckSpeed;
            posLeft = posLeft - duckSpeed;
        } else if (pressedKeys["w"] && pressedKeys["d"]) {
            // Move top-right
            posTop = posTop - duckSpeed;
            posLeft = posLeft + duckSpeed;
        } else if (pressedKeys["s"] && pressedKeys["a"]) {
            // Move bottom-left
            posTop = posTop + duckSpeed;
            posLeft = posLeft - duckSpeed;
        } else if (pressedKeys["s"] && pressedKeys["d"]) {
            // Move bottom-right
            posTop = posTop + duckSpeed;
            posLeft = posLeft + duckSpeed;
        } else if (pressedKeys["w"]) {
            // Move up
            posTop = posTop - duckSpeed;
        } else if (pressedKeys["s"]) {
            // Move down
            posTop = posTop + duckSpeed;
        } else if (pressedKeys["a"]) {
            // Move left
            posLeft = posLeft - duckSpeed;
        } else if (pressedKeys["d"]) {
            // Move right
            posLeft = posLeft + duckSpeed;
        }

        // Make the duck move from one border to another
        if (posTop < -8) {
            posTop = 98;
        } else if (posTop > 98) {
            posTop = -8;
        } else if (posLeft < -8) {
            posLeft = 98;
        } else if (posLeft > 98) {
            posLeft = -8;
        }

        // Update position of duck in the CSS
        playerKeyboard.style.top = posTop + "%";
        playerKeyboard.style.left = posLeft + "%";

        console.log(playerKeyboard.style.top + " " + playerKeyboard.style.left);
        console.log(timer);
    }

    // Add the pressed keys into the object and call movement function
    function handleKeyDown(event) {
        pressedKeys[event.key] = true;
        handlePlayerMovement();
        console.log(pressedKeys);
    }

    // Remove the released keys from the object
    function handleKeyUp(event) {
        delete pressedKeys[event.key];
    }

    // function to remove all event listeners and end round or game 
    function endGame() {
        console.log("Game ended!");
        // Remove the Events
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
        playerKeyboard.removeEventListener("click", handleClick);

        clearTimeout(timer);

        // Check if a player has max score and wins the game
        if (mouseScore == 3) {
            alert(`${mousePlayerName} wins Game.`)
            restart.style.display = "block";
            document.querySelector("#restart h1").addEventListener("click", Game);
            duckSpeed++;
        } else if (keyboardScore == 3) {
            alert(`${keyboardPlayerName} wins Game.`)
            restart.style.display = "block";
            document.querySelector("#restart h1").addEventListener("click", Game);
            duckSpeed--;
        } else { // If not start next round
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

    // Start new round
    function startGame() {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        playerKeyboard.addEventListener("click", handleClick);
        setTimeout(keyboardPlayerWins, 30000);
    };

    // Function for when CPU is used to play the game
    function handleCPUMovement() {
        console.log("CPU test");
        if (Math.random() < 0.5) {
            posLeft = posLeft - duckSpeed;
        } else {
            posLeft = posLeft + duckSpeed;
        }
        if (Math.random() < 0.5) {
            posTop = posTop - duckSpeed;
        } else {
            posTop = posTop + duckSpeed;
        }

        // Make the duck move from one border to another
        if (posTop < -6) {
            posTop = 99;
        } else if (posTop > 99) {
            posTop = -6;
        } else if (posLeft < -8) {
            posLeft = 99;
        } else if (posLeft > 99) {
            posLeft = -6;
        }

        // Update position of duck in the CSS
        playerKeyboard.style.top = posTop + "%";
        playerKeyboard.style.left = posLeft + "%";

        // Recall function again / asynchronous loop
        setTimeout(handleCPUMovement, 100);
    }

    // Function to start the CPU game loop
    function startGameCPU() {
        playerKeyboard.addEventListener("click", handleClick);
        timer = setTimeout(keyboardPlayerWins, 30000);
        handleCPUMovement();
    };

    // If keyboard Player name is 0 then use CPU else 2 players play
    if (keyboardPlayerName) { 
        console.log("test no player name");
        startGameCPU()
    } else {
        startGame();
    }
}

// Start game || Restart the whole game after a winner
Game();

