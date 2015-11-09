var clicks = 0;
var clicks2 = 0;

$(function() {
	var $catClickCounter = $('#counter');
	var $catClickCounter2 = $('#counter2');

	$('#cat').click(function(e) {
		clicks++;
		$catClickCounter.text(clicks);
	});

	$('#cat2').click(function(e) {
		clicks2++;
		$catClickCounter2.text(clicks2);
	});
});
