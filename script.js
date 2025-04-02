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
    };

    return {
        display,
    };
}

function Player(name, marker) { 
    return {
        name,
        marker
    };
}

function Game() {
    let turn = 1;

    const verify = (move) => { /* verify the move as legal */ };
    const place = (move, marker) => { /* place the players marker in the right place */ };
    
    return {
        verify,
        place,
    }
}

const game = Game();
const board = Gameboard();
board.display();
