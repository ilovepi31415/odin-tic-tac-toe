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
    const hasWon = (player) => { /* check if the given player has won */ };

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
    let turn = 1;
    const getMove = (board, player) => {
        let move;
        do {
            move = prompt(`What move are you making, ${player.name}?`);   
        } while (!board.isLegalMove(move));
        board.place(move, player.marker);
    }

    return {
       getMove, 
    }
}

const game = Game();
const board = Gameboard();
const player1 = Player('Alice', 1);
const player2 = Player('Bob', 2);
board.display();
game.getMove(board, player1);
board.display();
game.getMove(board, player2);
board.display();
