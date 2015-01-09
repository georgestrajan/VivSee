/**
 * Created by georgestrajan on 1/5/15.
 */
document.writeln("Hello world")
$.ajax("http://feeds.reuters.com/reuters/topNews?format=xml", function (data) {
    $(data).find("item").each(function () {
        var el = $(this);
        document.writeln(el.find("title"));
    });
})