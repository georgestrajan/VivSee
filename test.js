/**
 * Created by georgestrajan on 1/23/15.
 */

var numberOfDivs = 10;

var colorsArray = createColors(numberOfDivs);

function createTile(tileId, backColor) {
    var divHeight = $(document).height() / numberOfDivs;
    var newTile = document.createElement('div');

    newTile.className = "feedTile";
    newTile.id = tileId;
    newTile.innerHTML = "lorem ipsum dolor lorem ipsum";
    newTile.style.backgroundColor = backColor;
    newTile.style.color = 'rgb(255,255,255)';
    newTile.style.height = divHeight + "px";

    return newTile;
}

function createAllTiles() {
    for (var i = 0 ; i < numberOfDivs; i++) {
        var newTile = createTile("div_" + i, colorsArray[i]);
        document.getElementById("feeddiv").appendChild(newTile);
    }
}

function showDivContent(divNumber, feedToShow) {
    var feedDiv = document.getElementById('div_' + divNumber);
    if (feedDiv && feedDiv !== 'null' && feedDiv !== 'undefined') {
        feedDiv.innerHTML = feedToShow;
    } else {
        alert('error finding div')
    }
}


createAllTiles();

// every 1 seconds we will flip (increment) the content on a random div
(function() {
    var currentlyShowingFeed = [];
    var divToFlip = 0;

    // init the array with zeros
    for (var i = 0 ; i < numberOfDivs ; i++) {
        currentlyShowingFeed[i] = 0;
    }

    setInterval(function () {

        // get a random divToFlip, between 0 and numberOfDivs - 1
        divToFlip = Math.floor((Math.random() * numberOfDivs));

        currentlyShowingFeed[divToFlip]++;
        if (currentlyShowingFeed[divToFlip] >= 10)
        {
            currentlyShowingFeed[divToFlip] = 0;
        }

        showDivContent(divToFlip, currentlyShowingFeed[divToFlip]);

    }, 1000);

}());


//for (var i = 0; i <= 3; i++) {
//    setInterval(function (y) {
//        showDivs(y)
//    }, 2000, i);
//}
