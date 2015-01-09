var http = require('http');
var url = require('url');

var app = http.createServer(function(req, res){

    res.setHeader('Content-Type', 'application/json');

    var FeedParser = require('feedparser'),
        request = require('request');

    var url_parts = url.parse(req.url, true);
    var feedUrl = url_parts.query.feedUrl;

    if (typeof feedUrl != "undefined") {
        console.log(feedUrl);

        var feedReq = request(feedUrl),
            feedparser = new FeedParser();

        var first = true;

        feedReq.on('error', function (error) {
            // handle any request errors
        });

        feedReq.on('response', function (feedRes) {
            var stream = this;
            if (feedRes.statusCode != 200) return this.emit('error', new Error('Bad status code'));

            stream.pipe(feedparser);
        });


        feedparser.on('error', function (error) {
            console.log();
            console.log(error.description + error.message);
            // always handle errors
        });

        feedparser.on('readable', function () {
            // This is where the action is!
            var stream = this
                , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
                , item;

            while (item = stream.read()) {
                console.log('Got article: %s', item.title || item.description);

                if (first) {
                    res.write('[');
                    first = false;
                } else {
                    res.write(',');
                }
                res.write(JSON.stringify(item));

            }
        });

        feedparser.on('end', function () {
            res.write(']');
        });

        setTimeout(function () {
                res.end()
            },
            5000);

    }

});

app.listen(3000);