import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

import { KfzKennzeichen } from '../kfz-kennzeichen';
import { Konstanten } from '../konstanten';

/**
 * App, um die KFZ-Kennzeichen in Deutschland nachzuschlagen.
 *
 * Für Liste deutscher KFZ-Kennzeichen siehe:
 * * https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/kfz-zulassung/kfz-kennzeichen-deutschland/
 * * https://de.wikipedia.org/wiki/Liste_der_Kfz-Kennzeichen_in_Deutschland
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Abkürzungen der Bundesländer in Deutschland
  // Quelle: https://www.giga.de/ratgeber/specials/abkuerzungen-der-bundeslaender-in-deutschland-tabelle/
  readonly BE = "Berlin";
  readonly BA = "Bayern";
  readonly BW = "Baden-Württemberg";
  readonly NW = "Nordrhein-Westfalen";

  readonly MIL = "Militär";
  readonly BEH = "Behörde/Organisation";

  readonly ZEITSTEMPEL_COMMIT = Konstanten.ZEITSTEMPEL_COMMIT;

  /** Array mit allen bekannten KFZ-Kennzeichen, wird von Konstruktor gefüllt. */
  public alleKfzKennzeichenArray: Array<KfzKennzeichen> = [];

  /** Array mit allen auf den aktuellen Suchbegriff passenden KFZ-Kennzeichen, werden in Liste angezeigt. */
  public suchergebnisArray : Array<KfzKennzeichen> = [];

  /**
   * Member-Variable fuer Modal-Element für Info-Button.
   * Zum Begriff "Modal" im UI-Design siehe auch: https://kulturbanause.de/faq/modal-screen/
   */
  @ViewChild(IonModal) infoModal: IonModal | null = null;

  /**
   * Konstruktor, füllt Member-Variable mit allen bekannten KFZ-Kennzeichen.
   */
  constructor() {

    // KFZ-Kennzeichen in alphabetischer Reihenfolge definieren

    this.addKfzKennzeichen("B"  , "Berlin"     , this.BE);
    this.addKfzKennzeichen("BA" , "Bamberg"    , this.BA);
    this.addKfzKennzeichen("BAD", "Baden-Baden", this.BW);
    this.addKfzKennzeichen("K"  , "Köln"       , this.NW);
    this.addKfzKennzeichen("KA" , "Karlsruhe"  , this.BW);
    this.addKfzKennzeichen("MA" , "Mannheim"   , this.BW);

    this.addKfzKennzeichen("THW", "Technisches Hilfswerk", this.BEH);
    this.addKfzKennzeichen("BP" , "Bundespolizei"        , this.BEH);

    this.addKfzKennzeichen("X", "Nato"      , this.MIL);
    this.addKfzKennzeichen("Y", "Bundeswehr", this.MIL);
  }

  /**
   * Einzelnes KFZ-Kennzeichen in internen Array ("Datenbank") hinzufügen.
   *
   * @param kennzeichen KFZ-Kennzeichen (Unterscheidungszeichen), z.B. "KA"; 
   *                    wird auf Großbuchstaben normiert.
   * @param stadtKreis Stadt oder Kreis, für den das Kennzeichen steht
   * @param bundesland Bundesland, in dem Stadt/Kreis liegt
   */
  private addKfzKennzeichen(kennzeichen: String, stadtKreis: String, bundesland: String) {

    const kennzeichenNorm = kennzeichen.toUpperCase();

    const datensatz = new KfzKennzeichen(kennzeichenNorm, stadtKreis, bundesland);

    this.alleKfzKennzeichenArray.push( datensatz );
  }

  /**
   * Event-Handler-Methode für ion-searchbar.
   *
   * @param suchbegriff Aktueller Suchbegriff
   */
  public onSearchBarEingabe(event:any) {

    const aktuellerSuchbegriff = event.target.value.trim().toUpperCase();

    if (aktuellerSuchbegriff.length === 0) {

      this.suchergebnisArray = [];
      return;
    }

    this.suchergebnisArray =
      this.alleKfzKennzeichenArray
          .filter( (kfzKennzeichenObj) =>
                     kfzKennzeichenObj.kennzeichen.startsWith(aktuellerSuchbegriff)
                );
  }

  /**
   * Event-Handler-Methode um Info-Modal zu schließen.
   */
  public onInfoModalSchliessen() {

    if (this.infoModal != null) {

      this.infoModal.dismiss();
    }
  }

}
