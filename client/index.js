const canvas = document.getElementById('chessboard');
const ctx = canvas.getContext('2d');
canvas.addEventListener('mousedown', onDown);
canvas.addEventListener('mouseup', onUp);

ctx.scale(100, 100);

function drawPossibleMoves(findMoveFunction) {
    ctx.fillStyle = "orange";
    var positions = findMoveFunction;
    for (i = 0; i < positions.length; i++) {
        ctx.fillRect(positions[i][0], positions[i][1], 1, 1);
    }
}

function movePiece(board, sx, sy, dx, dy) {
    for (i = 1; i < 4; i++) {
        board[dy][dx][i] = board[sy][sx][i];
        console.log(board[dy][dx][i]);
    }
    for (i = 1; i < 4; i++) {
        board[sy][sx][i] = undefined;
        console.log(board[dy][dx][i]);
    }
    drawBoard(board);
}

var xDown;
var yDown;
var xUp;
var yUp;
var possibleMoves;

function onDown(event){
    cx = event.pageX;
    cy = event.pageY;

    drawBoard(board);

    xDown = Math.floor(cx / 100);
    yDown = Math.floor(cy / 100);

    if (board[yDown][xDown][1] != undefined){
        if (ctx.fillStyle == "#ffffff") {
            ctx.fillStyle = "red";
        } else {
            if ((yDown + xDown) % 2 == 0) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "gray";
            }
        }

        ctx.fillRect(xDown, yDown, 1, 1);
        img = document.getElementById(board[yDown][xDown][1]);
        ctx.drawImage(img, xDown, yDown, 1, 1);

        if (board[yDown][xDown][2] == 1) {
            //drawPossibleMoves(findRookMovesButBetter(board, xDown, yDown));
            possibleMoves = findRookMovesButBetter(board, xDown, yDown)
        } else if (board[yDown][xDown][2] == 3) {
            //drawPossibleMoves(findBishopMoves(board, xDown, yDown));
            possibleMoves = findBishopMovesMaybe(board, xDown, yDown);
        } else if (board[yDown][xDown][2] == 2) {
            //drawPossibleMoves(findKnightMoves(board, xDown, yDown));
            possibleMoves = findKnightMoves(board, xDown, yDown);
        } else if (board[yDown][xDown][2] == 5) {
            //drawPossibleMoves(findKingMoves(board, xDown, yDown))
            possibleMoves = findKingMoves(board, xDown, yDown);
        } else if (board[yDown][xDown][2] == 4) {
            //drawPossibleMoves(findQueenMoves(board, xDown, yDown));
            possibleMoves = findQueenMoves(board, xDown, yDown);
        } else if (board[yDown][xDown][2] == 0) {
            //drawPossibleMoves(findPawnMoves(board, xDown, yDown));
            possibleMoves = findPawnMoves(board, xDown, yDown);
        }
    }
}

function onUp(event) {
    cx = event.pageX;
    cy = event.pageY;

    xUp = Math.floor(cx / 100);
    yUp = Math.floor(cy / 100);

    for (i = 0; i < possibleMoves.length; i++) {
        if (xUp == possibleMoves[i][0] && yUp == possibleMoves[i][1]) {
            movePiece(board, xDown, yDown, xUp, yUp);
        }
    }

}

function findPieceIndexes(board, pieceID) {
    for (x = 0; x < 8; x++) {
        for (y = 0; y < 8; y++) {
            if (board[y][x][1] == pieceID){
                return [y, x];
            }
        }
    }
}

const board = [
    [[0], [1], [0], [1], [0, "black_king", 5, "black"], [1, "black_bishop2", 3, "black"], [0, "black_knight2", 2, "black"], [1, "black_rook2", 1, "black"]],
    [[1, "black_pawn1", 0, "black"], [0, "black_pawn2", 0, "black"], [1, "black_pawn3", 0, "black"], [0, "black_pawn4", 0, "black"], [1], [0, "black_pawn6", 0, "black"], [1, "black_pawn7", 0, "black"], [0, "black_pawn8", 0, "black"]],
    [[0], [1], [0, "black_knight1", 2, "black"], [1], [0], [1], [0], [1]],
    [[1], [0], [1], [0, "black_queen", 4, "black"], [1], [0], [1], [0]],
    [[0], [1, "black_rook1", 1, "black"], [0], [1, "black_bishop1", 3, "black"], [0, "black_pawn5", 0, "black"], [1], [0], [1]],
    [[1], [0], [1], [0, "white_pawn4", 0, "white"], [1], [0], [1], [0]],
    [[0, "white_pawn1", 0, "white"], [1, "white_pawn2", 0, "white"], [0, "white_pawn3", 0, "white"], [1], [0, "white_pawn5", 0, "white"], [1, "white_pawn6", 0, "white"], [0, "white_pawn7", 0, "white"], [1, "white_pawn8", 0, "white"]],
    [[1, "white_rook1", 1, "white"], [0, "white_knight1", 2, "white"], [1, "white_bishop1", 3, "white"], [0, "white_queen", 4, "white"], [1, "white_king", 5, "white"], [0, "white_bishop2", 3, "white"], [1, "white_knight2", 2, "white"], [0, "white_rook2", 1, "white"]],
]

function drawBoard(board){
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value[0] == 0){
                ctx.fillStyle = "white";
                ctx.fillRect(x, y, 1, 1);
                if (board[y][x][1] != undefined){
                    img = document.getElementById(board[y][x][1]);
                    ctx.drawImage(img, x, y, 1, 1);
                }
            } else if (value[0] === 1){
                ctx.fillStyle = "gray";
                ctx.fillRect(x, y, 1, 1);
                if (board[y][x][1] != undefined){
                    img = document.getElementById(board[y][x][1]);
                    ctx.drawImage(img, x, y, 1, 1);
                }
            }
        })
    })
}

function findRookMoves(board, x, y){ // ex: board[y][x]
    var rookMoves = [];
    for (i = 0; i < 8; i++){
        if (board[y][i][1] == undefined){
            rookMoves.push([i, y]);
        }
        if (board[i][x][1] == undefined) {
            rookMoves.push([x, i]);
        }
    }
    return rookMoves;
}

function findRookMovesButBetter(board, x,y){
    // use x and y and check positive and negative
    var rookMoves = [];
    var enemy = "white";

    for (i = x + 1; i < 8; i++) {
        if (board[y][i][3] == enemy) {
            rookMoves.push([i, y]);
            break;
        } else if (board[y][i][1] == undefined){
            rookMoves.push([i, y]);
        } else {
            break;
        }
    }
    for (i = x - 1; i >= 0; i--) {
        if (board[y][i][3] == enemy) {
            rookMoves.push([i, y]);
            break;
        } else if (board[y][i][1] == undefined){
            rookMoves.push([i, y]);
        } else {
            break;
        }
    }
    for (i = y + 1; i < 8; i++) {
        if (board[i][x][3] == enemy) {
            rookMoves.push([x, i]);
            break;
        } else if (board[i][x][1] == undefined){
            rookMoves.push([x, i]);
        } else {
            break;
        }
    }
    for (i = y - 1; i >= 0; i--) {
        if (board[i][x][3] == enemy) {
            rookMoves.push([x, i]);
            break;
        } else if (board[i][x][1] == undefined){
            rookMoves.push([x, i]);
        } else {
            break;
        }
    }
    return rookMoves; // epic this works lol so cool
}

function findBishopMoves(board, x, y){
    var bishopMoves = [];



    return bishopMoves;
}

function findKnightMoves(board, x, y) {
    var knightMoves = [];
    var possibleCombosX = [2, 2, -2, -2, 1, 1, -1, -1];
    var possibleCombosY = [1, -1, 1, -1, 2, -2, 2, -2];
    var tmpX;
    var tmpY;
    for (i = 0; i < 8; i++) {
        tmpX = possibleCombosX[i] + x;
        tmpY = possibleCombosY[i] + y;
        if (tmpY >= 0 && tmpY < 8 && tmpX >= 0 && tmpX < 8) {
            if (board[tmpY][tmpX][1] == undefined) {
                knightMoves.push([tmpX, tmpY])
            }
        }
    }

    return knightMoves;
}

function findKingMoves(board, x, y) {
    var kingMoves = [];
    for (tmpX = -1; tmpX < 2; tmpX++) {
        for (tmpY = -1; tmpY < 2; tmpY++) {
            if (y + tmpY >= 0 && y + tmpY < 8 && x + tmpX >= 0 && x + tmpX < 8) {
                if (board[y + tmpY][x + tmpX][1] == undefined && (tmpX + x != x || tmpY + y != y)) {
                    kingMoves.push([x + tmpX, y + tmpY]);
                }
            }
        }
    }
    return kingMoves;
}

function findQueenMoves(board, x, y) {
    var straightPos = findRookMovesButBetter(board, x, y);
    var diagonalPos = findBishopMovesMaybe(board, x, y);
    var queenMoves = straightPos.concat(diagonalPos);
    return queenMoves;
}

function findPawnMoves(board, x, y) {
    // check if pawn is on starting square? put 3rd parameter on board? bool
    // ^for starting jumpthing
    // en passant no fucking clue
    // taking just check for piece on x + 1 || x - 1 y + 1  / y - 1 depending on the side
    var positions = [];
    if (board[y][x][3] == "black") {
        if (y == 1){
            if (board[y + 1][x][1] == undefined){
                positions.push([x, y + 1]);
                var possible = true;
            } else {
                var possible = false;
            }
            if (board[y + 2][x][1] == undefined && possible) {
                positions.push([x, y + 2]);
            }
        } else {
            if (board[y + 1][x][1] == undefined) {
                positions.push([x, y + 1]);
            }
        }
        if (x + 1 < 8) {
            if (board[y + 1][x + 1][3] == "white") {
                positions.push([x + 1, y + 1]);
            }
        }
        if (x - 1 >= 0) {
            if (board[y + 1][x - 1][3] == "white") {
                positions.push([x - 1, y + 1]);
            }
        }
    }
    if (board[y][x][3] == "white") {
        if (y == 6){
            if (board[y - 1][x][1] == undefined){
                positions.push([x, y - 1]);
                var possible = true;
            } else {
                var possible = false;
            }
            if (board[y - 2][x][1] == undefined && possible) {
                positions.push([x, y - 2]);
            }
        } else {
            if (board[y - 1][x][1] == undefined) {
                positions.push([x, y - 1]);
            }
        }
        if (x + 1 < 8) {
            if (board[y - 1][x + 1][3] == "black") {
                positions.push([x + 1, y - 1]);
            }
        }
        if (x - 1 >= 0) {
            if (board[y - 1][x - 1][3] == "black") {
                positions.push([x - 1, y - 1]);
            }
        }
    }
    return positions;
}

function checkCheckmate(board, x, y) {
    // dont rly know for this one
}

function main(board) {
    drawBoard(board);
}

main(board);
