const board = new Array(3);
const player1pieces = new Array(3);
const player2pieces = new Array(3);


var player1Turn = true;
var player1Used = 0;
var player2Used = 0;
var instruction = document.querySelector("#instruction");


for(let i = 0; i<3; i++){
  board[i] = new Array(3);
  for(let j = 0; j<3; j++){
    let className = "._"+i+j;
    // console.log(className);
    board[i][j] = document.querySelector(className);
    board[i][j].addEventListener('click', clicked);
  }
}

for(let i = 0; i<3; i++){
  player1pieces[i] = document.querySelector(".player1_"+i);
  player2pieces[i] = document.querySelector(".player2_"+i);
}

var pieceSelected = false;

function clicked(event){
  if(player1Turn){
    if(player1Used < 3){
      addPieceToBoard();
    }
  }else{
    if(player2Used < 3){
      addPieceToBoard();
    }
  }
  console.log(this);
  console.log(event);
}
// console.log(board);
