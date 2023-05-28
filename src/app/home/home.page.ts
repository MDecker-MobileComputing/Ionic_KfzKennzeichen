import { Component } from '@angular/core';

import { KfzKennzeichen } from '../kfz-kennzeichen';

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

  //public eingabeSuchbegriff = "";

  // Abkürzungen der Bundesländer in Deutschland
  // Quelle: ehttps://www.giga.de/ratgeber/specials/abkuerzungen-der-bundeslaender-in-deutschland-tabelle/
  readonly BE = "Berlin";
  readonly BA = "Bayern";
  readonly BW = "Baden-Württemberg";

  readonly MIL = "Militär";

  /**
   * Array mit allen bekannten KFZ-Kennzeichen, wird von Konstruktor gefüllt.
   */
  public alleKfzKennzeichenArray: Array<KfzKennzeichen> = [];

  public suchergebnisArray : Array<KfzKennzeichen> = [];

  constructor() {

    this.addKfzKennzeichen("B"  , "Berlin"     , this.BE);
    this.addKfzKennzeichen("BA" , "Bamberg"    , this.BA);
    this.addKfzKennzeichen("BAD", "Baden-Baden", this.BW);
    this.addKfzKennzeichen("KA" , "Karlsruhe"  , this.BW);

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

    const datensatz = new KfzKennzeichen(kennzeichen, stadtKreis, bundesland);

    this.alleKfzKennzeichenArray.push( datensatz );
  }

  /**
   * Event-Handler-Methode für ion-searchbar.
   * @param suchbegriff Aktueller Suchbegriff
   */
  public onSearchBarEingabe(event:any) {

    const aktuellerSuchbegriff = event.target.value.trim().toLowerCase();

    if (aktuellerSuchbegriff.length === 0) {

      this.suchergebnisArray = [];
      return;
    }

    console.log(`Aktueller Suchbegriff: "${aktuellerSuchbegriff}"`);

    this.suchergebnisArray =
      this.alleKfzKennzeichenArray
          .filter( (kfzKennzeichenObj) =>
                     kfzKennzeichenObj.kennzeichen.toLowerCase().startsWith(aktuellerSuchbegriff)
                );
  }

}
