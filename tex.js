const statusDisplay = document.querySelector('.Spel-status'); 
 
let gameActive = true;
let NuvarandeSpelare = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

statusDisplay.innerHTML = NuvarandeSpelareTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
 
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = NuvarandeSpelare;
    clickedCell.innerHTML = NuvarandeSpelare;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
 
    if (roundWon) {
        gameActive = false;
        return;
    }
 
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameActive = false;
        return;
    }
 
    handlePlayerChange();
}
 
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
 
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
 
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
 
function SpelOmstart() {
    gameActive = true;
    NuvarandeSpelare = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = NuvarandeSpelareTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
 
 
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.Spel-omstart').addEventListener('click', SpelOmstart);