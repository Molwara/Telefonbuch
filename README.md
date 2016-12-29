# Telefonbuch
Fingerübung für [dff solutions GmbH](https://dff-solutions.de/)

Das Telefonbuch ist eine ["Single Page Applikation"](https://de.wikipedia.org/wiki/Single-Page-Webanwendung), das mit dem Framework [AngularJS](http://angularjs.org) umgesetzt wurde.

## Funktionalitäten

* Anzeige von Einträgen in einer Liste (Name und Telefonnummer)
* Anlegen von Einträgen
* Bearbeiten bestehender Einträge
* Löschen bestehender Einträge
* Suche nach Namen

### Anzeige von Einträgen in einer Liste

Die Kontakte des Telefonbuches sind hier in einem Array abgelegt, wo jeder Kontakt ein eigenes Objekt an einer Stelle des Arrays hat, das über mehrere Attribute verfügt. Dies gleicht dem Aufbau einer [JSON](http://www.json.org/json-de.html), wodurch die beispielhafte Liste an Kontaktdaten in der App einfach durch eine JSON-Datei, die auf einem Server abgelegt ist, ersetzt werden kann. Hier könnte man per [Ajax](https://de.wikipedia.org/wiki/Ajax_(Programmierung)) die Kontaktdaten vom Server holen und nach Bearbeitung oder Hinzufügen/Löschen eines Kontaktes diese Änderungen wieder auf dem Server speichern.

Die Kontaktdaten sind in den Attributen "name" und "phone" abgelegt und die dort hinterlegten Strings werden auf der HTML-Seite in einer Tabelle angezeigt. Es gibt jeweils eine Tabellenspalte für den Namen und die Telefonnummer des Kontakts und noch eine dritte Spalte für die Buttons zum Bearbeiten und Löschen der Einträge in der Kontaktliste. Die einzelnen Tabellenzeilen werden über die AngularJS Funktion [ngRepeat](https://docs.angularjs.org/api/ng/directive/ngRepeat) mit der im Angular Model hinterlegten Collection (siehe oben beschriebenes Array) erzeugt, wodurch Änderungen an den Datensätzen (wie auch Hinzufügen oder Löschen eines Kontakts) sofort dynamisch auf der HTML-Seite sichtbar werden.

> Eine mögliche Verbesserung wäre hier die Sortierung der Kontakte von "A" bis "Z". Diese Funktion müsste sowohl beim Abruf der Daten beim Start der App als auch beim Hinzufügen neuer Kontakte ausgeführt werden.

### Anlegen von Einträgen

Um einen neuen Kontakt zu der Liste im Telefonbuch hinzuzufügen, gibt man Name und Telefonnummer in die vorgegebenen Formularfelder, die sich unter der Kontaktliste im Footer der App befinden, und drückt auf den Button "Hinzufügen" rechts unten in der Ecke des Footers. 

Dieser ruft dann die Funktion "addContact" auf, die sich im Angular Modul "contactApp" befindet, das über den [ngController](https://docs.angularjs.org/api/ng/directive/ngController) dafür sorgt, dass die View verändert wird, wenn sich die im Model hinterlegten Daten ändern und umgekehrt. In dieser Funktion wird der Collection des Models ein neuer Datensatz hinzugefügt, der sich aus den Attributen "name" und "phone" zusammensetzt, dessen Inhalt durch die Eingabe in den Formularfeldern über die dort definierten Variablen mit [ngModel](https://docs.angularjs.org/api/ng/directive/ngModel) festgelegt wird. Durch die zuvor beschriebene bidirektionale Datenbindung wird der neue Kontakt sofort in der Tabelle sichtbar. Zum Schluss werden in der Funktion über die entsprechenden Variablen die Strings in den Formularfeldern wieder geleert, um eine neue Eingabe möglich zu machen. 

Um das Hinzufügen von leeren oder falschen Datensätzen zu verhindern, habe ich am Anfang der Funktion eine Abfrage hinzugefügt, die die Eingabe der Formularfelder vorab prüft und bei falscher Eingabe dem Nutzer über einen Alert eine Fehlermeldung gibt und danach die Funktion frühzeitig verlässt, damit die Daten nicht hinzugefügt werden.

> Eine mögliche Verbesserung wäre hier eine komplexere Validierung der Telefonnummer beim Hinzufügen eines neuen Kontakts (Filterung durch String [replace](http://www.w3schools.com/jsref/jsref_replace.asp) Funktion und eventuell zwei Attribute im Datensatz, einmal für die Anzeige und für den Link) oder Filterung der Telefonnummer im "href"-Attribut des Links über eine extra dafür angelegte Funktion im Angular Modul.

### Bearbeiten bestehender Einträge

Um bei einem Telefonbucheintrag die bestehenden Kontaktdaten zu ändern, drückt man auf den Button "Bearbeiten" in der rechten Spalte der Tabelle und durch das [ngShow](https://docs.angularjs.org/api/ng/directive/ngShow) in den HTML-Tags wechselt die reine Textansicht des Kontakts zu einer bearbeitbaren Formularansicht. Dabei wechselt auch der Text des Buttons zu "Speichern", der beim erneuten Klick über [ngClick](https://docs.angularjs.org/api/ng/directive/ngClick) den Bearbeitungsmodus wieder beendet.

Hinter dem Button steckt eine einfache Funktion "toggleEdit" aus dem Angular Modul, die den booleanschen Wert des Attributes "edit" des ausgewählten Kontakts wechselt. Ich habe den Datensatz des Kontakts um dieses Attribut erweitert, um für jeden Eintrag einen individuellen Bearbeitungsmodus zu erstellen. Je nachdem ob der Wert nun "true" oder "false" ist, werden nun die entsprechenden HTML-Elemente ein- oder ausgeblendet und der Text des Buttons geändert. Um die Stelle des Kontakts in der Collection des Models herauszufinden, wird der Funktion der Index des ausgewählten Eintrags übergeben.

Durch diese Umsetzung wird es sogar möglich mehrere Kontakte gleichzeitig zu bearbeiten. Eigentlich ist die Bezeichnung des Buttons "Speichern" irreführend, weil beim Bearbeiten schon direkt der Datensatz in der Collection des Models geändert wird. Es wäre also die Bezeichnung Bearbeitungsmodus "Beenden" korrekter, aber für den normalen Nutzer, der sich nicht mit AngularJS auskennt, ist es aus Gründen der [Benutzerfreundlichkeit](https://de.wikipedia.org/wiki/Benutzerfreundlichkeit) besser die Bezeichnung "Speichern" zu verwenden.

> Eine mögliche Verbesserung wäre eine andere Umsetzung des Bearbeitungsmoduses um eine komplexe Validierung der Daten möglich zu machen. Vielleicht wäre der Einsatz des HTML-Attributes "disable" in allen anderen Formularfeldern und Buttons zu empfehlen, wenn nur ein Eintrag bearbeitbar und kein Löschen, Hinzufügen oder Suchen währenddessen möglich sein soll.

### Löschen bestehender Einträge

Um einen Kontakt aus dem Telefonbuch zu löschen, betätigt man den Button "Löschen" in der rechten Spalte der Tabelle und der ausgewählte Eintrag wird aus der Liste entfernt.

Der Button ruft die Funktion "deleteContact" aus dem Angular Modul auf, die mit dem Übergabewert "index" den Datensatz an der ausgewählten Stelle der Collection mit der Array Funktion [splice](http://www.w3schools.com/jsref/jsref_splice.asp) entfernt. Durch die bidirektionale Datenbindung wird der [DOM](https://de.wikipedia.org/wiki/Document_Object_Model) sofort aktualisiert.

### Suche nach Namen

In dem Textfeld im Header der App oben rechts kann ein Suchbegriff eingegeben werden, der die Kontaktliste im Content nach dem Attribut "name" filtert. Es ist keine Bestätigung über einen Button nötig, weil die Suche während der Eingabe schon aktiv ist. Um die Suche zu beenden muss das Textfeld wieder geleert werden.

Diese Funktionalität benötigt keine einzige Zeile [JavaScript](https://de.wikipedia.org/wiki/JavaScript) Code, sondern wird nur durch die Angular Attribute im HTML festgelegt. Im Textfeld wird über [ngModel](https://docs.angularjs.org/api/ng/directive/ngModel) die Variable "searchText" dem Model hinzugefügt und ist direkt mit der Eingabe im Formularfeld verbunden. Der Zusatz ".name" hinter dieser Variable definiert, dass nur nach dem Attribut "name" des Objekts gefiltert werden soll.

In der Kontaktliste fügt man an der Stelle im HTML, wo [ngRepeat](https://docs.angularjs.org/api/ng/directive/ngRepeat) aufgerufen wird, einen Trennstrich hinzu, hinter dem der Filter für die Liste definiert wird. Hier wird die zuvor angelegte Variable "searchText" angegeben, womit die Anzeige der Kontaktliste automatisch über das Model mit der Eingabe im Textfeld verbunden wird.

## Erläuterungen zum Styling

Das Design gleicht einer Handy App mit Header, Content und Footer. Das CSS ist [responsive](https://de.wikipedia.org/wiki/Responsive_Webdesign) angelegt, sodass es sich an alle Bildschirmgrößen anpasst. Die Textgröße kann an einer zentralen Stelle geändert werden und wirkt sich auf alle Elemente aus. Header und Footer haben einen schwarzen Hintergrund, um die Textfelder besser hervorzuheben. Das Textfeld für die Suche ist mit "float: right" an die rechte Seite des Headers geheftet. Die Tabelle verfügt über einen farblichen Header und bekommt im Body ein ["Striped"-Design](http://www.w3schools.com/bootstrap/bootstrap_tables.asp) (ähnlich wie bei Bootstrap) über "nth-child(odd)". Die Buttons "Bearbeiten" und "Löschen" sind entsprechend farblich grün und rot hervorgehoben. Bei dem Footer handelt es sich um einen ["Sticky Footer"](http://www.html-seminar.de/sticky-footer-fussleiste-ganz-unten.htm), der absolut unten auf der Webseite positioniert ist. Der Footer hat eine feste Höhe bekommen, die dem Content per "padding-bottom" abgezogen wird, damit der Content nicht unter dem Footer verschwindet. Die Formularfelder und der Button zum Hinzufügen eines neuen Kontakts sind im Footer zu ungefähr ein drittel Breite hintereinander weg angeordnet.

> ### Mögliche Verbesserungen des Stylings
>
> Wenn die Liste der Kontakte länger wird, bleibt der Footer unterhalb des Contents und ist irgendwann schwer zu erreichen, wenn man einen Kontakt hinzufügen will. Hier muss der Footer fest am unterem Bildschirmrand bleiben und der Content mit einer Festen Höhe (Bildschrimhöhe minus Header und Footer Höhe) ausgestattet und scrollbar sein. Die Buttons könnten noch mit Icons (bspw. mit [Font Awesome](http://fontawesome.io/)) versehen werden, um die User Experience zu verbessern. Um [Barrierefreiheit](https://de.wikipedia.org/wiki/Barrierefreiheit) für alle Nutzer zu bieten müssen Labels zu den Input-Feldern hinzugefügt werden, die entweder sichtbar für alle Nutzer oder unsichtbar nur für [Screenreader](https://de.wikipedia.org/wiki/Screenreader)-Nutzer erreichbar sind.

## Vorteile von AngularJS

Die Fingerübung zeigt wie mit wenig Code und der Struktur von AngularJS eine einfache Umsetzung eines Telefonbuches möglich ist. Das JavaScript Framework vereinfacht die Erstellung von [Single-Page-Webanwendungen](https://de.wikipedia.org/wiki/Single-Page-Webanwendung) nach einem [Model-View-ViewModel](https://de.wikipedia.org/wiki/Model_View_ViewModel)-Muster. Es erweitert das Vokubalar von [HTML](https://de.wikipedia.org/wiki/Hypertext_Markup_Language), um eine besseren dynamischen Aufbau einer Webseite zu ermöglichen, der im herkömmlichen HTML nicht vorgesehen ist. Eine [DOM](https://de.wikipedia.org/wiki/Document_Object_Model)-Manipulation via [jQuery](https://jquery.com/) wird hiermit hinfällig, aber ist auch mit dem in Angular enthaltenen jQuery Lite (jqLite) möglich. Hiermit kann sehr viel komplexer Programmcode, der normalerweise zum Erstellen von dynamsichen Webseiten nötig ist, eingespart werden.

> "Die Strukturierung eines Angular-Webclients erfolgt auf Basis von Modulen, View-Templates, Controllern, Scopes, Filtern und Providern (Factory, Service). Für die Zusammenführung dieser Elemente ist der Dependency-Container von Angular verantwortlich. Hierdurch entsteht eine lose gekoppelte Anwendung, welche aus wiederverwendbaren Teilkomponenten besteht. [...] Hierdurch kann Programmcode zur Synchronisation zwischen View und Anwendungslogik eingespart werden." - [Wikipedia](https://de.wikipedia.org/wiki/AngularJS)

Ich habe mich durch diese Aufgabe in AngularJS eingearbeitet und muss sagen, dass dieses Framework mich sehr begeistert hat. Es gibt den bisherigen Denkansätzen eine ganz neue Struktur, die einem logisch vorkommt und der Webentwicklung eine übersichtliche Einteilung bietet. Der Programmieraufwand ist wesentlich geringer und man muss sich weniger Gedanken über die Verbindung zwischen dem HTML-Template und den Datenaustausch machen. Hier nimmt Angular einem sehr viel Arbeit ab und man kann sich voll und ganz auf die Umsetzungen seiner Ideen konzentrieren. Mein persönliches Fazit ist, dass ich gerne auch weiterhin mit diesem Framework arbeiten möchte.

> ### Mögliche Verbesserungen der Single Page Applikation
>
> Wenn mehr Daten zu den einzelnen Kontakten hinzukommen sollten, würde hier eine Unterseite zum Ansehen und Bearbeiten des Kontakts besser sein. Hier könnte man dynamisch den Content (View) zwischen Header und Footer verändern, um schnell und ohne HTML-Seitenwechsel zwischen Listenansicht und Detailansicht wechseln zu können. Hier würde dann das [ngRoute](https://docs.angularjs.org/api/ngRoute)-Modul mit der [ngView](https://docs.angularjs.org/api/ngRoute/directive/ngView)-Direktive von AngularJS zum Einsatz kommen.
