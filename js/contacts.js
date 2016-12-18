angular.module('contactApp', [])
	.controller('ContactListController', function() {
		var contactList = this;
		contactList.contacts = [{name:'Annika Bokelmann', phone:'0176/21360084'},
						 {name:'Dr. Ralf Itter', phone:'+ 49 (0) 551 900 37 90'},
						 {name:'dff solutions GmbH', phone:'+49 (0) 551 / 900 379 – 0'}];
		
		contactList.addContact = function() {
			contactList.contacts.push({name:contactList.name, phone:contactList.phone});
			contactList.name = '';
			contactList.phone = '';
		};
		
		contactList.deleteContact = function(index) {
			contactList.contacts.splice(index,1);
		};
	});