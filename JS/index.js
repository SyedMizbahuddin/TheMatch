const board = new Array(3);
const player1pieces = new Array(3);
const player2pieces = new Array(3);


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
  player1pieces[i].addEventListener('click', startPieces);

  player2pieces[i] = document.querySelector(".player2_"+i);
  player2pieces[i].addEventListener('click', startPieces);

}

var player1Turn = true;
var player1Used = 0;
var player2Used = 0;
var pieceSelected = false;
var selectedPiece = null;


function startPieces(event){
    let isRed = this.classList.contains("red");
    let isBlue = this.classList.contains("blue");
    if( (player1Turn && isRed) || ( !player1Turn && isBlue ) ){
      if(selectedPiece != null){
        selectedPiece.classList.remove("clicked");
      }
      highlight(this);
      selectedPiece = this;
      makeAvailableAll();

    }
}

function highlight(piece){
  let classList = piece.classList;
  classList.add("clicked");
}

function makeAvailableAll(){
  for(let i = 0; i<3; i++){
    for(let j = 0; j<3; j++){
      let classList = board[i][j].classList;
      if(classList.contains("grey"))
        classList.add("available");
    }
  }
}

function removeAvailable(){
  for(let i = 0; i<3; i++){
    for(let j = 0; j<3; j++){
      let classList = board[i][j].classList;
        classList.remove("available");
    }
  }
}


function clicked(event){
  let currentCell = this;
  // console.log(player1Turn);
  if(player1Turn){
    if(selectedPiece != null){

      if(currentCell.classList.contains("available")){ // selected and available

        removeClicked(selectedPiece,"red");
        addColor(currentCell,"red");

        if(player1Used < 3){
          selectedPiece.removeEventListener('click', startPieces);
          player1Used++;
        }
        removeAvailable();
        player1Turn = !player1Turn;
        selectedPiece = null;
        checkWin("red");
      }else if(currentCell.classList.contains("red")){
        removeClicked(selectedPiece,"red");
        removeAvailable();
        selectedByUser(this);
      }
    }else{
      if(currentCell.classList.contains("red")){
        selectedByUser(this);
      }
    }

  }else{
    if(selectedPiece != null){
      if(currentCell.classList.contains("available")){
        removeClicked(selectedPiece,"blue");
        addColor(currentCell,"blue");

        if(player2Used < 3){
          selectedPiece.removeEventListener('click', startPieces);
          player2Used++;
        }
        removeAvailable();
        player1Turn = !player1Turn;
        selectedPiece = null;
        checkWin("blue");
      }else if(currentCell.classList.contains("blue")){
        removeClicked(selectedPiece,"blue");
        removeAvailable();
        selectedByUser(this);
      }
    }else{
      if(currentCell.classList.contains("blue")){
        selectedByUser(this);
      }
    }
  }
}
// console.log(board);


function selectedByUser(piece){
  selectedPiece = piece;
  highlight(piece);
  makeAvailable(piece);
}

function makeAvailable(piece){
  let x = -1, y = -1;
  for(let i = 0; i<3; i++){
    for(let j =0; j<3; j++){
      if(board[i][j] == piece){
        x = i;
        y = j;
      }
    }
  }

  for(let dx = -1; dx<=1; dx++){
    for(let dy = -1; dy<=1; dy++){
      let i = x + dx;
      let j = y + dy;
      if(i>=0 && i<3 && j>=0 && j<3){
        let classList = board[i][j].classList;
        if(classList.contains("grey"))
          classList.add("available");
      }
    }
  }
}

function checkWin(color){
  let countD = 0, countAD = 0;
  for(let i = 0; i<3; i++){
    let countX = 0;
    let countY = 0;
    for(let j = 0; j<3; j++){
      if(board[i][j].classList.contains(color))
        countX++;

      if(board[j][i].classList.contains(color))
        countY++;

      if(i == j){
        if(board[i][j].classList.contains(color))
          countD++;
      }
      if(i + j == 2){
        if(board[i][j].classList.contains(color))
          countAD++;
      }
    }
    if(countX == 3 || countY == 3){
      winner(color);
    }
  }
  if(countD == 3 || countAD == 3){
    winner(color);
  }
}

function winner(color){
  console.log(color +" won");
}

function removeClicked(piece, color){
  piece.classList.remove(color);
  piece.classList.remove("clicked");
  piece.classList.add("grey");
}

function addColor(piece,color){
  piece.classList.add(color);
  piece.classList.remove("grey");
}
