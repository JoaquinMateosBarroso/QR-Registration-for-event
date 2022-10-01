function doGet(e) {
  const aforo_maximo = 100
  const rrpp = e.parameter.rrpp ?? 'Ninguno';
  var resource = {
    "majorDimension": "ROWS",
    "values": [[e.parameter.nombre, e.parameter.correo, 'O', rrpp]]
  }
  var spreadsheetId = "1DLSSMwuncd8HKDUIs7IiF9o_nf6mcoY0QZSVdniAzKI";
  var range = `main!A1:C${aforo_maximo + 1}`;
  var optionalArgs = {
    valueInputOption: "USER_ENTERED"
  };
  const rango = (Sheets.Spreadsheets.Values.append(resource, spreadsheetId, range, optionalArgs)).tableRange;
  fila = Number(rango.slice(9)) + 1;
  const link = `https://script.google.com/macros/s/AKfycbw-C8Aurcfjqj-2aMfaPspapg5OC8bxbzET_vPrXSCNV4gSAFWp1gI-u5Hgzl0rqRg1Zw/exec?fila=${fila}`;

  //Mandar email
  var messageResource = GmailApp.sendEmail(e.parameter.correo, "Fiesta del jueves", `Tu dispositivo tiene problemas con el correo electrónico, pero puedes entrar presentando en entrada el siguente código: ${fila}`, {htmlBody:`<FONT SIZE=20>Te estaremos esperando, presenta este QR en la entrada para poder pasar<br><img src= "https://chart.googleapis.com/chart?chs=150x150&amp;cht=qr&amp;chl=${link}&amp;choe=UTF-8" width="500" height="500"/>`})

  if (fila <= aforo_maximo) {
    return HtmlService.createHtmlOutput(`
   <FONT SIZE=20>Asistencia registrada correctamente, presenta este QR en la entrada para poder pasar. Haz captura de pantalla y guárdatelo<br><br>
   <img src="https://chart.googleapis.com/chart?chs=150x150&amp;cht=qr&amp;chl=${link}&amp;choe=UTF-8" width="500" height="500"/><br>
   También te lo hemos mandado por correo electrónico. Revisa el apartado de spam si no lo encuentras
   <br>
   Nombre: ${e.parameter.nombre}<br>
   Correo: ${e.parameter.correo}<br>
   RRPP: ${rrpp}<br>
   ID: ${fila}<br>
   `);
  }
  else {
    return HtmlService.createHtmlOutput(`
   <h1 align = "center">El aforo está lleno, has sido añadido a la lista de espera, te mandaremos un correo electrónico si conseguimos sitio para tí<\h1>`);

  }

}