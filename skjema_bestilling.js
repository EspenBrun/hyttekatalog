$(document).ready(function(){
	$(".container-navbar").load("navbar.html");
	$(".container-footer").load("footer.html");

	var substring = window.location.hash.substring(1).split(':');
	var id = substring[0].toString().trim();
	var date = substring[1].toString().trim();
	var pris = substring[2].toString().trim();
	console.log('id'+id);
	console.log('dato'+date);
	console.log('pris'+pris);
	$("[name=hytteid]").val(id);
	$("[name=dato]").val(date);
	$("[name=pris]").val(pris);

});
