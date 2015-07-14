/**
 * Created by georgestrajan on 1/5/15.
 */

"use strict";

(function () {

    var colorsArray = createColors(100);

    var feeds = ['http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        'http://www.nytimes.com/services/xml/rss/nyt/InternationalHome.xml',
        'http://www.nytimes.com/services/xml/rss/nyt/Africa.xml',
        'http://www.nytimes.com/services/xml/rss/nyt/Americas.xml',
        'http://www.nytimes.com/services/xml/rss/nyt/AsiaPacific.xml',
        'http://www.nytimes.com/services/xml/rss/nyt/MiddleEast.xml',
        'http://www.nytimes.com/services/xml/rss/nyt/Europe.xml'],
        divHeight = $(document).height() / (feeds.length + 1);

    for (var feedIndex = 0;feedIndex<feeds.length; feedIndex++) {

        for (var i = 0; i < 10; i++) {
            var singleDiv = document.createElement('div');

            singleDiv.id = 'div_' + feedIndex + '_' + i;
            singleDiv.style.fontSize = "10px";
            singleDiv.style.height = divHeight + "px";

            singleDiv.style.backgroundColor = colorsArray[feedIndex * i];
            singleDiv.style.color = 'rgb(255,255,255)';
            singleDiv.innerHTML = feeds[feedIndex];

            if (i == 0) {
                singleDiv.style.display = "block";
            }
            else {
                singleDiv.style.display = "none";
            }

            document.body.appendChild(singleDiv)
        }
    }

    for (feedIndex = 0; feedIndex < feeds.length; feedIndex++) {

        var worker = new Worker('feed_worker.js');
        var workerParam = new Object();

        worker.onerror = function (e) {
            alert("Error in file: " + e.filename + "nline: " + e.lineno + "nDescription: " + e.message);
        };

        worker.addEventListener('message', function (event) {

            var returnObject = JSON.parse(event.data),
                returnFeed = returnObject.feedArray,
                returnFeedLength = returnFeed.length,
                returnFeedUrl = returnObject.feedUrl,
                returnFeedIndex = returnObject.feedIndex,
                i = 0;

            for (; i < returnFeedLength; i++) {

                var feedDiv = document.getElementById('div_' + returnFeedIndex + '_' + i);
                if (feedDiv && feedDiv !== 'null' && feedDiv !== 'undefined') {
                    feedDiv.innerHTML = '<b>' + returnFeed[i].title + '</b><br>' + remove_tags(returnFeed[i].description);
                }
            }


            //worker.terminate();

        }, false);

        workerParam.feedUrl = feeds[feedIndex];
        workerParam.feedIndex = feedIndex;
        worker.postMessage(JSON.stringify(workerParam));

    }

    function remove_tags(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText;
    }


    function showDivs(feedToShow) {
        for (var feedIndex = 0; feedIndex < feeds.length; feedIndex++) {
            for (var i = 0; i < 10; i++) {
                var feedDiv = document.getElementById('div_' + feedIndex + '_' + i);
                if (feedDiv && feedDiv !== 'null' && feedDiv !== 'undefined') {
                    if (i === feedToShow) {
                        feedDiv.style.display = "block";
                    } else {
                        feedDiv.style.display = "none";
                    }
                } else {
                    alert('error finding div');
                }
            }
        }
    }

    function showDivContent(divNumber, feedToShow) {
        for (var i = 0; i < 10; i++) {
            var feedDiv = document.getElementById('div_' + divNumber + '_' + i);
            if (feedDiv && feedDiv !== 'null' && feedDiv !== 'undefined') {
                if (i === feedToShow) {
                    feedDiv.style.display = "block";
                } else {
                    feedDiv.style.display = "none";
                }
            } else {
                alert('error finding div');
            }
        }
    }

// every 1 seconds we will flip (increment) the content on a random div
    (function () {
        var currentlyShowingFeed = [];
        var divToFlip = 0;

        // init the array with zeros
        for (var i = 0; i < feeds.length; i++) {
            currentlyShowingFeed[i] = 0;
        }

        setInterval(function () {

            // get a random divToFlip, between 0 and feeds.length
            divToFlip = Math.floor((Math.random() * feeds.length));

            currentlyShowingFeed[divToFlip]++;
            if (currentlyShowingFeed[divToFlip] >= 10) {
                currentlyShowingFeed[divToFlip] = 0;
            }

            showDivContent(divToFlip, currentlyShowingFeed[divToFlip]);

        }, 1000);

    }());


//setTimeout(
//    (function() {
//        var globalFeedToShow = 0;
//
//        setInterval(function () {
//            showDivs(globalFeedToShow);
//
//            globalFeedToShow++;
//            if (globalFeedToShow >= 10) {
//                globalFeedToShow = 0;
//            }
//
//        }, 10000);
//    }()), 5000);

// this makes all feeds change content every 10 seconds
//setTimeout(
//(function() {
//    var globalFeedToShow = 0;
//
//    setInterval(function () {
//        showDivs(globalFeedToShow);
//
//        globalFeedToShow++;
//        if (globalFeedToShow >= 10) {
//            globalFeedToShow = 0;
//        }
//
//    }, 10000);
//}()), 5000);


//window.setInterval(function animateAllFeeds() {
//
//    function doSetTimeOut(i) {
//        setTimeout(function () {
//            showDivs(i)
//        }, 2000 * (i + 1))
//    }
//
//    for (var i = 0; i < 10; i++) {
//        doSetTimeOut(i);
//    }
//}, 20000);
}());





