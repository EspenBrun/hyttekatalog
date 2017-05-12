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

				// Bootstrap wrappers
				txt += "<div class='row'>";
				txt += "<div class='col-xs-12 col-sm-6'>";
				//
				// Carousel
				//
				txt += "<div id='myCarousel" + $(this).find("hytteid").text().trim() + "' class='carousel slide' data-ride='carousel'>";
				// Carousel indicators
				txt += "<ol class='carousel-indicators'>";
				txt += "<li data-target='#myCarousel" + $(this).find("hytteid").text().trim() + "' data-slide-to='0' class='active'></li>";
				txt += "<li data-target='#myCarousel" + $(this).find("hytteid").text().trim() + "' data-slide-to='1' class='active'></li>";
				txt += "<li data-target='#myCarousel" + $(this).find("hytteid").text().trim() + "' data-slide-to='2' class='active'></li>";
				txt += "<li data-target='#myCarousel" + $(this).find("hytteid").text().trim() + "' data-slide-to='3' class='active'></li>";
				txt += "</ol>";
				// Wrapper for slides
				txt += "<div class='carousel-inner'>";
				// Slides
				txt += "<div class='item active'>";
				txt += "<img src='" + $(this).find("bilde").text()+ "' alt='Hyttebilde 1'>";
				txt += "</div>";
				txt += "<div class='item'>";
				txt += "<img src='" + $(this).find("bilde1").text()+ "' alt='Hyttebilde 1'>";
				txt += "</div>";
				txt += "<div class='item'>";
				txt += "<img src='" + $(this).find("bilde2").text()+ "' alt='Hyttebilde 1'>";
				txt += "</div>";
				txt += "<div class='item'>";
				txt += "<img src='" + $(this).find("bilde3").text()+ "' alt='Hyttebilde 1'>";
				txt += "</div>";
				txt += "</div>";
				// Left and right controls
				txt += "<a class='left carousel-control' href='#myCarousel" + $(this).find("hytteid").text().trim() + "' data-slide='prev'>";
				txt += "<span class='glyphicon glyphicon-chevron-left''></span>";
				txt += "<span class='sr-only'>Previous</span>";
				txt += "</a>";
				txt += "<a class='right carousel-control' href='#myCarousel" + $(this).find("hytteid").text().trim() + "' data-slide='next'>";
				txt +="<span class='glyphicon glyphicon-chevron-right'></span>";
				txt += "<span class='sr-only'>Next</span>";
				txt += "</a>";
				txt += "</div>";
				// txt += "<img src='" + $(this).find("bilde").text()+ "' class='img-responsive img-rounded' alt='Bilde av hytten'>";
				//
				// Description in bootstrap jumbotron
				//
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
				txt += "<a href='#' class='eihytte' id='" + $(this).find("hytteid").text() + "'>";
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

	// manually attach click events in image carousel.
	// necessary since the carousel is inserted with ajax
	$('#hytteliste').on('click', '.carousel-control.left', function () {
	  $('#myCarousel').carousel('prev');
	});

	$('#hytteliste').on('click', '.carousel-control.right', function () {
	  $('#myCarousel').carousel('next');
	});

	$('#hytteliste').on('click', '.eihytte', function (e) {
	    e.preventDefault(); // hindre default oppførsel for browseren ved klikk
		var hytteid = this.id.trim();
		var subArray = [hytteid, hyttetype]
		window.location.href = 'eihytte.html#' + hytteid + ':' + hyttetype;
	});	
	
	$(".container-navbar").load("navbar.html");	 
	$(".container-footer").load("footer.html");

	// force reload of page if a cabin type is clicked, or new content wont be loaded
	$(".navbar").on("click", "a", function(){
		location.reload();
	});
});
