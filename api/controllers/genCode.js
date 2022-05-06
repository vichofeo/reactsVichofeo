 function genCode (longitud = 6, mayusculas= true) {
    let vocales = "AaEeIiOoUu13580";					  //AWC
    let consonantes = "BbCcDdFfGgHhJjKkLlMmNnPpQqRrSsTtVvWwXxYyZz24679"; //AWC
    if(mayusculas){
        vocales = "AEIOU13580";					  //AWC
        consonantes = "BCDFGHJKLMNPQRSTVWXYZ24679"; //AWC
    }

    let r = '';
    let passlen = (longitud > 6) ? longitud : 6;	  //AWC

    for (let i = 0; i < passlen; i++) {				  //AWC
        if (i % 2) {
            r += vocales[Math.floor(Math.random() * (vocales.length - 1 - 0 + 1)) + 0];
            
        }  else {
            r += consonantes[Math.floor(Math.random() * (vocales.length - 1 - 0 + 1)) + 0];
        }
    }

    return r;
}

module.exports = genCode