/**
 * Skript aktualisiert den Build-Zeitstempel/Version, der in Info-Modal angezeigt wird.
 * <br><br>
 *
 * Muss manuell aufgerufen werden: npm run bump-version
 * (siehe Definition von script "bump-version" in Datei "package.json")
 */

const moment = require('moment');
const fs     = require('fs');

// Quellcode-Datei, in der Konstante mit anzuzeigendem Wert definiert ist
const zieldatei = "src/app/konstanten.ts";


const zeitstempel = moment().format(); // Beispielausgabe: 2023-05-28T13:25:13+02:00

const inhalt =  "// Diese Klasse wird vom Skript UpdateCommitZeitstempel.js erzeugt.\n" +
                "export abstract class Konstanten {\n\n"                               +
                `     static readonly ZEITSTEMPEL_COMMIT = \"${zeitstempel}\";\n`      +
                "}";

const callbackFunktion = (fehlerObj) => {

    if (fehlerObj) {

          console.log( `\nFehler aufgetreten: ${error}\n` );

      } else {

          console.log( "\nDatei wurde erstellt:\n" + inhalt + "\n" )
      }
};

fs.writeFile( zieldatei,
              inhalt,
              { flag: 'w+' },
              callbackFunktion
            );
