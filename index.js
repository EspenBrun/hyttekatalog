////////////////////////////////////////////////////////////////
// Hyttekatalog logikk
// Espen Kirkesæther Brun, Anna Nikitina og Kathinka Hoyden
///////////////////////////////////////////////////////////////

$(document).ready(function(){
	$("#katalog").click(function(e){
		e.preventDefault();
		var hyttetype = this.name;
		window.location.href = 'hytteliste.html#'+hyttetype;

	});
	// $("#katalog").click(function(){
	// 	var txt = "";
	// 	var hyttetype = this.name;
	// 	console.log(this);

	// 	$.ajax({
	// 		type:"GET",
	// 		url:"hyttekatalog.xml",
	// 		dataType: "xml",

	// 		success: function(xml) {
	// 			$(xml).find(hyttetype).each(function(){
	// 				txt += "<hr>" + "<p><img src='" + $(this).find("bilde").text()+ "' height = 50 width = 40 ></p>" + "<br>" + 
	// 				"Beliggenhet: " + $(this).find("beliggenhet").text() + "<br>" +
	// 				"Utleieperioden: " + $(this).find("utleieperioden").text()  + "<br>" +
	// 			    "Kjøkken: " + $(this).find("kjøkken").text() + "<br>" +
	// 			    "Innlagt strøm: " + $(this).find("strøm").text() +   "<br>" +
	// 			    "Innlagt vann: " + $(this).find("innlagtvann").text()  + "<br>" +
	// 			    "Dusj: " + $(this).find("dusj").text() +  "<br>" +
	// 			    "Antall senger: " + $(this).find("antallsenger").text() + "<br>" +
	// 			    "Pris: " + $(this).find("pris").text() + "<br>" +
	// 			    "her er linken" +
	// 			    "<a href='hyttebeskrivelse.html' id='" + $(this).find("hytteid").text() + "'>Vil du vite mer?</a>" + "<hr>"; 
	// 			});
	// 			$("#hytteliste").html(txt);
	// 		}
	// 	});
 //    });
});
					