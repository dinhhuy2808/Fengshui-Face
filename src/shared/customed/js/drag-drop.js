<script src="jquery-1.12.4.js"></script>
<script src="jquery-ui.js"></script>
<script>
$(function() {
	$("#monday, #tuesday,#wednesday, #thursday,#friday, #saturday,#sunday").sortable({
		connectWith : ".connectedSortable"
	}).disableSelection();
});
</script>