// Create an array with the image filenames for the cards
var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];

// Keep track of the number of pairs left to match
var pairsLeft = cards.length / 2;

// Keep track of the current turn count
var turnCount = 0;

// Keep track of the IDs of the two currently visible cards
var visibleCardIds = [];

function cardClick() {
    // If two cards are already visible, ignore clicks until they are hidden again
    if (visibleCardIds.length >= 2) {
        return;
    }
    
    // Get the ID of the clicked card
    var cardId = $(this).attr('id');
    
    // If this card is already visible, ignore the click
    if ($(this).hasClass('cardA')) {
        return;
    }
    
    // Reveal the clicked card
    $(this).removeClass('card');
    $(this).addClass('cardA');
    $(this).css('background-image', 'url(img/' + cards[parseInt(cardId.substring(1))] + ')');
    
    // Add the ID of the clicked card to the list of visible cards
    visibleCardIds.push(cardId);
    
    // If two cards are now visible, check if they match
    if (visibleCardIds.length == 2) {
        // Increment the turn count
        turnCount++;
        $('.score').html('Turn counter: ' + turnCount);
        
        // Get the IDs of the two visible cards
        var id1 = visibleCardIds[0];
        var id2 = visibleCardIds[1];
        
        // If the two visible cards have the same image, mark them as matched
        if (cards[parseInt(id1.substring(1))] == cards[parseInt(id2.substring(1))]) {
            pairsLeft--;
            if (pairsLeft == 0) {
                // All pairs have been matched - show a winning message
                $('.board').html('<h1>You win!<br>Done in ' + turnCount + ' turns</h1>');
                $('#reset').css('display', 'block');
            }
            
            // Hide the matched cards after a delay
            setTimeout(function() {
                $('#' + id1 + ', #' + id2).css('opacity', '0');
                visibleCardIds = [];
            }, 750);
        } else {
            // The two visible cards do not match - hide them after a delay
            setTimeout(function() {
                $('#' + id1).addClass('card');
                $('#' + id1).removeClass('cardA');
                $('#' + id1).css('background-image', 'url(img/karta.png)');
                
                $('#' + id2).addClass('card');
                $('#' + id2).removeClass('cardA');
                $('#' + id2).css('background-image', 'url(img/karta.png)');
                visibleCardIds = [];
            }, 1000);
        }
    }
}

// Shuffle the elements of an array in place
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// old thing but might be useful XD
// Hide all the cards and reset the turn count
// function resetGame() {
// $('.cardA').addClass('card');
// $('.cardA').removeClass('cardA');
// $('.card').css('background-image', 'url(img/karta.png)');
// $('.card').css('opacity', '1');
// $('.score').html('Turn counter: 0');
// pairsLeft = cards.length / 2;
// turnCount = 0;
// visibleCardIds = [];
// }

// Define the resetGame function to reset the game
function resetGame() {
    // Reset the turn counter and pairs left
    turnCount = 0;
    pairsLeft = 6;

    // Shuffle the cards array
    shuffle(cards);

    // Hide the reset button
    $('#reset').hide();

    // Reset board using HTML. This is a bit hacky but it works.
    $('.board').html(`
        <div class="card" id="c0"></div>
        <div class="card" id="c1"></div>
        <div class="card" id="c2"></div>
        <div class="card" id="c3"></div>
        <div class="card" id="c4"></div>
        <div class="card" id="c5"></div>
        <div class="card" id="c6"></div>
        <div class="card" id="c7"></div>
        <div class="card" id="c8"></div>
        <div class="card" id="c9"></div>
        <div class="card" id="c10"></div>
        <div class="card" id="c11"></div>
        <div class="score">Turn counter: 0</div>
    `);

    // Add click handlers to all the cards
    $('.card').click(cardClick)
}


// Add a click handler to the reset button to start a new game
$('#reset').click(function() {
    resetGame();
});

// Add a click handler to the shuffle button to shuffle the cards and start a new game
$('#shuffle').click(function() {
shuffle(cards);
resetGame();
});
