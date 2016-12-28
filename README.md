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

### Anlegen von Einträgen

Um einen neuen Kontakt zu der Liste im Telefonbuch hinzuzufügen, gibt man Name und Telefonnummer in die vorgegebenen Formularfelder, die sich unter der Kontaktliste im Footer der App befinden, und drückt auf den Button "Hinzufügen" rechts unten in der Ecke des Footers. 

Dieser ruft dann die Funktion "addContact" auf, die sich im Angular Modul "contactApp" befindet, das über den [ngController](https://docs.angularjs.org/api/ng/directive/ngController) dafür sorgt, dass die View verändert wird, wenn sich die im Model hinterlegten Daten ändern und umgekehrt. In dieser Funktion wird der Collection des Models ein neuer Datensatz hinzugefügt, der sich aus den Attributen "name" und "phone" zusammensetzt, dessen Inhalt durch die Eingabe in den Formularfeldern über die dort definierten Variablen mit [ngModel](https://docs.angularjs.org/api/ng/directive/ngModel) festgelegt wird. Durch die zuvor beschriebene bidirektionale Datenbindung wird der neue Kontakt sofort in der Tabelle sichtbar. Zum Schluss werden in der Funktion über die entsprechenden Variablen die Strings in den Formularfeldern wieder geleert, um eine neue Eingabe möglich zu machen. 

Um das Hinzufügen von leeren oder falschen Datensätzen zu verhindern, habe ich am Anfang der Funktion eine Abfrage hinzugefügt, die die Eingabe der Formularfelder vorab prüft und bei falscher Eingabe dem Nutzer über einen Alert eine Fehlermeldung gibt und danach die Funktion frühzeitig verlässt, damit die Daten nicht hinzugefügt werden.

### Bearbeiten bestehender Einträge

Um bei einem Telefonbucheintrag die bestehenden Kontaktdaten zu ändern, drückt man auf den Button "Bearbeiten" in der rechten Spalte der Tabelle und durch das [ngShow](https://docs.angularjs.org/api/ng/directive/ngShow) in den HTML-Tags wechselt die reine Textansicht des Kontakts zu einer bearbeitbaren Formularansicht. Dabei wechselt auch der Text des Buttons zu "Speichern", der beim erneuten Klick über [ngClick](https://docs.angularjs.org/api/ng/directive/ngClick) den Bearbeitungsmodus wieder beendet.

Hinter dem Button steckt eine einfache Funktion "toggleEdit" aus dem Angular Modul, die den booleanschen Wert des Attributes "edit" des ausgewählten Kontakts wechselt. Ich habe den Datensatz des Kontakts um dieses Attribut erweitert, um für jeden Eintrag einen individuellen Bearbeitungsmodus zu erstellen. Je nachdem ob der Wert nun "true" oder "false" ist, werden nun die entsprechenden HTML-Elemente ein- oder ausgeblendet und der Text des Buttons geändert. Um die Stelle des Kontakts in der Collection des Models herauszufinden, wird der Funktion der Index des ausgewählten Eintrags übergeben.

Durch diese Umsetzung wird es sogar möglich mehrere Kontakte gleichzeitig zu bearbeiten. Eigentlich ist die Bezeichnung des Buttons "Speichern" irreführend, weil beim Bearbeiten schon direkt der Datensatz in der Collection des Models geändert wird. Es wäre also die Bezeichnung Bearbeitungsmodus "Beenden" korrekter, aber für den normalen Nutzer, der sich nicht mit AngularJS auskennt, ist es aus Gründen der [Benutzerfreundlichkeit](https://de.wikipedia.org/wiki/Benutzerfreundlichkeit) besser die Bezeichnung "Speichern" zu verwenden.

### Löschen bestehender Einträge

Um einen Kontakt aus dem Telefonbuch zu löschen, betätigt man den Button "Löschen" in der rechten Spalte der Tabelle und der ausgewählte Eintrag wird aus der Liste entfernt.

Der Button ruft die Funktion "deleteContact" aus dem Angular Modul auf, die mit dem Übergabewert "index" den Datensatz an der ausgewählten Stelle der Collection mit der Array Funktion ["splice"](http://www.w3schools.com/jsref/jsref_splice.asp) entfernt. Durch die bidirektionale Datenbindung wird der [DOM](https://de.wikipedia.org/wiki/Document_Object_Model) sofort aktualisiert.

### Suche nach Namen

"ng-model" verbindet die Formulareingabe mit dem Model der Klasse "contactApp" (, wo die Variable "searchText" automatisch angelegt wird) und ".name" definiert, dass nur im Attribut "name" des Objekts (, auf das im Folgendem der Suchfilter angewandt wird) gesucht werden soll.

"ng-repeat" iteriert durch das im Model angegegebene Array "contacts" und erstellt somit für jeden Eintrag eine neue Tabellenzeile, in der man über der hier definierten Variable "contact" auf den Datensatz (das Objekt mit allen enthaltenen Attributen) der jeweiligen Stelle im Array zugreifen kann. Ab dem Trennstrich wird angegeben, dass ein Filter mit dem im zuvor erstellten "input"-Element angegebenen "searchText" auf die Liste angewandt werden soll.

> ### Mögliche Verbesserungen der Funktionalitäten
>
> Sortierung der Kontakte von A bis Z. Validierung der Telefonnummer beim Hinzufügen eines neuen Kontakts (Filterung durch String replace Funktion und/oder zwei Attribute im Datensatz einmal für die Anzeige und für den Link), Filterung der Telefonnummer im "href"-Attribut des Links.

## Erläuterungen zum Styling

Das Design gleicht einer Handy App mit Header, Content und Footer. Das CSS ist responsiv angelegt, sodass es sich an alle Bildschirmgrößen anpasst. Die Textgröße kann an einer zentralen Stelle geändert werden und wirkt sich auf alle Elemente aus.

> ### Mögliche Verbesserungen des Stylings
>
> Wenn die Liste der Kontakte länger wird, bleibt der Footer unterhalb des Contents und ist irgendwann schwer zu erreichen, wenn man einen Kontakt hinzufügen will. Hier muss der Footer fest am unterem Bildschirmrand bleiben und der Content mit einer Festen Höhe (Bildschrimhöhe minus Header und Footer Höhe) und scrollbar sein. Die Buttons können noch mit Icons versehen werden. Um Barrierefreiheit für alle Nutzer zu bieten müssen Labels zu den Input-Feldern hinzugefügt werden, die entweder sichtbar für alle Nutzer oder unsichtbar nur für Screenreader-Nutzer erreichbar ist.

## Vorteile von AngularJS

Die Fingerübung zeigt wie mit wenig Code und der Struktur von AngularJS eine einfache Umsetzung eines Telefonbuches möglich ist.

> ### Mögliche Verbesserungen der Single Page Applikation
>
> Wenn mehr Daten zu den einzelnen Kontakten hinzukommen sollen, würde hier eine Unterseite zum Ansehen und Bearbeiten des Kontakts besser sein. Hier könnte man dynamisch den Content zwischen Header und Footer verändern, um schnell und ohne HTML-Seitenwechsel zwischen Listenansicht und Detailansicht wechseln zu können. Hier würde dann das Model-View-Controller Prinzip von AngularJS zum Einsatz kommen.
