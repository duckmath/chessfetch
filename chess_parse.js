chrome.storage.local.set({ ChessFetchCurrentBoardData: [] });
console.log("chess_parse.js Injected");
let CHESS_BOARD = null; // global
// finds pieces and sends them to storage
function findPieces(){
    let piecesString ="";
    let amt_added =0;

    for(let i = 0; i<CHESS_BOARD.children.length; i++) {
        if(amt_added===32){
            // ill never know how many pieces on board
            break;
        }
        let className = CHESS_BOARD.children[i].className;
        if(className && typeof className === 'string' && className.includes("piece ") && className.includes("square-")){
            // check if classname is null and classname is a string
                piecesString += CHESS_BOARD.children[i].className+ ",";


        }
    }
    console.log(piecesString)
    chrome.storage.local.set({ ChessFetchCurrentBoardData: piecesString}); // TODO failed setting the data a certain way
}

function getChessboard(){
    if (window.location.href.includes("https://www.chess.com/game/")) {
        CHESS_BOARD = document.getElementById("board-single");
        if(CHESS_BOARD !== null && CHESS_BOARD !== undefined){
            // once I get a valid chessboard clear interval
            findPieces(CHESS_BOARD)
            // send data to chessClient.js to then send to server
        }
    }
}
let intervalId = setInterval(getChessboard, 3000);


