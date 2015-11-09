var clicks = 0;

$(function() {
	var $catClickCounter = $('#counter');

	$('#cat').click(function(e) {
		clicks++;
		console.log(clicks);
		$catClickCounter.text(clicks);
	});
});
