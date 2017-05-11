////////////////////////////////////////////////////////////////
// Hytteliste logikk
// Espen Kirkesæther Brun, Anna Nikitina og Kathinka Hoyden
///////////////////////////////////////////////////////////////

$(document).ready(function(){
	// Hent informasjon om hvilken type hytter som skal vises fra enden av urlen
	var substringArray = window.location.hash.substring(1).split(',');
	var id = substringArray[0];
	var hyttetype = substringArray[1];
	var myXML;
	var txt;
  var tur;
	var info;
	var varet;
	var txtArr;
	var events;
  // these two must be specified for the google maps, now hardcoded...
	var coordinate = {lat: -25.363, lng: 131.044};
	var location = "Oppdal";
		
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
	
		//lagrer hytte-info i display variabelen
		txt = myXML.children().map(function(){
		return $(this).text() + ',';		
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
				
		txtArr = txt.split(',');
		console.log('txtArr:' + txtArr);
		info = txtArr[10].toString().trim();
		console.log('info:' + info);
		vaer = txtArr[14].toString().trim();
		console.log('varet:' + varet);
		tur = txtArr[15].toString().trim();
		console.log('tur:' + tur);
						
		varet = '\n'+ '<iframe src="'+ vaer +'" width="468" height="290" frameborder="0" style="margin: 10px 0 10px 0" scrolling="no"></iframe>\n';
 		console.log('vaer:' + vaer);

	$("#beskrivelse").load(info);
		$("#varet").append(varet);

$(".tur").click(function(e){
		e.preventDefault(); // hindre default oppførsel for browseren ved klikk
		window.location.href = tur;
});
//dp

events = [ 
    { Title: "Opptat", Date: new Date("05/05/2017") }, 
   { Title: "Stengt", Date: new Date("03/05/2017") }];


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
}/*,

onSelect: function(dateText) {
    var date,
        selectedDate = new Date(dateText),
        i = 0,
        event = null;*/

    /* Determine if the user clicked an event: */
 /*   while (i < events.length && !event) {
        date = events[i].Date;

        if (selectedDate.valueOf() === date.valueOf()) {
            event = events[i];
        }
        i++;
    }
    if (event) {
        /* If the event is defined, perform some action here; show a tooltip, navigate to a URL, etc. */
    /*    alert(event.Title);
    }

}*/
}); 

//enddp
}
})
}

searchXML();
			
});


					
