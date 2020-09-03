var board = new Array();
var score = 0;
var bestscore = 0;
var hasConflicted = new Array();

$(document).ready(function(){
    newgame();
});

function newgame(){
    // cell initialization
    init();
    generateOneNumber();
    generateOneNumber();
    score = 0;   
    updateScore(score);
}

function init(){
    for (var i = 0; i < 4; i ++)
        for (var j = 0; j < 4; j ++){
        var gridCell = $("#grid-cell-"+i+"-"+j);
        // star
        gridCell.css('top',getPosTop( i, j ));
        gridCell.css('left',getPosLeft( i, j ));
        // 在js里边调用设置css，找到教程相应部分补全
        }
    for (var i = 0 ; i < 4 ; i ++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for( var j = 0 ; j < 4 ; j ++ ){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }

    }

    updateBoardView();

    scroe=0;
}

 function updateBoardView(){
    $(".number-cell").remove();
    //jquery
    for (var i = 0; i < 4; i ++)
        for (var j = 0; j < 4; j ++){
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-cell-'+i+'-'+j);
        //jquery，不用学，但要知道这里的'是怎么用的？好像和jquery有关？

        if( board[i][j] == 0 ){
            theNumberCell.css('width','0px');
            theNumberCell.css('height','0px');
            theNumberCell.css('top',getPosTop(i,j)+50);
            theNumberCell.css('left',getPosLeft(i,j)+50);
        }
        else{
            theNumberCell.css('width','100px');
            theNumberCell.css('height','100px');
            theNumberCell.css('top',getPosTop(i,j));
            theNumberCell.css('left',getPosLeft(i,j));
            theNumberCell.css('background-color',
                getNumberBackgroundColor(board[i][j]));
            theNumberCell.css('color',
                getNumberColor(board[i][j]));
            theNumberCell.text(board[i][j]);
        }

        hasConflicted[i][j] = false;
    }
}


$(document).keydown(function(event){
    switch(event.keyCode){
        case 37: 
            if(moveLeft()){
                setTimeout("generateOneNumber()",210);
                isGameOver();
            }; 
            break;
        case 38: 
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                isGameOver();
            }; 
            break;
        case 39: 
            if(moveRight()){
                setTimeout("generateOneNumber()",210);
                isGameOver();
            }; 
            break;
        case 40: 
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                isGameOver();
            }; 
            break;
        default: break;
    }
});
//这三个符号，无语了，都是什么意思？


function generateOneNumber(){

    if(noSpace(board))
        return false;
    /* 随机位置 */
    var randx = parseInt(Math.floor(Math.random()* 4));
    var randy = parseInt(Math.floor(Math.random()* 4));
    var times = 0;
    while ( times < 50 ){
        if (board[randx][randy] == 0)
            break;
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times ++;
        /* 这点要看下逻辑 */
    }
    if( times == 50){
        for (var i = 0; i < 4; i ++)
            for (var j = 0; j < 4; j ++){
                randx = i;
                randx = j;
            }
    }
    /* 随机数字 */
        var randNumber = Math.random()<0.7 ? 2 : 4;
    /* 随机位置显示随机数字 */
        board[randx][randy] = randNumber;
        showNumberWithAnimation (randx, randy, randNumber);

    return true;
      
}

function isGameOver(){
    if(noSpace( board ) && noMove( board ) ){
        gameOver();
    }
}

function gameOver(){
    alert('Game Over!');
}