/**
 * Created by georgestrajan on 1/8/15.
 */

//var xmlhttp = new XMLHttpRequest();

/*
$.ajax(
    {
        url: 'http://localhost:3000/?feedUrl=http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        jsonp: 'callback',
        dataType: 'jsonp',
        cache: false,
        success: function(data) {
            sendFeed(data);
        }
    });
*/
/*
function sendFeed(data) {
    $(data).each(function () {
        var el = $(this);
        postMessage(el[0]);
        //var para = document.createElement('p');
        //para.innerHTML = el[0].title;
        //var feeddiv = document.getElementById('feeddiv');
        //feeddiv.appendChild(para);
        //console.log(el[0].title);
    });
}
    */

var feedUrl, feedIndex;

self.addEventListener('message', function (event) {
    var message = event.data;

        if ( message.length ) {
            if ( typeof message == 'string' ) {
                var paramObject = JSON.parse(message);
                feedUrl = paramObject.feedUrl;
                feedIndex = paramObject.feedIndex;

                importScripts('http://localhost:3000/?callback=myCallBack&feedUrl=' + feedUrl);

            }
        }

    //this.postMessage(message);

}, false);

var myCallBack = function (data) {
    var returnData = new Object();
    returnData.feedArray = data;
    returnData.feedUrl = feedUrl;
    returnData.feedIndex = feedIndex;
    self.postMessage(JSON.stringify(returnData));
}
