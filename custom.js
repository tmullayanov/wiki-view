// defining wiki-links
var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
var jsCallback = "&callback=?";  // overriding "one-origin" policy.
var wikiIDLink = "https://en.wikipedia.org/?curid=";

function tagSinglePage(page) {
    var html = '';
    html += "<a href='" + wikiIDLink + page.pageid + "' target='_blank'>";
    html += "<li class='response'>";
    html += "<h2>" + page.title + "</h2>";
    html += "<p>" + page.extract + "</p>";
    html += "</li></a>";

    return html;
}

function accessWiki () {
    var title = $("#title").val();
    var html = '';
    if (title) {
        $(".responses").animate({opacity: 0}, 300);

        $.getJSON(api+title+jsCallback, function(json) {
            var results = json.query.pages;
            for (var pageid in results) {
                if (results.hasOwnProperty(pageid)) {
                    var info = results[pageid];
                    html += tagSinglePage(info);
                }
            }
            $(".responses").html(html);
            $(".responses").animate({opacity: 1}, 1000);
        });
    } else {
        alert("No search since no input is provided");
    }
}
