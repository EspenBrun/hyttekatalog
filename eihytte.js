////////////////////////////////////////////////////////////////
// Hytteliste logikk
// Espen Kirkesæther Brun, Anna Nikitina og Kathinka Hoyden
///////////////////////////////////////////////////////////////

$(document).ready(function(){
	// Hent informasjon om hvilken type hytter som skal vises fra enden av urlen
	var substringArray = window.location.hash.substring(1).split(';');
	var hyttetype = substringArray[0];
	var id = substringArray[1];
	var myXML;
	var txt;
	var result;
	var header = id;
	var test;
	
	$("#cabin-type-header").html(id);
		
	// Hent informasjon om hytta
	function searchXML(){
		$.ajax({
		type:"GET",
		url:"hyttekatalog.xml",
		dataType: "xml",
		success: function(xml) {
		//finner hytteid value i xml
		myXML = $(xml).find(hyttetype).filter(function(){		
		 return	$(this).find("hytteid").text()==id;		 
		});
		test = $(this).find("kjøkken").text();
		//lagrer hytte-info i display variabelen
		txt = myXML.children().map(function(){
		return this.tagName + '=' + $(this).text();
		}).get().join(' ');
		
		
		$("#eihytte").html("<p>"+txt+"</p>");
		
			}						
		});										
	}			// Send HTMLen til dette elementet	
	searchXML();


	$(".btn-order").click(function(e){
		e.preventDefault(); 
		window.location.href = 'skjema_bestilling.html';

	});
			
});