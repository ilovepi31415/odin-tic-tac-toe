const grid = document.querySelector('.board');
const restart = document.querySelector('.restart');

function Gameboard() {
    // prep board
    let markers = [' ', 'X', 'O'];
    let colors = ['lightgrey', 'blue', 'red'];
    let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const display = async () => { /* display the board */
        for (row = 0; row < 3; row++) {
            let line = '';
            for (col = 0; col < 3; col++) {
                line += ` ${markers[gameState[(row * 3) + col]]} `
                if (col < 2) { line += '|';}
            }
            console.log(line)
            if (row < 2) {console.log('-----------')}
        }
        console.log(''); // Adds blank line for better spacing
        displayHTML();
    };

    const displayHTML = () => { /* displays via DOM */
        for (i = 0; i < gameState.length; i++) {
            document.querySelector(`.board div:nth-child(${i + 1})`).style.backgroundColor = colors[gameState[i]];
        }
    }

    const setMarker = (index, symbol) => {
        if (index > 0) { // Make sure the blank symbol isn't changed
            markers[index] = symbol;
        }
    }

    const isLegalMove = (move) => { /* verify the move as legal */ 
        console.log('hi');
        return gameState[move - 1] == 0;
    };

    const place = (move, player) => { /* place the player's marker in the right place */
        gameState[move - 1] = player;
    };
    
    const hasWon = (player) => { /* check if the given player has won */
        const winningStates = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6] // diagonal
        ];
        for (state of winningStates) {
            if (
                gameState[state[0]] != 0
                && gameState[state[0]] == gameState[state[1]]
                && gameState[state[1]] == gameState[state[2]]
            ) { // If all three are the same non-zero marker
                return gameState[state[0]];
            }
        }
        return 0;

    };

    return {
        display,
        setMarker,
        isLegalMove,
        place,
        hasWon,
    };
}

function Player(name, marker) { 
    return {
        name,
        marker,
    };
}

function Game() {
    let turn;
    let board;
    let players = [null, null];
    let catGame;

    const startGame = () => {
        board = Gameboard();
        players[0] = Player('Alice', 1);
        players[1] = Player('Bob', 2);
        turn = 0;
        catGame = false;

        for (i = 1; i <= 9; i++) {
            const cell = document.querySelector(`.board div:nth-child(${i})`)
            cell.dataset.order = i;
            cell.addEventListener('click', () => {
                getMove(cell.dataset.order);
            });
        }

        board.display();
    }

    const getMove = (move) => {
        if (board.hasWon() != 0 || catGame == true) {return;}
        if (!board.isLegalMove(move)) {return;}
        if (turn == 9) {
            console.log('cat game');
            catGame = true;
            return;
        }

        const activePlayer = players[turn % 2];   
        board.place(move, activePlayer.marker);
        console.log(move);
        board.display();
        turn ++;
    }

    const playAgain = () => {
        return (prompt('Play Again? (Y/n)') != 'n');
    }

    return {
        startGame,
        playAgain,
    }
}

let game = Game();
game.startGame();

restart.addEventListener('click', () => {
    game = Game();
    game.startGame();
});

