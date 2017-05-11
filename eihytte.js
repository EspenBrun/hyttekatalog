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
	// these two must be specified for the google maps, now hardcoded...
	var coordinate = {lat: -25.363, lng: 131.044};
	var location = "Oppdal";
	
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


	// Make the gooogle maps map
	function myMap(coordinate, text) {

	  var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 4,
	    center: coordinate
	  });

	  var marker = new google.maps.Marker({
	    position: coordinate,
	    map: map,
	    title: text
	  });
	}

	// get the permission from google to use their api
	$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyDa93KkD81ZVZXuMQREmIt8uGoonBWEIe0" )
	  .done(function( script, textStatus ) {
	    myMap(coordinate, location);
	  });

	// order button
	$(".btn-order").click(function(e){
		e.preventDefault(); 
		window.location.href = 'skjema_bestilling.html#' + id;

	});
			
});