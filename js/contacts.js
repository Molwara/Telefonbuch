angular.module('contactApp', [])
	.controller('ContactListController', function() {
		var contactList = this;
		contactList.contacts = [{name:'Annika Bokelmann', phone:'0176/21360084', edit: false},
						 {name:'Dr. Ralf Itter', phone:'+ 49 (0) 551 900 37 90', edit: false},
						 {name:'dff solutions GmbH', phone:'+49 (0) 551 / 900 379 – 0', edit: false}];
		contactList.textEdit = 'Bearbeiten';
		contactList.textSave = 'Speichern';
		
		contactList.addContact = function() {
			contactList.contacts.push({name:contactList.name, phone:contactList.phone, edit: false});
			contactList.name = '';
			contactList.phone = '';
		};
		
		contactList.deleteContact = function(index) {
			contactList.contacts.splice(index,1);
		};
		
		contactList.toggleEdit = function(index) {
			contactList.contacts[index].edit === false ? contactList.contacts[index].edit = true : contactList.contacts[index].edit = false
		};
	});