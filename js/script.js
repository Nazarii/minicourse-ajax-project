
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var city = $('#city').val();
    var street = $('#street').val();
    var address = city + ', ' + street;
    var streetview_url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    $greeting.text('So, you do want to live in ' + address);
    var image = "<img class='bgimg' src='" + streetview_url + "'/>";
    $body.append(image);

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
