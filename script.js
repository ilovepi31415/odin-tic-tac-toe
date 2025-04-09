const grid = document.querySelector('.board');
const restart = document.querySelector('.restart');
const message = document.querySelector('.message');
const nameBox1 = document.querySelector('#player-name-1');
const nameBox2 = document.querySelector('#player-name-2');

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
    // Ascribes a default name if none chosen
    name = name == '' ? `Player ${marker}` : name;
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
    const CELLS = 9;

    const startGame = () => {
        board = Gameboard();
        players[0] = Player(nameBox1.value, 1);
        players[1] = Player(nameBox2.value, 2);
        turn = 0;
        catGame = false;
        message.textContent = '';

        for (i = 1; i <= CELLS; i++) {
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

        const activePlayer = players[turn % 2];   
        board.place(move, activePlayer.marker);
        board.display();
        turn ++;

        if (turn == 9) {
            catGame = true;
        }

        if (board.hasWon() != 0 || catGame) {
            announceWinner(board.hasWon());
        }
    }

    const announceWinner = (winner) => {
        switch (winner) {
            case 0:
                message.textContent = 'Cat Game';
                break;
            default:
                message.textContent = `${players[winner - 1].name} wins!`;
                break;
        }
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
    game.startGame();
});

