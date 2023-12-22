console.log("chess_parse.js Injected");
let CHESS_BOARD = null; // global

function findPieces(board){
    let piecesArray =[];

    for(let i = 0; i<board.children.length; i++) {
        if(piecesArray.length===32){
            break;
        }
        let className = board.children[i].className;
        if(className && typeof className === 'string' && className.includes("piece ") && className.includes("square-")){
            // check if classname is null and classname is a string
            piecesArray.push(board.children[i]);
        }
    }
    console.log(piecesArray)
}

function getChessboard(){
    if (window.location.href.includes("https://www.chess.com/game/")) {
        CHESS_BOARD = document.getElementById("board-single");
        if(CHESS_BOARD !== null && CHESS_BOARD !== undefined){
            // once I get a valid chessboard clear interval
            clearInterval(intervalId);
            findPieces(CHESS_BOARD)
            // send data to chessClient.js to then send to server
        }
    }
}
let intervalId = setInterval(getChessboard, 3000);


