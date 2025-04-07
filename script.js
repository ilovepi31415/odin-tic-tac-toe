function Gameboard() {
    // prep board
    let markers = [' ', 'X', 'O'];
    let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const display = () => { /* display the board */
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
    };

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

        board.display();
        while (board.hasWon() == 0 && catGame == false) {
            getMove();
        }
    }

    const getMove = () => {
        if (turn == 9) {
            console.log('cat game');
            catGame = true;
            return;
        }

        let move;
        const activePlayer = players[turn % 2];
        do {
            move = prompt(`What move are you making, ${activePlayer.name}?`);   
        } while (!board.isLegalMove(move));

        board.place(move, activePlayer.marker);
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

const game = Game();
do {
    game.startGame();
} while (game.playAgain() == true);

