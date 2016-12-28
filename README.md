# Telefonbuch
Fingerübung für [dff solutions GmbH](https://dff-solutions.de/)

> Das Telefonbuch ist eine "Single Page Applikation", das mit dem Framework [AngularJS](http://angularjs.org) umgesetzt wurde.

## Funktionalitäten

* Anzeige von Einträgen in einer Liste (Name und Telefonnummer)
* Anlegen von Einträgen
* Bearbeiten bestehender Einträge
* Löschen bestehender Einträge
* Suche nach Namen

### Anzeige von Einträgen in einer Liste

Das Array "contacts" enthält einen beispielhaften Satz aus Kontakdaten der dem Aufbau einer JSON-Datei gleicht (Objekte mit Attributen) und in Verbindung mit einem Server durch eine Solche ersetzt werden kann (per Ajax könnte man hier eine Verbindung mit dem Backend aufbauen).

### Anlegen von Einträgen

Die Funktion "addContact" fügt dem Array "contacts" einen neuen Datensatz hinzu, der sich aus den Attributen "name" und "phone" zusammensetzt, dessen Inhalt durch die Eingabe in den Formularfeldern über die dort definierten Variablen festgelegt wird.

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
