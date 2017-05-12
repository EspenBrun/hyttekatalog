function validerSkjema(){
	var container = $("#container-message");
	var name = $("[name=navn]").val();
	var adresse = $("[name=adresse]").val();
	var postnrInput = $("[name=postnr]").val();
	var postnr = parseInt(postnrInput) || 0; //if parseInt doesn't work, set postnr to 0
	var epost = $("[name=epost]").val();
	var tlfInput = $("[name=tlf]").val();
	var tlf = parseInt(tlfInput) || 0;
	var dager = $("[name=dager]").val();
	var pris = $("[name=pris]").val();
	var medlem = $("[name=medlem]").is(':checked');

	if(name == ""){
		container.text("Du må oppgi et navn");
		container.show();
		return false
	}
	if(adresse == "" || !adresse.includes(" ")){
		container.text("Du må oppgi en adresse");
		container.show();
		return false
	}
	if(postnr == 0 || postnr < 1000 || postnr > 9999){
		container.text("Du må oppgi et postnummer");
		container.show();
		return false
	}
	if(epost == "" || !epost.includes("@") || !epost.includes(".")){
		container.text("Du må oppgi en epost");
		container.show();
		return false
	}
	if(tlf == 0 || tlf < 10000000 || tlf > 99999999){
		container.text("Du må oppgi et telefonnummer");
		container.show();
		return false
	}
	if (dager <= 0) {
		container.text("Antall dager må være positivt");
		container.show();
		return false	
	}
	else {
	pris = pris * dager;	
	$("[name=pris]").val(pris);
	return true
	}
	
	if ($('input.checkbox_check').prop(':checked')); {
    var pris = pris * 0.85;
    $("[name=pris]").val(pris);
    alert(pris);
    return true
    }
	
}
