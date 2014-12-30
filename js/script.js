function loadData() {
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var city = $('#city').val();
    var street = $('#street').val();
    var address = city + ', ' + street;
    var streetview_url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;
    var image = "<img class='bgimg' src='" + streetview_url + "'/>";
    $greeting.text('So, you do want to live in ' + address);
    $body.append(image);

    // NY Times articles
    var nyt_api_key = config['nyt_api_key'];
    var search_url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:("' + city + '")&api-key=' + nyt_api_key
    $.getJSON( search_url, function( data ) {
        var response = data.response;
        for (var i=0; i<response.docs.length; i++) {
            var doc = response.docs[i];
            $nytElem.append('<li class="article"><a href="' + doc.web_url + '">' + doc.snippet + '</a></li>')
}
    }).error(function(e) {
        $nytHeaderElem.text('Oops, could not get articels for NYT at the moment');
    });

    // Getting Wikipedia articles
    var WikiRequestTimeout = setTimeout(function() {
        $wikiElem.text('Failed to get wikipedia response');
    }, 8000);
    var wiki_search_url = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + city
    $.ajax({url: wiki_search_url,
            dataType:'jsonp',
            success: function(response) {
                articles = response[1];
                for (var i=0; i<articles.length; i++) {
                    var article = articles[i]
                    $wikiElem.append('<li><a href="http://en.wikipedia.org/wiki/' + article + '">' + article + '</li>')
                };
            clearTimeout(WikiRequestTimeout);
            }
        })
    return false;
};

$('#form-container').submit(loadData);

// loadData();
