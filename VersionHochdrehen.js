/**
 * Skript aktualisiert den Build-Zeitstempel/Version, der in Info-Modal angezeigt wird.
 * <br><br>
 *
 * Muss manuell aufgerufen werden: npm run bump-version
 * (siehe Definition von script "version-hochdrehen" in Datei "package.json")
 */

const moment = require('moment');
const fs     = require('fs');

// Quellcode-Datei, in der Konstante mit anzuzeigendem Wert definiert ist
const zieldatei = "src/app/konstanten.ts";

const zeitstempel = moment().format( "YYYY-MM-DD (ddd), HH:mm:ss" ); // Beispielausgabe: 2024-05-14 (Tue), 12:32:11

const inhalt =  "// Diese Klasse wird vom Skript \"VersionHochdrehen.js\" erzeugt.\n" +
                "// Aktualisierung mit: npm run version-hochdrehen\n"                 +
                "export abstract class Konstanten {\n\n"                              +
                `     static readonly ZEITSTEMPEL_COMMIT = \"${zeitstempel}\";\n`     +
                "}";

const callbackFunktion = (fehlerObj) => {

    if (fehlerObj) {

          console.log( `\nFehler aufgetreten: ${error}\n` );

      } else {

          console.log( "\nDatei wurde erstellt:\n\n" + inhalt + "\n" );
      }
};

fs.writeFile( zieldatei,
              inhalt,
              { flag: 'w+' },
              callbackFunktion
            );
