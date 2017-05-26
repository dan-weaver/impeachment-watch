var BASE_URL = "https://api.propublica.org/congress/v1/115/house/committees.json";
var nextPage = 0;
var prevPage = 0;
var query;
var state = [];


function addToState(newobj) {
	state.push(newobj);
}





function displayResults(data) {
	// numberPages += 1;
	nextPage = data.nextPageToken;
	prevPage = data.prevPageToken;
	state = [];
	for (var i=0; i < data.items.length; i++) {
		//
		//  save the data in the array
		//
		addToState({videoID: data.items[i].id.videoId,
								title: data.items[i].snippet.title,
							  desc: data.items[i].snippet.description,
								pubDate: data.items[i].snippet.publishedAt.substring(0,10),
								thumbnail: data.items[i].snippet.thumbnails.medium.url,});
	}; //end of for loop
	renderState();
}  // end of displayResults


function returnResults(data) {
	console.log("in returnResults");
	debugger;
}


function getJ(searchobject, callback) {
	$.getJSON(BASE_URL,
						searchobject,
						callback)
}


$(function() {
	'use strict';
		//
		//  format the header containing the api key
		//

	var curlURL = "https://api.propublica.org/congress/v1/115/house/committees/HSJU.json";

		// var curlURL = "'https://api.propublica.org/congress/v1/115/house/committees/HSJU.json' -H  'X-API-Key: tr01appWsv9smpaUvKL4v33q6inxoKlU6lsnOL1J'"

// $.getJSON(curlURL, returnResults);

$.ajax({
    url: curlURL,
		headers : {
			'X-API-Key': 'tr01appWsv9smpaUvKL4v33q6inxoKlU6lsnOL1J'
		},
    type: 'get',
    success: function(data) {
        var json_response = data;
        alert(data);
        returnResults(data);
      }
});




	//
	//  Event handler for search request
	//
	$('#js-search').submit(function(event) {
		event.preventDefault();
		query = $(this).find('.js-value').val();
		//
		//  format the api search request
		//
		var paramsObj = {
					part: 'snippet',
					key: 	'AIzaSyCVj_TB8yxxUwB5_x-WSj90qlNYxjLSejU',
					q: query,
					maxResults: '6',
					};
		//
		//  submit with a callback function
		//
		getJ(paramsObj, displayResults);
	});

})
