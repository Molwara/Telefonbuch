angular.module('contactApp', [])
	.controller('ContactListController', function() {
		var contactList = this;
		/*
		Das Array "contacts" enth�lt einen beispielhaften Satz aus Kontakdaten der dem Aufbau einer JSON-Datei gleicht (Objekte mit Attributen) 
		und in Verbindung mit einem Server durch eine Solche ersetzt werden kann (per Ajax k�nnte man hier eine Verbindung mit dem Backend aufbauen)
		*/
		contactList.contacts = [{name:'Annika Bokelmann', phone:'+4917621360084', edit: false},
						 		{name:'Dr. Ralf Itter', phone:'+495519003790', edit: false},
						 		{name:'dff solutions GmbH', phone:'+495519003790', edit: false}];
		//austauschbare Strings f�r die Anzeige vom Bearbeitungsmodus im Button
		contactList.textEdit = 'Bearbeiten';
		contactList.textSave = 'Speichern';
		
		/*
		Die Funktion "addContact" f�gt dem Array "contacts" einen neuen Datensatz hinzu, der sich aus den Attributen "name" und "phone" zusammensetzt, 
		dessen Inhalt durch die Eingabe in den Formularfeldern �ber die dort definierten Variablen festgelegt wird
		*/
		contactList.addContact = function() {
			//Fehlermeldung bei leeren Textfeldern oder wenn keine Telefonnummer
			//console.log(contactList.phone,parseInt(contactList.phone));
			if(!contactList.name || !contactList.phone || !parseInt(contactList.phone)){
				alert('Bitte geben Sie valide Daten in die Textfelder ein!');
				return;
			}
			
			contactList.contacts.push({name:contactList.name, phone:contactList.phone, edit: false});
			//Nach dem Hinzuf�gen des Kontakts wird die Eingabe in den Formularfeldern zur�ckgesetzt
			contactList.name = '';
			contactList.phone = '';
		};
		
		/*
		Die Funktion "deleteContact" entfernt den �ber den Button ausgew�hlten Datensatz an der Stelle im Array "contacts", 
		die der Funktion in dem �bergabewert "index" beim Klick auf den Button �bergeben wurde
		*/
		contactList.deleteContact = function(index) {
			contactList.contacts.splice(index,1);
		};
		
		/*
		Die Funktion "toggleEdit" wechselt den booleanschen Wert des Attributes "edit" des �ber den Button ausgew�hlten Datensatzes (�bergabewert "index"), 
		in dessen Folge in den HTML-Tags mit "ng-show" zwischen der reinen Textansicht und der bearbeitbaren Formularansicht gewechselt wird
		*/
		contactList.toggleEdit = function(index) {
			if(contactList.contacts[index].edit === false){
				contactList.contacts[index].edit = true;
			}
			else{
				contactList.contacts[index].edit = false;
			}
		};
	});