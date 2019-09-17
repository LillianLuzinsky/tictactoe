

// $(document).ready(function(){
//     $('#board-game').slideToggle(1000);
//     $('.bottom-text').slideToggle(1000);
// })
// Next game it'll slideDown and reset


let icons = [
    'images/pepper.svg',
    'images/carrot.svg',
    'images/cheese.svg',
    'images/egg.svg',
    'images/fish.svg',
    'images/drumstick.svg',
    'images/lemon.svg',
    'images/apple.svg',
    'images/candy-cane.svg',
    'images/ice-cream.svg'
];

let tilesLocations = [
    $('#top1'), //[0]
    $('#top2'), //[1]
    $('#top3'), //[2]
    $('#middle1'),//[3]
    $('#middle2'),//[4]
    $('#middle3'),//[5]
    $('#bottom1'),//[6]
    $('#bottom2'),//[7]
    $('#bottom3')//[8]
];

let p1Icon = icons[0];
let p2Icon = icons[1];


let firstPlayerId = 0;
let secondPlayerId = 1;
let currentPlayer = firstPlayerId;

let scoreP1 = 0;
let scoreP2 = 0;

let gameNum = 0;

function displayScore() {
    // update the score info in the dom
    $("#p1-score").hide(100, function() {
        $(this).html(scoreP1).show(100);
      });
    $('#p2-score').text(scoreP2);

    // hide the dom image icons
    resetTiles();

    // update the playerIds so we get new icons for the next round
    if (gameNum > 1){
    firstPlayerId += 2;
    secondPlayerId += 2;
    }
    p1Icon = icons[firstPlayerId];
    p2Icon = icons[secondPlayerId];
    currentPlayer = firstPlayerId;

    // update the icon scores with the newy updated icons
    $('#p1-score-area').find('img').show().attr('src', p1Icon);
    $('#p2-score-area').find('img').show().attr('src', p2Icon);

}

function resetTiles() {
    for (let i = 0; i < tilesLocations.length; i++) {
        tilesLocations[i].find('img').hide();
    }
    gameNum++;
    $('#game-number').text(gameNum);
}

function checkWin() {

    let tiles = [
        $('#top1').find('img').attr('src'), //[0]
        $('#top2').find('img').attr('src'), //[1]
        $('#top3').find('img').attr('src'), //[2]
        $('#middle1').find('img').attr('src'),//[3]
        $('#middle2').find('img').attr('src'),//[4]
        $('#middle3').find('img').attr('src'),//[5]
        $('#bottom1').find('img').attr('src'),//[6]
        $('#bottom2').find('img').attr('src'),//[7]
        $('#bottom3').find('img').attr('src')//[8]
    ];

    console.log(tiles);


    // check for p1 has won
    if ((tiles[0] === p1Icon && tiles[1] === p1Icon && tiles[2] === p1Icon) ||
        (tiles[3] === p1Icon && tiles[4] === p1Icon && tiles[5] === p1Icon) ||
        (tiles[6] === p1Icon && tiles[7] === p1Icon && tiles[8] === p1Icon) ||
        (tiles[0] === p1Icon && tiles[3] === p1Icon && tiles[6] === p1Icon) ||
        (tiles[1] === p1Icon && tiles[4] === p1Icon && tiles[7] === p1Icon) ||
        (tiles[2] === p1Icon && tiles[5] === p1Icon && tiles[8] === p1Icon) ||
        (tiles[0] === p1Icon && tiles[4] === p1Icon && tiles[8] === p1Icon) ||
        (tiles[2] === p1Icon && tiles[4] === p1Icon && tiles[6] === p1Icon)) {

        scoreP1++;

        console.log('player 1 wins');
        displayScore();

    }
    // check for p2 has won
    else if ((tiles[0] === p2Icon && tiles[1] === p2Icon && tiles[2] === p2Icon) ||
        (tiles[3] === p2Icon && tiles[4] === p2Icon && tiles[5] === p2Icon) ||
        (tiles[6] === p2Icon && tiles[7] === p2Icon && tiles[8] === p2Icon) ||
        (tiles[0] === p2Icon && tiles[3] === p2Icon && tiles[6] === p2Icon) ||
        (tiles[1] === p2Icon && tiles[4] === p2Icon && tiles[7] === p2Icon) ||
        (tiles[2] === p2Icon && tiles[5] === p2Icon && tiles[8] === p2Icon) ||
        (tiles[0] === p2Icon && tiles[4] === p2Icon && tiles[8] === p2Icon) ||
        (tiles[2] === p2Icon && tiles[4] === p2Icon && tiles[6] === p2Icon)) {

        scoreP2++;

        console.log('player 2 wins');
        displayScore();
    };
}//end of checkWin


$(document).ready(function () {
    $('#p1-score').text(scoreP1);
    $('#p2-score').text(scoreP2);

    displayScore();

    $('.tile').on('click', function () {

        // store if the tile is in use
        let isTileUsed = $(this).find('img').is(':visible');

        // if we can place a tile
        if (isTileUsed === false) {

            // check if first player
            if (currentPlayer === firstPlayerId) {
                // show the icon and set the currentPlayer to player 2
                $(this).find('img').show().attr('src', p1Icon);
                currentPlayer = secondPlayerId;
            }

            // check for second player
            else if (currentPlayer === secondPlayerId) {
                // show the icon and set the currentPlayer to player 2
                $(this).find('img').show().attr('src', p2Icon);
                currentPlayer = firstPlayerId;
            }

        }//end of click tiles
        
        checkWin();
    });
    
    nextGame();
});

function nextGame(){
    if(checkWin ===  true){
        $('.food-icon-score').find('img').show().attr('src', p1Icon);
        $('.food-icon-score').find('img').show().attr('src', p2Icon);
    }
}