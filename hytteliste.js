////////////////////////////////////////////////////////////////
// Hytteliste logikk
// Espen Kirkesæther Brun, Anna Nikitina og Kathinka Hoyden
///////////////////////////////////////////////////////////////

$(document).ready(function(){
	// Hent informasjon om hvilken type hytter som skal vises fra enden av urlen
	var hyttetype = window.location.hash.substring(1);
	var txt = "";
	if(hyttetype == "Sjohytter"){
		$("#cabin-type-header").html("Sjøhytter");
	} else {
		$("#cabin-type-header").html(hyttetype);
	}
	
	// Hent informasjon om hyttene
	$.ajax({
		type:"GET",
		url:"hyttekatalog.xml",
		dataType: "xml",

		success: function(xml) {
			$(xml).find(hyttetype).each(function(){
				txt += "<div class='row'>";
				txt += "<div class='col-xs-12 col-sm-6'>";
				txt += "<img src='" + $(this).find("bilde").text()+ "' class='img-responsive img-rounded' alt='Bilde av hytten'>";
				txt += "</div>";
				txt += "<div class='col-xs-12 col-sm-6 pull-left jumbotron cabin-list-description match-parent'>";
				txt += "Beliggenhet: " + $(this).find("beliggenhet").text();
				txt += "<br>";
				txt += "Utleieperioden: " + $(this).find("utleieperioden").text();
				txt += "<br>";
				txt += "Kjøkken: " + $(this).find("kjøkken").text();
				txt += "<br>";
				txt += "Innlagt strøm: " + $(this).find("strøm").text();
				txt += "<br>";
				txt += "Innlagt vann: " + $(this).find("innlagtvann").text();
				txt += "<br>";
				txt += "Dusj: " + $(this).find("dusj").text();
				txt += "<br>";
				txt += "Antall senger: " + $(this).find("antallsenger").text();
				txt += "<br>";
				txt += "Pris: " + $(this).find("pris").text();
				txt += "<br>";
				txt += "<a href='hyttebeskrivelse.html' id='" + $(this).find("hytteid").text() + "'>";
				txt += "Vil du vite mer?";
				txt += "</a>";
				txt += "</div>";
				txt += "</div>";
				txt += "<hr>"; 
			});
			// Send HTMLen til dette elementet
			$("#hytteliste").html(txt);
		}
	});
});
					