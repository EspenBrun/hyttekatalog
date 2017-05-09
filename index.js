////////////////////////////////////////////////////////////////
// Hyttekatalog logikk
// Espen Kirkesæther Brun, Anna Nikitina og Kathinka Hoyden
///////////////////////////////////////////////////////////////

// for senere bruk. Legge tilk mulighet for å skifte hyttetype når man er inne i hyttelsite.html
// $(document).delegate('#katalog','click', function(){} 


$(document).ready(function(){
	// click for hyttekategori. Hent info om hvilken type som er klikket, og send med denne informasjonen i linken, og send til hytteliste.html
	$(".goto-cabin").click(function(e){
		e.preventDefault(); // hindre default oppførsel for browseren ved klikk
		var hyttetype = this.name;
		window.location.href = 'hytteliste.html#'+hyttetype;
	});

	$("#footer").load("footer.html");
});
					