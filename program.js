/**
 * Created by georgestrajan on 1/5/15.
 */
var feeds = ['http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    'http://www.nytimes.com/services/xml/rss/nyt/InternationalHome.xml',
    'http://www.nytimes.com/services/xml/rss/nyt/Africa.xml',
    'http://www.nytimes.com/services/xml/rss/nyt/Americas.xml',
    'http://www.nytimes.com/services/xml/rss/nyt/AsiaPacific.xml',
    'http://www.nytimes.com/services/xml/rss/nyt/MiddleEast.xml',
    'http://www.nytimes.com/services/xml/rss/nyt/Europe.xml'];


var feedIndex = 0;
var divHeight = $(document).height() / (feeds.length + 1);

for (; feedIndex < feeds.length; feedIndex++) {

    var backColorInt = ( Math.floor((Math.random() * 10) + 1));

    for (var i = 0 ; i < 10; i++) {
        var singleDiv = document.createElement('div');

        singleDiv.id = 'div_' + feedIndex + '_' + i;
        singleDiv.style.fontSize = "10px";
        singleDiv.style.height = divHeight + "px";

        singleDiv.style.backgroundColor = "#AAB" + backColorInt.toString(16) + backColorInt.toString(16) + backColorInt.toString(16);
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

    worker.onerror = function(e) {
        alert("Error in file: "+e.filename+"nline: "+e.lineno+"nDescription: "+e.message);
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
                feedDiv.innerHTML += ' ' + returnFeed[i].title;
            }
        };

        //worker.terminate();

    }, false);

    workerParam.feedUrl = feeds[feedIndex];
    workerParam.feedIndex = feedIndex;
    worker.postMessage(JSON.stringify(workerParam));

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
                alert('error finding div')
            }
        }
    }
}

window.setInterval(function animateAllFeeds() {

    function doSetTimeOut(i) {
        setTimeout(function () {
            showDivs(i)
        }, 2000 * (i + 1))
    }

    for (var i = 0; i < 10; i++) {
        doSetTimeOut(i);
    }
}, 20000);

//setTimeout(animateAllFeeds, 5000);




