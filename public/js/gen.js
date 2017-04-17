// Array for currently selected values
var selected = [];

// Remove a query from an array
function remove(arr, q) {
    var found = arr.indexOf(q);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(q);
    }
}

// Toggle selected / not selected
function toggleSelected(itemToToggle){
	// Check if present
	if($.inArray(itemToToggle, selected) > -1) {
		// Is present (remove)
		remove(selected, itemToToggle);
		$('#' + itemToToggle).css('border', '1px solid #bbb');
	} else {
		// Isn't present (add)
		selected.push(itemToToggle);
		$('#' + itemToToggle).css('border', '1px solid #3CC3F0');
	}
}

// Generate API Link + Display it
function gen(){

	var amount = $('#objectAmount').val();

	if(selected.length > 0 && amount != '' && amount != null) {

		var JSONselected = '';
		selected.forEach(function(el, index){
			JSONselected += el;
			if(index != (selected.length-1)) {
				JSONselected += ',';
			}
		});

		$.ajax({
			type: "POST",
			url: '/addDataSet',
			dataType: 'json',
			data:{ selected:JSONselected, amount:amount },
			success:function(response) {

				$('#linkOutput').val(response.link);
				JSONselected.split(',').forEach(function(el, index) {
					toggleSelected(el);
				});
				$('#objectAmount').val('');
				$('#linkOutput').css('border', '1px solid #3CC3F0');

			}
		});

	}

}

// Selects API Link, when clicking the input
$('#linkOutput').click(function (e) {
  $('#linkOutput').select();
});