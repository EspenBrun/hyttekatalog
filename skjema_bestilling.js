$(document).ready(function(){
	$(".container-footer").load("footer.html");

	var id = window.location.hash.substring(1);
	console.log('id'+id);
	$("[name=hytteid]").val(id);
});
