let win = false;
let turn = 0;
let cellsLeft = 9;


//Game
displayTurn();
$('#reset').on('click',function(){restartGame();});

$('.cell').on('click',function(){
    //check if game is stil going and cell is empty
    if(!win && this.innerHTML === ''){
        //this.empty();
        if(turn%2 === 0){//make sure player 1 turn
            insertSymbol(this,'X');
        }   
        else{ //make sure player 2 turn
            insertSymbol(this,'O');
        }
        displayTurn();
    }

});

function displayTurn(){
    let turnhead = $('#turn-header');
    if(turn%2 === 0){//player x turn
        turnhead.text('Turn: X');
    }
    else{ //player o turn
        turnhead.text('Turn: O');
    }
}

function insertSymbol(element,symbol){
    element.innerHTML = symbol;


    const winner = checkWinConditions(element);
    turn++;
    cellsLeft--;
    if(win || cellsLeft === 0){
    setTimeout(() => (showWinner(winner)),50);
    }
}

function showWinner(winner){
    if (!win && cellsLeft === 0){
        window.alert(`GAME OVER!\nIt's a draw!
        `)
    }
    else if(winner === 'X'){
        window.alert(`GAME OVER!\nX wins!`);
        // $('#game-end').removeClass('hidden');
        // $('#game-end').append('<alert>GAME OVER! X wins!</alert>');
    }
    else //(winner === 'O'){
        window.alert(`GAME OVER!\nO wins!`)

}


function restartGame(){
    turn = 0;
    cellsLeft = 9;
    win = false;
    $('.cell').text('');
    displayTurn();
    $('#game-end').addClass('hidden');
    $('#game-end').text('');
}

function checkWinConditions(element){

    
    //find row and column based on id name to make deciding if winner easier
    const row = element.id[4];
    const column = element.id[5];
    const checkWin = element.innerHTML;
    //check if all cells in a column have the same text
    win = true;//win true by default, change if theres one that doesn't match
    for(let i = 0; i < 3; i++){
        if($('#cell' + i + column).text() !== checkWin){
            win = false;
        }//check all of the cells in one column against the element that was passed in
    }
    if(win){return checkWin}

    //check if all cells in a row have the same text
    win = true;//win true by default, change if theres one that doesn't match
    for(let i = 0; i < 3; i++){
        if($('#cell' + row + i).text() !== checkWin){
            win = false;
        }//check all of the cells in one row against the element that was passed in
    }
    if(win){return checkWin;}

    //check diagonal top left to bottom right
    win = true;//win true by default, change if theres one that doesn't match
    for(let i = 0; i < 3; i++){
        if($('#cell' + i + i).text() !== checkWin){
            win = false;
        }//check cells 00,11,22 against the element that was passed in
    }
    if(win){return checkWin;}

    //check diagonal top right to bottom left
    // win = false;
    // if($('#cell02').text() === checkWin && $('#cell11').text() === checkWin && $('#cell20').text() === checkWin){
    //     win = true;
    // }//cells 02,11,20
    win = true;
    for(let i = 0; i < 3; i++){
        if($('#cell' + (2-i) + i).text() !== checkWin){
            win = false;
        }//check cells 00,11,22 against the element that was passed in
    }
    if(win){return checkWin;}

}