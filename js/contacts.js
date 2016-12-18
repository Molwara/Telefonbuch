angular.module('contactApp', [])
	.controller('ContactListController', function() {
		this.contacts = [{name:'Annika Bokelmann', number:'0176/21360084'},
						 {name:'Dr. Ralf Itter', number:'+ 49 (0) 551 900 37 90'},
						 {name:'dff solutions GmbH', number:'+49 (0) 551 / 900 379 – 0'}];
		
		
	});