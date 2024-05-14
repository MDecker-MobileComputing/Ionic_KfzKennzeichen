export class KfzKennzeichen {

    /**
     * Repräsentiert einen "Datensatz" für die Datenbank der mit den Unterscheidungszeichen
     * von deutschen KFZ-Kennzeichen.
     *
     * @param kennzeichen Unterscheidungszeichen, z.B. "KA" für "Landkreis Karlsruhe"
     *
     * @param stadtKreis Stadt oder Kreis, für den das Unterscheidungszeichen steht
     *                   oder "Militär" oder "Behörde/Organisation".
     *
     * @param bundesland Name Bundesland oder "Militär" oder "Behörde/Organisation"
     */
    constructor( public kennzeichen: String,
                 public stadtKreis : String,
                 public bundesland : String
       ) {}

}
