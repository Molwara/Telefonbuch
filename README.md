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

Dieser ruft dann die Funktion "addContact" auf, die sich im Angular Modul "contactApp" befindet, das über den Controller dafür sorgt, dass die View verändert wird, wenn sich die im Model hinterlegten Daten ändern und umgekehrt. In dieser Funktion wird der Collection des Models ein neuer Datensatz hinzugefügt, der sich aus den Attributen "name" und "phone" zusammensetzt, dessen Inhalt durch die Eingabe in den Formularfeldern über die dort definierten Variablen festgelegt wird. Durch die zuvor beschriebene bidirektionale Datenbindung wird der neue Kontakt sofort in der Tabelle sichtbar. Zum Schluss werden in der Funktion über die entsprechenden Variablen die Strings in den Formularfeldern wieder geleert, um eine neue Eingabe möglich zu machen. 

Um das Hinzufügen von leeren oder falschen Datensätzen zu verhindern, habe ich am Anfang der Funktion eine Abfrage hinzugefügt, die die Eingabe der Formularfelder vorab prüft und bei falscher Eingabe dem Nutzer über einen Alert eine Fehlermeldung gibt und danach die Funktion frühzeitig verlässt, damit die Daten nicht hinzugefügt werden.

### Bearbeiten bestehender Einträge

Die Funktion "toggleEdit" wechselt den booleanschen Wert des Attributes "edit" des über den Button ausgewählten Datensatzes (Übergabewert "index"), in dessen Folge in den HTML-Tags mit "ng-show" zwischen der reinen Textansicht und der bearbeitbaren Formularansicht gewechselt wird.

### Löschen bestehender Einträge

Die Funktion "deleteContact" entfernt den über den Button ausgewählten Datensatz an der Stelle im Array "contacts", die der Funktion in dem Übergabewert "index" beim Klick auf den Button übergeben wurde.

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
