

    var feedUrl, feedId;

    self.addEventListener('message', function (event) {
        var message = event.data;

        if (message.length) {
            if (typeof message === 'string') {
                var paramObject = JSON.parse(message);
                feedUrl = paramObject.feedUrl;
                feedId = paramObject.feedId;

                importScripts('http://localhost:3000/?callback=myCallBack&feedUrl=' + feedUrl);

            }
        }

        //this.postMessage(message);

    }, false);

    var myCallBack = function (data) {
        var returnData = {};
        returnData.feedArray = data.items;
        returnData.feedUrl = feedUrl;
        returnData.feedId = feedId;
        returnData.feedTitle = data.feedTitle;
        self.postMessage(JSON.stringify(returnData));
    };
