////////////////////////////////////////////////////////////////
// Hytteliste logikk
// Espen Kirkesæther Brun, Anna Nikitina og Kathinka Hoyden
///////////////////////////////////////////////////////////////

$(document).ready(function(){
	// function to make the gooogle maps map
	function myMap(coordinate, location) {

	  var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 10,
	    center: coordinate
	  });

	  var marker = new google.maps.Marker({
	    position: coordinate,
	    map: map,
	    title: location
	  });
	}

	// Hent informasjon om hvilken type hytter som skal vises fra enden av urlen
	var substringArray = window.location.hash.substring(1).split(':');
	var id = substringArray[0];
	var hyttetype = substringArray[1];
	console.log('id:'+id);
	console.log('hyttetype:'+hyttetype);
	var myXML;
	var txt;
	var tur;
	var info;
	var varet;
	var pris;
	var txtArr;
	var events;
	var coordinateString;
	var location;
		
	// Hent informasjon om hytta, rendre vær og kart
	function searchXML(){
		$.ajax({
			type:"GET",
			url:"hyttekatalog.xml",
			dataType: "xml",
			success: function(xml) {
				//finner hytteid value i xml
				myXML = $(xml).find(hyttetype).filter(function(){		
					return $(this).find("hytteid").text().trim()==id;		 
				});
			
				//lagrer hytte-info i display variabelen
				txt = myXML.children().map(function(){
					return $(this).text() + ',';	
				}).get().join(' ');
						
				txtArr = txt.split(',');
				imageSrc = txtArr[1].toString().trim();
				location = txtArr[2].toString().trim();
				info = txtArr[10].toString().trim();
				vaer = txtArr[14].toString().trim();
				tur = txtArr[15].toString().trim();
				pris = txtArr[9].toString().trim();
				coordinateString = txtArr[16].toString().trim().split(':');
				var coordinate = {lat: parseInt(coordinateString[0]), lng: parseInt(coordinateString[1])};
				
				var s = hyttetype.slice(0, -1) + " på " + location;
				$("#header-eihytte").text(s);
				$("#bilde").html("<img class='img-responsive' src='" + imageSrc + "' alt='" + s + "'>");

				// laste in været fra yr		
				varet = '\n'+ '<iframe src="'+ vaer +'" width="468" height="290" frameborder="0" style="margin: 10px 0 10px 0" scrolling="no"></iframe>\n';

				$("#beskrivelse").load(info);
				$("#varet").append(varet);

				$(".tur").click(function(e){
						e.preventDefault(); // hindre default oppførsel for browseren ved klikk
						window.location.href = tur;
				});

				// get the permission from google to use their api
				$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyDa93KkD81ZVZXuMQREmIt8uGoonBWEIe0" )
				.done(function( script, textStatus ) {
					myMap(coordinate, location);
				});
			}
		});
	}

	searchXML();

	//Datepicker
	var dt = "";
	var events ={};
	events = [{ Title: "Opptatt", Date: new Date("05/05/2017") },{ Title: "Opptatt", Date: new Date("06/05/2017")},{ Title: "Opptatt", Date: new Date("05/13/2017") } ];

	$("#datepicker").datepicker({

		beforeShowDay: function(date) {
		    var result = [true, '', null];
		    var matching = $.grep(events, function(event) {
		        return event.Date.valueOf() === date.valueOf();
		    });
		    
		    if (matching.length) {
		        result = [true, 'highlight', null];
		    }
		    return result;
		},

		onSelect: function(dateText) {
	    	var date,
	        selectedDate = new Date(dateText),
	        i = 0,
	        event = null;

		    /* Determine if the user clicked an event: */
		    while (i < events.length && !event) {
		        date = events[i].Date;

		        if (selectedDate.valueOf() === date.valueOf()) {
		            event = events[i];
		        }
		        i++;
		    }
		    if (event) {
		         //If the event is defined, perform some action here; show a tooltip, navigate to a URL, etc. 
		        alert('Denne datoen er opptatt');
		       dt = "";
			} else {
			   dt = selectedDate;
			}
		}
	}); 

	//Datepicker_end

	var container = $("#container-message");

	// order button
	// a date must be picked to order
	$(".btn-order").click(function(e){
		e.preventDefault();
		if (dt =="") {
			container.text("Du må velge en innsjekkingsdato for å bestille");
			// container.show();
		} else {
			dt = $.format.date(dt, 'yyyy-MM-dd');
			window.location.href = 'skjema_bestilling.html#' + id.trim() + ':' + dt + ':' + pris.trim();
		}
	});
	
	$(".container-navbar").load("navbar.html");
	$(".container-footer").load("footer.html");
});
			
