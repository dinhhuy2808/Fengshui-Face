$.getScript('assets/customed/js/jquery-1.12.4.js', function()
		{
	$.getScript('assets/customed/js/jquery-ui.js', function()
			{
		$(function() {
			$("#monday, #tuesday,#wednesday, #thursday,#friday, #saturday,#sunday").sortable({
				connectWith : ".connectedSortable"
			}).disableSelection();
		});
	});
});