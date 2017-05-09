function validerSkjema(){
  var epost = window.document.mittSkjema.epost.value;
  if (epost.value == "") {
    alert("skriv inn gyldig epostadresse")
    window.document.mittSkjema.epost.focus();
    return false;
}
return true;
}