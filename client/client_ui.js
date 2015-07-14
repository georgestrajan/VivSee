/**
 * Created by georgestrajan on 2/4/15.
 */

(function() {

    "use strict";

    var feedObjects = getFeedObjects(),
        feedColors = createColors(feedObjects.length),
        i = 0;

    // create a column for each feed
    for (i = 0 ; i < feedObjects.length ; i++) {
        createcolumnDiv(i, feedObjects.length, feedColors[i]);
    }

    // for all the feedObjects, create workers to go fetch them
    for (i = 0 ; i < feedObjects.length ; i++) {
         createWorkerForFeed(feedObjects[i], workerHasFetchedFeed);
    }

}());


/** returns an array of objects that are the feeds to be used in this session */
function getFeedObjects(){

    "use strict";

    var feedsArray = [];
    var feeds = [
        'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        //'http://www.nytimes.com/services/xml/rss/nyt/AsiaPacific.xml',
        //'http://www.nytimes.com/services/xml/rss/nyt/MiddleEast.xml',
        //'http://www.nytimes.com/services/xml/rss/nyt/Europe.xml',
        'http://online.wsj.com/xml/rss/3_7085.xml',
        'http://feeds.feedburner.com/techcrunch/startups?format=xml',
        'http://feeds.wired.com/wired/index'

    ];

    for (var i = 0 ; i < feeds.length ; i++)
    {
        feedsArray[i] = {
            id : i,
            url : feeds[i]
        };
    }

    return feedsArray;
}

/** creates an HTML worker that will go and retrieve the feed. When it is done it will call the method feedRetrievedMethod */
function createWorkerForFeed(feedObject, feedRetrievedMethod){

    "use strict";

    var worker = new Worker('./client/client_worker.js');
    var workerParam = new Object();

    worker.onerror = function (e) {
        document.write("Error in file: " + e.filename + "nline: " + e.lineno + "nDescription: " + e.message);
    };

    worker.addEventListener('message', feedRetrievedMethod, false);

    workerParam.feedUrl = feedObject.url;
    workerParam.feedId = feedObject.id;
    worker.postMessage(JSON.stringify(workerParam));
}

/** gets called when an HTML worker finished fetching a specific feed */
function workerHasFetchedFeed(event) {

    "use strict";

    var returnObject = JSON.parse(event.data),
        returnFeed = returnObject.feedArray,
        returnFeedLength = returnFeed.length,
        returnFeedUrl = returnObject.feedUrl,
        returnFeedIndex = returnObject.feedId,
        numberOfItemsIncolumn = returnFeedLength,
        i = 0;

    // set the title of the column
    var columnTitleDiv = document.getElementById('divTitle_' + returnFeedIndex);
    columnTitleDiv.innerHTML = returnObject.feedTitle;

    for (; i < numberOfItemsIncolumn; i++) {

        // create the div for this item and set the text on it
        var feedDiv = createItemDiv(returnFeedIndex, i, numberOfItemsIncolumn);

        if (feedDiv && feedDiv !== 'null' && feedDiv !== 'undefined') {
            feedDiv.innerHTML = '<b>' + returnFeed[i].title + '</b><br>' + remove_tags(returnFeed[i].description);
        }
    }
}

/** creates a DIV for a column and appends it to the item_container DIV */
function createcolumnDiv(columnNumber, numberOfColumns, divColor) {

    "use strict";

    var columnDiv = document.createElement('div');
    var item_containerDiv = document.getElementById('item_container');

    columnDiv.id = 'divcolumn_' + columnNumber;
    columnDiv.className = 'columnDiv';
    columnDiv.style.width = computeColumnWidth(numberOfColumns);
    columnDiv.style.backgroundColor = divColor;

    item_containerDiv.appendChild(columnDiv);

    createColumnTitleDiv(columnNumber);
}

/** creates a DIV for an item and appends it to a specific column DIV */
function createItemDiv(columnNumber, itemNumber, numberOfItemsIncolumn) {

    "use strict";

    var elementDiv = document.createElement('div');
    var columnDiv = document.getElementById('divcolumn_' + columnNumber);

    elementDiv.id = 'divItem_' + columnNumber + '_' + itemNumber;
    elementDiv.className = 'itemDiv';

    columnDiv.appendChild(elementDiv);

    return elementDiv;
}

/** creates a DIV for the title of a column and appends it to a specific column DIV */
function createColumnTitleDiv(columnNumber) {

    "use strict";

    var titleDiv = document.createElement('div');
    var columnDiv = document.getElementById('divcolumn_' + columnNumber);

    titleDiv.id = 'divTitle_' + columnNumber;
    titleDiv.className = 'titleDiv';

    columnDiv.appendChild(titleDiv);

    return titleDiv;
}

/** calculates the width of a column */
function computeColumnWidth(numberOfColumns) {

    "use strict";
    //var totalWidth = $(document).width();
    return (100 / numberOfColumns) + "%";
}

/** removes the HTML tags from text */
function remove_tags(html) {

    "use strict";

    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText;
}

// returns an array of strings which are in 'rgb(R,G,B)' format
function createColors(numberOfColorsToCreate) {

    "use strict";

    var divsColorsArray =
        [   'rgb(102,153,51)',
            'rgb(255,153,0)',
            'rgb(153,153,255)'];

    var createdColors = [];

    function selectColor() {
        var randomColor = (Math.floor((Math.random() * divsColorsArray.length)));
        return divsColorsArray[randomColor];
    }

    for (var i = 0 ; i < numberOfColorsToCreate ; i++) {

        createdColors[i] = selectColor();

        // we don't want the previous color to be the same
        while (i > 0 && createdColors[i - 1] === createdColors[i]) {
            createdColors[i] = selectColor();
        }
    }

    return createdColors;
}