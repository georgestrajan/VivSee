var FeedParser = require('feedparser'),
      request = require('request');

  var feedReq = request('http://feeds.reuters.com/reuters/topNews?format=xml'),
      feedparser = new FeedParser();

  feedReq.on('error', function (error) {
    // handle any request errors
  });

  feedReq.on('response', function (feedRes) {
    var stream = this;

    if (feedRes.statusCode != 200) return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
  });


  feedparser.on('error', function(error) {
    // always handle errors
  });

  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this
        , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
        , item;

    res.setHeader('Content-Type', 'application/json');

    while (item = stream.read()) {
      console.log('Got article: %s', item.title || item.description);
      //res.write(JSON.stringify(item));
    }

    //res.send("Hello world");
    //res.locals.

})

res.end();


module.exports = router;
