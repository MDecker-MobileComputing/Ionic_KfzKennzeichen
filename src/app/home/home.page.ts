import { Component } from '@angular/core';

/**
 * App, um die KFZ-Kennzeichen in Deutschland nachzuschlagen.
 *
 * Für Liste deutscher KFZ-Kennzeichen siehe:
 * https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/kfz-zulassung/kfz-kennzeichen-deutschland/
 *
 * Es wird die Pipe "filter" aus dem Paket "ng2-search-filter" verwendet,
 * siehe auch https://www.npmjs.com/package/ng2-search-filter .
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public eingabeSuchbegriff = "";

  // Abkürzungen der Bundesländer in Deutschland
  // Quelle: ehttps://www.giga.de/ratgeber/specials/abkuerzungen-der-bundeslaender-in-deutschland-tabelle/
  readonly BE  = "Berlin";
  readonly BA = "Bayern";
  readonly BW = "Baden-Württemberg";

  readonly MIL = "Militär";

  public kfzKennzeichenArray: Array<Object> = [];

  constructor() {

    this.addKfzKennzeichen("KA" , "Karlsruhe"  , this.BW);
    this.addKfzKennzeichen("B"  , "Berlin"     , this.BE);
    this.addKfzKennzeichen("BA" , "Bamberg"    , this.BA);
    this.addKfzKennzeichen("BAD", "Baden-Baden", this.BW);

    this.addKfzKennzeichen("X", "Nato"      , this.MIL);
    this.addKfzKennzeichen("Y", "Bundeswehr", this.MIL);
  }

  /**
   * Einzelnes KFZ-Kennzeichen in internen Array ("Datenbank") hinzufügen.
   * @param kennzeichen KFZ-Kennzeichen, z.B. "KA"
   * @param stadtKreis Stadt oder Kreis, für den das Kennzeichen steht
   * @param bundesland Bundesland, in dem Stadt/Kreis liegt
   */
  private addKfzKennzeichen(kennzeichen: String, stadtKreis: String, bundesland: String) {

    const obj = { "kennzeichen": kennzeichen,
                  "stadtKreis" : stadtKreis,
                  "bundesland" : bundesland   };

    this.kfzKennzeichenArray.push( obj );
  }

}
